const { test, expect } = require("@playwright/test");

test.describe.parallel("Login Suite", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  test("Login with valid email and password", async ({ page }) => {
    await expect(page).toHaveURL("https://automationexercise.com");

    await page.locator("text=Signup / Login").click();
    //verify 'New User Signup!' is visible
    await expect(page.locator("text=Login to your account")).toBeVisible();

    await page
      .locator('input[data-qa="login-email"]')
      .fill("anhrmfc@gmail.com");
    await page.locator('input[name="password"]').fill("123456");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.locator("text= Logged in as Anh H")).toBeVisible();

    // await page.getByRole("link", { name: " Delete Account" }).click();
    // await expect(page.locator("text=Account Deleted!")).toBeVisible();
  });

  //test with invalid email and password
  test("Login with invalid email and password", async ({ page }) => {
    await expect(page).toHaveURL("https://automationexercise.com");

    await page.locator("text=Signup / Login").click();
    //verify 'New User Signup!' is visible
    await expect(page.locator("text=Login to your account")).toBeVisible();

    await page
      .locator('input[data-qa="login-email"]')
      .fill("test321@gmail.com");

    await page.locator('input[name="password"]').fill("000000");
    await page.locator('button:has-text("Login")').click();

    await expect(
      page.locator("text=Your email or password is incorrect!")
    ).toBeVisible();
  });
});
