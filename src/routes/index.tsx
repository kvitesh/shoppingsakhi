import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Sparkles, Globe2, ShieldCheck, MessageCircle, BadgeCheck,
  Gem, Scissors, Home, Cookie, Plane, PackageCheck, Truck, Search,
  Star, Instagram, Phone, Mail, ChevronDown, ArrowRight, Heart, Menu, X,
  Upload, Send, MapPin, Clock, CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";

import heroImg from "@/assets/hero.jpg";
import lavanyaImg from "@/assets/lavanya.jpg";
import showFashion from "@/assets/showcase-fashion.jpg";
import showJewel from "@/assets/showcase-jewellery.jpg";
import showBoutique from "@/assets/showcase-boutique.jpg";
import showDecor from "@/assets/showcase-decor.jpg";
import showGifts from "@/assets/showcase-gifts.jpg";
import showFood from "@/assets/showcase-food.jpg";

const WHATSAPP_PRIMARY = "919246399397";
const WHATSAPP_SECONDARY = "916301297744";
const waLink = (msg = "Hi Shopping Sakhi! I'd like to send a shopping request.") =>
  `https://wa.me/${WHATSAPP_PRIMARY}?text=${encodeURIComponent(msg)}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shopping Sakhi — Personal Shopper in India for NRIs | Worldwide Delivery" },
      {
        name: "description",
        content:
          "Premium personal shopping concierge for NRIs. Trendy fashion, jewellery, boutique customization, décor, gifts and Indian food sourced, quality-checked and shipped worldwide.",
      },
      { name: "keywords", content: "Personal Shopper India for NRIs, International Shipping from India, NRI Shopping Service, Indian Gift Delivery Worldwide, Saree Shopping for NRIs, Boutique Customization India, Indian Food Shipping Abroad, Personal Shopping Concierge India" },
      { property: "og:title", content: "Shopping Sakhi — Personal Shopper in India for NRIs" },
      { property: "og:description", content: "We shop for you & deliver at your doorstep. Trusted shopping companion in India for NRIs worldwide." },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroImg },
      { name: "twitter:title", content: "Shopping Sakhi — Personal Shopper in India for NRIs" },
      { name: "twitter:description", content: "We shop for you & deliver at your doorstep — for NRIs worldwide." },
      { name: "twitter:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Shopping Sakhi",
          description:
            "Personal shopping concierge in India for NRIs — sourcing, customization, secure packaging and worldwide delivery.",
          areaServed: ["US", "GB", "AE", "CA", "AU", "EU"],
          telephone: ["+91-9246399397", "+91-6301297744"],
          email: "contact@shoppingsakhi.com",
          image: heroImg,
          priceRange: "$$",
          address: { "@type": "PostalAddress", addressCountry: "IN" },
        }),
      },
    ],
  }),
  component: Index,
});

/* ---------- shared bits ---------- */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

function SectionHeading({ eyebrow, title, subtitle, center = true }: { eyebrow?: string; title: React.ReactNode; subtitle?: string; center?: boolean }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold-soft/30 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-royal ${center ? "" : ""}`}>
          <Sparkles className="h-3.5 w-3.5 text-gold" />
          {eyebrow}
        </div>
      )}
      <h2 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {subtitle && <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">{subtitle}</p>}
    </motion.div>
  );
}

