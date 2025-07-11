// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- General Utility Commands --

/**
 * Custom command to safely click an element with retry logic
 * @param {string} selector - CSS selector for the element
 * @param {object} options - Options for the click command
 */
Cypress.Commands.add('safeClick', (selector, options = {}) => {
  cy.get(selector, { timeout: 10000 })
    .should('be.visible')
    .and('not.be.disabled')
    .click(options);
});

/**
 * Custom command to safely type into an input field
 * @param {string} selector - CSS selector for the input field
 * @param {string} text - Text to type
 * @param {object} options - Options for the type command
 */
Cypress.Commands.add('safeType', (selector, text, options = {}) => {
  cy.get(selector, { timeout: 10000 })
    .should('be.visible')
    .and('not.be.disabled')
    .clear()
    .type(text, options);
});

/**
 * Custom command to wait for an element to be visible
 * @param {string} selector - CSS selector for the element
 * @param {number} timeout - Timeout in milliseconds
 */
Cypress.Commands.add('waitForVisible', (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).should('be.visible');
});

/**
 * Custom command to wait for an element to disappear
 * @param {string} selector - CSS selector for the element
 * @param {number} timeout - Timeout in milliseconds
 */
Cypress.Commands.add('waitForHidden', (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).should('not.exist');
});

/**
 * Custom command to scroll to an element
 * @param {string} selector - CSS selector for the element
 */
Cypress.Commands.add('scrollToElement', (selector) => {
  cy.get(selector).scrollIntoView();
});

/**
 * Custom command to hover over an element
 * @param {string} selector - CSS selector for the element
 */
Cypress.Commands.add('hoverElement', (selector) => {
  cy.get(selector).trigger('mouseover');
});

/**
 * Custom command to double-click an element
 * @param {string} selector - CSS selector for the element
 */
Cypress.Commands.add('doubleClickElement', (selector) => {
  cy.get(selector).dblclick();
});

/**
 * Custom command to right-click an element
 * @param {string} selector - CSS selector for the element
 */
Cypress.Commands.add('rightClickElement', (selector) => {
  cy.get(selector).rightclick();
});

// -- Form Handling Commands --

/**
 * Custom command to select dropdown option by text
 * @param {string} selector - CSS selector for the dropdown
 * @param {string} optionText - Text of the option to select
 */
Cypress.Commands.add('selectDropdownByText', (selector, optionText) => {
  cy.get(selector).select(optionText);
});

/**
 * Custom command to select dropdown option by value
 * @param {string} selector - CSS selector for the dropdown
 * @param {string} optionValue - Value of the option to select
 */
Cypress.Commands.add('selectDropdownByValue', (selector, optionValue) => {
  cy.get(selector).select(optionValue);
});

/**
 * Custom command to check a checkbox
 * @param {string} selector - CSS selector for the checkbox
 */
Cypress.Commands.add('checkCheckbox', (selector) => {
  cy.get(selector).check();
});

/**
 * Custom command to uncheck a checkbox
 * @param {string} selector - CSS selector for the checkbox
 */
Cypress.Commands.add('uncheckCheckbox', (selector) => {
  cy.get(selector).uncheck();
});

/**
 * Custom command to select radio button
 * @param {string} selector - CSS selector for the radio button
 */
Cypress.Commands.add('selectRadio', (selector) => {
  cy.get(selector).check();
});

/**
 * Custom command to fill form with data
 * @param {object} formData - Object containing form field data
 */
Cypress.Commands.add('fillForm', (formData) => {
  Object.keys(formData).forEach(field => {
    cy.safeType(`[name="${field}"]`, formData[field]);
  });
});

// -- Navigation Commands --

/**
 * Custom command to navigate to a URL and wait for page load
 * @param {string} url - URL to navigate to
 */
Cypress.Commands.add('navigateToUrl', (url) => {
  cy.visit(url);
  cy.waitForPageLoad();
});

