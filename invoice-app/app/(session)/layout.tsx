"use client";

import AuthGuard from "@/components/authGuard";
import Header from "@/components/header";
import { SessionProvider } from "next-auth/react";

export default function SessionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <AuthGuard>
        <div className="min-h-screen flex flex-col">
          <Header />

          <main className="flex-grow pt-24 bg-gradient-to-br from-slate-500 via-gray-600 to-slate-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </AuthGuard>
    </SessionProvider>
  );
}
