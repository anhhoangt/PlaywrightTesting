const { test } = require("@playwright/test");
const ProductPage = require("../pages/ProductPage");
const TestData = require("../utils/testData");

test.describe("Product Search and Management", () => {
  let productPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    await productPage.navigateToHome();
  });

  test("Search for existing product @smoke", async ({ page }) => {
    const searchTerms = TestData.getSearchTerms();

    await productPage.navigateToProducts();
    await productPage.searchProduct(searchTerms.validSearch);
    await productPage.verifySearchResults(searchTerms.validSearch);
  });

  test("Search for non-existing product @regression", async ({ page }) => {
    const searchTerms = TestData.getSearchTerms();

    await productPage.navigateToProducts();
    await productPage.searchProduct(searchTerms.invalidSearch);

    // Verify no products found or appropriate message
    const productCount = await productPage.getProductCount();
    // Should be 0 or show "No products found" message
  });

  test("View product details @functional", async ({ page }) => {
    await productPage.navigateToProducts();
    await productPage.viewFirstProduct();
    await productPage.verifyProductDetails();
  });

  test("Add single product to cart @smoke", async ({ page }) => {
    await productPage.navigateToProducts();
    await productPage.addFirstProductToCart();
    await productPage.viewCart();
    // Verify product is in cart
  });

  test("Add multiple products to cart @regression", async ({ page }) => {
    await productPage.navigateToProducts();
    await productPage.addMultipleProductsToCart(3);
    await productPage.viewCart();
    // Verify multiple products are in cart
  });

  test("Change product quantity and add to cart @functional", async ({ page }) => {
    await productPage.navigateToProducts();
    await productPage.viewFirstProduct();
    await productPage.changeQuantity(5);
    await productPage.addToCartFromDetails();
    await productPage.viewCart();
    // Verify quantity is correct in cart
  });

  test("Add product review @functional", async ({ page }) => {
    const reviewData = TestData.getProductReviewData();

    await productPage.navigateToProducts();
    await productPage.viewFirstProduct();
    await productPage.addProductReview(reviewData);
  });
});