/**
 * Custom command to go back in browser history
 */
Cypress.Commands.add('navigateBack', () => {
  cy.go('back');
});

/**
 * Custom command to go forward in browser history
 */
Cypress.Commands.add('navigateForward', () => {
  cy.go('forward');
});

/**
 * Custom command to refresh the page
 */
Cypress.Commands.add('refreshPage', () => {
  cy.reload();
});

// -- Wait Commands --

/**
 * Custom command to wait for a specific amount of time
 * @param {number} milliseconds - Time to wait in milliseconds
 */
Cypress.Commands.add('waitFor', (milliseconds) => {
  cy.wait(milliseconds);
});

/**
 * Custom command to wait for network idle
 */
Cypress.Commands.add('waitForNetworkIdle', () => {
  cy.intercept('**').as('networkRequests');
  cy.wait('@networkRequests');
});

/**
 * Custom command to wait for page to be fully loaded
 */
Cypress.Commands.add('waitForFullPageLoad', () => {
  cy.window().its('document.readyState').should('equal', 'complete');
});

// -- Assertion Commands --

/**
 * Custom command to assert element contains specific text
 * @param {string} selector - CSS selector for the element
 * @param {string} text - Text to assert
 */
Cypress.Commands.add('assertElementContainsText', (selector, text) => {
  cy.get(selector).should('contain.text', text);
});

/**
 * Custom command to assert element has specific attribute
 * @param {string} selector - CSS selector for the element
 * @param {string} attribute - Attribute name
 * @param {string} value - Expected attribute value
 */
Cypress.Commands.add('assertElementHasAttribute', (selector, attribute, value) => {
  cy.get(selector).should('have.attr', attribute, value);
});

/**
 * Custom command to assert element is visible
 * @param {string} selector - CSS selector for the element
 */
Cypress.Commands.add('assertElementVisible', (selector) => {
  cy.get(selector).should('be.visible');
});

/**
 * Custom command to assert element is hidden
 * @param {string} selector - CSS selector for the element
 */
Cypress.Commands.add('assertElementHidden', (selector) => {
  cy.get(selector).should('not.be.visible');
});

/**
 * Custom command to assert element exists
 * @param {string} selector - CSS selector for the element
 */
Cypress.Commands.add('assertElementExists', (selector) => {
  cy.get(selector).should('exist');
});

/**
 * Custom command to assert element does not exist
 * @param {string} selector - CSS selector for the element
 */
Cypress.Commands.add('assertElementNotExists', (selector) => {
  cy.get(selector).should('not.exist');
});

/**
 * Custom command to assert page title
 * @param {string} expectedTitle - Expected page title
 */
Cypress.Commands.add('assertPageTitle', (expectedTitle) => {
  cy.title().should('equal', expectedTitle);
});

/**
 * Custom command to assert current URL
 * @param {string} expectedUrl - Expected URL
 */
Cypress.Commands.add('assertCurrentUrl', (expectedUrl) => {
  cy.url().should('equal', expectedUrl);
});

/**
 * Custom command to assert URL contains specific text
 * @param {string} text - Text that should be in the URL
 */
Cypress.Commands.add('assertUrlContains', (text) => {
  cy.url().should('contain', text);
});

// -- Local Storage Commands --

/**
 * Custom command to set item in localStorage
 * @param {string} key - Storage key
 * @param {string} value - Storage value
 */
Cypress.Commands.add('setLocalStorage', (key, value) => {
  cy.window().then((win) => {
    win.localStorage.setItem(key, value);
  });
});

/**
 * Custom command to get item from localStorage
 * @param {string} key - Storage key
 */
Cypress.Commands.add('getLocalStorage', (key) => {
  return cy.window().then((win) => {
    return win.localStorage.getItem(key);
  });
});

/**
 * Custom command to clear localStorage
 */
