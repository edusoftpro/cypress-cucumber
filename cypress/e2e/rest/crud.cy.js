/// <reference types="cypress" />
const moment = require("moment");

describe("template spec", () => {
  it.only("Verify response status code is {int}", () => {
    const timestamp = moment().valueOf();
    const body = {
      user_id: timestamp,
      text: `User created at ${moment(timestamp).format(
        "HH:mm:ss on DD-MM-YYYY"
      )}`,
    };
    const firstName = "AdB";
    const lastName = "Cypress";
    const updateBody = {
      first: firstName,
      last: lastName,
    };

    cy.apiGET("users.json").should((response) => {
      expect(response.status).to.eq(200);
    });

    cy.apiPOST("users.json", body)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("name");
      })
      .then((response) => {
        cy.apiGET(`users/${response.body.name}.json`).should((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.user_id).to.eq(timestamp);
        });
      });

    cy.apiPUT(`users/${timestamp}/names.json`, updateBody).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("first");
      expect(response.body).to.have.property("last");
      cy.apiGET(`users/${timestamp}.json`).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.names.first).to.eq(firstName);
        expect(response.body.names.last).to.eq(lastName);
      });
    });

    cy.apiDELETE(`users/${timestamp}.json`).then((response) => {
      expect(response.status).to.eq(200);
      cy.apiGET(`users/${timestamp}.json`).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.eq(null);
      });
    });
  });
});
