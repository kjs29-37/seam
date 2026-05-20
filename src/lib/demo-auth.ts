import { cookies } from "next/headers";

export type Role = "admin" | "customer" | "tailor";

export interface DemoSession {
  role: Role;
  name: string;
  email: string;
}

export const DEMO_ACCOUNTS: Record<string, { password: string; role: Role; name: string }> = {
  "admin1@seam.com":    { password: "admin123",    role: "admin",    name: "SEAM Admin" },
  "customer@seam.com":  { password: "customer123", role: "customer", name: "Jane Davidson" },
  "tailor@seam.com":    { password: "tailor123",   role: "tailor",   name: "Lagos Studio" },
};

/** Read session from cookies (server components only). Zero network calls. */
export async function getSession(): Promise<DemoSession | null> {
  const jar = await cookies();
  const role = jar.get("seam_role")?.value as Role | undefined;
  const name = jar.get("seam_name")?.value ?? "";
  const email = jar.get("seam_email")?.value ?? "";
  if (!role) return null;
  return { role, name, email };
}
