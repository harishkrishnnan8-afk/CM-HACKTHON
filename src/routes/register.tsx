import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, type ChangeEvent, type DragEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowLeft, ArrowRight, Check, Upload, FileImage, X,
  Phone, IndianRupee, Sparkles, Users, User, GraduationCap, CheckCircle2,
} from "lucide-react";
import { NavBar } from "@/components/nav-bar";
import { CinematicBackground } from "@/components/cinematic-background";
import { supabase } from "@/integrations/supabase/client";
import { useServerFn } from "@tanstack/react-start";
import { submitToSheet } from "@/lib/sheets.functions";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
  head: () => ({
    meta: [
      { title: "Register — CM Hackathon 2026" },
      { name: "description", content: "Register your team for CM Hackathon 2026 at SIMATS Engineering College." },
    ],
  }),
});

const SIMATS_KEYWORDS = ["simats", "saveetha"];

const participantSchema = z.object({
  name: z.string().trim().min(2, "Name required").max(80),
  year: z.string().min(1, "Year required").max(20),
});

const formSchema = z.object({
  team_name: z.string().trim().min(2, "Team name required").max(60),
  num_participants: z.number().int().min(2).max(4),
  leader_name: z.string().trim().min(2).max(80),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().regex(/^[+\d\s-]{8,15}$/, "Valid phone required"),
  college: z.string().trim().min(2).max(120),
  year_of_study: z.string().min(1).max(20),
  participants: z.array(participantSchema),
});

type FormState = z.infer<typeof formSchema>;

const initialState: FormState = {
  team_name: "",
  num_participants: 2,
  leader_name: "",
  email: "",
  phone: "",
  college: "",
  year_of_study: "",
  participants: [
    { name: "", year: "" },
  ],
};

const STEPS = ["Team", "Leader", "Members", "Upload", "Payment"] as const;

