// Cypress support file
// Base configuration for API + Frontend testing

// Drag-and-drop plugin (required for Challenge 5 - Sortable)
require('@4tw/cypress-drag-drop');

// Real events plugin (required for Challenge 3 - Web Tables submit button)
require('cypress-real-events/support');

// Ignore internal demoqa.com errors (React bug on the site itself)
Cypress.on('uncaught:exception', () => false);

// Block ad/tracking network requests before each test to prevent overlays
beforeEach(() => {
  cy.intercept('GET', '**/googlesyndication**', { statusCode: 204 }).as('blockGoogleAds');
  cy.intercept('GET', '**/doubleclick**',       { statusCode: 204 }).as('blockDoubleClick');
  cy.intercept('GET', '**/adsbygoogle**',        { statusCode: 204 }).as('blockAdsbyGoogle');
  cy.intercept('GET', '**/criteo**',             { statusCode: 204 }).as('blockCriteo');
  cy.intercept('GET', '**/amazon-adsystem**',    { statusCode: 204 }).as('blockAmazonAds');
  cy.intercept('GET', '**/adnxs**',              { statusCode: 204 }).as('blockAdnxs');
});
