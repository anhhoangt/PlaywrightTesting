const { test } = require("@playwright/test");

test.describe.parallel("Drag and Drop", () => {
  test("Drag and Drop", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/drag_and_drop");
    await page.dragAndDrop("#column-a", "#column-b");
    await page.pause();
  });
});
