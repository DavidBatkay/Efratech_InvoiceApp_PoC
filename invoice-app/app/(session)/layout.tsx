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
    <section className="grid">
      <Header />
      {children}
    </section>
  );
}
