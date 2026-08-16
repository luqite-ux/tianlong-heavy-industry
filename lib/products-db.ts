import { Factory, Gauge, Settings2, Workflow, type LucideIcon } from "lucide-react";
import { defaultLocale, productFamilies } from "@/lib/site-data";
import { getSupabaseServerClient } from "@/lib/supabase";

export type ProductFamilyView = {
  slug: string;
  title: string;
  eyebrow: string;
  image: string;
  summary: string;
  models: string[];
  applications: string[];
  advantages: string[];
  icon: LucideIcon;
};

type ProductRow = {
  slug: string;
  name_i18n: Record<string, string> | null;
  name_en: string | null;
  name: string | null;
  description_i18n: Record<string, string> | null;
  description_en: string | null;
  description: string | null;
  overview_i18n: Record<string, string> | null;
  overview_en: string | null;
  overview: string | null;
  applications_i18n: Record<string, string[]> | null;
  applications: string[] | null;
  advantages_i18n: Record<string, string[]> | null;
  advantages: string[] | null;
  image_url: string | null;
  model: string | null;
  extra_data: { models?: string[] } | null;
};

const fallbackBySlug = new Map(productFamilies.map((product) => [product.slug, product]));

const iconBySlug: Record<string, LucideIcon> = {
  "automatic-horizontal-molding-machine": Factory,
  "automatic-static-pressure-molding-machine": Gauge,
  "gs-series-rotor-sand-mixer": Settings2,
  "supporting-foundry-line-equipment": Workflow
};

function localizedText(value: Record<string, string> | null | undefined, fallback: string | null | undefined, locale = defaultLocale) {
  return value?.[locale] || value?.[defaultLocale] || Object.values(value || {}).find(Boolean) || fallback || "";
}

function localizedList(value: Record<string, string[]> | null | undefined, fallback: string[] | null | undefined, locale = defaultLocale) {
  return value?.[locale] || value?.[defaultLocale] || Object.values(value || {}).find((items) => Array.isArray(items) && items.length) || fallback || [];
}

function mapProduct(row: ProductRow, locale = defaultLocale): ProductFamilyView {
  const fallback = fallbackBySlug.get(row.slug);
  const applications = localizedList(row.applications_i18n, row.applications, locale);
  const advantages = localizedList(row.advantages_i18n, row.advantages, locale);

  return {
    slug: row.slug,
    title: localizedText(row.name_i18n, row.name_en || row.name, locale) || fallback?.title || row.slug,
    eyebrow: row.model || fallback?.eyebrow || "TIANLONG",
    image: row.image_url || fallback?.image || "/assets/logo.png",
    summary:
      localizedText(row.overview_i18n, row.overview_en || row.overview, locale) ||
      localizedText(row.description_i18n, row.description_en || row.description, locale) ||
      fallback?.summary ||
      "",
    models: row.extra_data?.models?.length ? row.extra_data.models : fallback?.models || [],
    applications: applications.length ? applications : fallback?.applications || [],
    advantages: advantages.length ? advantages : fallback?.advantages || [],
    icon: iconBySlug[row.slug] || fallback?.icon || Factory
  };
}

export async function getProducts(locale = defaultLocale): Promise<ProductFamilyView[]> {
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID;
  const supabase = getSupabaseServerClient();

  if (!tenantId || !supabase) {
    return productFamilies;
  }

  const { data, error } = await supabase
    .from("products")
    .select(
      "slug,name_i18n,name_en,name,description_i18n,description_en,description,overview_i18n,overview_en,overview,applications_i18n,applications,advantages_i18n,advantages,image_url,model,extra_data"
    )
    .eq("tenant_id", tenantId)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error || !data?.length) {
    return productFamilies;
  }

  return (data as ProductRow[]).map((row) => mapProduct(row, locale));
}

export async function getProductBySlug(slug: string, locale = defaultLocale) {
  const products = await getProducts(locale);
  return products.find((product) => product.slug === slug) || null;
}
