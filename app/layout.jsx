"use client";

import "./globals.css";
import { AdminProvider } from "@/app/context/AdminContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AdminProvider>{children}</AdminProvider>
      </body>
    </html>
  );
}
