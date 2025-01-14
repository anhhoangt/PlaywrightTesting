const { test, expect } = require("@playwright/test");

test("verify Address Details in Checkout Page @regression", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveURL("https://automationexercise.com/");

  // Click 'Signup / Login' button
  await page.getByRole("link", { name: " Signup / Login" }).click();

  // Fill all details in Signup and create account
  await page.getByPlaceholder("Name").click();
  await page.getByPlaceholder("Name").fill("Kaylee");
  await page.locator('input[data-qa="signup-email"]').click();
  await page
    .locator('input[data-qa="signup-email"]')
    .fill("anhhoang3019@gmail.com");
  await page.getByRole("button", { name: "Signup" }).click();
  await page.getByLabel("Mrs.").check();
  await page.getByLabel("Password *").click();
  await page.getByLabel("Password *").fill("123456");
  await page.locator("#days").selectOption("3");
  await page.locator("#months").selectOption("3");
  await page.locator("#years").selectOption("1994");
  await page.getByLabel("Sign up for our newsletter!").check();
  await page.getByLabel("Receive special offers from").check();
  await page.getByLabel("First name *").click();
  await page.getByLabel("First name *").fill("kaylee");
  await page.getByLabel("Last name *").click();
  await page.getByLabel("Last name *").fill("ng");
  await page.getByLabel("Company", { exact: true }).click();
  await page.getByLabel("Company", { exact: true }).fill("stanford");
  await page.getByLabel("Address * (Street address, P.").click();
  await page.getByLabel("Address * (Street address, P.").fill("123 main st");
  await page.getByLabel("Country *").selectOption("United States");
  await page.getByLabel("State *").click();
  await page.getByLabel("State *").fill("california");
  await page.getByLabel("City *").click();
  await page.getByLabel("City *").fill("san jose");
  await page.locator("#zipcode").click();
  await page.locator("#zipcode").fill("91111");
  await page.getByLabel("Mobile Number *").click();
  await page.getByLabel("Mobile Number *").fill("1234561111");
  await page.getByRole("button", { name: "Create Account" }).click();

  // Verify 'ACCOUNT CREATED!' and click 'Continue' button
  await expect(page.getByText("Account Created!")).toBeVisible();
  await page.getByRole("link", { name: "Continue" }).click();

  // Verify ' Logged in as username' at top
  await expect(page.locator("text= Logged in as Kaylee")).toBeVisible();

  // Add products to cart
  await page
    .locator(
      "div:nth-child(4) > .product-image-wrapper > .single-products > .product-overlay > .overlay-content > .btn"
    )
    .click();
  await page.getByRole("button", { name: "Continue Shopping" }).click();
  // Click 'Cart' button
  await page.getByRole("link", { name: " Cart" }).click();

  // Verify that cart page is displayed
  await expect(page.locator("text=Shopping Cart")).toBeVisible();

  // Click Proceed To Checkout
  await page.getByText("Proceed To Checkout").click();

  // Verify that the delivery address is same address filled at the time registration of account
  await expect(
    page.locator("#address_delivery").getByText("Mrs. kaylee ng")
  ).toHaveText("Mrs. kaylee ng");
  await expect(
    page.locator("#address_delivery").getByText("stanford")
  ).toHaveText("stanford");
  await expect(
    page.locator("#address_delivery").getByText("main st")
  ).toHaveText("123 main st");
  await expect(
    page.locator("#address_delivery").getByText("san jose california")
  ).toHaveText("san jose california 91111");
  await expect(
    page.locator("#address_delivery").getByText("United States")
  ).toHaveText("United States");
  await expect(
    page.locator("#address_delivery").getByText("1234561111")
  ).toHaveText("1234561111");
  // Verify that the billing address is same address filled at the time registration of account
  // Click 'Delete Account' button
  // Verify 'ACCOUNT DELETED!' and click 'Continue' button
  await page.getByRole("link", { name: " Delete Account" }).click();
  await expect(page.getByText("Account Deleted!")).toBeVisible();
  await page.getByRole("link", { name: "Continue" }).click();
});
