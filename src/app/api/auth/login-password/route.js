import { NextResponse } from "next/server";
import prisma from "./../../../../lib/prisma";
import {
  generateNumericCode,
  hashValue,
  compareHash,
  sendVerificationEmail,
} from "./../../../../lib/auth";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "email and password required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      return NextResponse.json(
        { error: "invalid credentials" },
        { status: 401 }
      );
    }

    const ok = await compareHash(password, user.password);
    if (!ok) {
      return NextResponse.json(
        { error: "invalid credentials" },
        { status: 401 }
      );
    }

    const code = generateNumericCode(6);
    const codeHash = await hashValue(code);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.verificationCode.create({
      data: { email, codeHash, expiresAt },
    });

    await sendVerificationEmail(email, code);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
