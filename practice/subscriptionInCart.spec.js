const { test, expect } = require("@playwright/test");

test("subscription in cart", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("https://automationexercise.com/");

  await page.getByRole("link", { name: " Cart" }).click();
  await expect(
    page.getByRole("heading", { name: "Subscription" })
  ).toBeVisible();

  await page.getByPlaceholder("Your email address").fill("anhrmfc@gmail.com");
  await page.getByRole("button", { name: "" }).click();
  await page.waitForSelector("text=You have been successfully subscribed!", {
    state: "hidden",
  });
  await expect(
    page.locator("text=You have been successfully subscribed!")
  ).toBeHidden();
});
