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
        console.log(
          "Attempting to authorize user with email:",
          credentials?.email
        );

        if (!credentials?.email || !credentials.password) {
          console.log("Missing credentials");
          return null; // Return null if email or password is missing
        }

        // Fetch the user from the database
        const user: PrismaUser | null = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          console.log("User not found");
          return null; // User does not exist
        }

        // Check if user exists and validate the password directly
        if (user.password === credentials.password) {
          console.log("User authenticated successfully:", user);
          // Return a user object that matches the expected type
          return {
            id: user.user_id.toString(), // Map user_id to id
            email: user.email,
            username: user.username,
            name: user.name,
          };
        } else {
          console.log("Invalid password");
          return null; // Return null if password is invalid
        }
      },
    }),
    // Additional providers can be added here if needed
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt", // Using JWT for session strategy
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        // Check if token.sub is defined
        session.user.user_id = Number(token.sub); // Convert to number
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id.toString(); // Store id as a string in the token
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret for NextAuth
};

export default NextAuth(authOptions);
