const { test, expect } = require("@playwright/test");

test("Add product to cart", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("https://automationexercise.com/");

  await page.getByRole("link", { name: " Products" }).click();
  await page.locator(".overlay-content > .btn").first().click();
  await page.getByRole("button", { name: "Continue Shopping" }).click();
  await page
    .locator(
      "div:nth-child(4) > .product-image-wrapper > .single-products > .product-overlay > .overlay-content > .btn"
    )
    .click();
  await page.getByRole("link", { name: "View Cart" }).click();

  await expect(page.getByRole("cell", { name: "Rs." }).first()).toBeVisible();
  await expect(
    page.locator("#product-1").getByRole("cell", { name: "1" })
  ).toBeVisible();
  await expect(
    page
      .getByRole("row", { name: "Product Image Blue Top Women" })
      .getByRole("button")
  ).toBeVisible();
  await expect(page.getByRole("cell", { name: "Rs." }).nth(1)).toBeVisible();
  await expect(page.getByRole("heading", { name: "Men Tshirt" })).toBeVisible();
  await expect(page.getByText("Rs.").nth(2)).toBeVisible();
  await expect(
    page
      .getByRole("row", { name: "Product Image Men Tshirt Men" })
      .getByRole("button")
  ).toBeVisible();
});
