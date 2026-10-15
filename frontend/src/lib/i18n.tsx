import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "de" | "en";
export type RoomId = "single" | "double" | "triple";
interface RoomEntry { id: RoomId; name: string; price: number; cap: number; note: string }

const de = {
  nav: {
    rooms: "Zimmer & Preise",
    amenities: "Ausstattung",
    location: "Lage",
    contact: "Kontakt",
    cta: "Zimmer anfragen",
  },
  hero: {
    badge: "Freie Zimmer · Gehobene Klasse",
    line1: "Monteur und",
    line2: "Tages Wohnung",
    line3: "mit Ruhe.",
    sub: "Tages Übernachtung Winter.\nUnkompliziert, großräumig, preiswert.\nEgal ob als Monteur's Wohnung oder für ihren kurz Trip, wir haben was sie suchen.",
    cta1: "Zimmer anfragen",
    cta2: "Preise entdecken",
    ratePill: "ab 20 € / Tag",
    ratePillNote: "bei Monatsaufenthalt",
    stats: [
      { v: "ab 20 €", l: "pro Tag & Person" },
      { v: "200 m", l: "zur Autobahn" },
      { v: "4", l: "Badezimmer" },
    ],
  },
  marquee: [
    "200 m zur Autobahn",
    "TV in jedem Zimmer",
    "4 Badezimmer",
    "Dachterrasse & Grillplatz",
    "Große Küche",
    "Eigene Stellplätze",
    "Highspeed-WLAN",
    "Gehobene Klasse",
  ],
  rooms: {
    kicker: "Zimmer & Preise",
    title: "Fair kalkuliert. Ehrlich gut.",
    sub: "Alle Preise pro Tag inklusive WLAN, TV, Bettwäsche und Nutzung aller Gemeinschaftsräume.",
    perDay: "pro Tag",
    persons: (n: number) => (n === 1 ? "1 Person" : `${n} Personen`),
    inquire: "Direkt anfragen",
    list: ([
      {
        id: "single",
        name: "Einzelzimmer",
        price: 28,
        cap: 1,
        note: "Ihr ruhiger Rückzugsort nach der Schicht",
      },
      {
        id: "double",
        name: "Doppelzimmer",
        price: 52,
        cap: 2,
        note: "26 € pro Person — ideal für Kollegen",
      },
      {
        id: "triple",
        name: "Dreibettzimmer",
        price: 63,
        cap: 3,
        note: "Nur 21 € pro Person — für das ganze Team",
      },
    ]) as RoomEntry[],
    longstayTitle: "Langzeit-Rabatt pro Person",
    longstay: [
      { label: "Tagespreis", price: "28 €" },
      { label: "ab 1 Woche", price: "25 €" },
      { label: "ab 1 Monat", price: "20 €" },
    ],
    calc: {
      title: "Preisrechner",
      room: "Zimmer",
      nights: "Nächte",
      total: "Gesamt",
      note: "Richtwert zum Tagespreis. Ab einer Woche bzw. einem Monat gelten die ermäßigten Personensätze von 25 € / 20 € pro Tag — fragen Sie einfach an.",
      cta: "Zimmer anfragen",
    },
  },
  amenities: {
    kicker: "Ausstattung",
    title: "Alles da. Alles drin.",
    sub: "Gehobene Klasse heißt bei uns: kein Morgen-Stau im Bad, eine Küche wie zu Hause und Platz zum Abschalten.",
    items: [
      { id: "kitchen", title: "Große Küche", desc: "Voll ausgestattet mit Herd, Backofen und Spülmaschine" },
      { id: "bathrooms", title: "4 Badezimmer", desc: "Kein Warten am Morgen — vier Bäder im Haus" },
      { id: "tv", title: "TV in jedem Zimmer", desc: "Eigener Fernseher für ungestörte Feierabende" },
      { id: "wlan", title: "WLAN im ganzen Haus", desc: "Schnelles Internet in allen Zimmern und Terrassen" },
      { id: "lounge", title: "Aufenthaltsraum", desc: "Großzügiger Gemeinschaftsraum mit Sofalandschaft" },
      { id: "parking", title: "Eigene Stellplätze", desc: "PKW und Transporter parken direkt am Haus" },
      { id: "rooftop", title: "Dachterrasse", desc: "Weitblick über Kirchheim zum Feierabend" },
      { id: "garden", title: "Gartenterrasse & Grillplatz", desc: "Sitzplätze und Grill für sonnige Abende" },
      { id: "standard", title: "Gehobene Klasse", desc: "Gepflegt, sauber und mit persönlichem Ansprechpartner" },
    ],
  },
  location: {
    kicker: "Lage",
    title: "Mitten in Kirchheim. Alles fußläufig.",
    sub: "Kuppenstraße 38 · 36275 Kirchheim — ruhig wohnen, schnell wegkommen.",
    items: [
      { d: "200 m", t: "Autobahnanschluss", s: "In zwei Minuten auf der Autobahn" },
      { d: "200 m", t: "Einkaufsmöglichkeiten", s: "Supermärkte und Bäcker um die Ecke" },
      { d: "200–300 m", t: "Restaurants", s: "Vielfältige Gastronomie bequem zu Fuß" },
    ],
    addressTitle: "Ihre Adresse in Kirchheim",
    host: "Ihr Gastgeber: Joscho Winter",
    maps: "Route planen",
  },
  contact: {
    kicker: "Kontakt",
    title: "Fragen Sie Ihr Zimmer an",
    sub: "Unverbindlich anfragen — wir melden uns schnellstmöglich mit einem Angebot zurück.",
    name: "Name",
    namePh: "Ihr vollständiger Name",
    email: "E-Mail",
    emailPh: "name@firma.de",
    phone: "Telefon (optional)",
    phonePh: "Für schnelle Rückfragen",
    room: "Zimmer",
    roomOptions: {
      any: "Noch offen / Beratung",
      single: "Einzelzimmer — 28 €/Tag",
      double: "Doppelzimmer — 52 €/Tag",
      triple: "Dreibettzimmer — 63 €/Tag",
    },
    from: "Anreise",
    to: "Abreise",
    guests: "Personen",
    message: "Ihre Nachricht",
    messagePh: "Zeitraum, Anzahl der Personen, besondere Wünsche …",
    submit: "Anfrage senden",
    sending: "Wird gesendet …",
    successTitle: "Anfrage gesendet!",
    successBody: "Vielen Dank — wir melden uns schnellstmöglich bei Ihnen.",
    errorTitle: "Senden fehlgeschlagen",
    errorBody: "Bitte versuchen Sie es erneut.",
    infoTitle: "Direkt & persönlich",
    infoBody: "Jede Anfrage landet direkt beim Gastgeber Joscho Winter — ohne Umwege, ohne Hotline.",
    address: "Kuppenstraße 38 · 36275 Kirchheim",
    callCta: "Anrufen",
    mailCta: "E-Mail schreiben",
  },
  footer: {
    tagline: "Monteur- & Gästezimmer der gehobenen Klasse in Kirchheim.",
    rights: "Alle Rechte vorbehalten.",
  },
};

