import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, MessageCircle, Menu, X, Car, Plane, Train, MapPin, Mail,
  Shield, Clock, Sparkles, Users, Star, ChevronRight, Globe2, Award,
  Heart, CheckCircle2, ArrowRight, Calendar
} from "lucide-react";

import heroCar from "@/assets/hero-car.jpg";
import tirupati from "@/assets/tirupati.jpg";
import dzire from "@/assets/dzire.jpg";
import ertiga from "@/assets/ertiga.jpg";
import carens from "@/assets/carens.jpg";
import innova from "@/assets/innova.jpg";
import tempo from "@/assets/tempo.jpg";
import bus from "@/assets/bus.jpg";

const PHONE_PRIMARY = "9028865606";
const PHONES = ["9028865606", "9373575656", "8928805660", "9890565606"];
const WHATSAPP = `https://wa.me/91${PHONE_PRIMARY}?text=${encodeURIComponent(
  "Hello Oui Tours & Travels, I'd like to book a ride / package."
)}`;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const } }),
};

const cabs = [
  { name: "Swift Dzire", seats: 4, type: "AC", img: dzire, tag: "Sedan" },
  { name: "Ertiga", seats: 6, type: "AC", img: ertiga, tag: "MPV" },
  { name: "Kia Carens", seats: 6, type: "AC", img: carens, tag: "Premium" },
  { name: "Innova Crysta", seats: 7, type: "AC", img: innova, tag: "Luxury" },
  { name: "Tempo Traveller", seats: 12, type: "AC", img: tempo, tag: "Group" },
  { name: "13 Seater", seats: 13, type: "AC", img: tempo, tag: "Group" },
  { name: "17 Seater", seats: 17, type: "AC / Non‑AC", img: tempo, tag: "Group" },
  { name: "26 Seater Bus", seats: 26, type: "AC", img: bus, tag: "Coach" },
  { name: "45 Seater Bus", seats: 45, type: "AC / Non‑AC", img: bus, tag: "Coach" },
];

const services = [
  { icon: Car, title: "Cab Booking", desc: "Local, outstation & airport transfers in premium vehicles." },
  { icon: Sparkles, title: "Tirupati Darshan", desc: "Curated packages with VIP darshan & stay." },
  { icon: Plane, title: "Flight Tickets", desc: "Domestic & international flight bookings at best fares." },
  { icon: Train, title: "Rail Tickets", desc: "Fast confirmed rail bookings across India." },
  { icon: Globe2, title: "Holiday Packages", desc: "Family, group & honeymoon tours tailor‑made." },
  { icon: Award, title: "Passport & Visa", desc: "End‑to‑end guidance for passport & visa." },
];

const features = [
  { icon: Heart, title: "Affordable Pricing", desc: "Transparent fares, no hidden charges." },
  { icon: Shield, title: "Safe & Trusted Drivers", desc: "Verified, courteous & experienced." },
  { icon: Clock, title: "24 / 7 Support", desc: "Round‑the‑clock assistance on call." },
  { icon: Sparkles, title: "Clean Vehicles", desc: "Sanitised & well‑maintained fleet." },
  { icon: CheckCircle2, title: "On‑Time Service", desc: "Punctual pickups, every single ride." },
  { icon: Users, title: "Family Friendly", desc: "Comfortable rides for every age." },
];

const testimonials = [
  { name: "Rohit Patil", text: "Booked Innova for Tirupati Darshan — driver was excellent, journey was smooth, VIP darshan handled perfectly.", rating: 5 },
  { name: "Priya Deshmukh", text: "Their Tempo Traveller for our 14‑person family trip was spotless and on time. Highly recommended in Latur!", rating: 5 },
  { name: "Aakash Kulkarni", text: "Used them for airport transfer at 4 AM. Driver arrived 10 mins early. Best cab service in town.", rating: 5 },
  { name: "Sneha Joshi", text: "Got holiday package to Goa with flight & hotel. Stress‑free planning end to end. Will book again.", rating: 5 },
];

const galleryItems = [
  { src: innova, label: "Premium Fleet", h: "tall" },
  { src: tirupati, label: "Pilgrimage Tours", h: "short" },
  { src: bus, label: "Group Coaches", h: "short" },
  { src: carens, label: "Family Travel", h: "tall" },
  { src: heroCar, label: "Airport Transfers", h: "short" },
  { src: ertiga, label: "City Rides", h: "tall" },
];

