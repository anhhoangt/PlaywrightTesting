const { test } = require("@playwright/test");
const SignupPage = require("../pages/SignupPage");
const TestData = require("../utils/testData");

test.describe("Sign up Suite", () => {
  let signupPage;

  test.beforeEach(async ({ page }) => {
    signupPage = new SignupPage(page);
    await signupPage.navigateToHome();
  });

  test("Sign up successfully @functional", async ({ page }) => {
    const userData = TestData.getValidUser();

    await signupPage.signupWithCompleteData(userData);
    await signupPage.clickContinue();
  });

  test("Sign up with already registered email @regression", async ({ page }) => {
    const userData = TestData.getValidUser();

    await signupPage.fillSignupForm(userData.name, userData.email);
    await signupPage.verifyEmailAlreadyExists();
  });
});
