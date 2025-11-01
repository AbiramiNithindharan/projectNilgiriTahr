import jwt, { JwtPayload, SignOptions, Secret } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as Secret;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d"; // ✅ fallback handled safely

if (!JWT_SECRET) {
  throw new Error("❌ Missing JWT_SECRET in environment variables");
}

export function signToken(payload: Record<string, any>) {
  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN as unknown as number | undefined, // ✅ cast safe for TS 5
  };

  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload & Record<string, any>;
  } catch (error) {
    console.error("❌ Invalid or expired token:", error);
    return null;
  }
}
