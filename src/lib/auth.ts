/**
 * Sesion del admin: cookie firmada con HMAC-SHA256.
 *
 * Usa Web Crypto (crypto.subtle) asi corre tambien en Edge runtime,
 * porque la verificacion ocurre dentro de proxy.ts (Next 16).
 */

export const SESSION_COOKIE_NAME = "admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 dias

function base64url(bytes: Uint8Array): string {
  let str = "";
  for (let i = 0; i < bytes.length; i++) str += String.fromCharCode(bytes[i]);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmac(secret: string, data: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return base64url(new Uint8Array(sig));
}

function requireSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "ADMIN_SESSION_SECRET no configurado o demasiado corto (>=16 chars).",
    );
  }
  return secret;
}

export async function createSessionCookie(): Promise<string> {
  const ts = Date.now().toString();
  const sig = await hmac(requireSecret(), ts);
  return `${ts}.${sig}`;
}

export async function verifySessionCookie(
  value: string | undefined,
): Promise<boolean> {
  if (!value) return false;
  let secret: string;
  try {
    secret = requireSecret();
  } catch {
    return false;
  }
  const dot = value.indexOf(".");
  if (dot <= 0 || dot >= value.length - 1) return false;
  const ts = value.slice(0, dot);
  const sig = value.slice(dot + 1);
  const expected = await hmac(secret, ts);
  if (!timingSafeEqual(sig, expected)) return false;
  const tsNum = Number(ts);
  if (!Number.isFinite(tsNum)) return false;
  const ageSec = (Date.now() - tsNum) / 1000;
  if (ageSec < 0 || ageSec > SESSION_MAX_AGE) return false;
  return true;
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function checkAdminPassword(input: string | undefined): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || expected.length < 6) return false;
  if (!input) return false;
  return timingSafeEqual(input, expected);
}
