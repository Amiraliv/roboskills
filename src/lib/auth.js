import crypto from "crypto";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

export function generateNumericCode(length = 6) {
  const max = 10 ** length;
  const num = crypto.randomInt(0, max);
  return String(num).padStart(length, "0");
}

export async function hashValue(value) {
  const saltRounds = 10;
  return bcrypt.hash(value, saltRounds);
}

export async function compareHash(value, hash) {
  return bcrypt.compare(value, hash);
}

export async function sendVerificationEmail(to, code) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject: "کد تأیید ورود",
      text: `کد تأیید شما: ${code}\nکد تا 10 دقیقه معتبر است.`,
      html: `<p>کد تأیید شما: <b>${code}</b></p><p>کد تا 10 دقیقه معتبر است.</p>`,
    });
  } catch (error) {
    return { success: false };
  } finally {
    return { success: true };
  }
}
