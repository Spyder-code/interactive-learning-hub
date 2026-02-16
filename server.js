import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "./database.js";
import { authenticateToken } from "./middleware/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

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
      { id: user.id, nim: user.nim, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.json({
      token,
      user: {
        id: user.id,
        nim: user.nim,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat login" });
  }
});

// Register endpoint (optional)
app.post("/api/auth/register", (req, res) => {
  const { nim, password, name } = req.body;

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
    const result = db
      .prepare("INSERT INTO users (nim, name, password) VALUES (?, ?, ?)")
      .run(nim, name, hashedPassword);

    res.status(201).json({
      message: "User berhasil didaftarkan",
      user: {
        id: result.lastInsertRowid,
        nim,
        name,
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
        VALUES (?, ?, datetime('now'))
      `,
        )
        .run(req.user.id, meetingId);

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
        VALUES (?, ?, datetime('now'))
      `,
        )
        .run(req.user.id, meetingId);

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
app.post("/api/meetings/:meetingId/task", authenticateToken, (req, res) => {
  const { meetingId } = req.params;
  const { slideId, taskIndex, fileName, fileSize, fileType } = req.body;

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
        VALUES (?, ?, datetime('now'))
      `,
        )
        .run(req.user.id, meetingId);

      userMeeting = db
        .prepare(`SELECT * FROM user_meetings WHERE id = ?`)
        .get(result.lastInsertRowid);
    }

    // Insert or replace task upload
    db.prepare(
      `
      INSERT OR REPLACE INTO task_uploads 
      (user_meeting_id, slide_id, task_index, file_name, file_size, file_type)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    ).run(userMeeting.id, slideId, taskIndex, fileName, fileSize, fileType);

    res.json({ message: "Task berhasil disimpan" });
  } catch (error) {
    console.error("Save task error:", error);
    res.status(500).json({ error: "Gagal menyimpan task" });
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
        VALUES (?, ?, datetime('now'))
      `,
        )
        .run(req.user.id, meetingId);

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
      SET last_slide_index = ?, updated_at = datetime('now')
      WHERE id = ?
    `,
    ).run(maxSlideReached, userMeeting.id);

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

    // Calculate duration
    const startTime = new Date(userMeeting.start_time);
    const endTime = new Date();
    const durationMinutes = Math.round((endTime - startTime) / 1000 / 60);

    // Update meeting as completed
    db.prepare(
      `
      UPDATE user_meetings 
      SET end_time = datetime('now'),
          duration_minutes = ?,
          total_questions = ?,
          correct_answers = ?,
          percentage = ?,
          is_completed = 1,
          updated_at = datetime('now')
      WHERE id = ?
    `,
    ).run(
      durationMinutes,
      totalQuestions,
      correctAnswers,
      percentage,
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
        updated_at = datetime('now')
    WHERE id = ?
  `,
  ).run(answers.total, answers.correct, percentage, userMeetingId);
}

// ==================== START SERVER ====================

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
});

export default app;
