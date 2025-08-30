const BasePage = require("./BasePage");

class CategoryPage extends BasePage {
  constructor(page) {
    super(page);

    // Selectors
    this.categoryHeading = 'h2:has-text("Category")';
    this.womenCategory = 'h4:has-text(" Women")';
    this.menCategory = 'a:has-text(" Men")';
    this.dressLink = 'a:has-text("Dress")';
    this.tshirtsLink = 'a:has-text("Tshirts")';

    // Category page headings
    this.womenDressHeading = 'h2:has-text("Women - Dress Products")';
    this.menTshirtsHeading = 'h2:has-text("Men - Tshirts Products")';
  }

  async verifyCategoriesVisible() {
    await this.verifyElementVisible(this.categoryHeading);
  }

  async clickWomenCategory() {
    await this.clickElement(this.womenCategory);
  }

  async clickDressSubcategory() {
    await this.clickElement(this.dressLink);
    await this.verifyElementVisible(this.womenDressHeading);
  }

  async clickMenCategory() {
    await this.clickElement(this.menCategory);
  }

  async clickTshirtsSubcategory() {
    await this.clickElement(this.tshirtsLink);
    await this.verifyElementVisible(this.menTshirtsHeading);
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
