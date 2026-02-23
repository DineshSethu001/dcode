"use client";

import { useSearchParams } from "next/navigation";

export default function SearchParamsClient() {
  const searchParams = useSearchParams();
  const value = searchParams.get("id");

  return <div>{value}</div>;
}