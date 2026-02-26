// Cypress support file
// Base configuration for API + Frontend testing

// ── Drag-and-drop plugin (required for Challenge 5 – Sortable) ──
require('@4tw/cypress-drag-drop');

// ── Ignorar erros internos do demoqa.com (bug de React no próprio site) ──
Cypress.on('uncaught:exception', (err) => {
  // findDOMNode foi removido no React 19 – erro do site, não do teste
  if (err.message.includes('findDOMNode is not a function')) {
    return false; // impede que o Cypress falhe o teste
  }
});
