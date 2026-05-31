import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbConfig = {
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || process.env.MYSQL_USER || "ict_user",
  password: process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD || "ict_password",
  database: process.env.DB_NAME || process.env.ICT_DB_NAME || "ict_learning",
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
  queueLimit: 0,
  timezone: "+07:00",
  multipleStatements: false,
  decimalNumbers: true,
};

async function waitForMysql(maxRetries = 30) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
    try {
      const connection = await mysql.createConnection({
        host: dbConfig.host,
        port: dbConfig.port,
        user: dbConfig.user,
        password: dbConfig.password,
      });
      await connection.query(
        `CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\`
         CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
      );
      await connection.end();
      return;
    } catch (error) {
      lastError = error;
      console.log(
        `Waiting for MySQL (${attempt}/${maxRetries}): ${error.message}`,
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  throw lastError;
}

await waitForMysql();

const pool = mysql.createPool(dbConfig);

const db = {
  async exec(sql) {
    const statements = sql
      .split(";")
      .map((statement) => statement.trim())
      .filter(Boolean);

    for (const statement of statements) {
      await pool.execute(statement);
    }
  },

  prepare(sql) {
    return {
      async get(...params) {
        const [rows] = await pool.execute(sql, params);
        return rows[0];
      },
      async all(...params) {
        const [rows] = await pool.execute(sql, params);
        return rows;
      },
      async run(...params) {
        const [result] = await pool.execute(sql, params);
        return {
          ...result,
          lastInsertRowid: result.insertId,
          changes: result.affectedRows,
        };
      },
    };
  },
};

function pad(n) {
  return String(n).padStart(2, "0");
}

function toMysqlDateTime(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds(),
  )}`;
}

function readMeetingSeedData() {
  const source = fs.readFileSync(
    path.join(__dirname, "src", "data", "meetings.ts"),
    "utf8",
  );

  const meetingBlocks = source.match(/\{\s*id:\s*"pertemuan-\d+"[\s\S]*?\n\s*\}/g) || [];

  return meetingBlocks
    .map((block) => {
      const value = (field) => {
        const match = block.match(new RegExp(`${field}:\\s*"([^"]*)"`));
        return match?.[1] || "";
      };
      const number = Number(block.match(/number:\s*(\d+)/)?.[1]);
      const duration = Number(block.match(/duration:\s*(\d+)/)?.[1] || 0);
      const openedAt = block.match(/openedAt:\s*toLocalISO\(new Date\("([^"]+)"\)\)/)?.[1];
      const closedAt = block.match(/closedAt:\s*toLocalISO\(new Date\("([^"]+)"\)\)/)?.[1];

      return {
        id: value("id"),
        meeting_number: number,
        title: value("title"),
        subtitle: value("subtitle"),
        duration,
        opened_at: toMysqlDateTime(openedAt),
        closed_at: toMysqlDateTime(closedAt),
      };
    })
    .filter((meeting) => meeting.id && Number.isFinite(meeting.meeting_number));
}

async function seedMeetings() {
  const meetings = readMeetingSeedData();

  const insert = db.prepare(`
    INSERT IGNORE INTO meetings
      (meeting_key, meeting_number, title, subtitle, duration, opened_at, closed_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  for (const meeting of meetings) {
    await insert.run(
      meeting.id,
      meeting.meeting_number,
      meeting.title,
      meeting.subtitle,
      meeting.duration,
      meeting.opened_at,
      meeting.closed_at,
    );
  }

  console.log(`Meeting seed synced from meetings.ts: ${meetings.length} rows`);
}

async function ensureColumn(tableName, columnName, definition) {
  const existingColumn = await db
    .prepare(
      `
      SELECT COLUMN_NAME
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = ?
        AND COLUMN_NAME = ?
    `,
    )
    .get(tableName, columnName);

  if (!existingColumn) {
    await db.exec(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${definition}`);
  }
}

async function initializeDatabase() {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      nim VARCHAR(64) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      role VARCHAR(32) DEFAULT 'student',
      is_active TINYINT(1) DEFAULT 1,
      tokens_invalidated_after DATETIME DEFAULT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS meetings (
      id INT PRIMARY KEY AUTO_INCREMENT,
      meeting_key VARCHAR(64) UNIQUE NOT NULL,
      meeting_number INT UNIQUE NOT NULL,
      title VARCHAR(255) NOT NULL,
      subtitle VARCHAR(255) NOT NULL,
      duration INT NOT NULL DEFAULT 90,
      opened_at DATETIME DEFAULT NULL,
      closed_at DATETIME DEFAULT NULL,
      attendance_opened_at DATETIME DEFAULT NULL,
      attendance_closed_at DATETIME DEFAULT NULL,
      is_active TINYINT(1) DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await ensureColumn("meetings", "attendance_opened_at", "DATETIME DEFAULT NULL");
  await ensureColumn("meetings", "attendance_closed_at", "DATETIME DEFAULT NULL");

  await db.exec(`
    CREATE TABLE IF NOT EXISTS user_meetings (
      id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT NOT NULL,
      meeting_id INT NOT NULL,
      start_time DATETIME NOT NULL,
      end_time DATETIME,
      duration_minutes INT,
      last_slide_index INT DEFAULT 0,
      total_questions INT DEFAULT 0,
      correct_answers INT DEFAULT 0,
      percentage DECIMAL(5,2) DEFAULT 0,
      is_completed TINYINT(1) DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE KEY unique_user_meeting (user_id, meeting_id)
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS quiz_answers (
      id INT PRIMARY KEY AUTO_INCREMENT,
      user_meeting_id INT NOT NULL,
      slide_id INT NOT NULL,
      question_index INT NOT NULL,
      selected_option TEXT NOT NULL,
      is_correct TINYINT(1) NOT NULL,
      question_type VARCHAR(64) DEFAULT 'multiple-choice',
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_meeting_id) REFERENCES user_meetings(id) ON DELETE CASCADE,
      UNIQUE KEY unique_quiz_answer (user_meeting_id, slide_id, question_index)
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS task_uploads (
      id INT PRIMARY KEY AUTO_INCREMENT,
      user_meeting_id INT NOT NULL,
      slide_id INT NOT NULL,
      task_index INT NOT NULL,
      file_name VARCHAR(255) NOT NULL,
      file_size INT NOT NULL,
      file_type VARCHAR(255) NOT NULL,
      file_path TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_meeting_id) REFERENCES user_meetings(id) ON DELETE CASCADE,
      UNIQUE KEY unique_task_upload (user_meeting_id, slide_id, task_index)
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS slide_progress (
      id INT PRIMARY KEY AUTO_INCREMENT,
      user_meeting_id INT NOT NULL,
      slide_index INT NOT NULL,
      max_slide_reached INT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_meeting_id) REFERENCES user_meetings(id) ON DELETE CASCADE,
      UNIQUE KEY unique_slide_progress (user_meeting_id, slide_index)
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS attendances (
      id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT NOT NULL,
      meeting_id INT NOT NULL,
      is_present TINYINT(1) DEFAULT 0,
      file_name VARCHAR(255) DEFAULT NULL,
      file_size INT DEFAULT NULL,
      file_type VARCHAR(255) DEFAULT NULL,
      file_path TEXT,
      uploaded_at DATETIME DEFAULT NULL,
      source VARCHAR(32) DEFAULT 'upload',
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE KEY unique_attendance (user_id, meeting_id)
    )
  `);

  await ensureColumn("attendances", "file_name", "VARCHAR(255) DEFAULT NULL");
  await ensureColumn("attendances", "file_size", "INT DEFAULT NULL");
  await ensureColumn("attendances", "file_type", "VARCHAR(255) DEFAULT NULL");
  await ensureColumn("attendances", "file_path", "TEXT");
  await ensureColumn("attendances", "uploaded_at", "DATETIME DEFAULT NULL");
  await ensureColumn("attendances", "source", "VARCHAR(32) DEFAULT 'upload'");

  await seedMeetings();

  const userCount = await db
    .prepare("SELECT COUNT(*) as count FROM users")
    .get();
  if (userCount.count === 0) {
    await insertDefaultUsers();
  }

  console.log("Database initialized successfully");
}

async function insertDefaultUsers() {
  const hashedPassword = bcrypt.hashSync("12345", 10);

  const additionalUsers = [
    { nim: "07040325119", name: "MUHAMMAD AZZURRI FARIQ FATHONI", role: "student" },
    { nim: "07040325120", name: "MUHAMMAD SYAMSUL MA'ARIF", role: "student" },
    { nim: "07040325121", name: "NYAI RAUDHATUL MUBARAKAH A.Q", role: "student" },
    { nim: "07040325122", name: "RASYIDA ISLAMI DINA", role: "student" },
    { nim: "07040325123", name: "SHABRINA DWI MUFIDAH", role: "student" },
    { nim: "07040325124", name: "TASMALIL QOWIM ADDHAWAM", role: "student" },
    { nim: "07040325125", name: "VAHREL NADHIF ASY SYAUQY", role: "student" },
    { nim: "07040325126", name: "WAHYU ACHMAD NIZAMMUDDIN", role: "student" },
    { nim: "07040525051", name: "AHMAD NURUL IMAN AL KHAQI", role: "student" },
    { nim: "07040525052", name: "MUHAMMAD HAIDAR AL-UMAMY", role: "student" },
    { nim: "07040525053", name: "MUHAMMAD IKHWANUDIN", role: "student" },
    { nim: "07040525054", name: "QOID ZAID EL HUDA", role: "student" },
    { nim: "07040525055", name: "UZLIFATUL JANNAH", role: "student" },
    { nim: "07040625066", name: "KAHFI NINA PRAWITA", role: "student" },
    { nim: "07040625068", name: "MUHAMMAD BURHAN FADHILLAH", role: "student" },
    { nim: "07040625069", name: "NURIL MASLAHA", role: "student" },
    { nim: "07040625070", name: "SELVIANA PUTRI SUKOWATI", role: "student" },
    { nim: "07060325162", name: "BASIR WAYEH", role: "student" },
    { nim: "07060325163", name: "MUHAMMAD SYAHIN BIN SUJUANDA", role: "student" },
    { nim: "08010125001", name: "ACHMAD BACHRUL 'ILMI", role: "student" },
    { nim: "08010125002", name: "AGNI DESWITA NUR KHOLIDA", role: "student" },
    { nim: "08010125003", name: "ANGELIKA AVRYL CAROLINE NAJWA", role: "student" },
    { nim: "08010125004", name: "BUNGA RIZKY KURNIA ILLAHI", role: "student" },
    { nim: "08010125005", name: "DWI NUR HIDAYATI", role: "student" },
    { nim: "08010125006", name: "EKA WULANDARI", role: "student" },
    { nim: "08010125007", name: "ELITA NUR INDAH LESTARI", role: "student" },
    { nim: "08010125008", name: "ELLA YUNITA ERFANI", role: "student" },
    { nim: "08010125009", name: "FATIH ANRIZA RAFIFANSYAH", role: "student" },
    { nim: "08010125010", name: "FRANSISKA NUR SALSABILA", role: "student" },
    { nim: "08010125011", name: "INTAN ANGGRAENI", role: "student" },
    { nim: "08010125012", name: "KAYLA KAFKA NAFISA", role: "student" },
    { nim: "08010125013", name: "KIKY MAULIDHOTUL IDZAH", role: "student" },
    { nim: "08010125014", name: "LAILATUS SYARIFAH ROMADONY", role: "student" },
    { nim: "08010125015", name: "MUHAMMAD SYAUQI ABDILLAH", role: "student" },
    { nim: "08010125016", name: "MUHAMMAD ZAKKY ZIDHAN", role: "student" },
    { nim: "08010125017", name: "NAZWAH DWI APRILIYA", role: "student" },
    { nim: "08010125018", name: "RAHMAH AZIZATUNNISA'", role: "student" },
    { nim: "08010125019", name: "RINI HIDAYATI", role: "student" },
  ];

  const users = [
    {
      nim: "20260101",
      name: "TEST USER",
      password: hashedPassword,
      role: "student",
    },
    {
      nim: "TEACHER001",
      name: "Dr. Budi Wijaya",
      password: hashedPassword,
      role: "teacher",
    },
    ...additionalUsers.map((u) => ({
      ...u,
      password: bcrypt.hashSync(u.nim, 10),
    })),
  ];

  const insert = db.prepare(
    "INSERT INTO users (nim, name, password, role) VALUES (?, ?, ?, ?)",
  );

  for (const user of users) {
    await insert.run(user.nim, user.name, user.password, user.role);
  }

  console.log("Default users created");
}

await initializeDatabase();

export default db;
