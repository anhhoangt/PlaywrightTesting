import { test, expect } from "@playwright/test";

test("Upload", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/upload");

  //   //method 1 when you know for sure the fileChooser is there
  //   await page.setInputFiles("#file-upload", "uploadFile/monkey-1.png");
  //   await page.locator('input:has-text("Upload")').click();

  //   await expect(page.locator("text=File Uploaded!")).toBeVisible();
  //   page.pause();
  //   await expect(page.locator("text=monkey-1.png")).toBeVisible();

  //method 2 when you don't know if the fileChooser is there
  //note that promise.all prevent a race condition
  //between clicking and waiting for the file chooser
  const [fileChooser] = await Promise.all([
    page.waitForEvent("filechooser"),
    page.locator("#file-upload").click(),
  ]);
  await fileChooser.setFiles("uploadFile/monkey-1.png");

  await page.locator('input:has-text("Upload")').click();

  await expect(page.locator("text=File Uploaded!")).toBeVisible();
  await expect(page.locator("text=monkey-1.png")).toBeVisible();
  page.pause();
});
