// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    user_id: number;
  }

  interface Session {
    user: {
      user_id: number;
      email: string;
    };
  }

  interface JWT {
    user_id: number;
  }
}
