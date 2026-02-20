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
  // PDF
  "application/pdf",
];

// File filter for multer
const fileFilter = (req, file, cb) => {
  if (ALLOWED_FILE_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only images and office files (Word, Excel, PowerPoint, PDF) are allowed.",
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

// Serve uploaded files statically from storage directory
app.use("/uploads", express.static(path.join(__dirname, "storage")));

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

// Get personal manual attendances (for students)
app.get("/api/attendances/me", authenticateToken, (req, res) => {
  try {
    const attendances = db
      .prepare(
        `
      SELECT meeting_id, is_present
      FROM attendances 
      WHERE user_id = ?
    `
      )
      .all(req.user.id);
    
    const attendanceMap = {};
    attendances.forEach(a => {
        attendanceMap[a.meeting_id] = a.is_present === 1;
    });

    res.json(attendanceMap);
  } catch (error) {
    console.error("Get attendances error:", error);
    res.status(500).json({ error: "Gagal mengambil absensi" });
  }
});

// Get specific meeting data
app.get("/api/meetings/:meetingId", authenticateToken, (req, res) => {
  const meetingId = parseInt(req.params.meetingId);

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
  const meetingId = parseInt(req.params.meetingId);
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
    const meetingId = parseInt(req.params.meetingId);
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
  const meetingId = parseInt(req.params.meetingId);
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
  const meetingId = parseInt(req.params.meetingId);
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
    ).run(slideIndex, getJakartaNow(), userMeeting.id);

    res.json({ message: "Progress berhasil disimpan" });
  } catch (error) {
    console.error("Save progress error:", error);
    res.status(500).json({ error: "Gagal menyimpan progress" });
  }
});

