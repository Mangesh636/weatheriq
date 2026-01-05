"use client";

import { useEffect, useState } from "react";

import { z } from "zod";
import Flag from "react-world-flags";
import {
  ArrowTurnBackwardIcon,
  MapsSearchIcon,
  RepeatFreeIcons,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

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
import { CitySchema, GeocodingResponseSchema } from "@/schemas/geocoding";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce";
import { getRecentSearches, saveRecentSearches } from "@/lib/indexedDB";
import { useRouter } from "next/navigation";

type SearchBarProps = {
  cityName?: string;
}

export const SearchBar = ({ cityName }: SearchBarProps) => {
  const router = useRouter();
  // State to control the dialog open/close
  const [dialogOpen, setDialogOpen] = useState(false);
  // State to hold the search query
  const [query, setQuery] = useState(cityName ||"");
  // Debounced query to limit API calls
  const debouncedQuery = useDebounce(query, 300);
  // State to hold recent searches
  const [recentSearches, setRecentSearches] = useState<
    z.infer<typeof CitySchema>[]
  >([]);
  // Helper to check if a city is in recent searches
  const isCityInRecent = (cityId: number) => {
    return recentSearches.some((c) => c.id === cityId);
  };

  // Load recent searches from IndexedDB on component mount
  useEffect(() => {
    if (!("indexedDB" in window)) return;

    getRecentSearches()
      .then((results) => setRecentSearches(results))
      .catch(console.error);
  }, []);

  const handleCitySelect = async (city: z.infer<typeof CitySchema>) => {
    // Navigate to the city's page
    router.push(`/?city=${city.city_name}`);

    // Update recent searches
    const updated = [
      city,
      ...recentSearches.filter((c) => c.id !== city.id),
    ].slice(0, 5);
    setRecentSearches(updated);
    await saveRecentSearches(updated);

    setDialogOpen(false);
    setQuery("");
  };

  // State to hold search results
  const [searchResults, setSearchResults] = useState<
    z.infer<typeof CitySchema>[]
  >([]);

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

  //
  useEffect(() => {
    if (!debouncedQuery.trim()) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchLocations = async () => {
      try {
        const response = await fetch(`/api/search?name=${debouncedQuery}`, {
          signal,
        });
        const data = await response.json();

        // Validate and set search results
        const parsedResults = GeocodingResponseSchema.safeParse(data);
        console.log(parsedResults);

        if (!parsedResults.success || !parsedResults.data.results) {
          setSearchResults([]);
          return;
        }
        setSearchResults(parsedResults.data.results);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Search Api Error:", error);
          setSearchResults([]);
        }
      }
    };

    fetchLocations();
    return () => controller.abort();
  }, [debouncedQuery]);

  const displayResults = query.trim() ? searchResults : recentSearches;

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
              value={query}
              onChange={(e) => setQuery(e.target.value)}
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
        {displayResults.length > 0 ? (
          <ScrollArea className="max-h-75 w-full">
            <div className="flex flex-col gap-4">
              {displayResults.map((city) => (
                <div
                  key={city.id}
                  className="flex flex-row gap-2 bg-muted px-3 py-2 rounded-xl cursor-pointer hover:bg-accent/50"
                  onClick={() => handleCitySelect(city)}
                >
                  {/* Country Flag */}
                  <div className="relative flex size-8 shrink-0 overflow-hidden rounded-full self-center mr-1.5">
                    <Flag
                      code={city.country_code}
                      fallback={
                        <span className="bg-muted flex size-full items-center justify-center rounded-full font-noto-serif">
                          {city.country_code}
                        </span>
                      }
                      className="aspect-square size-8 object-cover"
                    />
                  </div>
                  {/* City and State */}
                  <div className="flex flex-col left-0.5">
                    <span className="font-noto-serif">{city.city_name}</span>
                    <span className="text-sm text-muted-foreground">
                      {city.state_name} ({city.latitude.toFixed(2)}&deg;N{" "}
                      {city.longitude.toFixed(2)}&deg;E {city.elevation}m)
                    </span>
                  </div>
                  {isCityInRecent(city.id) && (
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      className="ml-auto shrink-0 self-center cursor-pointer"
                    >
                      <HugeiconsIcon icon={RepeatFreeIcons} strokeWidth={2} />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <Empty className="border from-muted/50 to-background h-full bg-linear-to-b from-30%">
            {/* No Results Found */}
            <EmptyHeader>
              <EmptyMedia variant={"icon"}>
                <HugeiconsIcon icon={MapsSearchIcon} strokeWidth={2} />
              </EmptyMedia>
              <EmptyTitle className="font-noto-serif">
                {query ? "No results found" : "No recent searches"}
              </EmptyTitle>
              <EmptyDescription>
                {query
                  ? "Try with a different city name."
                  : "Start typing to see results."}
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
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
