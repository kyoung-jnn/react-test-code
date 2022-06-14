import { Then, When } from "cypress-cucumber-preprocessor/steps";

When("사용자가 메인화면 방문", () => {
  cy.visit(Cypress.config().baseUrl);
});
