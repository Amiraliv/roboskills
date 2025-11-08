// app/api/auth/verify-register/route.js
import { NextResponse } from "next/server";
import prisma from "./../../../../lib/prisma";
import { compareHash } from "./../../../../lib/auth";
import { hashValue } from "./../../../../lib/auth";

export async function POST(req) {
  try {
    const { email, name, password, code } = await req.json();

    if (!email || !name || !password || !code) {
      return NextResponse.json({ error: "اطلاعات ناقص است" }, { status: 400 });
    }
    const record = await prisma.verificationCode.findFirst({
      where: { email, used: false },
      orderBy: { createdAt: "desc" },
    });

    if (!record) {
      return NextResponse.json({ error: "کدی یافت نشد" }, { status: 400 });
    }

    const valid = await compareHash(code, record.codeHash);
    if (!valid || record.expiresAt < new Date()) {
      return NextResponse.json(
        { error: "کد اشتباه یا منقضی شده است" },
        { status: 400 }
      );
    }

    // استفاده شده علامت بزن
    await prisma.verificationCode.update({
      where: { id: record.id },
      data: { used: true },
    });

    const passwordHash = await hashValue(password);

    // ساخت حساب کاربری (اگر name/passwordHash ذخیره کردی، از اون‌ها استفاده کن)
    await prisma.user.create({
      data: {
        email,
        name,
        password: passwordHash,
      },
    });

    return NextResponse.json({ message: "ثبت‌نام با موفقیت تأیید شد" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "خطا در تأیید کد" }, { status: 500 });
  }
}
