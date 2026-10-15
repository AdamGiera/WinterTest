import { motion } from "motion/react";
import { MapPin, Navigation } from "lucide-react";
import { useLang } from "@/lib/i18n";

export function LocationSection() {
  const { t } = useLang();
  return (
    <section id="lage" className="bg-[#1C1917] py-24 text-[#FAF7F2] lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-10 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-2xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#F97316]">
            {t.location.kicker}
          </p>
          <h2 className="mt-3 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            {t.location.title}
          </h2>
          <p className="mt-4 text-base text-[#A8A29E] md:text-lg">{t.location.sub}</p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-0">
            {t.location.items.map((item, i) => (
              <motion.div
                key={item.t}
                data-testid={`location-item-${i}`}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="flex items-center gap-6 border-b border-[#292524] py-7 first:pt-0 last:border-0 sm:gap-10"
              >
                <span className="w-28 shrink-0 font-mono text-3xl font-semibold text-[#FDBA74] sm:text-4xl">
                  {item.d}
                </span>
                <div>
                  <h3 className="font-heading text-xl font-semibold">{item.t}</h3>
                  <p className="mt-1 text-sm text-[#A8A29E]">{item.s}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex h-fit flex-col rounded-3xl border border-[#292524] bg-[#292524]/50 p-8"
            data-testid="address-card"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <MapPin className="h-5 w-5" />
            </span>
            <h3 className="mt-6 font-mono text-xs uppercase tracking-[0.25em] text-[#A8A29E]">
              {t.location.addressTitle}
            </h3>
            <p className="mt-3 font-heading text-2xl font-semibold leading-snug">
              Haus Winter
              <br />
              Kuppenstraße 38
              <br />
              36275 Kirchheim
            </p>
            <p className="mt-4 text-sm text-[#A8A29E]">{t.location.host}</p>
            <a
              data-testid="maps-link"
              href="https://www.google.com/maps/search/?api=1&query=Kuppenstra%C3%9Fe+38%2C+36275+Kirchheim"
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-[#a94d20]"
            >
              {t.location.maps}
              <Navigation className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
