import { jwtVerify, SignJWT, JWTPayload } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

/**
 * Which surface a token grants access to. Both scopes are signed with the same
 * JWT_SECRET, so the scope claim is what stops a CMS token being pasted into the
 * `admin_token` cookie to reach the dashboard, or vice versa. Always verify it.
 */
export type TokenScope = "dashboard" | "cms";

export interface AdminJWTPayload extends JWTPayload {
  id: string;
  username: string;
  scope: TokenScope;
}

export async function signToken(payload: AdminJWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("2h")
    .sign(secret);
}

/**
 * CMS gate token. Replaces the old literal `adminAuth="true"` cookie, which was
 * forgeable by hand from the devtools Application panel. 8h covers a working day
 * of editing; Sanity's own login remains the gate on the content itself.
 */
export async function signCmsToken() {
  return await new SignJWT({ id: "cms", username: "cms", scope: "cms" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("8h")
    .sign(secret);
}

export async function verifyToken(token: string, scope: TokenScope) {
  try {
    const { payload } = await jwtVerify(token, secret);
    if (payload.scope !== scope) return null;
    return payload as AdminJWTPayload;
  } catch {
    return null;
  }
}
