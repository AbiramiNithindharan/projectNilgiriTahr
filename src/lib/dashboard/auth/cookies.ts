import { cookies } from "next/headers";

export async function setAuthCookie(token: string) {
  const CookieStore = await cookies();

  CookieStore.set("admin_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
}

export async function removeAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
}
