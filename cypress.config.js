const { defineConfig } = require('cypress');
const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;

async function setupPlugins(on, config) {
  const bundler = createBundler({
    plugins: [createEsbuildPlugin(config)],
  });

  on('file:preprocessor', bundler);
  await addCucumberPreprocessorPlugin(on, config);
  return config;
}

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    specPattern: 'cypress/e2e/**/*.feature',
    stepDefinitions: 'cypress/support/step_definitions/**/*.js',
    video: false,
    screenshotOnRunFailure: false,
    chromeWebSecurity: false,
    requestTimeout: 10000,
    setupNodeEvents: setupPlugins,
  },
});

