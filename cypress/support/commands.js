// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("text", { prevSubject: true }, (subject, options) => {
  return subject.text();
});

Cypress.Commands.add("apiGET", (endpoint) => {
  cy.request({
    method: "GET",
    url: `https://cytagapi-default-rtdb.europe-west1.firebasedatabase.app/${endpoint}`,
    headers: { "Content-Type": "application/json" },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("apiPOST", (endpoint, body) => {
  cy.request({
    method: "POST",
    url: `https://cytagapi-default-rtdb.europe-west1.firebasedatabase.app/${endpoint}`,
    headers: { "Content-Type": "application/json" },
    failOnStatusCode: false,
    body: body,
  });
});

Cypress.Commands.add("apiPUT", (endpoint, body) => {
  cy.request({
    method: "PUT",
    url: `https://cytagapi-default-rtdb.europe-west1.firebasedatabase.app/${endpoint}`,
    headers: { "Content-Type": "application/json" },
    failOnStatusCode: false,
    body: body,
  });
});

Cypress.Commands.add("apiDELETE", (endpoint) => {
  cy.request({
    method: "DELETE",
    url: `https://cytagapi-default-rtdb.europe-west1.firebasedatabase.app/${endpoint}`,
    headers: { "Content-Type": "application/json" },
    failOnStatusCode: false,
  });
});
