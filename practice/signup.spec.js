const { test, expect } = require("@playwright/test");

let userName;

test.describe("Sign up Suite", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Sign up successfully @functional", async ({ page }) => {
    await expect(page).toHaveURL("https://automationexercise.com");
    // verify that the text 'Full-Fledged practice website for Automation Engineers' is visible
    //   await expect(
    //     page
    //       .locator("text=Full-Fledged practice website for Automation Engineers")
    //       .first()
    //   ).toBeVisible();

    await page.click("text=Signup / Login");
    //verify 'New User Signup!' is visible

    userName = page.locator('input[name="name"]');
    await userName.fill("Anh H");
    await page.fill('input[data-qa="signup-email"]', "anhrmfc@gmail.com");
    await page.getByRole("button", { name: "Signup" }).click();
    //verify that 'ENTER ACCOUNT INFORMATION' is visible
    await expect(page.locator("text=ENTER ACCOUNT INFORMATION")).toBeVisible();

    //check to the box with value "Mr"
    await page.locator('input[value="Mr"]').check();
    // fill password '123456'
    await page.locator('input[type="password"]').fill("123456");

    await page.locator("#days").selectOption({ value: "19" });
    await page.locator("#months").selectOption({ value: "3" });
    await page.locator("#years").selectOption({ value: "1992" });

    await page.locator('input[id="newsletter"]').check();
    await page.getByLabel("Receive special offers from").check();

    await page.locator('input[id="first_name"]').fill("test");
    await page.locator('input[name="last_name"]').fill("test");
    await page.locator('input[id="company"]').fill("tiktok");
    await page.locator('input[id="address1"]').fill("123 main st");
    await page.locator('input[id="address2"]').fill(" ");
    await page.locator("#country").selectOption({ value: "United States" });
    await page.locator("#state").fill("California");
    await page.locator("#city").fill("San Francisco");
    await page.locator("#zipcode").fill("12345");
    await page.locator("#mobile_number").fill("6669995555");
    //click on register button
    await page.getByRole("button", { name: "Create Account" }).click();

    //verify that 'Account Created!' is visible
    await expect(page.locator("text=ACCOUNT CREATED!")).toBeVisible();
    //   await page.pause();
  });

  test("Sign up with already registered email @regression", async ({
    page,
  }) => {
    await expect(page).toHaveURL("https://automationexercise.com");

    await page.click("text=Signup / Login");
    await expect(page.locator("text=New User Signup!")).toBeVisible();
    await page.locator('input[name="name"]').fill("Anh H");
    await page
      .locator('input[data-qa="signup-email"]')
      .fill("anhrmfc@gmail.com");
    await page.getByRole("button", { name: "Signup" }).click();

    await page.waitForSelector("text=Email Address already exist!");
    await expect(page.getByText("Email Address already exist!")).toBeVisible();
  });
});
