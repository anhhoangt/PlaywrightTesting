const { test, expect } = require("@playwright/test");

test("Remove Product from Cart @regression", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("https://automationexercise.com/");
  // Add products to cart
  await page
    .locator(
      "div:nth-child(4) > .product-image-wrapper > .single-products > .product-overlay > .overlay-content > .btn"
    )
    .click();
  await page.getByRole("button", { name: "Continue Shopping" }).click();

  //Click 'Cart' button
  await page.getByRole("link", { name: " Cart" }).click();
  // verify cart page is displayed TO DO
  await expect(page.locator("text=Shopping Cart")).toBeVisible();

  // Click 'X' button corresponding to particular product
  await page.getByRole("cell", { name: "" }).locator("a").click();
  // Verify that product is removed from the cart
  await expect(page.getByText("Cart is empty! Click here to")).toBeVisible();
});
