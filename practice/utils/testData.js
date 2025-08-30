class TestData {
  static getValidUser() {
    return {
      name: "Anh H",
      email: "anhrmfc@gmail.com",
      password: "123456",
      account: {
        title: "Mr",
        password: "123456",
        day: "19",
        month: "3",
        year: "1992",
        newsletter: true,
        offers: true
      },
      address: {
        firstName: "test",
        lastName: "test",
        company: "tiktok",
        address1: "123 main st",
        address2: "",
        country: "United States",
        state: "California",
        city: "San Francisco",
        zipcode: "12345",
        mobileNumber: "6669995555"
      }
    };
  }

  static getTestUser() {
    return {
      name: "Kaylee",
      email: "anhhoang3019@gmail.com",
      password: "123456",
      account: {
        title: "Mrs",
        password: "123456",
        day: "3",
        month: "3",
        year: "1994",
        newsletter: true,
        offers: true
      },
      address: {
        firstName: "kaylee",
        lastName: "ng",
        company: "stanford",
        address1: "123 main st",
        address2: "",
        country: "United States",
        state: "california",
        city: "san jose",
        zipcode: "91111",
        mobileNumber: "1234561111"
      }
    };
  }

  static getInvalidUser() {
    return {
      email: "test321@gmail.com",
      password: "000000"
    };
  }

  static getPaymentData() {
    return {
      nameOnCard: "kaylee ng",
      cardNumber: "1234123412341234",
      cvc: "123",
      month: "03",
      year: "2028"
    };
  }

  static getAddressForVerification() {
    const user = this.getTestUser();
    return {
      title: "Mrs.",
      firstName: user.address.firstName,
      lastName: user.address.lastName,
      company: user.address.company,
      address1: user.address.address1,
      city: user.address.city,
      state: user.address.state,
      country: user.address.country,
      mobileNumber: user.address.mobileNumber
    };
  }

  static generateUniqueEmail() {
    const timestamp = Date.now();
    return `test${timestamp}@gmail.com`;
  }

  static generateUniqueName() {
    const timestamp = Date.now();
    return `TestUser${timestamp}`;
  }

  static getContactFormData() {
    return {
      name: "John Doe",
      email: "john.doe@example.com",
      subject: "Test Inquiry",
      message: "This is a test message for the contact form. Please ignore this automated test message."
    };
  }

  static getProductReviewData() {
    return {
      name: "Test Reviewer",
      email: "reviewer@example.com",
      review: "This is an excellent product! I highly recommend it to everyone. Great quality and fast delivery."
    };
  }

  static getSearchTerms() {
    return {
      validSearch: "blue top",
      invalidSearch: "nonexistentproduct123",
      partialSearch: "dress"
    };
  }

  static getSubscriptionEmail() {
    const timestamp = Date.now();
    return `newsletter${timestamp}@example.com`;
  }

  static getTestFilePath() {
    return "./uploadFile/monkey-1.png";
  }
}

module.exports = TestData;
