const { test, expect } = require("@playwright/test");

test("subscription", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("https://automationexercise.com/");

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
