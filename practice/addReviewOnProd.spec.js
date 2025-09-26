const { test, expect } = require("@playwright/test");

test("Add review on product @regression", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("https://automationexercise.com/");

  // Click on 'Products' button..
  await page.getByRole("link", { name: " Products" }).click();

  // Verify user is navigated to ALL PRODUCTS page successfully
  await expect(
    page.getByRole("heading", { name: "All Products" })
  ).toBeVisible();

  // Click on 'View Product' button
  await page
    .locator(
      "div:nth-child(4) > .product-image-wrapper > .choose > .nav > li > a"
    )
    .click();

  // Verify 'Write Your Review' is visible
  await expect(
    page.getByRole("link", { name: "Write Your Review" })
  ).toBeVisible();

  // Enter name, email and review
  await page.getByPlaceholder("Your Name").click();
  await page.getByPlaceholder("Your Name").fill("Anh H");
  await page.getByPlaceholder("Email Address", { exact: true }).click();
  await page
    .getByPlaceholder("Email Address", { exact: true })
    .fill("anhrmfc@gmail.com");
  await page.getByPlaceholder("Add Review Here!").click();
  await page.getByPlaceholder("Add Review Here!").fill("here is the review");

  // Click 'Submit' button
  await page.getByRole("button", { name: "Submit" }).click();

  // Verify success message 'Thank you for your review.'
  await page.waitForSelector("text=Thank you for your review.");
  await expect(
    page
      .locator("#reviews div")
      .filter({ hasText: "Thank you for your review. Submit" })
  ).toBeVisible();
});
