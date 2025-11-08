import { NextResponse } from "next/server";
import prisma from "./../../../../lib/prisma";
import bcrypt from "bcrypt";

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

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "خطا در ثبت‌نام" }, { status: 500 });
  }
}
