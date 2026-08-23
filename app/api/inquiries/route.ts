import { NextResponse } from "next/server";
import { InquiryInput, submitInquiry } from "@/lib/inquiry";
import { createSupabaseCaptchaContextFromEnv, verifyCaptchaSubmission } from "@/lib/inquiry-captcha";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = InquiryInput.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ message: "Please complete all required inquiry fields." }, { status: 400 });
  }

  const captchaSecret = process.env.CAPTCHA_SECRET?.trim();
  if (!captchaSecret) {
    return NextResponse.json({ message: "Verification service is temporarily unavailable." }, { status: 503 });
  }
  try {
    const captcha = await verifyCaptchaSubmission({
      secret: captchaSecret,
      ...createSupabaseCaptchaContextFromEnv(),
      scope: parsed.data.captchaScope.trim(),
      token: parsed.data.captchaToken.trim(),
      answer: parsed.data.captchaAnswer.trim()
    });
    if (!captcha.ok) {
      return NextResponse.json({ message: "The verification code is incorrect or expired. Please try again." }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ message: "Verification service is temporarily unavailable." }, { status: 503 });
  }

  const result = await submitInquiry(parsed.data);
  return NextResponse.json({ message: result.message }, { status: result.status });
}
