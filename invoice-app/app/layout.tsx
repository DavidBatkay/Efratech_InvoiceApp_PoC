import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";
import "@mantine/core/styles.css";
export const metadata: Metadata = {
  title: "Invoice Generator",
  description: "App for generating invoices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Suspense fallback={<Loading />}>
        <body>{children}</body>
      </Suspense>
    </html>
  );
}
