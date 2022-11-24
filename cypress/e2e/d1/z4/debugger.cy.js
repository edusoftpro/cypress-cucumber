/// <reference types="cypress" />

// Task #4
const todos = ["Learn Cypress", "Make a break", "Use more Cypress"];

describe("Calling debugger", () => {
  beforeEach(() => {
    cy.visit("https://example.cypress.io/todo");
  });

  it(`Should run normally`, () => {
    cy.get("[data-test=new-todo]")
      .type(`Check debugger{enter}`)
      .get(".todo-list li")
      .should("have.length", 2 + 1); // ToDo has 2 items by default
  });

  it(`Should stop in debug mode randomly`, () => {
    cy.get("[data-test=new-todo]");
    debugger;
  });

  it(`Should stop in debug mode normally`, () => {
    cy.get("[data-test=new-todo]").then(() => {
      debugger;
    });
  });

  it(`Should open debug mode normally`, () => {
    cy.get("[data-test=new-todo]").debug();
  });

  it(`Should pause normally`, () => {
    cy.get("[data-test=new-todo]")
      .pause() // Should pause test run normally
      .type(`Check debugger{enter}`)
      .get(".todo-list li")
      .should("have.length", 2 + 1); // ToDo has 2 items by default
  });

  it.only("Use debugger, debug() or pause() to fix it", () => {
    cy.get("[data-test=new-todo]")
      .type(`Check debugger{enter}`)
      .get(".todo-list li")
      .debug()
      .should("have.length", 2 + 1); // ToDo has 2 items by default
    cy.contains("Active").click();
    cy.get(".todo-list li").should("have.length", 3);
  });
});
