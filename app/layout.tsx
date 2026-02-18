import type { Metadata } from "next";
import { ReactNode } from "react";
import { AdminProvider } from "@/app/context/AdminContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dcode Portfolio",
  description: "It is the website that showcase my skills",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AdminProvider>
          {children}
        </AdminProvider>
      </body>
    </html>
  );
}
