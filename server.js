import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import multer from "multer";
import * as Minio from "minio";
import path from "path";
import db from "./database.js";
import { authenticateToken, authenticateTeacher } from "./middleware/auth.js";
import {
  buildTeacherReportWorkbook,
  buildNilaiXlsBuffer,
  computeNilaiComponents,
  TEACHER_REPORT_CONSTANTS,
} from "./excelReport.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const MAX_UPLOAD_SIZE = 10 * 1024 * 1024;
const MINIO_BUCKET = process.env.MINIO_BUCKET || "ict-uploads";

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || "127.0.0.1",
  port: Number(process.env.MINIO_PORT || 9000),
  useSSL: String(process.env.MINIO_USE_SSL || "false") === "true",
  accessKey: process.env.MINIO_ACCESS_KEY || process.env.MINIO_ROOT_USER || "minioadmin",
  secretKey: process.env.MINIO_SECRET_KEY || process.env.MINIO_ROOT_PASSWORD || "password",
});

let bucketReadyPromise = null;

async function ensureUploadBucket() {
  if (!bucketReadyPromise) {
    bucketReadyPromise = (async () => {
      const exists = await minioClient.bucketExists(MINIO_BUCKET);
      if (!exists) {
        await minioClient.makeBucket(MINIO_BUCKET);
      }
    })().catch((error) => {
      bucketReadyPromise = null;
      throw error;
    });
  }

  return bucketReadyPromise;
}

// Helper to get current datetime in Asia/Jakarta in format YYYY-MM-DD HH:MM:SS
function getJakartaNow() {
  return new Date().toLocaleString("sv", {
    timeZone: "Asia/Jakarta",
    hour12: false,
  });
}

function padDatePart(value) {
  return String(value).padStart(2, "0");
}

function toMysqlDateTime(value) {
  if (!value) return null;
  const localDateTime = String(value).match(
    /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2}))?$/,
  );

  if (localDateTime) {
    return `${localDateTime[1]}-${localDateTime[2]}-${localDateTime[3]} ${localDateTime[4]}:${localDateTime[5]}:${localDateTime[6] || "00"}`;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return `${date.getFullYear()}-${padDatePart(date.getMonth() + 1)}-${padDatePart(
    date.getDate(),
  )} ${padDatePart(date.getHours())}:${padDatePart(date.getMinutes())}:${padDatePart(
    date.getSeconds(),
  )}`;
}

function sanitizeFilenamePart(value, fallback = "file") {
  const sanitized = String(value || "")
    .normalize("NFKD")
    .replace(/[^\w.-]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 120);

  return sanitized || fallback;
}

function buildObjectPath(nim, originalname) {
  const ext = path.extname(originalname || "");
  const basename = sanitizeFilenamePart(path.basename(originalname || "file", ext));
  const filename = `${basename}_${Date.now()}_${Math.random()
    .toString(36)
    .slice(2, 8)}${ext}`;

  return `storage/${sanitizeFilenamePart(nim, "unknown")}/${filename}`;
}

function filePathToObjectKey(filePath) {
  const normalizedPath = String(filePath || "")
    .replace(/\\/g, "/")
    .replace(/^\/+/, "");

  if (/^https?:\/\//i.test(normalizedPath)) {
    try {
      const uploadPath = new URL(normalizedPath).pathname.replace(/^\/uploads\//, "");
      return filePathToObjectKey(uploadPath);
    } catch (error) {
      return "";
    }
  }

  return normalizedPath.replace(/^storage\//, "");
}

async function uploadToObjectStorage(file, nim) {
  await ensureUploadBucket();

  const filePath = buildObjectPath(nim, file.originalname);
  const objectKey = filePathToObjectKey(filePath);

  await minioClient.putObject(MINIO_BUCKET, objectKey, file.buffer, file.size, {
    "Content-Type": file.mimetype,
    "X-Amz-Meta-Original-Name": encodeURIComponent(file.originalname),
  });

  return filePath;
}

async function deleteFromObjectStorage(filePath) {
  const objectKey = filePathToObjectKey(filePath);
  if (!objectKey) return;

  try {
    await ensureUploadBucket();
    await minioClient.removeObject(MINIO_BUCKET, objectKey);
  } catch (error) {
    if (error?.code !== "NoSuchKey" && error?.code !== "NotFound") {
      console.warn(`Failed to delete object ${objectKey}:`, error.message);
    }
  }
}

async function deleteUploadedObjects(filePaths) {
  const uniquePaths = [...new Set(filePaths.filter(Boolean))];
  if (uniquePaths.length === 0) return;

  for (const filePath of uniquePaths) {
    const objectKey = filePathToObjectKey(filePath);
    if (!objectKey) continue;

    try {
      await ensureUploadBucket();
      await minioClient.removeObject(MINIO_BUCKET, objectKey);
    } catch (error) {
      if (error?.code !== "NoSuchKey" && error?.code !== "NotFound") {
        throw error;
      }
    }
  }
}

// Allowed file types: images and office files (Word, Excel, PowerPoint)
const ALLOWED_FILE_TYPES = [
  // Images
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/heic",
  "image/heif",
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

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/heic",
  "image/heif",
];

const ALLOWED_FILE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".heic",
  ".heif",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".ppt",
  ".pptx",
  ".ppsx",
  ".pdf",
];

const ALLOWED_IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".heic",
  ".heif",
];

function isAllowedUpload(file, allowedTypes, allowedExtensions) {
  const extension = path.extname(file.originalname || "").toLowerCase();
  return (
    allowedTypes.includes(file.mimetype) ||
    allowedExtensions.includes(extension)
  );
}

// File filter for multer
const fileFilter = (req, file, cb) => {
  if (isAllowedUpload(file, ALLOWED_FILE_TYPES, ALLOWED_FILE_EXTENSIONS)) {
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

const imageFileFilter = (req, file, cb) => {
  if (isAllowedUpload(file, ALLOWED_IMAGE_TYPES, ALLOWED_IMAGE_EXTENSIONS)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only image screenshots are allowed."),
      false,
    );
  }
};

// Keep upload content in memory, then persist it to MinIO after route validation.
const storage = multer.memoryStorage();

// Multer upload middleware (10MB max file size)
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: MAX_UPLOAD_SIZE,
  },
});

