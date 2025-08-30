const { test } = require("@playwright/test");
const SignupPage = require("../pages/SignupPage");
const LoginPage = require("../pages/LoginPage");
const CartPage = require("../pages/CartPage");
const CheckoutPage = require("../pages/CheckoutPage");
const TestData = require("../utils/testData");

test.describe.parallel("Place Order", () => {
    let signupPage, loginPage, cartPage, checkoutPage;

    test.beforeEach(async ({ page }) => {
        signupPage = new SignupPage(page);
        loginPage = new LoginPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);

        await signupPage.navigateToHome();
    });

    test("register WHILE checkout", async ({ page }) => {
        const userData = TestData.getTestUser();
        const paymentData = TestData.getPaymentData();
        const addressData = TestData.getAddressForVerification();

        // Add product to cart
        await cartPage.addProductAndGoToCart();
        await cartPage.proceedToCheckout();

        // Register while checkout
        await cartPage.clickRegisterLogin();
        await signupPage.signupWithCompleteData(userData);
        await signupPage.clickContinue();

        // Proceed with checkout
        await cartPage.navigateToCart();
        await cartPage.proceedToCheckout();

        // Verify address details and complete order
        await checkoutPage.verifyAddressDetails(addressData);
        await checkoutPage.addCommentAndPlaceOrder();
        await checkoutPage.completePayment(paymentData);

        // Clean up
        await checkoutPage.deleteAccount();
    });

    test("register BEFORE checkout @smoke", async ({ page }) => {
        const userData = TestData.getTestUser();
        const paymentData = TestData.getPaymentData();
        const addressData = TestData.getAddressForVerification();

        // Register user before checkout
        await signupPage.signupWithCompleteData(userData);
        await signupPage.clickContinue();

        // Add products to cart and checkout
        await cartPage.addProductAndGoToCart();
        await cartPage.proceedToCheckout();

        // Verify address details and complete order
        await checkoutPage.verifyAddressDetails(addressData);
        await checkoutPage.addCommentAndPlaceOrder();
        await checkoutPage.completePayment(paymentData);
    });

    test("Login before Checkout", async ({ page }) => {
        const userData = TestData.getTestUser();
        const paymentData = TestData.getPaymentData();
        const addressData = TestData.getAddressForVerification();

        // Login before checkout
        await loginPage.loginWithValidCredentials(userData.email, userData.password);

        // Navigate to cart and checkout
        await cartPage.navigateToCart();
        await cartPage.proceedToCheckout();

        // Verify address details and complete order
        await checkoutPage.verifyAddressDetails(addressData);
        await checkoutPage.addCommentAndPlaceOrder();
        await checkoutPage.completePayment(paymentData);

        // Clean up
        await checkoutPage.deleteAccount();
    });
});