export type Dict = typeof de;

const en: Dict = {
  nav: {
    rooms: "Rooms & Rates",
    amenities: "Amenities",
    location: "Location",
    contact: "Contact",
    cta: "Request a room",
  },
  hero: {
    badge: "Rooms available · Premium standard",
    line1: "Contractor and",
    line2: "day-stay flat",
    line3: "with calm.",
    sub: "Tages Übernachtung Winter.\nUncomplicated, spacious, affordable.\nWhether as a contractor's flat or for your short trip — we have what you're looking for.",
    cta1: "Request a room",
    cta2: "See the rates",
    ratePill: "from €20 / day",
    ratePillNote: "for monthly stays",
    stats: [
      { v: "from €20", l: "per day & person" },
      { v: "200 m", l: "to the motorway" },
      { v: "4", l: "bathrooms" },
    ],
  },
  marquee: [
    "200 m to the motorway",
    "TV in every room",
    "4 bathrooms",
    "Rooftop terrace & BBQ",
    "Large kitchen",
    "Private parking",
    "High-speed Wi-Fi",
    "Premium standard",
  ],
  rooms: {
    kicker: "Rooms & Rates",
    title: "Fair rates. Honest comfort.",
    sub: "All rates per day including Wi-Fi, TV, bed linen and full use of all shared spaces.",
    perDay: "per day",
    persons: (n: number) => (n === 1 ? "1 person" : `${n} persons`),
    inquire: "Request now",
    list: [
      {
        id: "single",
        name: "Single room",
        price: 28,
        cap: 1,
        note: "Your quiet retreat after a long shift",
      },
      {
        id: "double",
        name: "Double room",
        price: 52,
        cap: 2,
        note: "€26 per person — ideal for colleagues",
      },
      {
        id: "triple",
        name: "Triple room",
        price: 63,
        cap: 3,
        note: "Just €21 per person — room for the whole crew",
      },
    ] as const,
    longstayTitle: "Long-stay discount per person",
    longstay: [
      { label: "Daily rate", price: "28 €" },
      { label: "from 1 week", price: "25 €" },
      { label: "from 1 month", price: "20 €" },
    ],
    calc: {
      title: "Rate calculator",
      room: "Room",
      nights: "Nights",
      total: "Total",
      note: "Guide value at the daily rate. Stays of one week or one month qualify for the reduced per-person rates of €25 / €20 per day — just send a request.",
      cta: "Request this room",
    },
  },
  amenities: {
    kicker: "Amenities",
    title: "Everything here. All included.",
    sub: "Premium standard means: no morning queue for the bathroom, a kitchen like home and space to switch off.",
    items: [
      { id: "kitchen", title: "Large kitchen", desc: "Fully equipped with stove, oven and dishwasher" },
      { id: "bathrooms", title: "4 bathrooms", desc: "No waiting in the morning — four bathrooms in the house" },
      { id: "tv", title: "TV in every room", desc: "Your own screen for relaxed evenings" },
      { id: "wlan", title: "Wi-Fi throughout", desc: "Fast internet in all rooms and on the terraces" },
      { id: "lounge", title: "Community lounge", desc: "Spacious shared living room with sofas" },
      { id: "parking", title: "Private parking", desc: "Cars and vans park right at the house" },
      { id: "rooftop", title: "Rooftop terrace", desc: "Wide views over Kirchheim after work" },
      { id: "garden", title: "Garden terrace & BBQ", desc: "Seating and grill for sunny evenings" },
      { id: "standard", title: "Premium standard", desc: "Well-kept, clean and with a personal host" },
    ],
  },
  location: {
    kicker: "Location",
    title: "Right in Kirchheim. Everything walkable.",
    sub: "Kuppenstraße 38 · 36275 Kirchheim — sleep quiet, leave fast.",
    items: [
      { d: "200 m", t: "Motorway junction", s: "On the motorway in two minutes" },
      { d: "200 m", t: "Shopping", s: "Supermarkets and bakeries around the corner" },
      { d: "200–300 m", t: "Restaurants", s: "A wide choice of dining within walking distance" },
    ],
    addressTitle: "Your address in Kirchheim",
    host: "Your host: Joscho Winter",
    maps: "Get directions",
  },
  contact: {
    kicker: "Contact",
    title: "Request your room",
    sub: "Send a non-binding request — we will get back to you with an offer as soon as possible.",
    name: "Name",
    namePh: "Your full name",
    email: "Email",
    emailPh: "name@company.com",
    phone: "Phone (optional)",
    phonePh: "For quick questions",
    room: "Room",
    roomOptions: {
      any: "Open / advice needed",
      single: "Single room — €28/day",
      double: "Double room — €52/day",
      triple: "Triple room — €63/day",
    },
    from: "Arrival",
    to: "Departure",
    guests: "Guests",
    message: "Your message",
    messagePh: "Dates, number of guests, special requests …",
    submit: "Send request",
    sending: "Sending …",
    successTitle: "Request sent!",
    successBody: "Thank you — we will get back to you as soon as possible.",
    errorTitle: "Sending failed",
    errorBody: "Please try again.",
    infoTitle: "Direct & personal",
    infoBody: "Every request goes straight to your host Joscho Winter — no detours, no hotline.",
    address: "Kuppenstraße 38 · 36275 Kirchheim",
    callCta: "Call now",
    mailCta: "Write an email",
  },
  footer: {
    tagline: "Premium rooms for contractors and guests in Kirchheim.",
    rights: "All rights reserved.",
  },
};

const dicts: Record<Lang, Dict> = { de, en };

interface LangCtxValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}

const LangCtx = createContext<LangCtxValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("de");
  return (
    <LangCtx.Provider value={{ lang, setLang, t: dicts[lang] }}>
      {children}
    </LangCtx.Provider>
  );
}

export function useLang(): LangCtxValue {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
