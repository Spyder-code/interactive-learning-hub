import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database(path.join(__dirname, "database.sqlite"));

// Membuat tabel-tabel
function initializeDatabase() {
  // Tabel users
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nim TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT DEFAULT 'student',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabel meetings (menyimpan data meeting completion per user)
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_meetings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      meeting_id TEXT NOT NULL,
      start_time DATETIME NOT NULL,
      end_time DATETIME,
      duration_minutes INTEGER,
      last_slide_index INTEGER DEFAULT 0,
      total_questions INTEGER DEFAULT 0,
      correct_answers INTEGER DEFAULT 0,
      percentage REAL DEFAULT 0,
      is_completed BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      UNIQUE(user_id, meeting_id)
    )
  `);

  // Tabel quiz answers (menyimpan jawaban quiz per user per meeting)
  db.exec(`
    CREATE TABLE IF NOT EXISTS quiz_answers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_meeting_id INTEGER NOT NULL,
      slide_id INTEGER NOT NULL,
      question_index INTEGER NOT NULL,
      selected_option TEXT NOT NULL,
      is_correct BOOLEAN NOT NULL,
      question_type TEXT DEFAULT 'multiple-choice',
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_meeting_id) REFERENCES user_meetings(id),
      UNIQUE(user_meeting_id, slide_id, question_index)
    )
  `);

  // Tabel task uploads (menyimpan info file upload per user per meeting)
  db.exec(`
    CREATE TABLE IF NOT EXISTS task_uploads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_meeting_id INTEGER NOT NULL,
      slide_id INTEGER NOT NULL,
      task_index INTEGER NOT NULL,
      file_name TEXT NOT NULL,
      file_size INTEGER NOT NULL,
      file_type TEXT NOT NULL,
      file_path TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_meeting_id) REFERENCES user_meetings(id),
      UNIQUE(user_meeting_id, slide_id, task_index)
    )
  `);

  // Add file_path column if it doesn't exist (for existing databases)
  try {
    db.exec(`ALTER TABLE task_uploads ADD COLUMN file_path TEXT`);
  } catch (error) {
    // Column already exists, ignore error
  }

  // Tabel slide progress (menyimpan progress per slide)
  db.exec(`
    CREATE TABLE IF NOT EXISTS slide_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_meeting_id INTEGER NOT NULL,
      slide_index INTEGER NOT NULL,
      max_slide_reached INTEGER NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_meeting_id) REFERENCES user_meetings(id),
      UNIQUE(user_meeting_id, slide_index)
    )
  `);

  console.log("✅ Database initialized successfully");

  // Insert default users jika belum ada
  const userCount = db.prepare("SELECT COUNT(*) as count FROM users").get();
  if (userCount.count === 0) {
    insertDefaultUsers();
  }
}

// Insert default users untuk testing
function insertDefaultUsers() {
  const hashedPassword = bcrypt.hashSync("12345", 10);

  const users = [
    {
      nim: "2301010101",
      name: "Ahmad Pratama",
      password: hashedPassword,
      role: "student",
    },
    {
      nim: "2301010102",
      name: "Siti Nurhaliza",
      password: hashedPassword,
      role: "student",
    },
    {
      nim: "2301010103",
      name: "Budi Santoso",
      password: hashedPassword,
      role: "student",
    },
    {
      nim: "TEACHER001",
      name: "Dr. Budi Wijaya",
      password: hashedPassword,
      role: "teacher",
    },
  ];

  const insert = db.prepare(
    "INSERT INTO users (nim, name, password, role) VALUES (?, ?, ?, ?)",
  );

  const insertMany = db.transaction((users) => {
    for (const user of users) {
      insert.run(user.nim, user.name, user.password, user.role);
    }
  });

  insertMany(users);
  console.log(
    "✅ Default users created:\n   Students - NIM: 2301010101-2301010103\n   Teacher  - NIM: TEACHER001\n   Password: 12345",
  );
}

initializeDatabase();

export default db;
