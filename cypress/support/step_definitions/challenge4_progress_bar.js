// Step Definitions: Challenge 4 - Progress Bar
const { When, Then } = require('@badeball/cypress-cucumber-preprocessor');

// ─── CHALLENGE 4 - Progress Bar ──────────────────────────────────────────────

When('I start the progress bar', () => {
  cy.get('#startStopButton').then(($btn) => {
    if ($btn.text().trim() === 'Start') {
      cy.wrap($btn).click();
    }
  });
});

When('I stop the progress bar before it reaches 25%', () => {
  cy.get('#progressBar .progress-bar').should(($bar) => {
    expect(parseInt($bar.attr('aria-valuenow'), 10)).to.be.gte(10);
  });
  cy.get('#startStopButton').click();
});

Then('the progress bar value should be at most 25%', () => {
  cy.get('#progressBar .progress-bar').then(($bar) => {
    const value = parseInt($bar.attr('aria-valuenow'), 10);
    expect(value).to.be.at.most(25);
    cy.log(`Progress bar stopped at ${value}%`);
  });
});

When('I wait for the progress bar to reach 100%', () => {
  cy.get('#progressBar .progress-bar', { timeout: 30000 }).should(($bar) => {
    const value = parseInt($bar.attr('aria-valuenow'), 10);
    expect(value).to.equal(100);
  });
  cy.log('Progress bar reached 100%');
});

Then('I reset the progress bar', () => {
  cy.get('#resetButton').should('be.visible').realClick();
  cy.get('#progressBar .progress-bar', { timeout: 5000 }).should('have.attr', 'aria-valuenow', '0');
  cy.log('Progress bar reset');
});

Then('the progress bar value should be 0%', () => {
  cy.get('#progressBar .progress-bar').should('have.attr', 'aria-valuenow', '0');
  cy.log('Progress bar is back at 0%');
});
