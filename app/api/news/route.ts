export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getNews } from "@/lib/news/service";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q") ?? "";
  const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1", 10));
  const limit = Math.min(
    50,
    Math.max(1, parseInt(url.searchParams.get("limit") ?? "12", 10))
  );
  const sources = url.searchParams.getAll("source");
  const src = sources.length ? sources : undefined;

  const data = await getNews({ q, page, limit, sources: src });
  return NextResponse.json(data, { headers: { "cache-control": "no-store" } });
}
