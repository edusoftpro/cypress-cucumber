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
        // we don't know the exact post id - only that it will be > 100
        // since JSONPlaceholder has built-in 100 posts
        expect(response.body)
          .property("id")
          .to.be.a("number")
          .and.to.be.gt(100);
        expect(response).property("statusText").to.eq("Created");
      });
  });

  it("Check saving the response data to be used later in the shared test context", () => {
    cy.request("https://mockend.com/edusoftpro/cypress-cucumber/posts/8")
      .its("body") // yields the first element of the returned list
      .as("blogpost") // saves the object in the test context
      .then(function () {
        // NOTE 👀
        //  By the time this callback runs the "as('blogpost')" command
        //  has saved the blogpost object in the test context.
        //  To access the test context we need to use
        //  the "function () { ... }" callback form,
        //  otherwise "this" points at a wrong or undefined object!
        cy.request(
          `https://mockend.com/edusoftpro/cypress-cucumber/users/${this.blogpost.authorId}`
        )
          .its("body")
          .as("user"); // save the new post from the response
      })
      .then(function () {
        // When this callback runs, both "cy.request" API commands have finished
        // and the test context has "blogpost" and "user" objects set.
        // Let's verify them.
        expect(this.user, "user has the right user id")
          .property("id")
          .to.eq(this.blogpost.authorId);
      });
  });
});
