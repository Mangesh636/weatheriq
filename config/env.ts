import {z} from "zod"

const publicEnvSchema = z.object({
    NEXT_PUBLIC_BASE_URL: z.url(),
})

const publicEnvSchemaResult = publicEnvSchema.safeParse(process.env)

if (!publicEnvSchemaResult.success) {
    console.error("Env validation failed");

    if(!publicEnvSchemaResult.success) {
        console.error("Public env validation failed");
        console.error(publicEnvSchemaResult.error.issues);
    }
}