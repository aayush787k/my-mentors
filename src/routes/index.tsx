import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast, Toaster } from "sonner";
import vivekAsset from "@/assets/vivek-singh.png.asset.json";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Compass,
  Facebook,
  FileText,
  GraduationCap,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Quote,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
  Wallet,
  X,
  Youtube,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const VIVEK = vivekAsset.url;

const NAV = [
  { label: "Programs", href: "#programs" },
  { label: "Why MMT", href: "#why" },
  { label: "Batches", href: "#courses" },
  { label: "Mentors", href: "#mentors" },
  { label: "Success", href: "#success" },
  { label: "Contact", href: "#contact" },
];

const WHATSAPP = "https://wa.me/917290900023";
const PHONE_1 = "+91 72909 00023";
const PHONE_2 = "+91 78951 74420";
const EMAIL = "admissions@mymentors.in";

const MARQUEE = [
  "CBSE", "ICSE", "SSC CGL", "SSC CHSL", "SSC GD", "IBPS Bank PO",
  "CTET", "HTET", "UPTET", "Delhi Police", "NDA", "Online MBA",
  "B.Ed", "BCA", "MCA", "M.Com", "M.Sc",
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-center" richColors />
      <Nav />
      <Hero />
      <Marquee />
      <Programs />
      <WhyUs />
      <Courses />
      <Mentors />
      <Success />
      <DemoCta />
      <Process />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}

/* -------------------- helpers -------------------- */

function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current || visible) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);
  return { ref, visible };
}

function Counter({ end, suffix = "", duration = 1600 }: { end: number; suffix?: string; duration?: number }) {
  const { ref, visible } = useReveal<HTMLSpanElement>();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(end * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, end, duration]);
  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

function SectionTitle({
  eyebrow,
  title,
  sub,
  align = "center",
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary">
        <Sparkles className="h-3.5 w-3.5" />
        {eyebrow}
      </span>
      <h2 className="mt-5 text-4xl font-normal leading-tight sm:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-base text-muted-foreground sm:text-lg">{sub}</p>}
    </div>
  );
}

/* -------------------- Nav -------------------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border/60 shadow-[0_4px_24px_-12px_rgba(30,60,140,0.15)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="grid h-10 w-10 place-items-center rounded-xl btn-gradient text-primary-foreground shadow-md">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="text-base font-semibold tracking-tight">MYMENTORS <span className="text-primary">(MMT)</span></div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Don't Fikar, Hai Na MYMENTORS</div>
          </div>
        </a>
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={`tel:${PHONE_1.replace(/\s/g, "")}`}
            aria-label="Call now"
            className="hidden sm:grid h-11 w-11 place-items-center rounded-full border border-border bg-white/70 text-primary hover:bg-white"
          >
            <Phone className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 rounded-full btn-gradient px-5 py-2.5 text-sm font-semibold"
          >
            Book Free Demo
            <ArrowRight className="h-4 w-4" />
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-background/80 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl flex-col px-5 py-4 sm:px-8">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-foreground/80 hover:bg-accent"
              >
                {n.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full btn-gradient px-5 py-3 text-sm font-semibold"
            >
              Book Free Demo
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* -------------------- Hero -------------------- */

