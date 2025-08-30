const BasePage = require("./BasePage");
const { expect } = require("@playwright/test");

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);

    // Selectors
    this.addressDelivery = "#address_delivery";
    this.commentTextarea = 'textarea[name="message"]';
    this.placeOrderLink = 'a:has-text("Place Order")';

    // Payment form selectors
    this.nameOnCardInput = 'input[name="name_on_card"]';
    this.cardNumberInput = 'input[name="card_number"]';
    this.cvcInput = 'input[placeholder="ex."]';
    this.monthInput = 'input[placeholder="MM"]';
    this.yearInput = 'input[placeholder="YYYY"]';
    this.payConfirmButton = 'button:has-text("Pay and Confirm Order")';

    // Success message
    this.successMessage = "text=Congratulations! Your order";

    // Delete account
    this.deleteAccountLink = 'a:has-text(" Delete Account")';
    this.accountDeletedText = "text=Account Deleted!";
    this.continueButton = 'a:has-text("Continue")';
  }

  async verifyAddressDetails(addressData) {
    await expect(this.page.locator(this.addressDelivery).getByText(`${addressData.title} ${addressData.firstName} ${addressData.lastName}`)).toBeVisible();
    await expect(this.page.locator(this.addressDelivery).getByText(addressData.company)).toBeVisible();
    await expect(this.page.locator(this.addressDelivery).getByText(addressData.address1)).toBeVisible();
    await expect(this.page.locator(this.addressDelivery).getByText(`${addressData.city} ${addressData.state}`)).toBeVisible();
    await expect(this.page.locator(this.addressDelivery).getByText(addressData.country)).toBeVisible();
    await expect(this.page.locator(this.addressDelivery).getByText(addressData.mobileNumber)).toBeVisible();
  }

  async addCommentAndPlaceOrder(comment = "this is a test") {
    await this.fillInput(this.commentTextarea, comment);
    await this.clickElement(this.placeOrderLink);
  }

  async fillPaymentDetails(paymentData) {
    await this.fillInput(this.nameOnCardInput, paymentData.nameOnCard);
    await this.fillInput(this.cardNumberInput, paymentData.cardNumber);
    await this.fillInput(this.cvcInput, paymentData.cvc);
    await this.fillInput(this.monthInput, paymentData.month);
    await this.fillInput(this.yearInput, paymentData.year);
  }

  async confirmPayment() {
    await this.clickElement(this.payConfirmButton);
    await this.verifyElementVisible(this.successMessage);
  }

  async completePayment(paymentData) {
    await this.fillPaymentDetails(paymentData);
    await this.confirmPayment();
  }

  async deleteAccount() {
    await this.clickElement(this.deleteAccountLink);
    await this.verifyElementVisible(this.accountDeletedText);
    await this.clickElement(this.continueButton);
  }
}

module.exports = CheckoutPage;
