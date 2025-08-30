const BasePage = require("./BasePage");
const { expect } = require("@playwright/test");

class ContactPage extends BasePage {
  constructor(page) {
    super(page);

    // Selectors
    this.contactUsLink = 'a:has-text("Contact us")';
    this.getInTouchHeading = 'h2:has-text("Get In Touch")';
    this.nameInput = 'input[data-qa="name"]';
    this.emailInput = 'input[data-qa="email"]';
    this.subjectInput = 'input[data-qa="subject"]';
    this.messageTextarea = 'textarea[data-qa="message"]';
    this.uploadFileInput = 'input[name="upload_file"]';
    this.submitButton = 'input[data-qa="submit-button"]';
    this.successMessage = '.status.alert.alert-success';
    this.homeButton = 'a:has-text("Home")';
  }

  async navigateToContactUs() {
    await this.clickElement(this.contactUsLink);
    await this.verifyElementVisible(this.getInTouchHeading);
  }

  async fillContactForm(contactData) {
    await this.fillInput(this.nameInput, contactData.name);
    await this.fillInput(this.emailInput, contactData.email);
    await this.fillInput(this.subjectInput, contactData.subject);
    await this.fillInput(this.messageTextarea, contactData.message);
  }

  async uploadFile(filePath) {
    await this.page.setInputFiles(this.uploadFileInput, filePath);
  }

  async submitContactForm() {
    // Handle the alert dialog that appears when submitting
    this.page.on('dialog', async dialog => {
      await dialog.accept();
    });

    await this.clickElement(this.submitButton);
    await this.verifyElementVisible(this.successMessage);
  }

  async goBackToHome() {
    await this.clickElement(this.homeButton);
  }

  async submitCompleteContactForm(contactData, filePath = null) {
    await this.navigateToContactUs();
    await this.fillContactForm(contactData);

    if (filePath) {
      await this.uploadFile(filePath);
    }

    await this.submitContactForm();
  }
}

module.exports = ContactPage;
