import { test, request } from "@playwright/test";
import APIUtils from "./APIUtils";

const loginPayload = {
  userEmail: "tes1234@gmail.com",
  userPassword: "Naga*321",
};

const orderPayload = {
  orders: [{ country: "India", productOrderedId: "6960ea76c941646b7a8b3dd5" }],
};

const base = test.extend({
  authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill("tes1234@gmail.com");
    await page.locator("#userPassword").fill("Naga*321");
    await page.locator("#login").click();
    await page.waitForLoadState("networkidle");
    await use(page);
  },
  createOrder: async ({}, use) => {
    const context = await request.newContext();
    const apiUtils = new APIUtils(context, loginPayload);
    const response = await apiUtils.createOrder(orderPayload);
    await use(response);
  },
  loginAndGoToEvents: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://eventhub.rahulshettyacademy.com/");
    await page.locator("#email").fill("tes1234@gmail.com");
    await page.locator("#password").fill("Naga*321");
    await page.locator("#login-btn").click();
    await use(page);
  },
});

export default base;
