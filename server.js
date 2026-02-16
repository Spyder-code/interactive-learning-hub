import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import db from "./database.js";
import { authenticateToken, authenticateTeacher } from "./middleware/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Helper to get current datetime in Asia/Jakarta in format YYYY-MM-DD HH:MM:SS
function getJakartaNow() {
  return new Date().toLocaleString("sv", {
    timeZone: "Asia/Jakarta",
    hour12: false,
  });
}

// Allowed file types: images and office files (Word, Excel, PowerPoint)
const ALLOWED_FILE_TYPES = [
  // Images
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  // Word
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Excel
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  // PowerPoint
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

// File filter for multer
const fileFilter = (req, file, cb) => {
  if (ALLOWED_FILE_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only images and office files (Word, Excel, PowerPoint) are allowed.",
      ),
      false,
    );
  }
};

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Get user NIM from authenticated user
    const nim = req.user?.nim;
    if (!nim) {
      return cb(new Error("User not authenticated"));
    }

    // Create directory path: storage/{nim}/
    const uploadDir = path.join(__dirname, "storage", nim);

    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate filename: original name with timestamp to avoid conflicts
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    const filename = `${basename}_${Date.now()}${ext}`;
    cb(null, filename);
  },
});

// Multer upload middleware (10MB max file size)
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// ==================== AUTH ROUTES ====================