Cypress.Commands.add('clearLocalStorage', () => {
  cy.window().then((win) => {
    win.localStorage.clear();
  });
});

// -- Session Storage Commands --

/**
 * Custom command to set item in sessionStorage
 * @param {string} key - Storage key
 * @param {string} value - Storage value
 */
Cypress.Commands.add('setSessionStorage', (key, value) => {
  cy.window().then((win) => {
    win.sessionStorage.setItem(key, value);
  });
});

/**
 * Custom command to get item from sessionStorage
 * @param {string} key - Storage key
 */
Cypress.Commands.add('getSessionStorage', (key) => {
  return cy.window().then((win) => {
    return win.sessionStorage.getItem(key);
  });
});

/**
 * Custom command to clear sessionStorage
 */
Cypress.Commands.add('clearSessionStorage', () => {
  cy.window().then((win) => {
    win.sessionStorage.clear();
  });
});

// -- Cookie Commands --

/**
 * Custom command to set cookie
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {object} options - Cookie options
 */
Cypress.Commands.add('setCookie', (name, value, options = {}) => {
  cy.setCookie(name, value, options);
});

/**
 * Custom command to get cookie
 * @param {string} name - Cookie name
 */
Cypress.Commands.add('getCookie', (name) => {
  return cy.getCookie(name);
});

/**
 * Custom command to clear all cookies
 */
Cypress.Commands.add('clearCookies', () => {
  cy.clearCookies();
});

// -- File Commands --

/**
 * Custom command to upload file
 * @param {string} selector - CSS selector for file input
 * @param {string} fileName - Name of the file to upload
 */
Cypress.Commands.add('uploadFile', (selector, fileName) => {
  cy.get(selector).attachFile(fileName);
});

/**
 * Custom command to download file
 * @param {string} url - URL to download from
 */
Cypress.Commands.add('downloadFile', (url) => {
  cy.request(url).then((response) => {
    expect(response.status).to.eq(200);
  });
});

// -- Screenshot Commands --

/**
 * Custom command to take screenshot with custom name
 * @param {string} name - Screenshot name
 */
Cypress.Commands.add('takeScreenshot', (name) => {
  cy.screenshot(name);
});

/**
 * Custom command to take element screenshot
 * @param {string} selector - CSS selector for the element
 * @param {string} name - Screenshot name
 */
Cypress.Commands.add('takeElementScreenshot', (selector, name) => {
  cy.get(selector).screenshot(name);
});

// -- Performance Commands --

/**
 * Custom command to measure page load time
 */
Cypress.Commands.add('measurePageLoadTime', () => {
  cy.window().then((win) => {
    const loadTime = win.performance.timing.loadEventEnd - win.performance.timing.navigationStart;
    cy.log(`Page load time: ${loadTime}ms`);
    return loadTime;
  });
});

/**
 * Custom command to get performance metrics
 */
Cypress.Commands.add('getPerformanceMetrics', () => {
  cy.window().then((win) => {
    const metrics = {
      domContentLoaded: win.performance.timing.domContentLoadedEventEnd - win.performance.timing.navigationStart,
      fullyLoaded: win.performance.timing.loadEventEnd - win.performance.timing.navigationStart,
      firstPaint: win.performance.getEntriesByType('paint')[0]?.startTime || 0,
      firstContentfulPaint: win.performance.getEntriesByType('paint')[1]?.startTime || 0
    };
    cy.log('Performance metrics:', metrics);
    return metrics;
  });
});

// -- Debug Commands --

/**
 * Custom command to log message to console
 * @param {string} message - Message to log
 */
Cypress.Commands.add('logMessage', (message) => {
  cy.log(message);
  cy.task('log', message);
});

/**
 * Custom command to pause test execution
 */
Cypress.Commands.add('pauseTest', () => {
  cy.pause();
});

/**
 * Custom command to debug current state
 */
Cypress.Commands.add('debugCurrentState', () => {
  cy.debug();
});