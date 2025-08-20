import BlogSection from "./section/news-section";
import HeroSection from "./section/hero-section";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Params = { slug?: string };
type SearchParams = { [key: string]: string | string[] | undefined };

export default function Page({
  searchParams
}: {
  params: Params;
  searchParams: SearchParams;
}) {

  return (
    <section className="mx-auto">
      <Header />
      <HeroSection />
      <BlogSection heading="Latest News" searchParams={searchParams} />
      <Footer />
    </section>
  );
}
