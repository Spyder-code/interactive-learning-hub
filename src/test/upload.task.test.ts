import request from "supertest";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";

vi.mock("minio", () => {
  const objects = new Map<string, Buffer>();

  class Client {
    async bucketExists() {
      return true;
    }

    async makeBucket() {
      return undefined;
    }

    async putObject(bucket: string, key: string, buffer: Buffer) {
      objects.set(`${bucket}/${key}`, buffer);
      return { etag: "test-etag" };
    }

    async removeObject(bucket: string, key: string) {
      objects.delete(`${bucket}/${key}`);
    }
  }

  return { Client };
});

import app from "../../server.js";
import db from "../../database.js";

// Ensure JWT secret for tests
process.env.JWT_SECRET =
  process.env.JWT_SECRET || "test_secret_for_upload_tests";

const TEST_NIM = "TESTUPLOAD001";
const TEST_NAME = "Test Upload User";
const TEST_MEETING_ID = 999;
let userId: number | null = null;
let userMeetingId: number | null = null;
let token: string | null = null;
let tempFilePath: string | null = null;

beforeAll(async () => {
  // Create test user if not exists
  const existing = await db
    .prepare("SELECT * FROM users WHERE nim = ?")
    .get(TEST_NIM);
  if (existing) {
    userId = existing.id;
  } else {
    const hashed = bcrypt.hashSync("password", 10);
    const result = await db
      .prepare(
        "INSERT INTO users (nim, name, password, role) VALUES (?, ?, ?, ?)",
      )
      .run(TEST_NIM, TEST_NAME, hashed, "student");
    userId = result.lastInsertRowid;
  }

  // Ensure user_meetings row
  const um = await db
    .prepare("SELECT * FROM user_meetings WHERE user_id = ? AND meeting_id = ?")
    .get(userId, TEST_MEETING_ID);

  if (um) {
    userMeetingId = um.id;
  } else {
    const result = await db
      .prepare(
        "INSERT INTO user_meetings (user_id, meeting_id, start_time) VALUES (?, ?, ?)",
      )
      .run(userId, TEST_MEETING_ID, new Date().toISOString());
    userMeetingId = result.lastInsertRowid;
  }

  // Create JWT token
  token = jwt.sign(
    {
      id: userId,
      nim: TEST_NIM,
      name: TEST_NAME,
      role: "student",
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  // Create a small temp file to upload
  const tmpDir = path.join(process.cwd(), "test_tmp");
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);
  tempFilePath = path.join(tmpDir, "test.png");
  fs.writeFileSync(tempFilePath, "This is a test file for upload");
});

afterAll(async () => {
  // Cleanup DB records created during tests
  try {
    if (userMeetingId) {
      await db.prepare("DELETE FROM task_uploads WHERE user_meeting_id = ?").run(
        userMeetingId,
      );
      await db.prepare("DELETE FROM user_meetings WHERE id = ?").run(userMeetingId);
    }
    if (userId) {
      await db.prepare("DELETE FROM users WHERE id = ?").run(userId);
    }

    // Remove temp file
    if (tempFilePath && fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
    const tmpDir = path.join(process.cwd(), "test_tmp");
    if (fs.existsSync(tmpDir)) fs.rmdirSync(tmpDir, { recursive: true });
  } catch (err) {
    // ignore cleanup errors
  }
});

describe("Task upload endpoint", () => {
  it("should upload a file and save DB record", async () => {
    if (!token) throw new Error("Token not initialized");
    if (!tempFilePath) throw new Error("Temp file not created");

    const res = await request(app)
      .post(`/api/meetings/${TEST_MEETING_ID}/task`)
      .set("Authorization", `Bearer ${token}`)
      .field("slideId", "1")
      .field("taskIndex", "0")
      .attach("file", tempFilePath, { contentType: "image/png" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("file");
    expect(res.body.file).toHaveProperty("path");

    const relativePath = res.body.file.path as string;
    expect(relativePath).toMatch(new RegExp(`^storage/${TEST_NIM}/test_.*\\.png$`));

    // Check DB record exists
    const um = await db
      .prepare(
        "SELECT * FROM user_meetings WHERE user_id = ? AND meeting_id = ?",
      )
      .get(userId, TEST_MEETING_ID);
    expect(um).toBeTruthy();

    const upload = await db
      .prepare(
        "SELECT * FROM task_uploads WHERE user_meeting_id = ? AND slide_id = ? AND task_index = ?",
      )
      .get(um.id, 1, 0);

    expect(upload).toBeTruthy();
    expect(upload.file_name).toBe("test.png");
    expect(upload.file_path).toBe(relativePath);
  });
});