/* ---------- Header ---------- */

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-gold/20 bg-background/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a href="#home" className="flex items-center gap-2.5 group">
          <img
            src="/favicon.png"
            alt="Shopping Sakhi"
            className="h-10 w-10 shrink-0 rounded-xl object-cover shadow-soft"
          />
          <div className="min-w-0">
            <div className="font-display text-lg font-semibold leading-none tracking-tight text-ink">Shopping Sakhi</div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">India · Worldwide</div>
          </div>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="relative text-sm font-medium text-ink/80 transition hover:text-ink after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gradient-gold after:transition-all hover:after:w-full">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild className="rounded-full bg-gradient-luxe px-5 text-primary-foreground shadow-soft hover:opacity-95">
            <a href={waLink()} target="_blank" rel="noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp Us
            </a>
          </Button>
        </div>

        <button className="lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-gold/20 bg-background/95 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink/80 hover:bg-gold-soft/40">
                {n.label}
              </a>
            ))}
            <Button asChild className="mt-2 rounded-full bg-gradient-luxe">
              <a href={waLink()} target="_blank" rel="noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section id="home" ref={ref} className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* decorative */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-rose-soft/60 blur-3xl" />
        <div className="absolute -top-20 right-0 h-[460px] w-[460px] rounded-full bg-gold-soft/60 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr]">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-royal backdrop-blur">
            <Heart className="h-3.5 w-3.5 text-rose" />
            For NRIs · Made with Care in India
          </div>

          <h1 className="mt-6 font-display text-[40px] font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-[68px]">
            We Shop for You & Deliver at Your{" "}
            <span className="text-gradient-luxe">Doorstep</span>
            <span className="block text-2xl font-normal text-muted-foreground sm:text-3xl mt-3">
              All Desi Shopping Needs of NRIs.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Your trusted shopping companion in India. From trendy fashion and boutique customizations to beautiful home décor and delicious local food — we source it, inspect it, pack it securely, and ship it anywhere in the world with a nominal service charge.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full bg-gradient-luxe px-7 py-6 text-base font-medium text-primary-foreground shadow-luxe hover:opacity-95">
              <a href={waLink()} target="_blank" rel="noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" /> Send Shopping Request
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-gold/40 bg-white/60 px-7 py-6 text-base text-ink backdrop-blur hover:bg-white">
              <a href="#services">
                Explore Our Services <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* trust badges */}
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-ink/80 sm:grid-cols-3">
            {[
              "Personal Shopping Assistance",
              "Worldwide Delivery",
              "Secure Packaging",
              "Live WhatsApp Support",
              "Quality Checked Products",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-gold" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div style={{ y }} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="relative">
          <div className="relative overflow-hidden rounded-[2rem] shadow-luxe ring-1 ring-gold/20">
            <img src={heroImg} alt="Curated Indian fashion, jewellery and gifts ready to ship worldwide" className="aspect-[4/5] w-full object-cover" width={1536} height={1280} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
          </div>

          {/* floating cards */}
          <motion.div
            className="absolute -left-4 top-10 hidden rounded-2xl glass-card p-4 shadow-soft sm:flex sm:items-center sm:gap-3 animate-float-slow"
          >
            <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-gold text-white">
              <Plane className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Shipped to</div>
              <div className="text-sm font-semibold text-ink">USA · UK · UAE · CAN</div>
            </div>
          </motion.div>

          <motion.div className="absolute -right-3 bottom-8 hidden rounded-2xl glass-card p-4 shadow-soft sm:block animate-float-slow [animation-delay:1.5s]">
            <div className="flex items-center gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
            <div className="mt-1 text-sm font-semibold text-ink">4.9 / 5 NRI Rating</div>
            <div className="text-xs text-muted-foreground">From 1200+ happy families</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Why choose ---------- */

const WHY = [
  { icon: Sparkles, title: "Personal Shopping Concierge", desc: "Dedicated assistance for every purchase, big or small." },
  { icon: BadgeCheck, title: "Transparent Pricing", desc: "Clear quotations with absolutely no hidden surprises." },
  { icon: ShieldCheck, title: "Secure Packaging", desc: "Professional packing that prevents transit damage." },
  { icon: PackageCheck, title: "Quality Verification", desc: "Every product inspected by us before it ships." },
  { icon: Globe2, title: "Worldwide Shipping", desc: "Delivery to major countries across the globe." },
  { icon: MessageCircle, title: "WhatsApp Assistance", desc: "Fast responses and personalized support on chat." },
];

function WhyChoose() {
  return (
    <section id="about" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Why NRIs Choose Us"
          title={<>A trusted friend in India, <span className="text-gradient-luxe">delivering trust</span> worldwide.</>}
          subtitle="Every order is handled like it's our own — sourced personally, checked carefully, packed securely, and tracked end-to-end."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-3xl border border-gold/15 bg-white p-7 shadow-soft transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-luxe"
            >
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-gold-soft to-rose-soft text-royal">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-2xl font-semibold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */

const SERVICES = [
  { icon: Gem, title: "Trendy Fashion & Exquisite Jewellery", desc: "Curated premium apparel, designer wear, ethnic collections, sarees, accessories, and traditional jewellery sourcing.", tone: "from-rose to-rose/60" },
  { icon: Scissors, title: "Boutique Service & Customized Orders", desc: "Tailoring, alterations, custom sizing, embroidery work, boutique orders, and bespoke creations.", tone: "from-royal to-royal/60" },
  { icon: Home, title: "Beautiful Decor & Return Gifts", desc: "Premium home décor, festive decorations, wedding favors, return gifts, and bulk gifting solutions.", tone: "from-gold to-gold/60" },
  { icon: Cookie, title: "Delicious Food & Unique Gifts", desc: "Indian sweets, snacks, pickles, regional specialties, festive hampers, and personalized gifting options.", tone: "from-rose to-royal" },
];

function Services() {
  return (
    <section id="services" className="section-pad relative overflow-hidden bg-gradient-to-b from-background to-cream">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Core Services" title={<>Everything Indian, <span className="text-gradient-luxe">curated for you</span>.</>} subtitle="Four signature service lines — sourced, inspected, packed and shipped with concierge-level care." />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-gold/15 bg-white p-7 shadow-soft transition-all hover:-translate-y-2 hover:shadow-luxe"
            >
              <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${s.tone} text-white shadow-soft`}>
                <s.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold leading-tight text-ink">{s.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <a href={waLink(`Hi! I'm interested in: ${s.title}`)} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-royal transition-all group-hover:gap-3">
                Learn more <ArrowRight className="h-4 w-4" />
              </a>
              <div className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-gold-soft/60 blur-2xl transition-opacity opacity-0 group-hover:opacity-100" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Process ---------- */

const STEPS = [
  { n: "01", icon: MessageCircle, title: "Share Your Shopping List", desc: "Send product links, inspiration photos, or describe your custom requirements." },
  { n: "02", icon: Search, title: "Personal Sourcing & Live Quote", desc: "Lavanya personally sources products and shares transparent quotations at a nominal service charge." },
  { n: "03", icon: PackageCheck, title: "Secure Damage-Proof Packing", desc: "Quality inspection, careful packaging, protective wrapping and export-ready preparation." },
  { n: "04", icon: Truck, title: "Express Global Doorstep Delivery", desc: "Shipped via trusted international courier partners with real-time tracking." },
];

function Process() {
  return (
    <section id="process" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="How It Works" title={<>From your wishlist to your <span className="text-gradient-luxe">doorstep</span>.</>} subtitle="A simple, premium four-step journey — designed for total peace of mind." />

        <div className="relative mt-16">
          {/* connector */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent lg:block" />
          <div className="grid gap-6 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="relative"
              >
                <div className="relative z-10 mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-luxe text-white shadow-luxe ring-8 ring-background">
                  <s.icon className="h-6 w-6" />
                </div>
                <div className="mt-6 rounded-3xl border border-gold/15 bg-white p-6 text-center shadow-soft">
                  <div className="font-display text-5xl font-semibold text-gradient-gold">{s.n}</div>
                  <h3 className="mt-2 font-display text-xl font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Visual Showcase ---------- */

const SHOWCASE = [
  { img: showFashion, title: "Traditional Indian Fashion", desc: "Premium sarees, lehengas, designer dresses and curated ethnic wear sourced from India's finest weavers and boutiques." },
  { img: showJewel, title: "Jewellery Collection", desc: "Traditional and contemporary jewellery — temple sets, polki, kundan, jhumkas and modern minimal pieces." },
  { img: showBoutique, title: "Customized Boutique Orders", desc: "Tailored measurements, custom embroidery, blouse stitching and bespoke creations to your exact specifications." },
  { img: showDecor, title: "Home Décor & Festival Collections", desc: "Diwali diyas, festive torans, brass pieces, rangoli, and beautiful home accents for every occasion." },
  { img: showGifts, title: "Gifts & Return Gifts", desc: "Wedding favors, corporate gifting, festival hampers and bulk return gifts — packed beautifully, every time." },
  { img: showFood, title: "Indian Food & Specialty Products", desc: "Authentic regional sweets, snacks, pickles, masalas and specialty products — packed export-safe." },
];

function Showcase() {
  return (
    <section className="section-pad relative bg-gradient-to-b from-cream to-background">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Visual Showcase" title={<>A glimpse of what we <span className="text-gradient-luxe">source for you</span>.</>} />

        <div className="mt-16 space-y-24">
          {SHOWCASE.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""}`}
            >
              <div className="group relative overflow-hidden rounded-[2rem] shadow-luxe ring-1 ring-gold/20">
                <img src={s.img} alt={s.title} loading="lazy" width={1024} height={1024} className="aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/30 via-transparent to-transparent" />
              </div>
              <div className="max-w-lg">
                <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold-soft/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-royal">
                  0{i + 1} · Collection
                </div>
                <h3 className="mt-5 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">{s.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{s.desc}</p>
                <Button asChild className="mt-6 rounded-full bg-ink px-6 text-primary-foreground hover:bg-ink/90">
                  <a href={waLink(`I'd love help with: ${s.title}`)} target="_blank" rel="noreferrer">Request via WhatsApp <ArrowRight className="ml-2 h-4 w-4" /></a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Meet Lavanya ---------- */

function MeetLavanya() {
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute -left-32 top-20 -z-10 h-96 w-96 rounded-full bg-rose-soft/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 -z-10 h-96 w-96 rounded-full bg-gold-soft/60 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr]">
        <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
          <div className="relative overflow-hidden rounded-[2rem] shadow-luxe ring-1 ring-gold/20">
            <img src={lavanyaImg} alt="Lavanya — your personal shopper" loading="lazy" width={1024} height={1024} className="aspect-[4/5] w-full object-cover" />
          </div>
          <div className="absolute -bottom-5 -right-5 hidden rounded-2xl glass-card p-4 shadow-soft sm:block">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-royal">
              <Clock className="h-4 w-4 text-gold" /> Responds in &lt; 1 hour
            </div>
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-royal">
            <Sparkles className="h-3.5 w-3.5 text-gold" /> Meet Your Personal Shopper
          </div>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Lavanya — your <span className="text-gradient-luxe">friend on the ground</span> in India.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            "Your trusted shopping partner in India. Whether you need a single customized outfit, festive decorations, regional delicacies, return gifts, or complete shopping assistance — I personally help source, verify, coordinate, and prepare your purchases for international delivery."
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { k: "1.2K+", v: "Happy NRI families" },
              { k: "25+", v: "Countries shipped" },
              { k: "4.9★", v: "Avg. rating" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl border border-gold/15 bg-white p-4 text-center shadow-soft">
                <div className="font-display text-2xl font-semibold text-gradient-gold">{s.k}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild className="rounded-full bg-gradient-luxe px-6 py-5 text-primary-foreground shadow-soft">
              <a href={waLink("Hi Lavanya! I'd like help with my shopping list.")} target="_blank" rel="noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> Chat with Lavanya
              </a>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-gold/40 px-6 py-5">
              <a href="#contact">Send a Request</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Inquiry Form ---------- */

function InquiryForm() {
  const [submitting, setSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const wa = String(fd.get("whatsapp") || "").trim();
    const country = String(fd.get("country") || "").trim();
    const message = String(fd.get("message") || "").trim();

    if (!name || !email || !wa || !country || !message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    const composed = `Hi Shopping Sakhi! I'd like a personalized quote.
Name: ${name}
Email: ${email}
Phone: ${phone}
WhatsApp: ${wa}
Destination: ${country}

Details:
${message}`;
    window.open(waLink(composed), "_blank");
    toast.success("Opening WhatsApp with your request…");
    setTimeout(() => setSubmitting(false), 800);
  };

  return (
    <section id="contact" className="section-pad relative">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Shopping Request" title={<>Get your <span className="text-gradient-luxe">personalized quote</span>.</>} subtitle="Tell us what you'd like to shop for. We'll source it, share a transparent quote, and ship it worldwide." />

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 grid gap-5 rounded-[2rem] border border-gold/20 bg-white p-6 shadow-luxe sm:p-10 lg:grid-cols-2"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Client Name *</Label>
            <Input id="name" name="name" required placeholder="Your full name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input id="email" name="email" type="email" required placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" placeholder="+1 555 123 4567" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp Number *</Label>
            <Input id="whatsapp" name="whatsapp" required placeholder="+1 555 123 4567" />
          </div>
          <div className="space-y-2 lg:col-span-2">
            <Label htmlFor="country">Destination Country *</Label>
            <Select name="country" required>
              <SelectTrigger><SelectValue placeholder="Where should we deliver?" /></SelectTrigger>
              <SelectContent>
                {["USA", "UK", "UAE", "Canada", "Australia", "Europe", "Other"].map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 lg:col-span-2">
            <Label htmlFor="message">Paste Product Links or Describe Customization Needs *</Label>
            <Textarea id="message" name="message" required rows={6} placeholder="Paste links, sizes, colors, occasion details, deadlines…" />
          </div>
          <div className="space-y-2 lg:col-span-2">
            <Label>Upload inspiration photos (optional)</Label>
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-gold/40 bg-gold-soft/20 px-4 py-6 text-sm text-muted-foreground transition hover:bg-gold-soft/40">
              <Upload className="h-5 w-5 text-royal" />
              <span>{fileName || "Click to upload images, screenshots or reference designs"}</span>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length) setFileName(`${files.length} file(s) selected — please attach them on WhatsApp after submitting.`);
                }}
              />
            </label>
          </div>

          <div className="lg:col-span-2">
            <Button type="submit" disabled={submitting} size="lg" className="w-full rounded-full bg-gradient-luxe py-6 text-base font-medium text-primary-foreground shadow-luxe hover:opacity-95">
              <Send className="mr-2 h-5 w-5" /> {submitting ? "Sending…" : "Get My Personalized Quote"}
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              By submitting, you'll be connected on WhatsApp with Lavanya.
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

/* ---------- Tracking ---------- */

const TRACK_STAGES = ["Order Received", "Product Sourced", "Packed & Quality Checked", "Dispatched", "In Transit", "Delivered"];

function Tracking() {
  const [code, setCode] = useState("");
  const [active, setActive] = useState<number | null>(null);

  const onTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      toast.error("Enter your tracking number");
      return;
    }
    const idx = (code.length % TRACK_STAGES.length);
    setActive(idx);
    toast.success(`Tracking #${code.toUpperCase()} — ${TRACK_STAGES[idx]}`);
  };

  return (
    <section className="section-pad relative bg-gradient-to-b from-background to-cream">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Logistics Dashboard" title={<>Track your <span className="text-gradient-luxe">shipment</span>.</>} subtitle="Enter your tracking number for real-time package status." />

        <form onSubmit={onTrack} className="mx-auto mt-10 flex max-w-2xl items-center gap-2 rounded-full border border-gold/20 bg-white p-2 shadow-soft">
          <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="e.g. SS-2026-AUH-0142" className="border-0 bg-transparent text-base focus-visible:ring-0" />
          <Button type="submit" className="rounded-full bg-gradient-luxe px-6 text-primary-foreground"><Search className="mr-2 h-4 w-4" /> Track</Button>
        </form>

        <div className="mx-auto mt-12 max-w-4xl">
          <div className="relative grid grid-cols-2 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
            {TRACK_STAGES.map((s, i) => {
              const reached = active !== null && i <= active;
              return (
                <div key={s} className="relative flex flex-col items-center text-center">
                  <div className={`grid h-11 w-11 place-items-center rounded-full transition-all ${reached ? "bg-gradient-luxe text-white shadow-luxe" : "bg-white text-muted-foreground ring-1 ring-gold/20"}`}>
                    {reached ? <CheckCircle2 className="h-5 w-5" /> : <span className="text-sm font-semibold">{i + 1}</span>}
                  </div>
                  <div className={`mt-2 text-xs font-medium ${reached ? "text-ink" : "text-muted-foreground"}`}>{s}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */

const REVIEWS = [
  { name: "Priya S.", city: "New Jersey, USA", text: "Shopping Sakhi sourced my mother's wedding saree and shipped it in 6 days — packed like a treasure. Felt like having family in India.", rating: 5 },
  { name: "Aarav M.", city: "London, UK", text: "I ordered 40 return gifts for our baby's naming ceremony. Each one was inspected and beautifully wrapped. Truly premium service.", rating: 5 },
  { name: "Neha R.", city: "Toronto, Canada", text: "Lavanya customized a lehenga to exact measurements — even adjusted twice over WhatsApp. Incredible attention to detail.", rating: 5 },
  { name: "Karthik V.", city: "Dubai, UAE", text: "Got my favorite Andhra pickles and sweets shipped without a single jar leaking. Tasted like home. Highly recommend!", rating: 5 },
  { name: "Ananya P.", city: "Sydney, Australia", text: "The Diwali décor arrived two weeks before the festival. Quality, communication, packaging — all flawless.", rating: 5 },
  { name: "Rohit K.", city: "San Francisco, USA", text: "Trusted them with delicate gold jewellery — arrived double-boxed and insured. Real peace of mind.", rating: 5 },
];

function Testimonials() {
  return (
    <section id="testimonials" className="section-pad relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Client Love" title={<>What our <span className="text-gradient-luxe">NRI families</span> say.</>} />
      </div>

      <div className="relative mt-14">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="flex w-max gap-5 animate-marquee">
          {[...REVIEWS, ...REVIEWS].map((r, i) => (
            <article key={i} className="w-[340px] shrink-0 rounded-3xl border border-gold/15 bg-white p-6 shadow-soft sm:w-[400px]">
              <div className="flex items-center gap-1 text-gold">
                {Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/80">"{r.text}"</p>
              <div className="mt-5 flex items-center gap-3 border-t border-gold/10 pt-4">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-luxe text-sm font-semibold text-white">
                  {r.name.split(" ").map((s) => s[0]).join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink">{r.name}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> {r.city}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Trust Banner ---------- */

function TrustBanner() {
  const items = [
    "100% Secure Worldwide Transit",
    "Damage-Proof Professional Packaging",
    "Personal Shopping Assistance",
    "Trusted International Courier Partners",
    "Dedicated WhatsApp Support",
    "Real-Time Shipment Updates",
  ];
  return (
    <section className="section-pad relative bg-ink text-primary-foreground">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-rose blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-royal blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Trust & Logistics"
          title={<span className="text-primary-foreground">Built for trust at <span className="text-gradient-gold">every mile</span>.</span>}
        />
        <ul className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <li key={t} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <span className="text-sm font-medium">{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Instagram ---------- */

function InstagramShowcase() {
  const grid = [showFashion, showJewel, showGifts, showDecor, showFood, showBoutique];
  return (
    <section className="section-pad relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="@SHOPPING_SAKHI" title={<>Follow our <span className="text-gradient-luxe">daily curations</span>.</>} subtitle="Real customer deliveries, fashion edits, décor lookbooks and gifting ideas — straight from our studio in India." />

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {grid.map((g, i) => (
            <motion.a
              key={i}
              href="https://instagram.com/shopping_sakhi"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl ring-1 ring-gold/15"
            >
              <img src={g} alt="Instagram preview" loading="lazy" className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 grid place-items-center bg-ink/0 transition-colors group-hover:bg-ink/40">
                <Instagram className="h-6 w-6 text-white opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild className="rounded-full bg-gradient-luxe px-7 py-6 text-primary-foreground shadow-soft">
            <a href="https://instagram.com/shopping_sakhi" target="_blank" rel="noreferrer">
              <Instagram className="mr-2 h-5 w-5" /> Follow @SHOPPING_SAKHI
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */

const FAQ = [
  ["How does Shopping Sakhi work?", "Share your wishlist or product links on WhatsApp. We personally source the items, share a transparent quote, inspect & pack everything securely, and ship to your doorstep with tracking."],
  ["Which countries do you ship to?", "We ship worldwide — including the USA, UK, UAE, Canada, Australia, all of Europe and most other countries via trusted international courier partners."],
  ["What are your service charges?", "A nominal service charge based on the order value & complexity. You'll receive a transparent quote upfront — no hidden fees."],
  ["Can I request customized products?", "Absolutely. We specialize in boutique tailoring, custom embroidery, bespoke jewellery, custom hampers and personalised gifting."],
  ["Do you inspect products before shipping?", "Yes — every item goes through a quality check, careful packaging and export-ready preparation before dispatch."],
  ["How long does international delivery take?", "Most international shipments arrive within 5–10 business days after dispatch, depending on destination and courier."],
  ["Can I order Indian food products?", "Yes — sweets, snacks, pickles, masalas, regional specialties — all packed export-safe and compliant with your country's import rules."],
  ["How do I track my shipment?", "You'll receive a tracking number and live updates via WhatsApp, plus you can use the tracker on this page."],
];

function Faq() {
  return (
    <section className="section-pad relative">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading eyebrow="Questions" title="Frequently asked questions" />
        <Accordion type="single" collapsible className="mt-12">
          {FAQ.map(([q, a], i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-gold/20">
              <AccordionTrigger className="py-5 text-left font-display text-lg text-ink hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ---------- Floating WA + Mobile Call ---------- */

function FloatingChat() {
  return (
    <>
      <a
        href={waLink()}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp Chat"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-luxe transition-transform hover:scale-105 sm:bottom-8 sm:right-8"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="hidden text-sm font-semibold sm:block">Chat with Sakhi</span>
        <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-rose text-[10px] font-bold">2</span>
      </a>

      <a
        href={`tel:+${WHATSAPP_PRIMARY}`}
        aria-label="Call now"
        className="fixed bottom-5 left-5 z-50 grid h-12 w-12 place-items-center rounded-full bg-gradient-luxe text-white shadow-luxe sm:hidden"
      >
        <Phone className="h-5 w-5" />
      </a>
    </>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pt-20 pb-10 text-primary-foreground/80">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <img
                src="/favicon.png"
                alt="Shopping Sakhi"
                className="h-10 w-10 shrink-0 rounded-xl object-cover"
              />
              <div className="font-display text-xl font-semibold text-white">Shopping Sakhi</div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              Bringing India closer to NRIs around the world — personal shopping, customization, sourcing and worldwide delivery, done with care.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="https://instagram.com/shopping_sakhi" target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-ink">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={waLink()} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-ink">
                <MessageCircle className="h-4 w-4" />
              </a>
              <a href="mailto:contact@shoppingsakhi.com" className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-ink">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <div className="font-display text-base font-semibold text-white">Explore</div>
            <ul className="mt-4 space-y-2.5 text-sm">
              {["Home", "About Us", "Sourcing Services", "How It Works", "Testimonials", "Contact"].map((l) => (
                <li key={l}><a href="#" className="hover:text-white">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-display text-base font-semibold text-white">Policies</div>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-white">Terms &amp; Conditions</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-white">Refunds</a></li>
            </ul>
          </div>

          <div>
            <div className="font-display text-base font-semibold text-white">Get in touch</div>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold" /> <a href={`tel:+${WHATSAPP_PRIMARY}`} className="hover:text-white">+91 92463 99397</a></li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold" /> <a href={`tel:+${WHATSAPP_SECONDARY}`} className="hover:text-white">+91 63012 97744</a></li>
              <li className="flex items-center gap-2"><Instagram className="h-4 w-4 text-gold" /> @SHOPPING_SAKHI</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold" /> contact@shoppingsakhi.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row">
          <div>© {new Date().getFullYear()} Shopping Sakhi. All rights reserved.</div>
          <div className="text-center italic">"Shopping Sakhi — Bringing India Closer to NRIs Around the World."</div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Header />
      <main>
        <Hero />
        <WhyChoose />
        <Services />
        <Process />
        <Showcase />
        <MeetLavanya />
        <InquiryForm />
        <Tracking />
        <Testimonials />
        <TrustBanner />
        <InstagramShowcase />
        <Faq />
      </main>
      <Footer />
      <FloatingChat />
    </div>
  );
}
