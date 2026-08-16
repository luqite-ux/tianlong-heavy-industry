import Image from "next/image";
import { capabilityCards } from "@/lib/site-data";
import { SectionHeading } from "@/components/section-heading";

export const metadata = {
  title: "Manufacturing Capability",
  description: "Tianlong factory capability, workshops, production equipment, technical team, and manufacturing resources for foundry machinery."
};

export default function ManufacturingPage() {
  return (
    <section className="industrial-grid px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Manufacturing"
          title="Workshop resources for automated foundry machinery"
          titleAs="h1"
          body="Tianlong combines factory space, production equipment, technical staff, and practical installation experience to support custom foundry equipment projects."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[520px] overflow-hidden rounded-[8px] shadow-lift">
            <Image src="/assets/manufacturing-equipment.png" alt="Manufacturing equipment" fill className="object-cover" />
          </div>
          <div className="grid gap-4">
            {capabilityCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="rounded-[8px] border border-blue-100 bg-white p-6 shadow-lift">
                  <Icon className="text-brand-blue" />
                  <h2 className="mt-4 text-xl font-semibold text-ink">{card.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-steel">{card.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
