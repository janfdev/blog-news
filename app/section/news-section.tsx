export const dynamic = "force-dynamic";

import { getNews } from "@/lib/news/service";
import NewsList from "@/components/NewsList";

interface BlogProps {
  heading?: string;
  searchParams?: Record<string, string | string[]>;
}

export default async function BlogSection({
  heading = "Latest News",
  searchParams
}: BlogProps) {
  const q = typeof searchParams?.q === "string" ? searchParams.q : "";
  const page = Number.parseInt((searchParams?.page as string) ?? "1", 10);
  const limit = Number.parseInt((searchParams?.limit as string) ?? "12", 10);
  const sources = Array.isArray(searchParams?.source)
    ? (searchParams?.source as string[])
    : searchParams?.source
    ? [searchParams?.source as string]
    : [];

  // data awal (SSR)
  const initialData = await getNews({
    q,
    page,
    limit,
    sources: sources.length ? sources : undefined
  });

  // url refetch di client
  const qs = new URLSearchParams();
  if (q) qs.set("q", q);
  qs.set("page", String(page));
  qs.set("limit", String(limit));
  sources.forEach((s) => qs.append("source", s));
  const apiPath = `/api/news?${qs.toString()}`;

  return (
    <section className="mx-auto max-w-6xl md:space-y-6 mt-10" id="news">
      <h2 className="text-2xl ml-3 font-semibold">{heading}</h2>
      <NewsList url={apiPath} initialData={initialData} />
    </section>
  );
}
