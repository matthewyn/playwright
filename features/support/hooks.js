import { AfterStep, Before, Status } from "@cucumber/cucumber";
import { chromium, expect } from "@playwright/test";

Before(async function () {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  this.page = await context.newPage();
});

AfterStep(async function ({ result }) {
  if (result.status == Status.FAILED) {
    await this.page.screenshot({ path: "screenshot1.png" });
  }
});
