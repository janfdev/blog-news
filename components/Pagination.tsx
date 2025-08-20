// components/Pagination.tsx
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function Pagination({
  current,
  limit,
  total
}: {
  current: number;
  limit: number;
  total: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const pages = Math.max(1, Math.ceil(total / limit));
  if (pages <= 1) return null;

  const goto = (p: number) => {
    const next = new URLSearchParams();
    const q = params.get("q") ?? "";
    if (q.trim()) next.set("q", q.trim());
    next.set("page", String(p));
    next.set("limit", params.get("limit") ?? String(limit));
    params.getAll("source").forEach((s) => next.append("source", s));

    router.replace(`${pathname}?${next.toString()}`);
  };

  return (
    <nav className="flex items-center gap-2">
      <button
        className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
        onClick={() => goto(Math.max(1, current - 1))}
        disabled={current <= 1}
        type="button"
      >
        Prev
      </button>

      <span className="text-sm">
        Page {current} / {pages}
      </span>

      <button
        className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
        onClick={() => goto(Math.min(pages, current + 1))}
        disabled={current >= pages}
        type="button"
      >
        Next
      </button>
    </nav>
  );
}
