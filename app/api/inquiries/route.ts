import { NextResponse } from "next/server";
import { InquiryInput, submitInquiry } from "@/lib/inquiry";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = InquiryInput.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ message: "Please complete all required inquiry fields." }, { status: 400 });
  }

  const result = await submitInquiry(parsed.data);
  return NextResponse.json({ message: result.message }, { status: result.status });
}