// Complete meeting
app.post("/api/meetings/:meetingId/complete", authenticateToken, (req, res) => {
  const meetingId = parseInt(req.params.meetingId);
  const { totalQuestions, correctAnswers, percentage } = req.body;

  try {
    // Validate input data
    if (
      typeof totalQuestions !== "number" ||
      typeof correctAnswers !== "number" ||
      typeof percentage !== "number"
    ) {
      return res.status(400).json({ error: "Invalid data format" });
    }

    if (correctAnswers > totalQuestions) {
      return res.status(400).json({
        error: "Correct answers cannot exceed total questions",
      });
    }

    if (percentage < 0 || percentage > 100) {
      return res
        .status(400)
        .json({ error: "Percentage must be between 0-100" });
    }

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
    // NOTE: This is the ONLY place where total_questions and percentage should be set correctly.
    // The frontend calculates these based on the actual meeting content (all quiz slides).
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
  // Count how many questions have been answered correctly
  const answers = db
    .prepare(
      `
    SELECT COUNT(*) as total, SUM(is_correct) as correct 
    FROM quiz_answers 
    WHERE user_meeting_id = ?
  `,
    )
    .get(userMeetingId);

  // NOTE: We only update correct_answers here, NOT total_questions or percentage.
  // - total_questions should reflect the ACTUAL total questions in the meeting (will be set on completion)
  // - percentage will be calculated correctly when the meeting is completed
  // This prevents incorrect data display in admin dashboard before meeting completion.

  db.prepare(
    `
    UPDATE user_meetings 
    SET correct_answers = ?,
        updated_at = ?
    WHERE id = ?
  `,
  ).run(answers.correct, getJakartaNow(), userMeetingId);
}

// ==================== TEACHER ROUTES ====================

// Download database endpoint (teacher only)
app.get("/api/teacher/database/download", authenticateTeacher, (req, res) => {
  try {
    const dbPath = path.join(__dirname, "database.sqlite");
    
    if (!fs.existsSync(dbPath)) {
      return res.status(404).json({ error: "Database file not found" });
    }

    res.download(dbPath, "database.sqlite", (err) => {
      if (err) {
        console.error("Download database error:", err);
        if (!res.headersSent) {
          res.status(500).json({ error: "Gagal mengunduh database" });
        }
      }
    });
  } catch (error) {
    console.error("Download database error:", error);
    res.status(500).json({ error: "Terjadi kesalahan sistem saat mengunduh database" });
  }
});

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
    const studentsRaw = db
      .prepare(
        `
        SELECT 
          u.id,
          u.nim,
          u.name,
          u.created_at
        FROM users u
        WHERE u.role = 'student'
        ORDER BY u.name ASC
      `,
      )
      .all();

    const allMeetings = db
      .prepare(
        `
        SELECT user_id, meeting_id, percentage, is_completed 
        FROM user_meetings
      `
      )
      .all();

    const allAttendances = db
      .prepare(
        `
        SELECT user_id, meeting_id, is_present 
        FROM attendances
        `
      )
      .all();

    const students = studentsRaw.map(student => {
      const userMeetings = allMeetings.filter(m => m.user_id === student.id);
      
      const getAvg = (start, end) => {
        let sum = 0;
        const expectedCount = end - start + 1;
        for (let i = start; i <= end; i++) {
            const m = userMeetings.find(um => um.meeting_id === i && um.is_completed);
            if (m) sum += m.percentage;
        }
        return sum / expectedCount;
      };

      const getPercentageForMeeting = (id) => {
         const m = userMeetings.find(um => um.meeting_id === id && um.is_completed);
         return m ? m.percentage : 0;
      };

      const score1to5 = getAvg(1, 5) * 0.10;
      const score6to11 = getAvg(6, 11) * 0.10;
      const score12to14 = getAvg(12, 14) * 0.10;
      const score15to16 = getAvg(15, 16) * 0.10;
      const score17to18 = getAvg(17, 18) * 0.10;
      const score19 = getPercentageForMeeting(19) * 0.30;
      const score20 = getPercentageForMeeting(20) * 0.10;

      const completedCount = userMeetings.filter(m => m.is_completed).length;
      const presentCount = allAttendances.filter(a => a.user_id === student.id && a.is_present).length;
      const attendanceScore = (Math.min(presentCount, 20) / 20) * 100 * 0.10;

      const finalScore = score1to5 + score6to11 + score12to14 + score15to16 + score17to18 + score19 + score20 + attendanceScore;

      const completedList = userMeetings.filter(m => m.is_completed);
      const oldAvg = completedList.length > 0 ? completedList.reduce((a,b)=>a+b.percentage, 0) / completedList.length : 0;

      return {
        id: student.id,
        nim: student.nim,
        name: student.name,
        created_at: student.created_at,
        total_meetings: userMeetings.length,
        completed_meetings: completedCount,
        total_present: presentCount,
        avg_score: oldAvg,
        final_score: finalScore,
        score_breakdown: {
          score1to5,
          score6to11,
          score12to14,
          score15to16,
          score17to18,
          score19,
          score20,
          attendanceScore
        },
        attendances: allAttendances.filter(a => a.user_id === student.id).map(a => ({ meeting_id: a.meeting_id, is_present: a.is_present })),
        meeting_progress: userMeetings.map(m => ({ meeting_id: m.meeting_id, percentage: m.percentage, is_completed: m.is_completed }))
      };
    });

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
    const { studentId } = req.params;
    const meetingId = parseInt(req.params.meetingId);

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

    // Calculate avg final score based on new rules
    const allStudents = db.prepare("SELECT id FROM users WHERE role = 'student'").all();
    const allMeetings = db.prepare("SELECT user_id, meeting_id, percentage, is_completed FROM user_meetings").all();
    const allAttendances = db.prepare("SELECT user_id, meeting_id, is_present FROM attendances").all();
    
    let totalScoreAll = 0;
    
    allStudents.forEach(student => {
      const userMeetings = allMeetings.filter(m => m.user_id === student.id);
      
      const getAvg = (start, end) => {
        let sum = 0;
        const expectedCount = end - start + 1;
        for (let i = start; i <= end; i++) {
            const m = userMeetings.find(um => um.meeting_id === i && um.is_completed);
            if (m) sum += m.percentage;
        }
        return sum / expectedCount;
      };

      const getPercentageForMeeting = (id) => {
         const m = userMeetings.find(um => um.meeting_id === id && um.is_completed);
         return m ? m.percentage : 0;
      };

      const score1to5 = getAvg(1, 5) * 0.10;
      const score6to11 = getAvg(6, 11) * 0.10;
      const score12to14 = getAvg(12, 14) * 0.10;
      const score15to16 = getAvg(15, 16) * 0.10;
      const score17to18 = getAvg(17, 18) * 0.10;
      const score19 = getPercentageForMeeting(19) * 0.30;
      const score20 = getPercentageForMeeting(20) * 0.10;

      const presentCount = allAttendances.filter(a => a.user_id === student.id && a.is_present).length;
      const attendanceScore = (Math.min(presentCount, 20) / 20) * 100 * 0.10;

      const finalScore = score1to5 + score6to11 + score12to14 + score15to16 + score17to18 + score19 + score20 + attendanceScore;
      totalScoreAll += finalScore;
    });

    const avgScore = allStudents.length > 0 ? (totalScoreAll / allStudents.length) : 0;

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

// Recalculate score for a specific meeting (teacher only)
app.post(
  "/api/teacher/meetings/:userMeetingId/recalculate",
  authenticateTeacher,
  (req, res) => {
    const userMeetingId = parseInt(req.params.userMeetingId);
    const { totalQuestionsActual } = req.body;

    try {
      // Validate input
      if (
        typeof totalQuestionsActual !== "number" ||
        totalQuestionsActual <= 0
      ) {
        return res.status(400).json({
          error: "totalQuestionsActual harus berupa angka positif",
        });
      }

      // Get meeting data
      const meeting = db
        .prepare(
          `
        SELECT um.*, u.name, u.nim
        FROM user_meetings um
        JOIN users u ON um.user_id = u.id
        WHERE um.id = ?
      `,
        )
        .get(userMeetingId);

      if (!meeting) {
        return res.status(404).json({ error: "Meeting tidak ditemukan" });
      }

      // Count correct answers from quiz_answers
      const answers = db
        .prepare(
          `
        SELECT COUNT(*) as total, SUM(is_correct) as correct 
        FROM quiz_answers 
        WHERE user_meeting_id = ?
      `,
        )
        .get(userMeetingId);

      const correctAnswers = answers.correct || 0;
      const percentage =
        totalQuestionsActual > 0
          ? Math.round((correctAnswers / totalQuestionsActual) * 100)
          : 0;

      // Update meeting with correct values
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
        totalQuestionsActual,
        correctAnswers,
        percentage,
        getJakartaNow(),
        userMeetingId,
      );

      res.json({
        message: "Score berhasil direcalculate",
        data: {
          userMeetingId,
          studentName: meeting.name,
          studentNim: meeting.nim,
          meetingId: meeting.meeting_id,
          totalQuestionsOld: meeting.total_questions,
          totalQuestionsNew: totalQuestionsActual,
          correctAnswers,
          percentageOld: meeting.percentage,
          percentageNew: percentage,
        },
      });
    } catch (error) {
      console.error("Recalculate score error:", error);
      res.status(500).json({ error: "Gagal recalculate score" });
    }
  },
);

// Update manual attendance for a student (teacher only)
app.post(
  "/api/teacher/students/:studentId/attendance/:meetingId",
  authenticateTeacher,
  (req, res) => {
    const studentId = parseInt(req.params.studentId);
    const meetingId = parseInt(req.params.meetingId);
    const { is_present } = req.body;

    try {
      if (typeof is_present !== "boolean") {
         return res.status(400).json({ error: "is_present must be a boolean" });
      }

      db.prepare(`
        INSERT INTO attendances (user_id, meeting_id, is_present) 
        VALUES (?, ?, ?) 
        ON CONFLICT(user_id, meeting_id) 
        DO UPDATE SET is_present = ?, timestamp = CURRENT_TIMESTAMP
      `).run(studentId, meetingId, is_present ? 1 : 0, is_present ? 1 : 0);

      res.json({ message: "Absensi berhasil disimpan" });
    } catch (error) {
      console.error("Update attendance error:", error);
      res.status(500).json({ error: "Gagal menyimpan absensi" });
    }
  }
);

// ==================== START SERVER ====================

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
});

export default app;
