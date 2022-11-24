// A sample test

describe("My First Test", function () {
  it("Navigates to google.com and verify title", function () {
    cy.visit("https://www.google.com");
    cy.title().should("eqs", "Google");
  });
});
