// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  retries: 1,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  use: {
    browserName: "webkit",
    headless: false,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chrome",
      use: {
        browserName: "chromium",
        headless: false,
        screenshot: "only-on-failure",
        ignoreHTTPSErrors: true,
        trace: "retain-on-failure",
        ...devices["BlackBerry Z30"],
      },
    },
    {
      name: "webkit",
      use: {
        browserName: "webkit",
        headless: false,
        viewport: { width: 720, height: 720 },
      },
    },
  ],
});
