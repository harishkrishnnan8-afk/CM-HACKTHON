import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const participantSchema = z.object({
  name: z.string().trim().min(1).max(80),
  year: z.string().min(1).max(20),
});

const payloadSchema = z.object({
  team_name: z.string().trim().min(2).max(60),
  num_participants: z.number().int().min(2).max(4),
  leader_name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(8).max(20),
  college: z.string().trim().min(2).max(120),
  year_of_study: z.string().min(1).max(20),
  participants: z.array(participantSchema).max(3),
  is_simats: z.boolean(),
  fee: z.number().int().min(0).max(10000),
  id_card_url: z.string().url().nullable(),
  payment_screenshot_url: z.string().url().nullable(),
});

export const submitToSheet = createServerFn({ method: "POST" })
  .inputValidator((input) => payloadSchema.parse(input))
  .handler(async ({ data }) => {
    const url = process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL;
    if (!url) {
      return { ok: false, error: "Webhook not configured" } as const;
    }

    const row = {
      timestamp: new Date().toISOString(),
      team_name: data.team_name,
      num_participants: data.num_participants,
      leader_name: data.leader_name,
      email: data.email,
      phone: data.phone,
      college: data.college,
      year_of_study: data.year_of_study,
      is_simats: data.is_simats ? "Yes" : "No",
      fee: data.fee,
      member_2_name: data.participants[0]?.name ?? "",
      member_2_year: data.participants[0]?.year ?? "",
      member_3_name: data.participants[1]?.name ?? "",
      member_3_year: data.participants[1]?.year ?? "",
      member_4_name: data.participants[2]?.name ?? "",
      member_4_year: data.participants[2]?.year ?? "",
      id_card_url: data.id_card_url ?? "",
      payment_screenshot_url: data.payment_screenshot_url ?? "",
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(row),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("Apps Script webhook failed", res.status, text);
        return { ok: false, error: `Sheet webhook returned ${res.status}` } as const;
      }
      return { ok: true } as const;
    } catch (e) {
      console.error("Apps Script webhook error", e);
      return { ok: false, error: e instanceof Error ? e.message : "Network error" } as const;
    }
  });
