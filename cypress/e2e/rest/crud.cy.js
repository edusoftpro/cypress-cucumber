/// <reference types="cypress" />
describe("template spec", () => {
  before(() => {
    cy.request({
      method: "GET",
      url:
        "https://cytagapi-default-rtdb.europe-west1.firebasedatabase.app/" +
        "/users.json",
      headers: {
        "Content-Type": "application/json",
      },
      failOnStatusCode: false,
    }).as("get_users_data"); // here 'get_users_data' is alias for this request to be used by other steps
  });

  it("Verify response status code is {int}", () => {
    cy.get("@get_users_data").should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.eq(null);
    });
  });
});
