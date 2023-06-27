var elements = require("./elements");

class HomePage {
  clickConsentCookies() {
    return cy.get(elements.HOMEPAGE.CONSENT_BUTTON).last().click();
  }

  clickSearchTxtBox() {
    return cy.get(elements.HOMEPAGE.SEARCH_TXTBOX).click();
  }

  typeInSearchTxtBox(value) {
    return cy.get(elements.HOMEPAGE.SEARCH_TXTBOX).type(value + '{enter}{esc}');
  }

  submitSearchQuery() {
    return cy.get(elements.HOMEPAGE.SEARCH_BUTTON).click();
  }
}

export default HomePage;
