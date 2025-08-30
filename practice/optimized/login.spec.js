const { test } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");
const TestData = require("../utils/testData");

test.describe.parallel("Login Suite", () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToHome();
  });

  test("Login with valid email and password", async ({ page }) => {
    const validUser = TestData.getValidUser();

    await loginPage.loginWithValidCredentials(validUser.email, validUser.password);
    await loginPage.verifyLoginSuccess(validUser.name);
  });

  test("Login with invalid email and password", async ({ page }) => {
    const invalidUser = TestData.getInvalidUser();

    await loginPage.loginWithInvalidCredentials(invalidUser.email, invalidUser.password);
    await loginPage.verifyLoginError();
  });
});
