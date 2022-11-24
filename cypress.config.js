const { defineConfig } = require("cypress");
// const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");

module.exports = defineConfig({
  e2e: {
    experimentalRunAllSpecs: true,
    experimentalStudio: true,
    experimentalWebKitSupport: true,
    retries: {
      runMode: 0,
      openMode: 1,
    },
    specPattern: "cypress/e2e/features/*.feature",
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
