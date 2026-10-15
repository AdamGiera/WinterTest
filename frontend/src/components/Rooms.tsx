import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Minus, Plus, Users } from "lucide-react";
import { useLang, type RoomId } from "@/lib/i18n";

export function Rooms({ onInquire }: { onInquire: (room: RoomId) => void }) {
  const { t } = useLang();
  const [calcRoom, setCalcRoom] = useState<RoomId>("single");
  const [nights, setNights] = useState(7);
  const selected = useMemo(
    () => t.rooms.list.find((r) => r.id === calcRoom) ?? t.rooms.list[0],
    [calcRoom, t]
  );

  function calcPrice(p: number,n: number,c: number){
    const pp: number = p/c 
    if(n > 28){
      return (pp-8)*c*n
    } else if (n > 7){
      return (pp-3)*c*n
    } else {
      return p*n
    }
  }

  //selected.price * nights

  const total = calcPrice(selected.price,nights,selected.cap);

  return (
    <section id="zimmer" className="mx-auto max-w-7xl px-5 py-24 sm:px-10 lg:px-10 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mb-14 max-w-2xl"
      >
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">{t.rooms.kicker}</p>
        <h2 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {t.rooms.title}
        </h2>
        <p className="mt-4 text-base text-muted-foreground md:text-lg">{t.rooms.sub}</p>
      </motion.div>

      <div className="mb-14 grid grid-cols-2 gap-4 sm:gap-6" data-testid="rooms-gallery">
        {[
          { src: "/images/zimmer_h.jpg", alt: "Mehrbettzimmer mit TV im Haus Winter" },
          { src: "/images/zimmer_i.jpg", alt: "Dachgeschosszimmer mit Holzbalken im Haus Winter" },
        ].map((img, i) => (
          <motion.figure
            key={img.src}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.12 }}
            className={`group relative overflow-hidden rounded-3xl ${i === 1 ? "sm:translate-y-8" : ""}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/35 to-transparent opacity-60" />
          </motion.figure>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {t.rooms.list.map((room, i) => (
          <motion.article
            key={room.id}
            data-testid={`room-card-${room.id}`}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            className="group flex flex-col rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-secondary-foreground">
                <Users className="h-3.5 w-3.5" />
                {t.rooms.persons(room.cap)}
              </span>
            </div>
            <h3 className="mt-5 font-heading text-2xl font-semibold text-foreground">{room.name}</h3>
            <p className="mt-2 flex items-baseline gap-2">
              <span className="font-mono text-4xl font-semibold text-primary">{room.price} €</span>
              <span className="text-sm text-muted-foreground">{t.rooms.perDay}</span>
            </p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{room.note}</p>
            <button
              data-testid={`room-inquire-${room.id}`}
              onClick={() => onInquire(room.id)}
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-foreground/15 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors group-hover:border-primary group-hover:text-primary"
            >
              {t.rooms.inquire}
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.article>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-[#1C1917] p-7 sm:p-9"
          data-testid="longstay-card"
        >
          <h3 className="font-heading text-xl font-semibold italic text-[#FAF7F2]">
            {t.rooms.longstayTitle}
          </h3>
          <div className="mt-6 space-y-4">
            {t.rooms.longstay.map((tier, i) => (
              <div
                key={tier.label}
                className="flex items-baseline justify-between gap-4 border-b border-[#292524] pb-4 last:border-0"
              >
                <span className="text-sm text-[#A8A29E]">{tier.label}</span>
                <span className="flex items-baseline gap-3">
                  {i > 0 && (
                    <span className="rounded-full bg-[#2D6A4F]/25 px-2.5 py-0.5 font-mono text-[11px] text-[#86b89c]">
                      −{i === 1 ? "11" : "29"} %
                    </span>
                  )}
                  <span className="font-mono text-2xl font-semibold text-[#FDBA74]">{tier.price}</span>
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-3xl border border-border bg-secondary p-7 sm:p-9"
          data-testid="rate-calculator"
        >
          <h3 className="font-heading text-xl font-semibold italic text-foreground">
            {t.rooms.calc.title}
          </h3>
          <div className="mt-5 flex flex-wrap gap-2">
            {t.rooms.list.map((room) => (
              <button
                key={room.id}
                data-testid={`calc-room-${room.id}`}
                onClick={() => setCalcRoom(room.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  calcRoom === room.id
                    ? "bg-primary text-primary-foreground"
                    : "border border-foreground/15 bg-card text-foreground hover:border-primary"
                }`}
              >
                {room.name}
              </button>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between gap-4">
            <span className="text-sm font-medium text-secondary-foreground">{t.rooms.calc.nights}</span>
            <div className="flex items-center gap-3">
              <button
                data-testid="calc-nights-minus"
                onClick={() => setNights((n) => Math.max(1, n - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 bg-card text-foreground transition-colors hover:border-primary"
                aria-label="minus"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-mono text-xl font-semibold" data-testid="calc-nights-value">
                {nights}
              </span>
              <button
                data-testid="calc-nights-plus"
                onClick={() => setNights((n) => Math.min(365, n + 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 bg-card text-foreground transition-colors hover:border-primary"
                aria-label="plus"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="mt-6 flex items-baseline justify-between border-t border-foreground/10 pt-5">
            <span className="text-sm text-secondary-foreground">{t.rooms.calc.total}</span>
            <span className="font-mono text-4xl font-semibold text-primary" data-testid="calc-total">
              {total.toLocaleString("de-DE")} €
            </span>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{t.rooms.calc.note}</p>
          <button
            data-testid="calc-inquire-button"
            onClick={() => onInquire(calcRoom)}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-[#a94d20]"
          >
            {t.rooms.calc.cta}
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
