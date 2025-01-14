const { test, expect } = require("@playwright/test");

test("View Product from Cart @regression", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("https://automationexercise.com/");

  // Verify that categories are visible on left side bar
  await expect(page.getByRole("heading", { name: "Category" })).toBeVisible();

  // Click on 'Women' category
  await page.getByRole("heading", { name: " Women" }).click();

  // Click on any category link under 'Women' category, for example: Dress
  await page.getByRole("link", { name: "Dress" }).click();

  // Verify that category page is displayed and confirm text 'WOMEN - TOPS PRODUCTS'
  await expect(
    page.getByRole("heading", { name: "Women - Dress Products" })
  ).toBeVisible();

  // On left side bar, click on any sub-category link of 'Men' category
  await page.getByRole("link", { name: " Men" }).click();

  // Verify that user is navigated to that category page
  await page.getByRole("link", { name: "Tshirts" }).click();
  await expect(
    page.getByRole("heading", { name: "Men - Tshirts Products" })
  ).toBeVisible();
});
