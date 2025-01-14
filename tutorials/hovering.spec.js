import { test, expect } from "@playwright/test";

test("Download", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/hovers");
  await page.hover('[alt="User Avatar"]');
  await expect(page.locator("text=name: user1")).toBeVisible();
  await page.locator("text=View profile").first().click();
  await expect(page.locator("text=Not Found")).toBeVisible();
  await page.pause();
});
