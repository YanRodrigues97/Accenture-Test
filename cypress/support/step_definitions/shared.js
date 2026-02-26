// Shared navigation step definitions (used by all Frontend Challenges)
const { Given, When } = require('@badeball/cypress-cucumber-preprocessor');
const { dismissAds } = require('../helpers/frontendHelper');

Given('I navigate to the demoqa home page', () => {
  cy.visit('/');
  cy.get('.home-body').should('be.visible');
  dismissAds();
});

Given('I navigate to the web tables page directly', () => {
  cy.visit('/webtables');
  cy.get('table').should('be.visible');
  dismissAds();
});

When('I select the {string} section on the home page', (sectionName) => {
  cy.contains('.card-body h5', sectionName).click({ force: true });
});

When('I open the {string} page from the sidebar', (pageName) => {
  dismissAds();
  cy.contains('.left-pannel li span', pageName).click({ force: true });
});
