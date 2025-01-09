const { test, expect } = require("@playwright/test");

test("Contact Us Form", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("https://automationexercise.com");

  await page.locator("text=Contact Us").click();
  await expect(page.locator("text=GET IN TOUCH")).toBeVisible();

  await page.getByPlaceholder("Name").fill("Anh H");
  await page
    .getByPlaceholder("Email", { exact: true })
    .fill("anhrmfc@gmail.com");
  await page.getByPlaceholder("Subject").fill("Test the form");
  await page
    .getByPlaceholder("Your Message Here")
    .fill("This is a test message");

  const [fileChooser] = await Promise.all([
    page.waitForEvent("filechooser"),
    page.locator('input[name="upload_file"]').click(),
  ]);
  await fileChooser.setFiles("uploadFile/monkey-1.png");

  page.on("dialog", async (dialog) => {
    console.log(dialog.message());
    await dialog.accept();
  });

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(
    page.locator("#contact-page").getByText("Success! Your details have")
  ).toBeVisible();
  //   await page.getByRole("link", { name: " Home" }).second().click();
  await page.getByRole("link", { name: " Home" }).nth(1).click();
  await expect(page).toHaveURL("https://automationexercise.com/");
});
