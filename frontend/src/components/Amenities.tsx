import { motion } from "motion/react";
import {
  Armchair,
  Bath,
  Car,
  Flame,
  Sparkles,
  Sun,
  Tv,
  UtensilsCrossed,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { useLang } from "@/lib/i18n";

const ICONS: Record<string, LucideIcon> = {
  kitchen: UtensilsCrossed,
  bathrooms: Bath,
  tv: Tv,
  wlan: Wifi,
  lounge: Armchair,
  parking: Car,
  rooftop: Sun,
  garden: Flame,
  standard: Sparkles,
};

const IMAGES: Record<string, string> = {
  kitchen: "/images/kueche.jpg",
  bathrooms: "/images/bad.jpg",
  lounge: "/images/wohnzimmer.jpg",
  tv: "/images/schlafzimmer.jpg",
  garden: "/images/aufenthaltsraum.jpg",
};

export function Amenities() {
  const { t } = useLang();
  const items = t.amenities.items;

  const photoTile = (item: (typeof items)[number], extra: string) => (
    <motion.div
      key={item.id}
      data-testid={`amenity-${item.id}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className={`group relative overflow-hidden rounded-3xl ${extra}`}
    >
      <img
        src={IMAGES[item.id]}
        alt={item.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/80 via-[#1C1917]/20 to-transparent" />
      <div className="absolute bottom-0 p-6">
        <h3 className="font-heading text-xl font-semibold text-[#FAF7F2]">{item.title}</h3>
        <p className="mt-1 text-sm text-white/70">{item.desc}</p>
      </div>
    </motion.div>
  );

  const textTile = (item: (typeof items)[number], i: number, extra = "") => {
    const Icon = ICONS[item.id] ?? Sparkles;
    return (
      <motion.div
        key={item.id}
        data-testid={`amenity-${item.id}`}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, delay: i * 0.06 }}
        className={`flex flex-col justify-between rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 ${extra}`}
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <div className="mt-2">
          <h3 className="font-heading text-lg font-semibold text-foreground">{item.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="ausstattung" className="bg-secondary/60 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-10 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-14 max-w-2xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
            {t.amenities.kicker}
          </p>
          <h2 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {t.amenities.title}
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">{t.amenities.sub}</p>
        </motion.div>

        <div className="grid auto-rows-[190px] grid-cols-2 gap-4 lg:grid-cols-4">
          {photoTile(items[0], "col-span-2 row-span-2")}
          {photoTile(items[2], "")}
          {textTile(items[3], 2)}
          {photoTile(items[1], "col-span-2 row-span-2")}
          {photoTile(items[4], "col-span-2 row-span-2")}
          {textTile(items[5], 3)}
          {textTile(items[6], 4)}
          {photoTile(items[7], "col-span-2")}
          {textTile(items[8], 6, "col-span-2")}
        </div>
      </div>
    </section>
  );
}
