import bcrypt from "bcryptjs";
import { type NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, TENANT_COOKIE } from "@/lib/admin-session";
import { getSupabaseServerClient } from "@/lib/supabase";

const SESSION_DAYS = 7;
const INVALID_CREDENTIALS = "Invalid email or password.";

function loginError(request: NextRequest, message: string) {
  const target = new URL("/admin/login", request.url);
  target.searchParams.set("error", message);
  return NextResponse.redirect(target, 303);
}

export async function POST(request: NextRequest) {
  let email = "";
  let password = "";

  try {
    const form = await request.formData();
    email = String(form.get("email") || "").trim().toLowerCase();
    password = String(form.get("password") || "");
  } catch {
    return loginError(request, "Invalid login request.");
  }

  if (!email || !password) {
    return loginError(request, "Email and password are required.");
  }

  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID?.trim();
  const supabase = getSupabaseServerClient();

  if (!tenantId || !supabase || !process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()) {
    return loginError(request, "The admin login service is not configured.");
  }

  const { data: user, error } = await supabase
    .from("admin_users")
    .select("id,email,password_hash,is_active,tenant_id")
    .eq("email", email)
    .eq("tenant_id", tenantId)
    .single();

  if (error || !user || user.tenant_id !== tenantId) return loginError(request, INVALID_CREDENTIALS);
  if (!user.is_active) return loginError(request, "This account is inactive. Please contact an administrator.");

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return loginError(request, INVALID_CREDENTIALS);

  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "";
  const ua = request.headers.get("user-agent") || "";

  const { error: insertError } = await supabase.from("admin_user_sessions").insert({
    admin_user_id: user.id,
    token,
    expires_at: expiresAt.toISOString(),
    ip,
    user_agent: ua
  });

  if (insertError) return loginError(request, "Unable to sign in. Please try again.");

  await supabase.from("admin_users").update({ last_login_at: new Date().toISOString() }).eq("id", user.id).eq("tenant_id", tenantId);

  const response = NextResponse.redirect(new URL("/admin", request.url), 303);
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    expires: expiresAt,
    path: "/"
  };
  response.cookies.set(SESSION_COOKIE, token, cookieOptions);
  response.cookies.set(TENANT_COOKIE, tenantId, cookieOptions);
  return response;
}
