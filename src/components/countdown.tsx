import { useEffect, useState } from "react";

const TARGET = new Date("2026-06-17T08:00:00+05:30").getTime();

export function Countdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = now === null ? Math.max(0, TARGET - Date.parse("2026-05-14T00:00:00Z")) : Math.max(0, TARGET - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const mins = Math.floor((diff / 60000) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  const items = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: mins },
    { label: "Seconds", value: secs },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-2xl mx-auto">
      {items.map((it) => (
        <div key={it.label} className="glass-strong rounded-xl px-2 sm:px-4 py-3 sm:py-5 text-center">
          <div className="font-mono text-2xl sm:text-4xl md:text-5xl font-semibold text-gradient-electric tabular-nums">
            {String(it.value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {it.label}
          </div>
        </div>
      ))}
    </div>
  );
}
