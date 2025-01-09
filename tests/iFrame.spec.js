const { test, expect } = require("@playwright/test");

test.describe("iFrame", () => {
  test("iFrame", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/iframe");
    // const frameTest = page.frame({ name: "mce_0_ifr" });
    const frameTest = await page.frameLocator("#mce_0_ifr").locator("html");
    await frameTest.click();
    //fill into the text box
    await frameTest.getByRole("p").fill("Hello World");
  });
});
