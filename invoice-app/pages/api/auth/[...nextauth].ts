import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Define the type for the user returned from Prisma
interface PrismaUser {
  user_id: number;
  email: string;
  password: string | null;
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

        if (!user.password) {
          console.log("User has no password set.");
          return null;
        }

        // Ensure the comparison is done correctly
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValidPassword) {
          console.log("Invalid password");
          return null; // Return null instead of throwing an error
        }

        console.log("User authenticated successfully:", user);
        return {
          id: user.user_id.toString(), // ✅ Ensure user_id is included
          email: user.email,
          user_id: user.user_id, // 🔥 Pass user_id to NextAuth
        };
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
      return {
        ...session,
        user: {
          ...session.user,
          user_id: token.user_id ?? null, // ✅ Include user_id
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
