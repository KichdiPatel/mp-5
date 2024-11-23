"use server";
import getCollection, { URLS_COLLECTION } from "@/db";
import { ShortenedUrlProps } from "@/types";

export default async function createShortenedUrl(
  alias: string,
  url: string
): Promise<ShortenedUrlProps | null> {
  const collection = await getCollection(URLS_COLLECTION);

  // Validate URL: Ensure it starts with http:// or https://
  const urlRegex = /^(http|https):\/\/[^ "]+$/;
  if (!urlRegex.test(url)) {
    throw new Error(
      "Invalid URL format. URL must start with http:// or https://."
    );
  }

  const existingEntry = await collection.findOne({ alias });
  if (existingEntry) {
    throw new Error("Alias is already in use");
  }

  const newEntry = { alias, url };
  const result = await collection.insertOne(newEntry);

  if (!result.acknowledged) {
    return null;
  }

  return {
    alias,
    url,
  };
}
