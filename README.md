# Interactive Learning Hub

Aplikasi pembelajaran interaktif dengan backend Node.js, autentikasi user, dan penyimpanan progress di SQLite database.

## Fitur

- 🔐 **Autentikasi User**: Login dengan NIM dan password
- 📚 **Multiple Meetings**: Pilih pertemuan yang ingin dipelajari
- 📝 **Interactive Slides**: Slide presentasi dengan quiz dan tasks
- 💾 **Progress Tracking**: Simpan progress dan hasil per user per meeting
- 📊 **Score Summary**: Lihat hasil quiz dan durasi belajar
- 🗄️ **SQLite Database**: Penyimpanan data lokal yang reliable

## Tech Stack

### Frontend

- React + TypeScript
- Vite
- TailwindCSS + shadcn/ui
- Zustand (State Management)
- React Router
- React Query

### Backend

- Node.js + Express
- SQLite3 (better-sqlite3)
- JWT Authentication
- bcryptjs

## Setup & Installation

### Prerequisites

- Node.js (v16 atau lebih baru)
- npm atau bun

### Installation

```sh
# 1. Clone repository
git clone <YOUR_GIT_URL>
cd interactive-learning-hub

# 2. Install dependencies
npm install

# 3. Setup environment variables (opsional, sudah ada default)
# Buat file .env jika ingin custom configuration
# PORT=3001
# JWT_SECRET=your-secret-key

# 4. Jalankan aplikasi (frontend & backend bersamaan)
npm run dev:all

# Atau jalankan secara terpisah:
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run dev
```

## Default Users

Aplikasi sudah include 3 user default untuk testing:

| NIM        | Password | Nama           |
| ---------- | -------- | -------------- |
| 2301010101 | 12345    | Ahmad Pratama  |
| 2301010102 | 12345    | Siti Nurhaliza |
| 2301010103 | 12345    | Budi Santoso   |

## Struktur Database

### Tables

1. **users**: Menyimpan data user
2. **user_meetings**: Menyimpan progress meeting per user
3. **quiz_answers**: Menyimpan jawaban quiz per user per meeting
4. **task_uploads**: Menyimpan info file upload per user per meeting
5. **slide_progress**: Menyimpan progress slide per user

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register user baru
- `GET /api/auth/verify` - Verify JWT token

### Meetings

- `GET /api/meetings` - Get all meetings untuk user
- `GET /api/meetings/:meetingId` - Get detail meeting
- `POST /api/meetings/:meetingId/quiz` - Save jawaban quiz
- `POST /api/meetings/:meetingId/task` - Save task upload
- `POST /api/meetings/:meetingId/progress` - Update progress slide
- `POST /api/meetings/:meetingId/complete` - Complete meeting

## Development

```sh
# Run tests
npm test

# Build untuk production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── services/       # API services
│   ├── stores/         # Zustand stores
│   ├── hooks/          # Custom hooks
│   └── data/           # Static data (slides, meetings)
├── middleware/         # Express middleware
├── server.js           # Express server
├── database.js         # Database setup & schema
└── database.sqlite     # SQLite database (auto-generated)
```

## License

MIT

- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
