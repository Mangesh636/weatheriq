import { GithubIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <section className="mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-2 text-center">
      <Image
        src="/logo.svg"
        alt="WeatherIQ Logo"
        width={125}
        height={125}
        className="pointer-events-none"
      />

      <h1 className="my-4 text-4xl font-medium">About WeatherIQ</h1>

      <p className="text-lg leading-relaxed text-muted-foreground md:w-1/2">
        WeatherIQ is a fast and accurate weather platform focused on clarity and
        performance. It delivers real-time weather intelligence without clutter,
        unnecessary abstractions, or slow APIs.
      </p>

      {/* Powered by */}
      <div className="my-8 inline-flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Powered by</span>

        <Link
          href="https://open-meteo.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-medium hover:opacity-80"
        >
          <Image
            src="/open-meteo.png"
            alt="Open-Meteo"
            width={22}
            height={22}
          />
          <span>Open-Meteo</span>
        </Link>
      </div>

      {/* Source code */}
      <div className="inline-flex items-center gap-3">
        <span className="text-sm text-muted-foreground">
          Source code available at
        </span>

        <Link
          href="https://github.com/mangesh636/weatheriq/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-medium hover:opacity-80"
        >
          <HugeiconsIcon icon={GithubIcon} strokeWidth={2} size={22} />
          <span>WeatherIQ</span>
        </Link>
      </div>
    </section>
  );
}
