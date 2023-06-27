/// <reference types="cypress" />

// Read more: https://www.cypress.io/blog/2022/12/02/the-journey-behind-cy-origin/
// beforeEach(() => {
//   cy.visit("https://example.cypress.io/commands/querying");
// });

describe("Tests authentications", () => {
  it.only("Check the basic auth", () => {
    cy.visit("https://admin:admin@the-internet.herokuapp.com/basic_auth");
    cy.get("p").contains("Congratulations!");
  });

  it("Check query form", () => {
    cy.get(".query-form").within(() => {
      cy.get("input:first").should("have.attr", "placeholder", "Email");
      cy.get("input:last").should("have.attr", "placeholder", "Password");
    });
  });

  it("Fails because it's cross origin", () => {
    cy.visit("https://example.cypress.io");
    cy.visit("https://www.npmjs.com/package/cypress");
    cy.get("#homePage-link").should(
      "have.text",
      "github.com/cypress-io/cypress"
    );
  });

  it("Passes with cy.origin()", () => {
    cy.visit("https://example.cypress.io");
    cy.visit("https://www.npmjs.com/package/cypress");
    cy.origin("https://www.npmjs.com", () => {
      cy.get("#homePage-link").should(
        "have.text",
        "github.com/cypress-io/cypress"
      );
    });
  });
});
