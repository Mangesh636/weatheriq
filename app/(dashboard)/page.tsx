"use client";

import { useSearchParams } from "next/navigation";

export default function Page() {
  const params = useSearchParams();
  const cityId = params.get("city");
  return (
    <main>
      <h1 className="text-8xl text-black">{cityId}</h1>
    </main>
  );
}
