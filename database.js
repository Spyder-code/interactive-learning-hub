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
      tokens_invalidated_after DATETIME DEFAULT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Add is_active column if it doesn't exist (for existing databases)
  try {
    db.exec(`ALTER TABLE users ADD COLUMN is_active INTEGER DEFAULT 1`);
  } catch (error) {
    // Column already exists, ignore error
  }

  // Add tokens_invalidated_after column if it doesn't exist (for existing databases)
  try {
    db.exec(
      `ALTER TABLE users ADD COLUMN tokens_invalidated_after DATETIME DEFAULT NULL`,
    );
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
