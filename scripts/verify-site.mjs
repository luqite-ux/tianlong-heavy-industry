import { chromium } from "playwright";

const routes = [
  "/",
  "/products",
  "/products/automatic-horizontal-molding-machine",
  "/products/automatic-static-pressure-molding-machine",
  "/products/gs-series-rotor-sand-mixer",
  "/products/supporting-foundry-line-equipment",
  "/solutions",
  "/about",
  "/manufacturing",
  "/quality",
  "/projects",
  "/faq",
  "/contact"
];

const forbidden = /warranty|warranties|guarantee|guaranteed|price|cart|checkout|payment|质保|保修|质量保证|18\.38|acre/i;
const errors = [];
const baseUrl = process.env.BASE_URL || "http://localhost:3101";

const browser = await chromium.launch({ headless: true });

for (const viewport of [
  { width: 1440, height: 1000, name: "desktop" },
  { width: 390, height: 900, name: "mobile" }
]) {
  const page = await browser.newPage({ viewport });

  for (const route of routes) {
    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForLoadState("load", { timeout: 45000 }).catch(() => {});
    const title = await page.title();
    const h1Count = await page.locator("h1").count();
    const body = await page.locator("body").innerText();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);
    const homeCount = await page.locator("header").getByText("Home", { exact: true }).count();

    if (!response || !response.ok()) errors.push(`${viewport.name} ${route} bad status ${response?.status()}`);
    if (!title) errors.push(`${viewport.name} ${route} missing title`);
    if (h1Count !== 1) errors.push(`${viewport.name} ${route} has ${h1Count} h1 elements`);
    if (!homeCount) errors.push(`${viewport.name} ${route} missing Home nav`);
    if (forbidden.test(body)) errors.push(`${viewport.name} ${route} contains forbidden term`);
    if (overflow) errors.push(`${viewport.name} ${route} has horizontal overflow`);
  }

  await page.close();
}

const contact = await browser.newPage({ viewport: { width: 390, height: 900 } });
await contact.goto(`${baseUrl}/contact`, { waitUntil: "domcontentloaded", timeout: 45000 });
await contact.waitForLoadState("load", { timeout: 45000 }).catch(() => {});
await contact.getByLabel("Name").fill("Test Buyer");
await contact.getByLabel("Company").fill("Foundry Test Co.");
await contact.getByLabel("Email").fill("buyer@example.com");
await contact.getByLabel("Phone / WhatsApp").fill("+1 555 0100");
await contact.getByLabel("Country / Region").fill("United States");
await contact.getByLabel("Project Message").fill("We are evaluating an automated molding line and need model selection support.");
await contact.getByRole("button", { name: /send inquiry/i }).click();
await contact.waitForTimeout(1000);
const validationFeedback = await contact.locator("text=/received|complete all|required|not available|not configured|try again/i").count();
if (!validationFeedback) errors.push("contact form did not show success, validation, or error feedback");
await contact.screenshot({ path: "playwright-contact-mobile.png", fullPage: true });

const structuredData = await browser.newPage();
await structuredData.goto(`${baseUrl}/products/automatic-horizontal-molding-machine`, { waitUntil: "domcontentloaded", timeout: 45000 });
await structuredData.waitForLoadState("load", { timeout: 45000 }).catch(() => {});
const jsonLd = await structuredData.locator('script[type="application/ld+json"]').allTextContents();
if (!jsonLd.some((text) => text.includes('"@type":"Organization"'))) errors.push("missing Organization JSON-LD");
if (!jsonLd.some((text) => text.includes('"@type":"Product"'))) errors.push("missing Product JSON-LD");
await structuredData.close();

await browser.close();

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`verified ${routes.length} routes on desktop and mobile`);
