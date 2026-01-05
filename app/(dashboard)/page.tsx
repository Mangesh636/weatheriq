"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Page() {
  const params = useSearchParams();
  const cityId = params.get("city");
  return (
    <main>
      <Suspense fallback={<h1 className="text-8xl text-black">Loading...</h1>}>
        <h1 className="text-8xl text-black">{cityId}</h1>
      </Suspense>
    </main>
  );
}
