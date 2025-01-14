const { test, expect } = require("@playwright/test");

test.describe("Dropdown", () => {
  test("Dropdown", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/dropdown");

    await page.locator("#dropdown").selectOption({ index: 1 }); // {label: 'Option 1'}
    await expect(page.locator("#dropdown")).toHaveValue("1");

    await page.selectOption("select#dropdown", "2");
    await expect(page.locator("#dropdown")).toHaveValue("2");
  });
});