function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-float" />
      <div className="pointer-events-none absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full bg-primary-glow/30 blur-3xl animate-float" style={{ animationDelay: "-3s" }} />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/60 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary backdrop-blur">
            <Rocket className="h-3.5 w-3.5" />
            Admissions Open 2026–27
            <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] text-primary-foreground">New</span>
          </span>
          <h1 className="mt-6 text-5xl font-normal leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            India's <span className="gradient-text">Growing</span> Learning Platform
          </h1>
          <p className="mt-6 text-lg font-medium text-foreground/80">
            Welcome to <span className="text-primary font-semibold">MYMENTORS (MMT)</span>
          </p>
          <ul className="mt-4 space-y-1.5 text-base text-muted-foreground">
            <li>Foundation • Competition • Admission Guidance</li>
            <li>Class 9th to 12th</li>
            <li>SSC • Banking • CTET • TET</li>
            <li>Online MBA • B.Ed • BCA • MCA</li>
            <li>Career Counselling & Admissions</li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full btn-gradient px-6 py-3 text-sm font-semibold">
              <Calendar className="h-4 w-4" /> Book Free Demo
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:opacity-90">
              <Sparkles className="h-4 w-4" /> Apply Now
            </a>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[hsl(142,72%,42%)] px-6 py-3 text-sm font-semibold text-white hover:opacity-90">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a href={`tel:${PHONE_1.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-6 py-3 text-sm font-semibold backdrop-blur hover:bg-white">
              <Phone className="h-4 w-4" /> Call Now
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { n: 5000, s: "+", l: "Students Guided" },
              { n: 1000, s: "+", l: "Selections" },
              { n: 95, s: "%", l: "Success Rate" },
              { n: 10, s: "+", l: "Years Experience" },
            ].map((s) => (
              <div key={s.l} className="glass-card rounded-2xl px-4 py-4 text-center">
                <div className="text-2xl font-semibold gradient-text sm:text-3xl">
                  <Counter end={s.n} suffix={s.s} />
                </div>
                <div className="mt-1 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <div className="relative overflow-hidden rounded-[2rem] shadow-[var(--shadow-elegant)]" style={{ background: "var(--gradient-primary)" }}>
            <img
              src={VIVEK}
              alt="Vivek Singh — Founder, MYMENTORS"
              className="h-[560px] w-full object-cover object-top"
              loading="eager"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6 text-white">
              <div className="text-xs uppercase tracking-widest text-white/70">Founder</div>
              <div className="mt-1 text-2xl font-semibold">Vivek Singh</div>
              <div className="text-xs text-white/80">Founder · Maths Expert · MYMENTORS Tutorial</div>
            </div>
          </div>

          <div className="glass-card absolute -top-4 -left-4 max-w-[15rem] rounded-2xl p-4 animate-float">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Top Ranker</div>
                <div className="text-sm font-semibold">AIR 47 · SSC CGL</div>
              </div>
            </div>
          </div>

          <div className="glass-card absolute -bottom-4 -right-4 max-w-[16rem] rounded-2xl p-4 animate-float" style={{ animationDelay: "-2s" }}>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Star className="h-5 w-5 fill-current" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Parent Rating</div>
                <div className="text-sm font-semibold">4.9 / 5 · 1.2k reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Marquee -------------------- */

function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="border-y border-border/60 bg-secondary/40 py-4 overflow-hidden">
      <div className="flex gap-8 whitespace-nowrap animate-[marquee_35s_linear_infinite]">
        {items.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {t}
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
}

/* -------------------- Programs (Three Pillars) -------------------- */

const PROGRAMS = [
  {
    tag: "01 / 03",
    kicker: "Foundation Classes",
    title: "Class 6th to 12th",
    sub: "CBSE · ICSE · State Board",
    items: [
      "Science — Physics, Chemistry, Bio, Maths",
      "Commerce — Accounts, BST, Eco, Maths",
      "Humanities — History, Pol Sci, Geo, Socio",
      "Maths Special Batch",
      "3 Free Demo Classes on Tuesday",
    ],
    cta: "Explore Foundation",
    icon: BookOpen,
  },
  {
    tag: "02 / 03",
    kicker: "Competition Classes",
    title: "SSC · Bank · Teaching · Defence",
    sub: "Complete Preparation Under Expert Faculty",
    items: [
      "SSC GD · Clerk · CHSL · CGL",
      "Bank PO (IBPS / SBI)",
      "CDS · NDA",
      "CTET · HTET · UPTET",
      "Delhi Police",
    ],
    cta: "Start Preparation",
    icon: Target,
  },
  {
    tag: "03 / 03",
    kicker: "Admission Guidance",
    title: "Online MBA · B.Ed · BCA & more",
    sub: "Career Counselling & University Admission",
    items: [
      "MBA · MCA · M.Com · B.Ed",
      "M.Sc · B.Pharm · BCA · BBA",
      "Mangalayatan · Manav Rachna · Subharti",
      "Amity University · UPGRAD",
      "End-to-end Counselling",
    ],
    cta: "Get Counselling",
    icon: Compass,
  },
];

function Programs() {
  return (
    <section id="programs" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          eyebrow="Featured Programs"
          title={<>Three pillars, <span className="gradient-text">one platform</span></>}
          sub="From foundation to selection to admission — everything a student needs, under one roof."
        />
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PROGRAMS.map(({ tag, kicker, title, sub, items, cta, icon: Icon }) => (
            <article
              key={title}
              className="group relative flex flex-col rounded-3xl border border-border/70 bg-white/70 p-7 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-elegant)] hover:border-primary/30"
            >
              <div className="flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-2xl btn-gradient text-primary-foreground shadow-md">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">{tag}</span>
              </div>
              <div className="mt-5 text-[11px] font-medium uppercase tracking-widest text-primary">{kicker}</div>
              <h3 className="mt-2 text-2xl">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
              <ul className="mt-5 flex-1 space-y-2">
                {items.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-transform group-hover:translate-x-1">
                {cta} <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Why Us (10 reasons) -------------------- */

const WHY = [
  { icon: Brain, t: "Expert Faculty", d: "10+ yrs seasoned mentors from top institutes." },
  { icon: ClipboardList, t: "Weekly Tests", d: "Chapter-wise + full length with detailed analysis." },
  { icon: FileText, t: "Printed Notes", d: "Concise, exam-ready notes crafted by experts." },
  { icon: Users, t: "Personal Mentorship", d: "1-on-1 mentor calls & study plans." },
  { icon: Compass, t: "Career Guidance", d: "Aptitude tests + expert career mapping." },
  { icon: GraduationCap, t: "Small Batch Size", d: "Max 25 students — real attention, real growth." },
  { icon: Wallet, t: "Affordable Fees", d: "Transparent pricing, easy EMI options." },
  { icon: MessageCircle, t: "Parent Reporting", d: "Weekly parent WhatsApp progress reports." },
  { icon: ShieldCheck, t: "Performance Tracking", d: "Live dashboard for tests & attendance." },
  { icon: Sparkles, t: "Doubt Support", d: "24-hour doubt resolution on chat & calls." },
];

function WhyUs() {
  return (
    <section id="why" className="relative py-24 sm:py-32 bg-gradient-to-b from-transparent via-secondary/40 to-transparent">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          eyebrow="Why MYMENTORS"
          title={<>Built for <span className="gradient-text">real outcomes</span>, not just lectures</>}
          sub="Ten reasons students and parents choose MMT over the rest."
        />
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {WHY.map(({ icon: Icon, t, d }, i) => (
            <div key={t} className="glass-card rounded-3xl p-6 transition-transform duration-500 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-4 text-base font-semibold">{t}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Live Courses / Batches -------------------- */

const BATCHES = [
  { tag: "FOUNDATION", title: "Class 10 CBSE — All Subjects", duration: "10 Months", faculty: "MMT Core Faculty", mode: "Offline + Online" },
  { tag: "FOUNDATION", title: "Class 12 Science PCM", duration: "11 Months", faculty: "Vivek Singh & Team", mode: "Hybrid" },
  { tag: "COMPETITION", title: "SSC CGL 2026 Complete", duration: "8 Months", faculty: "Expert Panel", mode: "Online Live" },
  { tag: "COMPETITION", title: "IBPS Bank PO / Clerk", duration: "6 Months", faculty: "Banking Cell", mode: "Online Live" },
  { tag: "COMPETITION", title: "CTET / HTET / UPTET Combo", duration: "5 Months", faculty: "Teaching Cell", mode: "Recorded + Live" },
  { tag: "ADMISSION", title: "Online MBA Admission Support", duration: "Lifetime Guidance", faculty: "Counselling Cell", mode: "1-on-1" },
  { tag: "ADMISSION", title: "B.Ed Distance Admission", duration: "Lifetime Guidance", faculty: "Counselling Cell", mode: "1-on-1" },
  { tag: "FOUNDATION", title: "Spoken English & Personality", duration: "3 Months", faculty: "Sunny Dayal", mode: "Offline + Online" },
];

const TAG_STYLES: Record<string, string> = {
  FOUNDATION: "bg-primary/10 text-primary",
  COMPETITION: "bg-[hsl(24,90%,55%)]/15 text-[hsl(24,90%,45%)]",
  ADMISSION: "bg-[hsl(280,70%,55%)]/15 text-[hsl(280,70%,45%)]",
};

function Courses() {
  return (
    <section id="courses" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          eyebrow="Live Courses"
          title={<>Enrol in a batch that <span className="gradient-text">fits your goal</span></>}
          sub="Active batches — offline classrooms & online live streams."
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BATCHES.map((b) => (
            <article
              key={b.title}
              className="group flex flex-col rounded-3xl border border-border/70 bg-white/80 p-6 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-elegant)] hover:border-primary/30"
            >
              <span className={`inline-flex w-fit rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest ${TAG_STYLES[b.tag]}`}>{b.tag}</span>
              <h3 className="mt-4 text-lg font-semibold leading-snug">{b.title}</h3>
              <dl className="mt-5 flex-1 space-y-2 text-sm">
                <div className="flex justify-between border-b border-border/60 pb-2">
                  <dt className="text-muted-foreground">Duration</dt>
                  <dd className="font-medium">{b.duration}</dd>
                </div>
                <div className="flex justify-between border-b border-border/60 pb-2">
                  <dt className="text-muted-foreground">Faculty</dt>
                  <dd className="font-medium text-right">{b.faculty}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Mode</dt>
                  <dd className="font-medium">{b.mode}</dd>
                </div>
              </dl>
              <a href="#contact" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full btn-gradient px-4 py-2.5 text-sm font-semibold">
                Enrol Now <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Mentors -------------------- */

const MENTORS = [
  {
    name: "Vivek Singh",
    role: "Founder · Mathematics Expert",
    img: "/vivek-singh.png"
    bullets: [
      "Founder — MYMENTORS Tutorial",
      "Board & Competitive Maths Specialist",
      "10+ Yrs Teaching Experience",
      "Mukherjee Nagar Team Alumni",
    ],
  },
  {
    name: "Sunny Dayal",
    role: "English Communication Trainer",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
    bullets: [
      "Spoken English Batch Head",
      "Personality Development",
      "SEWA · Spoken · Workshop · Adda",
    ],
  },
];

function Mentors() {
  return (
    <section id="mentors" className="relative py-24 sm:py-32 bg-gradient-to-b from-transparent via-secondary/40 to-transparent">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          eyebrow="Meet Your Mentors"
          title={<>Learn from people who <span className="gradient-text">actually care</span></>}
          sub="Real mentors, real classrooms, real results."
        />
        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {MENTORS.map((m) => (
            <div key={m.name} className="group relative overflow-hidden rounded-[2rem] border border-border/60 bg-white shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-elegant)]">
              <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr]">
                <div className="relative h-64 sm:h-full" style={{ background: "var(--gradient-primary)" }}>
                  <img src={m.img} alt={m.name} loading="lazy" className="h-full w-full object-cover object-top" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold">{m.name}</h3>
                  <p className="text-sm text-primary">{m.role}</p>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {m.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {b}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Book a session <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Success Dashboard -------------------- */

const RANKERS = [
  { i: "A", name: "Ananya Sharma", ex: "SSC CGL 2025 · 205/240", badge: "AIR 47" },
  { i: "R", name: "Rohit Verma", ex: "CBSE Class 12 · Science", badge: "97.8%" },
  { i: "P", name: "Priya Yadav", ex: "IBPS PO 2025 · Union Bank", badge: "Selected" },
  { i: "A", name: "Aman Kumar", ex: "CTET Paper 2 · Maths & Sci", badge: "Qualified" },
];

const REVIEWS = [
  { q: "The weekly reports and small batch size changed how my daughter studies. Best decision.", n: "Meera J.", r: "Parent" },
  { q: "MMT's SSC batch is next level. Faculty explains concepts + tricks together.", n: "Kartik S.", r: "Student" },
  { q: "Got my Online MBA admission sorted end-to-end. Zero stress, full support.", n: "Neha P.", r: "Working Professional" },
];

function Success() {
  return (
    <section id="success" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          eyebrow="Success Dashboard"
          title={<>Results speak. <span className="gradient-text">Loudly.</span></>}
          sub="A live snapshot of what our students are achieving this season."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="glass-card rounded-3xl p-6 lg:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Top Rankers</h3>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-primary">2025 Batch</span>
            </div>
            <ul className="divide-y divide-border/60">
              {RANKERS.map((r, i) => (
                <li key={i} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full btn-gradient text-sm font-semibold text-primary-foreground">{r.i}</div>
                    <div>
                      <div className="text-sm font-semibold">{r.name}</div>
                      <div className="text-xs text-muted-foreground">{r.ex}</div>
                    </div>
                  </div>
                  <span className="rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background">{r.badge}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-3xl p-6 text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <h3 className="text-lg font-semibold text-white">This Season</h3>
            <div className="mt-6 space-y-5">
              {[
                { l: "Selections", n: 1000 },
                { l: "Board Toppers", n: 120 },
                { l: "5★ Reviews", n: 850 },
              ].map((s) => (
                <div key={s.l} className="flex items-center justify-between border-b border-white/15 pb-3">
                  <span className="text-sm text-white/85">{s.l}</span>
                  <span className="text-2xl font-semibold text-white">
                    <Counter end={s.n} suffix="+" />
                  </span>
                </div>
              ))}
            </div>
            <a href="#contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/25">
              Watch video reviews <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure key={r.n} className="glass-card flex h-full flex-col rounded-3xl p-7">
              <Quote className="h-7 w-7 text-primary/60" />
              <blockquote className="mt-3 flex-1 text-base leading-relaxed text-foreground/85">"{r.q}"</blockquote>
              <figcaption className="mt-5 border-t border-border/60 pt-4">
                <div className="text-sm font-semibold">{r.n}</div>
                <div className="text-xs text-muted-foreground">{r.r}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Demo CTA -------------------- */

function DemoCta() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[2rem] p-10 sm:p-14 text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs uppercase tracking-widest">
                <Rocket className="h-3.5 w-3.5" /> Limited seats this month
              </span>
              <h2 className="mt-4 text-4xl leading-tight text-white sm:text-5xl">Get <span className="text-white/90">3 FREE</span> Demo Classes</h2>
              <p className="mt-4 max-w-lg text-white/85">Experience the difference before admission — try our classroom, mentors and study material at no cost.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary hover:opacity-95">
                  Reserve My Seat <ArrowRight className="h-4 w-4" />
                </a>
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/15 px-6 py-3 text-sm font-semibold text-white hover:bg-white/25">
                  <MessageCircle className="h-4 w-4" /> WhatsApp Us
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { t: "60 min", d: "per demo class" },
                { t: "Small batch", d: "real classroom feel" },
                { t: "Free notes", d: "printed handouts" },
                { t: "No obligation", d: "join only if you like" },
              ].map((c) => (
                <div key={c.t} className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                  <div className="text-xl font-semibold text-white">{c.t}</div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-white/80">{c.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Process -------------------- */

const STEPS = [
  { n: "01", t: "Submit Form", d: "Share your details in 60 seconds." },
  { n: "02", t: "Counselling", d: "Free 1-on-1 with a course expert." },
  { n: "03", t: "Demo Class", d: "Attend 3 free classes." },
  { n: "04", t: "Enrolment", d: "Pay online. Start learning." },
];

function Process() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          eyebrow="Admission Process"
          title={<>From enquiry to <span className="gradient-text">enrolment</span> in 4 steps</>}
          sub="A friction-free path designed around students and parents."
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <div key={s.n} className="relative rounded-3xl border border-border/70 bg-white/80 p-7 backdrop-blur">
              <div className="text-5xl font-semibold text-primary/20">{s.n}</div>
              <h3 className="mt-4 text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              {i < STEPS.length - 1 && (
                <div className="pointer-events-none absolute right-3 top-8 hidden text-primary/40 lg:block">
                  <ArrowRight className="h-6 w-6" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- FAQ -------------------- */

const FAQS = [
  { q: "Who can join MYMENTORS (MMT)?", a: "Students from Class 6 to 12, aspirants for SSC / Banking / CTET / Defence exams, and graduates looking for Online MBA, B.Ed, BCA, MCA and similar admissions." },
  { q: "Are demo classes really free?", a: "Yes. You get 3 free demo classes (60 minutes each) with printed notes — no fee, no obligation. Enrol only if you love the classroom." },
  { q: "Do you offer online and offline classes?", a: "Both. Offline classes run at our Jaitpur Extension centre in New Delhi. Online live and hybrid batches are available across India." },
  { q: "How is MMT different from big coaching brands?", a: "Small batch sizes (max 25), weekly tests, printed notes, personal mentorship and weekly parent WhatsApp reports — you get the attention a big brand cannot give." },
  { q: "Do you help with Online MBA / B.Ed admissions?", a: "Yes. Our counselling cell handles end-to-end admission for Amity, Mangalayatan, Manav Rachna, Subharti, UPGRAD and other leading universities." },
  { q: "What are the payment options?", a: "Affordable, transparent fees with easy EMI options. Online payment, UPI and card supported." },
];

function FAQ() {
  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-b from-transparent via-secondary/40 to-transparent">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionTitle
          eyebrow="FAQ"
          title={<>Everything parents & students <span className="gradient-text">ask us</span></>}
        />
        <div className="mt-12 glass-card rounded-3xl p-4 sm:p-6">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-border/70">
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Contact -------------------- */

function Contact() {
  const [loading, setLoading] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Thanks! Our counsellor will reply within 30 minutes.");
    }, 900);
  };
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          eyebrow="Contact"
          title={<>Let's talk about your <span className="gradient-text">future</span></>}
          sub="Reach out on WhatsApp, call us directly, or drop your details — we'll reply within 30 minutes."
        />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: MapPin, label: "MYMENTORS Tutorial (MMT)", value: "A1/B1, T-Point, Tanki Road, Near Jagdamba School, Jaitpur Ext., New Delhi", href: "#map" },
              { icon: Phone, label: "Call us · Mon–Sun · 9 AM – 9 PM", value: `${PHONE_1} · ${PHONE_2}`, href: `tel:${PHONE_1.replace(/\s/g, "")}` },
              { icon: Mail, label: "Admissions & Support", value: EMAIL, href: `mailto:${EMAIL}` },
              { icon: MessageCircle, label: "WhatsApp", value: PHONE_1, href: WHATSAPP },
            ].map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="glass-card group flex items-start gap-4 rounded-2xl p-5 transition hover:-translate-y-0.5"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl btn-gradient text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</div>
                  <div className="text-sm font-semibold text-foreground">{value}</div>
                </div>
              </a>
            ))}

            <div id="map" className="overflow-hidden rounded-2xl border border-border/70 shadow-[var(--shadow-soft)]">
              <iframe
                title="MYMENTORS Tutorial location"
                src="https://www.google.com/maps?q=Jaitpur+Extension+New+Delhi&output=embed"
                width="100%"
                height="240"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full"
              />
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="glass-card rounded-3xl p-6 sm:p-8 lg:col-span-3 space-y-5"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Full name</span>
                <Input required name="name" placeholder="Priya Sharma" className="mt-2 h-12 rounded-xl bg-white/70" />
              </label>
              <label className="block">
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Mobile</span>
                <Input required type="tel" name="phone" placeholder="+91 72909 00023" className="mt-2 h-12 rounded-xl bg-white/70" />
              </label>
              <label className="block">
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Email</span>
                <Input required type="email" name="email" placeholder="you@email.com" className="mt-2 h-12 rounded-xl bg-white/70" />
              </label>
              <label className="block">
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Interested in</span>
                <select name="course" required className="mt-2 h-12 w-full rounded-xl border border-input bg-white/70 px-3 text-sm">
                  <option>Foundation (9–12)</option>
                  <option>Competition (SSC/Bank/CTET)</option>
                  <option>Online MBA / B.Ed / BCA</option>
                  <option>Career Counselling</option>
                </select>
              </label>
            </div>
            <label className="block">
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Message (optional)</span>
              <Textarea name="message" rows={4} placeholder="Tell us a bit about your goals..." className="mt-2 rounded-xl bg-white/70" />
            </label>
            <Button
              type="submit"
              disabled={loading}
              className="btn-gradient h-12 w-full rounded-full text-sm font-semibold text-primary-foreground hover:opacity-95"
            >
              {loading ? "Sending..." : "Book Free Demo"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              By submitting you agree to our privacy policy. We'll never spam.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Footer -------------------- */

function Footer() {
  return (
    <footer className="relative border-t border-border/70 bg-gradient-to-b from-background to-secondary/40 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-xl btn-gradient text-primary-foreground shadow-md">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div className="leading-tight">
                <div className="text-base font-semibold tracking-tight">MYMENTORS (MMT)</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Don't Fikar, Hai Na MYMENTORS</div>
              </div>
            </a>
            <p className="mt-5 max-w-md text-sm text-muted-foreground">
              Foundation, Competition & Admission Guidance — by Mukherjee Nagar team. Guiding students from Class 6 through university admissions with real mentorship.
            </p>
            <p className="mt-4 max-w-md text-xs italic text-muted-foreground">
              In loving memory of Late Capt. R.S. Rathore
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: Instagram, href: "#" },
                { icon: Facebook, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Youtube, href: "#" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label="social"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-white/70 text-foreground/70 transition hover:text-primary hover:border-primary/40"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-foreground">Programs</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href="#programs" className="hover:text-primary">Foundation (9–12)</a></li>
              <li><a href="#programs" className="hover:text-primary">Competition (SSC/Bank)</a></li>
              <li><a href="#programs" className="hover:text-primary">CTET · HTET · UPTET</a></li>
              <li><a href="#programs" className="hover:text-primary">Online MBA / B.Ed / BCA</a></li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-foreground">Contact</div>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> {PHONE_1}</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> {PHONE_2}</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> {EMAIL}</li>
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-primary" /> A1/B1, T-Point, Tanki Road, Jaitpur Ext., New Delhi</li>
              <li className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> Mon–Sun · 9 AM – 9 PM</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/70 pt-6 text-xs text-muted-foreground sm:flex-row">
          <div>© {new Date().getFullYear()} MYMENTORS (MMT). All rights reserved.</div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Terms</a>
            <a href="#" className="hover:text-primary">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
