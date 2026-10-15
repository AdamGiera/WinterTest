import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";

function MaskedLine({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-1">
      <motion.span
        className="block"
        initial={{ y: "115%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const { t } = useLang();
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const lines = [t.hero.line1, t.hero.line2, t.hero.line3];

  return (
    <section id="top" className="relative grid min-h-screen bg-background lg:grid-cols-[1.05fr_1fr]">
      <div className="flex flex-col justify-center px-5 pb-16 pt-32 sm:px-10 lg:px-14 lg:pt-24 xl:pl-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-[#E5DEC9] bg-card px-4 py-2"
          data-testid="hero-badge"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2D6A4F] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2D6A4F]" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {t.hero.badge}
          </span>
        </motion.div>

        <h1 className="font-heading text-5xl font-semibold leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          {lines.map((line, i) => (
            <MaskedLine key={line} delay={0.3 + i * 0.14}>
              {i === 1 ? <em className="italic text-primary">{line}</em> : line}
            </MaskedLine>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-7 max-w-md whitespace-pre-line text-base text-muted-foreground md:text-lg"
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <button
            data-testid="hero-cta-inquire"
            onClick={() => document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" })}
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-[#a94d20] hover:shadow-lg hover:shadow-primary/25"
          >
            {t.hero.cta1}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            data-testid="hero-cta-prices"
            onClick={() => document.getElementById("zimmer")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {t.hero.cta2}
            <ArrowDown className="h-4 w-4" />
          </button>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-7"
          data-testid="hero-stats"
        >
          {t.hero.stats.map((s) => (
            <div key={s.l}>
              <dt className="sr-only">{s.l}</dt>
              <dd className="font-mono text-xl font-semibold text-foreground sm:text-2xl">{s.v}</dd>
              <dd className="mt-1 text-xs text-muted-foreground">{s.l}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <div ref={imgRef} className="relative min-h-[60vh] overflow-hidden lg:min-h-screen">
        <div className="absolute -left-16 top-1/4 z-10 h-72 w-72 rounded-full bg-primary/30 blur-[110px]" />
        <motion.div style={{ y }} className="absolute inset-0 scale-[1.16]">
          <img
            src="/images/haus.jpg"
            alt="Haus Winter von außen mit Terrasse"
            className="h-full w-full object-cover"
            data-testid="hero-image"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/55 via-transparent to-[#1C1917]/15" />
        <motion.div
          initial={{ opacity: 0, y: 24, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ duration: 0.8, delay: 1.15 }}
          className="absolute bottom-8 left-5 z-10 rounded-2xl border border-white/15 bg-[#1C1917]/70 px-6 py-4 backdrop-blur-md sm:left-8"
          data-testid="hero-rate-pill"
        >
          <p className="font-mono text-2xl font-semibold text-[#FDBA74]">{t.hero.ratePill}</p>
          <p className="mt-0.5 text-xs text-white/60">{t.hero.ratePillNote}</p>
        </motion.div>
      </div>
    </section>
  );
}
