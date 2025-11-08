"use server";

import { sendVerificationEmail } from "./../../lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await sendVerificationEmail("amirlulufk@gmail.com", "26kir");

  console.log("sendVerificationEmail", res);

  return NextResponse.json({ uptime: process.uptime() });
}
