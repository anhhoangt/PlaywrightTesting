const BasePage = require("./BasePage");
const { expect } = require("@playwright/test");

class NavigationPage extends BasePage {
  constructor(page) {
    super(page);

    // Header navigation selectors
    this.homeLink = 'a:has-text("Home")';
    this.productsLink = 'a:has-text("Products")';
    this.cartLink = 'a:has-text("Cart")';
    this.signupLoginLink = 'a:has-text("Signup / Login")';
    this.testCasesLink = 'a:has-text("Test Cases")';
    this.apiTestingLink = 'a:has-text("API Testing")';
    this.videoTutorialsLink = 'a:has-text("Video Tutorials")';
    this.contactUsLink = 'a:has-text("Contact us")';

    // Footer selectors
    this.footerSubscription = '#footer .single-widget h2:has-text("Subscription")';
    this.footerRecommendedItems = 'h2:has-text("recommended items")';
    this.scrollUpButton = '#scrollUp';

    // Brand logos and social media
    this.brandLogos = '.brands_products .brands-name';
    this.socialMediaLinks = '.social-icons a';

    // Main page elements
    this.carouselSlider = '#slider-carousel';
    this.featuresItems = '.features_items';
  }

  async verifyHeaderNavigation() {
    await this.verifyElementVisible(this.homeLink);
    await this.verifyElementVisible(this.productsLink);
    await this.verifyElementVisible(this.cartLink);
    await this.verifyElementVisible(this.signupLoginLink);
    await this.verifyElementVisible(this.contactUsLink);
  }

  async navigateToTestCases() {
    await this.clickElement(this.testCasesLink);
  }

  async navigateToAPITesting() {
    await this.clickElement(this.apiTestingLink);
  }

  async navigateToVideoTutorials() {
    await this.clickElement(this.videoTutorialsLink);
  }

  async verifyFooterElements() {
    await this.page.locator(this.footerSubscription).scrollIntoViewIfNeeded();
    await this.verifyElementVisible(this.footerSubscription);
  }

  async verifyCarouselSlider() {
    await this.verifyElementVisible(this.carouselSlider);
  }

  async verifyFeaturedItems() {
    await this.verifyElementVisible(this.featuresItems);
  }

  async scrollToTop() {
    await this.page.locator(this.scrollUpButton).scrollIntoViewIfNeeded();
    await this.clickElement(this.scrollUpButton);
  }

  async verifyBrandLogos() {
    await this.page.locator(this.brandLogos).first().scrollIntoViewIfNeeded();
    const brandCount = await this.page.locator(this.brandLogos).count();
    expect(brandCount).toBeGreaterThan(0);
  }

  async verifySocialMediaLinks() {
    const socialLinksCount = await this.page.locator(this.socialMediaLinks).count();
    expect(socialLinksCount).toBeGreaterThan(0);
  }

  async verifyPageTitle(expectedTitle) {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  async verifyCurrentURL(expectedURL) {
    await expect(this.page).toHaveURL(expectedURL);
  }

  async clickBrandLogo(brandIndex = 0) {
    await this.page.locator(this.brandLogos).nth(brandIndex).click();
  }

  async verifyRecommendedItems() {
    await this.page.locator(this.footerRecommendedItems).scrollIntoViewIfNeeded();
    await this.verifyElementVisible(this.footerRecommendedItems);
  }
}

module.exports = NavigationPage;
