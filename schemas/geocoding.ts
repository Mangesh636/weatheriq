import { z } from 'zod';

const CitySchema = z.object({
    id: z.number(),
    city_name: z.string(),
    district_name: z.string().nullable().optional(),
    subdistrict_name: z.string().nullable().optional(),
    ward_name: z.string().nullable().optional(),
    state_name: z.string().nullable().optional(),
    country_name: z.string().nullable().optional(),
    country_code: z.string().min(2).max(3),
    timezone: z.string().nullable().optional(),
    latitude: z.number(),
    longitude: z.number(),
    elevation: z.number().nullable().optional(),
});

const GeocodingResponseSchema = z.object({
    results: z.array(CitySchema).optional()
})

export { CitySchema, GeocodingResponseSchema };