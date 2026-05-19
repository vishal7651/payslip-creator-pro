import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, MessageCircle, Menu, X, Car, Plane, Train, MapPin, Mail,
  Shield, Clock, Sparkles, Users, Star, ChevronRight, Globe2, Award,
  Heart, CheckCircle2, ArrowRight, Calendar, Hotel, Navigation, Send,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

import heroCar from "@/assets/hero-car.jpg";
import tirupati from "@/assets/tirupati.jpg";
import dzire from "@/assets/dzire.jpg";
import ertiga from "@/assets/ertiga.jpg";
import carens from "@/assets/carens.jpg";
import innova from "@/assets/innova.jpg";
import tempo from "@/assets/tempo.jpg";
import bus from "@/assets/bus.jpg";
import flightImg from "@/assets/flight.jpg";
import trainImg from "@/assets/train.jpg";
import hotelImg from "@/assets/hotel.jpg";
import goaImg from "@/assets/goa.jpg";
import mumbaiImg from "@/assets/mumbai.jpg";
import hyderabadImg from "@/assets/hyderabad.jpg";
import puneImg from "@/assets/pune.jpg";
import shirdiImg from "@/assets/shirdi.jpg";

const PHONE_PRIMARY = "9028865606";
const PHONES = ["9028865606", "9373575656", "8928805660", "9890565606"];
const waLink = (msg: string) =>
  `https://wa.me/91${PHONE_PRIMARY}?text=${encodeURIComponent(msg)}`;
const WHATSAPP = waLink("Hello Ovi Tours & Travels, I'd like to enquire about a booking.");

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const } }),
};

