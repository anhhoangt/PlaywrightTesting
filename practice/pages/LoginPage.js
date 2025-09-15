const BasePage = require("./BasePage");
const { expect } = require("@playwright/test");

class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    // Selectors..
    this.signupLoginLink = "text=Signup / Login";
    this.loginEmailInput = 'input[data-qa="login-email"]';
    this.passwordInput = 'input[name="password"]';
    this.loginButton = 'button:has-text("Login")';
    this.loginAccountText = "text=Login to your account";
    this.loggedInText = "text= Logged in as";
    this.invalidCredentialsText = "text=Your email or password is incorrect!";
  }

  async navigateToLoginPage() {
    await this.clickElement(this.signupLoginLink);
    await this.verifyElementVisible(this.loginAccountText);
  }

  async login(email, password) {
    await this.navigateToLoginPage();
    await this.fillInput(this.loginEmailInput, email);
    await this.fillInput(this.passwordInput, password);
    await this.clickElement(this.loginButton);
  }

  async loginWithValidCredentials(email = "anhrmfc@gmail.com", password = "123456") {
    await this.login(email, password);
    await this.verifyElementVisible(this.loggedInText);
  }

  async loginWithInvalidCredentials(email = "test321@gmail.com", password = "000000") {
    await this.login(email, password);
    await this.verifyElementVisible(this.invalidCredentialsText);
  }

  async verifyLoginSuccess(username = "Anh H") {
    await expect(this.page.locator(`text= Logged in as ${username}`)).toBeVisible();
  }

  async verifyLoginError() {
    await this.verifyElementVisible(this.invalidCredentialsText);
  }
}

module.exports = LoginPage;
