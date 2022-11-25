var elements = require("./elements");

class HomePage {
  clickConsentCookies() {
    return cy.get(elements.HOMEPAGE.CONSENT_BUTTON).last().click();
  }

  clickSearchTxtBox() {
    return cy.get(elements.HOMEPAGE.SEARCH_TXTBOX).click();
  }

  typeInSearchTxtBox(value) {
    return cy.get(elements.HOMEPAGE.SEARCH_TXTBOX).type(value);
  }

  submitSearchQuery() {
    //press enter after query is provided, for submission
    return cy.get(elements.HOMEPAGE.SEARCH_TXTBOX).type("{enter}");
  }
}

export default HomePage;
