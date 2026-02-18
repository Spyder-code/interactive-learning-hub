# Meeting ID Migration Guide

## ✅ Changes Made

### Problem

Frontend was using string meeting IDs like `"pertemuan-1"` while database contained mixed data types (both strings and integers), causing inconsistency issues - especially in TeacherDashboard where meeting details couldn't be loaded properly.

### Solution

Standardized the entire system to use **integer meeting numbers** (1, 2, 3, etc.) for all database operations and API calls, while keeping string IDs (`"pertemuan-1"`, `"pertemuan-2"`) for frontend routing and display purposes.

---

## 📋 Files Modified

### Frontend

1. **src/data/meetings.ts**
   - Added `getMeetingNumber(meetingId: string): number` helper
   - Added `getMeetingId(meetingNumber: number): string` helper
   - These convert between string IDs ("pertemuan-1") and integers (1)

2. **src/services/api.ts**
   - Updated all `meetingAPI` methods to accept `meetingNumber: number` instead of `meetingId: string`
   - Updated `teacherAPI.getStudentMeetingDetail()` to accept integer

3. **src/hooks/useQuizStoreWithAPI.ts**
   - Added automatic conversion from string meetingId to integer meetingNumber
   - All API calls now use integer meeting numbers

4. **src/pages/MeetingSelect.tsx**
   - Added conversion logic to transform API response keys (integers) to string meeting IDs
   - Ensures backward compatibility with existing code

5. **src/pages/TeacherDashboard.tsx**
   - Updated `loadMeetingDetail()` to convert meeting ID string to number before API call
   - Added debug logging to track meeting ID conversions

### Backend

1. **database.js**
   - Changed `user_meetings.meeting_id` column type from `TEXT` to `INTEGER`
   - Added migration helper function `migrateMeetingIdToInteger()` for existing data

2. **server.js**
   - Updated all meeting-related endpoints to parse `meetingId` param as integer:
     - `GET /api/meetings/:meetingId`
     - `POST /api/meetings/:meetingId/quiz`
     - `POST /api/meetings/:meetingId/task`
     - `DELETE /api/meetings/:meetingId/task`
     - `POST /api/meetings/:meetingId/progress`
     - `POST /api/meetings/:meetingId/complete`
     - `GET /api/teacher/students/:studentId/meetings/:meetingId`

---

## 🚀 Migration Steps

### If You Have Existing Data:

1. **Backup your database:**

   ```bash
   cp database.sqlite database.sqlite.backup
   ```

2. **Option A: Run Migration (Recommended if data is important)**
   - Edit `database.js` and uncomment line:
     ```javascript
     migrateMeetingIdToInteger();
     ```
   - Restart the server:
     ```bash
     npm run dev
     ```
   - Check console for migration success messages
   - Re-comment the migration line after successful migration

3. **Option B: Fresh Start (If you don't need existing data)**
   ```bash
   rm database.sqlite
   npm run dev
   # Database will be recreated with correct schema
   ```

### If Starting Fresh:

Just start the server normally - the database will be created with the correct schema:

```bash
npm run dev
```

---

## 🧪 Testing Checklist

- [ ] Student can select and view meetings
- [ ] Quiz answers are saved to database
- [ ] Quiz answers persist after page refresh
- [ ] Quiz answers visible on different devices (same user)
- [ ] Teacher can view student meeting details
- [ ] Teacher dashboard loads meeting detail without errors
- [ ] Meeting progress is tracked correctly
- [ ] Task uploads work properly

---

## 📝 Technical Details

### Data Flow

**Student Flow:**

```
URL: /pertemuan-1
  ↓ Index.tsx gets meetingId = "pertemuan-1"
  ↓ useQuizStoreWithAPI converts to meetingNumber = 1
  ↓ API calls use integer: POST /api/meetings/1/quiz
  ↓ Database stores: meeting_id = 1 (INTEGER)
```

**Teacher Flow:**

```
Click "Lihat Detail" on meeting
  ↓ meeting.meeting_id = 1 (from database)
  ↓ TeacherDashboard converts to meetingNumber = 1
  ↓ API call: GET /api/teacher/students/5/meetings/1
  ↓ Returns meeting details with integer meeting_id
```

### Backward Compatibility

The system maintains backward compatibility:

- Frontend routing still uses string IDs (`/pertemuan-1`)
- `meetings` data structure unchanged
- Conversion happens transparently at API boundaries
- Old localStorage data remains compatible

---

## 🐛 Troubleshooting

### Error: "Meeting tidak ditemukan"

- Likely old data with string meeting_id
- Run migration or delete database and restart

### Error: "datatype mismatch"

- SQLite constraint error due to column type change
- Delete database.sqlite and restart for fresh schema

### Quiz answers not showing in Teacher Dashboard

- Check browser console for API errors
- Verify meeting_id is integer in database
- Check quiz_answers table has correct user_meeting_id references

---

## 📞 Notes

- All meeting IDs in database are now integers (1, 2, 3, ...)
- Frontend routing remains string-based for better UX
- Conversion happens automatically at API boundaries
- No manual intervention needed in normal operation
