const BasePage = require("./BasePage");

class SignupPage extends BasePage {
  constructor(page) {
    super(page);

    // Selectors
    this.signupLoginLink = "text=Signup / Login";
    this.nameInput = 'input[name="name"]';
    this.signupEmailInput = 'input[data-qa="signup-email"]';
    this.signupButton = 'button:has-text("Signup")';
    this.newUserSignupText = "text=New User Signup!";
    this.enterAccountInfoText = "text=ENTER ACCOUNT INFORMATION";
    this.accountCreatedText = "text=ACCOUNT CREATED!";
    this.emailExistsText = "text=Email Address already exist!";

    // Account Information Form
    this.titleMr = 'input[value="Mr"]';
    this.titleMrs = 'input[value="Mrs"]';
    this.passwordField = 'input[type="password"]';
    this.dayDropdown = "#days";
    this.monthDropdown = "#months";
    this.yearDropdown = "#years";
    this.newsletterCheckbox = 'input[id="newsletter"]';
    this.offersCheckbox = 'input[id="optin"]';

    // Address Information
    this.firstNameInput = 'input[id="first_name"]';
    this.lastNameInput = 'input[name="last_name"]';
    this.companyInput = 'input[id="company"]';
    this.address1Input = 'input[id="address1"]';
    this.address2Input = 'input[id="address2"]';
    this.countryDropdown = "#country";
    this.stateInput = "#state";
    this.cityInput = "#city";
    this.zipcodeInput = "#zipcode";
    this.mobileNumberInput = "#mobile_number";
    this.createAccountButton = 'button:has-text("Create Account")';
    this.continueButton = 'a:has-text("Continue")';
  }

  async navigateToSignupPage() {
    await this.clickElement(this.signupLoginLink);
    await this.verifyElementVisible(this.newUserSignupText);
  }

  async fillSignupForm(name, email) {
    await this.navigateToSignupPage();
    await this.fillInput(this.nameInput, name);
    await this.fillInput(this.signupEmailInput, email);
    await this.clickElement(this.signupButton);
  }

  async fillAccountInformation(accountData) {
    await this.verifyElementVisible(this.enterAccountInfoText);

    // Select title
    if (accountData.title === "Mr") {
      await this.checkCheckbox(this.titleMr);
    } else {
      await this.checkCheckbox(this.titleMrs);
    }

    await this.fillInput(this.passwordField, accountData.password);
    await this.selectOption(this.dayDropdown, accountData.day);
    await this.selectOption(this.monthDropdown, accountData.month);
    await this.selectOption(this.yearDropdown, accountData.year);

    if (accountData.newsletter) {
      await this.checkCheckbox(this.newsletterCheckbox);
    }

    if (accountData.offers) {
      await this.checkCheckbox(this.offersCheckbox);
    }
  }

  async fillAddressInformation(addressData) {
    await this.fillInput(this.firstNameInput, addressData.firstName);
    await this.fillInput(this.lastNameInput, addressData.lastName);
    await this.fillInput(this.companyInput, addressData.company);
    await this.fillInput(this.address1Input, addressData.address1);
    await this.fillInput(this.address2Input, addressData.address2 || "");
    await this.selectOption(this.countryDropdown, addressData.country);
    await this.fillInput(this.stateInput, addressData.state);
    await this.fillInput(this.cityInput, addressData.city);
    await this.fillInput(this.zipcodeInput, addressData.zipcode);
    await this.fillInput(this.mobileNumberInput, addressData.mobileNumber);
  }

  async completeSignup() {
    await this.clickElement(this.createAccountButton);
    await this.verifyElementVisible(this.accountCreatedText);
  }

  async signupWithCompleteData(userData) {
    await this.fillSignupForm(userData.name, userData.email);
    await this.fillAccountInformation(userData.account);
    await this.fillAddressInformation(userData.address);
    await this.completeSignup();
  }

  async verifyEmailAlreadyExists() {
    await this.verifyElementVisible(this.emailExistsText);
  }

  async clickContinue() {
    await this.clickElement(this.continueButton);
  }
}

module.exports = SignupPage;
