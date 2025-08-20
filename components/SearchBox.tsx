"use client";

import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [q, setQ] = useState(params.get("q") ?? "");
  useEffect(() => setQ(params.get("q") ?? ""), [params]);

  const handleSearch = () => {
    const next = new URLSearchParams();
    if (q.trim()) next.set("q", q.trim());
    next.set("page", "1");
    next.set("limit", params.get("limit") ?? "12");
    params.getAll("source").forEach((s) => next.append("source", s));
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  const handleClear = () => {
    setQ("");
    const next = new URLSearchParams();
    next.set("page", "1");
    next.set("limit", params.get("limit") ?? "12");
    params.getAll("source").forEach((s) => next.append("source", s));
    router.replace(`${pathname}?${next.toString()}`, { scroll: false });
  };

  return (
    <div className="border rounded flex items-center">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="Cari berita AI…"
        className="flex-1 px-3 py-2 outline-none"
      />
      {q && (
        <button
          className="px-2 text-gray-500 hover:text-black"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
      <button
        className="px-3 cursor-pointer text-gray-600 hover:text-black"
        onClick={handleSearch}
        aria-label="Search"
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
}
