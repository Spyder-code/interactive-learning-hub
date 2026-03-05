import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use environment variable for database path, fallback to local for development
const dbPath = process.env.DATABASE_PATH
  ? path.join(process.env.DATABASE_PATH, "database.sqlite")
  : path.join(__dirname, "database.sqlite");

const db = new Database(dbPath);

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
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Add is_active column if it doesn't exist (for existing databases)
  try {
    db.exec(`ALTER TABLE users ADD COLUMN is_active INTEGER DEFAULT 1`);
  } catch (error) {
    // Column already exists, ignore error
  }

  // Tabel meetings (menyimpan data meeting completion per user)
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_meetings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      meeting_id INTEGER NOT NULL,
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

  // Tabel attendances (menyimpan absensi per meeting secara manual oleh teacher)
  db.exec(`
    CREATE TABLE IF NOT EXISTS attendances (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      meeting_id INTEGER NOT NULL,
      is_present BOOLEAN DEFAULT 0,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      UNIQUE(user_id, meeting_id)
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

  const additionalUsers = [
    { nim: "04040325139", name: "SITI LATIFATUL ZUHRO", role: "student" },
    { nim: "04040325146", name: "MUHAMMAD DAVA RAMADHANI", role: "student" },
    { nim: "04040325147", name: "MUHAMMAD FAHRIL AZIZ", role: "student" },
    { nim: "04040325148", name: "NAYLA AZKA HAMADAH", role: "student" },
    { nim: "04040325149", name: "NUR LAILIYA", role: "student" },
    { nim: "04040325150", name: "SAFINAH ARUN DATI", role: "student" },
    { nim: "04040425098", name: "AHMAD IKMALUDDIN FIKRI", role: "student" },
    { nim: "04040425099", name: "AKBAR TAUFIKUR RIDHO", role: "student" },
    { nim: "04040425100", name: "MUHAMMAD SYAMIL FIRDAUS", role: "student" },
    { nim: "04040425102", name: "TAZKHIYA RINI FITHRIYA", role: "student" },
    { nim: "04040425103", name: "WAQIAH NANDA PUTRI", role: "student" },
    { nim: "04040425104", name: "WIDYA ASMARANDANI", role: "student" },
    { nim: "04040425105", name: "YOGA WIDIGDA", role: "student" },
    { nim: "04040425106", name: "ZULFIKAR ARYA SAPUTRA", role: "student" },
    {
      nim: "04040525149",
      name: "ACHMAD ICHYA' ULUMUDDIN ISHAQ",
      role: "student",
    },
    {
      nim: "04040525150",
      name: "AHMAD JAKA MAULUDI NASRULLAH",
      role: "student",
    },
    { nim: "04040525151", name: "ALIFIA FAJRIANI", role: "student" },
    { nim: "04040525152", name: "AMIRA KAYLA SHANTI", role: "student" },
    { nim: "04040525153", name: "ANNIDA FAWZUN NADIA", role: "student" },
    { nim: "04040525154", name: "ANSYAREL HAEKAL DARWIS", role: "student" },
    { nim: "04040525155", name: "AQILAH AZZAHRA FAHRUNNISA", role: "student" },
    { nim: "04040525156", name: "AULIA ARDIANA NURFAIZAH", role: "student" },
    { nim: "04040525157", name: "AURELIA EDITHA FITRIANI", role: "student" },
    { nim: "04040525158", name: "AURELIA SAHARANI SAPUTRI", role: "student" },
    { nim: "04040525159", name: "BILQIS MUJAHIDAH AL AZZAM", role: "student" },
    { nim: "04040525160", name: "CHALISTA DEWI SAPUTRI", role: "student" },
    { nim: "04040525161", name: "DIVA AULIA NOVEBRIANTY", role: "student" },
    { nim: "04040525162", name: "FARREL RAIHAN FIRDAUS", role: "student" },
    { nim: "04040525163", name: "FRIDA AURA PUSPARANI", role: "student" },
    {
      nim: "04040525164",
      name: "GHANIYY JAVIER NUR IVANSYAH",
      role: "student",
    },
    { nim: "04040525165", name: "HABIBUL MUKARROM", role: "student" },
    { nim: "04040525166", name: "HADIL DINA FARIS", role: "student" },
    { nim: "04040525167", name: "HUDYA CLEARESTA AZZAHRA", role: "student" },
    { nim: "04040525168", name: "JAMILA PUTRI RAHMANIA", role: "student" },
    { nim: "04040525169", name: "JOEHAN SYAH GUSTAV", role: "student" },
    { nim: "04040525170", name: "M AFIQ SABIL AKBAR", role: "student" },
    { nim: "04040525171", name: "MOH EGA WAHYU PRASETYO", role: "student" },
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
    // additional students with password = their NIM
    ...additionalUsers.map((u) => ({
      ...u,
      password: bcrypt.hashSync(u.nim, 10),
    })),
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

// Migration helper: Convert old TEXT meeting_id to INTEGER
// Run this if you have existing data with string meeting_ids like "pertemuan-1"
function migrateMeetingIdToInteger() {
  try {
    console.log("🔄 Starting meeting_id migration...");

    // Check if there's any data with TEXT meeting_id
    const oldData = db
      .prepare(
        "SELECT id, meeting_id FROM user_meetings WHERE typeof(meeting_id) = 'text'",
      )
      .all();

    if (oldData.length === 0) {
      console.log(
        "✅ No migration needed - all meeting_ids are already integers",
      );
      return;
    }

    console.log(`Found ${oldData.length} records to migrate`);

    // Update each record: convert "pertemuan-X" to X
    const update = db.prepare(
      "UPDATE user_meetings SET meeting_id = ? WHERE id = ?",
    );
    const updateMany = db.transaction((records) => {
      for (const record of records) {
        const meetingIdStr = String(record.meeting_id);
        // Extract number from "pertemuan-X" format
        const match = meetingIdStr.match(/\d+/);
        if (match) {
          const meetingNumber = parseInt(match[0]);
          update.run(meetingNumber, record.id);
          console.log(
            `  ✓ Migrated record ${record.id}: "${meetingIdStr}" → ${meetingNumber}`,
          );
        }
      }
    });

    updateMany(oldData);
    console.log("✅ Migration completed successfully");
  } catch (error) {
    console.error("❌ Migration failed:", error.message);
    console.log(
      "⚠️ If you see 'datatype mismatch', you may need to recreate the table:",
    );
    console.log("   1. Backup your database.sqlite file");
    console.log("   2. Delete database.sqlite");
    console.log("   3. Restart the server to create a new database");
  }
}

// Uncomment the line below to run migration (only run once)
// migrateMeetingIdToInteger();

export default db;
