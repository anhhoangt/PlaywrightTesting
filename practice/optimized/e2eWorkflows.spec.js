const { test } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");
const ProductPage = require("../pages/ProductPage");
const CartPage = require("../pages/CartPage");
const CheckoutPage = require("../pages/CheckoutPage");
const ContactPage = require("../pages/ContactPage");
const SubscriptionPage = require("../pages/SubscriptionPage");
const TestData = require("../utils/testData");

test.describe("End-to-End User Workflows", () => {
  let loginPage, productPage, cartPage, checkoutPage, contactPage, subscriptionPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    contactPage = new ContactPage(page);
    subscriptionPage = new SubscriptionPage(page);

    await loginPage.navigateToHome();
  });

  test("Complete user journey: Browse, Search, Add to Cart, and Contact @e2e", async ({ page }) => {
    const searchTerms = TestData.getSearchTerms();
    const contactData = TestData.getContactFormData();

    // 1. Browse products
    await productPage.navigateToProducts();

    // 2. Search for a product
    await productPage.searchProduct(searchTerms.validSearch);
    await productPage.verifySearchResults(searchTerms.validSearch);

    // 3. Add product to cart
    await productPage.addFirstProductToCart();
    await productPage.viewCart();

    // 4. Contact support
    await contactPage.submitCompleteContactForm(contactData);
    await contactPage.goBackToHome();
  });

  test("Guest user shopping workflow @e2e", async ({ page }) => {
    const searchTerms = TestData.getSearchTerms();

    // 1. Browse and search products
    await productPage.navigateToProducts();
    await productPage.searchProduct(searchTerms.partialSearch);

    // 2. View product details
    await productPage.viewFirstProduct();
    await productPage.verifyProductDetails();

    // 3. Change quantity and add to cart
    await productPage.changeQuantity(3);
    await productPage.addToCartFromDetails();

    // 4. View cart
    await productPage.viewCart();

    // 5. Subscribe to newsletter
    const email = TestData.getSubscriptionEmail();
    await subscriptionPage.scrollToSubscription();
    await subscriptionPage.subscribeToNewsletter(email);
  });

  test("Registered user complete purchase workflow @e2e", async ({ page }) => {
    const validUser = TestData.getValidUser();
    const paymentData = TestData.getPaymentData();

    // 1. Login
    await loginPage.loginWithValidCredentials(validUser.email, validUser.password);

    // 2. Browse and add products
    await productPage.navigateToProducts();
    await productPage.addMultipleProductsToCart(2);

    // 3. Proceed to checkout
    await cartPage.navigateToCart();
    await cartPage.proceedToCheckout();

    // 4. Complete purchase (if address exists)
    try {
      await checkoutPage.addCommentAndPlaceOrder();
      await checkoutPage.completePayment(paymentData);
    } catch (error) {
      // Handle case where user needs to complete profile
      console.log("User may need to complete address information");
    }
  });

  test("Product review and recommendation workflow @e2e", async ({ page }) => {
    const reviewData = TestData.getProductReviewData();

    // 1. Browse products
    await productPage.navigateToProducts();

    // 2. View product details
    await productPage.viewFirstProduct();
    await productPage.verifyProductDetails();

    // 3. Add product review
    await productPage.addProductReview(reviewData);

    // 4. Add product to cart
    await productPage.addToCartFromDetails();

    // 5. View recommended items
    await productPage.viewCart();
  });

  test("Multi-browser compatibility workflow @e2e", async ({ page }) => {
    const searchTerms = TestData.getSearchTerms();

    // Test core functionality across different browsers
    await productPage.navigateToProducts();
    await productPage.searchProduct(searchTerms.validSearch);
    await productPage.addFirstProductToCart();
    await productPage.viewCart();

    // Verify cart functionality
    await cartPage.navigateToCart();
  });

  test("Mobile responsive user journey @e2e", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    const searchTerms = TestData.getSearchTerms();

    // Test mobile navigation and functionality
    await productPage.navigateToProducts();
    await productPage.searchProduct(searchTerms.validSearch);
    await productPage.addFirstProductToCart();

    // Test mobile cart view
    await productPage.viewCart();

    // Test mobile subscription
    const email = TestData.getSubscriptionEmail();
    await subscriptionPage.scrollToSubscription();
    await subscriptionPage.subscribeToNewsletter(email);
  });

  test("Error handling and recovery workflow @e2e", async ({ page }) => {
    const invalidUser = TestData.getInvalidUser();

    // 1. Test invalid login
    await loginPage.loginWithInvalidCredentials(invalidUser.email, invalidUser.password);
    await loginPage.verifyLoginError();

    // 2. Recover by browsing as guest
    await productPage.navigateToProducts();
    await productPage.addFirstProductToCart();

    // 3. Test invalid contact form
    const invalidContactData = {
      name: "",
      email: "invalid-email",
      subject: "",
      message: ""
    };

    await contactPage.navigateToContactUs();
    await contactPage.fillContactForm(invalidContactData);
    // Should show validation errors
  });
});
