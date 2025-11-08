import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compareHash } from "./../../../../lib/auth";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "EmailCode",
      credentials: {
        email: { label: "Email", type: "email" },
        code: { label: "Code", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, code } = credentials;

        const record = await prisma.verificationCode.findFirst({
          where: { email, used: false, expiresAt: { gt: new Date() } },
          orderBy: { createdAt: "desc" },
        });

        if (!record) return null;

        const ok = await compareHash(code, record.codeHash);
        if (!ok) return null;

        await prisma.verificationCode.update({
          where: { id: record.id },
          data: { used: true },
        });

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        return { id: user.id, email: user.email };
      },
    }),
  ],
  session: { strategy: "jwt" },
  jwt: { secret: process.env.NEXTAUTH_SECRET },
  pages: { signIn: "/auth/signin" },
});

export { handler as GET, handler as POST };
