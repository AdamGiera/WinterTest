import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { HeartHandshake, Mail, Phone, Send } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { apiPost } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface InquiryResponse {
  status: string;
  id: string;
}

export function ContactSection({ preselectedRoom }: { preselectedRoom: string | null }) {
  const { t } = useLang();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [room, setRoom] = useState("any");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [guests, setGuests] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (preselectedRoom) setRoom(preselectedRoom);
  }, [preselectedRoom]);

  const mutation = useMutation({
    mutationFn: (body: Record<string, unknown>) => apiPost<InquiryResponse>("/inquiries", body),
    onSuccess: () => {
      toast.success(t.contact.successTitle, { description: t.contact.successBody });
      setName(""); setEmail(""); setPhone(""); setRoom("any");
      setDateFrom(""); setDateTo(""); setGuests(""); setMessage("");
    },
    onError: () => {
      toast.error(t.contact.errorTitle, { description: t.contact.errorBody });
    },
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      name, email,
      phone: phone || undefined,
      room,
      date_from: dateFrom || undefined,
      date_to: dateTo || undefined,
      guests: guests ? Number(guests) : undefined,
      message,
    });
  };

  return (
    <section id="kontakt" className="mx-auto max-w-7xl px-5 py-24 sm:px-10 lg:px-10 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
            {t.contact.kicker}
          </p>
          <h2 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {t.contact.title}
          </h2>
          <p className="mt-4 max-w-lg text-base text-muted-foreground md:text-lg">{t.contact.sub}</p>

          <form onSubmit={submit} className="mt-10 grid gap-5 sm:grid-cols-2" data-testid="contact-form">
            <div className="space-y-2">
              <Label htmlFor="contact-name">{t.contact.name} *</Label>
              <Input
                id="contact-name"
                data-testid="contact-name-input"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.contact.namePh}
                className="h-12 rounded-xl bg-card"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">{t.contact.email} *</Label>
              <Input
                id="contact-email"
                data-testid="contact-email-input"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.contact.emailPh}
                className="h-12 rounded-xl bg-card"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-phone">{t.contact.phone}</Label>
              <Input
                id="contact-phone"
                data-testid="contact-phone-input"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t.contact.phonePh}
                className="h-12 rounded-xl bg-card"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-room">{t.contact.room}</Label>
              <select
                id="contact-room"
                data-testid="contact-room-select"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="h-12 w-full rounded-xl border border-input bg-card px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {(["any", "single", "double", "triple"] as const).map((r) => (
                  <option key={r} value={r}>
                    {t.contact.roomOptions[r]}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-from">{t.contact.from}</Label>
              <Input
                id="contact-from"
                data-testid="contact-date-from"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="h-12 rounded-xl bg-card"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-to">{t.contact.to}</Label>
              <Input
                id="contact-to"
                data-testid="contact-date-to"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="h-12 rounded-xl bg-card"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="contact-guests">{t.contact.guests}</Label>
              <Input
                id="contact-guests"
                data-testid="contact-guests-input"
                type="number"
                min={1}
                max={20}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="h-12 rounded-xl bg-card sm:max-w-[200px]"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="contact-message">{t.contact.message} *</Label>
              <Textarea
                id="contact-message"
                data-testid="contact-message-input"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.contact.messagePh}
                rows={5}
                className="rounded-xl bg-card"
              />
            </div>
            <div className="sm:col-span-2">
              <Button
                type="submit"
                data-testid="contact-submit-button"
                disabled={mutation.isPending}
                className="h-12 rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-[#a94d20] disabled:opacity-60"
              >
                {mutation.isPending ? t.contact.sending : t.contact.submit}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex h-fit flex-col gap-5 lg:sticky lg:top-28"
        >
          <div className="rounded-3xl bg-[#1C1917] p-8" data-testid="contact-info-card">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <HeartHandshake className="h-5 w-5" />
            </span>
            <h3 className="mt-6 font-heading text-2xl font-semibold text-[#FAF7F2]">
              {t.contact.infoTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#A8A29E]">{t.contact.infoBody}</p>
            <div className="mt-7 border-t border-[#292524] pt-6">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#A8A29E]">Haus Winter</p>
              <p className="mt-2 font-heading text-lg font-semibold text-[#FAF7F2]">
                {t.contact.address}
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                data-testid="contact-phone-link"
                href="tel:+4917624368486"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-[#a94d20]"
              >
                <Phone className="h-4 w-4" />
                +49 176 24368486
              </a>
              <a
                data-testid="contact-email-link"
                href="mailto:joscho-winter@gmx.de"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#44403c] px-5 py-3 text-sm font-semibold text-[#FAF7F2] transition-colors hover:border-[#F97316] hover:text-[#FDBA74]"
              >
                <Mail className="h-4 w-4" />
                joscho-winter@gmx.de
              </a>
            </div>
          </div>
          <div
            className="overflow-hidden rounded-3xl border border-border"
            data-testid="contact-minimap"
          >
            <iframe
              title="Karte: Haus Winter, Kuppenstraße 38, 36275 Kirchheim"
              src="https://www.google.com/maps?q=Kuppenstra%C3%9Fe%2038%2C%2036275%20Kirchheim&z=15&output=embed"
              className="h-56 w-full"
              loading="lazy"
            />
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
