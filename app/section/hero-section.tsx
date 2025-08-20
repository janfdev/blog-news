import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="pt-20 md:pt-36">
      <div className="mx-auto flex max-w-5xl flex-col items-center">
        <div className="z-10 flex flex-col items-center gap-6 text-center">
          <div className="flex w-50 items-center space-x-2 group rounded-full bg-primary/20 px-2 py-1 ring-1 ring-accent whitespace-pre">
            <span className="w-fit rounded-full bg-primary px-2 py-0.5 text-center text-xs font-medium text-primary-foreground sm:text-sm">
              📣 New
            </span>
            <p className="text-xs flex items-center font-medium text-primary sm:text-sm gap-2">
              <span>Launch News</span>
              <ArrowRight className="w-4 h-4 transition-all group-hover:translate-x-1" />
            </p>
          </div>
          <div>
            <h1 className="mb-6 font-bold text-4xl md:text-7xl tracking-tighter">
              Latest News: The World at Your Fingertips
            </h1>
            <p className="text-muted-foreground lg:text-xl">
              Sajikan informasi paling relevan dan terpercaya, langsung dari
              sumber-sumber kredibel. Jangan lewatkan setiap perkembangan
              penting di seluruh dunia.
            </p>
          </div>
          <div className="mt-4 flex justify-center gap-2">
            <Link href={"#news"}>
              <Button className="text-md px-4 py-3">
                Let&apos;s find the news.
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