const scrollTo = (id: string) => {
  const el = document.querySelector(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* ---------- DATA ---------- */
const cabs = [
  { name: "Swift Dzire", seats: 4, type: "AC", img: dzire, tag: "Sedan" },
  { name: "Ertiga", seats: 6, type: "AC", img: ertiga, tag: "MPV" },
  { name: "Kia Carens", seats: 6, type: "AC", img: carens, tag: "Premium" },
  { name: "Innova Crysta", seats: 7, type: "AC", img: innova, tag: "Luxury" },
  { name: "Tempo Traveller", seats: 12, type: "AC", img: tempo, tag: "Group" },
  { name: "17 Seater", seats: 17, type: "AC / Non-AC", img: tempo, tag: "Group" },
  { name: "26 Seater Bus", seats: 26, type: "AC", img: bus, tag: "Coach" },
  { name: "45 Seater Bus", seats: 45, type: "AC / Non-AC", img: bus, tag: "Coach" },
];

const services = [
  { icon: Plane, title: "Flight Tickets", desc: "Domestic & international flight bookings at best fares.", img: flightImg, target: "flight" },
  { icon: Train, title: "Rail Tickets", desc: "Fast confirmed Indian railway bookings across India.", img: trainImg, target: "train" },
  { icon: Sparkles, title: "Tirupati Darshan", desc: "Curated packages with VIP darshan & stay.", img: tirupati, target: "tour" },
  { icon: Hotel, title: "Hotel Booking", desc: "Handpicked premium hotels at best rates.", img: hotelImg, target: "tour" },
  { icon: Car, title: "Car Rentals", desc: "Local, outstation & airport transfers in premium vehicles.", img: heroCar, target: "tour" },
  { icon: Award, title: "Passport & Visa", desc: "End-to-end guidance for passport & visa.", img: flightImg, target: "tour" },
];

const features = [
  { icon: Heart, title: "Affordable Pricing", desc: "Transparent fares, no hidden charges." },
  { icon: Shield, title: "Safe & Trusted Drivers", desc: "Verified, courteous & experienced." },
  { icon: Clock, title: "24 / 7 Support", desc: "Round-the-clock assistance on call." },
  { icon: Sparkles, title: "Clean Vehicles", desc: "Sanitised & well-maintained fleet." },
  { icon: CheckCircle2, title: "On-Time Service", desc: "Punctual pickups, every single ride." },
  { icon: Users, title: "Family Friendly", desc: "Comfortable rides for every age." },
];

const destinations = [
  { name: "Tirupati", img: tirupati, tag: "Pilgrimage", price: "₹8,999", days: "3D / 2N",
    desc: "Divine darshan of Lord Venkateswara with VIP darshan assistance, comfortable AC travel and quality hotel stay near temple.",
    includes: ["AC vehicle travel", "Hotel stay near temple", "VIP Darshan guidance", "Pickup & drop"] },
  { name: "Goa", img: goaImg, tag: "Beach", price: "₹12,499", days: "4D / 3N",
    desc: "Sun-kissed beaches, water sports, vibrant nightlife and Portuguese heritage — a perfect coastal escape from Latur.",
    includes: ["Flight / train tickets", "Beach resort stay", "Sightseeing tours", "Airport transfers"] },
  { name: "Mumbai", img: mumbaiImg, tag: "Metro", price: "₹6,999", days: "2D / 1N",
    desc: "Gateway of India, Marine Drive, Bollywood studios — explore the city that never sleeps with a guided premium tour.",
    includes: ["AC sedan / SUV", "Hotel booking", "City sightseeing", "Local guide"] },
  { name: "Hyderabad", img: hyderabadImg, tag: "Heritage", price: "₹9,499", days: "3D / 2N",
    desc: "Charminar, Golconda Fort, Ramoji Film City and famous Hyderabadi cuisine — a royal Nizami experience.",
    includes: ["Train / cab travel", "Hotel stay", "Sightseeing", "Restaurant guidance"] },
  { name: "Pune", img: puneImg, tag: "Weekend", price: "₹4,499", days: "2D / 1N",
    desc: "Shaniwar Wada, Aga Khan Palace, hill stations nearby — perfect short break from Latur.",
    includes: ["AC cab", "Hotel", "Sightseeing", "Pickup & drop"] },
  { name: "Shirdi", img: shirdiImg, tag: "Pilgrimage", price: "₹5,999", days: "2D / 1N",
    desc: "Seek blessings at Sai Baba temple with hassle-free darshan, comfortable travel and quality hotel arrangement.",
    includes: ["AC vehicle", "Darshan assistance", "Hotel stay", "Aarti timing guidance"] },
];

const testimonials = [
  { name: "Rohit Patil", text: "Booked Innova for Tirupati Darshan — driver excellent, VIP darshan handled perfectly.", rating: 5 },
  { name: "Priya Deshmukh", text: "Tempo Traveller for our 14-person family trip was spotless and on time. Best in Latur!", rating: 5 },
  { name: "Aakash Kulkarni", text: "Airport transfer at 4 AM. Driver arrived 10 mins early. Best cab service.", rating: 5 },
  { name: "Sneha Joshi", text: "Goa package with flight & hotel. Stress-free planning end to end.", rating: 5 },
];

const galleryItems = [
  { src: flightImg, label: "Flight Bookings", h: "tall" },
  { src: tirupati, label: "Tirupati Darshan", h: "short" },
  { src: trainImg, label: "Rail Tickets", h: "short" },
  { src: goaImg, label: "Goa Holidays", h: "tall" },
  { src: hotelImg, label: "Premium Hotels", h: "short" },
  { src: shirdiImg, label: "Shirdi Pilgrimage", h: "tall" },
];

/* ---------- COMPONENTS ---------- */
const Logo = () => (
  <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo("#home"); }} className="flex items-center gap-2 group">
    <div className="relative w-10 h-10 rounded-xl bg-gradient-gold grid place-items-center shadow-gold">
      <span className="font-black text-secondary text-lg">O</span>
      <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-secondary border-2 border-gold" />
    </div>
    <div className="leading-tight">
      <div className="font-extrabold tracking-tight text-base md:text-lg">Ovi Tours</div>
      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">& Travels · Latur</div>
    </div>
  </a>
);

