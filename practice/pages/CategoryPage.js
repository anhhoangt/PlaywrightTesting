const BasePage = require("./BasePage");
const { expect } = require("@playwright/test");

class CategoryPage extends BasePage {
  constructor(page) {
    super(page);

    // Category page headings
    this.womenDressHeading = 'h2:has-text("Women - Dress Products")';
    this.menTshirtsHeading = 'h2:has-text("Men - Tshirts Products")';
  }

  async verifyCategoriesVisible() {
    await expect(this.page.getByRole("heading", { name: "Category" })).toBeVisible();
  }

  async clickWomenCategory() {
    await this.page.getByRole("heading", { name: " Women" }).click();
  }

  async clickDressSubcategory() {
    await this.page.getByRole("link", { name: "Dress" }).click();
    await expect(this.page.getByRole("heading", { name: "Women - Dress Products" })).toBeVisible();
  }

  async clickMenCategory() {
    await this.page.getByRole("link", { name: " Men" }).click();
  }

  async clickTshirtsSubcategory() {
    await this.page.getByRole("link", { name: "Tshirts" }).click();
    await expect(this.page.getByRole("heading", { name: "Men - Tshirts Products" })).toBeVisible();
  }

  async navigateToWomenDress() {
    await this.clickWomenCategory();
    await this.clickDressSubcategory();
  }

  async navigateToMenTshirts() {
    await this.clickMenCategory();
    await this.clickTshirtsSubcategory();
  }
}

module.exports = CategoryPage;