const attendanceUpload = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: MAX_UPLOAD_SIZE,
  },
});

function handleMulter(middleware) {
  return (req, res, next) => {
    middleware(req, res, (error) => {
      if (!error) {
        return next();
      }

      if (error instanceof multer.MulterError) {
        const messages = {
          LIMIT_FILE_SIZE: "Ukuran file maksimal 10MB",
          LIMIT_UNEXPECTED_FILE: "Field upload tidak valid",
        };

        return res.status(400).json({
          error: messages[error.code] || error.message || "Upload tidak valid",
        });
      }

      return res.status(400).json({
        error: error.message || "Upload tidak valid",
      });
    });
  };
}

// Middleware
// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);

    const allowedOrigins = (
      process.env.CORS_ORIGINS ||
      [
        "http://ict.local",
        "https://ict.local",
        "https://ict.zhaf.my.id",
        "https://ict.mediku.my.id",
        "https://ict.mediku.cloud",
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:8080",
      ].join(",")
    )
      .split(",")
      .map((allowedOrigin) => allowedOrigin.trim())
      .filter(Boolean);

    if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 600, // Cache preflight requests for 10 minutes
};

app.use(cors(corsOptions));
app.use(express.json());

// Serve uploaded files through the API while the bytes live in MinIO.
app.get(/^\/uploads\/(.+)/, async (req, res) => {
  const objectKey = filePathToObjectKey(req.params[0]);

  try {
    await ensureUploadBucket();
    const stat = await minioClient.statObject(MINIO_BUCKET, objectKey);
    const stream = await minioClient.getObject(MINIO_BUCKET, objectKey);

    if (stat.metaData?.["content-type"]) {
      res.setHeader("Content-Type", stat.metaData["content-type"]);
    }
    if (stat.size) {
      res.setHeader("Content-Length", stat.size);
    }
    res.setHeader("Cache-Control", "private, max-age=3600");

    stream.on("error", (error) => {
      console.error("Upload stream error:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Gagal memuat file" });
      } else {
        res.destroy(error);
      }
    });
    stream.pipe(res);
  } catch (error) {
    if (error?.code === "NoSuchKey" || error?.code === "NotFound") {
      return res.status(404).json({ error: "File tidak ditemukan" });
    }

    console.error("Get upload error:", error);
    res.status(500).json({ error: "Gagal memuat file" });
  }
});

app.get("/api/health", async (req, res) => {
  try {
    await db.prepare("SELECT 1 AS ok").get();
    await ensureUploadBucket();
    res.json({ status: "ok", database: "ok", objectStorage: "ok" });
  } catch (error) {
    console.error("Health check error:", error);
    res.status(500).json({ status: "error", database: "error", objectStorage: "error" });
  }
});

// ==================== AUTH ROUTES ====================

