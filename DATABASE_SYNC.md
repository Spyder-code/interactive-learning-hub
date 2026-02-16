# Database Synchronization - Quiz Store

## Ringkasan

Implementasi ini memungkinkan data quiz dan progress pertemuan disimpan ke database, sehingga data tetap tersimpan meskipun pengguna berganti perangkat atau browser.

## Bug Fixes

### Multi-User di Device Yang Sama (Fixed)

**Problem:**
Ketika 2 mahasiswa login dan mengerjakan di device yang sama, data mahasiswa pertama tercampur dengan mahasiswa kedua karena localStorage di-share.

**Solution:**

1. **Clear localStorage saat login**: Setiap kali user login, localStorage `quiz-storage` di-clear untuk menghapus data user sebelumnya
2. **Clear localStorage saat logout**: Saat logout, semua data quiz di localStorage dihapus
3. **Clear store sebelum load**: Hook `useQuizStoreWithAPI` clear store sebelum load data dari backend
4. **Tambah method clearAll()**: Store memiliki method untuk reset semua state

**Implementation:**

- `api.ts::login()` - Clear quiz-storage sebelum save token
- `api.ts::logout()` - Clear quiz-storage saat logout
- `quizStore.ts::clearAll()` - Method untuk reset semua state
- `useQuizStoreWithAPI.ts` - Clear store sebelum load data dari backend
- `Index.tsx, MeetingSelect.tsx` - Call clearAll() saat logout

## Arsitektur

### 1. Backend (server.js)

Backend menggunakan SQLite dengan better-sqlite3 untuk menyimpan data. Tabel yang digunakan:

- **users**: Menyimpan data pengguna (mahasiswa dan dosen)
- **user_meetings**: Menyimpan data pertemuan per user (progress, skor, durasi)
- **quiz_answers**: Menyimpan jawaban quiz per user per meeting
- **task_uploads**: Menyimpan informasi file upload per user per meeting
- **slide_progress**: Menyimpan progress slide yang sudah dicapai

#### API Endpoints

##### Authentication

- `POST /api/auth/login` - Login pengguna
- `POST /api/auth/register` - Registrasi pengguna baru
- `GET /api/auth/verify` - Verifikasi token JWT

##### Meeting Data (Student)

- `GET /api/meetings/all-status` - Mendapatkan status semua meeting untuk user saat ini
- `GET /api/meetings/:meetingId` - Mendapatkan detail meeting tertentu beserta jawaban, upload, dan progress
- `POST /api/meetings/:meetingId/quiz` - Menyimpan jawaban quiz
- `POST /api/meetings/:meetingId/task` - Menyimpan info upload task
- `DELETE /api/meetings/:meetingId/task` - Menghapus info upload task
- `POST /api/meetings/:meetingId/progress` - Update progress slide
- `POST /api/meetings/:meetingId/complete` - Menandai meeting sebagai selesai

##### Teacher Dashboard

- `GET /api/teacher/students/summary` - Mendapatkan ringkasan semua mahasiswa
- `GET /api/teacher/students/:studentId/meetings` - Mendapatkan semua meeting mahasiswa tertentu
- `GET /api/teacher/students/:studentId/meetings/:meetingId` - Detail meeting mahasiswa
- `GET /api/teacher/reports/meetings` - Laporan meeting semua mahasiswa
- `GET /api/teacher/statistics` - Statistik keseluruhan

### 2. Frontend

#### Store (quizStore.ts)

Store menggunakan Zustand dengan persist middleware untuk menyimpan data di localStorage sebagai cache lokal.

#### Hook (useQuizStoreWithAPI.ts)

Hook ini mengintegrasikan store dengan backend API:

**Fitur:**

- Load data dari backend saat component mount
- Sync perubahan ke backend secara otomatis
- Fallback ke localStorage jika offline
- Loading state untuk menampilkan indikator loading

**Methods yang di-wrap:**

- `saveAnswer` - Menyimpan jawaban quiz ke store & backend
- `saveUpload` - Menyimpan info upload ke store & backend
- `removeUpload` - Menghapus info upload dari store & backend
- `updateMaxSlideReached` - Update progress slide ke store & backend
- `saveMeetingHistory` - Menyimpan history meeting ke store & backend

#### API Service (api.ts)

Service untuk berkomunikasi dengan backend:

**authAPI:**

- `login()` - Login dan menyimpan token
- `logout()` - Hapus token dan data user
- `verify()` - Verifikasi token
- `getCurrentUser()` - Mendapatkan user dari localStorage

