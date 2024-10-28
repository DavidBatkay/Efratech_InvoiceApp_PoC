// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      user_id: number; // Match the type from your User model
      email: string; // Include this if needed
      username?: string | null; // Optional, if you decide to include it
      name?: string | null; // Optional
      // Remove image if you don't need it
    };
    expires: ISODateString; // Include this to match the default session structure
  }
}
