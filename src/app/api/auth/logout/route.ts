import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.redirect(
    new URL("/", process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000")
  );
  res.cookies.delete("seam_role");
  res.cookies.delete("seam_name");
  res.cookies.delete("seam_email");
  return res;
}