const Navbar = ({ onBook }: { onBook: () => void }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ["home", "booking", "services", "destinations", "tirupati", "contact"];
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 120 && r.bottom >= 120) { setActive(s); break; }
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { label: "Home", href: "home" },
    { label: "Booking", href: "booking" },
    { label: "Services", href: "services" },
    { label: "Destinations", href: "destinations" },
    { label: "Tirupati", href: "tirupati" },
    { label: "Contact", href: "contact" },
  ];
  const go = (h: string) => { scrollTo("#" + h); setOpen(false); };
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
      <div className={`container-x flex items-center justify-between px-4 md:px-8 rounded-2xl transition-all duration-300 ${scrolled ? "glass-light shadow-soft py-2" : ""}`}>
        <Logo />
        <nav className="hidden lg:flex items-center gap-1">
          {links.map(l => (
            <button key={l.href} onClick={() => go(l.href)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${active === l.href ? "bg-accent text-foreground" : "text-foreground/70 hover:text-foreground hover:bg-accent"}`}>
              {l.label}
            </button>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <a href={`tel:${PHONE_PRIMARY}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border border-border hover:border-gold transition-colors">
            <Phone size={14} /> Call
          </a>
          <button onClick={onBook} className="btn-gold !py-2 !px-4 text-sm">
            <Calendar size={16} /> Book Now
          </button>
        </div>
        <button onClick={() => setOpen(v => !v)} className="lg:hidden md:ml-2 p-2 rounded-lg border border-border" aria-label="Menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="lg:hidden container-x mt-2 px-4">
            <div className="glass-light rounded-2xl p-4 flex flex-col gap-1 shadow-soft">
              {links.map(l => (
                <button key={l.href} onClick={() => go(l.href)}
                  className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${active === l.href ? "bg-accent" : "hover:bg-accent"}`}>
                  {l.label}
                </button>
              ))}
              <div className="flex gap-2 pt-2">
                <a href={`tel:${PHONE_PRIMARY}`} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border border-border">
                  <Phone size={14} /> Call
                </a>
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-gold flex-1 !py-2 text-sm">
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const heroSlides = [heroCar, goaImg, tirupati, mumbaiImg];

const Hero = ({ onBook }: { onBook: () => void }) => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="home" className="relative min-h-[100svh] flex items-center pt-28 md:pt-32 pb-16 overflow-hidden text-white">
      {heroSlides.map((src, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-[1500ms] ${idx === i ? "opacity-100" : "opacity-0"}`}>
          <img src={src} alt="Travel" className="w-full h-full object-cover" />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-secondary/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
      <div className="container-x relative px-4 md:px-8">
        <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-3xl space-y-6">
          <span className="eyebrow"><Sparkles size={14} /> Latur · Maharashtra</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05]">
            Your Trusted <span className="gold-text">Travel Partner</span><br /> From Latur
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl">
            Flight Tickets • Rail Tickets • Tirupati Darshan • Hotels • Car Rentals • Passport & Visa Guidance
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button onClick={onBook} className="btn-gold"><Calendar size={16} /> Book Now</button>
            <button onClick={() => scrollTo("#destinations")} className="btn-ghost-light"><Globe2 size={16} /> Explore</button>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-ghost-light"><MessageCircle size={16} /> WhatsApp</a>
          </div>
          <div className="flex flex-wrap gap-4 pt-4 text-sm text-white/70">
            {["12,500+ Travellers", "4.9★ Rated", "24/7 Support", "Trusted Since"].map(n => (
              <div key={n} className="flex items-center gap-2"><CheckCircle2 size={14} className="text-gold" /> {n}</div>
            ))}
          </div>
        </motion.div>
        <div className="absolute right-6 bottom-8 hidden md:flex gap-2">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} aria-label={`slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-gold" : "w-4 bg-white/40"}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- BOOKING FORMS ---------- */
type Field = { name: string; label: string; type?: string; placeholder?: string };

const flightFields: Field[] = [
  { name: "from", label: "From", placeholder: "Origin city" },
  { name: "to", label: "To", placeholder: "Destination city" },
  { name: "depart", label: "Departure Date", type: "date" },
  { name: "ret", label: "Return Date", type: "date" },
  { name: "pax", label: "Passenger Count", type: "number", placeholder: "1" },
  { name: "mobile", label: "Mobile Number", type: "tel", placeholder: "+91 XXXXXXXXXX" },
];
const trainFields: Field[] = [
  { name: "from", label: "Boarding Station", placeholder: "e.g. Latur" },
  { name: "to", label: "Destination", placeholder: "e.g. Mumbai" },
  { name: "date", label: "Travel Date", type: "date" },
  { name: "cls", label: "Class Type", placeholder: "Sleeper / 3AC / 2AC" },
  { name: "pax", label: "Passenger Count", type: "number", placeholder: "1" },
  { name: "mobile", label: "Mobile Number", type: "tel", placeholder: "+91 XXXXXXXXXX" },
];
const tourFields: Field[] = [
  { name: "dest", label: "Tour Destination", placeholder: "e.g. Tirupati, Goa" },
  { name: "date", label: "Travel Date", type: "date" },
  { name: "pax", label: "Number of People", type: "number", placeholder: "1" },
  { name: "vehicle", label: "Vehicle Type", placeholder: "Sedan / SUV / Tempo / Bus" },
  { name: "pickup", label: "Pickup Location", placeholder: "Pickup address" },
  { name: "mobile", label: "Mobile Number", type: "tel", placeholder: "+91 XXXXXXXXXX" },
];

const BookingForm = ({ kind, fields, btn }: { kind: string; fields: Field[]; btn: string }) => {
  const [data, setData] = useState<Record<string, string>>({});
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.mobile || data.mobile.length < 10) { toast.error("Please enter a valid mobile number"); return; }
    const summary = fields.map(f => `${f.label}: ${data[f.name] || "-"}`).join("\n");
    const msg = `*${kind} Booking Enquiry*\n\n${summary}\n\nPlease share quote.`;
    window.open(waLink(msg), "_blank");
    toast.success("Opening WhatsApp with your enquiry...");
  };
  return (
    <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4">
      {fields.map(f => (
        <div key={f.name} className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">{f.label}</label>
          <input
            type={f.type || "text"} required placeholder={f.placeholder}
            value={data[f.name] || ""} maxLength={120}
            onChange={(e) => setData({ ...data, [f.name]: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-gold outline-none text-sm transition-colors"
          />
        </div>
      ))}
      <button type="submit" className="btn-gold sm:col-span-2 mt-2">
        <Send size={16} /> {btn}
      </button>
    </form>
  );
};

const Booking = () => (
  <section id="booking" className="section bg-gradient-to-b from-muted/40 to-background">
    <div className="container-x">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-10">
        <span className="eyebrow"><Calendar size={14} /> Booking</span>
        <h2 className="text-3xl md:text-5xl font-extrabold mt-3">Quick <span className="gold-text">Booking</span></h2>
        <p className="text-muted-foreground mt-4">Choose your service and send us your details — we'll WhatsApp you a confirmed quote.</p>
      </motion.div>
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}
        className="max-w-4xl mx-auto bg-card border border-border rounded-3xl p-5 md:p-8 shadow-soft">
        <Tabs defaultValue="flight" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-muted rounded-2xl">
            <TabsTrigger value="flight" className="py-3 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Plane size={16} className="mr-2" />Flight
            </TabsTrigger>
            <TabsTrigger value="train" className="py-3 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Train size={16} className="mr-2" />Train
            </TabsTrigger>
            <TabsTrigger value="tour" className="py-3 rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Car size={16} className="mr-2" />Tour
            </TabsTrigger>
          </TabsList>
          <TabsContent value="flight" className="mt-6">
            <BookingForm kind="Flight" fields={flightFields} btn="Book Flight" />
          </TabsContent>
          <TabsContent value="train" className="mt-6">
            <BookingForm kind="Train" fields={trainFields} btn="Book Train Ticket" />
          </TabsContent>
          <TabsContent value="tour" className="mt-6">
            <BookingForm kind="Tour & Travel" fields={tourFields} btn="Book Tour" />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  </section>
);

/* ---------- SERVICES ---------- */
const Services = ({ onBook }: { onBook: (tab?: string) => void }) => (
  <section id="services" className="section relative overflow-hidden">
    <div className="container-x relative">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
        <span className="eyebrow"><Sparkles size={14} /> What We Offer</span>
        <h2 className="text-3xl md:text-5xl font-extrabold mt-3">Premium <span className="gold-text">Travel Services</span></h2>
        <p className="text-muted-foreground mt-4">One trusted partner for all your travel needs — from city rides to international holidays.</p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((s, i) => (
          <motion.div key={s.title} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} variants={fadeUp}
            className="group rounded-3xl overflow-hidden bg-card border border-border hover:border-gold hover:shadow-gold hover:-translate-y-1 transition-all duration-500">
            <div className="aspect-[16/10] overflow-hidden">
              <img src={s.img} alt={s.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-gold grid place-items-center shadow-gold">
                  <s.icon className="text-secondary" size={20} />
                </div>
                <h3 className="text-lg font-bold">{s.title}</h3>
              </div>
              <p className="text-muted-foreground text-sm">{s.desc}</p>
              <button onClick={() => onBook(s.target)} className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-foreground hover:text-gold">
                Book Now <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- DESTINATIONS ---------- */
const Destinations = () => {
  const [open, setOpen] = useState<typeof destinations[number] | null>(null);
  return (
    <section id="destinations" className="section bg-muted/40">
      <div className="container-x">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
          <span className="eyebrow"><MapPin size={14} /> Top Destinations</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3">Popular <span className="gold-text">Tour Packages</span></h2>
          <p className="text-muted-foreground mt-4">Curated destinations loved by travellers from Latur.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((d, i) => (
            <motion.button
              key={d.name} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i} variants={fadeUp}
              onClick={() => setOpen(d)}
              className="text-left group relative rounded-3xl overflow-hidden bg-card border border-border hover:border-gold transition-all duration-500 hover:-translate-y-1 hover:shadow-gold"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={d.img} alt={d.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gold text-secondary text-[10px] font-bold uppercase tracking-wider">{d.tag}</div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">{d.name}</h3>
                  <span className="text-xs text-muted-foreground">{d.days}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-gold font-extrabold text-lg">{d.price}<span className="text-xs text-muted-foreground font-medium"> / pax</span></span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-foreground group-hover:text-gold">Details <ArrowRight size={14} /></span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden">
          {open && (
            <>
              <div className="aspect-[16/9] overflow-hidden">
                <img src={open.img} alt={open.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 space-y-4">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-extrabold">{open.name} <span className="text-sm text-muted-foreground font-medium">· {open.days}</span></DialogTitle>
                  <DialogDescription className="text-base text-foreground/70">{open.desc}</DialogDescription>
                </DialogHeader>
                <div className="grid sm:grid-cols-2 gap-2">
                  {open.includes.map(inc => (
                    <div key={inc} className="flex items-center gap-2 text-sm"><CheckCircle2 size={14} className="text-gold" /> {inc}</div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div>
                    <div className="text-xs text-muted-foreground">Starting from</div>
                    <div className="text-2xl font-extrabold gold-text">{open.price}<span className="text-sm text-muted-foreground font-medium"> / pax</span></div>
                  </div>
                  <a href={waLink(`Hi Ovi Tours, I'd like to book the ${open.name} package (${open.days}, ${open.price}/pax). Please share details.`)}
                     target="_blank" rel="noreferrer" className="btn-gold">
                    <MessageCircle size={16} /> Book Now
                  </a>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

/* ---------- CABS ---------- */
const Cabs = () => (
  <section id="cabs" className="section">
    <div className="container-x">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
        <span className="eyebrow"><Car size={14} /> Our Fleet</span>
        <h2 className="text-3xl md:text-5xl font-extrabold mt-3">Cabs & <span className="gold-text">Coaches</span></h2>
        <p className="text-muted-foreground mt-4">From compact sedans to 45-seater luxury buses — the right ride for every occasion.</p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cabs.map((c, i) => (
          <motion.div key={c.name} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} custom={i} variants={fadeUp}
            className="group rounded-3xl overflow-hidden bg-card border border-border hover:border-gold transition-all duration-500 hover:-translate-y-1 hover:shadow-gold">
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img src={c.img} alt={c.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold">{c.name}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent font-semibold uppercase tracking-wider">{c.tag}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Users size={12} /> {c.seats}</span>
                <span className="flex items-center gap-1"><Sparkles size={12} /> {c.type}</span>
              </div>
              <a href={waLink(`Hi Ovi Tours, I'd like to book ${c.name}. Please share fare.`)} target="_blank" rel="noreferrer"
                 className="inline-flex items-center justify-center w-full gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-semibold text-sm hover:bg-gold hover:text-secondary transition-colors">
                Book <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- TIRUPATI ---------- */
const Tirupati = () => (
  <section id="tirupati" className="section relative overflow-hidden text-white">
    <div className="absolute inset-0">
      <img src={tirupati} alt="Tirupati Balaji Temple" loading="lazy" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/85 to-secondary/40" />
    </div>
    <div className="container-x relative grid md:grid-cols-2 gap-10 items-center">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
        <span className="eyebrow !text-gold"><Sparkles size={14} /> Featured Package</span>
        <h2 className="text-3xl md:text-5xl font-extrabold mt-3">Tirupati <span className="gold-text">Darshan</span> Package</h2>
        <p className="text-white/80 mt-4 max-w-lg">
          A divine journey planned with care — comfortable travel, quality hotel stays, and VIP darshan
          assistance so your pilgrimage stays spiritual, not stressful.
        </p>
        <ul className="mt-6 space-y-3">
          {["Comfortable travel by AC vehicles","Quality hotel stay near temple","VIP Darshan guidance & support","Group booking & family packages"].map(t => (
            <li key={t} className="flex items-center gap-3 text-white/85">
              <span className="w-6 h-6 rounded-full bg-gold/20 grid place-items-center"><CheckCircle2 size={14} className="text-gold" /></span>
              {t}
            </li>
          ))}
        </ul>
        <a href={waLink("Hi Ovi Tours, I'm interested in the Tirupati Darshan package. Please share details.")}
           target="_blank" rel="noreferrer" className="btn-gold mt-8 animate-pulse-gold">
          Book Tirupati Package <ArrowRight size={16} />
        </a>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="hidden md:block">
        <div className="grid grid-cols-2 gap-4">
          {[{ k: "12,000+", v: "Pilgrims served" },{ k: "VIP", v: "Darshan support" },{ k: "4 Days", v: "Avg. package" },{ k: "24/7", v: "On-trip support" }].map(s => (
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

/* ---------- WHY US ---------- */
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

/* ---------- GALLERY ---------- */
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
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <span className="text-white font-bold">{g.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- TESTIMONIALS ---------- */
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
          <div key={i} className="w-[300px] md:w-[420px] bg-card border border-border rounded-3xl p-6 shadow-soft shrink-0">
            <div className="flex items-center gap-1 text-gold mb-3">
              {Array.from({ length: t.rating }).map((_, k) => <Star key={k} size={16} fill="currentColor" />)}
            </div>
            <p className="text-foreground/80 text-sm">"{t.text}"</p>
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

/* ---------- CONTACT ---------- */
const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.phone.length < 10) { toast.error("Please enter a valid phone number"); return; }
    const text = `Hi, I'm ${form.name} (${form.phone}). ${form.message}`;
    window.open(waLink(text), "_blank");
    toast.success("Opening WhatsApp...");
  };
  return (
    <section id="contact" className="section bg-gradient-dark text-white relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-gold opacity-20 blur-3xl rounded-full" />
      <div className="container-x relative grid md:grid-cols-2 gap-10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
          <span className="eyebrow"><Phone size={14} /> Get in touch</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3">Let's plan your <span className="gold-text">next trip</span></h2>
          <p className="text-white/70 mt-4 max-w-md">Call, WhatsApp or fill the form — our team responds within minutes.</p>

          <div className="mt-8 space-y-3">
            {PHONES.map(p => (
              <a key={p} href={`tel:${p}`} className="flex items-center justify-between glass rounded-2xl px-5 py-4 hover:bg-white/15 transition-colors">
                <span className="flex items-center gap-3"><Phone size={18} className="text-gold" /> +91 {p}</span>
                <span className="text-xs uppercase tracking-wider text-white/60">Tap to call</span>
              </a>
            ))}
            <div className="grid grid-cols-2 gap-3">
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 glass rounded-2xl px-5 py-4 hover:bg-white/15 transition-colors text-sm font-semibold">
                <MessageCircle size={18} className="text-gold" /> WhatsApp
              </a>
              <a href="https://www.google.com/maps?q=Latur,Maharashtra" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 glass rounded-2xl px-5 py-4 hover:bg-white/15 transition-colors text-sm font-semibold">
                <Navigation size={18} className="text-gold" /> Directions
              </a>
            </div>
            <div className="flex items-start gap-3 glass rounded-2xl px-5 py-4">
              <MapPin size={18} className="text-gold mt-1" />
              <div>
                <div className="font-semibold">Ovi Tours & Travels</div>
                <div className="text-sm text-white/70">Latur, Maharashtra, India</div>
                <div className="text-xs text-white/60 mt-1 flex items-center gap-2"><Clock size={12} /> Open 24/7</div>
                <div className="text-xs text-white/60 flex items-center gap-2"><Mail size={12} /> info@ovitours.in</div>
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
          <h3 className="text-2xl font-bold">Quick Enquiry</h3>
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

/* ---------- FOOTER ---------- */
const Footer = () => (
  <footer className="bg-secondary text-white/80">
    <div className="container-x px-4 md:px-8 py-14 grid md:grid-cols-4 gap-8">
      <div>
        <Logo />
        <p className="text-sm text-white/60 mt-4 max-w-xs">
          Premium cab & travel partner in Latur — trusted by thousands for safe, comfortable & affordable journeys.
        </p>
        <a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-4 text-sm text-gold hover:underline">
          <MessageCircle size={14} /> Chat on WhatsApp
        </a>
      </div>
      <div>
        <h4 className="font-bold text-white mb-4">Quick Links</h4>
        <ul className="space-y-2 text-sm">
          {[
            { l: "Home", h: "home" }, { l: "Booking", h: "booking" }, { l: "Services", h: "services" },
            { l: "Destinations", h: "destinations" }, { l: "Tirupati", h: "tirupati" }, { l: "Contact", h: "contact" },
          ].map(x =>
            <li key={x.h}><button onClick={() => scrollTo("#" + x.h)} className="hover:text-gold transition-colors">{x.l}</button></li>
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
          <li className="flex items-center gap-2 pt-2"><Mail size={14} /> info@ovitours.in</li>
          <li className="flex items-center gap-2"><MapPin size={14} /> Latur, Maharashtra</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-white/10">
      <div className="container-x px-4 md:px-8 py-5 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-white/50">
        <span>© {new Date().getFullYear()} Ovi Tours & Travels. All rights reserved.</span>
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

/* ---------- PAGE ---------- */
const Index = () => {
  const goBooking = (_tab?: string) => scrollTo("#booking");
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar onBook={() => goBooking()} />
      <main>
        <Hero onBook={() => goBooking()} />
        <Booking />
        <Services onBook={goBooking} />
        <Destinations />
        <Cabs />
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
