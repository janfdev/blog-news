import { X } from "lucide-react";
export type NewsItem = {
  id: string;
  source: string;
  title: string;
  summary: string;
  url: string;
  publishedAt: string | null;
  imageUrl: string;
};

// Adapter function to convert API response to NewsItem
export type Source = {
  id: "A" | "B" | "C" | "D";
  display: string;
  buildUrl: (q: string, from?: string, to?: string) => string;
  requestInit?: RequestInit | (() => RequestInit);
  extractList: (data: any) => any[];
  normalize: (raw: any) => NewsItem | null;
};

const A_KEY = process.env.API_KEY1;
const B_KEY = process.env.API_KEY2;
const C_KEY = process.env.API_KEY3;
const D_KEY = process.env.API_KEY4;

export const sourcesData: Source[] = [
  // A
  {
    id: "A",
    display: "Source A",
    buildUrl: (q) =>
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}`,
    requestInit: () => ({
      headers: {
        "X-API-Key": A_KEY || ""
      },
      cache: "no-store"
    }),
    extractList: (data) => (Array.isArray(data?.articles) ? data.articles : []),
    normalize: (x) => ({
      id: `A-${x.id ?? x.url}`,
      source: x.source?.name ?? "Unknown Publisher",
      title: x.title ?? "",
      summary: x.description ?? "",
      url: x.url ?? "",
      publishedAt: x.publishedAt ?? x.publishedAt ?? null,
      imageUrl: x.image ?? x.urlToImage ?? null
    })
  },
  // B
  {
    id: "B",
    display: "Source B",
    buildUrl: (q) =>
      `https://newsdata.io/api/1/latest?q=${encodeURIComponent(
        q
      )}&apikey=${B_KEY}`,
    extractList: (data) => (Array.isArray(data?.results) ? data.results : []),
    normalize: (x) => ({
      id: `B-${x.article_id ?? x.link}`,
      source: x.creator[0] ?? "Unknown Publisher",
      title: x.title ?? "",
      summary: x.description ?? "",
      url: x.url ?? x.link ?? "",
      publishedAt: x.pubDate,
      imageUrl: x.image_url
    })
  },
  // C
  {
    id: "C",
    display: "Source C",
    buildUrl: (q) =>
      `https://dataapi.pavuk.ai/api/v1/data?startDateTime=1754999182&endDateTime=1755603982&mediaType=News&query=${encodeURIComponent(
        q
      )}`,
    requestInit: () => ({
      headers: {
        Authorization: `Bearer ${C_KEY}`
      },
      cache: "no-store"
    }),
    extractList: (data) => (Array.isArray(data?.data) ? data.data : []),
    normalize: (x) => ({
      id: `C-${x.id}`,
      source: x.source ?? x.authorName,
      title: x.title ?? "",
      summary: x.fullText,
      url: x.url ?? "",
      publishedAt: x.pubTime,
      imageUrl: Array.isArray(x.imageUrls) ? x.imageUrls[0] : null
    })
  },
  // D
  {
    id: "D",
    display: "Source D",
    buildUrl: (q) =>
      `https://gnews.io/api/v4/search?q=${encodeURIComponent(
        q
      )}&lang=en&apikey=${D_KEY}`,
    extractList: (data) => (Array.isArray(data?.articles) ? data.articles : []),
    normalize: (x) => ({
      id: `D-${x.id}`,
      source: x.source.name ?? "Unknown Publisher",
      title: x.title ?? "",
      summary: x.description ?? "",
      url: x.source.url,
      publishedAt: x.publishedAt ?? null,
      imageUrl: x.image ?? null
    })
  }
];
