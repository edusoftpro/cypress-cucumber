/// <reference types="Cypress" />

context("Simple demo test", () => {
  // beforeEach(() => {
  //   cy.visit("/does-not-exist");
  // });

  it("");

  it("Cypress");

  it.skip("Hello Cypress World", () => {
    expect(true).to.equal(true);
  });

  xit("True != False", () => {
    expect(true).to.equal(true);
  });

  it("Expect true to be true", () => {
    expect(true).to.be.true;
  });

  xit("Pause", () => {
    cy.pause();
  });

  xit("Debug", () => {
    cy.get(".selector-in-question").debug();
  });

  it("Viewport", () => {
    cy.viewport("iphone-7");
    expect(true).to.equal(true);
    cy.log("iphone-7");
  });

  it(
    "Retries",
    {
      retries: 1,
    },
    () => {
      expect(false).is.equal(true);
    }
  );

  it("Check Lodash Add", () => {
    expect(Cypress._.add(0, 1)).to.equal(1);
  });

  it.skip("Check Lodash Mult", () => {
    expect(Cypress._.multiply(0, 1)).to.equal(0);
  });

  it.skip("Check Div", () => {
    expect(Cypress._.divide(1, 0)).to.equal(0);
  });

  //   npx cypress run --spec "./cypress/e2e/d1/z0b/demo.cy.js"
});
