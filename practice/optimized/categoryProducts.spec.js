const { test } = require("@playwright/test");
const CategoryPage = require("../pages/CategoryPage");

test("View Product from Cart @regression", async ({ page }) => {
  const categoryPage = new CategoryPage(page);

  await categoryPage.navigateToHome();
  await categoryPage.verifyCategoriesVisible();

  // Navigate to Women - Dress category
  await categoryPage.navigateToWomenDress();

  // Navigate to Men - Tshirts category
  await categoryPage.navigateToMenTshirts();
});
