# Cypress Test Framework - User Guide

## Table of Contents
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Test Categories](#test-categories)
- [Writing Tests](#writing-tests)
- [Custom Commands](#custom-commands)
- [Running Tests](#running-tests)
- [Configuration](#configuration)
- [Test Data Management](#test-data-management)
- [Reporting](#reporting)
- [Performance Testing](#performance-testing)
- [Accessibility Testing](#accessibility-testing)
- [API Testing](#api-testing)
- [Visual Testing](#visual-testing)
- [CI/CD Integration](#cicd-integration)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager
- Cypress 13.x test framework
- Browser support: Chrome, Firefox, Edge, Safari

### Quick Start
```bash
# Clone the repository
git clone https://github.com/latorocka/cypress-test-framework.git
cd cypress-test-framework

# Install dependencies
npm install

# Open Cypress Test Runner
npm run cy:open

# Run tests headlessly
npm run cy:run

# Run specific test category
npm run test:smoke
npm run test:api
npm run test:accessibility
```

### Installation and Setup
```bash
# Install Cypress and dependencies
npm install cypress @cypress/webpack-preprocessor
npm install @testing-library/cypress
npm install cypress-axe axe-core
npm install cypress-mochawesome-reporter
npm install cypress-real-events

# Verify installation
npx cypress verify

# Open Cypress for first time setup
npx cypress open
```

## Project Structure

```
cypress-test-framework/
├── cypress/
│   ├── e2e/                           # Test specifications
│   │   ├── api/                       # API testing
│   │   │   └── jsonplaceholder-api.cy.js
│   │   ├── ui/                        # UI testing
│   │   │   └── form-interactions.cy.js
│   │   ├── performance/               # Performance testing
│   │   ├── accessibility/             # Accessibility testing
│   │   │   └── wcag-compliance.cy.js
│   │   ├── smoke/                     # Smoke testing
│   │   │   └── critical-path.cy.js
│   │   ├── regression/                # Regression testing
│   │   └── integration/               # Integration testing
│   ├── support/                       # Support files
│   │   ├── commands.js                # General custom commands
│   │   ├── api-commands.js            # API testing commands
│   │   ├── ui-commands.js             # UI testing commands
│   │   ├── performance-commands.js    # Performance commands
│   │   ├── accessibility-commands.js  # Accessibility commands
│   │   └── e2e.js                     # Global configuration
│   ├── fixtures/                      # Test data
│   │   └── testData.json
│   ├── reports/                       # Test reports
│   ├── screenshots/                   # Screenshot artifacts
│   └── videos/                        # Video recordings
├── .github/
│   └── workflows/                     # GitHub Actions workflows
├── jenkins/                           # Jenkins pipeline files
├── cypress.config.js                 # Cypress configuration
├── package.json                       # Dependencies and scripts
└── README.md                          # Documentation
```

## Test Categories

### 1. Smoke Tests
Critical path tests that verify core functionality.

```javascript
// cypress/e2e/smoke/critical-path.cy.js
describe('Critical Path Smoke Tests', () => {
  beforeEach(() => {
    cy.logTestStart('Critical Path Smoke Test');
  });

  it('should load the application successfully', () => {
    cy.visit('/');
    
    // Verify page loads within acceptable time
    cy.measurePagePerformance(5000);
    
    // Verify critical elements
    cy.get('[data-testid="main-navigation"]').should('be.visible');
    cy.get('[data-testid="primary-content"]').should('be.visible');
    cy.get('[data-testid="footer"]').should('be.visible');
  });

  it('should have working navigation', () => {
    cy.visit('/');
    
    cy.get('[data-testid="nav-home"]').should('be.visible').click();
    cy.assertCurrentUrl('/');
    
    cy.get('[data-testid="nav-about"]').should('be.visible').click();
    cy.assertUrlContains('/about');
  });
});
```

### 2. API Tests
Comprehensive API endpoint testing with validation.

```javascript
// cypress/e2e/api/jsonplaceholder-api.cy.js
describe('JSONPlaceholder API Tests', () => {
  const baseUrl = 'https://jsonplaceholder.typicode.com';

  it('should get all posts', () => {
    cy.apiGet(`${baseUrl}/posts`).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);
      
      // Validate response schema
      cy.validateApiSchema(response, {
        type: 'array',
        items: {
          type: 'object',
          required: ['id', 'title', 'body', 'userId'],
          properties: {
            id: { type: 'number' },
            title: { type: 'string' },
            body: { type: 'string' },
            userId: { type: 'number' }
          }
        }
      });
    });
  });

  it('should create a new post', () => {
    const newPost = {
      title: 'Test Post',
      body: 'This is a test post created by Cypress',
      userId: 1
    };

    cy.apiPost(`${baseUrl}/posts`, newPost).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property('id');
      expect(response.body.title).to.equal(newPost.title);
      expect(response.body.body).to.equal(newPost.body);
    });
  });
});
```

### 3. UI Tests
User interface interaction and validation tests.

```javascript
// cypress/e2e/ui/form-interactions.cy.js
describe('Form Interactions', () => {
  beforeEach(() => {
    cy.visit('/contact');
  });

  it('should submit contact form with valid data', () => {
    const formData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      subject: 'Test Subject',
      message: 'This is a test message'
    };

    // Fill form using custom commands
    cy.fillContactForm(formData);
    
    // Submit form
    cy.get('[data-testid="submit-button"]').click();
    
    // Verify success message
    cy.get('[data-testid="success-message"]')
      .should('be.visible')
      .and('contain.text', 'Thank you for your message');
    
    // Verify form reset
    cy.get('[data-testid="contact-name"]').should('have.value', '');
  });

  it('should show validation errors for invalid data', () => {
    cy.get('[data-testid="submit-button"]').click();
    
    // Check required field validation
    cy.get('[data-testid="name-error"]')
      .should('be.visible')
      .and('contain.text', 'Name is required');
    
    cy.get('[data-testid="email-error"]')
      .should('be.visible')
      .and('contain.text', 'Email is required');
  });
});
```

### 4. Performance Tests
Core Web Vitals and performance monitoring.

```javascript
describe('Performance Tests', () => {
  it('should meet Core Web Vitals thresholds', () => {
    cy.visit('/');
    
    cy.measureCoreWebVitals().then((webVitals) => {
      // Largest Contentful Paint (LCP) - should be <= 2.5s
      expect(webVitals.lcp).to.be.lessThan(2500);
      
      // First Input Delay (FID) - should be <= 100ms
      expect(webVitals.fid).to.be.lessThan(100);
      
      // Cumulative Layout Shift (CLS) - should be <= 0.1
      expect(webVitals.cls).to.be.lessThan(0.1);
    });
  });

  it('should load page within performance budget', () => {
    cy.measurePagePerformance('/products', 3000).then((metrics) => {
      expect(metrics.fullyLoaded).to.be.lessThan(3000);
      expect(metrics.domContentLoaded).to.be.lessThan(2000);
      expect(metrics.firstByte).to.be.lessThan(800);
    });
  });
});
```

### 5. Accessibility Tests
WCAG 2.1 AA compliance testing.

```javascript
// cypress/e2e/accessibility/wcag-compliance.cy.js
describe('Accessibility Compliance Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe();
  });

  it('should meet WCAG 2.1 AA standards', () => {
    cy.runAccessibilityAudit({
      tags: ['wcag2a', 'wcag2aa'],
      rules: {
        'color-contrast': { enabled: true },
        'keyboard': { enabled: true },
        'focus-order': { enabled: true }
      }
    });
  });

  it('should support keyboard navigation', () => {
    cy.testKeyboardNavigation();
    
    // Test tab order
    cy.get('body').tab();
    cy.focused().should('have.attr', 'data-testid', 'skip-link');
    
    cy.get('body').tab();
    cy.focused().should('have.attr', 'data-testid', 'main-nav');
  });

  it('should have proper ARIA labels', () => {
    cy.get('[data-testid="search-input"]')
      .should('have.attr', 'aria-label', 'Search products');
    
    cy.get('[data-testid="menu-button"]')
      .should('have.attr', 'aria-expanded', 'false');
  });
});
```

## Writing Tests

### Basic Test Structure
```javascript
describe('Test Suite Name', () => {
  before(() => {
    // One-time setup before all tests
  });

  beforeEach(() => {
    // Setup before each test
    cy.logTestStart('Individual Test');
  });

  afterEach(() => {
    // Cleanup after each test
    cy.logTestEnd('Individual Test');
  });

  after(() => {
    // One-time cleanup after all tests
  });

  it('should perform specific test action', () => {
    // Test implementation
    cy.visit('/');
    cy.get('[data-testid="element"]').should('be.visible');
  });
});
```

### Using Page Object Pattern
```javascript
// cypress/support/pages/LoginPage.js
export class LoginPage {
  visit() {
    cy.visit('/login');
    return this;
  }

  get usernameInput() {
    return cy.get('[data-testid="username"]');
  }

  get passwordInput() {
    return cy.get('[data-testid="password"]');
  }

  get loginButton() {
    return cy.get('[data-testid="login-button"]');
  }

  get errorMessage() {
    return cy.get('[data-testid="error-message"]');
  }

  login(username, password) {
    this.usernameInput.type(username);
    this.passwordInput.type(password);
    this.loginButton.click();
    return this;
  }

  verifyLoginSuccess() {
    cy.url().should('include', '/dashboard');
    cy.get('[data-testid="welcome-message"]').should('be.visible');
    return this;
  }

  verifyLoginError(expectedMessage) {
    this.errorMessage
      .should('be.visible')
      .and('contain.text', expectedMessage);
    return this;
  }
}

// Usage in tests
import { LoginPage } from '../support/pages/LoginPage';

describe('Login Tests', () => {
  const loginPage = new LoginPage();

  it('should login with valid credentials', () => {
    loginPage
      .visit()
      .login('user@example.com', 'password123')
      .verifyLoginSuccess();
  });
});
```

### Data-Driven Testing
```javascript
describe('Data-Driven Login Tests', () => {
  const testData = [
    { username: 'valid@email.com', password: 'validpass', expected: 'success' },
    { username: 'invalid@email.com', password: 'wrongpass', expected: 'error' },
    { username: '', password: 'validpass', expected: 'validation' }
  ];

  testData.forEach(({ username, password, expected }) => {
    it(`should handle login with ${username || 'empty username'}`, () => {
      cy.visit('/login');
      
      if (username) cy.get('[data-testid="username"]').type(username);
      if (password) cy.get('[data-testid="password"]').type(password);
      
      cy.get('[data-testid="login-button"]').click();
      
      switch (expected) {
        case 'success':
          cy.url().should('include', '/dashboard');
          break;
        case 'error':
          cy.get('[data-testid="error-message"]').should('be.visible');
          break;
        case 'validation':
          cy.get('[data-testid="validation-error"]').should('be.visible');
          break;
      }
    });
  });
});
```

## Custom Commands

### General Commands
```javascript
// cypress/support/commands.js
Cypress.Commands.add('safeClick', (selector, options = {}) => {
  cy.get(selector, options)
    .should('be.visible')
    .and('not.be.disabled')
    .click();
});

Cypress.Commands.add('safeType', (selector, text, options = {}) => {
  cy.get(selector, options)
    .should('be.visible')
    .and('not.be.disabled')
    .clear()
    .type(text);
});

Cypress.Commands.add('waitForVisible', (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).should('be.visible');
});

Cypress.Commands.add('assertElementContainsText', (selector, text) => {
  cy.get(selector)
    .should('be.visible')
    .and('contain.text', text);
});

Cypress.Commands.add('assertCurrentUrl', (expectedUrl) => {
  cy.url().should('eq', Cypress.config().baseUrl + expectedUrl);
});

Cypress.Commands.add('assertUrlContains', (urlFragment) => {
  cy.url().should('include', urlFragment);
});
```

### API Testing Commands
```javascript
// cypress/support/api-commands.js
Cypress.Commands.add('apiGet', (url, options = {}) => {
  return cy.request({
    method: 'GET',
    url,
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  }).then((response) => {
    cy.validateApiResponseTime(response, 5000);
    return response;
  });
});

Cypress.Commands.add('apiPost', (url, body, options = {}) => {
  return cy.request({
    method: 'POST',
    url,
    body,
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
});

Cypress.Commands.add('validateApiSchema', (response, schema) => {
  const Ajv = require('ajv').default;
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const valid = validate(response.body);
  
  if (!valid) {
    throw new Error(`Schema validation failed: ${JSON.stringify(validate.errors)}`);
  }
});

Cypress.Commands.add('validateApiResponseTime', (response, maxTime) => {
  expect(response.duration).to.be.lessThan(maxTime);
});
```

### Performance Commands
```javascript
// cypress/support/performance-commands.js
Cypress.Commands.add('measurePagePerformance', (maxTime = 5000) => {
  return cy.window().then((win) => {
    return new Promise((resolve) => {
      win.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = win.performance.getEntriesByType('navigation')[0];
          const metrics = {
            fullyLoaded: perfData.loadEventEnd - perfData.fetchStart,
            domContentLoaded: perfData.domContentLoadedEventEnd - perfData.fetchStart,
            firstByte: perfData.responseStart - perfData.fetchStart
          };
          
          expect(metrics.fullyLoaded).to.be.lessThan(maxTime);
          resolve(metrics);
        }, 100);
      });
    });
  });
});

Cypress.Commands.add('measureCoreWebVitals', () => {
  return cy.window().then((win) => {
    return new Promise((resolve) => {
      // Measure LCP (Largest Contentful Paint)
      new win.PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lcp = entries[entries.length - 1];
        
        // Measure CLS (Cumulative Layout Shift)
        let clsValue = 0;
        new win.PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
        }).observe({ type: 'layout-shift', buffered: true });
        
        resolve({
          lcp: lcp.startTime,
          cls: clsValue,
          fid: 0 // FID requires user interaction
        });
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    });
  });
});

Cypress.Commands.add('testPageUnderLoad', (concurrentUsers = 5) => {
  const promises = [];
  const startTime = Date.now();
  
  for (let i = 0; i < concurrentUsers; i++) {
    promises.push(
      cy.request(Cypress.config().baseUrl).then((response) => ({
        status: response.status,
        duration: Date.now() - startTime
      }))
    );
  }
  
  return Promise.all(promises).then((results) => {
    const successCount = results.filter(r => r.status === 200).length;
    const averageTime = results.reduce((sum, r) => sum + r.duration, 0) / results.length;
    
    return {
      successRate: (successCount / concurrentUsers) * 100,
      averageLoadTime: averageTime
    };
  });
});
```

### Accessibility Commands
```javascript
// cypress/support/accessibility-commands.js
Cypress.Commands.add('runAccessibilityAudit', (options = {}) => {
  cy.checkA11y(null, options, (violations) => {
    if (violations.length > 0) {
      const violationData = violations.map(v => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodes: v.nodes.length
      }));
      
      cy.task('log', `Accessibility violations found: ${JSON.stringify(violationData)}`);
    }
  });
});

Cypress.Commands.add('testKeyboardNavigation', () => {
  // Test Tab navigation
  cy.get('body').tab();
  cy.focused().should('exist');
  
  // Test Shift+Tab navigation
  cy.get('body').tab({ shift: true });
  cy.focused().should('exist');
  
  // Test Enter key activation
  cy.focused().trigger('keydown', { key: 'Enter' });
});

Cypress.Commands.add('testScreenReaderCompatibility', () => {
  // Check for ARIA labels
  cy.get('[aria-label]').should('exist');
  
  // Check for proper heading structure
  cy.get('h1').should('have.length', 1);
  cy.get('h2').should('exist');
  
  // Check for alt text on images
  cy.get('img').each(($img) => {
    cy.wrap($img).should('have.attr', 'alt');
  });
});

Cypress.Commands.add('testColorContrast', () => {
  cy.runAccessibilityAudit({
    rules: {
      'color-contrast': { enabled: true }
    }
  });
});
```

## Running Tests

### Command Line Execution
```bash
# Run all tests
npm run cy:run

# Run tests in headed mode
npm run cy:run -- --headed

# Run specific test file
npm run cy:run -- --spec "cypress/e2e/api/**/*.cy.js"

# Run tests with specific browser
npm run cy:run -- --browser chrome
npm run cy:run -- --browser firefox
npm run cy:run -- --browser edge

# Run tests with custom configuration
npm run cy:run -- --config baseUrl=https://staging.example.com

# Run tests in parallel (requires Cypress Dashboard)
npm run cy:run -- --parallel --record --key <record-key>
```

### Test Runner Commands
```json
{
  "scripts": {
    "cy:open": "cypress open",
    "cy:run": "cypress run",
    "test:smoke": "cypress run --spec 'cypress/e2e/smoke/**/*.cy.js'",
    "test:api": "cypress run --spec 'cypress/e2e/api/**/*.cy.js'",
    "test:ui": "cypress run --spec 'cypress/e2e/ui/**/*.cy.js'",
    "test:performance": "cypress run --spec 'cypress/e2e/performance/**/*.cy.js'",
    "test:accessibility": "cypress run --spec 'cypress/e2e/accessibility/**/*.cy.js'",
    "test:chrome": "cypress run --browser chrome",
    "test:firefox": "cypress run --browser firefox",
    "test:edge": "cypress run --browser edge",
    "test:mobile": "cypress run --config viewportWidth=375,viewportHeight=667",
    "test:tablet": "cypress run --config viewportWidth=768,viewportHeight=1024",
    "report:generate": "mochawesome-merge cypress/reports/mocha/*.json > cypress/reports/report.json",
    "report:html": "marge cypress/reports/report.json --reportDir cypress/reports --inline"
  }
}
```

### Environment-Based Testing
```bash
# Run tests against different environments
npm run cy:run -- --env environment=dev
npm run cy:run -- --env environment=staging
npm run cy:run -- --env environment=production

# Custom environment variables
npm run cy:run -- --env apiUrl=https://api.example.com,timeout=10000
```

## Configuration

### Cypress Configuration File
```javascript
// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    requestTimeout: 10000,
    responseTimeout: 30000,
    chromeWebSecurity: false,
    experimentalStudio: true,
    
    env: {
      apiUrl: 'http://localhost:3001/api',
      environment: 'dev',
      retries: 2
    },
    
    setupNodeEvents(on, config) {
      // Plugin configurations
      require('cypress-mochawesome-reporter/plugin')(on);
      
      // Custom tasks
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
        
        getCurrentTimestamp() {
          return Date.now();
        },
        
        generateTestData() {
          return {
            user: {
              name: `Test User ${Date.now()}`,
              email: `test${Date.now()}@example.com`
            }
          };
        }
      });
      
      // Environment-specific configuration
      if (config.env.environment === 'staging') {
        config.baseUrl = 'https://staging.example.com';
        config.env.apiUrl = 'https://staging-api.example.com';
      } else if (config.env.environment === 'production') {
        config.baseUrl = 'https://example.com';
        config.env.apiUrl = 'https://api.example.com';
      }
      
      return config;
    },
    
    retries: {
      runMode: 2,
      openMode: 0
    },
    
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true,
      timestamp: 'mmddyyyy_HHMMss'
    }
  }
});
```

### Environment Configuration
```javascript
// cypress/support/e2e.js
import './commands';
import 'cypress-axe';
import 'cypress-mochawesome-reporter/register';

// Global configuration
Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing on uncaught exceptions
  return false;
});

// Custom viewport sizes
Cypress.Commands.add('setMobileViewport', () => {
  cy.viewport(375, 667); // iPhone SE
});

Cypress.Commands.add('setTabletViewport', () => {
  cy.viewport(768, 1024); // iPad
});

Cypress.Commands.add('setDesktopViewport', () => {
  cy.viewport(1280, 720); // Desktop
});

// Environment-specific setup
beforeEach(() => {
  const environment = Cypress.env('environment');
  
  if (environment === 'production') {
    // Additional security measures for production testing
    cy.intercept('POST', '/api/auth/logout', { statusCode: 200 });
  }
});
```

## Test Data Management

### Static Test Data
```json
// cypress/fixtures/testData.json
{
  "users": {
    "validUser": {
      "username": "testuser@example.com",
      "password": "TestPassword123!",
      "firstName": "Test",
      "lastName": "User"
    },
    "adminUser": {
      "username": "admin@example.com",
      "password": "AdminPassword123!",
      "firstName": "Admin",
      "lastName": "User"
    }
  },
  "products": [
    {
      "id": 1,
      "name": "Test Product",
      "price": 99.99,
      "category": "Electronics"
    }
  ],
  "apiEndpoints": {
    "jsonplaceholder": "https://jsonplaceholder.typicode.com",
    "github": "https://api.github.com"
  }
}
```

### Dynamic Test Data Generation
```javascript
// cypress/support/data-factory.js
export class DataFactory {
  static createUser(overrides = {}) {
    const timestamp = Date.now();
    return {
      username: `testuser${timestamp}@example.com`,
      password: 'TestPassword123!',
      firstName: 'Test',
      lastName: 'User',
      age: Math.floor(Math.random() * 50) + 18,
      ...overrides
    };
  }
  
  static createProduct(overrides = {}) {
    const products = ['Laptop', 'Phone', 'Tablet', 'Watch'];
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    
    return {
      name: `${randomProduct} Test`,
      price: Math.floor(Math.random() * 1000) + 100,
      description: `Test ${randomProduct.toLowerCase()}`,
      category: 'Electronics',
      ...overrides
    };
  }
  
  static createOrder(userId, products = []) {
    return {
      userId,
      products: products.length > 0 ? products : [this.createProduct()],
      total: products.reduce((sum, p) => sum + p.price, 0),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
  }
}

// Usage in tests
import { DataFactory } from '../support/data-factory';

it('should create user with dynamic data', () => {
  const user = DataFactory.createUser({ firstName: 'Custom' });
  
  cy.visit('/register');
  cy.fillRegistrationForm(user);
  cy.get('[data-testid="success-message"]').should('be.visible');
});
```

### Environment-Specific Data
```javascript
// cypress/support/environments.js
export const environments = {
  dev: {
    baseUrl: 'http://localhost:3000',
    apiUrl: 'http://localhost:3001/api',
    database: 'test_db',
    credentials: {
      admin: { username: 'admin@dev.com', password: 'DevAdmin123!' }
    }
  },
  staging: {
    baseUrl: 'https://staging.example.com',
    apiUrl: 'https://staging-api.example.com',
    database: 'staging_db',
    credentials: {
      admin: { username: 'admin@staging.com', password: 'StagingAdmin123!' }
    }
  }
};

export function getEnvironmentData() {
  const env = Cypress.env('environment') || 'dev';
  return environments[env];
}
```

## Reporting

### Mochawesome Configuration
```javascript
// cypress.config.js - Reporter configuration
reporter: 'cypress-mochawesome-reporter',
reporterOptions: {
  reportDir: 'cypress/reports',
  overwrite: false,
  html: true,
  json: true,
  timestamp: 'mmddyyyy_HHMMss',
  reportTitle: 'Cypress Test Results',
  reportPageTitle: 'Test Report',
  embeddedScreenshots: true,
  inlineAssets: true
}
```

### Custom Test Reporting
```javascript
// cypress/support/reporting.js
export class TestReporter {
  static testResults = [];
  
  static addTestResult(testName, status, duration, browser) {
    this.testResults.push({
      name: testName,
      status,
      duration,
      browser: browser || Cypress.browser.name,
      timestamp: new Date().toISOString(),
      url: Cypress.config().baseUrl
    });
  }
  
  static generateSummary() {
    const total = this.testResults.length;
    const passed = this.testResults.filter(r => r.status === 'passed').length;
    const failed = this.testResults.filter(r => r.status === 'failed').length;
    
    return {
      total,
      passed,
      failed,
      successRate: total > 0 ? (passed / total) * 100 : 0,
      averageDuration: total > 0 ? this.testResults.reduce((sum, r) => sum + r.duration, 0) / total : 0
    };
  }
  
  static exportResults() {
    const summary = this.generateSummary();
    const report = {
      summary,
      results: this.testResults,
      generatedAt: new Date().toISOString()
    };
    
    cy.writeFile('cypress/reports/custom-report.json', report);
    return report;
  }
}

// Usage in tests
afterEach(() => {
  const testTitle = Cypress.currentTest.title;
  const testState = Cypress.currentTest.state;
  const testDuration = Cypress.currentTest.duration || 0;
  
  TestReporter.addTestResult(testTitle, testState, testDuration);
});

after(() => {
  TestReporter.exportResults();
});
```

### Screenshot and Video Management
```javascript
// cypress/support/commands.js
Cypress.Commands.add('captureScreenshot', (name) => {
  const timestamp = Date.now();
  const filename = `${name}-${timestamp}`;
  cy.screenshot(filename, { capture: 'fullPage' });
});

// Automatic screenshot on failure
Cypress.on('fail', (error, runnable) => {
  cy.captureScreenshot(`failure-${runnable.title}`);
  throw error;
});

// Custom video recording commands
Cypress.Commands.add('startVideoRecording', () => {
  if (Cypress.config('video')) {
    cy.task('log', 'Video recording started');
  }
});

Cypress.Commands.add('stopVideoRecording', () => {
  if (Cypress.config('video')) {
    cy.task('log', 'Video recording stopped');
  }
});
```

## CI/CD Integration

### GitHub Actions Workflow
```yaml
# .github/workflows/cypress-tests.yml
name: Cypress Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 2 * * *' # Daily at 2 AM

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        browser: [chrome, firefox, edge]
        environment: [dev, staging]
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run Cypress tests
        uses: cypress-io/github-action@v5
        with:
          browser: ${{ matrix.browser }}
          start: npm start
          wait-on: 'http://localhost:3000'
          wait-on-timeout: 120
          record: true
          parallel: true
        env:
          CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          CYPRESS_environment: ${{ matrix.environment }}
      
      - name: Upload test reports
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: cypress-reports-${{ matrix.browser }}-${{ matrix.environment }}
          path: |
            cypress/reports/
            cypress/screenshots/
            cypress/videos/
      
      - name: Notify Slack on failure
        if: failure()
        uses: 8398a7/action-slack@v3
        with:
          status: failure
          text: 'Cypress tests failed on ${{ matrix.browser }} - ${{ matrix.environment }}'
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

### Jenkins Pipeline
```groovy
// jenkins/Jenkinsfile
pipeline {
    agent any
    
    parameters {
        choice(
            name: 'BROWSER',
            choices: ['chrome', 'firefox', 'edge'],
            description: 'Browser to run tests on'
        )
        choice(
            name: 'ENVIRONMENT',
            choices: ['dev', 'staging', 'production'],
            description: 'Environment to test against'
        )
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/latorocka/cypress-test-framework.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Run Tests') {
            parallel {
                stage('Smoke Tests') {
                    steps {
                        sh """
                            npm run test:smoke -- \\
                                --browser ${params.BROWSER} \\
                                --env environment=${params.ENVIRONMENT}
                        """
                    }
                }
                stage('API Tests') {
                    steps {
                        sh """
                            npm run test:api -- \\
                                --browser ${params.BROWSER} \\
                                --env environment=${params.ENVIRONMENT}
                        """
                    }
                }
                stage('UI Tests') {
                    steps {
                        sh """
                            npm run test:ui -- \\
                                --browser ${params.BROWSER} \\
                                --env environment=${params.ENVIRONMENT}
                        """
                    }
                }
            }
        }
        
        stage('Generate Reports') {
            steps {
                sh 'npm run report:generate'
                sh 'npm run report:html'
            }
        }
    }
    
    post {
        always {
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'cypress/reports',
                reportFiles: 'index.html',
                reportName: 'Cypress Test Report'
            ])
            
            archiveArtifacts artifacts: 'cypress/reports/**/*', fingerprint: true
            archiveArtifacts artifacts: 'cypress/screenshots/**/*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/videos/**/*', allowEmptyArchive: true
        }
        
        failure {
            emailext (
                subject: "Cypress Tests Failed - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "Tests failed on ${params.BROWSER} browser in ${params.ENVIRONMENT} environment.",
                to: "${env.CHANGE_AUTHOR_EMAIL}"
            )
        }
        
        success {
            slackSend (
                color: 'good',
                message: "✅ Cypress tests passed for ${params.BROWSER} - ${params.ENVIRONMENT}"
            )
        }
    }
}
```

## Best Practices

### Test Organization
```javascript
// Group related tests logically
describe('User Management', () => {
  describe('Registration', () => {
    beforeEach(() => {
      cy.visit('/register');
    });
    
    it('should register with valid data', () => {});
    it('should show validation errors', () => {});
  });
  
  describe('Authentication', () => {
    beforeEach(() => {
      cy.visit('/login');
    });
    
    it('should login successfully', () => {});
    it('should handle login failure', () => {});
  });
});
```

### Selector Best Practices
```javascript
// Use data-testid attributes (recommended)
cy.get('[data-testid="submit-button"]').click();

// Avoid brittle selectors
cy.get('.btn.btn-primary.submit').click(); // Bad
cy.get('#submit > button:nth-child(1)').click(); // Bad

// Use semantic selectors when data-testid unavailable
cy.get('button').contains('Submit').click(); // Better
cy.get('[aria-label="Submit form"]').click(); // Good
```

### Wait Strategies
```javascript
// Explicit waits (recommended)
cy.get('[data-testid="loading"]').should('not.exist');
cy.get('[data-testid="content"]').should('be.visible');

// Wait for API calls
cy.intercept('GET', '/api/users').as('getUsers');
cy.visit('/users');
cy.wait('@getUsers');

// Custom wait conditions
cy.waitUntil(() => 
  cy.get('[data-testid="user-count"]').then($el => 
    parseInt($el.text()) > 0
  )
);
```

### Error Handling
```javascript
// Handle conditional elements
cy.get('body').then($body => {
  if ($body.find('[data-testid="modal"]').length > 0) {
    cy.get('[data-testid="modal-close"]').click();
  }
});

// Retry failed commands
Cypress.Commands.add('clickWithRetry', (selector, maxRetries = 3) => {
  let attempts = 0;
  
  const attemptClick = () => {
    cy.get(selector).then($el => {
      if (!$el.is(':visible') && attempts < maxRetries) {
        attempts++;
        cy.wait(1000);
        attemptClick();
      } else {
        cy.wrap($el).click();
      }
    });
  };
  
  attemptClick();
});
```

### Test Independence
```javascript
// Ensure tests can run independently
beforeEach(() => {
  // Reset application state
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.clearSessionStorage();
  
  // Reset API state if needed
  cy.task('resetDatabase');
  
  // Mock external services
  cy.intercept('GET', '/api/external', { fixture: 'external-data.json' });
});
```

## Troubleshooting

### Common Issues and Solutions

#### Timeout Issues
```javascript
// Increase timeout for slow operations
cy.get('[data-testid="slow-loading"]', { timeout: 30000 })
  .should('be.visible');

// Global timeout configuration
Cypress.config('defaultCommandTimeout', 15000);
```

#### Element Detection Issues
```javascript
// Wait for element to exist before interaction
cy.get('[data-testid="dynamic-element"]')
  .should('exist')
  .and('be.visible')
  .click();

// Handle elements that appear/disappear
cy.get('[data-testid="notification"]')
  .should('be.visible')
  .and('contain.text', 'Success');
  
cy.get('[data-testid="notification"]', { timeout: 10000 })
  .should('not.exist');
```

#### Cross-Origin Issues
```javascript
// cypress.config.js
module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false, // Disable for testing
    // Or handle specific origins
    experimentalModifyObstructiveThirdPartyCode: true
  }
});
```

#### Flaky Tests
```javascript
// Add retry configuration
it('flaky test', { retries: 2 }, () => {
  // Test implementation
});

// Or globally in config
module.exports = defineConfig({
  e2e: {
    retries: {
      runMode: 2,
      openMode: 0
    }
  }
});
```

### Debug Mode
```javascript
// Add debug information
beforeEach(() => {
  cy.log('Test environment:', Cypress.env('environment'));
  cy.log('Base URL:', Cypress.config('baseUrl'));
});

// Use cy.debug() for debugging
it('debug example', () => {
  cy.visit('/');
  cy.get('[data-testid="element"]').debug().click();
});

// Pause test execution
it('pause example', () => {
  cy.visit('/');
  cy.pause(); // Will pause in open mode
  cy.get('[data-testid="element"]').click();
});
```

### Performance Optimization
```javascript
// Reduce test execution time
beforeEach(() => {
  // Skip animations
  cy.visit('/', {
    onBeforeLoad: (win) => {
      win.CSS.supports = () => false;
    }
  });
});

// Parallel execution
// cypress.config.js
module.exports = defineConfig({
  e2e: {
    experimentalRunAllSpecs: true
  }
});
```

---

**Need Help?** Contact: latorocka@gmail.com