import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center justify-start mb-0.5">
      <Image
        src={"/logo.svg"}
        alt="WeatherIQ Logo"
        width={35}
        height={35}
        className="pointer-events-none"
      />{" "}
      <span className="ml-5 text-lg hidden md:block font-noto-sans">
        WeatherIQ
      </span>
    </Link>
  );
};
