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
    [
      { nim: "06020125163", name: "PUGUH SATRIO PAMBUDI", role: "student" },
      { nim: "06020125164", name: "PUTRI LAILIN NAJWA", role: "student" },
      { nim: "06020125165", name: "PUTRI MALIKA OKTAVIANI", role: "student" },
      { nim: "06020125166", name: "RACHMAWATI", role: "student" },
      { nim: "06020125167", name: "RAENA SAL SABILAH", role: "student" },
      { nim: "06020125168", name: "RAHMADINI ALIFIYAH PUTRI", role: "student" },
      { nim: "06020125169", name: "RAHMA RIFAATUL FADILLAH", role: "student" },
      { nim: "06020125170", name: "RAUDLATUL INTAN NURUL BALQIES", role: "student" },
      { nim: "06020125171", name: "RHADITYA CANDRA ARIYANTO", role: "student" },
      { nim: "06020125172", name: "RIFA NURAFILA", role: "student" },
      { nim: "06020125173", name: "RIZQY ABDILLAH", role: "student" },
      { nim: "06020125174", name: "ROUDHOTUL MAHMUDIA", role: "student" },
      { nim: "06020125175", name: "SAFIRA AULIA PUTRI", role: "student" },
      { nim: "06020125176", name: "SAHIR", role: "student" },
      { nim: "06020125177", name: "SALSABILA PUTRI DESINTA", role: "student" },
      { nim: "06020125178", name: "SENJA ARFIATUS SAKINAH", role: "student" },
      { nim: "06020125179", name: "SHAFIRA ESA PUTRI SALSABILA", role: "student" },
      { nim: "06020125180", name: "SHERYL FREYA REVALINA PUTRI", role: "student" },
      { nim: "06020125181", name: "SITI NAFA'ATUL UDZMA", role: "student" },
      { nim: "06020125182", name: "SYAFINA AULIA ALFARIZKY", role: "student" },
      { nim: "06020125183", name: "SYIFAK MUHAMMAD ABDUL ROSYID", role: "student" },
      { nim: "06020125184", name: "SYIFA NURIL IRBAH", role: "student" },
      { nim: "06020125185", name: "SYIFA SAFIRA", role: "student" },
      { nim: "06020125186", name: "UYUN NURROHMAH", role: "student" },
      { nim: "06020125187", name: "WILDANI NADIAH SYAFIQAH", role: "student" },
      { nim: "06020125188", name: "YOKLOSIN RARA NILASARI WIYONO", role: "student" },
      { nim: "06020125189", name: "YURIDAN SYAUQI ALBANI", role: "student" },
      { nim: "06020125190", name: "ZAHWA MARJUWAH", role: "student" },
      { nim: "06020125191", name: "ZAINA ESA LATIFATUS ZAHRA", role: "student" },
      { nim: "06020125192", name: "ZARQA SYAFIRA", role: "student" },
      { nim: "06020125194", name: "ZIDNY ISYAH ALKAMIL", role: "student" },
      { nim: "06020125195", name: "ZULFATUL KARIMAH", role: "student" },
      { nim: "06020225019", name: "ABDULLAH AZZAM YASIN", role: "student" },
      { nim: "06020225020", name: "AHMAD HARIRY ABDULLOH", role: "student" },
      { nim: "06020225021", name: "AJENG DWI BAHARI", role: "student" },
      { nim: "06020225022", name: "ALDA AULIAH", role: "student" },
      { nim: "06020225023", name: "ALI ROHMATULLOH", role: "student" },
    ]
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
