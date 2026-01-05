"use client";

import { usePathname } from "next/navigation";

import { SearchBar } from "./search-bar";
import { LocationBtn } from "./location-btn";

export const Header = () => {
  const pathname = usePathname();

  if (pathname !== "/") return null;
  return (
    <header>
      <nav className="flex flex-row justify-between items-center px-6 my-2">
        <SearchBar />
        <LocationBtn />
      </nav>
    </header>
  );
};
