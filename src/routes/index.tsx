import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  MapPin, Calendar, Clock, ArrowRight, FileText, Trophy, Award, Sparkles,
  Users, BrainCircuit, Code2, Network, Zap, Target, ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { CinematicBackground } from "@/components/cinematic-background";
import { Countdown } from "@/components/countdown";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <About />
      <Highlights />
      <Prizes />
      <Pricing />
      <Timeline />
      <Rules />
      <FAQ />
      <Footer />
    </div>
  );
}

/* -------------------- HERO -------------------- */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 noise">
      <CinematicBackground />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full glass-strong px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-gold mb-8"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
          SIMATS Engineering College · Computational Mathematics
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-[0.95]"
        >
          <span className="text-gradient-hero">CM Hackathon</span>
          <br />
          <span className="text-gradient-gold">2026</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 flex items-center justify-center gap-4"
        >
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
          <p className="font-mono text-sm sm:text-base uppercase tracking-[0.35em] text-muted-foreground">
            Equations to Innovation
          </p>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-8 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed"
        >
          A grand intercollege hackathon where computational mathematics meets cutting-edge code.
          Compete, collaborate, and turn equations into the next wave of innovation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <Link
            to="/register"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-electric-soft px-7 py-3.5 text-sm font-semibold text-primary-foreground glow-electric hover:scale-[1.02] transition-transform"
          >
            Register Now
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#rules"
            className="inline-flex items-center gap-2 rounded-xl glass-strong px-7 py-3.5 text-sm font-semibold hover:bg-white/[0.08] transition-colors"
          >
            <FileText className="h-4 w-4" />
            View Guidelines
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> SIMATS Engineering College</div>
          <span className="hidden sm:inline opacity-30">·</span>
          <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-gold" /> 17 June 2026</div>
          <span className="hidden sm:inline opacity-30">·</span>
          <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> 8:00 AM – 3:00 PM</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-14"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Event begins in</p>
          <Countdown />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-16 flex justify-center"
        >
          <ChevronDown className="h-6 w-6 text-muted-foreground animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------- ABOUT -------------------- */
function About() {
  const features = [
    { icon: BrainCircuit, title: "AI & Algorithms", desc: "Tackle real-world challenges with machine learning, neural networks, and intelligent systems." },
    { icon: Code2, title: "Computation × Code", desc: "Fuse mathematical rigor with elegant engineering to ship novel solutions." },
    { icon: Network, title: "Optimization & Data", desc: "Model, simulate, and optimize — from graph theory to large-scale data pipelines." },
    { icon: Sparkles, title: "Innovation First", desc: "Solve problems that matter. Engineering creativity meets mathematical precision." },
  ];
  return (
    <SectionWrap id="about" eyebrow="The Stage" title={<>Where <span className="text-gradient-electric">Mathematics</span> Builds the Future</>}>
      <p className="mt-6 max-w-3xl mx-auto text-center text-muted-foreground leading-relaxed">
        CM Hackathon 2026 is a celebration of computational thinking — a place for builders who believe
        equations are the original innovation engine. Form your team, choose your challenge, and ship
        something bold in a single day.
      </p>
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: i * 0.08 }}
            className="group relative glass-strong rounded-2xl p-6 hover:-translate-y-1 transition-all duration-500 hover:glow-electric"
          >
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary/30 to-electric-soft/20 grid place-items-center mb-5 group-hover:scale-110 transition-transform">
              <f.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrap>
  );
}

/* -------------------- HIGHLIGHTS -------------------- */
function Highlights() {
  const items = [
    { icon: Users, title: "Intercollege Hackathon", desc: "Open to teams from colleges across the region." },
    { icon: Trophy, title: "Exciting Cash Prizes", desc: "Substantial cash rewards for top-performing teams." },
    { icon: Award, title: "Certificates for All", desc: "Every participant receives an official certificate." },
    { icon: Network, title: "Networking Opportunities", desc: "Connect with peers, mentors, and innovators." },
    { icon: Zap, title: "Innovation Challenges", desc: "Multiple problem tracks across modern domains." },
    { icon: Target, title: "Team Collaboration", desc: "Form 2–4 member squads and ship together." },
  ];
  return (
    <SectionWrap id="highlights" eyebrow="What's inside" title={<>Event <span className="text-gradient-gold">Highlights</span></>}>
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: i * 0.06 }}
            className="group relative overflow-hidden glass-strong rounded-2xl p-7 hover:-translate-y-1 transition-all duration-500"
          >
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: i % 2 ? "oklch(0.83 0.14 85 / 0.35)" : "oklch(0.72 0.18 245 / 0.35)" }} />
            <div className="relative">
              <it.icon className="h-7 w-7 text-gold mb-5" />
              <h3 className="font-semibold text-lg">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrap>
  );
}

