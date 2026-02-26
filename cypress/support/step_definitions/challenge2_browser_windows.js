// Step Definitions: Challenge 2 - Browser Windows
const { When, Then } = require('@badeball/cypress-cucumber-preprocessor');

When('I click the new window button', () => {
  cy.window().then((win) => {
    cy.stub(win, 'open').as('windowOpen');
  });
  cy.get('#windowButton').click();
});

Then('the new window should display {string}', (message) => {
  cy.get('@windowOpen').should('have.been.calledOnce');
  cy.get('@windowOpen').then((stub) => {
    const url = stub.args[0][0];
    cy.log(`New window URL: ${url}`);
    cy.visit(url);
    cy.contains(message).should('be.visible');
    cy.log(`Message "${message}" confirmed`);
  });
});

Then('I close the new window', () => {
  cy.go('back');
  cy.log('New window closed');
});
