import { defineConfig, devices } from "@playwright/test";

const port = 3000;

export default defineConfig({
  testDir: "./browser-tests",
  timeout: 120_000,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: `http://localhost:${port}`,
    ...devices["Desktop Chrome"],
    channel: process.env.PLAYWRIGHT_BROWSER_CHANNEL || "chromium",
  },
  webServer: {
    command: `pnpm dev --hostname localhost --port ${port}`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
