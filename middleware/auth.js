import jwt from "jsonwebtoken";
import db from "../database.js";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    // Check if the user's tokens have been invalidated after this token was issued
    const dbUser = db
      .prepare(
        "SELECT is_active, tokens_invalidated_after FROM users WHERE id = ?",
      )
      .get(user.id);

    if (!dbUser) {
      return res.status(403).json({ error: "User not found" });
    }

    if (dbUser.is_active === 0) {
      return res.status(403).json({ error: "Akun tidak aktif" });
    }

    if (dbUser.tokens_invalidated_after) {
      const invalidatedAt =
        new Date(dbUser.tokens_invalidated_after).getTime() / 1000;
      if (user.iat < invalidatedAt) {
        return res
          .status(401)
          .json({ error: "Session telah diakhiri, silakan login kembali" });
      }
    }

    req.user = user;
    next();
  });
}

export function authenticateTeacher(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    if (user.role !== "teacher") {
      return res
        .status(403)
        .json({ error: "Access denied. Teacher role required." });
    }

    // Check if the teacher's tokens have been invalidated after this token was issued
    const dbUser = db
      .prepare(
        "SELECT is_active, tokens_invalidated_after FROM users WHERE id = ?",
      )
      .get(user.id);

    if (!dbUser) {
      return res.status(403).json({ error: "User not found" });
    }

    if (dbUser.tokens_invalidated_after) {
      const invalidatedAt =
        new Date(dbUser.tokens_invalidated_after).getTime() / 1000;
      if (user.iat < invalidatedAt) {
        return res
          .status(401)
          .json({ error: "Session telah diakhiri, silakan login kembali" });
      }
    }

    req.user = user;
    next();
  });
}
