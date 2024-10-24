import type { Metadata } from "next";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Invoice Generator DashBoard",
  description: "Main Page of Invoice Generator",
};

export default function SessionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 bg-gradient-to-br from-slate-500 to-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
