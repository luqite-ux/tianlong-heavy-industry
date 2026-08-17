"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function LoginForm() {
  const params = useSearchParams();
  const [pending, setPending] = useState(false);
  const reason = params.get("reason");
  const error = params.get("error");

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-red-50 px-4">
      <section className="w-full max-w-md rounded-[8px] border border-blue-100 bg-white p-8 shadow-lift">
        <div className="mb-7 text-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-red">TIANLONG</p>
          <h1 className="mt-3 text-2xl font-semibold text-ink">Website Admin Login</h1>
          <p className="mt-2 text-sm text-steel">Manage products, articles, inquiries, and site settings.</p>
        </div>

        {reason === "unauthorized" && (
          <p className="mb-4 rounded-[8px] bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-800">
            Please sign in before opening the admin panel.
          </p>
        )}

        <form action="/api/auth/login" method="post" className="space-y-4" onSubmit={() => setPending(true)}>
          {error && <p className="rounded-[8px] bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p>}
          <label htmlFor="email" className="block text-sm font-semibold text-ink">
            Email
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              required
              className="mt-2 w-full rounded-[8px] border border-blue-100 bg-white px-3 py-3 text-sm text-ink outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
            />
          </label>
          <label htmlFor="password" className="block text-sm font-semibold text-ink">
            Password
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-2 w-full rounded-[8px] border border-blue-100 bg-white px-3 py-3 text-sm text-ink outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
            />
          </label>
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-brand-blue px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800 disabled:opacity-60"
          >
            {pending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<main className="grid min-h-screen place-items-center text-steel">Loading...</main>}>
      <LoginForm />
    </Suspense>
  );
}
