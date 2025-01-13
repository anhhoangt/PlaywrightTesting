const { test, expect } = require("@playwright/test");

test("search product", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("https://automationexercise.com/");

  await page.getByRole("link", { name: " Products" }).click();
  await expect(page.getByRole("link", { name: " Products" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "All Products" })
  ).toBeVisible();

  await page.getByPlaceholder("Search Product").click();
  await page.getByPlaceholder("Search Product").fill("blue top");

  await page.getByRole("button", { name: "" }).click();
  //   await expect(page.getByRole("link", { name: " View Product" })).click();
  await page.locator(".choose > .nav > li > a").first().click();
});
