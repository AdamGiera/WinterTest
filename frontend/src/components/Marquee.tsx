import { Sparkle } from "lucide-react";
import { useLang } from "@/lib/i18n";

export function Marquee() {
  const { t } = useLang();
  const items = [...t.marquee, ...t.marquee];
  return (
    <div
      className="relative overflow-hidden border-y border-[#a94d20] bg-primary py-4"
      data-testid="marquee-band"
      aria-hidden="true"
    >
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-heading text-lg italic text-primary-foreground">{item}</span>
            <Sparkle className="h-3.5 w-3.5 text-[#FDBA74]" fill="currentColor" />
          </span>
        ))}
      </div>
    </div>
  );
}
