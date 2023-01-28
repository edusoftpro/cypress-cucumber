describe("Aliasing", () => {
  beforeEach(() => {
    cy.visit("https://reqres.in/");
  });

  it.only("GET api/users .as() - alias a route for later use", () => {
    // Alias the route to wait for its response
    cy.intercept("GET", "**/api/users/*").as("getUsers");
    
    // we have code that gets a comment when
    // the button is clicked in scripts.js
    cy.get('[data-id="users-single"]').click();

    // https://on.cypress.io/wait
    cy.wait("@getUsers").its("response.statusCode").should("eq", 200);
  });
});
