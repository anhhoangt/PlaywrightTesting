import { test, expect } from "@playwright/test";

// test.describe.parallel("First suite", () => {
//   //beforeEach hooks
//   test.beforeEach(async ({ page }) => {
//     await page.goto("/");
//   });

//   // afterAll hooks
//   test.afterEach(async ({}) => {
//     console.log("After each test");
//   });

//   test.skip("first test", async ({ page }) => {
//     await page.click("text=Add/Remove Elements");
//     await page.click("text=Add Element");
//   });

//   test("Second test", async ({ page }) => {
//     await page.click("text=Add/Remove Elements");
//     await page.click("text=Add Element");
//   });

//   test("third test @sanity", async ({ page, browserName }) => {
//     test.skip(browserName === "firefox", `working on firefox fix`);
//     await page.click("text=Add/Remove Elements");
//     await page.click("text=Add Element");
//   });

//   test.only("four test @regression", async ({ page, browserName }) => {
//     test.skip(browserName === "firefox", "working on firefox fix");
//     await page.click("text=Add/Remove Elements");
//     await page.screenshot({ path: `screenshots/${browserName}.png` });
//     await page.click("text=Add Element");
//   });
// });

test.describe.parallel("Second suite", () => {
  test("Testing Selectors", async ({ page }) => {
    await page.goto("http://demoqa.com/text-box");

    await page.locator("#userName").fill("John Doe");

    await page
      .locator('[placeholder="name@example.com"]')
      .fill("testemail@test.com");

    await page.locator("#currentAddress").fill("123 Main St");

    await page.locator("#permanentAddress").fill("456 Elm St");

    // await page.locator('button:has-text("Submit")').click();
    await page.locator("#submit").click();
    await page.pause();

    const name = page.locator("#name");
    const email = page.locator("#email");
    const currentAddress = page.locator("p#currentAddress");
    const permanentAddress = page.locator("p#permanentAddress");

    await expect(name).toBeVisible();
    await expect(name).toHaveText("Name:John Doe");
    await expect(email).toBeVisible();
    await expect(email).toHaveText("Email:testemail@test.com");
    await expect(currentAddress).toBeVisible();
    await expect(currentAddress).toHaveText("Current Address :123 Main St");
    await expect(permanentAddress).toBeVisible();
    await expect(permanentAddress).toHaveText("Permananet Address :456 Elm St");
  });
});

//playwright.dev/docs

//.only will only run this test
//.skip will skip this test
// @regression, @smoke, @sanity, @functional, @performance, @regression tags can be used

// await page.screenshot({ path: `screenshots/${browserName}.png` }); to take screenshot

//npx playwright test --project=Chrome --config=playwright.config.js tests/example2.spec.js
//npm run test:chrome to run tests in chrome (defined in package.json)
//npm run test:firefox to run tests in firefox (defined in package.json)
//npm run test:chromium to run tests in chromium  (defined in package.json)

//npx playwright test --grep @smoke tests/example2.spec.js to run only smoke tests
//npx playwright test --grep-invert @smoke tests/example2.spec.js to run tests other than smoke tests
//npx playwright test --reporter=line/dot/html/json to generate reports

//test.describe.parallel("First suite",  to run tests in parallel, more worker to run tests in parallel,
//save time in case tests are lengthy

//playwright selectors
// await page.locator('text=Log In').click();
// await page.locator('button').click();
// await page.locator('button:visible').click();
// await page.locator('article:has(div.promo)').textContent();
// await page.locator('button:has-text("Log In")').click();
// await page.locator('input:right-of("text("Username"))').fill('value');
// await page.locator('xpath=//button').click();
// await page.locator('data-test-id=submit').click();
// await page.locator('button >> nth=0').click();
// await page.locator('').click();

//Assertions
// await expect(page).toHaveTitle('Google');
// await expect(page).toHaveURL('https://www.example.com');
// await expect(locator).toContainText('expected text');
// await expect(locator).toHaveCount(1);

// Inspector
// await page.pause();
//PWDEBUG=1 npx playwright test --headed tests/example2.spec.js

// Recording test with test generator
// npx playwright codegen {url}      -> to generate test code

//Authentication
// npx playwright codegen --save-storage=auth.json {url}  -> to save authentication
// npx playwright codegen --save-storage=auth.json parabank.parasoft.com
// npx playwright codegen --load-storage=auth.json parabank.parasoft.com

//Emulate on different devices, OS
// npx playwright codegen --device="iPhone 11" {url}

//Trace Viewer
// npx playwright show-trace directory/trace.zip
//configue trace in playwright.config.js

//CLI options

//debug mode
// npx playwright test --debug tests/example2.spec.js
//or PWDUBUG=1 npx playwright test tests/example2.spec.js

// --timeout=3000 to set timeout (3s)

// --list will list all the tests

// --global-timeout=30000 to set global timeout

// Parallelism and Sharding

// test.setTestTimeout(30000); to set timeout for a test

// checkboxes
// await page.locator('input[type="checkbox"]').first().check(); for 1st checkbox
// await expect(page.locator('input[type="checkbox"]').nth(1)).unchecked(); check if 2nd checkbox is unchecked

//generating PDF from a page
// npx playwright pdf --viewport-size="1280,720" https://parabank.parasoft.com/services.html sample.pdf
