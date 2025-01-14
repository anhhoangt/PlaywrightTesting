import { test, expect } from "@playwright/test";

test("Scroll Up Using Arrow And Scroll Down", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("https://automationexercise.com/");

  // Scroll down page to bottom
  // Verify 'SUBSCRIPTION' is visible
  await expect(
    page.getByRole("heading", { name: "Subscription" })
  ).toBeVisible();

  // Scroll up page to top

  // Verify that page is scrolled up and 'Full-Fledged practice website for Automation Engineers' text is visible on screen

  await expect(
    page.getByRole("heading", { name: "Full-Fledged practice website" })
  ).toHaveText("Full-Fledged practice website for Automation Engineers");
});
