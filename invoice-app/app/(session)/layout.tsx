"use client";
import AuthGuard from "@/components/authGuard";
import Header from "@/components/header";
import { Suspense } from "react";
import Loading from "../loading";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

export default function SessionLayout({
  children,
  session, // Accept session as a prop
}: Readonly<{
  children: React.ReactNode;
  session?: Session;
}>) {
  return (
    <SessionProvider session={session}>
      <AuthGuard>
        <div className="min-h-screen flex flex-col">
          <Header />
          <Suspense fallback={<Loading />}>
            <main className="flex-grow pt-24 bg-gradient-to-br from-slate-500 via-gray-600 to-slate-700">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
          </Suspense>
        </div>
      </AuthGuard>
    </SessionProvider>
  );
}
