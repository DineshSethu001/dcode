"use client";

import { useSearchParams } from "next/navigation";

export default function Navbar() {
  const searchParams = useSearchParams();
  const section = searchParams.get("section");

  return <nav>{section}</nav>;
}