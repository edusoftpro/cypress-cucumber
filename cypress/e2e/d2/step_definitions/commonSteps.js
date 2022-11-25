import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import HomePage from "../pages/HomePage/HomePage";
import ResultPage from "../pages/ResultPage/ResultPage";

const homePage = new HomePage();
const resultPage = new ResultPage();

Given("I open Google homepage", () => {
  cy.visit("https://www.google.com");
});

Then("Title of web page is {string}", (title) => {
  cy.title().should("include", title);
});

When('I provide search query as {string}', (query) => {
  homePage.clickConsentCookies();
  homePage.clickSearchTxtBox();
  homePage.typeInSearchTxtBox(query);
  homePage.submitSearchQuery();
});

Then('Verify first search result to match {string} keyword', (search_keyword) => {
  let result = resultPage.verifyFirstResult(search_keyword);
});
