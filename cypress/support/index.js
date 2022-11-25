const moment = require("moment");
const addContext = require("mochawesome/addContext");

beforeEach(function () {
  cy.log("Test run started on : " + new moment().format("DD-MM-YYYY HH:mm:ss"));
});

// Runs after a test completes
Cypress.on("test:after:run", (test, runnable) => {
  cy.log("Test run ended on : " + new moment().format("DD-MM-YYYY HH:mm:ss"));

  const spec_title = runnable.parent.title;

  console.log("spec_title :", spec_title);
  console.log("test.state  :", test.state);
  console.log("Cypress.spec.name  :", Cypress.spec.name);
  console.log("test.title  :", test.title);
  if (test.state === "failed") {
    addContext(
      { test },
      {
        title:
          "Failing Screenshot: " +
          ">> screenshots/" +
          Cypress.spec.name +
          "/" +
          spec_title +
          " -- " +
          test.title +
          " (failed)" +
          ".png <<",
        value:
          "screenshots/" +
          Cypress.spec.name +
          "/" +
          spec_title +
          " -- " +
          test.title +
          " (failed)" +
          ".png",
      }
    );
  }
});
