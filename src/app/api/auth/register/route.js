import prisma from "./../../../../lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return Response.json({ error: "اطلاعات ناقص است" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return Response.json(
        { error: "این ایمیل قبلاً ثبت شده است" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return Response.json({ user: newUser }, { status: 201 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "خطا در ثبت‌نام" }, { status: 500 });
  }
}
