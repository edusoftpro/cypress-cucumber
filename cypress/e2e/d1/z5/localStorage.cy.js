describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("https://example.cypress.io/todo", {
      onBeforeLoad(win) {
        cy.stub(win.localStorage, "getItem").returns(
          '[{"title": "Foo", "completed": false}]'
        );
      },
    });
  });

  it("overwrites `window.localStorage` ", () => {
    cy.get(".todo-list li")
      .should("have.length", 1)
      .first()
      .should("have.text", "Foo");
  });
});