const Logo = () => (
  <a href="#home" className="flex items-center gap-2 group">
    <div className="relative w-10 h-10 rounded-xl bg-gradient-gold grid place-items-center shadow-gold">
      <span className="font-black text-secondary text-lg">O</span>
      <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-secondary border-2 border-gold" />
    </div>
    <div className="leading-tight">
      <div className="font-extrabold tracking-tight text-base md:text-lg">Oui Tours</div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">& Travels · Latur</div>
    </div>
  </a>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { label: "Home", href: "#home" },
    { label: "Cabs", href: "#cabs" },
    { label: "Services", href: "#services" },
    { label: "Tirupati", href: "#tirupati" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
      <div className={`container-x flex items-center justify-between px-4 md:px-8 rounded-2xl transition-all duration-300 ${scrolled ? "glass-light shadow-soft py-2" : ""}`}>
        <Logo />
        <nav className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <a key={l.href} href={l.href} className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground rounded-full hover:bg-accent transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <a href={`tel:${PHONE_PRIMARY}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border border-border hover:border-gold transition-colors">
            <Phone size={14} /> Call
          </a>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-gold !py-2 !px-4 text-sm">
            <MessageCircle size={16} /> Book Now
          </a>
        </div>
        <button onClick={() => setOpen(v => !v)} className="md:hidden p-2 rounded-lg border border-border" aria-label="Menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="md:hidden container-x mt-2 px-4"
          >
            <div className="glass-light rounded-2xl p-4 flex flex-col gap-1 shadow-soft">
              {links.map(l => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg hover:bg-accent text-sm font-medium">
                  {l.label}
                </a>
              ))}
              <div className="flex gap-2 pt-2">
                <a href={`tel:${PHONE_PRIMARY}`} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border border-border">
                  <Phone size={14} /> Call
                </a>
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-gold flex-1 !py-2 text-sm">
                  <MessageCircle size={16} /> Book
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => (
  <section id="home" className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden bg-gradient-hero text-white">
    <div className="absolute inset-0 opacity-30 pointer-events-none"
         style={{ backgroundImage: "radial-gradient(circle at 20% 80%, hsl(47 100% 50% / 0.25), transparent 40%)" }} />
    <div className="container-x grid md:grid-cols-2 gap-12 items-center relative">
      <motion.div initial="hidden" animate="show" variants={fadeUp} className="space-y-6">
        <span className="eyebrow"><Sparkles size={14} /> Latur · Maharashtra</span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05]">
          Premium <span className="gold-text">Cab & Travel</span><br /> Services in Latur
        </h1>
        <p className="text-white/70 text-base md:text-lg max-w-xl">
          Book comfortable rides, Tirupati Darshan packages, flight tickets, rail tickets &
          holiday tours at affordable prices — with drivers you can trust.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <a href="#contact" className="btn-gold"><Calendar size={16} /> Book Now</a>
          <a href={`tel:${PHONE_PRIMARY}`} className="btn-ghost-light"><Phone size={16} /> Call Us</a>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-ghost-light"><MessageCircle size={16} /> WhatsApp</a>
        </div>
        <div className="flex flex-wrap gap-6 pt-6 text-sm text-white/60">
          {["Swift Dzire", "Ertiga", "Kia Carens", "Innova", "Tempo Traveller"].map(n => (
            <div key={n} className="flex items-center gap-2"><CheckCircle2 size={14} className="text-gold" /> {n}</div>
          ))}
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative">
        <div className="absolute -inset-6 bg-gradient-gold opacity-20 blur-3xl rounded-full" />
        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-gold animate-float">
          <img src={heroCar} alt="Premium SUV for Oui Tours & Travels Latur" width={1536} height={1024} className="w-full h-auto" />
        </div>
        <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 text-white max-w-[200px] hidden sm:block">
          <div className="text-xs text-white/60">Live Bookings</div>
          <div className="text-2xl font-extrabold gold-text">12,500+</div>
          <div className="text-xs text-white/60">happy travellers</div>
        </div>
        <div className="absolute -top-4 -right-4 glass rounded-2xl p-4 text-white hidden sm:block">
          <div className="flex items-center gap-1 text-gold">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</div>
          <div className="text-xs text-white/70 mt-1">4.9 / 5 rating</div>
        </div>
      </motion.div>
    </div>
  </section>
);

const CabCard = ({ c, i }: { c: typeof cabs[number]; i: number }) => (
  <motion.div
    initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} custom={i} variants={fadeUp}
    className="group relative rounded-3xl overflow-hidden bg-card border border-border hover:border-gold transition-all duration-500 hover:-translate-y-1 hover:shadow-gold"
  >
    <div className="absolute inset-0 bg-gradient-gold opacity-0 group-hover:opacity-[0.04] transition-opacity" />
    <div className="aspect-[4/3] bg-gradient-dark overflow-hidden">
      <img src={c.img} alt={c.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
    </div>
    <div className="p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">{c.name}</h3>
        <span className="text-[10px] px-2 py-1 rounded-full bg-accent text-foreground font-semibold uppercase tracking-wider">{c.tag}</span>
      </div>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><Users size={12} /> {c.seats} seater</span>
        <span className="flex items-center gap-1"><Sparkles size={12} /> {c.type}</span>
        <span className="flex items-center gap-1"><Heart size={12} /> Comfortable</span>
      </div>
      <a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 rounded-full bg-secondary text-secondary-foreground font-semibold text-sm hover:bg-gold hover:text-secondary transition-colors">
        Book Now <ArrowRight size={14} />
      </a>
    </div>
  </motion.div>
);

const Cabs = () => (
  <section id="cabs" className="section bg-muted/40">
    <div className="container-x">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
        <span className="eyebrow"><Car size={14} /> Our Fleet</span>
        <h2 className="text-3xl md:text-5xl font-extrabold mt-3">Available <span className="gold-text">Cabs & Coaches</span></h2>
        <p className="text-muted-foreground mt-4">From compact sedans to 45‑seater luxury buses — we've got the right ride for every occasion.</p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cabs.map((c, i) => <CabCard key={c.name} c={c} i={i} />)}
      </div>
    </div>
  </section>
);

const Services = () => (
  <section id="services" className="section relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-transparent pointer-events-none" />
    <div className="container-x relative">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
        <span className="eyebrow"><Sparkles size={14} /> What We Offer</span>
        <h2 className="text-3xl md:text-5xl font-extrabold mt-3">Premium <span className="gold-text">Travel Services</span></h2>
        <p className="text-muted-foreground mt-4">One trusted partner for all your travel needs — from city rides to international holidays.</p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((s, i) => (
          <motion.div key={s.title} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} variants={fadeUp}
            className="glass-light rounded-3xl p-6 hover:shadow-gold hover:-translate-y-1 transition-all duration-500 group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-gold grid place-items-center shadow-gold mb-4 group-hover:scale-110 transition-transform">
              <s.icon className="text-secondary" size={26} />
            </div>
            <h3 className="text-xl font-bold mb-2">{s.title}</h3>
            <p className="text-muted-foreground text-sm">{s.desc}</p>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-foreground hover:text-gold">
              Enquire <ChevronRight size={14} />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Tirupati = () => (
  <section id="tirupati" className="section relative overflow-hidden text-white">
    <div className="absolute inset-0">
      <img src={tirupati} alt="Tirupati Balaji Temple" loading="lazy" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/85 to-secondary/40" />
    </div>
    <div className="container-x relative grid md:grid-cols-2 gap-10 items-center">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
        <span className="eyebrow !text-gold"><Sparkles size={14} /> Featured Package</span>
        <h2 className="text-3xl md:text-5xl font-extrabold mt-3">Tirupati <span className="gold-text">Darshan</span> Packages</h2>
        <p className="text-white/70 mt-4 max-w-lg">
          A divine journey planned with care — comfortable travel, quality hotel stays, and VIP darshan
          assistance so your pilgrimage stays spiritual, not stressful.
        </p>
        <ul className="mt-6 space-y-3">
          {[
            "Comfortable travel by AC vehicles",
            "Quality hotel stay near temple",
            "VIP Darshan guidance & support",
            "Group booking & family packages",
          ].map(t => (
            <li key={t} className="flex items-center gap-3 text-white/85">
              <span className="w-6 h-6 rounded-full bg-gold/20 grid place-items-center"><CheckCircle2 size={14} className="text-gold" /></span>
              {t}
            </li>
          ))}
        </ul>
        <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-gold mt-8 animate-pulse-gold">
          Book Tirupati Package <ArrowRight size={16} />
        </a>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="hidden md:block">
        <div className="grid grid-cols-2 gap-4">
          {[
            { k: "12,000+", v: "Pilgrims served" },
            { k: "VIP", v: "Darshan support" },
            { k: "4 Days", v: "Avg. package" },
            { k: "24/7", v: "On‑trip support" },
          ].map(s => (
            <div key={s.v} className="glass rounded-2xl p-5">
              <div className="text-2xl font-extrabold gold-text">{s.k}</div>
              <div className="text-xs uppercase tracking-wider text-white/60 mt-1">{s.v}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

const WhyUs = () => (
  <section className="section">
    <div className="container-x">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
        <span className="eyebrow"><Award size={14} /> Why Choose Us</span>
        <h2 className="text-3xl md:text-5xl font-extrabold mt-3">Travel With <span className="gold-text">Confidence</span></h2>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <motion.div key={f.title} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} variants={fadeUp}
            className="relative rounded-3xl p-6 border border-border hover:border-gold transition-all duration-500 group bg-card hover:-translate-y-1 hover:shadow-soft">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-gold rounded-full opacity-0 group-hover:opacity-10 blur-2xl transition-opacity" />
            <div className="w-12 h-12 rounded-xl bg-accent grid place-items-center mb-4 group-hover:bg-gold group-hover:scale-110 transition-all">
              <f.icon size={22} />
            </div>
            <h3 className="text-lg font-bold">{f.title}</h3>
            <p className="text-muted-foreground text-sm mt-1">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Gallery = () => (
  <section id="gallery" className="section bg-muted/40">
    <div className="container-x">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
        <span className="eyebrow"><Sparkles size={14} /> Memories</span>
        <h2 className="text-3xl md:text-5xl font-extrabold mt-3">From Our <span className="gold-text">Journeys</span></h2>
      </motion.div>
      <div className="columns-2 md:columns-3 gap-4 [column-fill:_balance]">
        {galleryItems.map((g, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="mb-4 relative rounded-2xl overflow-hidden group break-inside-avoid">
            <img src={g.src} alt={g.label} loading="lazy"
              className={`w-full ${g.h === "tall" ? "h-72" : "h-52"} object-cover group-hover:scale-110 transition-transform duration-700`} />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <span className="text-white font-bold">{g.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="section overflow-hidden">
    <div className="container-x">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
        <span className="eyebrow"><Heart size={14} /> Customer Love</span>
        <h2 className="text-3xl md:text-5xl font-extrabold mt-3">What Travellers <span className="gold-text">Say</span></h2>
      </motion.div>
    </div>
    <div className="relative">
      <div className="flex gap-6 animate-marquee w-max">
        {[...testimonials, ...testimonials].map((t, i) => (
          <div key={i} className="w-[340px] md:w-[420px] glass-light rounded-3xl p-6 shadow-soft shrink-0">
            <div className="flex items-center gap-1 text-gold mb-3">
              {Array.from({ length: t.rating }).map((_, k) => <Star key={k} size={16} fill="currentColor" />)}
            </div>
            <p className="text-foreground/80">"{t.text}"</p>
            <div className="flex items-center gap-3 mt-5">
              <div className="w-10 h-10 rounded-full bg-gradient-gold grid place-items-center font-bold text-secondary">{t.name[0]}</div>
              <div>
                <div className="font-bold text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">Verified Traveller</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi, I'm ${form.name} (${form.phone}). ${form.message}`;
    window.open(`https://wa.me/91${PHONE_PRIMARY}?text=${encodeURIComponent(text)}`, "_blank");
  };
  return (
    <section id="contact" className="section bg-gradient-dark text-white relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-gold opacity-20 blur-3xl rounded-full" />
      <div className="container-x relative grid md:grid-cols-2 gap-10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
          <span className="eyebrow"><Phone size={14} /> Get in touch</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3">Let's plan your <span className="gold-text">next ride</span></h2>
          <p className="text-white/70 mt-4 max-w-md">Call, WhatsApp or fill the form — our team responds within minutes.</p>

          <div className="mt-8 space-y-3">
            {PHONES.map(p => (
              <a key={p} href={`tel:${p}`} className="flex items-center justify-between glass rounded-2xl px-5 py-4 hover:bg-white/15 transition-colors">
                <span className="flex items-center gap-3"><Phone size={18} className="text-gold" /> +91 {p}</span>
                <span className="text-xs uppercase tracking-wider text-white/60">Tap to call</span>
              </a>
            ))}
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="flex items-center justify-between glass rounded-2xl px-5 py-4 hover:bg-white/15 transition-colors">
              <span className="flex items-center gap-3"><MessageCircle size={18} className="text-gold" /> WhatsApp Booking</span>
              <ArrowRight size={16} />
            </a>
            <div className="flex items-start gap-3 glass rounded-2xl px-5 py-4">
              <MapPin size={18} className="text-gold mt-1" />
              <div>
                <div className="font-semibold">Oui Tours & Travels</div>
                <div className="text-sm text-white/70">Latur, Maharashtra, India</div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl overflow-hidden border border-white/10">
            <iframe
              title="Latur Map"
              src="https://www.google.com/maps?q=Latur,Maharashtra&output=embed"
              className="w-full h-56" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>

        <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass rounded-3xl p-6 md:p-8 space-y-4 h-fit">
          <h3 className="text-2xl font-bold">Quick Booking Enquiry</h3>
          <p className="text-white/60 text-sm">Send us your details — we'll WhatsApp you a quote.</p>
          <div className="space-y-3">
            <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Your name" maxLength={80}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 outline-none focus:border-gold placeholder:text-white/40 text-white" />
            <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
              placeholder="Phone number" type="tel" maxLength={15} pattern="[0-9+\s-]{7,15}"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 outline-none focus:border-gold placeholder:text-white/40 text-white" />
            <textarea required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
              placeholder="Where would you like to go? (e.g. Latur → Tirupati, 6 pax, 25 Dec)" rows={4} maxLength={500}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/15 outline-none focus:border-gold placeholder:text-white/40 text-white" />
          </div>
          <button type="submit" className="btn-gold w-full">
            <MessageCircle size={16} /> Send Enquiry
          </button>
          <p className="text-xs text-white/50 text-center">By submitting you agree to be contacted via WhatsApp / Call.</p>
        </motion.form>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-secondary text-white/80">
    <div className="container-x px-4 md:px-8 py-14 grid md:grid-cols-4 gap-8">
      <div>
        <Logo />
        <p className="text-sm text-white/60 mt-4 max-w-xs">
          Premium cab & travel partner in Latur — trusted by thousands for safe, comfortable & affordable journeys.
        </p>
      </div>
      <div>
        <h4 className="font-bold text-white mb-4">Quick Links</h4>
        <ul className="space-y-2 text-sm">
          {["Home", "Cabs", "Services", "Tirupati", "Gallery", "Contact"].map(l =>
            <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-gold transition-colors">{l}</a></li>
          )}
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-white mb-4">Services</h4>
        <ul className="space-y-2 text-sm">
          {services.map(s => <li key={s.title} className="hover:text-gold transition-colors cursor-default">{s.title}</li>)}
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-white mb-4">Contact</h4>
        <ul className="space-y-2 text-sm">
          {PHONES.map(p => <li key={p}><a href={`tel:${p}`} className="hover:text-gold transition-colors">+91 {p}</a></li>)}
          <li className="flex items-center gap-2 pt-2"><Mail size={14} /> info@ouitours.in</li>
          <li className="flex items-center gap-2"><MapPin size={14} /> Latur, Maharashtra</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-white/10">
      <div className="container-x px-4 md:px-8 py-5 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-white/50">
        <span>© {new Date().getFullYear()} Oui Tours & Travels. All rights reserved.</span>
        <span>Crafted with ♥ in Latur</span>
      </div>
    </div>
  </footer>
);

const FloatingWhatsApp = () => (
  <a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="WhatsApp"
    className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-gold animate-pulse-gold hover:scale-110 transition-transform">
    <MessageCircle size={24} />
  </a>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Cabs />
        <Services />
        <Tirupati />
        <WhyUs />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
