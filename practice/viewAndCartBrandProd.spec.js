const { test, expect } = require("@playwright/test");

test("View and Cart Brand Product @regression", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("https://automationexercise.com/");

  // Click on 'Products' button
  await page.getByRole("link", { name: " Products" }).click();

  // Verify that Brands are visible on left side bar
  await expect(page.getByRole("heading", { name: "Brands" })).toBeVisible();

  // Click on any brand name
  await page.getByRole("link", { name: "(5) H&M" }).click();

  // Verify that user is navigated to brand page and brand products are displayed
  //https://automationexercise.com/brand_products/H&M
  await expect(
    page.getByRole("heading", { name: "Brand - H&M Products" })
  ).toBeVisible();
  await expect(page).toHaveURL(
    "https://automationexercise.com/brand_products/H&M"
  );

  // On left side bar, click on any other brand link
  await page.getByRole("link", { name: "(6) Polo" }).click();
  // Verify that user is navigated to that brand page and can see products
  await expect(
    page.getByRole("heading", { name: "Brand - Polo Products" })
  ).toBeVisible();
  await expect(page).toHaveURL(
    "https://automationexercise.com/brand_products/Polo"
  );
});
