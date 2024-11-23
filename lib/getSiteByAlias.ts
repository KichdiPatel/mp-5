import getCollection, { URLS_COLLECTION } from "@/db";
import { ShortenedUrlProps } from "@/types";

export default async function getSiteByAlias(
  alias: string
): Promise<ShortenedUrlProps | null> {
  const urlCollection = await getCollection(URLS_COLLECTION);
  const data = await urlCollection.findOne({ alias: alias });

  if (data === null) {
    return null;
  }

  const post = {
    alias: data.alias,
    url: data.url,
  };

  return post;
}