function RegisterPage() {
  const navigate = useNavigate();
  const submitSheet = useServerFn(submitToSheet);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>(initialState);
  const [idCardFile, setIdCardFile] = useState<File | null>(null);
  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const isSimats = SIMATS_KEYWORDS.some((k) => data.college.toLowerCase().includes(k));
  const fee = isSimats ? 0 : 100 * data.num_participants;

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => setData((d) => ({ ...d, [k]: v }));

  const setNumParticipants = (n: number) => {
    const additional = n - 1; // leader is implicit
    const arr = Array.from({ length: additional }, (_, i) => data.participants[i] ?? { name: "", year: "" });
    setData((d) => ({ ...d, num_participants: n, participants: arr }));
  };

  const validateStep = (s: number): string | null => {
    if (s === 0 && !data.team_name.trim()) return "Enter a team name";
    if (s === 1) {
      if (!data.leader_name.trim()) return "Leader name required";
      if (!/^\S+@\S+\.\S+$/.test(data.email)) return "Valid email required";
      if (!/^[+\d\s-]{8,15}$/.test(data.phone)) return "Valid phone required";
      if (!data.college.trim()) return "College required";
      if (!data.year_of_study) return "Year of study required";
    }
    if (s === 2) {
      for (const p of data.participants) {
        if (!p.name.trim() || !p.year) return "Fill in all member details";
      }
    }
    if (s === 3) {
      if (!idCardFile) return "Upload college ID card";
    }
    if (s === 4 && fee > 0) {
      if (!paymentFile) return "Upload payment screenshot";
    }
    return null;
  };

  const next = () => {
    const err = validateStep(step);
    if (err) { toast.error(err); return; }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const submit = async () => {
    const err = validateStep(step);
    if (err) { toast.error(err); return; }
    const parsed = formSchema.safeParse(data);
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }

    setSubmitting(true);
    try {
      const ts = Date.now();
      let id_card_url: string | null = null;
      let payment_screenshot_url: string | null = null;

      if (idCardFile) {
        const path = `${ts}-${slug(data.team_name)}-id.${ext(idCardFile.name)}`;
        const up = await supabase.storage.from("id-cards").upload(path, idCardFile, { upsert: false });
        if (up.error) throw up.error;
        id_card_url = supabase.storage.from("id-cards").getPublicUrl(path).data.publicUrl;
      }
      if (paymentFile) {
        const path = `${ts}-${slug(data.team_name)}-pay.${ext(paymentFile.name)}`;
        const up = await supabase.storage.from("payment-screenshots").upload(path, paymentFile, { upsert: false });
        if (up.error) throw up.error;
        payment_screenshot_url = supabase.storage.from("payment-screenshots").getPublicUrl(path).data.publicUrl;
      }

      const result = await submitSheet({
        data: {
          team_name: data.team_name,
          num_participants: data.num_participants,
          leader_name: data.leader_name,
          email: data.email,
          phone: data.phone,
          college: data.college,
          year_of_study: data.year_of_study,
          participants: data.participants,
          is_simats: isSimats,
          fee,
          id_card_url,
          payment_screenshot_url,
        },
      });
      if (!result.ok) {
        toast.error(result.error ?? "Failed to save registration");
        return;
      }
      setDone(true);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    const whatsappUrl = "https://chat.whatsapp.com/LNwQOwyhHIT6INglMFlgc4";
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=12&data=${encodeURIComponent(whatsappUrl)}`;
    return (
      <div className="relative min-h-screen overflow-hidden">
        <NavBar />
        <CinematicBackground />
        <div className="relative mx-auto max-w-2xl px-6 pt-40 pb-20 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="mx-auto h-20 w-20 rounded-2xl bg-gradient-to-br from-gold/40 to-gold/10 grid place-items-center glow-gold"
          >
            <CheckCircle2 className="h-10 w-10 text-gold" />
          </motion.div>
          <h1 className="mt-8 text-4xl sm:text-5xl font-bold text-gradient-hero">You're In!</h1>
          <p className="mt-4 text-muted-foreground">
            Team <span className="text-gold font-medium">{data.team_name}</span> is registered for CM Hackathon 2026.
            We've sent a confirmation to <span className="text-foreground">{data.email}</span>.
          </p>

          {/* WhatsApp join */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-10 glass-strong rounded-3xl p-6 sm:p-8 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#25D366]/40 to-[#25D366]/10 grid place-items-center">
                <Sparkles className="h-5 w-5 text-[#25D366]" />
              </div>
              <div>
                <div className="text-sm uppercase tracking-[0.2em] text-gold">Next Step</div>
                <div className="font-semibold text-lg">Join the official WhatsApp group</div>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Stay updated with announcements, schedule changes, and important instructions.
            </p>
            <div className="mt-6 grid sm:grid-cols-[auto,1fr] gap-6 items-center">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block mx-auto">
                <img
                  src={qrUrl}
                  alt="WhatsApp group QR code"
                  width={180}
                  height={180}
                  className="rounded-2xl bg-white p-2"
                />
              </a>
              <div className="space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-black hover:opacity-90 transition-opacity"
                >
                  Click to Join the WhatsApp Group
                  <ArrowRight className="h-4 w-4" />
                </a>
                <p className="text-xs text-muted-foreground text-center sm:text-left">
                  Or scan the QR code with your phone camera.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/" className="rounded-xl glass-strong px-6 py-3 text-sm font-semibold hover:bg-white/[0.08]">Back to Home</Link>
            <button
              onClick={() => { setDone(false); setStep(0); setData(initialState); setIdCardFile(null); setPaymentFile(null); }}
              className="rounded-xl bg-gradient-to-r from-primary to-electric-soft px-6 py-3 text-sm font-semibold text-primary-foreground glow-electric"
            >
              Register Another Team
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <NavBar />
      <CinematicBackground />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 pt-32 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <button onClick={() => navigate({ to: "/" })} className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </button>
          <h1 className="mt-6 text-4xl sm:text-5xl font-bold text-gradient-hero">Register Your Team</h1>
          <p className="mt-2 text-muted-foreground">CM Hackathon 2026 · Equations to Innovation</p>
        </motion.div>

        {/* Stepper */}
        <div className="mt-10 flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`h-8 w-8 shrink-0 rounded-full grid place-items-center text-xs font-semibold transition-all ${
                i < step ? "bg-gold text-background" : i === step ? "bg-primary text-primary-foreground glow-electric" : "glass text-muted-foreground"
              }`}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-px flex-1 ${i < step ? "bg-gold" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Step {step + 1} of {STEPS.length} · {STEPS[step]}
        </div>

        {/* Card */}
        <div className="mt-8 glass-strong rounded-3xl p-6 sm:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {step === 0 && (
                <div className="space-y-6">
                  <SectionTitle icon={Users} title="Team details" desc="Tell us about your squad." />
                  <Field label="Team Name">
                    <Input value={data.team_name} onChange={(e) => update("team_name", e.target.value)} placeholder="e.g. Quantum Coders" />
                  </Field>
                  <Field label="Number of Participants">
                    <div className="grid grid-cols-3 gap-3">
                      {[2, 3, 4].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setNumParticipants(n)}
                          className={`rounded-xl px-4 py-4 text-center transition-all ${
                            data.num_participants === n
                              ? "bg-gradient-to-r from-primary to-electric-soft text-primary-foreground glow-electric"
                              : "glass hover:bg-white/[0.06]"
                          }`}
                        >
                          <div className="text-2xl font-bold">{n}</div>
                          <div className="text-xs opacity-80">members</div>
                        </button>
                      ))}
                    </div>
                  </Field>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6">
                  <SectionTitle icon={User} title="Leader details" desc="The point of contact for your team." />
                  <Field label="Full Name"><Input value={data.leader_name} onChange={(e) => update("leader_name", e.target.value)} placeholder="Your full name" /></Field>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Email Address"><Input type="email" value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" /></Field>
                    <Field label="Phone Number"><Input value={data.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 ..." /></Field>
                  </div>
                  <Field label="College / University Name">
                    <Input value={data.college} onChange={(e) => update("college", e.target.value)} placeholder="e.g. SIMATS Engineering College" />
                  </Field>
                  <Field label="Year of Study">
                    <Select value={data.year_of_study} onChange={(e) => update("year_of_study", e.target.value)}>
                      <option value="">Select year</option>
                      <option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option><option>PG / Other</option>
                    </Select>
                  </Field>
                  {data.college && (
                    <div className={`text-xs rounded-lg px-3 py-2 ${isSimats ? "bg-gold/10 text-gold border border-gold/30" : "bg-primary/10 text-primary border border-primary/30"}`}>
                      {isSimats ? "✓ Detected as SIMATS — registration is FREE." : `Registration fee: ₹100 × ${data.num_participants} = ₹${100 * data.num_participants}`}
                    </div>
                  )}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <SectionTitle icon={GraduationCap} title="Other team members" desc={`Enter details for the remaining ${data.participants.length} member${data.participants.length > 1 ? "s" : ""}.`} />
                  {data.participants.map((p, i) => (
                    <div key={i} className="glass rounded-xl p-5">
                      <div className="text-xs uppercase tracking-[0.2em] text-gold mb-3">Member {i + 2}</div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Field label="Full Name">
                          <Input value={p.name} onChange={(e) => {
                            const arr = [...data.participants]; arr[i] = { ...arr[i], name: e.target.value };
                            update("participants", arr);
                          }} placeholder="Member's name" />
                        </Field>
                        <Field label="Year of Study">
                          <Select value={p.year} onChange={(e) => {
                            const arr = [...data.participants]; arr[i] = { ...arr[i], year: e.target.value };
                            update("participants", arr);
                          }}>
                            <option value="">Select year</option>
                            <option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option><option>PG / Other</option>
                          </Select>
                        </Field>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <SectionTitle icon={FileImage} title="Upload College ID" desc="Upload a clear photo of the team leader's college ID card." />
                  <FileDrop file={idCardFile} onFile={setIdCardFile} accept="image/*" label="Drag & drop your ID card here, or click to browse" />
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <SectionTitle icon={IndianRupee} title="Payment" desc={isSimats ? "No payment needed — SIMATS students register for free." : `Pay ₹${fee} to confirm your registration.`} />
                  {isSimats ? (
                    <div className="rounded-2xl bg-gradient-to-br from-gold/15 to-transparent border border-gold/30 p-8 text-center">
                      <Sparkles className="h-10 w-10 text-gold mx-auto" />
                      <p className="mt-4 font-semibold">SIMATS students participate for FREE!</p>
                      <p className="text-sm text-muted-foreground mt-1">Click submit to complete your registration.</p>
                    </div>
                  ) : (
                    <>
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="glass rounded-2xl p-6 text-center">
                          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Total Fee</p>
                          <p className="mt-2 text-4xl font-bold text-gradient-gold">₹{fee}</p>
                          <p className="text-xs text-muted-foreground mt-1">₹100 × {data.num_participants} members</p>
                        </div>
                        <div className="glass rounded-2xl p-6">
                          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground text-center">
                            SSE CME INDUSIND BANK
                          </p>

                          <div className="mt-5 space-y-4">
                            <div>
                              <p className="text-xs text-muted-foreground uppercase tracking-[0.15em]">
                                A/C Name
                              </p>
                              <p className="mt-1 text-sm sm:text-base font-semibold leading-relaxed">
                                SAVEETHA SCHOOL OF ENGINEERING CME SEM WORKSHOP AC
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-muted-foreground uppercase tracking-[0.15em]">
                                A/C No
                              </p>
                              <p className="mt-1 text-xl font-mono font-bold text-gradient-gold">
                                100281622035
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-muted-foreground uppercase tracking-[0.15em]">
                                IFSC Code
                              </p>
                              <p className="mt-1 text-lg font-semibold">
                                INDB0001859
                              </p>
                            </div>
                          </div>

                          <p className="text-xs text-muted-foreground mt-5 text-center">
                            Please complete the payment and upload the payment screenshot below for verification.
                          </p>
                        </div>
                      </div>
                      <Field label="Upload Payment Screenshot">
                        <FileDrop file={paymentFile} onFile={setPaymentFile} accept="image/*" label="Drag & drop the payment screenshot, or click to browse" />
                      </Field>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="mt-10 flex items-center justify-between">
            <button
              onClick={prev}
              disabled={step === 0 || submitting}
              className="inline-flex items-center gap-2 rounded-xl glass px-5 py-2.5 text-sm font-medium disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            {step < STEPS.length - 1 ? (
              <button
                onClick={next}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-electric-soft px-6 py-2.5 text-sm font-semibold text-primary-foreground glow-electric"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold to-gold-soft px-6 py-2.5 text-sm font-semibold text-background glow-gold disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Complete Registration"} {!submitting && <Check className="h-4 w-4" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */
function slug(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 30) || "team"; }
function ext(name: string) { const m = /\.([a-z0-9]+)$/i.exec(name); return (m?.[1] ?? "png").toLowerCase(); }

function SectionTitle({ icon: Icon, title, desc }: { icon: typeof Users; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-4 pb-2">
      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/30 to-electric-soft/20 grid place-items-center"><Icon className="h-5 w-5 text-primary" /></div>
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">{label}</div>
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl glass px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-primary/50 transition-all ${props.className ?? ""}`}
    />
  );
}
function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full rounded-xl glass px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-all ${props.className ?? ""}`}
    >
      {props.children}
    </select>
  );
}

function FileDrop({
  file, onFile, accept, label,
}: { file: File | null; onFile: (f: File | null) => void; accept: string; label: string }) {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handle = (f: File | null) => {
    if (!f) return onFile(null);
    if (f.size > 5 * 1024 * 1024) { toast.error("File too large (max 5MB)"); return; }
    onFile(f);
  };
  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); setDrag(false);
    handle(e.dataTransfer.files?.[0] ?? null);
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => handle(e.target.files?.[0] ?? null);

  if (file) {
    const url = URL.createObjectURL(file);
    return (
      <div className="glass-strong rounded-2xl p-4 flex items-center gap-4">
        <img src={url} alt="preview" className="h-16 w-16 rounded-lg object-cover" />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">{file.name}</div>
          <div className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</div>
        </div>
        <button onClick={() => onFile(null)} className="h-9 w-9 grid place-items-center rounded-lg hover:bg-white/10">
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
      className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all ${
        drag ? "border-primary bg-primary/5 glow-electric" : "border-border hover:border-primary/50 hover:bg-white/[0.03]"
      }`}
    >
      <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
      <p className="text-sm font-medium">{label}</p>
      <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
      <input ref={inputRef} type="file" accept={accept} onChange={onChange} className="hidden" />
    </div>
  );
}
