import { NextResponse } from "next/server";
import {
  checkAdminPassword,
  createSessionCookie,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE,
} from "@/lib/auth";

export async function POST(req: Request) {
  let body: { password?: string } | null = null;
  try {
    body = (await req.json()) as { password?: string };
  } catch {
    return NextResponse.json({ error: "Body invalido" }, { status: 400 });
  }

  if (!checkAdminPassword(body?.password)) {
    return NextResponse.json(
      { error: "Password incorrecto" },
      { status: 401 },
    );
  }

  const value = await createSessionCookie();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE_NAME, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
