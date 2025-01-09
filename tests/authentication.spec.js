const { test, expect } = require("@playwright/test");

test.describe.parallel("Authentication", () => {
  test.use({ storageState: "auth.json" });
  test.use({ viewport: { width: 600, height: 900 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("https://parabank.parasoft.com/parabank/index.htm");
  });

  test("Saving Authentication", async ({ page }) => {
    await page.locator('input[name="username"]').click();
    await page.locator('input[name="username"]').fill("test1234");
    await page.locator('input[name="username"]').press("Tab");
    await page.locator('input[name="password"]').fill("test");
    await page.getByRole("button", { name: "Log In" }).click();

    await page.context().storageState({ path: "auth.json" });
  });

  test("Go To Open New Account @regression", async ({ page }) => {
    await page.locator("text=Open New Account").click();

    await expect(
      page.locator(
        "//input[@type='button' and @class='button' and @value='Open New Account']"
      )
    ).toBeVisible();
  });

  test("Go To Bill Pay @sanity", async ({ page }) => {
    await page.locator("text=Bill Pay").first().click();
    await page.pause();

    page.locator('//input[@name="payee.name"]').fill("John Doe");
    page.locator('//input[@name="payee.address.street"]').fill("123 Main St");
    page.locator('//input[@name="payee.address.city"]').fill("Anytown");

    const sendPaymentButton = page.locator(
      "//input[@type='button' and @class='button' and @value='Send Payment']"
    );

    await expect(sendPaymentButton).toBeVisible();
    await page.pause();
  });
});
