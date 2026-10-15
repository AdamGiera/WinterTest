# PRD — Haus Winter Website

## Original problem statement
"Hi, ähm, ich will eine Website, eine One-Pager-Seite herstellen. Ich habe schon alles vorbereitet. Ich hab auch schon die Bilder und auch das Schreiben. Ich bräuchte halt nur, dass du mir helfen tust, eine Website zu erstellen."

User choices: Thema Haus (Monteur-/Gästezimmer), Mehrsprachig (DE/EN), Warm & freundlich, Kontaktformular mit E-Mail-Versand. Inhalte vom Nutzer: Joscho Winter, Kuppenstraße 38, 36275 Kirchheim; Preise: 1 Person 28 €/Tag, ab 1 Woche 25 €, ab 1 Monat 20 €; Einzelzimmer 28 €, Doppelzimmer 52 €, Dreibettzimmer 63 €; Ausstattung: TV/Zimmer, WLAN, PKW-Stellplätze, 4 Bäder, Aufenthaltsraum, große Küche, Dachterrasse, Gartenterrasse, Grillplatz, gehobene Klasse; Lage: Autobahn 200 m, Einkauf 200 m, Restaurants 200–300 m. 5 echte Fotos hochgeladen (Wohnzimmer, Bad, Küche, Schlafzimmer, Aufenthaltsraum).

## Architektur
- Frontend: Vite + React 19 + TS, Tailwind v4, motion (framer), lenis smooth scroll, shadcn/ui, sonner. Komponenten: Navbar, Hero (masked line reveal + Parallax), Marquee, Rooms (Preiskarten + Rechner), Amenities (Bento mit echten Fotos), LocationSection, ContactSection, Footer. i18n via `src/lib/i18n.tsx` (DE/EN Context).
- Backend: FastAPI `server.py`, `POST /api/inquiries` → MongoDB (`inquiries` collection) + E-Mail via Emergent-managed Resend-Proxy (Guardrail-Gate `_assert_safe_email` auf jedem Send).
- Design: warm ivory #FAF7F2, Terracotta #C45B28, warm charcoal #1C1917; Playfair Display + DM Sans + JetBrains Mono.

## User personas
- Monteur/Handwerker auf Baustelle (mobil-first, schnelle Preise, direkte Anfrage)
- Firma, die Team-Unterkunft sucht (Dreibettzimmer, Langzeit-Rabatt)
- Kurzzeit-Gast/Durchreisender (Lage, Restaurants, Komfort)

## Implementiert (2026-07 / Stand 23.09.2026)
- One-Pager DE/EN mit Sprachumschalter ohne Reload
- Kinetic Hero mit Masked-Reveal, Parallax-Bild (Außenfoto des Hauses), Rate-Pill; Headline auf Kundenwunsch: „Monteur und Tages Wohnung mit Ruhe." + Subtext „Tages Übernachtung Winter. Ruhig, großräumig, preiswert. …"
- Editorial-Marquee, Bento-Ausstattungsraster mit den echten Fotos (5 Foto-Kacheln: Küche, TV/Schlafzimmer, Bäder, Aufenthaltsraum, Terrasse), Minimap (Google Maps Embed) im Kontaktbereich
- Preiskarten (28/52/63 €) + Langzeit-Staffel (28/25/20 € p.P.) + interaktiver Preisrechner
- Zimmer-Bildleiste mit 2 weiteren Schlafzimmer-Fotos (Mehrbettzimmer, Dachgeschoss mit Holzbalken) — nachträglich ergänzt
- Lage-Sektion mit Distanzen + Google-Maps-Link
- Kontaktformular → MongoDB + E-Mail (derzeit an Testadresse delivered@resend.dev)
- Eigens SVG-Logo + Favicon, Noise-Overlay, Scroll-Reveals, Mobile-Menü

## Verifiziert
- curl POST /api/inquiries (success + 422-Negativfall) über öffentliche URL
- yarn typecheck sauber
- Browser-E2E: Hero, Sektionen, EN-Umschaltung, Zimmer-Vorauswahl, Formular-Submit mit Toast, Mobile

## Backlog / offen
- ~~P0: Echte E-Mail~~ ERLEDIGT (26.09.2026): OWNER_EMAIL=joscho-winter@gmx.de, Versand verifiziert; E-Mail + Telefon +49 176 24368486 auf der Seite im Kontaktbereich und Footer. Bankverbindung war kurz öffentlich, auf Wunsch komplett entfernt (nicht wieder hinzufügen ohne ausdrücklichen Wunsch)
- P1: WhatsApp-Button zur Handynummer ergänzen
- P1: Impressum/Datenschutz (rechtlich nötig in DE)
- P2: Fotogalerie mit Lightbox
- P2: Verfügbarkeitskalender
