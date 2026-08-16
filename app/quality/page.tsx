import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { qualityItems } from "@/lib/site-data";

export const metadata = {
  title: "Quality & Certificates",
  description: "Quality control communication, inspection coordination, and certificate gallery for Tianlong foundry machinery projects."
};

export default function QualityPage() {
  return (
    <section className="px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Quality"
          title="Clear inspection communication for industrial equipment projects"
          titleAs="h1"
          body="Tianlong keeps quality discussion focused on process checks, assembly review, available technical documents, and coordinated inspection requirements."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative min-h-[520px] overflow-hidden rounded-[8px] border border-blue-100 bg-white shadow-lift">
            <Image src="/assets/certificate.jpg" alt="Tianlong certificate" fill className="object-contain p-5" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {qualityItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[8px] border border-blue-100 bg-white p-6 shadow-lift">
                  <Icon className="text-brand-blue" />
                  <h2 className="mt-4 text-xl font-semibold text-ink">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-steel">Confirm the details needed for your project during the inquiry and technical communication stage.</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
