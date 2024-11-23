"use server";

import { redirect } from "next/navigation";
import getSiteByAlias from "@/lib/getSiteByAlias";

export default async function FullPostPage({
  params,
}: {
  params: Promise<{ alias: string }>;
}) {
  const { alias } = await params;

  const site = await getSiteByAlias(alias);

  if (site === null) {
    return <p>alias not found</p>;
  }

  redirect(site.url);
}
