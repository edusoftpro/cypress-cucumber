/// <reference types="cypress" />

// Task #2
const todos = ["Learn Cypress", "Make a break", "Use more Cypress"];

describe("Chaining multiple assertions", () => {
  beforeEach(() => {
    cy.visit("https://example.cypress.io/todo");
  });

  it(`Should add all todos`, () => {
    todos.forEach((todo, idx) => {
      cy.get("[data-test=new-todo]")
        .type(`${todo}{enter}`)
        .get(".todo-list li")
        .should("have.length", 2 + idx + 1) // ToDo has 2 items by default
        .last()
        .should("have.text", todo);
    });
  });
});
