import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { company, metrics } from "@/lib/site-data";

export const metadata = {
  title: "About Us",
  description: "Learn about Qingdao Tianlong Heavy Industry, a manufacturer of automated foundry machinery and production line equipment in Qingdao, China."
};

export default function AboutPage() {
  return (
    <section className="px-5 py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="About Tianlong"
            title="A Qingdao manufacturer focused on modern foundry automation"
            titleAs="h1"
            body={`${company.name} was founded in 2021 and is located in Pingdu, Qingdao. The company develops and manufactures automated molding machines, sand treatment equipment, and supporting line systems for foundry production.`}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {metrics.slice(0, 6).map((metric) => (
              <div key={metric.label} className="rounded-[8px] border border-blue-100 bg-white p-5 shadow-lift">
                <p className="text-2xl font-black text-brand-blue">{metric.value}</p>
                <p className="mt-2 text-xs font-semibold text-steel">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[560px] overflow-hidden rounded-[8px] shadow-lift">
          <Image src="/assets/factory-exterior.png" alt="Qingdao Tianlong factory" fill className="object-cover" />
        </div>
      </div>
    </section>
  );
}
