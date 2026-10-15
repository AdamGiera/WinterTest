import { Mail, Phone } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { LogoMark } from "@/components/Logo";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-[#292524] bg-[#1C1917] pb-10 pt-16 text-[#FAF7F2]">
      <div className="mx-auto max-w-7xl px-5 sm:px-10 lg:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark className="h-10 w-10" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#A8A29E]">
                Kuppenstraße 38 · 36275 Kirchheim
              </span>
            </div>
            <p className="mt-8 font-heading text-[13vw] font-semibold leading-none tracking-tight text-outline sm:text-7xl lg:text-8xl" data-testid="footer-wordmark">
              HAUS WINTER
            </p>
            <p className="mt-4 max-w-md text-sm text-[#A8A29E]">{t.footer.tagline}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                data-testid="footer-email-link"
                href="mailto:joscho-winter@gmx.de"
                className="inline-flex items-center gap-2 rounded-full border border-[#44403c] px-5 py-2.5 text-sm font-medium text-[#FAF7F2] transition-colors hover:border-[#F97316] hover:text-[#FDBA74]"
              >
                <Mail className="h-4 w-4" />
                joscho-winter@gmx.de
              </a>
              <a
                data-testid="footer-phone-link"
                href="tel:+4917624368486"
                className="inline-flex items-center gap-2 rounded-full border border-[#44403c] px-5 py-2.5 text-sm font-medium text-[#FAF7F2] transition-colors hover:border-[#F97316] hover:text-[#FDBA74]"
              >
                <Phone className="h-4 w-4" />
                +49 176 24368486
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-[#292524] pt-6 text-xs text-[#A8A29E] sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Joscho Winter · Kirchheim</span>
          <span>{t.footer.rights}</span>
        </div>
      </div>
    </footer>
  );
}
