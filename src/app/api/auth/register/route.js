import { NextResponse } from "next/server";
import prisma from "./../../../../lib/prisma";
import {
  generateNumericCode,
  hashValue,
  sendVerificationEmail,
} from "./../../../../lib/auth";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "اطلاعات ناقص است" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "این ایمیل قبلاً ثبت شده است" },
        { status: 400 }
      );
    }

    const code = generateNumericCode(6);
    const codeHash = await hashValue(code);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.verificationCode.deleteMany({ where: { email } });

    await prisma.verificationCode.create({
      data: { email, codeHash, expiresAt },
    });

    await sendVerificationEmail(email, code);

    return NextResponse.json({ message: "کد تأیید ارسال شد" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "خطا در ثبت‌نام" }, { status: 500 });
  }
}
