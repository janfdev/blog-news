// components/NewsList.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Pagination } from "./Pagination";
import { Card } from "./ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Loading from "@/components/loading";

type Item = {
  id: string;
  source: string;
  title: string;
  summary: string;
  url: string;
  publishedAt: string | null;
  imageUrl: string | null;
};

type Payload = { items: Item[]; total: number; page: number; limit: number };

export default function NewsList({
  url,
  initialData
}: {
  url: string;
  initialData: Payload;
}) {
  const [data, setData] = useState<Payload>(initialData);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, { cache: "no-store", signal: ac.signal });
        if (!res.ok) throw new Error("Failed");
        setData(await res.json());
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => ac.abort();
  }, [url]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-2">
      {loading && <div className="text-sm text-gray-500">Updating…</div>}
      {data.items.map((it) => {
        const iso = it.publishedAt ?? "";
        const human = iso
          ? new Date(iso).toLocaleString("id-ID", {
              dateStyle: "medium",
              timeStyle: "short"
            })
          : "Unknown date";

        return (
          <Card key={it.id} className="border-0 shadow-none px-5">
            <div className="flex md:flex-row flex-col-reverse md:gap-7 gap-5 ">
              <div className="md:w-1/2 w-full">
                <h3 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                  <Link
                    href={it.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {it.title}
                  </Link>
                </h3>

                <p className="mt-4 text-muted-foreground md:mt-5 line-clamp-3">
                  {it.summary}
                </p>

                <div className="mt-6 flex items-center space-x-4 text-sm md:mt-8">
                  <span className="text-muted-foreground">{it.source}</span>
                  <span className="text-muted-foreground">•</span>
                  <time dateTime={iso}>{human}</time>
                </div>

                <div className="mt-6 flex items-center space-x-2 md:mt-8">
                  <Link
                    href={it.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center font-semibold hover:underline md:text-base"
                  >
                    <span>Read more</span>
                    <ArrowRight className="ml-2 size-4 transition-transform" />
                  </Link>
                </div>
              </div>

              <div className="md:w-1/2 w-full">
                <Link
                  href={it.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="w-full overflow-hidden rounded-lg border border-border aspect-auto md:aspect-[16/9]">
                    {it.imageUrl ? (
                      <img
                        src={it.imageUrl}
                        alt={it.title}
                        loading="lazy"
                        className="w-full h-auto md:h-full object-cover"
                      />
                    ) : (
                      <div className="flex h-40 md:h-full w-full items-center justify-center text-sm text-muted-foreground">
                        No Image
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            </div>
          </Card>
        );
      })}
      ;
      <Pagination current={data.page} limit={data.limit} total={data.total} />
    </div>
  );
}
