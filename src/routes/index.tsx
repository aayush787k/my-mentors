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
import {
  ArrowRight,
  BookOpen,
  Brain,
  Briefcase,
  Calendar,
  CheckCircle2,
  Compass,
  Facebook,
  GraduationCap,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
  X,
  Youtube,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Courses", href: "#courses" },
  { label: "Results", href: "#results" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const IMG = {
  hero: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
  about: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
  g1: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=900&q=80",
  g2: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
  g3: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=900&q=80",
  g4: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=900&q=80",
  g5: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80",
  g6: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=900&q=80",
  s1: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
  s2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  s3: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  f1: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
  f2: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
  f3: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
  f4: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=600&q=80",
};

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-center" richColors />
      <Nav />
      <Hero />
      <Stats />
      <About />
      <Courses />
      <WhyUs />
      <Results />
      <Testimonials />
      <Gallery />
      <Faculty />
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

function Counter({ end, suffix = "", duration = 1800 }: { end: number; suffix?: string; duration?: number }) {
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
            <div className="text-base font-semibold tracking-tight">MYMENTORS</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Career · Education</div>
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
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 rounded-full btn-gradient px-5 py-2.5 text-sm font-semibold"
          >
            Book Free Counselling
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
              Book Free Counselling
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
      className="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* floating blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-float" />
      <div className="pointer-events-none absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full bg-primary-glow/30 blur-3xl animate-float" style={{ animationDelay: "-3s" }} />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/60 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            India's most trusted mentorship
          </span>
          <h1 className="mt-6 text-5xl font-normal leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Unlock your <span className="gradient-text">true potential</span> with the right mentor.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            At MYMENTORS we guide students through career discovery, competitive exams and admissions with a personalised roadmap designed by top mentors.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full btn-gradient px-7 py-3.5 text-sm font-semibold">
              Book Free Counselling
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#courses"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-7 py-3.5 text-sm font-semibold backdrop-blur transition hover:bg-white"
            >
              Explore Courses
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex -space-x-2">
              <img src={IMG.s1} className="h-9 w-9 rounded-full border-2 border-white object-cover" alt="" />
              <img src={IMG.s2} className="h-9 w-9 rounded-full border-2 border-white object-cover" alt="" />
              <img src={IMG.s3} className="h-9 w-9 rounded-full border-2 border-white object-cover" alt="" />
            </div>
            <div>
              <div className="flex items-center gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <div className="mt-0.5 text-foreground/80">Rated 4.9/5 by 12,000+ students</div>
            </div>
          </div>
        </div>

        <div className="relative animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <div className="relative overflow-hidden rounded-[2rem] shadow-[var(--shadow-elegant)]">
            <img src={IMG.hero} alt="Mentor guiding students" className="h-[540px] w-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-transparent" />
          </div>
          <div className="glass-card absolute -bottom-6 -left-6 max-w-[15rem] rounded-2xl p-4 animate-float">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Success rate</div>
                <div className="text-lg font-semibold">96% admissions</div>
              </div>
            </div>
          </div>
          <div className="glass-card absolute -top-4 right-2 max-w-[16rem] rounded-2xl p-4 animate-float" style={{ animationDelay: "-2s" }}>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Mentors online</div>
                <div className="text-lg font-semibold">200+ experts</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Stats -------------------- */

const STATS = [
  { label: "Students Guided", end: 12500, suffix: "+", icon: Users },
  { label: "Success Rate", end: 96, suffix: "%", icon: Trophy },
  { label: "Years of Experience", end: 15, suffix: "+", icon: ShieldCheck },
  { label: "Expert Mentors", end: 200, suffix: "+", icon: Brain },
];

function Stats() {
  return (
    <section id="results" className="relative py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="glass-card grid grid-cols-2 gap-6 rounded-3xl p-8 sm:p-12 lg:grid-cols-4">
          {STATS.map(({ label, end, suffix, icon: Icon }) => (
            <div key={label} className="text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <div className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl gradient-text">
                <Counter end={end} suffix={suffix} />
              </div>
              <div className="mt-1 text-sm font-medium text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- About -------------------- */

function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <div className="relative">
          <div className="overflow-hidden rounded-[2rem] shadow-[var(--shadow-elegant)]">
            <img src={IMG.about} alt="Students learning" className="h-[520px] w-full object-cover" loading="lazy" />
          </div>
          <div className="glass-card absolute -right-4 bottom-8 max-w-xs rounded-2xl p-5">
            <div className="flex items-center gap-2 text-primary">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm font-semibold">Certified Institute</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Accredited by leading education boards & industry bodies.</p>
          </div>
        </div>
        <div>
          <SectionTitle
            align="left"
            eyebrow="About the Institute"
            title={<>A modern academy for <span className="gradient-text">tomorrow's leaders</span>.</>}
            sub="For over 15 years, MYMENTORS has helped thousands of students chart their careers with clarity. We combine deep subject expertise, one-on-one mentorship and world-class study material to build futures — not just clear exams."
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { icon: Target, t: "Personalised Roadmap", d: "Tailored to your goals, strengths and pace." },
              { icon: Brain, t: "Top 1% Mentors", d: "IIT, IIM, medical and industry leaders." },
              { icon: Compass, t: "Career Discovery", d: "Aptitude, interest and psychometric mapping." },
              { icon: ShieldCheck, t: "Proven Results", d: "15+ years of consistent selections." },
            ].map(({ icon: Icon, t, d }) => (
              <li key={t} className="glass-card rounded-2xl p-5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-3 text-sm font-semibold">{t}</div>
                <div className="mt-1 text-xs text-muted-foreground">{d}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Courses -------------------- */

const COURSES = [
  { icon: BookOpen, tag: "Engineering", title: "JEE Main + Advanced", desc: "Complete 2-year foundation with weekly mock tests and one-on-one doubt sessions.", price: "₹ 1,20,000", perks: ["600+ hrs live classes", "AI-graded mock tests", "IIT-alumni mentors"] },
  { icon: Briefcase, tag: "Management", title: "CAT & MBA Prep", desc: "Structured VARC, DILR & Quant mastery with personal interview coaching.", price: "₹ 85,000", perks: ["IIM-A/B/C mentors", "50+ mock CATs", "GD-PI workshops"] },
  { icon: GraduationCap, tag: "Medical", title: "NEET Elite", desc: "Physics, Chemistry, Biology with NCERT-first strategy and revision cycles.", price: "₹ 1,10,000", perks: ["AIIMS faculty", "Bio spotting library", "Monthly parent reviews"] },
  { icon: Compass, tag: "Career", title: "Career Discovery", desc: "For classes 8–12: aptitude, interest & psychometric mapping with 1:1 counselling.", price: "₹ 15,000", perks: ["Certified counsellors", "40+ career reports", "Parent debrief"] },
  { icon: Target, tag: "Government", title: "UPSC Foundation", desc: "GS, CSAT, essay and answer writing with personal mentor and daily current affairs.", price: "₹ 1,45,000", perks: ["Ex-civil servants", "Daily answer review", "Prelims + Mains"] },
  { icon: Sparkles, tag: "Global", title: "Study Abroad", desc: "SAT, GRE, GMAT, IELTS + admissions consulting for the US, UK, Canada & EU.", price: "₹ 95,000", perks: ["SOP mentorship", "Scholarship strategy", "Visa guidance"] },
];

function Courses() {
  return (
    <section id="courses" className="relative py-24 sm:py-32 bg-gradient-to-b from-transparent via-secondary/40 to-transparent">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          eyebrow="Popular Courses"
          title={<>Programs built to <span className="gradient-text">move the needle.</span></>}
          sub="Choose from meticulously crafted programs led by India's top mentors — designed for measurable outcomes."
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map(({ icon: Icon, tag, title, desc, price, perks }) => (
            <article
              key={title}
              className="group relative rounded-3xl border border-border/70 bg-white/70 p-7 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-elegant)] hover:border-primary/30"
            >
              <div className="flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-2xl btn-gradient text-primary-foreground shadow-md">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-primary">{tag}</span>
              </div>
              <h3 className="mt-5 text-2xl">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              <ul className="mt-5 space-y-2">
                {perks.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center justify-between border-t border-border/70 pt-5">
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Starting at</div>
                  <div className="text-lg font-semibold">{price}</div>
                </div>
                <a href="#contact" className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-transform group-hover:translate-x-1">
                  Enrol <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Why Us -------------------- */

const WHY = [
  { icon: Brain, t: "Top 1% Mentors", d: "IIT, IIM, AIIMS alumni and industry leaders — each vetted through a rigorous 5-step process." },
  { icon: Target, t: "Outcome-First Curriculum", d: "Every module tied to a measurable milestone with weekly progress reviews." },
  { icon: ShieldCheck, t: "Trust & Transparency", d: "Zero hidden fees, monthly parent reports, and a satisfaction guarantee." },
  { icon: Compass, t: "Personal Roadmap", d: "Every student gets a mentor-designed plan for their goals, pace and strengths." },
  { icon: Sparkles, t: "Premium Study Material", d: "Concept books, practice sets and AI-powered doubt solver — all included." },
  { icon: Calendar, t: "Flexible Batches", d: "Weekday, weekend and hybrid batches so learning fits around life." },
];

function WhyUs() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          eyebrow="Why Choose Us"
          title={<>Six reasons <span className="gradient-text">10,000+ families</span> chose us.</>}
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map(({ icon: Icon, t, d }) => (
            <div key={t} className="glass-card rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-xl">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Results banner -------------------- */

function Results() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative overflow-hidden rounded-[2rem] p-10 sm:p-14 text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs uppercase tracking-widest">
                <Trophy className="h-3.5 w-3.5" />
                Results 2025
              </span>
              <h2 className="mt-4 text-4xl leading-tight text-white sm:text-5xl">Selections that speak louder than words.</h2>
              <p className="mt-4 max-w-lg text-white/85">From IITs and IIMs to AIIMS and the world's top universities — our students consistently rank among India's finest.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { n: 380, l: "IIT selections" },
                { n: 210, l: "IIM offers" },
                { n: 155, l: "AIIMS ranks" },
                { n: 640, l: "Abroad admits" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                  <div className="text-3xl font-semibold text-white">
                    <Counter end={s.n} suffix="+" />
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-white/80">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Testimonials -------------------- */

const TESTIMONIALS = [
  {
    quote: "The mentors didn't just teach — they believed in me. I cleared JEE Advanced with a rank I never imagined.",
    name: "Aarav Sharma",
    role: "IIT Bombay · Computer Science",
    img: IMG.s1,
  },
  {
    quote: "From confused Class 12 to IIM Ahmedabad. The career discovery process changed my life completely.",
    name: "Meera Iyer",
    role: "IIM Ahmedabad · MBA",
    img: IMG.s3,
  },
  {
    quote: "The personal roadmap and weekly reviews kept me on track. I stayed focused through the toughest months.",
    name: "Rohan Verma",
    role: "AIIMS Delhi · MBBS",
    img: IMG.s2,
  },
];

function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          eyebrow="Success Stories"
          title={<>Real students. <span className="gradient-text">Real breakthroughs.</span></>}
        />
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.name}
              className="glass-card relative flex h-full flex-col rounded-3xl p-8"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <Quote className="h-8 w-8 text-primary/60" />
              <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-foreground/85">"{t.quote}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border/60 pt-5">
                <img src={t.img} alt={t.name} className="h-11 w-11 rounded-full object-cover" loading="lazy" />
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Gallery -------------------- */

function Gallery() {
  const imgs = [IMG.g1, IMG.g2, IMG.g3, IMG.g4, IMG.g5, IMG.g6];
  return (
    <section id="gallery" className="relative py-24 sm:py-32 bg-gradient-to-b from-transparent via-secondary/40 to-transparent">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          eyebrow="Campus Gallery"
          title={<>Inside our <span className="gradient-text">learning spaces.</span></>}
          sub="World-class classrooms, mentor lounges and collaborative studios — designed to inspire focus."
        />
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {imgs.map((src, i) => (
            <div
              key={src}
              className={`group relative overflow-hidden rounded-2xl shadow-[var(--shadow-soft)] ${i % 5 === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
            >
              <img
                src={src}
                alt="Campus"
                loading="lazy"
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${i % 5 === 0 ? "h-full min-h-[24rem]" : "h-56"}`}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Faculty -------------------- */

const FACULTY = [
  { name: "Dr. Anjali Menon", role: "Founder · Career Strategist", img: IMG.f2, tag: "15+ yrs" },
  { name: "Prof. Rajeev Kulkarni", role: "Head of Physics · IIT-JEE", img: IMG.f1, tag: "IIT Delhi" },
  { name: "Dr. Sneha Reddy", role: "Biology Lead · NEET", img: IMG.f3, tag: "AIIMS" },
  { name: "Karan Malhotra", role: "Quant Mentor · CAT / GMAT", img: IMG.f4, tag: "IIM-A" },
];

function Faculty() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          eyebrow="Expert Mentors"
          title={<>Meet the people <span className="gradient-text">shaping futures.</span></>}
          sub="Educators, strategists and industry veterans who've mentored India's finest."
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FACULTY.map((f) => (
            <div key={f.name} className="group relative overflow-hidden rounded-3xl border border-border/60 bg-white transition hover:shadow-[var(--shadow-elegant)]">
              <div className="relative">
                <img src={f.img} alt={f.name} loading="lazy" className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-primary backdrop-blur">
                  {f.tag}
                </span>
              </div>
              <div className="p-5">
                <div className="text-base font-semibold">{f.name}</div>
                <div className="text-xs text-muted-foreground">{f.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- FAQ -------------------- */

const FAQS = [
  { q: "Who can join MYMENTORS?", a: "Students from Class 8 to postgraduates. We tailor programs for career discovery, competitive exams and study abroad." },
  { q: "Is the free counselling really free?", a: "Yes. Your first 45-minute counselling session with a certified mentor is completely free — no card required, no obligations." },
  { q: "Do you offer online, offline or hybrid classes?", a: "All three. Choose the mode that best fits your schedule; hybrid students can switch anytime." },
  { q: "How are mentors selected?", a: "Every mentor clears a 5-step selection process including subject mastery, demo classes and student feedback trials." },
  { q: "What if I don't see results?", a: "We offer a written milestone plan and a satisfaction guarantee. If you're not progressing, we extend your program at no extra cost." },
  { q: "Do you provide scholarships?", a: "Yes — merit-based and need-based scholarships up to 60% are available. Ask your counsellor during the discovery call." },
];

function FAQ() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionTitle
          eyebrow="Questions"
          title={<>Everything you want to <span className="gradient-text">know.</span></>}
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
      toast.success("Thanks! Our counsellor will call you within 24 hours.");
    }, 900);
  };
  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-gradient-to-b from-transparent via-secondary/40 to-transparent">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionTitle
          eyebrow="Get In Touch"
          title={<>Book your <span className="gradient-text">free counselling</span> session.</>}
          sub="Speak with a certified mentor. Get a personalised roadmap — obligation free."
        />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Info side */}
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: Phone, label: "Call us", value: "+91 98765 43210", href: "tel:+919876543210" },
              { icon: MessageCircle, label: "WhatsApp", value: "+91 98765 43210", href: "https://wa.me/919876543210" },
              { icon: Mail, label: "Email", value: "hello@mymentorsedu.in", href: "mailto:hello@mymentorsedu.in" },
              { icon: MapPin, label: "Campus", value: "Level 4, Prestige Point, MG Road, Bengaluru 560001", href: "#map" },
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
                title="Campus location"
                src="https://www.google.com/maps?q=MG+Road+Bengaluru&output=embed"
                width="100%"
                height="240"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full"
              />
            </div>
          </div>

          {/* Form */}
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
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Phone</span>
                <Input required type="tel" name="phone" placeholder="+91 98765 43210" className="mt-2 h-12 rounded-xl bg-white/70" />
              </label>
              <label className="block">
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Email</span>
                <Input required type="email" name="email" placeholder="you@email.com" className="mt-2 h-12 rounded-xl bg-white/70" />
              </label>
              <label className="block">
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Interested in</span>
                <select name="course" required className="mt-2 h-12 w-full rounded-xl border border-input bg-white/70 px-3 text-sm">
                  {COURSES.map((c) => (
                    <option key={c.title}>{c.title}</option>
                  ))}
                </select>
              </label>
            </div>
            <label className="block">
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">How can we help?</span>
              <Textarea name="message" rows={4} placeholder="Tell us a bit about your goals..." className="mt-2 rounded-xl bg-white/70" />
            </label>
            <Button
              type="submit"
              disabled={loading}
              className="btn-gradient h-12 w-full rounded-full text-sm font-semibold text-primary-foreground hover:opacity-95"
            >
              {loading ? "Sending..." : "Request Free Counselling"}
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
                <div className="text-base font-semibold tracking-tight">MYMENTORS</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Career · Education</div>
              </div>
            </a>
            <p className="mt-5 max-w-md text-sm text-muted-foreground">
              India's premium career & education guidance institute. Guiding students through career discovery, competitive exams and world-class admissions since 2010.
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
            <div className="text-xs font-semibold uppercase tracking-widest text-foreground">Quick Links</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="transition hover:text-primary">{n.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-foreground">Get in touch</div>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +91 98765 43210</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> hello@mymentorsedu.in</li>
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-primary" /> Level 4, Prestige Point, MG Road, Bengaluru 560001</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/70 pt-6 text-xs text-muted-foreground sm:flex-row">
          <div>© {new Date().getFullYear()} MYMENTORS. All rights reserved.</div>
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
