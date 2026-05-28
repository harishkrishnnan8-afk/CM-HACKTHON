import { Phone, MapPin, Mail, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer id="contact" className="relative mt-32 border-t border-border/50">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-electric-soft grid place-items-center text-lg font-bold text-primary-foreground">
                ∑
                <div className="absolute inset-0 rounded-xl blur-md bg-primary/50 -z-10" />
              </div>
              <div>
                <div className="text-lg font-semibold">CM Hackathon 2026</div>
                <div className="text-xs text-muted-foreground">Equations to Innovation</div>
              </div>
            </div>
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-sm">
              A grand intercollege hackathon hosted by the Department of Computational Mathematics,
              SIMATS Engineering College — where mathematics meets cutting-edge code.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Twitter, Linkedin, Instagram, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-9 w-9 grid place-items-center rounded-lg glass hover:glow-electric transition-all"
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <h4 className="text-sm uppercase tracking-[0.2em] text-gold">Get in touch</h4>
            <div className="mt-5 space-y-5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <div>
                  <div className="font-medium">SIMATS Engineering College</div>
                  <div className="text-muted-foreground">Department of Computational Mathematics</div>
                </div>
              </div>

              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-gold/80 mb-2">Student Coordinators</div>
                <div className="space-y-3">
                  <div>
                    <div className="font-medium">Harish</div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
                      <a href="tel:+918248801519" className="hover:text-foreground">+91 82488 01519</a>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-3.5 w-3.5 text-primary shrink-0" />
                      <a href="mailto:harishkrishnnan8@gmail.com" className="hover:text-foreground break-all">harishkrishnnan8@gmail.com</a>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">Balasubramanian</div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
                      <a href="tel:+919791337435" className="hover:text-foreground">+91 97913 37435</a>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-3.5 w-3.5 text-primary shrink-0" />
                      <a href="mailto:192521001.simats@saveetha.com" className="hover:text-foreground break-all">192521001.simats@saveetha.com</a>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-gold/80 mb-2">Faculty Coordinator</div>
                <div className="font-medium">Diana Grace Thomas</div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
                  <a href="tel:+919840315677" className="hover:text-foreground">+91 98403 15677</a>
                </div>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <h4 className="text-sm uppercase tracking-[0.2em] text-gold">Quick links</h4>
            <ul className="mt-5 grid grid-cols-2 gap-3 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-foreground">About</a></li>
              <li><a href="#highlights" className="hover:text-foreground">Highlights</a></li>
              <li><a href="#prizes" className="hover:text-foreground">Prizes</a></li>
              <li><a href="#timeline" className="hover:text-foreground">Timeline</a></li>
              <li><a href="#rules" className="hover:text-foreground">Rules</a></li>
              <li><a href="#faq" className="hover:text-foreground">FAQ</a></li>
              <li><Link to="/register" className="hover:text-foreground">Register</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© 2026 SIMATS Engineering College — Department of Computational Mathematics</div>
          <div className="font-mono">∇·Innovation = ∞</div>
        </div>
      </div>
    </footer>
  );
}
