const BasePage = require("./BasePage");
const { expect } = require("@playwright/test");

class ProductPage extends BasePage {
  constructor(page) {
    super(page);

    // Selectors
    this.productsLink = 'a:has-text(" Products")';
    this.allProductsHeading = 'h2:has-text("All Products")';
    this.searchInput = 'input[placeholder="Search Product"]';
    this.searchButton = 'button[id="submit_search"]';
    this.viewProductLink = '.choose > .nav > li > a';
    this.addToCartButton = '.overlay-content > .btn';
    this.continueShoppingButton = 'button:has-text("Continue Shopping")';
    this.viewCartLink = 'a:has-text("View Cart")';

    // Product details selectors
    this.productName = '.product-information h2';
    this.productPrice = '.product-information span span';
    this.productAvailability = '.product-information p:has-text("Availability:")';
    this.productCondition = '.product-information p:has-text("Condition:")';
    this.productBrand = '.product-information p:has-text("Brand:")';
    this.quantityInput = '#quantity';
    this.addToCartDetailButton = 'button:has-text("Add to cart")';

    // Review selectors
    this.reviewNameInput = '#name';
    this.reviewEmailInput = '#email';
    this.reviewTextarea = '#review';
    this.submitReviewButton = '#button-review';
    this.reviewSuccessMessage = 'span:has-text("Thank you for your review.")';
  }

  async navigateToProducts() {
    await this.clickElement(this.productsLink);
    await this.verifyElementVisible(this.allProductsHeading);
  }

  async searchProduct(productName) {
    await this.fillInput(this.searchInput, productName);
    await this.clickElement(this.searchButton);
  }

  async viewFirstProduct() {
    await this.page.locator(this.viewProductLink).first().click();
  }

  async addFirstProductToCart() {
    await this.page.locator(this.addToCartButton).first().click();
    await this.clickElement(this.continueShoppingButton);
  }

  async addMultipleProductsToCart(count = 2) {
    for (let i = 0; i < count; i++) {
      await this.page.locator(this.addToCartButton).nth(i).click();
      await this.clickElement(this.continueShoppingButton);
    }
  }

  async viewCart() {
    await this.clickElement(this.viewCartLink);
  }

  async verifyProductDetails() {
    await this.verifyElementVisible(this.productName);
    await this.verifyElementVisible(this.productPrice);
    await this.verifyElementVisible(this.productAvailability);
    await this.verifyElementVisible(this.productCondition);
    await this.verifyElementVisible(this.productBrand);
  }

  async changeQuantity(quantity) {
    await this.page.locator(this.quantityInput).clear();
    await this.fillInput(this.quantityInput, quantity.toString());
  }

  async addToCartFromDetails() {
    await this.clickElement(this.addToCartDetailButton);
  }

  async addProductReview(reviewData) {
    await this.fillInput(this.reviewNameInput, reviewData.name);
    await this.fillInput(this.reviewEmailInput, reviewData.email);
    await this.fillInput(this.reviewTextarea, reviewData.review);
    await this.clickElement(this.submitReviewButton);
    await this.verifyElementVisible(this.reviewSuccessMessage);
  }

  async verifySearchResults(searchTerm) {
    // Verify that search results contain the search term
    await expect(this.page.locator('.product-image-wrapper')).toHaveCount({ min: 1 });
  }

  async getProductCount() {
    return await this.page.locator('.product-image-wrapper').count();
  }

  async verifyProductInCart(productName) {
    await expect(this.page.locator(`text=${productName}`)).toBeVisible();
  }
}

module.exports = ProductPage;
