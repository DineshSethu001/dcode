"use client";

import { useSearchParams } from "next/navigation";

export default function SearchComponent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  return <div>Name: {name}</div>;
}