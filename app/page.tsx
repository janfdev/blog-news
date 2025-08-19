import Navbar from "./components/Header";
import BlogSection from "./section/blog-section";
import HeroSection from "./section/hero-section";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <section className="mx-auto">
      <Navbar />
      <HeroSection />
      <BlogSection />
      <Footer/>
    </section>
  );
}
