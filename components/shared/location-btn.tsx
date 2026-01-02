"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Gps01Icon } from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";

type Location = {
  latitude: number;
  longitude: number;
};

export const LocationBtn = () => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Current Location:", latitude, longitude);
          setCurrentLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };
  return (
    <Button variant={"outline"} onClick={getCurrentLocation} className="cursor-pointer py-5 px-3 ">
      <HugeiconsIcon icon={Gps01Icon} strokeWidth={2} />
      <span className="hidden sm:block">Current Location</span>
    </Button>
  );
};
