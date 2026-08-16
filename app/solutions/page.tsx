import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { lineFlow } from "@/lib/site-data";

export const metadata = {
  title: "Solutions",
  description: "Foundry production line solutions covering sand treatment, molding, pouring, cooling, shakeout, cleaning, and auxiliary automation."
};

export default function SolutionsPage() {
  return (
    <section className="industrial-grid px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Solutions"
          title="Automated foundry line planning from machine to workflow"
          titleAs="h1"
          body="Tianlong supports project discussions around each production stage so overseas buyers can match equipment choices with a practical workshop layout."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {lineFlow.map((step, index) => (
            <div key={step} className="rounded-[8px] border border-blue-100 bg-white p-6 shadow-lift">
              <p className="text-sm font-black text-brand-red">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="mt-4 text-xl font-semibold text-ink">{step}</h2>
              <p className="mt-3 text-sm leading-7 text-steel">Configure this stage around capacity, casting type, automation target, and available workshop space.</p>
            </div>
          ))}
        </div>
        <Link href="/contact" className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-4 text-sm font-bold text-white">
          Discuss a Line Project <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}
