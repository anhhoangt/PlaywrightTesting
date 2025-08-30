const BasePage = require("./BasePage");
const { expect } = require("@playwright/test");

class SubscriptionPage extends BasePage {
  constructor(page) {
    super(page);

    // Selectors
    this.subscriptionHeading = 'h2:has-text("Subscription")';
    this.subscriptionEmailInput = '#susbscribe_email';
    this.subscribeButton = '#subscribe';
    this.successMessage = '.alert-success';
    this.footerSubscription = '#footer .single-widget';
  }

  async verifySubscriptionSection() {
    await this.verifyElementVisible(this.subscriptionHeading);
  }

  async subscribeToNewsletter(email) {
    await this.fillInput(this.subscriptionEmailInput, email);
    await this.clickElement(this.subscribeButton);
    await this.verifyElementVisible(this.successMessage);
  }

  async scrollToSubscription() {
    await this.page.locator(this.subscriptionHeading).scrollIntoViewIfNeeded();
  }

  async verifySubscriptionInFooter() {
    await this.verifyElementVisible(this.footerSubscription);
  }
}

module.exports = SubscriptionPage;
