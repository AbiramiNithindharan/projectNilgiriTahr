import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;

// Generate JWT
export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

// Verify JWT
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

// Set cookie
export function setAuthCookie(token) {
  cookies().set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60, // 1h
  });
}

// Clear cookie
export function clearAuthCookie() {
  cookies().set("token", "", { maxAge: 0, path: "/" });
}
