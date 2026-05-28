import { motion } from "framer-motion";
import { useMemo } from "react";

const equations = [
  "∇·E = ρ/ε₀",
  "e^{iπ} + 1 = 0",
  "∫₀^∞ e^{-x²} dx = √π/2",
  "f(x) = ax² + bx + c",
  "Σ 1/n² = π²/6",
  "∂u/∂t = α∇²u",
  "P(A|B) = P(B|A)P(A)/P(B)",
  "lim_{n→∞} (1+1/n)^n = e",
  "y = mx + b",
  "Φ = (1+√5)/2",
  "ds² = -c²dt² + dx²",
  "F = ma",
  "E = mc²",
  "∮ B·dl = μ₀I",
  "ψ(x,t) = Ae^{i(kx-ωt)}",
  "log(xy) = log x + log y",
];

const symbols = ["∑", "∫", "∂", "∇", "π", "Φ", "λ", "Δ", "∞", "θ", "Ω", "α", "β", "γ"];

function seedRand(seed: number) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function CinematicBackground() {
  const eqs = useMemo(
    () =>
      equations.map((e, i) => ({
        eq: e,
        top: seedRand(i + 1) * 100,
        left: seedRand(i + 7) * 100,
        size: 12 + seedRand(i + 3) * 18,
        delay: seedRand(i + 5) * 8,
        duration: 12 + seedRand(i + 11) * 14,
        rotate: (seedRand(i + 13) - 0.5) * 20,
      })),
    []
  );
  const syms = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        s: symbols[i % symbols.length],
        top: seedRand(i + 100) * 100,
        left: seedRand(i + 200) * 100,
        size: 24 + seedRand(i + 300) * 64,
        delay: seedRand(i + 400) * 6,
        duration: 14 + seedRand(i + 500) * 12,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      {/* Glowing orbs */}
      <div
        className="absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.72 0.18 245 / 0.45), transparent 70%)" }}
      />
      <div
        className="absolute top-40 right-10 h-[360px] w-[360px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.83 0.14 85 / 0.30), transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.62 0.16 250 / 0.35), transparent 70%)" }}
      />

      {/* Floating equations */}
      {eqs.map((e, i) => (
        <motion.div
          key={`eq-${i}`}
          className="absolute font-mono text-foreground/20 whitespace-nowrap"
          style={{ top: `${e.top}%`, left: `${e.left}%`, fontSize: `${e.size}px` }}
          initial={{ opacity: 0, y: 20, rotate: e.rotate }}
          animate={{ opacity: [0, 0.6, 0], y: [-10, -60, -110], rotate: e.rotate }}
          transition={{ duration: e.duration, delay: e.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {e.eq}
        </motion.div>
      ))}

      {/* Floating symbols */}
      {syms.map((s, i) => (
        <motion.div
          key={`sym-${i}`}
          className="absolute font-display text-primary/15"
          style={{ top: `${s.top}%`, left: `${s.left}%`, fontSize: `${s.size}px` }}
          animate={{ y: [0, -40, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {s.s}
        </motion.div>
      ))}

      {/* Particles */}
      {Array.from({ length: 40 }).map((_, i) => {
        const top = seedRand(i + 900) * 100;
        const left = seedRand(i + 901) * 100;
        const size = 1 + seedRand(i + 902) * 2.5;
        const delay = seedRand(i + 903) * 6;
        const dur = 6 + seedRand(i + 904) * 10;
        return (
          <motion.div
            key={`p-${i}`}
            className="absolute rounded-full bg-primary/60"
            style={{ top: `${top}%`, left: `${left}%`, width: size, height: size, boxShadow: `0 0 ${size * 4}px oklch(0.72 0.18 245 / 0.8)` }}
            animate={{ y: [0, -60, 0], opacity: [0, 1, 0] }}
            transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
}
