import BlogSection from "./section/news-section";
import HeroSection from "./section/hero-section";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type SP = Record<string, string | string[]> | undefined;

export default function Home({ searchParams }: { searchParams: SP }) {
  return (
    <section className="mx-auto">
      <Header />
      <HeroSection />
      <BlogSection heading="Latest News" searchParams={searchParams} />
      <Footer />
    </section>
  );
}
