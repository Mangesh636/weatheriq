import Image from "next/image";

import { SearchBar } from "./search-bar";
import { LocationBtn } from "./location-btn";

export const Header = () => {
  return (
    <header className="mx-4">
      <nav className="flex flex-row justify-evenly items-center">
        <div className="flex flex-row items-center gap-2 p-4 text-black font-bold text-xl">
          <Image
            src={"/logo.svg"}
            alt="WeatherIQ Logo"
            width={35}
            height={35}
          />{" "}
          <span>WeatherIQ</span>
        </div>
        <div className="flex flex-row gap-4 justify-end md:justify-between">
          <SearchBar />
          <LocationBtn />
        </div>
      </nav>
    </header>
  );
};
