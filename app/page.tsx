import { use } from "react";
import Header from "@/components/Header";
import HeroSection from "./section/hero-section";
import BlogSection from "./section/news-section";
import Footer from "@/components/Footer";

type Params = Promise<Record<string, string>>; // atau Promise<{ slug: string }>
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default function Page(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const _params = use(props.params);
  const searchParams = use(props.searchParams);

  return (
    <section className="mx-auto">
      <Header />
      <HeroSection />
      <BlogSection heading="Latest News" searchParams={searchParams} />
      <Footer />
    </section>
  );
}
