import { About } from "@/components/About";
import { Approach } from "@/components/Approach";
import { Capabilities } from "@/components/Capabilities";
import { Contact } from "@/components/Contact";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WhyMonokeras } from "@/components/WhyMonokeras";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <Capabilities />
        <Approach />
        <WhyMonokeras />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
