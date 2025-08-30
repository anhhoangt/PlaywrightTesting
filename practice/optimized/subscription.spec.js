const { test } = require("@playwright/test");
const SubscriptionPage = require("../pages/SubscriptionPage");
const TestData = require("../utils/testData");

test.describe("Newsletter Subscription", () => {
  let subscriptionPage;

  test.beforeEach(async ({ page }) => {
    subscriptionPage = new SubscriptionPage(page);
    await subscriptionPage.navigateToHome();
  });

  test("Subscribe to newsletter from homepage @smoke", async ({ page }) => {
    const email = TestData.getSubscriptionEmail();

    await subscriptionPage.scrollToSubscription();
    await subscriptionPage.verifySubscriptionSection();
    await subscriptionPage.subscribeToNewsletter(email);
  });

  test("Verify subscription section is visible @functional", async ({ page }) => {
    await subscriptionPage.scrollToSubscription();
    await subscriptionPage.verifySubscriptionSection();
    await subscriptionPage.verifySubscriptionInFooter();
  });

  test("Subscribe with invalid email format @regression", async ({ page }) => {
    const invalidEmail = "invalid-email-format";

    await subscriptionPage.scrollToSubscription();
    await subscriptionPage.subscribeToNewsletter(invalidEmail);
    // Should show validation error or prevent submission
  });

  test("Subscribe with empty email @regression", async ({ page }) => {
    await subscriptionPage.scrollToSubscription();
    await subscriptionPage.subscribeToNewsletter("");
    // Should show validation error or prevent submission
  });
});
