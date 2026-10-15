import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#zimmer", label: t.nav.rooms, id: "rooms" },
    { href: "#ausstattung", label: t.nav.amenities, id: "amenities" },
    { href: "#lage", label: t.nav.location, id: "location" },
    { href: "#kontakt", label: t.nav.contact, id: "contact" },
  ];

  const LangToggle = () => (
    <div
      className="flex items-center rounded-full border border-border bg-card p-1"
      data-testid="lang-toggle"
    >
      {(["de", "en"] as Lang[]).map((l) => (
        <button
          key={l}
          data-testid={`lang-toggle-${l}`}
          onClick={() => setLang(l)}
          className={`rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-widest transition-colors ${
            lang === l
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#E5DEC9]/80 bg-[#FAF7F2]/85 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-4 lg:px-10">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex" data-testid="nav-desktop">
          {links.map((l) => (
            <a
              key={l.id}
              href={l.href}
              data-testid={`nav-link-${l.id}`}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <LangToggle />
          <Button
            data-testid="nav-cta"
            className="rounded-full bg-primary px-5 text-primary-foreground hover:bg-[#a94d20]"
            onClick={() =>
              document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {t.nav.cta}
          </Button>
        </div>
        <button
          data-testid="mobile-menu-button"
          className="rounded-md p-2 text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-border bg-[#FAF7F2] lg:hidden"
            data-testid="mobile-menu"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {links.map((l) => (
                <a
                  key={l.id}
                  href={l.href}
                  data-testid={`mobile-nav-link-${l.id}`}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-secondary"
                >
                  {l.label}
                </a>
              ))}
              <div className="flex items-center justify-between px-3 pt-3">
                <LangToggle />
                <Button
                  data-testid="mobile-nav-cta"
                  className="rounded-full bg-primary text-primary-foreground hover:bg-[#a94d20]"
                  onClick={() => {
                    setOpen(false);
                    document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {t.nav.cta}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
