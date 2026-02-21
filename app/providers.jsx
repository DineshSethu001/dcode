"use client";

import { AdminProvider } from "./context/AdminContext";

export default function Providers({ children }) {
  return <AdminProvider>{children}</AdminProvider>;
}
