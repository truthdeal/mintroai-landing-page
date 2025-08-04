import { AfterAll, BeforeAll } from "@cucumber/cucumber";
import { BrowserContext, chromium } from "@playwright/test";

let context: BrowserContext;

BeforeAll(async function () {
  // Initialize browser context
  context = await chromium.launchPersistentContext("", { headless: true });
});

AfterAll(async function () {
  // Close browser context
  if (context) {
    await context.close();
  }
});