const { test, expect } = require("@playwright/test");

test.describe.parallel("Logout Suite", () => {
  test("Logout Test", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL("https://automationexercise.com");
    await page.locator("text=Signup / Login").click();
    await expect(page.locator("text=Login to your account")).toBeVisible();

    await page
      .locator('input[data-qa="login-email"]')
      .fill("anhrmfc@gmail.com");
    await page.locator('input[name="password"]').fill("123456");
    await page.locator('button:has-text("Login")').click();
    await expect(page.locator("text= Logged in as Anh H")).toBeVisible();

    await page.getByRole("link", { name: " Logout" }).click();
    await expect(page).toHaveURL("https://automationexercise.com/login");
  });
});
