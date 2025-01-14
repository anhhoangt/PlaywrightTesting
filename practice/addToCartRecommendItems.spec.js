const { test, expect } = require("@playwright/test");

test("Add to cart recommended items @regression", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("https://automationexercise.com/");

  //Verify 'RECOMMENDED ITEMS' are visible
  await expect(
    page.getByRole("heading", { name: "recommended items" })
  ).toBeVisible();

  // Click on 'Add To Cart' on Recommended product
  await page
    .locator(
      "div:nth-child(2) > .product-image-wrapper > .single-products > .productinfo > .btn"
    )
    .first()
    .click();

  // Click on 'View Cart' button
  await page.getByRole("link", { name: "View Cart" }).click();

  // Verify that product is displayed in cart page
  await expect(page.getByRole("link", { name: "Men Tshirt" })).toBeVisible();

  await expect(page.getByRole("button", { name: "1" })).toHaveText("1");
  await expect(page.getByText("Rs.").first()).toHaveText("Rs. 400");
});
