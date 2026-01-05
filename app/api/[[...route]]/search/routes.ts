import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { env } from "@/config/env";

export const search = new Hono();

type city = {
  id: number;
  name: string;
  country_code: string;
  latitude: number;
  longitude: number;
  elevation?: number;
};


const querySchema = z.object({
  name: z.string().min(1),
});

search.get(
  "/",
  zValidator("query", querySchema, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          error: "Invalid query parameter",
        },
        400
      );
    }
  }),

  async (c) => {
    const { name } = c.req.valid("query");

    const url = new URL(env.GEOCODING_API_URL);
    url.searchParams.set("name", name);
    url.searchParams.set("count", "20");
    url.searchParams.set("format", "json");

    const res = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      return c.json(
        {
          error: "Failed to fetch data from geocoding API",
        },
        502
      );
    }

    const data = (await res.json()) as { results?: city[] };

    const results = (data.results || []).map((item: city) => ({
      id: item.id,
      city_name: item.name,
      country_code: item.country_code,
      latitude: item.latitude,
      longitude: item.longitude,
      elevation: item.elevation ?? null,
    }));


    return c.json({
      results,
    });
  }
);
