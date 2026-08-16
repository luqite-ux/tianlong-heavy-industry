import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase";

export const InquiryInput = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  country: z.string().min(2),
  interest: z.string().min(2),
  message: z.string().min(10),
  sourcePath: z.string().optional()
});

export type InquiryInput = z.infer<typeof InquiryInput>;

export async function submitInquiry(input: InquiryInput) {
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
  const supabase = getSupabaseServerClient();

  if (!tenantId || !supabase) {
    return {
      ok: false,
      status: 503,
      message: "Inquiry backend is not configured for this local preview."
    };
  }

  const { error } = await supabase.from("inquiries").insert({
    tenant_id: tenantId,
    name: input.name,
    company: input.company,
    email: input.email,
    phone: input.phone,
    country: input.country,
    product_interest: input.interest,
    message: input.message,
    source_path: input.sourcePath || "/",
    status: "new"
  });

  if (error) {
    return { ok: false, status: 500, message: "Inquiry submission failed. Please try again." };
  }

  return { ok: true, status: 200, message: "Inquiry received." };
}
