import { sourcesData, type NewsItem } from "./source";
import { dedupeByUrl, fetchWithTimeout, safeIso } from "@/lib/news/utils";

export type GetNewsParams = {
  q?: string;
  sources?: string[];
  page?: number;
  limit?: number;
};

export async function getNews({
  q = "",
  sources = [],
  page = 1,
  limit = 12
}: GetNewsParams) {
  const tasks = sourcesData.map(async (S) => {
    if (sources.length && !sources.includes(S.display)) return [] as NewsItem[];
    try {
      const url = S.buildUrl(q);
      const baseInit =
        typeof S.requestInit === "function" ? S.requestInit() : S.requestInit;
      const res = await fetchWithTimeout(
        url,
        { ...baseInit, cache: "no-store" },
        10000
      );
      if (!res.ok) throw new Error(`${S.id} ${res.status}`);

      const list = S.extractList(await res.json());
      return list
        .map(S.normalize)
        .filter((n): n is NewsItem => !!n)
        .map((n) => ({
          ...n,
          url: (n.url ?? "").trim(),
          publishedAt: safeIso(n.publishedAt)
        }))
        .filter((n) => n.url);
    } catch {
      return [] as NewsItem[];
    }
  });

  const merged = (await Promise.allSettled(tasks)).flatMap((r) =>
    r.status === "fulfilled" ? r.value : []
  );
  const searched = q
    ? merged.filter(({ title, summary }) =>
        `${title} ${summary}`.toLowerCase().includes(q.toLowerCase())
      )
    : merged;
  const unique = dedupeByUrl(searched).sort(
    (a, b) =>
      (Date.parse(b.publishedAt ?? "") || 0) -
      (Date.parse(a.publishedAt ?? "") || 0)
  );

  const total = unique.length;
  const start = (page - 1) * limit;
  const items = unique.slice(start, start + limit);
  return { page, limit, total, items };
}
