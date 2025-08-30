const { test } = require("@playwright/test");
const NavigationPage = require("../pages/NavigationPage");

test.describe("Website Navigation and UI", () => {
  let navigationPage;

  test.beforeEach(async ({ page }) => {
    navigationPage = new NavigationPage(page);
    await navigationPage.navigateToHome();
  });

  test("Verify homepage elements are visible @smoke", async ({ page }) => {
    await navigationPage.verifyCarouselSlider();
    await navigationPage.verifyFeaturedItems();
    await navigationPage.verifyHeaderNavigation();
  });

  test("Verify footer elements and subscription @functional", async ({ page }) => {
    await navigationPage.verifyFooterElements();
    await navigationPage.verifyRecommendedItems();
  });

  test("Test scroll to top functionality @functional", async ({ page }) => {
    // Scroll down to footer first
    await navigationPage.verifyFooterElements();

    // Then scroll back to top
    await navigationPage.scrollToTop();

    // Verify we're back at the top
    await navigationPage.verifyCarouselSlider();
  });

  test("Verify brand logos are displayed @regression", async ({ page }) => {
    await navigationPage.verifyBrandLogos();
  });

  test("Navigate to Test Cases page @functional", async ({ page }) => {
    await navigationPage.navigateToTestCases();
    await navigationPage.verifyCurrentURL(/.*test_cases.*/);
  });

  test("Verify page title @smoke", async ({ page }) => {
    await navigationPage.verifyPageTitle(/.*Automation Exercise.*/);
  });

  test("Test brand logo navigation @regression", async ({ page }) => {
    await navigationPage.clickBrandLogo(0);
    // Verify navigation to brand page or product filtering
  });

  test("Verify all header navigation links @functional", async ({ page }) => {
    await navigationPage.verifyHeaderNavigation();

    // Test each navigation link
    await navigationPage.clickElement(navigationPage.productsLink);
    await navigationPage.verifyCurrentURL(/.*products.*/);

    await navigationPage.clickElement(navigationPage.homeLink);
    await navigationPage.verifyCurrentURL(/.*automationexercise.com.*/);
  });

  test("Verify responsive design elements @regression", async ({ page }) => {
    // Test different viewport sizes
    await page.setViewportSize({ width: 1200, height: 800 });
    await navigationPage.verifyHeaderNavigation();

    await page.setViewportSize({ width: 768, height: 1024 });
    await navigationPage.verifyHeaderNavigation();

    await page.setViewportSize({ width: 375, height: 667 });
    await navigationPage.verifyHeaderNavigation();
  });
});
