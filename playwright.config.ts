import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./e2e",
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    actionTimeout: 0,
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    headless: !!process.env.CI
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"]
      }
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"]
      }
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"]
      }
    }
  ],
  webServer: {
    command: "npm run start",
    port: 3000
  }
};

export default config;
