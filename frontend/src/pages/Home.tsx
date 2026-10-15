import { useEffect, useState } from "react";
import Lenis from "lenis";
import { LangProvider } from "@/lib/i18n";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Rooms } from "@/components/Rooms";
import { Amenities } from "@/components/Amenities";
import { LocationSection } from "@/components/LocationSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  const [preselectedRoom, setPreselectedRoom] = useState<string | null>(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, anchors: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  const inquire = (room: string) => {
    setPreselectedRoom(room);
    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <LangProvider>
      <div className="min-h-screen bg-background text-foreground antialiased" data-testid="home-page">
        <div className="noise-overlay" />
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <Rooms onInquire={inquire} />
          <Amenities />
          <LocationSection />
          <ContactSection preselectedRoom={preselectedRoom} />
        </main>
        <Footer />
        <Toaster />
      </div>
    </LangProvider>
  );
}
