// Step Definitions: Challenge 5 - Sortable
const { Then } = require('@badeball/cypress-cucumber-preprocessor');

// ─── CHALLENGE 5 - Sortable ──────────────────────────────────────────────────

const ITEMS = '#demo-tabpane-list .list-group-item';

const CORRECT_ORDER = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];

const performSort = () => {
  cy.get(ITEMS).then(($items) => {
    const texts = [...$items].map((el) => el.innerText.trim());

    if (texts.join(',') === CORRECT_ORDER.join(',')) return;

    let fromIndex = -1;
    let toIndex   = -1;

    for (let i = 0; i < CORRECT_ORDER.length; i++) {
      if (texts[i] !== CORRECT_ORDER[i]) {
        toIndex   = i;
        fromIndex = texts.indexOf(CORRECT_ORDER[i]);
        break;
      }
    }

    cy.get(ITEMS).eq(fromIndex).drag(ITEMS + ':nth-child(' + (toIndex + 1) + ')');
    performSort();
  });
};

Then('I shuffle the list items', () => {
  cy.get(ITEMS).eq(0).drag(ITEMS + ':nth-child(6)');
  cy.get(ITEMS).eq(4).drag(ITEMS + ':nth-child(1)');
  cy.get(ITEMS).eq(2).drag(ITEMS + ':nth-child(5)');
  cy.log('List shuffled');
});

Then('I sort the list items in ascending order', () => {
  performSort();
});

Then('the list items should be in ascending order', () => {
  cy.get(ITEMS).then(($items) => {
    const texts = [...$items].map((el) => el.innerText.trim());
    expect(texts).to.deep.equal(CORRECT_ORDER);
    cy.log('List sorted: ' + CORRECT_ORDER.join(', '));
  });
});
