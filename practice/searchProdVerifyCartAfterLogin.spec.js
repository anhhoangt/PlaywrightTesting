const { test, expect } = require("@playwright/test");

test("Search Products and Verify Cart After Login @regression", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveURL("https://automationexercise.com/");

  // Click on 'Products' button
  await page.getByRole("link", { name: " Products" }).click();

  // Verify user is navigated to ALL PRODUCTS page successfully
  await expect(
    page.getByRole("heading", { name: "All Products" })
  ).toBeVisible();

  // Enter product name in search input and click search button
  await page.getByPlaceholder("Search Product").click();
  await page.getByPlaceholder("Search Product").fill("winter top");
  await page.getByRole("button", { name: "" }).click();

  // Verify 'SEARCHED PRODUCTS' is visible
  await page.getByRole("heading", { name: "Searched Products" }).click();

  // Verify all the products related to search are visible
  await expect(
    page.getByRole("link", { name: " View Product" })
  ).toBeVisible();
  await page.getByRole("link", { name: " View Product" }).click();

  // Add those products to cart
  //   await page.getByText("Add to cart").nth(1).click();
  await page.getByRole("button", { name: " Add to cart" }).click();
  await page.getByRole("button", { name: "Continue Shopping" }).click();

  // Click 'Cart' button and verify that products are visible in cart
  await page.getByRole("link", { name: " Cart" }).click();
  await expect(page.getByRole("link", { name: "Winter Top" })).toBeVisible();

  // Click 'Signup / Login' button and submit login details
  await page.getByRole("link", { name: " Signup / Login" }).click();
  await page
    .locator("form")
    .filter({ hasText: "Login" })
    .getByPlaceholder("Email Address")
    .click();
  await page
    .locator("form")
    .filter({ hasText: "Login" })
    .getByPlaceholder("Email Address")
    .fill("anhrmfc@gmail.com");
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").fill("123456");
  await page.getByRole("button", { name: "Login" }).click();

  // Again, go to Cart page
  await page.getByRole("link", { name: " Cart" }).click();

  // Verify that those products are visible in cart after login as well
  await expect(page.getByRole("link", { name: "Winter Top" })).toBeVisible();
  await expect(page).toHaveURL("https://automationexercise.com/view_cart");
  await expect(page.getByRole("button", { name: "1" })).toBeVisible;
});
