const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    video: false,
    screenshotOnRunFailure: false,
    chromeWebSecurity: false,
    requestTimeout: 10000,
    setupNodeEvents(on, config) {      on('task', {
        log(message) {
          console.log(message);
          return null;
        }
      });      return config;
    }
  },
});

