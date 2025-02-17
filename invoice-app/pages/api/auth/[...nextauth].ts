import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

// Define the type for the user returned from Prisma
interface PrismaUser {
  user_id: number;
  email: string;
  username: string | null;
  password: string | null;
  name: string | null;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        console.log("Attempting to authorize user:", credentials?.email);

        if (!credentials?.email || !credentials.password) {
          console.log("Missing credentials");
          return null;
        }

        const user: PrismaUser | null = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          console.log("User not found");
          return null;
        }

        if (user.password === credentials.password) {
          console.log("User authenticated successfully:", user);
          return {
            id: user.user_id.toString(), // ✅ Make sure user_id is included
            email: user.email,
            name: user.name,
            user_id: user.user_id, // 🔥 Add this to pass user_id to NextAuth
          };
        } else {
          console.log("Invalid password");
          return null;
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user_id = (user as any).user_id; // ✅ Store user_id in the token
      }
      return token;
    },
    async session({ session, token }) {
      // console.log("Session Callback - Token:", token);

      return {
        ...session,
        user: {
          ...session.user,
          user_id: token.user_id ?? null, // ✅ Make sure to include user_id
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
