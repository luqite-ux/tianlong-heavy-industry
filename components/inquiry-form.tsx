"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export function InquiryForm({ interest = "Foundry machinery project" }: { interest?: string }) {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(formData: FormData) {
    setState("submitting");
    setMessage("");

    const payload = {
      name: String(formData.get("name") || ""),
      company: String(formData.get("company") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      country: String(formData.get("country") || ""),
      interest: String(formData.get("interest") || interest),
      message: String(formData.get("message") || ""),
      sourcePath: window.location.pathname
    };

    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      setState("success");
      setMessage("Your inquiry has been received. Tianlong will review your project information and respond soon.");
      return;
    }

    const data = await response.json().catch(() => null);
    setState("error");
    setMessage(data?.message || "The inquiry service is not available right now. Please try again or contact us by phone.");
  }

  return (
    <form action={onSubmit} className="grid gap-4 rounded-[8px] border border-blue-100 bg-white p-5 shadow-lift md:p-7">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Company" name="company" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone / WhatsApp" name="phone" required />
        <Field label="Country / Region" name="country" required />
        <Field label="Product Interest" name="interest" defaultValue={interest} required />
      </div>
      <label className="grid gap-2 text-sm font-bold text-ink">
        Project Message
        <textarea
          name="message"
          required
          rows={5}
          className="rounded-[8px] border border-blue-100 bg-blue-50/45 px-4 py-3 text-sm font-medium text-ink outline-none transition focus:border-brand-blue focus:bg-white"
          placeholder="Tell us about the casting type, expected output, workshop layout, preferred automation level, and destination country."
        />
      </label>
      <button
        type="submit"
        disabled={state === "submitting"}
        className="rounded-full bg-brand-blue px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {state === "submitting" ? "Sending..." : "Send Inquiry"}
      </button>
      {message ? (
        <p className={state === "success" ? "text-sm font-semibold text-green-700" : "text-sm font-semibold text-brand-red"}>
          {message}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-ink">
      {label}
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        className="rounded-[8px] border border-blue-100 bg-blue-50/45 px-4 py-3 text-sm font-medium text-ink outline-none transition focus:border-brand-blue focus:bg-white"
      />
    </label>
  );
}
