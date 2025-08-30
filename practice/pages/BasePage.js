const { expect } = require("@playwright/test");

class BasePage {
  constructor(page) {
    this.page = page;
    this.baseURL = "https://automationexercise.com";
  }

  async navigateToHome() {
    await this.page.goto("/");
    await expect(this.page).toHaveURL(this.baseURL);
  }

  async clickElement(selector) {
    await this.page.locator(selector).click();
  }

  async fillInput(selector, text) {
    await this.page.locator(selector).fill(text);
  }

  async selectOption(selector, value) {
    await this.page.locator(selector).selectOption(value);
  }

  async checkCheckbox(selector) {
    await this.page.locator(selector).check();
  }

  async waitForElement(selector) {
    await this.page.waitForSelector(selector);
  }

  async verifyElementVisible(selector) {
    await expect(this.page.locator(selector)).toBeVisible();
  }

  async verifyText(selector, text) {
    await expect(this.page.locator(selector)).toContainText(text);
  }
}

module.exports = BasePage;
