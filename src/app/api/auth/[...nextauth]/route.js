import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const user = {
          id: "1",
          name: "Ali",
          email: "ali@example.com",
          password: "123456",
        };

        if (
          credentials.email === user.email &&
          credentials.password === user.password
        ) {
          // کاربر معتبر
          return user;
        } else {
          // کاربر نامعتبر
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/login", // مسیر صفحه ورود اختصاصی (اختیاری)
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
