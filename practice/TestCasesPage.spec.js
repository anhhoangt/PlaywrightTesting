const { test, expect } = require("@playwright/test");

test("Test Cases Page", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("https://automationexercise.com");

  await page.getByRole("button", { name: "Test Cases" }).click();
  await expect(page.locator("text=Test Cases").first()).toBeVisible();
  await expect(
    page.locator(
      "text=Below is the list of test Cases for you to practice the Automation. Click on the scenario for detailed Test Steps:"
    )
  ).toBeVisible();
});