/* -------------------- PRIZES -------------------- */
function Prizes() {
  const prizes = [
    { rank: "Winners", icon: Trophy, accent: "gold", desc: "Cash prize awarded exclusively to the winning teams.", glow: "glow-gold" },
    { rank: "Exclusive Awards", icon: Award, accent: "electric", desc: "Special exclusive awards recognizing standout teams across categories.", glow: "glow-electric" },
    { rank: "Every Participant", icon: Sparkles, accent: "gold", desc: "Official participation certificate for every registered participant.", glow: "glow-gold" },
  ];
  return (
    <SectionWrap id="prizes" eyebrow="The Reward" title={<>Rewards & <span className="text-gradient-gold">Recognition</span></>}>
      <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
        Only the winning teams receive cash prizes. Other standout teams earn exclusive awards, and every participant takes home an official certificate.
      </p>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {prizes.map((p, i) => (
          <motion.div
            key={p.rank}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: i * 0.1 }}
            className={`relative glass-strong rounded-3xl p-8 text-center ${i === 0 ? "md:scale-105" : ""}`}
          >
            <div className={`mx-auto h-20 w-20 rounded-2xl grid place-items-center ${p.glow} ${p.accent === "gold" ? "bg-gradient-to-br from-gold/40 to-gold/10" : "bg-gradient-to-br from-primary/40 to-primary/10"}`}>
              <p.icon className={`h-10 w-10 ${p.accent === "gold" ? "text-gold" : "text-primary"}`} />
            </div>
            <h3 className="mt-6 text-2xl font-semibold">{p.rank}</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
      <motion.div {...fadeUp} className="mt-8 text-center">
        <div className="inline-flex items-center gap-3 glass rounded-full px-5 py-2.5 text-sm">
          <Award className="h-4 w-4 text-gold" />
          <span className="text-muted-foreground">All participants receive official certificates</span>
        </div>
      </motion.div>
    </SectionWrap>
  );
}

/* -------------------- PRICING -------------------- */
function Pricing() {
  const plans = [
    {
      name: "SIMATS Students",
      price: "FREE",
      sub: "No registration fee",
      perks: ["Full event access", "Meals & refreshments", "Certificate of participation", "Networking sessions"],
      featured: true,
    },
    {
      name: "Other Colleges",
      price: "₹100",
      sub: "Per team member",
      perks: ["Full event access", "Meals & refreshments", "Certificate of participation", "Networking sessions"],
      featured: false,
    },
  ];
  return (
    <SectionWrap id="register" eyebrow="Registration" title={<>Simple, <span className="text-gradient-electric">transparent</span> entry</>}>
      <p className="mt-4 text-center text-muted-foreground">Teams of <span className="text-gold">2 to 4 members</span> · Open to all engineering students</p>
      <div className="mt-14 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        {plans.map((p, i) => (
          <motion.div
            key={p.name}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: i * 0.1 }}
            className={`relative glass-strong rounded-3xl p-8 ${p.featured ? "glow-electric" : ""}`}
          >
            {p.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary to-electric-soft px-4 py-1 text-xs font-semibold text-primary-foreground">
                Most Common
              </div>
            )}
            <h3 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{p.name}</h3>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-5xl font-bold text-gradient-hero">{p.price}</span>
              <span className="text-sm text-muted-foreground">{p.sub}</span>
            </div>
            <ul className="mt-6 space-y-3 text-sm">
              {p.perks.map((perk) => (
                <li key={perk} className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-gold" />
                  <span className="text-muted-foreground">{perk}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/register"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-electric-soft px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Register Team <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        ))}
      </div>
    </SectionWrap>
  );
}

/* -------------------- TIMELINE -------------------- */
function Timeline() {
  const events = [
    { time: "8:00 AM", label: "Registration Check-in", desc: "Team check-in & welcome kit pickup" },
    { time: "8:30 AM", label: "Opening Ceremony", desc: "Inaugural address & rules briefing" },
    { time: "9:00 AM", label: "Hackathon Officially Begins", desc: "Build, code, iterate — take breaks as needed in between" },
    { time: "12:30 PM", label: "1st Review", desc: "Initial jury review of team progress" },
    { time: "2:30 PM", label: "Final Review & Prize Distribution", desc: "Final evaluation followed by prize distribution" },
    { time: "3:00 PM", label: "Hackathon Ends", desc: "Closing ceremony & farewell" },
  ];
  return (
    <SectionWrap id="timeline" eyebrow="The Day" title={<>Event <span className="text-gradient-gold">Timeline</span></>}>
      <div className="mt-16 relative max-w-3xl mx-auto">
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
        {events.map((e, i) => (
          <motion.div
            key={e.time}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: i * 0.08 }}
            className={`relative grid sm:grid-cols-2 gap-4 mb-8 ${i % 2 === 0 ? "" : "sm:[&>*:first-child]:order-2"}`}
          >
            <div className={`pl-12 sm:pl-0 ${i % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12"}`}>
              <div className="glass-strong rounded-2xl p-5 inline-block w-full">
                <div className="font-mono text-sm text-gold">{e.time}</div>
                <div className="mt-1 font-semibold text-lg">{e.label}</div>
                <div className="text-sm text-muted-foreground">{e.desc}</div>
              </div>
            </div>
            <div className="hidden sm:block" />
            <div className="absolute left-4 sm:left-1/2 top-6 -translate-x-1/2">
              <div className="relative h-4 w-4 rounded-full bg-primary glow-electric">
                <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-50" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrap>
  );
}

/* -------------------- RULES -------------------- */
function Rules() {
  const rules = [
    "Intercollege participation is allowed and encouraged.",
    "Teams must contain between 2 and 4 members.",
    "Students must carry valid college ID cards.",
    "Participants should bring their own laptops and chargers.",
    "Respect hackathon ethics and originality of work.",
    "Decision of the judges will be final and binding.",
  ];
  return (
    <SectionWrap id="rules" eyebrow="The Rules" title={<>Guidelines & <span className="text-gradient-electric">Code of Conduct</span></>}>
      <div className="mt-14 grid gap-4 max-w-3xl mx-auto">
        {rules.map((r, i) => (
          <motion.div
            key={i}
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: i * 0.05 }}
            className="glass-strong rounded-xl px-6 py-5 flex items-start gap-4 hover:bg-white/[0.06] transition-colors"
          >
            <div className="font-mono text-xs text-gold mt-0.5">{String(i + 1).padStart(2, "0")}</div>
            <p className="text-sm sm:text-base text-foreground/90">{r}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrap>
  );
}

/* -------------------- FAQ -------------------- */
function FAQ() {
  const faqs = [
    { q: "Who can participate?", a: "Any engineering student from any recognized college can participate. Bring a valid college ID." },
    { q: "Is there any registration fee?", a: "SIMATS students participate for FREE. Students from other colleges pay ₹100 per member." },
    { q: "How many members per team?", a: "Each team must have a minimum of 2 and a maximum of 4 members." },
    { q: "Will certificates be provided?", a: "Yes — every participant receives an official certificate of participation." },
    { q: "Is this intercollege?", a: "Absolutely. Teams from any college are welcome to compete." },
    { q: "What should participants bring?", a: "A valid college ID, your laptop & charger, and your problem-solving energy." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <SectionWrap id="faq" eyebrow="Questions" title={<>Frequently <span className="text-gradient-gold">Asked</span></>}>
      <div className="mt-14 max-w-3xl mx-auto space-y-3">
        {faqs.map((f, i) => (
          <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.04 }} className="glass-strong rounded-xl overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-white/[0.04] transition-colors"
            >
              <span className="font-medium">{f.q}</span>
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>
            <div
              className="grid transition-all duration-300"
              style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrap>
  );
}

/* -------------------- WRAPPER -------------------- */
function SectionWrap({
  id, eyebrow, title, children,
}: { id?: string; eyebrow: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div {...fadeUp} className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-[0.25em] text-gold">
            {eyebrow}
          </div>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            {title}
          </h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}
