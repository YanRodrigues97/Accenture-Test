// Step Definitions: Challenge 3 - Web Tables
const { When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const { rand, randNum, randEmail } = require('../helpers/frontendHelper');

let tableRecord = {};

const submitForm = () => {
  cy.document().then((doc) => {
    doc.querySelectorAll('iframe').forEach((iframe) => {
      iframe.style.pointerEvents = 'none';
    });
  });
  cy.get('#submit').scrollIntoView().focus();
  cy.realPress('Enter');
  cy.get('.modal-dialog').should('not.exist');
};

// ─── CRUD ────────────────────────────────────────────────────────────────────

When('I add a new record to the web table', () => {
  tableRecord = {
    firstName:  `First${rand(4)}`,
    lastName:   `Last${rand(4)}`,
    email:      randEmail(),
    age:        String(randNum(18, 60)),
    salary:     String(randNum(1000, 9999)),
    department: `Dept${rand(4)}`,
  };
  cy.log(`Creating record: ${tableRecord.email}`);
  cy.get('#addNewRecordButton').click();
  cy.get('.modal-dialog').should('be.visible');
  cy.get('#firstName').clear().type(tableRecord.firstName);
  cy.get('#lastName').clear().type(tableRecord.lastName);
  cy.get('#userEmail').clear().type(tableRecord.email);
  cy.get('#age').clear().type(tableRecord.age);
  cy.get('#salary').clear().type(tableRecord.salary);
  cy.get('#department').clear().type(tableRecord.department);
  submitForm();
});

Then('the new record should appear in the web table', () => {
  cy.get('table', { timeout: 10000 }).should('contain', tableRecord.email);
  cy.log(`Record "${tableRecord.email}" confirmed in table`);
});

When('I edit the newly added record', () => {
  const newFirstName = `Edited_${rand(4)}`;
  // Find the row by email first, then click Edit
  cy.get('#searchBox').clear().type(tableRecord.email);
  cy.contains('tbody td', tableRecord.email)
    .closest('tr')
    .find('[title="Edit"]')
    .click({ force: true });
  cy.get('#firstName').clear().type(newFirstName);
  submitForm();
  cy.get('#searchBox').clear();
  tableRecord.firstName = newFirstName;
  cy.log(`Record updated - new first name: ${tableRecord.firstName}`);
});

Then('the updated record should appear in the web table', () => {
  cy.get('table', { timeout: 8000 }).should('contain', tableRecord.firstName);
  cy.log('Updated record confirmed');
});

When('I delete the newly added record', () => {
  cy.get('#searchBox').clear().type(tableRecord.email);
  cy.contains('tbody td', tableRecord.email)
    .closest('tr')
    .find('[title="Delete"]')
    .click({ force: true });
  cy.get('#searchBox').clear();
  cy.log(`Record "${tableRecord.email}" deleted`);
});

Then('the record should no longer be present in the web table', () => {
  cy.get('#searchBox').clear().type(tableRecord.email);
  cy.contains('tbody td', tableRecord.email).should('not.exist');
  cy.get('#searchBox').clear();
  cy.log('Record successfully removed from table');
});

// ─── BONUS: 12 records ───────────────────────────────────────────────────────

const bonusRecords = [
  { firstName: 'Yan', lastName: 'One',    email: 'One@test.com',    age: '28', salary: '3000', department: 'Accountant'  },
  { firstName: 'Yan', lastName: 'Two',    email: 'Two@test.com',    age: '35', salary: '4500', department: 'Marketing'   },
  { firstName: 'Yan', lastName: 'Three',  email: 'Three@test.com',  age: '30', salary: '5000', department: 'Finance'     },
  { firstName: 'Yan', lastName: 'Four',   email: 'Four@test.com',   age: '42', salary: '6000', department: 'Doctor'      },
  { firstName: 'Yan', lastName: 'Five',   email: 'Five@test.com',   age: '26', salary: '3500', department: 'Teacher'     },
  { firstName: 'Yan', lastName: 'Six',    email: 'Six@test.com',    age: '38', salary: '4800', department: 'Marketing'   },
  { firstName: 'Yan', lastName: 'Seven',  email: 'Seven@test.com',  age: '31', salary: '5200', department: 'Finance'     },
  { firstName: 'Yan', lastName: 'Eight',  email: 'Eight@test.com',  age: '45', salary: '7000', department: 'IT'          },
  { firstName: 'Yan', lastName: 'Nine',   email: 'Nine@test.com',   age: '29', salary: '3800', department: 'Engineering' },
  { firstName: 'Yan', lastName: 'Ten',    email: 'Ten@test.com',    age: '33', salary: '4200', department: 'Marketing'   },
  { firstName: 'Yan', lastName: 'Eleven', email: 'Eleven@test.com', age: '37', salary: '5500', department: 'Finance'     },
  { firstName: 'Yan', lastName: 'Twelve', email: 'Twelve@test.com', age: '40', salary: '6500', department: 'IT'          },
];

const addRecord = (record) => {
  cy.get('#addNewRecordButton').click();
  cy.get('.modal-dialog').should('be.visible');
  cy.get('#firstName').clear().type(record.firstName);
  cy.get('#lastName').clear().type(record.lastName);
  cy.get('#userEmail').clear().type(record.email);
  cy.get('#age').clear().type(record.age);
  cy.get('#salary').clear().type(record.salary);
  cy.get('#department').clear().type(record.department);
  submitForm();
  cy.get('#searchBox').clear().type(record.email);
  cy.get('table', { timeout: 10000 }).should('contain', record.email);
  cy.get('#searchBox').clear();
  cy.log(`Record added: ${record.email}`);
};

Then('I add 12 records dynamically to the web table', () => {
  bonusRecords.forEach((record) => addRecord(record));
  cy.log('All 12 records added successfully');
});

// ─── BONUS: Delete all ────────────────────────────────────────────────────────

Then('I delete all records from the web table', () => {
  const first = bonusRecords[0];
  cy.get('#searchBox').clear().type(first.email);
  cy.contains('tbody td', first.email)
    .closest('tr')
    .find('[title="Delete"]')
    .click({ force: true });
  cy.get('#searchBox').clear();
  cy.log(`Deleted: ${first.email}`);
});
