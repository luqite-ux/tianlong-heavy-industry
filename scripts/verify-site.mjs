import { chromium } from "playwright";

const routes = [
  "/",
  "/products",
  "/products/automatic-horizontal-molding-machine",
  "/about",
  "/manufacturing",
  "/quality",
  "/projects",
  "/faq",
  "/contact"
];

const forbidden = /warranty|warranties|guarantee|guaranteed|price|cart|checkout|payment|质保|保修|质量保证/i;
const errors = [];

const browser = await chromium.launch({ headless: true });

for (const viewport of [
  { width: 1440, height: 1000, name: "desktop" },
  { width: 390, height: 900, name: "mobile" }
]) {
  const page = await browser.newPage({ viewport });

  for (const route of routes) {
    const response = await page.goto(`http://localhost:3101${route}`, { waitUntil: "networkidle" });
    const title = await page.title();
    const body = await page.locator("body").innerText();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);
    const homeCount = await page.locator("header").getByText("Home", { exact: true }).count();

    if (!response || !response.ok()) errors.push(`${viewport.name} ${route} bad status ${response?.status()}`);
    if (!title) errors.push(`${viewport.name} ${route} missing title`);
    if (!homeCount) errors.push(`${viewport.name} ${route} missing Home nav`);
    if (forbidden.test(body)) errors.push(`${viewport.name} ${route} contains forbidden term`);
    if (overflow) errors.push(`${viewport.name} ${route} has horizontal overflow`);
  }

  await page.close();
}

const contact = await browser.newPage({ viewport: { width: 390, height: 900 } });
await contact.goto("http://localhost:3101/contact", { waitUntil: "networkidle" });
await contact.getByLabel("Name").fill("Test Buyer");
await contact.getByLabel("Company").fill("Foundry Test Co.");
await contact.getByLabel("Email").fill("buyer@example.com");
await contact.getByLabel("Phone / WhatsApp").fill("+1 555 0100");
await contact.getByLabel("Country / Region").fill("United States");
await contact.getByLabel("Project Message").fill("We are evaluating an automated molding line and need model selection support.");
await contact.getByRole("button", { name: /send inquiry/i }).click();
await contact.waitForTimeout(1000);
const validationFeedback = await contact.locator("text=/complete all|required|not available|not configured|try again/i").count();
if (!validationFeedback) errors.push("contact form did not show validation or error feedback");
await contact.screenshot({ path: "playwright-contact-mobile.png", fullPage: true });

await browser.close();

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`verified ${routes.length} routes on desktop and mobile`);
