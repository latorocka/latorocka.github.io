// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import './api-commands'
import './ui-commands'
import './performance-commands'
import './accessibility-commands'

// Import external plugins
import 'cypress-axe'
import 'cypress-file-upload'
import 'cypress-visual-regression/dist/support'

// Global configuration
Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing on uncaught exceptions
  // This is useful for third-party scripts that might throw errors
  console.log('Uncaught exception:', err.message);
  return false;
});

// Global before hook
before(() => {
  cy.log('Starting Cypress Test Suite');
  cy.task('log', 'Test suite execution started');
});

// Global after hook
after(() => {
  cy.log('Cypress Test Suite Completed');
  cy.task('log', 'Test suite execution completed');
});

// Global beforeEach hook
beforeEach(() => {
  // Set up common test data
  cy.fixture('testData').then((data) => {
    cy.wrap(data).as('testData');
  });
  
  // Set up viewport based on test type
  if (Cypress.currentTest.title.includes('mobile')) {
    cy.viewport(375, 667);
  } else if (Cypress.currentTest.title.includes('tablet')) {
    cy.viewport(768, 1024);
  } else {
    cy.viewport(1920, 1080);
  }
});

// Global afterEach hook
afterEach(() => {
  // Take screenshot on failure
  if (Cypress.currentTest.state === 'failed') {
    cy.screenshot(`${Cypress.currentTest.parent.title}-${Cypress.currentTest.title}-FAILED`);
  }
  
  // Clean up any test data or state
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.clearSessionStorage();
});

// Custom error handling
Cypress.on('fail', (error, runnable) => {
  cy.task('log', `Test failed: ${runnable.title} - ${error.message}`);
  throw error;
});

// Performance monitoring
Cypress.on('window:before:load', (win) => {
  win.performance.mark('cypress-start');
});

// Accessibility testing setup
Cypress.on('test:before:run', (attributes, test) => {
  if (test.title.includes('accessibility') || test.title.includes('a11y')) {
    cy.injectAxe();
  }
});

// API request logging
Cypress.on('before:request', (req) => {
  cy.task('log', `API Request: ${req.method} ${req.url}`);
});

Cypress.on('after:response', (res) => {
  cy.task('log', `API Response: ${res.status} - ${res.url}`);
});

// Console log capture
Cypress.on('window:before:load', (win) => {
  cy.stub(win.console, 'error').as('consoleError');
  cy.stub(win.console, 'warn').as('consoleWarn');
});

// Network request interception for offline testing
Cypress.on('window:before:load', (win) => {
  if (Cypress.env('OFFLINE_MODE')) {
    cy.intercept('**', { forceNetworkError: true });
  }
});

// Test retry configuration
Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed' && test.currentRetry < 2) {
    cy.task('log', `Test failed, retrying: ${test.title}`);
  }
});

// Custom test categorization
Cypress.on('test:before:run', (attributes, test) => {
  const testCategories = {
    smoke: test.title.includes('smoke') || test.file.includes('smoke'),
    regression: test.title.includes('regression') || test.file.includes('regression'),
    api: test.file.includes('api'),
    ui: test.file.includes('ui'),
    performance: test.file.includes('performance'),
    accessibility: test.file.includes('accessibility'),
    integration: test.file.includes('integration')
  };
  
  Object.keys(testCategories).forEach(category => {
    if (testCategories[category]) {
      test.tags = test.tags || [];
      test.tags.push(category);
    }
  });
});

// Environment-specific configuration
if (Cypress.env('environment') === 'staging') {
  Cypress.config('baseUrl', 'https://staging.example.com');
} else if (Cypress.env('environment') === 'production') {
  Cypress.config('baseUrl', 'https://www.example.com');
}

// Test data generation utilities
Cypress.Commands.add('generateTestData', () => {
  return cy.task('generateTestData');
});

// Global utilities
Cypress.Commands.add('waitForPageLoad', () => {
  cy.window().then((win) => {
    return new Cypress.Promise((resolve) => {
      if (win.document.readyState === 'complete') {
        resolve();
      } else {
        win.addEventListener('load', resolve);
      }
    });
  });
});

// Test execution metadata
Cypress.Commands.add('logTestStart', (testName) => {
  cy.task('log', `Starting test: ${testName}`);
  cy.task('getCurrentTimestamp').then(timestamp => {
    cy.wrap(timestamp).as('testStartTime');
  });
});

Cypress.Commands.add('logTestEnd', (testName) => {
  cy.get('@testStartTime').then(startTime => {
    const endTime = new Date().toISOString();
    cy.task('log', `Completed test: ${testName} | Start: ${startTime} | End: ${endTime}`);
  });
});