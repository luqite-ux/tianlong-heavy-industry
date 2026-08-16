import { InquiryForm } from "@/components/inquiry-form";
import { SectionHeading } from "@/components/section-heading";
import { company } from "@/lib/site-data";

export const metadata = {
  title: "Contact",
  description: "Contact Tianlong to discuss automated foundry machinery, molding machines, sand mixers, and complete line requirements."
};

export default function ContactPage() {
  return (
    <section className="industrial-grid px-5 py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Send your foundry machinery project inquiry"
            body="Share your machine model, production target, casting type, workshop condition, and destination country. Tianlong will review the details for technical discussion."
          />
          <div className="mt-8 rounded-[8px] border border-blue-100 bg-white p-6 shadow-lift">
            <h2 className="text-xl font-semibold text-ink">{company.name}</h2>
            <div className="mt-4 space-y-3 text-sm font-semibold text-steel">
              {company.phones.map((phone) => (
                <p key={phone}>{phone}</p>
              ))}
              <p>{company.address}</p>
            </div>
          </div>
        </div>
        <InquiryForm />
      </div>
    </section>
  );
}
