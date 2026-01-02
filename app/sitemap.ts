import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const url = process.env.NEXT_PUBLIC_BASE_URL;
    return [
        {
            url: url!,
            changeFrequency: "hourly",
            priority: 1
        },
        {
            url: `${url!}/locations`,
            changeFrequency: "weekly",
            priority: 0.9
        },
        {
            url: `${url!}/settings`,
            changeFrequency: "weekly",
            priority: 0.8
        },
        {
            url: `${url!}/about`,
            changeFrequency: "monthly",
            priority: 0.5
        }
    ]
}