import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect, Page, BrowserContext, chromium } from "@playwright/test";

setDefaultTimeout(60_000);

let context: BrowserContext;
let page: Page;

Given("I am an anonymous visitor", async () => {
  context = await chromium.launchPersistentContext("", { headless: true });
  page = await context.newPage();
});

Given("the application is running", async () => {
  // Assume dev server is running
});

const BASE = process.env.BASE_URL || "http://localhost:3000";

When("I navigate to {string}", async (route: string) => {
  const url = route.startsWith("http")
    ? route
    : new URL(route, BASE).toString();
  await page.goto(url);
});

Then("I should see the heading {string}", async (text: string) => {
  await expect(page.getByRole("heading", { name: text })).toBeVisible();
});

Then("the page should be accessible", async () => {
  await expect(page).toHaveTitle(/MintroAI/);
});

Then("the main content should be visible", async () => {
  await expect(page.getByText("Create Smart Contracts", { exact: false })).toBeVisible();
});

When("I click the navigation link {string}", async (linkText: string) => {
  await page.waitForLoadState('networkidle');
  let href = linkText.toLowerCase().replace(/\s+/g, '-');
  if (linkText === "FAQ") href = "FAQ";
  
  await page.locator(`a[href="#${href}"]`).click();
});

Then("I should see the section {string}", async (sectionId: string) => {
  await page.waitForTimeout(1000);
  const section = page.locator(`#${sectionId}`);
  await expect(section).toBeInViewport();
});

When("I scroll to the FAQ section", async () => {
  await page.evaluate(() => {
    const faqSection = document.querySelector('#FAQ');
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
  await page.waitForTimeout(1000);
});

When("I click the FAQ question {string}", async (question: string) => {
  await page.getByRole('button', { name: question }).click();
  await page.waitForTimeout(500);
});

Then("I should see the FAQ answer containing {string}", async (text: string) => {
  await expect(page.getByText(text, { exact: false })).toBeVisible();
});

When("I click the FAQ question {string} again", async (question: string) => {
  await page.getByRole('button', { name: question }).click();
  await page.waitForTimeout(500);
});

Then("the FAQ answer should be hidden", async () => {
  await expect(page.getByText("AI-powered platform", { exact: false })).not.toBeVisible();
});
