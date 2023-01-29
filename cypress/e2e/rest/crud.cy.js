/// <reference types="cypress" />

describe("Tests for auto-generated API on-line", () => {
  it("Check list of users and its basic properties", () => {
    cy.request("https://mockend.com/edusoftpro/cypress-cucumber/users").should(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.length(100);
        expect(response).to.have.property("headers");
        expect(response).to.have.property("duration");
      }
    );
  });

  it("Check passing the response data to the next request", () => {
    // first, let's find out the userId of the first user we have
    cy.request("https://mockend.com/edusoftpro/cypress-cucumber/users/1")
      .its("body") // yields the first element of the returned list
      .then((user) => {
        expect(user).property("id").to.be.a("number");
        // make a new post on behalf of the user
        cy.request(
          "POST",
          "https://mockend.com/edusoftpro/cypress-cucumber/posts",
          {
            userId: user.id,
            title: "Cypress Test Runner",
            body: "Fast, easy and reliable testing for anything that runs in a browser.",
          }
        );
      })
      // note that the value here is the returned value of the 2nd request
      // which is the new post object
      .then((response) => {
        expect(response).property("status").to.equal(201); // new entity created
        expect(response).property("body").to.contain({
          title: "Cypress Test Runner",
        });
        // we don't know the exact post id - only that it will be > 100
        // since JSONPlaceholder has built-in 100 posts
        expect(response.body)
          .property("id")
          .to.be.a("number")
          .and.to.be.gt(100);
        // we don't know the user id here - since it was in above closure
        // so in this test just confirm that the property is there
        expect(response.body).property("userId").to.be.a("number");
      });
  });

  it("Check saving the response data to be used later in the shared test context", () => {
    cy.request("https://mockend.com/edusoftpro/cypress-cucumber/users/1")
      .its("body") // yields the first element of the returned list
      .as("user") // saves the object in the test context
      .then(function () {
        // NOTE 👀
        //  By the time this callback runs the "as('user')" command
        //  has saved the user object in the test context.
        //  To access the test context we need to use
        //  the "function () { ... }" callback form,
        //  otherwise "this" points at a wrong or undefined object!
        cy.request(
          "POST",
          "https://mockend.com/edusoftpro/cypress-cucumber/posts",
          {
            userId: this.user.id,
            title: "Cypress Test Runner",
            body: "Fast, easy and reliable testing for anything that runs in a browser.",
          }
        )
          .its("body")
          .as("post"); // save the new post from the response
      })
      .then(function () {
        // When this callback runs, both "cy.request" API commands have finished
        // and the test context has "user" and "post" objects set.
        // Let's verify them.
        expect(this.post, "post has the right user id")
          .property("userId")
          .to.equal(this.user.id);
      });
  });
});
