"use client";

import { AdminProvider } from "@/app/context/AdminContext";

export default function Providers({ children }) {
  return <AdminProvider>{children}</AdminProvider>;
}