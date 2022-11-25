const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );
  allureWriter(on, config);

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents,
    specPattern: "cypress/e2e/d2/features/*.feature",
    chromeWebSecurity: false,
    env: {
      allureReuseAfterSpec: true,
    },
    experimentalRunAllSpecs: true,
    experimentalStudio: true,
    experimentalWebKitSupport: true,
    retries: {
      runMode: 0,
      openMode: 1,
    },
    reporter: "mochawesome",
    reporterOptions: {
      reportFilename: "test-report",
      overwrite: false,
    },
  },
});
