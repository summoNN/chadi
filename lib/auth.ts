// SHA-256 password hash for admin access
// Default password: chadi2024
const PASSWORD_HASH = "922c4c09a1c0dfe913e9aa9fec8fd1b049a50513595c5bca4a63645bb863fc56";

const SESSION_KEY = "chadi_admin_auth";

/** Hash a plaintext string using SHA-256 via Web Crypto API */
export async function hashPassword(plain: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Verify a plaintext password against the stored hash */
export async function verifyPassword(plain: string): Promise<boolean> {
  const hash = await hashPassword(plain);
  return hash === PASSWORD_HASH;
}

/** Check if the current session is authenticated */
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SESSION_KEY) === "true";
}

/** Mark the current session as authenticated */
export function setAuthenticated(): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_KEY, "true");
}

/** Clear authentication */
export function logout(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_KEY);
}
