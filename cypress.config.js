const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Plataforma Nova (aplicación UniDoc). Solo el servidor autorizado por el docente.
    baseUrl: "https://nova.uniautonoma.edu.co",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    retries: { runMode: 1, openMode: 0 },
    viewportWidth: 1366,
    viewportHeight: 768,
  },
});
