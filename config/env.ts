import { z } from "zod"

const publicEnvSchema = z.object({
    NEXT_PUBLIC_BASE_URL: z.url(),
})

const privateEnvSchema = z.object({
    GEOCODING_API_URL: z.url(),
    FORECAST_API_URL: z.url(),
})

const publicEnvSchemaResult = publicEnvSchema.safeParse(process.env)
const privateEnvSchemaResult = privateEnvSchema.safeParse(process.env)

if (!publicEnvSchemaResult.success || !privateEnvSchemaResult.success) {
    console.error("Env validation failed");

    if (!publicEnvSchemaResult.success) {
        console.error("Public env validation failed");
        console.error(publicEnvSchemaResult.error.issues);
    }

    if (!privateEnvSchemaResult.success) {
        console.error("Private env validation failed");
        console.error(privateEnvSchemaResult.error.issues);
    }

    // Exit the process if env validation fails
    process.exit(1);
}

export const env = {
    ...publicEnvSchemaResult.data,
    ...privateEnvSchemaResult.data,
}