# Teacher Role Implementation Guide

## Overview

Sistem telah diperbarui dengan fitur **role-based authentication** yang memungkinkan dosen (teacher) untuk memantau progress mahasiswa.

## Perubahan Database

### Schema Updates

1. **Tabel `users`** - Ditambahkan kolom `role`:
   - `role TEXT DEFAULT 'student'`
   - Nilai yang valid: `'student'` atau `'teacher'`

2. **Default Users**:
   - **Mahasiswa**:
     - NIM: 2301010101, 2301010102, 2301010103
     - Password: 12345
     - Role: student
   - **Dosen**:
     - NIM: TEACHER001
     - Name: Dr. Budi Wijaya
     - Password: 12345
     - Role: teacher

### Migrasi Database

Jika Anda sudah memiliki database yang ada, Anda perlu:

1. **Backup database lama**:

   ```bash
   cp database.sqlite database.sqlite.backup
   ```

2. **Hapus database lama dan buat yang baru** (data lama akan hilang):

   ```bash
   rm database.sqlite
   ```

3. **Restart server** untuk membuat database baru dengan schema yang diperbarui:
   ```bash
   npm run server
   ```

## Fitur Teacher Dashboard

### Endpoint API Baru

#### 1. Get All Students Summary

```
GET /api/teacher/students/summary
```

Mengembalikan daftar semua mahasiswa dengan ringkasan progress mereka.

#### 2. Get Statistics

```
GET /api/teacher/statistics
```

Mengembalikan statistik keseluruhan:

- Total mahasiswa
- Total meeting
- Meeting yang selesai
- Rata-rata skor
- Aktivitas terkini

#### 3. Get Student Meetings

```
GET /api/teacher/students/:studentId/meetings
```

Mengembalikan semua meeting yang dikerjakan oleh mahasiswa tertentu.

#### 4. Get Student Meeting Detail

```
GET /api/teacher/students/:studentId/meetings/:meetingId
```

Mengembalikan detail meeting termasuk:

- Jawaban quiz
- Task uploads
- Slide progress

#### 5. Get Meeting Reports

```
GET /api/teacher/reports/meetings?meetingId=<optional>
```

Mengembalikan laporan meeting untuk semua mahasiswa, dapat difilter berdasarkan meeting ID.

### Halaman Teacher Dashboard

Dashboard dosen dapat diakses di route `/teacher` dan mencakup:

#### Tab 1: Daftar Mahasiswa

- Menampilkan tabel semua mahasiswa
- Informasi yang ditampilkan:
  - NIM
  - Nama
  - Jumlah meeting diikuti
  - Jumlah meeting selesai
  - Rata-rata skor
- Klik "Lihat Detail" untuk melihat detail meeting per mahasiswa

#### Tab 2: Aktivitas Terkini

- Menampilkan 10 aktivitas terbaru dari semua mahasiswa
- Informasi yang ditampilkan:
  - Nama mahasiswa
  - NIM
  - Meeting ID
  - Skor
  - Waktu update

#### Statistik Cards

Dashboard menampilkan 4 kartu statistik utama:

1. **Total Mahasiswa** - Jumlah mahasiswa yang terdaftar
2. **Total Meeting** - Jumlah meeting yang berbeda
3. **Meeting Selesai** - Jumlah meeting yang telah diselesaikan
4. **Rata-rata Skor** - Rata-rata skor dari semua meeting yang selesai

#### Detail Mahasiswa

Klik pada mahasiswa untuk melihat:

- Semua meeting yang dikerjakan
- Status setiap meeting (Selesai/Dalam Progress)
- Waktu mulai dan selesai
- Durasi pengerjaan
- Progress slide terakhir
- Jumlah soal dan jawaban benar
- Persentase skor

## Authentication & Authorization

### Middleware

- `authenticateToken`: Memverifikasi JWT token untuk semua route yang dilindungi
- `authenticateTeacher`: Memverifikasi JWT token dan memastikan user memiliki role 'teacher'

### Role-based Routing

- **Students**: Diarahkan ke `/` (Meeting Selection)
- **Teachers**: Diarahkan ke `/teacher` (Teacher Dashboard)
- Route dilindungi dengan `ProtectedRoute` component yang memeriksa role

### JWT Token

Token sekarang menyertakan informasi role:

```json
{
  "id": 1,
  "nim": "TEACHER001",
  "name": "Dr. Budi Wijaya",
  "role": "teacher"
}
```

## Cara Menggunakan

### Login sebagai Dosen

1. Buka aplikasi dan pergi ke halaman login
2. Masukkan credentials dosen:
   - NIM: `TEACHER001`
   - Password: `12345`
3. Anda akan otomatis diarahkan ke Teacher Dashboard

### Login sebagai Mahasiswa

1. Buka aplikasi dan pergi ke halaman login
2. Masukkan credentials mahasiswa:
   - NIM: `2301010101` (atau 102, 103)
   - Password: `12345`
3. Anda akan diarahkan ke halaman pemilihan meeting

### Monitoring Progress Mahasiswa

1. Login sebagai dosen
2. Dashboard akan menampilkan statistik keseluruhan
3. Buka tab "Daftar Mahasiswa" untuk melihat semua mahasiswa
4. Klik "Lihat Detail" pada mahasiswa untuk melihat:
   - Semua meeting yang dikerjakan
   - Detail skor dan progress setiap meeting
5. Buka tab "Aktivitas Terkini" untuk melihat update terbaru

## Testing

### Test Teacher Endpoints

```bash
# Get teacher token
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"nim":"TEACHER001","password":"12345"}'

# Get students summary (replace TOKEN with actual token)
curl http://localhost:3001/api/teacher/students/summary \
  -H "Authorization: Bearer TOKEN"

# Get statistics
curl http://localhost:3001/api/teacher/statistics \
  -H "Authorization: Bearer TOKEN"
```

## Keamanan

1. **Teacher-only routes** dilindungi dengan middleware `authenticateTeacher`
2. Teacher tidak bisa mengakses endpoint student
3. Student tidak bisa mengakses endpoint teacher
4. Semua endpoint memerlukan JWT token yang valid
5. Token expires dalam 24 jam

## Troubleshooting

### Database Issues

Jika ada error terkait database schema:

1. Backup data penting
2. Hapus `database.sqlite`
3. Restart server untuk membuat database baru

### Authentication Issues

Jika tidak bisa login:

1. Pastikan server berjalan di port 3001
2. Clear localStorage di browser
3. Pastikan menggunakan credentials yang benar

### Role Issues

Jika diarahkan ke halaman yang salah:

1. Logout dan login kembali
2. Clear browser cache dan localStorage
3. Periksa role di localStorage: `localStorage.getItem('user')`

## Future Enhancements

Fitur yang dapat ditambahkan di masa depan:

1. Export laporan ke Excel/PDF
2. Filter dan search mahasiswa
3. Grafik visualisasi progress
4. Notifikasi untuk dosen
5. Messaging system antara dosen dan mahasiswa
6. Bulk actions untuk dosen
7. Custom report generation
8. Meeting comparison across students

## Contact

Jika ada pertanyaan atau issue, silakan buat issue di repository GitHub.
