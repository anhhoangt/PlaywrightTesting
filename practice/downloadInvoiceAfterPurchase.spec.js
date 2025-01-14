import { test, expect } from "@playwright/test";
import { existsSync } from "fs";

test("Download Invoice After Purchase @regression", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("https://automationexercise.com/");

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

  // Click 'Register / Login' button
  await page.getByRole("link", { name: "Register / Login" }).click();

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

  //Click 'Cart' button
  await page.getByRole("link", { name: " Cart" }).click();

  // Click 'Proceed To Checkout' button
  await page.getByText("Proceed To Checkout").click();

  // Verify Address Details and Review Your Order
  await expect(
    page.locator("#address_delivery").getByText("Mrs. kaylee ng")
  ).toBeVisible();
  await expect(
    page.locator("#address_delivery").getByText("stanford")
  ).toBeVisible();
  await expect(
    page.locator("#address_delivery").getByText("main st")
  ).toBeVisible();
  await expect(
    page.locator("#address_delivery").getByText("san jose california")
  ).toBeVisible();
  await expect(
    page.locator("#address_delivery").getByText("United States")
  ).toBeVisible();
  await expect(
    page.locator("#address_delivery").getByText("1234561111")
  ).toBeVisible();

  // Enter description in comment text area and click 'Place Order'
  await page.locator('textarea[name="message"]').click();
  await page.locator('textarea[name="message"]').fill("this is a test");
  await page.getByRole("link", { name: "Place Order" }).click();

  // Enter payment details: Name on Card, Card Number, CVC, Expiration date
  await page.locator('input[name="name_on_card"]').click();
  await page.locator('input[name="name_on_card"]').fill("kaylee ng");
  await page.locator('input[name="card_number"]').click();
  await page.locator('input[name="card_number"]').fill("1234123412341234");
  await page.getByPlaceholder("ex.").click();
  await page.getByPlaceholder("ex.").fill("123");
  await page.getByPlaceholder("MM").click();
  await page.getByPlaceholder("MM").fill("03");
  await page.getByPlaceholder("YYYY").click();
  await page.getByPlaceholder("YYYY").fill("2028");

  // Click 'Pay and Confirm Order' button
  await page.getByRole("button", { name: "Pay and Confirm Order" }).click();

  // Verify success message 'Your order has been placed successfully!'
  await expect(page.getByText("Congratulations! Your order")).toBeVisible();
  //   await page.pause();

  // Click 'Download Invoice' button and verify invoice is downloaded successfully.
  const [download] = await Promise.all([
    //it is important to call waitForEvent before clicking to set up waiting
    page.waitForEvent("download"),
    //triggers the download
    page.getByRole("link", { name: "Download Invoice" }).click(),
  ]);
  //wait for download to complete
  const path = await download.path();

  // Verify the file exists
  if (existsSync(path)) {
    console.log("File downloaded successfully.");
  } else {
    throw new Error("File download failed.");
  }
  // Optionally, save the file with a specific name
  download.saveAs("invoice.html");
  // Click 'Continue' button

  // Click 'Delete Account' button
  // Verify 'ACCOUNT DELETED!' and click 'Continue' button
  await page.getByRole("link", { name: " Delete Account" }).click();
  await expect(page.getByText("Account Deleted!")).toBeVisible();
  await page.getByRole("link", { name: "Continue" }).click();
});
