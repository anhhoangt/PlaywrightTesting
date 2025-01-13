const { test, expect } = require("@playwright/test");

test("Product Detail Page", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("https://automationexercise.com");

  await page.getByRole("link", { name: " Products" }).click();
  await expect(
    page.getByRole("heading", { name: "All Products" })
  ).toBeVisible();
  // await expect(page.getByText("All Products Added! Your")).toBeVisible();
  await page.locator(".choose > .nav > li > a").first().click();

  await expect(page.getByRole("heading", { name: "Blue Top" })).toBeVisible();
  await expect(page.getByText("Rs.")).toBeVisible();
  await expect(page.getByText("Availability:")).toBeVisible();
  await expect(page.getByText("Condition:")).toBeVisible();
  await expect(page.getByText("Brand:")).toBeVisible();
});
