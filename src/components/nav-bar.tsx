import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#highlights", label: "Highlights" },
  { href: "#prizes", label: "Prizes" },
  { href: "#timeline", label: "Timeline" },
  { href: "#rules", label: "Rules" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function NavBar() {
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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className={`glass-strong rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between transition-all ${scrolled ? "shadow-2xl" : ""}`}>
          <Link to="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-electric-soft grid place-items-center font-bold text-primary-foreground">
              ∑
              <div className="absolute inset-0 rounded-lg blur-md bg-primary/40 -z-10" />
            </div>
            <span className="font-semibold tracking-tight">
              CM <span className="text-gradient-gold">Hackathon</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-sm text-muted-foreground">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/register"
              className="hidden sm:inline-flex items-center rounded-lg bg-gradient-to-r from-primary to-electric-soft px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity glow-electric"
            >
              Register Now
            </Link>
            <button
              className="lg:hidden p-2 rounded-md hover:bg-white/5"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden mt-2 glass-strong rounded-2xl p-4 flex flex-col gap-3 text-sm">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                {l.label}
              </a>
            ))}
            <Link to="/register" className="rounded-lg bg-gradient-to-r from-primary to-electric-soft px-4 py-2 text-center font-medium text-primary-foreground">
              Register Now
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