**meetingAPI:**

- `getAllMeetingsStatus()` - Status semua meeting user
- `getMeeting(meetingId)` - Detail meeting tertentu
- `saveQuizAnswer()` - Simpan jawaban quiz
- `saveTaskUpload()` - Simpan info upload
- `removeTaskUpload()` - Hapus info upload
- `updateProgress()` - Update progress slide
- `completeMeeting()` - Tandai meeting selesai

**teacherAPI:**

- `getStudents()` - List semua mahasiswa
- `getStatistics()` - Statistik keseluruhan
- `getStudentMeetings()` - Meeting mahasiswa tertentu
- `getStudentMeetingDetail()` - Detail meeting mahasiswa
- `getMeetingReports()` - Laporan meeting

### 3. Halaman

#### Index.tsx (Slide Presentation)

- Menggunakan `useQuizStoreWithAPI` untuk sync data
- Menampilkan loading state saat memuat data
- Otomatis menyimpan progress ke database

#### MeetingSelect.tsx (Meeting Selection)

- Menggunakan `meetingAPI.getAllMeetingsStatus()` untuk load status meeting
- Menampilkan badge completion dan skor
- Menampilkan durasi pengerjaan

## Alur Data

### Saat User Membuka Meeting:

1. User navigate ke halaman Index dengan meetingId
2. Hook `useQuizStoreWithAPI` dipanggil
3. Hook melakukan fetch data dari backend (`GET /api/meetings/:meetingId`)
4. Data di-load ke store (answers, uploads, progress)
5. Component render dengan data yang sudah di-load

### Saat User Menjawab Quiz:

1. User memilih jawaban
2. `saveAnswer()` dipanggil
3. Data disimpan ke store (localStorage)
4. Data dikirim ke backend (`POST /api/meetings/:meetingId/quiz`)
5. Backend menyimpan ke database

### Saat User Upload Task:

1. User upload file
2. `saveUpload()` dipanggil dengan info file
3. Data disimpan ke store
4. Data dikirim ke backend (`POST /api/meetings/:meetingId/task`)

### Saat User Menyelesaikan Meeting:

1. User mencapai slide terakhir
2. System menghitung total questions dan correct answers
3. `saveMeetingHistory()` dipanggil
4. Data disimpan ke store
5. Data dikirim ke backend (`POST /api/meetings/:meetingId/complete`)
6. Backend menandai meeting sebagai completed

### Saat User Berganti Device:

1. User login di device baru
2. User membuka meeting
3. Hook load data dari backend
4. Data ditampilkan sesuai progress terakhir
5. User bisa melanjutkan dari mana dia berhenti

## Keuntungan

1. **Persistence**: Data tidak hilang meskipun clear browser atau ganti device
2. **Multi-device**: Progress tersimpan di cloud, bisa diakses dari device manapun
3. **Teacher Dashboard**: Dosen bisa monitor progress real-time
4. **Offline Support**: Store masih berfungsi offline dengan localStorage
5. **Sync Otomatis**: Semua perubahan otomatis sync ke backend

## Cara Menjalankan

### Development

```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run dev

# Atau jalankan keduanya sekaligus
npm run dev:all
```

### Production

```bash
# Build frontend
npm run build

# Jalankan server
npm run server
```

## Default Users

Untuk testing, tersedia user default:

**Students:**

- NIM: 2301010101, 2301010102, 2301010103
- Password: 12345

**Teacher:**

- NIM: TEACHER001
- Password: 12345

## Environment Variables

Buat file `.env` di root project:

```env
PORT=3001
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

## Database Reset

Jika perlu reset database:

1. Stop server
2. Delete file `database.sqlite`
3. Restart server (database akan dibuat ulang dengan default users)

## Troubleshooting

### Data tidak tersimpan

- Pastikan backend running
- Check console untuk error
- Verifikasi token masih valid

### Data tidak ter-load

- Check network tab di browser
- Pastikan endpoint API benar
- Verifikasi authentication token

### Meeting tidak complete

- Pastikan semua quiz dijawab
- Check backend logs untuk error
- Verifikasi API endpoint `/complete` dipanggil

## Future Improvements

1. **Offline Queue**: Simpan API calls saat offline, sync saat online
2. **Real-time Updates**: Gunakan WebSocket untuk update real-time
3. **File Upload**: Implementasi actual file upload ke server
4. **Progress Bar**: Loading indicator lebih informatif
5. **Conflict Resolution**: Handle conflicts saat sync dari multiple devices
