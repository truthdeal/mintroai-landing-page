import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();              // loads NEXT_PUBLIC_DAPP_URL, etc.

export default defineConfig({
  testDir: "./tests",         // cucumber forwards here
  timeout: 30_000,
  expect: { timeout: 5_000 },
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    viewport: { width: 1280, height: 800 },
    trace: "retain-on-failure"
  },
  reporter: [["list"], ["html", { open: "never" }]]
});