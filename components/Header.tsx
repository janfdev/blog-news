"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SearchBox from "./SearchBox";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        background: isScrolled ? "rgba(255,255,255,0.8)" : "transparent"
      }}
    >
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold">
          <h1 className="md:text-2xl text-xl">aNews</h1>
        </Link>
        <div className="max-w-sm">
          <SearchBox />
        </div>
      </div>
    </header>
  );
}
