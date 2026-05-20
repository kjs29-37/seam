import { NextResponse } from "next/server";
import { DEMO_ACCOUNTS } from "@/lib/demo-auth";

const COOKIE_OPTS = { path: "/", maxAge: 60 * 60 * 24 * 7, sameSite: "lax" as const };

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const account = DEMO_ACCOUNTS[email?.toLowerCase()];

  if (!account || account.password !== password) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const res = NextResponse.json({ role: account.role, name: account.name });
  res.cookies.set("seam_role",  account.role,  COOKIE_OPTS);
  res.cookies.set("seam_name",  account.name,  COOKIE_OPTS);
  res.cookies.set("seam_email", email,          COOKIE_OPTS);
  return res;
}
