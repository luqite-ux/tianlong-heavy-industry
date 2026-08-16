import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { faqItems } from "@/lib/site-data";

export const metadata = {
  title: "FAQ",
  description: "Common project questions about Tianlong foundry machinery models, customization, project information, and production cycle."
};

export default function FaqPage() {
  return (
    <section className="industrial-grid px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions before starting a foundry machinery inquiry"
          body="These answers help buyers prepare project information before technical discussion with Tianlong."
          align="center"
        />
        <div className="mt-10 grid gap-4">
          {faqItems.map((item) => (
            <div key={item.question} className="rounded-[8px] border border-blue-100 bg-white p-6 shadow-lift">
              <div className="flex gap-4">
                <CheckCircle2 className="mt-1 shrink-0 text-brand-blue" />
                <div>
                  <h2 className="text-xl font-semibold text-ink">{item.question}</h2>
                  <p className="mt-3 leading-8 text-steel">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
