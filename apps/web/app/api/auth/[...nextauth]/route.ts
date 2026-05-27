import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        return { id: "demo-user", email: credentials.email, name: "PLASS Researcher" };
      }
    })
  ],
  pages: {
    signIn: "/auth/sign-in"
  }
});

export { handler as GET, handler as POST };