// Login endpoint
app.post("/api/auth/login", async (req, res) => {
  const { nim, password } = req.body;

  if (!nim || !password) {
    return res.status(400).json({ error: "NIM dan password harus diisi" });
  }

  try {
    const user = await db.prepare("SELECT * FROM users WHERE nim = ?").get(nim);

    if (!user) {
      return res.status(401).json({ error: "NIM atau password salah" });
    }

    // Check if user is active
    if (user.is_active === 0) {
      return res.status(403).json({
        error: "Akun Anda tidak aktif. Silakan hubungi administrator.",
      });
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
app.post("/api/auth/register", async (req, res) => {
  const { nim, password, name, role } = req.body;

  if (!nim || !password || !name) {
    return res.status(400).json({ error: "Semua field harus diisi" });
  }

  try {
    const existingUser = await db
      .prepare("SELECT * FROM users WHERE nim = ?")
      .get(nim);

    if (existingUser) {
      return res.status(409).json({ error: "NIM sudah terdaftar" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const userRole = role || "student";
    const result = await db
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
app.get("/api/auth/verify", authenticateToken, async (req, res) => {
  res.json({ user: req.user });
});

// ==================== MEETING ROUTES ====================

app.get("/api/meeting-definitions", authenticateToken, async (req, res) => {
  try {
    const meetings = await db
      .prepare(
        `
        SELECT
          meeting_key as id,
          meeting_number as number,
          title,
          subtitle,
          duration,
          opened_at as openedAt,
          closed_at as closedAt,
          attendance_opened_at as attendanceOpenedAt,
          attendance_closed_at as attendanceClosedAt,
          is_active as isActive
        FROM meetings
        WHERE is_active = 1
        ORDER BY meeting_number ASC
      `,
      )
      .all();

    res.json(meetings);
  } catch (error) {
    console.error("Get meeting definitions error:", error);
    res.status(500).json({ error: "Gagal mengambil daftar pertemuan" });
  }
});

// Get all meetings for user
app.get("/api/meetings", authenticateToken, async (req, res) => {
  try {
    const userMeetings = await db
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
app.get("/api/meetings/all-status", authenticateToken, async (req, res) => {
  try {
    const userMeetings = await db
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

// Get personal upload-based attendances (for students)
app.get("/api/attendances/me", authenticateToken, async (req, res) => {
  try {
    const attendances = await db
      .prepare(
        `
      SELECT
        meeting_id,
        is_present,
        file_name,
        file_size,
        file_type,
        file_path,
        uploaded_at,
        source
      FROM attendances 
      WHERE user_id = ?
    `,
      )
      .all(req.user.id);

    const attendanceMap = {};
    attendances.forEach((a) => {
      attendanceMap[a.meeting_id] = {
        isPresent: a.is_present === 1 && Boolean(a.file_path),
        fileName: a.file_name,
        fileSize: a.file_size,
        fileType: a.file_type,
        filePath: a.file_path,
        uploadedAt: a.uploaded_at,
        source: a.source,
      };
    });

    res.json(attendanceMap);
  } catch (error) {
    console.error("Get attendances error:", error);
    res.status(500).json({ error: "Gagal mengambil absensi" });
  }
});

// Upload meeting attendance screenshot. A valid upload marks the student present.
app.post(
  "/api/meetings/:meetingId/attendance",
  authenticateToken,
  handleMulter(attendanceUpload.single("file")),
  async (req, res) => {
    const meetingId = parseInt(req.params.meetingId);
    let newFilePath = null;

    try {
      if (!Number.isInteger(meetingId) || meetingId <= 0) {
        return res.status(400).json({ error: "Nomor pertemuan tidak valid" });
      }

      if (!req.file) {
        return res.status(400).json({ error: "Screenshot Zoom wajib diupload" });
      }

      const meeting = await db
        .prepare(
          `
          SELECT
            meeting_number,
            attendance_opened_at,
            attendance_closed_at,
            is_active
          FROM meetings
          WHERE meeting_number = ?
        `,
        )
        .get(meetingId);

      if (!meeting || meeting.is_active === 0) {
        return res
          .status(404)
          .json({ error: "Pertemuan tidak ditemukan atau tidak aktif" });
      }

      const nowJakarta = new Date(getJakartaNow());
      if (meeting.attendance_opened_at && nowJakarta < new Date(meeting.attendance_opened_at + "+07:00")) {
        return res
          .status(400)
          .json({ error: "Absensi belum dibuka untuk pertemuan ini" });
      }

      if (meeting.attendance_closed_at && nowJakarta > new Date(meeting.attendance_closed_at + "+07:00")) {
        return res
          .status(400)
          .json({ error: "Absensi sudah ditutup untuk pertemuan ini" });
      }

      const existingAttendance = await db
        .prepare(
          `
          SELECT file_path
          FROM attendances
          WHERE user_id = ? AND meeting_id = ?
        `,
        )
        .get(req.user.id, meetingId);

      const uploadedAt = getJakartaNow();
      newFilePath = await uploadToObjectStorage(req.file, req.user.nim);

      await db
        .prepare(
          `
          INSERT INTO attendances
            (user_id, meeting_id, is_present, file_name, file_size, file_type, file_path, uploaded_at, source, timestamp)
          VALUES (?, ?, 1, ?, ?, ?, ?, ?, 'upload', ?)
          ON DUPLICATE KEY UPDATE
            is_present = 1,
            file_name = VALUES(file_name),
            file_size = VALUES(file_size),
            file_type = VALUES(file_type),
            file_path = VALUES(file_path),
            uploaded_at = VALUES(uploaded_at),
            source = 'upload',
            timestamp = VALUES(timestamp)
        `,
        )
        .run(
          req.user.id,
          meetingId,
          req.file.originalname,
          req.file.size,
          req.file.mimetype,
          newFilePath,
          uploadedAt,
          uploadedAt,
        );

      if (existingAttendance?.file_path) {
        await deleteFromObjectStorage(existingAttendance.file_path);
      }

      res.json({
        message: "Absensi berhasil disimpan",
        attendance: {
          meetingId,
          isPresent: true,
          fileName: req.file.originalname,
          fileSize: req.file.size,
          fileType: req.file.mimetype,
          filePath: newFilePath,
          uploadedAt,
          source: "upload",
        },
      });
    } catch (error) {
      console.error("Upload attendance error:", error);
      if (newFilePath) {
        await deleteFromObjectStorage(newFilePath);
      }
      res.status(500).json({ error: "Gagal menyimpan absensi" });
    }
  },
);

// Get specific meeting data
app.get("/api/meetings/:meetingId", authenticateToken, async (req, res) => {
  const meetingId = parseInt(req.params.meetingId);

  try {
    let userMeeting = await db
      .prepare(
        `
      SELECT * FROM user_meetings 
      WHERE user_id = ? AND meeting_id = ?
    `,
      )
      .get(req.user.id, meetingId);

    // If meeting doesn't exist, create it
    if (!userMeeting) {
      const result = await db
      .prepare(
          `
        INSERT INTO user_meetings (user_id, meeting_id, start_time)
        VALUES (?, ?, ?)
      `,
        )
        .run(req.user.id, meetingId, getJakartaNow());

      userMeeting = await db
        .prepare(`SELECT * FROM user_meetings WHERE id = ?`)
        .get(result.lastInsertRowid);
    }

    // Get quiz answers
    const quizAnswers = await db
      .prepare(
        `
      SELECT * FROM quiz_answers 
      WHERE user_meeting_id = ?
    `,
      )
      .all(userMeeting.id);

    // Get task uploads
    const taskUploads = await db
      .prepare(
        `
      SELECT * FROM task_uploads 
      WHERE user_meeting_id = ?
    `,
      )
      .all(userMeeting.id);

    // Get slide progress
    const slideProgress = await db
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
app.post("/api/meetings/:meetingId/quiz", authenticateToken, async (req, res) => {
  const meetingId = parseInt(req.params.meetingId);
  const { slideId, questionIndex, selectedOption, isCorrect, questionType } =
    req.body;

  try {
    // Get or create user meeting
    let userMeeting = await db
      .prepare(
        `
      SELECT * FROM user_meetings 
      WHERE user_id = ? AND meeting_id = ?
    `,
      )
      .get(req.user.id, meetingId);

    if (!userMeeting) {
      const result = await db
      .prepare(
          `
        INSERT INTO user_meetings (user_id, meeting_id, start_time)
        VALUES (?, ?, ?)
      `,
        )
        .run(req.user.id, meetingId, getJakartaNow());

      userMeeting = await db
        .prepare(`SELECT * FROM user_meetings WHERE id = ?`)
        .get(result.lastInsertRowid);
    }

    // Insert or replace quiz answer
    await db.prepare(
      `
      INSERT INTO quiz_answers
      (user_meeting_id, slide_id, question_index, selected_option, is_correct, question_type)
      VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        selected_option = VALUES(selected_option),
        is_correct = VALUES(is_correct),
        question_type = VALUES(question_type),
        timestamp = CURRENT_TIMESTAMP
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
    await updateMeetingStats(userMeeting.id);

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
  handleMulter(upload.single("file")),
  async (req, res) => {
    const meetingId = parseInt(req.params.meetingId);
    const { slideId, taskIndex } = req.body;
    let newFilePath = null;

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
      let userMeeting = await db
      .prepare(
          `
      SELECT * FROM user_meetings 
      WHERE user_id = ? AND meeting_id = ?
    `,
        )
        .get(req.user.id, meetingId);

      if (!userMeeting) {
        const result = await db
      .prepare(
            `
        INSERT INTO user_meetings (user_id, meeting_id, start_time)
        VALUES (?, ?, ?)
      `,
          )
          .run(req.user.id, meetingId, getJakartaNow());

        userMeeting = await db
          .prepare(`SELECT * FROM user_meetings WHERE id = ?`)
          .get(result.lastInsertRowid);
      }

      // Delete old file if exists
      const existingUpload = await db
      .prepare(
          `
      SELECT file_path FROM task_uploads 
      WHERE user_meeting_id = ? AND slide_id = ? AND task_index = ?
    `,
        )
        .get(userMeeting.id, slideId, taskIndex);

      newFilePath = await uploadToObjectStorage(req.file, req.user.nim);

      // Insert or replace task upload
      await db.prepare(
        `
      INSERT INTO task_uploads
      (user_meeting_id, slide_id, task_index, file_name, file_size, file_type, file_path)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        file_name = VALUES(file_name),
        file_size = VALUES(file_size),
        file_type = VALUES(file_type),
        file_path = VALUES(file_path),
        timestamp = CURRENT_TIMESTAMP
    `,
      ).run(
        userMeeting.id,
        slideId,
        taskIndex,
        req.file.originalname,
        req.file.size,
        req.file.mimetype,
        newFilePath,
      );

      if (existingUpload?.file_path) {
        await deleteFromObjectStorage(existingUpload.file_path);
      }

      res.json({
        message: "Task berhasil disimpan",
        file: {
          name: req.file.originalname,
          size: req.file.size,
          type: req.file.mimetype,
          path: newFilePath,
        },
      });
    } catch (error) {
      console.error("Save task error:", error);
      if (newFilePath) {
        await deleteFromObjectStorage(newFilePath);
      }
      res.status(500).json({ error: "Gagal menyimpan task" });
    }
  },
);

// Delete task upload
app.delete("/api/meetings/:meetingId/task", authenticateToken, async (req, res) => {
  const meetingId = parseInt(req.params.meetingId);
  const { slideId, taskIndex } = req.body;

  try {
    // Get user meeting
    const userMeeting = await db
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
    const upload = await db
      .prepare(
        `
      SELECT file_path FROM task_uploads 
      WHERE user_meeting_id = ? AND slide_id = ? AND task_index = ?
    `,
      )
      .get(userMeeting.id, slideId, taskIndex);

    // Delete from database
    await db.prepare(
      `
      DELETE FROM task_uploads 
      WHERE user_meeting_id = ? AND slide_id = ? AND task_index = ?
    `,
    ).run(userMeeting.id, slideId, taskIndex);

    if (upload?.file_path) {
      await deleteFromObjectStorage(upload.file_path);
    }

    res.json({ message: "Task berhasil dihapus" });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({ error: "Gagal menghapus task" });
  }
});

// Update slide progress
app.post("/api/meetings/:meetingId/progress", authenticateToken, async (req, res) => {
  const meetingId = parseInt(req.params.meetingId);
  const { slideIndex, maxSlideReached } = req.body;

  try {
    // Get or create user meeting
    let userMeeting = await db
      .prepare(
        `
      SELECT * FROM user_meetings 
      WHERE user_id = ? AND meeting_id = ?
    `,
      )
      .get(req.user.id, meetingId);

    if (!userMeeting) {
      const result = await db
      .prepare(
          `
        INSERT INTO user_meetings (user_id, meeting_id, start_time)
        VALUES (?, ?, ?)
      `,
        )
        .run(req.user.id, meetingId, getJakartaNow());

      userMeeting = await db
        .prepare(`SELECT * FROM user_meetings WHERE id = ?`)
        .get(result.lastInsertRowid);
    }

    // Update or insert slide progress
    await db.prepare(
      `
      INSERT INTO slide_progress
      (user_meeting_id, slide_index, max_slide_reached)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE
        max_slide_reached = VALUES(max_slide_reached),
        timestamp = CURRENT_TIMESTAMP
    `,
    ).run(userMeeting.id, slideIndex, maxSlideReached);

    // Update last_slide_index in user_meetings
    await db.prepare(
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
app.post("/api/meetings/:meetingId/complete", authenticateToken, async (req, res) => {
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

    const userMeeting = await db
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
      const startTime = new Date(userMeeting.start_time + "+07:00");
      const endTime = new Date(getJakartaNow());
      durationMinutes = Math.round((endTime - startTime) / 1000 / 60);
    }

    // Update meeting as completed
    // NOTE: This is the ONLY place where total_questions and percentage should be set correctly.
    // The frontend calculates these based on the actual meeting content (all quiz slides).
    const endTimeJakarta = getJakartaNow();
    await db.prepare(
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

async function updateMeetingStats(userMeetingId) {
  // Count how many questions have been answered correctly
  const answers = await db
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

  await db.prepare(
    `
    UPDATE user_meetings 
    SET correct_answers = ?,
        updated_at = ?
    WHERE id = ?
  `,
  ).run(answers.correct || 0, getJakartaNow(), userMeetingId);
}

// ==================== TEACHER ROUTES ====================

// Download database endpoint (teacher only)
app.get("/api/teacher/database/download", authenticateTeacher, async (req, res) => {
  try {
    const tableNames = [
      "meetings",
      "users",
      "user_meetings",
      "quiz_answers",
      "task_uploads",
      "slide_progress",
      "attendances",
    ];
    const exportData = {};

    for (const tableName of tableNames) {
      exportData[tableName] = await db
        .prepare(`SELECT * FROM ${tableName}`)
        .all();
    }

    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="database-export-${Date.now()}.json"`,
    );
    res.send(JSON.stringify(exportData, null, 2));
  } catch (error) {
    console.error("Download database export error:", error);
    res.status(500).json({ error: "Gagal mengekspor database" });
  }
});

// Export laporan Excel (JADWAL + DOKUMENTASI) - teacher only
app.get("/api/teacher/reports/export-excel", authenticateTeacher, async (req, res) => {
  try {
    const meetings = await db
      .prepare(
        `
        SELECT
          meeting_number,
          DATE_FORMAT(opened_at, '%Y-%m-%d %H:%i:%s') AS opened_at
        FROM meetings
        ORDER BY meeting_number ASC
        LIMIT 20
      `,
      )
      .all();

    // Foto dokumentasi: absensi milik user NIM khusus dokumentasi
    const attendanceRows = await db
      .prepare(
        `
        SELECT m.meeting_number, a.file_path, a.file_type
        FROM attendances a
        JOIN users u ON u.id = a.user_id
        JOIN meetings m ON m.id = a.meeting_id
        WHERE u.nim = ?
          AND a.file_path IS NOT NULL
          AND m.meeting_number BETWEEN 1 AND 20
      `,
      )
      .all(TEACHER_REPORT_CONSTANTS.DOKUMENTASI_NIM);

    const extensionFromType = (fileType, filePath) => {
      const source = `${fileType || ""} ${filePath || ""}`.toLowerCase();
      if (source.includes("png")) return "png";
      if (source.includes("gif")) return "gif";
      if (source.includes("jpg") || source.includes("jpeg")) return "jpeg";
      return null; // format tidak didukung Excel
    };

    const images = [];
    for (const row of attendanceRows) {
      const objectKey = filePathToObjectKey(row.file_path);
      const extension = extensionFromType(row.file_type, row.file_path);
      if (!objectKey || !extension) continue;

      try {
        await ensureUploadBucket();
        const stream = await minioClient.getObject(MINIO_BUCKET, objectKey);
        const chunks = [];
        for await (const chunk of stream) chunks.push(chunk);
        images.push({
          meetingNumber: row.meeting_number,
          buffer: Buffer.concat(chunks),
          extension,
        });
      } catch (error) {
        console.warn(
          `Skip dokumentasi image ${objectKey}: ${error.message}`,
        );
      }
    }

    const workbook = buildTeacherReportWorkbook({ meetings, images });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${TEACHER_REPORT_CONSTANTS.NAMA_KELAS}.xlsx"`,
    );
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Export excel report error:", error);
    res.status(500).json({ error: "Gagal mengekspor laporan Excel" });
  }
});

// Export nilai .xls sesuai template_nilai.xls (teacher only)
app.get("/api/teacher/reports/export-nilai", authenticateTeacher, async (req, res) => {
  try {
    const students = await db
      .prepare(
        `
        SELECT id, nim, name
        FROM users
        WHERE role = 'student' AND nim != ?
        ORDER BY nim ASC
      `,
      )
      .all(TEACHER_REPORT_CONSTANTS.DOKUMENTASI_NIM);

    const allMeetings = await db
      .prepare(
        `
        SELECT user_id, meeting_id, percentage, is_completed
        FROM user_meetings
      `,
      )
      .all();

    const allAttendances = await db
      .prepare(
        `
        SELECT user_id
        FROM attendances
        WHERE is_present = 1 AND file_path IS NOT NULL
      `,
      )
      .all();

    const rows = students.map((student) => {
      const userMeetings = allMeetings.filter(
        (m) => m.user_id === student.id,
      );
      const presentCount = allAttendances.filter(
        (a) => a.user_id === student.id,
      ).length;

      return {
        nim: student.nim,
        name: student.name,
        nilai: computeNilaiComponents(userMeetings, presentCount),
      };
    });

    const buffer = buildNilaiXlsBuffer(rows);

    res.setHeader("Content-Type", "application/vnd.ms-excel");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="nilai-${TEACHER_REPORT_CONSTANTS.NAMA_KELAS}.xls"`,
    );
    res.send(buffer);
  } catch (error) {
    console.error("Export nilai error:", error);
    res.status(500).json({ error: "Gagal mengekspor nilai" });
  }
});

// Get all students (teacher only)
app.get("/api/teacher/students", authenticateTeacher, async (req, res) => {
  try {
    const students = await db
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

// Import students from teacher dashboard. New student passwords default to NIM.
app.post("/api/teacher/students/import", authenticateTeacher, async (req, res) => {
  const { students } = req.body;

  try {
    if (!Array.isArray(students) || students.length === 0) {
      return res.status(400).json({ error: "Data mahasiswa kosong" });
    }

    if (students.length > 1000) {
      return res.status(400).json({ error: "Maksimal 1000 mahasiswa per import" });
    }

    const normalizedStudents = [];
    const seenNims = new Set();
    const invalidRows = [];

    students.forEach((student, index) => {
      const nim = String(student?.nim || "").trim();
      const name = String(student?.name || "").trim();

      if (!nim || !name) {
        invalidRows.push(index + 1);
        return;
      }

      if (seenNims.has(nim)) {
        return;
      }

      seenNims.add(nim);
      normalizedStudents.push({ nim, name });
    });

    if (normalizedStudents.length === 0) {
      return res.status(400).json({ error: "Tidak ada baris valid. Pastikan kolom NIM dan Nama terisi." });
    }

    let inserted = 0;
    let updated = 0;
    let skipped = 0;

    for (const student of normalizedStudents) {
      const existingUser = await db
        .prepare("SELECT id, role FROM users WHERE nim = ?")
        .get(student.nim);

      if (existingUser && existingUser.role !== "student") {
        skipped += 1;
        continue;
      }

      if (existingUser) {
        await db
          .prepare("UPDATE users SET name = ?, is_active = 1 WHERE id = ?")
          .run(student.name, existingUser.id);
        updated += 1;
        continue;
      }

      await db
        .prepare(
          "INSERT INTO users (nim, name, password, role, is_active) VALUES (?, ?, ?, 'student', 1)",
        )
        .run(student.nim, student.name, bcrypt.hashSync(student.nim, 10));
      inserted += 1;
    }

    res.status(201).json({
      message: "Import mahasiswa selesai",
      summary: {
        received: students.length,
        valid: normalizedStudents.length,
        inserted,
        updated,
        skipped,
        invalid: invalidRows.length,
      },
    });
  } catch (error) {
    console.error("Import students error:", error);
    res.status(500).json({ error: "Gagal import mahasiswa" });
  }
});

// Delete all student accounts and every uploaded file owned by students.
app.delete("/api/teacher/students", authenticateTeacher, async (req, res) => {
  try {
    const students = await db
      .prepare("SELECT id FROM users WHERE role = 'student'")
      .all();
    const studentIds = students.map((student) => student.id);

    if (studentIds.length === 0) {
      return res.json({
        message: "Tidak ada mahasiswa untuk dihapus",
        summary: { deletedStudents: 0, deletedFiles: 0 },
      });
    }

    const taskUploads = await db
      .prepare(
        `
        SELECT tu.file_path
        FROM task_uploads tu
        JOIN user_meetings um ON tu.user_meeting_id = um.id
        JOIN users u ON um.user_id = u.id
        WHERE u.role = 'student' AND tu.file_path IS NOT NULL
      `,
      )
      .all();

    const attendanceUploads = await db
      .prepare(
        `
        SELECT a.file_path
        FROM attendances a
        JOIN users u ON a.user_id = u.id
        WHERE u.role = 'student' AND a.file_path IS NOT NULL
      `,
      )
      .all();

    const uploadPaths = [
      ...taskUploads.map((upload) => upload.file_path),
      ...attendanceUploads.map((upload) => upload.file_path),
    ];

    await deleteUploadedObjects(uploadPaths);

    await db
      .prepare(
        `
        DELETE qa
        FROM quiz_answers qa
        JOIN user_meetings um ON qa.user_meeting_id = um.id
        JOIN users u ON um.user_id = u.id
        WHERE u.role = 'student'
      `,
      )
      .run();
    await db
      .prepare(
        `
        DELETE tu
        FROM task_uploads tu
        JOIN user_meetings um ON tu.user_meeting_id = um.id
        JOIN users u ON um.user_id = u.id
        WHERE u.role = 'student'
      `,
      )
      .run();
    await db
      .prepare(
        `
        DELETE sp
        FROM slide_progress sp
        JOIN user_meetings um ON sp.user_meeting_id = um.id
        JOIN users u ON um.user_id = u.id
        WHERE u.role = 'student'
      `,
      )
      .run();
    await db
      .prepare(
        `
        DELETE a
        FROM attendances a
        JOIN users u ON a.user_id = u.id
        WHERE u.role = 'student'
      `,
      )
      .run();
    await db
      .prepare(
        `
        DELETE um
        FROM user_meetings um
        JOIN users u ON um.user_id = u.id
        WHERE u.role = 'student'
      `,
      )
      .run();

    const result = await db
      .prepare("DELETE FROM users WHERE role = 'student'")
      .run();

    res.json({
      message: "Semua mahasiswa dan file upload berhasil dihapus",
      summary: {
        deletedStudents: result.changes || studentIds.length,
        deletedFiles: new Set(uploadPaths.filter(Boolean)).size,
      },
    });
  } catch (error) {
    console.error("Delete all students error:", error);
    res.status(500).json({ error: "Gagal menghapus semua mahasiswa" });
  }
});

// Get all students with meeting summary (teacher only)
app.get("/api/teacher/students/summary", authenticateTeacher, async (req, res) => {
  try {
    const studentsRaw = await db
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

    const allMeetings = await db
      .prepare(
        `
        SELECT user_id, meeting_id, percentage, is_completed 
        FROM user_meetings
      `,
      )
      .all();

    const allAttendances = await db
      .prepare(
        `
        SELECT
          user_id,
          meeting_id,
          is_present,
          file_name,
          file_size,
          file_type,
          file_path,
          uploaded_at,
          source
        FROM attendances
        `,
      )
      .all();

    const students = studentsRaw.map((student) => {
      const userMeetings = allMeetings.filter((m) => m.user_id === student.id);

      const getAvg = (start, end) => {
        let sum = 0;
        const expectedCount = end - start + 1;
        for (let i = start; i <= end; i++) {
          const m = userMeetings.find(
            (um) => um.meeting_id === i && um.is_completed,
          );
          if (m) sum += m.percentage;
        }
        return sum / expectedCount;
      };

      const getPercentageForMeeting = (id) => {
        const m = userMeetings.find(
          (um) => um.meeting_id === id && um.is_completed,
        );
        return m ? m.percentage : 0;
      };

      const score1to5 = getAvg(1, 5) * 0.1;
      const score6to11 = getAvg(6, 11) * 0.1;
      const score12to14 = getAvg(12, 14) * 0.1;
      const score15to16 = getAvg(15, 16) * 0.1;
      const score17to18 = getAvg(17, 18) * 0.1;
      const score19 = getPercentageForMeeting(19) * 0.1;
      const score20 = getPercentageForMeeting(20) * 0.3;

      const completedCount = userMeetings.filter((m) => m.is_completed).length;
      const presentCount = allAttendances.filter(
        (a) => a.user_id === student.id && a.is_present && a.file_path,
      ).length;
      const attendanceScore = (Math.min(presentCount, 20) / 20) * 100 * 0.1;

      const finalScore =
        score1to5 +
        score6to11 +
        score12to14 +
        score15to16 +
        score17to18 +
        score19 +
        score20 +
        attendanceScore;

      const completedList = userMeetings.filter((m) => m.is_completed);
      const oldAvg =
        completedList.length > 0
          ? completedList.reduce((a, b) => a + b.percentage, 0) /
            completedList.length
          : 0;

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
          attendanceScore,
        },
        attendances: allAttendances
          .filter((a) => a.user_id === student.id)
          .map((a) => ({
            meeting_id: a.meeting_id,
            is_present: a.is_present && a.file_path ? 1 : 0,
            file_name: a.file_name,
            file_size: a.file_size,
            file_type: a.file_type,
            file_path: a.file_path,
            uploaded_at: a.uploaded_at,
            source: a.source,
          })),
        meeting_progress: userMeetings.map((m) => ({
          meeting_id: m.meeting_id,
          percentage: m.percentage,
          is_completed: m.is_completed,
        })),
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
  async (req, res) => {
    const { studentId } = req.params;

    try {
      const meetings = await db
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
  async (req, res) => {
    const { studentId } = req.params;
    const meetingId = parseInt(req.params.meetingId);

    try {
      const meeting = await db
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
      const quizAnswers = await db
      .prepare(
          `
        SELECT * FROM quiz_answers 
        WHERE user_meeting_id = ?
        ORDER BY slide_id, question_index
      `,
        )
        .all(meeting.id);

      // Get task uploads
      const taskUploads = await db
      .prepare(
          `
        SELECT * FROM task_uploads 
        WHERE user_meeting_id = ?
        ORDER BY slide_id, task_index
      `,
        )
        .all(meeting.id);

      // Get slide progress
      const slideProgress = await db
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
app.get("/api/teacher/reports/meetings", authenticateTeacher, async (req, res) => {
  const meetingId = req.query.meetingId || req.query.meetingNumber;

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

    const reports = await db.prepare(query).all(...params);

    res.json(reports);
  } catch (error) {
    console.error("Get meeting reports error:", error);
    res.status(500).json({ error: "Gagal mengambil laporan meeting" });
  }
});

// Get all meeting definitions for management (teacher only)
app.get("/api/teacher/meeting-definitions", authenticateTeacher, async (req, res) => {
  try {
    const meetings = await db
      .prepare(
        `
        SELECT
          meeting_key as id,
          meeting_number as number,
          title,
          subtitle,
          duration,
          opened_at as openedAt,
          closed_at as closedAt,
          attendance_opened_at as attendanceOpenedAt,
          attendance_closed_at as attendanceClosedAt,
          is_active as isActive,
          created_at as createdAt,
          updated_at as updatedAt
        FROM meetings
        ORDER BY meeting_number ASC
      `,
      )
      .all();

    res.json(meetings);
  } catch (error) {
    console.error("Get teacher meeting definitions error:", error);
    res.status(500).json({ error: "Gagal mengambil daftar meeting" });
  }
});

// Update a meeting definition (teacher only)
app.put(
  "/api/teacher/meeting-definitions/:meetingNumber",
  authenticateTeacher,
  async (req, res) => {
    const meetingNumber = parseInt(req.params.meetingNumber);
    const {
      title,
      subtitle,
      duration,
      openedAt,
      closedAt,
      attendanceOpenedAt,
      attendanceClosedAt,
      isActive,
    } = req.body;

    try {
      if (!Number.isInteger(meetingNumber) || meetingNumber <= 0) {
        return res.status(400).json({ error: "Nomor meeting tidak valid" });
      }

      if (
        typeof title !== "string" ||
        typeof subtitle !== "string" ||
        !title.trim() ||
        !subtitle.trim()
      ) {
        return res.status(400).json({ error: "Judul dan subtitle harus diisi" });
      }

      if (!Number.isInteger(duration) || duration <= 0) {
        return res.status(400).json({ error: "Durasi harus berupa angka positif" });
      }

      if (typeof isActive !== "boolean") {
        return res.status(400).json({ error: "Status aktif harus boolean" });
      }

      const existing = await db
        .prepare("SELECT * FROM meetings WHERE meeting_number = ?")
        .get(meetingNumber);

      if (!existing) {
        return res.status(404).json({ error: "Meeting tidak ditemukan" });
      }

      const openedAtValue = toMysqlDateTime(openedAt);
      const closedAtValue = toMysqlDateTime(closedAt);
      const attendanceOpenedAtValue = toMysqlDateTime(attendanceOpenedAt);
      const attendanceClosedAtValue = toMysqlDateTime(attendanceClosedAt);

      if (openedAt && !openedAtValue) {
        return res.status(400).json({ error: "Format tanggal buka tidak valid" });
      }

      if (closedAt && !closedAtValue) {
        return res.status(400).json({ error: "Format tanggal tutup tidak valid" });
      }

      if (attendanceOpenedAt && !attendanceOpenedAtValue) {
        return res
          .status(400)
          .json({ error: "Format mulai absensi tidak valid" });
      }

      if (attendanceClosedAt && !attendanceClosedAtValue) {
        return res
          .status(400)
          .json({ error: "Format selesai absensi tidak valid" });
      }

      if (openedAtValue && closedAtValue && new Date(openedAtValue) > new Date(closedAtValue)) {
        return res
          .status(400)
          .json({ error: "Tanggal buka tidak boleh setelah tanggal tutup" });
      }

      if (
        attendanceOpenedAtValue &&
        attendanceClosedAtValue &&
        new Date(attendanceOpenedAtValue) > new Date(attendanceClosedAtValue)
      ) {
        return res
          .status(400)
          .json({ error: "Mulai absensi tidak boleh setelah selesai absensi" });
      }

      await db
        .prepare(
          `
          UPDATE meetings
          SET title = ?,
              subtitle = ?,
              duration = ?,
              opened_at = ?,
              closed_at = ?,
              attendance_opened_at = ?,
              attendance_closed_at = ?,
              is_active = ?,
              updated_at = CURRENT_TIMESTAMP
          WHERE meeting_number = ?
        `,
        )
        .run(
          title.trim(),
          subtitle.trim(),
          duration,
          openedAtValue,
          closedAtValue,
          attendanceOpenedAtValue,
          attendanceClosedAtValue,
          isActive ? 1 : 0,
          meetingNumber,
        );

      const meeting = await db
        .prepare(
          `
          SELECT
            meeting_key as id,
            meeting_number as number,
            title,
            subtitle,
            duration,
            opened_at as openedAt,
            closed_at as closedAt,
            attendance_opened_at as attendanceOpenedAt,
            attendance_closed_at as attendanceClosedAt,
            is_active as isActive,
            created_at as createdAt,
            updated_at as updatedAt
          FROM meetings
          WHERE meeting_number = ?
        `,
        )
        .get(meetingNumber);

      res.json({ message: "Meeting berhasil disimpan", meeting });
    } catch (error) {
      console.error("Update meeting definition error:", error);
      res.status(500).json({ error: "Gagal menyimpan meeting" });
    }
  },
);

// Get overall statistics (teacher only)
app.get("/api/teacher/statistics", authenticateTeacher, async (req, res) => {
  try {
    const totalStudentsRow = await db
      .prepare("SELECT COUNT(*) as count FROM users WHERE role = 'student'")
      .get();

    const totalMeetingsRow = await db
      .prepare("SELECT COUNT(DISTINCT meeting_id) as count FROM user_meetings")
      .get();

    const completedMeetingsRow = await db
      .prepare(
        "SELECT COUNT(*) as count FROM user_meetings WHERE is_completed = 1",
      )
      .get();

    // Calculate avg final score based on new rules
    const allStudents = await db
      .prepare("SELECT id FROM users WHERE role = 'student'")
      .all();
    const allMeetings = await db
      .prepare(
        "SELECT user_id, meeting_id, percentage, is_completed FROM user_meetings",
      )
      .all();
    const allAttendances = await db
      .prepare("SELECT user_id, meeting_id, is_present, file_path FROM attendances")
      .all();

    let totalScoreAll = 0;

    allStudents.forEach((student) => {
      const userMeetings = allMeetings.filter((m) => m.user_id === student.id);

      const getAvg = (start, end) => {
        let sum = 0;
        const expectedCount = end - start + 1;
        for (let i = start; i <= end; i++) {
          const m = userMeetings.find(
            (um) => um.meeting_id === i && um.is_completed,
          );
          if (m) sum += m.percentage;
        }
        return sum / expectedCount;
      };

      const getPercentageForMeeting = (id) => {
        const m = userMeetings.find(
          (um) => um.meeting_id === id && um.is_completed,
        );
        return m ? m.percentage : 0;
      };

      const score1to5 = getAvg(1, 5) * 0.1;
      const score6to11 = getAvg(6, 11) * 0.1;
      const score12to14 = getAvg(12, 14) * 0.1;
      const score15to16 = getAvg(15, 16) * 0.1;
      const score17to18 = getAvg(17, 18) * 0.1;
      const score19 = getPercentageForMeeting(19) * 0.1;
      const score20 = getPercentageForMeeting(20) * 0.3;

      const presentCount = allAttendances.filter(
        (a) => a.user_id === student.id && a.is_present && a.file_path,
      ).length;
      const attendanceScore = (Math.min(presentCount, 20) / 20) * 100 * 0.1;

      const finalScore =
        score1to5 +
        score6to11 +
        score12to14 +
        score15to16 +
        score17to18 +
        score19 +
        score20 +
        attendanceScore;
      totalScoreAll += finalScore;
    });

    const avgScore =
      allStudents.length > 0 ? totalScoreAll / allStudents.length : 0;

    const recentActivity = await db
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
      totalStudents: totalStudentsRow.count,
      totalMeetings: totalMeetingsRow.count,
      completedMeetings: completedMeetingsRow.count,
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
  async (req, res) => {
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
      const meeting = await db
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
      const answers = await db
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
      await db.prepare(
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

// Update attendance correction for a student (teacher only).
// Presence is upload-based: teachers can clear attendance, but cannot mark
// a student present unless a screenshot proof already exists.
app.post(
  "/api/teacher/students/:studentId/attendance/:meetingId",
  authenticateTeacher,
  async (req, res) => {
    const studentId = parseInt(req.params.studentId);
    const meetingId = parseInt(req.params.meetingId);
    const { is_present } = req.body;

    try {
      if (typeof is_present !== "boolean") {
        return res.status(400).json({ error: "is_present must be a boolean" });
      }

      const existingAttendance = await db
        .prepare(
          `
          SELECT file_path
          FROM attendances
          WHERE user_id = ? AND meeting_id = ?
        `,
        )
        .get(studentId, meetingId);

      if (is_present && !existingAttendance?.file_path) {
        return res.status(400).json({
          error: "Mahasiswa harus upload screenshot Zoom terlebih dahulu",
        });
      }

      await db.prepare(
        `
        INSERT INTO attendances (user_id, meeting_id, is_present) 
        VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE
          is_present = VALUES(is_present),
          timestamp = CURRENT_TIMESTAMP
      `,
      ).run(studentId, meetingId, is_present ? 1 : 0);

      res.json({ message: "Absensi berhasil disimpan" });
    } catch (error) {
      console.error("Update attendance error:", error);
      res.status(500).json({ error: "Gagal menyimpan absensi" });
    }
  },
);

// ==================== USER MANAGEMENT ROUTES (TEACHER ONLY) ====================

// Logout all student accounts (invalidate all tokens)
app.post("/api/teacher/logout-all", authenticateTeacher, async (req, res) => {
  try {
    const now = getJakartaNow();
    await db.prepare(
      `UPDATE users SET tokens_invalidated_after = ? WHERE role = 'student'`,
    ).run(now);

    res.json({ message: "Semua sesi akun mahasiswa berhasil diakhiri" });
  } catch (error) {
    console.error("Logout all error:", error);
    res.status(500).json({ error: "Gagal mengakhiri semua sesi" });
  }
});

// Get all users with their active status (teacher only)
app.get("/api/teacher/users", authenticateTeacher, async (req, res) => {
  try {
    const users = await db
      .prepare(
        `
        SELECT id, nim, name, role, is_active, created_at 
        FROM users 
        ORDER BY role ASC, name ASC
      `,
      )
      .all();

    res.json(users);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ error: "Gagal mengambil data pengguna" });
  }
});

// Toggle user active status (teacher only)
app.put(
  "/api/teacher/users/:userId/active",
  authenticateTeacher,
  async (req, res) => {
    const userId = parseInt(req.params.userId);
    const { is_active } = req.body;

    try {
      if (typeof is_active !== "boolean") {
        return res.status(400).json({ error: "is_active must be a boolean" });
      }

      // Prevent teachers from deactivating themselves
      if (userId === req.user.id && !is_active) {
        return res
          .status(400)
          .json({ error: "Anda tidak dapat menonaktifkan akun sendiri" });
      }

      // When deactivating, also invalidate all existing tokens for that user
      if (!is_active) {
        await db.prepare(
          `UPDATE users SET is_active = ?, tokens_invalidated_after = ? WHERE id = ?`,
        ).run(0, getJakartaNow(), userId);
      } else {
        await db.prepare(`UPDATE users SET is_active = ? WHERE id = ?`).run(
          1,
          userId,
        );
      }

      const user = await db
      .prepare(
          "SELECT id, nim, name, role, is_active FROM users WHERE id = ?",
        )
        .get(userId);

      res.json({
        message: `User berhasil ${is_active ? "diaktifkan" : "dinonaktifkan"}`,
        user,
      });
    } catch (error) {
      console.error("Toggle user active error:", error);
      res.status(500).json({ error: "Gagal mengubah status user" });
    }
  },
);

// ==================== START SERVER ====================

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
});

export default app;
