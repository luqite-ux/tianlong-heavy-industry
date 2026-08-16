import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { galleryImages } from "@/lib/site-data";

export const metadata = {
  title: "Projects",
  description: "Factory, installation, equipment, and certificate scenes from Tianlong foundry machinery manufacturing."
};

export default function ProjectsPage() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-red-50/40 px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Projects & Scenes"
          title="Visual proof from factory and equipment scenes"
          titleAs="h1"
          body="This gallery uses real available Tianlong materials to show factory environment, manufacturing resources, site installation context, and certificates."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {galleryImages.map((image) => (
            <figure key={image.src} className="overflow-hidden rounded-[8px] border border-white bg-white shadow-lift">
              <div className="relative aspect-[1.65]">
                <Image src={image.src} alt={image.alt} fill className="object-cover" />
              </div>
              <figcaption className="flex items-center justify-between p-5">
                <span className="font-bold text-ink">{image.label}</span>
                <Link href="/contact" className="text-sm font-bold text-brand-blue">Ask About Project Fit</Link>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
