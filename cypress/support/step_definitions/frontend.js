// Step Definitions: Frontend Challenges (Part 2)
// Site: https://demoqa.com
const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');

let tableRecord = {};

const rand     = (len = 6) => Math.random().toString(36).slice(2, 2 + len);
const randNum  = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randEmail = () => `${rand(6)}_${Date.now()}@testemail.com`;

// ═══════════════════════════════════════════════════════════════════════════
// SHARED NAVIGATION STEPS
// ═══════════════════════════════════════════════════════════════════════════

Given('I navigate to the demoqa home page', () => {
  cy.visit('/');
  cy.get('.home-body').should('be.visible');
});

Given('I navigate to the web tables page directly', () => {
  cy.visit('/webtables');
  cy.get('.rt-table').should('be.visible');
});

When('I select the {string} section on the home page', (sectionName) => {
  cy.contains('.card-body h5', sectionName).click();
});

When('I open the {string} page from the sidebar', (pageName) => {
  cy.contains('.left-pannel li span', pageName).click();
});

// ═══════════════════════════════════════════════════════════════════════════
// CHALLENGE 1 – Practice Form
// ═══════════════════════════════════════════════════════════════════════════

When('I fill the practice form with random values', () => {
  const firstName = `First${rand(4)}`;
  const lastName  = `Last${rand(4)}`;
  const email     = randEmail();
  const mobile    = `9${randNum(100000000, 999999999)}`;
  const address   = `${randNum(1, 999)} ${rand(8)} Street, Block ${rand(3).toUpperCase()}`;

  cy.log(`Form data - Name: ${firstName} ${lastName} | Email: ${email} | Mobile: ${mobile}`);

  cy.get('#firstName').type(firstName);
  cy.get('#lastName').type(lastName);
  cy.get('#userEmail').type(email);

  cy.get('label[for="gender-radio-1"]').click();

  cy.get('#userNumber').type(mobile);

  cy.get('#dateOfBirthInput').click();
  cy.get('.react-datepicker__month-select').select('January');
  cy.get('.react-datepicker__year-select').select('1997');
  cy.get('.react-datepicker__day--015:not(.react-datepicker__day--outside-month)').click();

  cy.get('#subjectsInput').type('Maths');
  cy.get('.subjects-auto-complete__option').first().click();

  cy.get('label[for="hobbies-checkbox-1"]').click();
  cy.get('label[for="hobbies-checkbox-2"]').click();

  cy.get('#currentAddress').type(address);

  cy.get('#state').click();
  cy.get('[id^="react-select-3-option-0"]').click();

  cy.get('#city').find('input').should('not.be.disabled');
  cy.get('#city').click();
  cy.get('[id^="react-select-4-option-0"]').click();
});

When('I upload the fixture txt file', () => {
  cy.get('#uploadPicture').selectFile('cypress/fixtures/upload.txt', { force: true });
});

When('I submit the practice form', () => {
  cy.get('#submit').scrollIntoView().click();
});

Then('a submission confirmation popup should be visible', () => {
  cy.get('.modal-content', { timeout: 8000 }).should('be.visible');
  cy.get('.modal-title').should('contain', 'Thanks for submitting the form');
  cy.log('Submission popup confirmed');
});

When('I close the confirmation popup', () => {
  cy.get('.modal').click('topLeft', { force: true });
  cy.get('.modal-content').should('not.exist');
  cy.log('Popup closed');
});

// ═══════════════════════════════════════════════════════════════════════════
// CHALLENGE 2 – Browser Windows
// ═══════════════════════════════════════════════════════════════════════════

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
