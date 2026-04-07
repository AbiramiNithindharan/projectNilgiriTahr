import { jwtVerify, SignJWT, JWTPayload } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export interface AdminJWTPayload extends JWTPayload {
  id: string;
  username: string;
}
export async function signToken(payload: AdminJWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("2h")
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as AdminJWTPayload;
  } catch {
    return null;
  }
}
