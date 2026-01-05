import { CitySchema } from "@/schemas/geocoding";
import { z } from "zod";

// Open or create the IndexedDB database
export const getDB = (): Promise<IDBDatabase> =>
    new Promise((resolve, reject) => {
        const request = indexedDB.open("weatheriq-db", 1);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains("recent-searches")) {
                db.createObjectStore("recent-searches", { keyPath: "id" });
            }
        };

        request.onsuccess = (event) =>
            resolve((event.target as IDBOpenDBRequest).result);
        request.onerror = (event) =>
            reject((event.target as IDBOpenDBRequest).error);
    });

// Get all recent searches from IndexedDB
export const getRecentSearches = async (): Promise<
    z.infer<typeof CitySchema>[]
> => {
    const db = await getDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction("recent-searches", "readonly");
        const store = tx.objectStore("recent-searches");
        const request = store.getAll();

        request.onsuccess = () =>
            resolve(request.result as z.infer<typeof CitySchema>[]);
        request.onerror = () => reject("Failed to fetch recent searches");
    });
};

// Save recent searches to IndexedDB
export const saveRecentSearches = async (
    cities: z.infer<typeof CitySchema>[]
): Promise<void> => {
    const db = await getDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction("recent-searches", "readwrite");
        const store = tx.objectStore("recent-searches");
        store.clear(); // remove old entries
        cities.forEach((c) => store.put(c));

        tx.oncomplete = () => resolve();
        tx.onerror = () => reject("Failed to save recent searches");
    });
};
