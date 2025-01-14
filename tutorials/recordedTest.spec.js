import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://demoqa.com/");
  await page.locator("path").first().click();
  await page.getByText("Text Box").click();
  await page.getByPlaceholder("Full Name").click();
  await page.getByPlaceholder("Full Name").fill("test");
  await page.getByPlaceholder("Full Name").press("Tab");
  await page.getByPlaceholder("name@example.com").fill("test@gmail.com");
  await page.getByPlaceholder("name@example.com").press("Tab");
  await page.getByPlaceholder("Current Address").fill("123 main st");
  await page.getByPlaceholder("Current Address").press("Tab");
  await page.locator("#permanentAddress").fill("456 central ave");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.pause();
});