// Login endpoint
app.post("/api/auth/login", (req, res) => {
  const { nim, password } = req.body;

  if (!nim || !password) {
    return res.status(400).json({ error: "NIM dan password harus diisi" });
  }

  try {
    const user = db.prepare("SELECT * FROM users WHERE nim = ?").get(nim);

    if (!user) {
      return res.status(401).json({ error: "NIM atau password salah" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "NIM atau password salah" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        nim: user.nim,
        name: user.name,
        role: user.role || "student",
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.json({
      token,
      user: {
        id: user.id,
        nim: user.nim,
        name: user.name,
        role: user.role || "student",
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat login" });
  }
});

// Register endpoint (optional)
app.post("/api/auth/register", (req, res) => {
  const { nim, password, name, role } = req.body;

  if (!nim || !password || !name) {
    return res.status(400).json({ error: "Semua field harus diisi" });
  }

  try {
    const existingUser = db
      .prepare("SELECT * FROM users WHERE nim = ?")
      .get(nim);

    if (existingUser) {
      return res.status(409).json({ error: "NIM sudah terdaftar" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const userRole = role || "student";
    const result = db
      .prepare(
        "INSERT INTO users (nim, name, password, role) VALUES (?, ?, ?, ?)",
      )
      .run(nim, name, hashedPassword, userRole);

    res.status(201).json({
      message: "User berhasil didaftarkan",
      user: {
        id: result.lastInsertRowid,
        nim,
        name,
        role: userRole,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat registrasi" });
  }
});

// Verify token endpoint
app.get("/api/auth/verify", authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// ==================== MEETING ROUTES ====================

// Get all meetings for user
app.get("/api/meetings", authenticateToken, (req, res) => {
  try {
    const userMeetings = db
      .prepare(
        `
      SELECT * FROM user_meetings 
      WHERE user_id = ?
      ORDER BY created_at DESC
    `,
      )
      .all(req.user.id);

    res.json(userMeetings);
  } catch (error) {
    console.error("Get meetings error:", error);
    res.status(500).json({ error: "Gagal mengambil data meeting" });
  }
});

// Get all meetings with completion status (for meeting selection page)
app.get("/api/meetings/all-status", authenticateToken, (req, res) => {
  try {
    const userMeetings = db
      .prepare(
        `
      SELECT 
        meeting_id,
        is_completed,
        percentage,
        duration_minutes,
        total_questions,
        correct_answers,
        last_slide_index,
        end_time
      FROM user_meetings 
      WHERE user_id = ?
      ORDER BY created_at DESC
    `,
      )
      .all(req.user.id);

    // Convert to a map for easier access
    const meetingMap = {};
    userMeetings.forEach((meeting) => {
      meetingMap[meeting.meeting_id] = {
        isCompleted: meeting.is_completed === 1,
        percentage: meeting.percentage,
        durationMinutes: meeting.duration_minutes,
        totalQuestions: meeting.total_questions,
        correctAnswers: meeting.correct_answers,
        lastSlideIndex: meeting.last_slide_index,
        completedAt: meeting.end_time,
      };
    });

    res.json(meetingMap);
  } catch (error) {
    console.error("Get meetings status error:", error);
    res.status(500).json({ error: "Gagal mengambil status meeting" });
  }
});

// Get specific meeting data
app.get("/api/meetings/:meetingId", authenticateToken, (req, res) => {
  const { meetingId } = req.params;

  try {
    let userMeeting = db
      .prepare(
        `
      SELECT * FROM user_meetings 
      WHERE user_id = ? AND meeting_id = ?
    `,
      )
      .get(req.user.id, meetingId);

    // If meeting doesn't exist, create it
    if (!userMeeting) {
      const result = db
        .prepare(
          `
        INSERT INTO user_meetings (user_id, meeting_id, start_time)
        VALUES (?, ?, ?)
      `,
        )
        .run(req.user.id, meetingId, getJakartaNow());

      userMeeting = db
        .prepare(`SELECT * FROM user_meetings WHERE id = ?`)
        .get(result.lastInsertRowid);
    }

    // Get quiz answers
    const quizAnswers = db
      .prepare(
        `
      SELECT * FROM quiz_answers 
      WHERE user_meeting_id = ?
    `,
      )
      .all(userMeeting.id);

    // Get task uploads
    const taskUploads = db
      .prepare(
        `
      SELECT * FROM task_uploads 
      WHERE user_meeting_id = ?
    `,
      )
      .all(userMeeting.id);

    // Get slide progress
    const slideProgress = db
      .prepare(
        `
      SELECT * FROM slide_progress 
      WHERE user_meeting_id = ?
      ORDER BY max_slide_reached DESC
      LIMIT 1
    `,
      )
      .get(userMeeting.id);

    res.json({
      meeting: userMeeting,
      quizAnswers,
      taskUploads,
      slideProgress,
    });
  } catch (error) {
    console.error("Get meeting error:", error);
    res.status(500).json({ error: "Gagal mengambil data meeting" });
  }
});

// Save quiz answer
app.post("/api/meetings/:meetingId/quiz", authenticateToken, (req, res) => {
  const { meetingId } = req.params;
  const { slideId, questionIndex, selectedOption, isCorrect, questionType } =
    req.body;

  try {
    // Get or create user meeting
    let userMeeting = db
      .prepare(
        `
      SELECT * FROM user_meetings 
      WHERE user_id = ? AND meeting_id = ?
    `,
      )
      .get(req.user.id, meetingId);

    if (!userMeeting) {
      const result = db
        .prepare(
          `
        INSERT INTO user_meetings (user_id, meeting_id, start_time)
        VALUES (?, ?, ?)
      `,
        )
        .run(req.user.id, meetingId, getJakartaNow());

      userMeeting = db
        .prepare(`SELECT * FROM user_meetings WHERE id = ?`)
        .get(result.lastInsertRowid);
    }

    // Insert or replace quiz answer
    db.prepare(
      `
      INSERT OR REPLACE INTO quiz_answers 
      (user_meeting_id, slide_id, question_index, selected_option, is_correct, question_type)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    ).run(
      userMeeting.id,
      slideId,
      questionIndex,
      selectedOption,
      isCorrect ? 1 : 0,
      questionType || "multiple-choice",
    );

    // Update meeting stats
    updateMeetingStats(userMeeting.id);

    res.json({ message: "Jawaban berhasil disimpan" });
  } catch (error) {
    console.error("Save quiz error:", error);
    res.status(500).json({ error: "Gagal menyimpan jawaban" });
  }
});

// Save task upload
app.post(
  "/api/meetings/:meetingId/task",
  authenticateToken,
  upload.single("file"),
  (req, res) => {
    const { meetingId } = req.params;
    const { slideId, taskIndex } = req.body;

    try {
      // Validate required fields
      if (!slideId || taskIndex === undefined) {
        return res
          .status(400)
          .json({ error: "slideId and taskIndex are required" });
      }

      // Check if file was uploaded
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Get or create user meeting
      let userMeeting = db
        .prepare(
          `
      SELECT * FROM user_meetings 
      WHERE user_id = ? AND meeting_id = ?
    `,
        )
        .get(req.user.id, meetingId);

      if (!userMeeting) {
        const result = db
          .prepare(
            `
        INSERT INTO user_meetings (user_id, meeting_id, start_time)
        VALUES (?, ?, ?)
      `,
          )
          .run(req.user.id, meetingId, getJakartaNow());

        userMeeting = db
          .prepare(`SELECT * FROM user_meetings WHERE id = ?`)
          .get(result.lastInsertRowid);
      }

      // Delete old file if exists
      const existingUpload = db
        .prepare(
          `
      SELECT file_path FROM task_uploads 
      WHERE user_meeting_id = ? AND slide_id = ? AND task_index = ?
    `,
        )
        .get(userMeeting.id, slideId, taskIndex);

      if (existingUpload && existingUpload.file_path) {
        const oldFilePath = path.join(__dirname, existingUpload.file_path);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      // Create relative file path for database
      const relativePath = path.join(
        "storage",
        req.user.nim,
        req.file.filename,
      );

      // Insert or replace task upload
      db.prepare(
        `
      INSERT OR REPLACE INTO task_uploads 
      (user_meeting_id, slide_id, task_index, file_name, file_size, file_type, file_path)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
      ).run(
        userMeeting.id,
        slideId,
        taskIndex,
        req.file.originalname,
        req.file.size,
        req.file.mimetype,
        relativePath,
      );

      res.json({
        message: "Task berhasil disimpan",
        file: {
          name: req.file.originalname,
          size: req.file.size,
          type: req.file.mimetype,
          path: relativePath,
        },
      });
    } catch (error) {
      console.error("Save task error:", error);
      // Delete uploaded file if database insert fails
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      res.status(500).json({ error: "Gagal menyimpan task" });
    }
  },
);

// Delete task upload
app.delete("/api/meetings/:meetingId/task", authenticateToken, (req, res) => {
  const { meetingId } = req.params;
  const { slideId, taskIndex } = req.body;

  try {
    // Get user meeting
    const userMeeting = db
      .prepare(
        `
      SELECT * FROM user_meetings 
      WHERE user_id = ? AND meeting_id = ?
    `,
      )
      .get(req.user.id, meetingId);

    if (!userMeeting) {
      return res.status(404).json({ error: "Meeting tidak ditemukan" });
    }

    // Get file path before deleting
    const upload = db
      .prepare(
        `
      SELECT file_path FROM task_uploads 
      WHERE user_meeting_id = ? AND slide_id = ? AND task_index = ?
    `,
      )
      .get(userMeeting.id, slideId, taskIndex);

    // Delete from database
    db.prepare(
      `
      DELETE FROM task_uploads 
      WHERE user_meeting_id = ? AND slide_id = ? AND task_index = ?
    `,
    ).run(userMeeting.id, slideId, taskIndex);

    // Delete physical file if exists
    if (upload && upload.file_path) {
      const filePath = path.join(__dirname, upload.file_path);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.json({ message: "Task berhasil dihapus" });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({ error: "Gagal menghapus task" });
  }
});

// Update slide progress
app.post("/api/meetings/:meetingId/progress", authenticateToken, (req, res) => {
  const { meetingId } = req.params;
  const { slideIndex, maxSlideReached } = req.body;

  try {
    // Get or create user meeting
    let userMeeting = db
      .prepare(
        `
      SELECT * FROM user_meetings 
      WHERE user_id = ? AND meeting_id = ?
    `,
      )
      .get(req.user.id, meetingId);

    if (!userMeeting) {
      const result = db
        .prepare(
          `
        INSERT INTO user_meetings (user_id, meeting_id, start_time)
        VALUES (?, ?, ?)
      `,
        )
        .run(req.user.id, meetingId, getJakartaNow());

      userMeeting = db
        .prepare(`SELECT * FROM user_meetings WHERE id = ?`)
        .get(result.lastInsertRowid);
    }

    // Update or insert slide progress
    db.prepare(
      `
      INSERT OR REPLACE INTO slide_progress 
      (user_meeting_id, slide_index, max_slide_reached)
      VALUES (?, ?, ?)
    `,
    ).run(userMeeting.id, slideIndex, maxSlideReached);

    // Update last_slide_index in user_meetings
    db.prepare(
      `
      UPDATE user_meetings 
      SET last_slide_index = ?, updated_at = ?
      WHERE id = ?
    `,
    ).run(maxSlideReached, getJakartaNow(), userMeeting.id);

    res.json({ message: "Progress berhasil disimpan" });
  } catch (error) {
    console.error("Save progress error:", error);
    res.status(500).json({ error: "Gagal menyimpan progress" });
  }
});

// Complete meeting
app.post("/api/meetings/:meetingId/complete", authenticateToken, (req, res) => {
  const { meetingId } = req.params;
  const { totalQuestions, correctAnswers, percentage } = req.body;

  try {
    const userMeeting = db
      .prepare(
        `
      SELECT * FROM user_meetings 
      WHERE user_id = ? AND meeting_id = ?
    `,
      )
      .get(req.user.id, meetingId);

    if (!userMeeting) {
      return res.status(404).json({ error: "Meeting tidak ditemukan" });
    }

    // Calculate duration (interpret stored start_time as Asia/Jakarta local)
    const rawStart = String(userMeeting.start_time);
    const m = rawStart.match(
      /(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})/,
    );
    let durationMinutes = 0;
    if (m) {
      const year = Number(m[1]);
      const month = Number(m[2]);
      const day = Number(m[3]);
      const hour = Number(m[4]);
      const minute = Number(m[5]);
      const second = Number(m[6]);
      const startUtc =
        Date.UTC(year, month - 1, day, hour, minute, second) - 7 * 3600 * 1000;
      const nowUtc = Date.now();
      durationMinutes = Math.round((nowUtc - startUtc) / 1000 / 60);
    } else {
      const startTime = new Date(userMeeting.start_time);
      const endTime = new Date();
      durationMinutes = Math.round((endTime - startTime) / 1000 / 60);
    }

    // Update meeting as completed
    const endTimeJakarta = getJakartaNow();
    db.prepare(
      `
      UPDATE user_meetings 
      SET end_time = ?,
          duration_minutes = ?,
          total_questions = ?,
          correct_answers = ?,
          percentage = ?,
          is_completed = 1,
          updated_at = ?
      WHERE id = ?
    `,
    ).run(
      endTimeJakarta,
      durationMinutes,
      totalQuestions,
      correctAnswers,
      percentage,
      endTimeJakarta,
      userMeeting.id,
    );

    res.json({ message: "Meeting berhasil diselesaikan" });
  } catch (error) {
    console.error("Complete meeting error:", error);
    res.status(500).json({ error: "Gagal menyelesaikan meeting" });
  }
});

// ==================== HELPER FUNCTIONS ====================

function updateMeetingStats(userMeetingId) {
  const answers = db
    .prepare(
      `
    SELECT COUNT(*) as total, SUM(is_correct) as correct 
    FROM quiz_answers 
    WHERE user_meeting_id = ?
  `,
    )
    .get(userMeetingId);

  const percentage =
    answers.total > 0 ? (answers.correct / answers.total) * 100 : 0;

  db.prepare(
    `
    UPDATE user_meetings 
    SET total_questions = ?,
        correct_answers = ?,
        percentage = ?,
        updated_at = ?
    WHERE id = ?
  `,
  ).run(
    answers.total,
    answers.correct,
    percentage,
    getJakartaNow(),
    userMeetingId,
  );
}

// ==================== TEACHER ROUTES ====================

// Get all students (teacher only)
app.get("/api/teacher/students", authenticateTeacher, (req, res) => {
  try {
    const students = db
      .prepare(
        `
        SELECT id, nim, name, created_at 
        FROM users 
        WHERE role = 'student'
        ORDER BY name ASC
      `,
      )
      .all();

    res.json(students);
  } catch (error) {
    console.error("Get students error:", error);
    res.status(500).json({ error: "Gagal mengambil data mahasiswa" });
  }
});

// Get all students with meeting summary (teacher only)
app.get("/api/teacher/students/summary", authenticateTeacher, (req, res) => {
  try {
    const students = db
      .prepare(
        `
        SELECT 
          u.id,
          u.nim,
          u.name,
          u.created_at,
          COUNT(DISTINCT um.meeting_id) as total_meetings,
          COUNT(DISTINCT CASE WHEN um.is_completed = 1 THEN um.meeting_id END) as completed_meetings,
          AVG(CASE WHEN um.is_completed = 1 THEN um.percentage ELSE NULL END) as avg_score
        FROM users u
        LEFT JOIN user_meetings um ON u.id = um.user_id
        WHERE u.role = 'student'
        GROUP BY u.id, u.nim, u.name, u.created_at
        ORDER BY u.name ASC
      `,
      )
      .all();

    res.json(students);
  } catch (error) {
    console.error("Get students summary error:", error);
    res.status(500).json({ error: "Gagal mengambil ringkasan mahasiswa" });
  }
});

// Get specific student's all meetings (teacher only)
app.get(
  "/api/teacher/students/:studentId/meetings",
  authenticateTeacher,
  (req, res) => {
    const { studentId } = req.params;

    try {
      const meetings = db
        .prepare(
          `
        SELECT 
          um.*,
          u.name as student_name,
          u.nim as student_nim
        FROM user_meetings um
        JOIN users u ON um.user_id = u.id
        WHERE um.user_id = ?
        ORDER BY um.created_at DESC
      `,
        )
        .all(studentId);

      res.json(meetings);
    } catch (error) {
      console.error("Get student meetings error:", error);
      res.status(500).json({ error: "Gagal mengambil data meeting mahasiswa" });
    }
  },
);

// Get specific student's specific meeting detail (teacher only)
app.get(
  "/api/teacher/students/:studentId/meetings/:meetingId",
  authenticateTeacher,
  (req, res) => {
    const { studentId, meetingId } = req.params;

    try {
      const meeting = db
        .prepare(
          `
        SELECT 
          um.*,
          u.name as student_name,
          u.nim as student_nim
        FROM user_meetings um
        JOIN users u ON um.user_id = u.id
        WHERE um.user_id = ? AND um.meeting_id = ?
      `,
        )
        .get(studentId, meetingId);

      if (!meeting) {
        return res.status(404).json({ error: "Meeting tidak ditemukan" });
      }

      // Get quiz answers
      const quizAnswers = db
        .prepare(
          `
        SELECT * FROM quiz_answers 
        WHERE user_meeting_id = ?
        ORDER BY slide_id, question_index
      `,
        )
        .all(meeting.id);

      // Get task uploads
      const taskUploads = db
        .prepare(
          `
        SELECT * FROM task_uploads 
        WHERE user_meeting_id = ?
        ORDER BY slide_id, task_index
      `,
        )
        .all(meeting.id);

      // Get slide progress
      const slideProgress = db
        .prepare(
          `
        SELECT * FROM slide_progress 
        WHERE user_meeting_id = ?
        ORDER BY slide_index
      `,
        )
        .all(meeting.id);

      res.json({
        meeting,
        quizAnswers,
        taskUploads,
        slideProgress,
      });
    } catch (error) {
      console.error("Get meeting detail error:", error);
      res.status(500).json({ error: "Gagal mengambil detail meeting" });
    }
  },
);

// Get all meetings report across all students (teacher only)
app.get("/api/teacher/reports/meetings", authenticateTeacher, (req, res) => {
  const { meetingId } = req.query;

  try {
    let query = `
      SELECT 
        u.id as student_id,
        u.nim,
        u.name,
        um.meeting_id,
        um.start_time,
        um.end_time,
        um.duration_minutes,
        um.last_slide_index,
        um.total_questions,
        um.correct_answers,
        um.percentage,
        um.is_completed
      FROM users u
      LEFT JOIN user_meetings um ON u.id = um.user_id
      WHERE u.role = 'student'
    `;

    const params = [];
    if (meetingId) {
      query += ` AND (um.meeting_id = ? OR um.meeting_id IS NULL)`;
      params.push(meetingId);
    }

    query += ` ORDER BY u.name ASC, um.meeting_id ASC`;

    const reports = db.prepare(query).all(...params);

    res.json(reports);
  } catch (error) {
    console.error("Get meeting reports error:", error);
    res.status(500).json({ error: "Gagal mengambil laporan meeting" });
  }
});

// Get overall statistics (teacher only)
app.get("/api/teacher/statistics", authenticateTeacher, (req, res) => {
  try {
    const totalStudents = db
      .prepare("SELECT COUNT(*) as count FROM users WHERE role = 'student'")
      .get().count;

    const totalMeetings = db
      .prepare("SELECT COUNT(DISTINCT meeting_id) as count FROM user_meetings")
      .get().count;

    const completedMeetings = db
      .prepare(
        "SELECT COUNT(*) as count FROM user_meetings WHERE is_completed = 1",
      )
      .get().count;

    const avgScore =
      db
        .prepare(
          "SELECT AVG(percentage) as avg FROM user_meetings WHERE is_completed = 1",
        )
        .get().avg || 0;

    const recentActivity = db
      .prepare(
        `
        SELECT 
          u.name,
          u.nim,
          um.meeting_id,
          um.percentage,
          um.updated_at
        FROM user_meetings um
        JOIN users u ON um.user_id = u.id
        WHERE u.role = 'student'
        ORDER BY um.updated_at DESC
        LIMIT 10
      `,
      )
      .all();

    res.json({
      totalStudents,
      totalMeetings,
      completedMeetings,
      avgScore: Math.round(avgScore * 100) / 100,
      recentActivity,
    });
  } catch (error) {
    console.error("Get statistics error:", error);
    res.status(500).json({ error: "Gagal mengambil statistik" });
  }
});

// ==================== START SERVER ====================

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
});

export default app;
