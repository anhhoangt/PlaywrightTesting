const BasePage = require("./BasePage");

class CartPage extends BasePage {
  constructor(page) {
    super(page);

    // Selectors
    this.cartLink = 'a:has-text(" Cart")';
    this.shoppingCartText = "text=Shopping Cart";
    this.proceedToCheckoutButton = "text=Proceed To Checkout";
    this.continueShoppingButton = 'button:has-text("Continue Shopping")';
    this.registerLoginLink = 'a:has-text("Register / Login")';

    // Product selectors
    this.addToCartButton = ".product-overlay .overlay-content .btn";
    this.productAddButton = "div:nth-child(4) > .product-image-wrapper > .single-products > .product-overlay > .overlay-content > .btn";
  }

  async addProductToCart() {
    await this.clickElement(this.productAddButton);
    await this.clickElement(this.continueShoppingButton);
  }

  async navigateToCart() {
    await this.clickElement(this.cartLink);
    await this.verifyElementVisible(this.shoppingCartText);
  }

  async proceedToCheckout() {
    await this.clickElement(this.proceedToCheckoutButton);
  }

  async addProductAndGoToCart() {
    await this.addProductToCart();
    await this.navigateToCart();
  }

  async clickRegisterLogin() {
    await this.clickElement(this.registerLoginLink);
  }
}

module.exports = CartPage;
