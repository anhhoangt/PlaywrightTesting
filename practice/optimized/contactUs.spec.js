const { test } = require("@playwright/test");
const ContactPage = require("../pages/ContactPage");
const TestData = require("../utils/testData");

test.describe("Contact Us Functionality", () => {
  let contactPage;

  test.beforeEach(async ({ page }) => {
    contactPage = new ContactPage(page);
    await contactPage.navigateToHome();
  });

  test("Submit contact form with valid data @smoke", async ({ page }) => {
    const contactData = TestData.getContactFormData();

    await contactPage.submitCompleteContactForm(contactData);
    await contactPage.goBackToHome();
  });

  test("Submit contact form with file attachment @functional", async ({ page }) => {
    const contactData = TestData.getContactFormData();
    const filePath = TestData.getTestFilePath();

    await contactPage.submitCompleteContactForm(contactData, filePath);
    await contactPage.goBackToHome();
  });

  test("Verify contact form fields are required @regression", async ({ page }) => {
    await contactPage.navigateToContactUs();

    // Try to submit empty form
    await contactPage.submitContactForm();
    // Should show validation errors or prevent submission
  });

  test("Verify contact form with invalid email @regression", async ({ page }) => {
    const invalidContactData = {
      name: "Test User",
      email: "invalid-email",
      subject: "Test Subject",
      message: "Test message"
    };

    await contactPage.navigateToContactUs();
    await contactPage.fillContactForm(invalidContactData);
    await contactPage.submitContactForm();
    // Should show email validation error
  });
});
