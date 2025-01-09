import { test, expect } from "@playwright/test";

test("Download", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/download");
  // note that Promise.all prevents a race condition
  //between clicking and waiting for the download.
  const [download] = await Promise.all([
    //it is important to call waitForEvent before clicking to set up waiting
    page.waitForEvent("download"),
    //triggers the download
    page.locator("text=DummyFile.txt").click(),
  ]);
  //wait for download to complete
  const path = await download.path();
  const url = download.url();
  console.log(path);
  console.log(url);
  expect(path).toContain("playwright");
  expect(url).toContain("DummyFile.txt");
  download.saveAs("downloaded.html");
});
