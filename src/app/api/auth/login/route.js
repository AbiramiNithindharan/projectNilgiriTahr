import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken, setAuthCookie } from "@/utils/auth";

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    await connectDB();

    const user = await User.findOne({ username });
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      });
    }

    const token = generateToken({ userId: user._id, username: user.username });
    setAuthCookie(token);

    return new Response(JSON.stringify({ message: "Login successful" }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
