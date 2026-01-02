"use client";

import { useEffect, useState } from "react";

import {
  ArrowTurnBackwardIcon,
  MapsSearchIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Flag from "react-world-flags";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const locationData = [
  {
    id: 1259229,
    country_code: "IN",
    city: "Pune",
    state: "Maharashtra",
    lat: 18.51957,
    lag: 73.85535,
    elevation: 554.0,
  },
  {
    id: 1944337,
    country_code: "TL",
    city: "Pune",
    state: "Oecusse",
    lat: -9.36944,
    lag: 124.31722,
    elevation: 330.0,
  },
  {
    id: 3391144,
    country_code: "BR",
    city: "Pune",
    state: "Pará",
    lat: 1.96667,
    lag: -54.91667,
    elevation: 352.0,
  },
  {
    id: 120807,
    country_code: "IR",
    city: "Pūnel",
    state: "Gilan Province",
    lat: 37.53305,
    lag: 49.11652,
    elevation: 47.0,
  },
  {
    id: 504142,
    country_code: "RU",
    city: "Punem",
    state: "Udmurtiya Republic",
    lat: 56.69193,
    lag: 52.3785,
    elevation: 158.0,
  },
  {
    id: 6408696,
    country_code: "ID",
    city: "Punen",
    state: "East Java",
    lat: -7.54917,
    lag: 111.20167,
    elevation: 831.0,
  },
  {
    id: 6695057,
    country_code: "FR",
    city: "Punel",
    state: "Brittany",
    lat: 48.4571,
    lag: -5.08397,
    elevation: 28.0,
  },
  {
    id: 6744526,
    country_code: "ID",
    city: "Punen",
    state: "Central Java",
    lat: -6.7072,
    lag: 110.8396,
    elevation: 181.0,
  },
  {
    id: 8650286,
    country_code: "PE",
    city: "Punen",
    state: "Ayacucho",
    lat: -12.71384,
    lag: -74.29244,
    elevation: 3711.0,
  },
  {
    id: 2985058,
    country_code: "FR",
    city: "Punerot",
    state: "Grand Est",
    lat: 48.48084,
    lag: 5.80841,
    elevation: 295.0,
  },
];

export const SearchBar = () => {
  // State to control the dialog open/close
  const [dialogOpen, setDialogOpen] = useState(false);
  // State to hold the search query
  const [query, setQuery] = useState("");

  //   Keyboard shortcut handler to open/close the search dialog
  useEffect(() => {
    const downHandler = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setDialogOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", downHandler);
    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener("keydown", downHandler);
    };
  }, []);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>
        <InputGroup>
          <InputGroupInput
            placeholder="Search for a city..."
            className="hidden md:block"
          />
          <InputGroupAddon className="py-5 px-3">
            <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Kbd>Ctrl + K</Kbd>
          </InputGroupAddon>
        </InputGroup>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className={"sr-only"}>Search locations</DialogTitle>
          <DialogDescription className={"sr-only"}>
            Search and select a city to view its details.
          </DialogDescription>
          {/* Search Input */}
          <InputGroup>
            <InputGroupInput
              placeholder="Search for a city..."
              className="md:block"
            />
            <InputGroupAddon className="py-5 px-3">
              <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
            </InputGroupAddon>
          </InputGroup>
        </DialogHeader>
        <Separator className={""} />
        {/* Search Results */}
        {query && (
          <ScrollArea className="h-75 w-full">
            <div className="flex flex-col gap-4 ">
              {locationData.map((index) => (
                <div
                  key={index.id}
                  className="flex flex-row gap-2 bg-muted px-3 py-2 rounded-xl cursor-pointer hover:bg-accent/50"
                >
                  {/* Country Flag */}
                  <div className="relative flex size-8 shrink-0 overflow-hidden rounded-full self-center mr-1.5">
                    <Flag
                      code={index.country_code}
                      fallback={
                        <span className="bg-muted flex size-full items-center justify-center rounded-full font-noto-serif">
                          {index.country_code}
                        </span>
                      }
                      className="aspect-square size-8 object-cover"
                    />
                  </div>
                  {/* City and State */}
                  <div className="flex flex-col left-0.5">
                    <span className="font-noto-serif">{index.city}</span>
                    <span className="text-sm text-muted-foreground">
                      {index.state} ({index.lat.toFixed(2)}&deg;N{" "}
                      {index.lag.toFixed(2)}&deg;E {index.elevation}m)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
        {/* No Results Found */}
        <Empty className="border from-muted/50 to-background h-full bg-linear-to-b from-30%">
          <EmptyHeader>
            <EmptyMedia variant={"icon"}>
              <HugeiconsIcon icon={MapsSearchIcon} strokeWidth={2} />
            </EmptyMedia>
            <EmptyTitle className="font-noto-serif">
              No locations found
            </EmptyTitle>
            <EmptyDescription>Try with a different city name.</EmptyDescription>
          </EmptyHeader>
        </Empty>
        {/* Dialog Close Button */}
        <DialogFooter className="inline-block bg-muted -mx-6 -mb-6 px-6 py-4 rounded-b-4xl">
          <DialogClose
            className={
              "inline-flex gap-x-3.5 text-stone-500 cursor-pointer text-sm"
            }
          >
            <HugeiconsIcon
              icon={ArrowTurnBackwardIcon}
              strokeWidth={2}
              size={24}
              className="bg-white p-0.5 border text-stone-500 rounded-md"
            />
            Go to Dashboard
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
