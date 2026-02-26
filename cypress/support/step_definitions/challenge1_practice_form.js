// Step Definitions: Challenge 1 - Practice Form
const { When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const { rand, randNum, randEmail } = require('../helpers/frontendHelper');

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
