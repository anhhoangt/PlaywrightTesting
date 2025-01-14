const { test, expect } = require("@playwright/test");

test.describe("Product Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL("https://automationexercise.com/");
  });

  test("Product Quantity in Cart", async ({ page }) => {
    //click "View Products" link
    await page.locator(".choose > .nav > li > a").first().click();
    await expect(page).toHaveURL(
      "https://automationexercise.com/product_details/1"
    );

    await page.locator("#quantity").fill("4");
    await page.getByRole("button", { name: " Add to cart" }).click();
    await page.getByRole("link", { name: "View Cart" }).click();
    //verify the quantity of the product in the cart
    await expect(page.getByRole("button", { name: "4" })).toHaveText("4");
  });
});
