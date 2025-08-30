const { expect } = require("@playwright/test");

class TestHelpers {
  static async waitForPageLoad(page, url) {
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(url);
  }

  static async takeScreenshot(page, name) {
    await page.screenshot({ path: `screenshots/${name}-${Date.now()}.png` });
  }

  static async scrollToElement(page, selector) {
    await page.locator(selector).scrollIntoViewIfNeeded();
  }

  static async waitForElementToBeVisible(page, selector, timeout = 10000) {
    await page.waitForSelector(selector, { state: 'visible', timeout });
  }

  static async retryAction(action, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
      try {
        await action();
        return;
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  static generateRandomString(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  static generateRandomEmail() {
    return `test${this.generateRandomString(6)}@example.com`;
  }

  static async clearAndFill(page, selector, text) {
    await page.locator(selector).clear();
    await page.locator(selector).fill(text);
  }

  static async verifyMultipleElements(page, selectors) {
    for (const selector of selectors) {
      await expect(page.locator(selector)).toBeVisible();
    }
  }
}

module.exports = TestHelpers;
