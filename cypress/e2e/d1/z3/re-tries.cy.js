/// <reference types="cypress" />

// Task #3
describe(
  "Multiple assertions",
  {
    retries: {
      runMode: 0,
      openMode: 1,
    },
  },
  () => {
    beforeEach(() => {
      // cy.visit('/')
    });

    it(`This is OK`, () => {
      cy.visit("https://example.cypress.io/todo");
      expect(true).to.equal(true);
    });

    it(`This should re-try few times and fail`, () => {
      assert.isTrue(true, "This val is true");
      cy.visit("/");
    });
  }
);

//   npx cypress run --spec "cypress/e2e/d1/z3/re-tries.cy.js"
