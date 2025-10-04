import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    await connectDB();
    const existing = await User.findOne({ username });
    if (existing) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 400,
      });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashed });

    return new Response(JSON.stringify({ message: "User created", user }), {
      status: 201,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
