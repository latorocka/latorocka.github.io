# Cypress Test Automation Framework

A comprehensive, enterprise-grade Cypress test automation framework built with modern JavaScript/TypeScript, featuring extensive test patterns, custom commands, and professional CI/CD integration.

## 🚀 Overview

This framework demonstrates advanced test automation capabilities including:
- **Multi-layered Testing**: API, UI, Performance, and Accessibility testing
- **Custom Commands**: 100+ specialized commands for different testing scenarios
- **Professional Architecture**: Modular design with clear separation of concerns
- **CI/CD Integration**: Jenkins and GitHub Actions pipeline support
- **Comprehensive Reporting**: Multiple reporting formats with screenshots and videos
- **Cross-browser Support**: Chrome, Firefox, Edge, and Safari compatibility

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Test Categories](#test-categories)
- [Custom Commands](#custom-commands)
- [Reporting](#reporting)
- [CI/CD Integration](#cicd-integration)
- [Best Practices](#best-practices)
- [Contributing](#contributing)

## ✨ Features

### 🔧 Core Testing Capabilities
- **API Testing**: RESTful API testing with comprehensive validation
- **UI Testing**: Cross-browser UI automation with Page Object Model
- **Performance Testing**: Core Web Vitals, load testing, and performance monitoring
- **Accessibility Testing**: WCAG 2.1 AA compliance verification
- **Integration Testing**: End-to-end workflow testing
- **Regression Testing**: Automated regression test suites
- **Smoke Testing**: Critical path validation

### 🎯 Advanced Features
- **Custom Commands**: Specialized commands for different testing scenarios
- **Visual Testing**: Screenshot comparison and visual regression testing
- **Network Simulation**: Slow network condition testing
- **Memory Monitoring**: JavaScript heap and memory usage tracking
- **Mobile Testing**: Responsive design and mobile-specific testing
- **Security Testing**: XSS, SQL injection, and CSRF protection testing

### 🔄 CI/CD Integration
- **Jenkins Pipeline**: Complete Jenkins pipeline configuration
- **GitHub Actions**: Automated testing on pull requests and deployments
- **Parallel Execution**: Multi-browser and multi-thread test execution
- **Test Reports**: Automated report generation and artifact storage
- **Slack Integration**: Test result notifications

## 📁 Project Structure

```
cypress-test-framework/
├── cypress/
│   ├── e2e/                          # Test specifications
│   │   ├── api/                      # API testing
│   │   ├── ui/                       # UI testing
│   │   ├── integration/              # Integration testing
│   │   ├── performance/              # Performance testing
│   │   ├── accessibility/            # Accessibility testing
│   │   ├── regression/               # Regression testing
│   │   └── smoke/                    # Smoke testing
│   ├── support/                      # Support files
│   │   ├── commands.js               # General custom commands
│   │   ├── api-commands.js           # API testing commands
│   │   ├── ui-commands.js            # UI testing commands
│   │   ├── performance-commands.js   # Performance testing commands
│   │   ├── accessibility-commands.js # Accessibility testing commands
│   │   └── e2e.js                    # Global configuration
│   ├── fixtures/                     # Test data
│   │   └── testData.json             # Comprehensive test data
│   ├── reports/                      # Test reports
│   ├── screenshots/                  # Screenshot artifacts
│   └── videos/                       # Video recordings
├── .github/
│   └── workflows/                    # GitHub Actions workflows
├── jenkins/                          # Jenkins pipeline files
├── docs/                             # Documentation
├── cypress.config.js                 # Cypress configuration
├── package.json                      # Dependencies and scripts
└── README.md                         # This file
```

## 🛠 Installation

### Prerequisites
- Node.js (v16.0.0 or higher)
- npm (v8.0.0 or higher)
- Git

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/latorocka/cypress-test-framework.git
   cd cypress-test-framework
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify installation**
   ```bash
   npm run cy:run -- --spec "cypress/e2e/smoke/**/*"
   ```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Application URLs
CYPRESS_baseUrl=https://your-app.com
CYPRESS_apiUrl=https://api.your-app.com

# Test User Credentials
CYPRESS_testUser=testuser@example.com
CYPRESS_testPassword=securepassword

# External Service APIs
CYPRESS_githubToken=your_github_token
CYPRESS_slackWebhook=your_slack_webhook

# Test Configuration
CYPRESS_environment=staging
CYPRESS_browserTimeout=30000
CYPRESS_retries=2
```

### Browser Configuration

The framework supports multiple browsers:

```javascript
// cypress.config.js
module.exports = defineConfig({
  e2e: {
    // Browser-specific settings
    chromeWebSecurity: false,
    experimentalStudio: true,
    
    // Cross-browser configuration
    supportedBrowsers: ['chrome', 'firefox', 'edge', 'safari']
  }
});
```

## 🎮 Running Tests

### Local Development

```bash
# Open Cypress Test Runner
npm run cy:open

# Run all tests headlessly
npm run cy:run

# Run specific test categories
npm run test:api
npm run test:ui
npm run test:performance
npm run test:accessibility
npm run test:smoke
npm run test:regression
```

### Cross-Browser Testing

```bash
# Run tests in Chrome
npm run test:chrome

# Run tests in Firefox
npm run test:firefox

# Run tests in Edge
npm run test:edge
```

### Mobile Testing

```bash
# Run tests with mobile viewport
npm run test:mobile

# Run tests with tablet viewport
npm run test:tablet

# Run tests with desktop viewport
npm run test:desktop
```

### Parallel Execution

```bash
# Run tests in parallel (requires Cypress Dashboard)
npm run cy:run:parallel
```

## 📊 Test Categories

### API Testing
- **Endpoint Testing**: REST API endpoint validation
- **Schema Validation**: Request/response schema verification
- **Performance Testing**: API response time monitoring
- **Security Testing**: Authentication and authorization testing
- **Error Handling**: Error response validation

### UI Testing
- **Form Interactions**: Form validation and submission
- **Navigation**: Menu and routing testing
- **Interactive Elements**: Buttons, dropdowns, modals
- **Responsive Design**: Cross-device compatibility
- **Visual Testing**: Screenshot comparison

### Performance Testing
- **Core Web Vitals**: LCP, FID, CLS measurement
- **Load Testing**: Concurrent user simulation
- **Resource Monitoring**: Network and memory usage
- **Bundle Analysis**: JavaScript and CSS optimization
- **Mobile Performance**: Device-specific performance

### Accessibility Testing
- **WCAG Compliance**: Level AA standard verification
- **Keyboard Navigation**: Tab order and focus management
- **Screen Reader Support**: ARIA attributes and labels
- **Color Contrast**: Visual accessibility standards
- **Focus Management**: Modal and dynamic content

## 🔧 Custom Commands

### General Commands
```javascript
// Safe interactions with retry logic
cy.safeClick(selector, options)
cy.safeType(selector, text, options)
cy.waitForVisible(selector, timeout)

// Navigation helpers
cy.navigateToUrl(url)
cy.navigateBack()
cy.refreshPage()

// Assertions
cy.assertElementContainsText(selector, text)
cy.assertElementVisible(selector)
cy.assertPageTitle(title)
```

### API Commands
```javascript
// HTTP methods with validation
cy.apiGet(endpoint, options)
cy.apiPost(endpoint, body, options)
cy.apiPut(endpoint, body, options)
cy.apiDelete(endpoint, options)

// Response validation
cy.validateApiSchema(response, schema)
cy.validateApiResponseTime(response, maxTime)
cy.validateApiHeaders(response, headers)
```

### Performance Commands
```javascript
// Performance measurement
cy.measurePagePerformance(maxTime)
cy.measureCoreWebVitals()
cy.measureResourcePerformance()
cy.measureMemoryUsage()

// Network simulation
cy.simulateNetworkCondition('slow3g')
cy.testPageUnderLoad(concurrentUsers)
```

### Accessibility Commands
```javascript
// Accessibility testing
cy.runAccessibilityAudit(options)
cy.testKeyboardNavigation()
cy.testScreenReaderCompatibility()
cy.testColorContrast()
cy.testFocusManagement()
```

## 📈 Reporting

### Test Reports

The framework generates multiple report formats:

1. **Mochawesome Reports**: HTML reports with screenshots
2. **JUnit XML**: For CI/CD integration
3. **JSON Reports**: For custom processing
4. **Allure Reports**: Advanced reporting with history

### Generate Reports

```bash
# Generate HTML report
npm run report:generate

# Merge multiple reports
npm run report:merge

# Generate final HTML report
npm run report:html
```

### Screenshot and Video Artifacts

- **Screenshots**: Automatically captured on test failures
- **Videos**: Full test execution recordings
- **Visual Comparisons**: Before/after screenshots for visual testing

## 🔄 CI/CD Integration

### GitHub Actions

```yaml
# .github/workflows/cypress-tests.yml
name: Cypress Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        browser: [chrome, firefox, edge]
        
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run Cypress tests
        run: npm run cy:run -- --browser ${{ matrix.browser }}
        
      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: cypress-reports-${{ matrix.browser }}
          path: |
            cypress/reports/
            cypress/screenshots/
            cypress/videos/
```

### Jenkins Pipeline

```groovy
pipeline {
    agent any
    
    stages {
        stage('Setup') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Test') {
            parallel {
                stage('Chrome') {
                    steps {
                        sh 'npm run test:chrome'
                    }
                }
                stage('Firefox') {
                    steps {
                        sh 'npm run test:firefox'
                    }
                }
                stage('Edge') {
                    steps {
                        sh 'npm run test:edge'
                    }
                }
            }
        }
        
        stage('Report') {
            steps {
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'cypress/reports',
                    reportFiles: 'index.html',
                    reportName: 'Cypress Test Report'
                ])
            }
        }
    }
    
    post {
        always {
            archiveArtifacts artifacts: 'cypress/reports/**/*'
            junit 'cypress/reports/*.xml'
        }
    }
}
```

## 🎯 Best Practices

### Test Organization
- **Descriptive Names**: Use clear, descriptive test names
- **Logical Grouping**: Group related tests in describe blocks
- **Setup/Teardown**: Use beforeEach/afterEach for test setup
- **Data Management**: Use fixtures for test data

### Performance Optimization
- **Selective Testing**: Run only necessary tests for each build
- **Parallel Execution**: Utilize parallel test execution
- **Resource Management**: Clean up resources between tests
- **Caching**: Cache dependencies and build artifacts

### Maintenance
- **Regular Updates**: Keep Cypress and dependencies updated
- **Code Review**: Review test code as thoroughly as application code
- **Documentation**: Keep documentation current with changes
- **Monitoring**: Monitor test execution times and failure rates

## 📋 Test Data Management

### Fixtures
```javascript
// cypress/fixtures/testData.json
{
  "users": [
    {
      "username": "testuser",
      "email": "test@example.com",
      "password": "securepassword"
    }
  ],
  "api": {
    "baseUrl": "https://api.example.com",
    "endpoints": {
      "users": "/users",
      "posts": "/posts"
    }
  }
}
```

### Dynamic Data Generation
```javascript
// Generate test data dynamically
cy.task('generateTestData').then((data) => {
  cy.wrap(data).as('dynamicData');
});

// Use generated data in tests
cy.get('@dynamicData').then((data) => {
  cy.apiPost('/users', data.user);
});
```

## 🔍 Debugging

### Debug Mode
```bash
# Open Cypress with debug mode
DEBUG=cypress:* npm run cy:open

# Run specific test with debug info
npm run cy:run -- --spec "cypress/e2e/api/users.cy.js" --headed --no-exit
```

### Browser DevTools
```javascript
// Add debugger breakpoints
cy.debug();

// Pause test execution
cy.pause();

// Log debug information
cy.log('Debug message');
cy.task('log', 'Server-side log message');
```

## 📚 Learning Resources

### Official Documentation
- [Cypress Documentation](https://docs.cypress.io/)
- [Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [API Reference](https://docs.cypress.io/api/table-of-contents)

### Community Resources
- [Cypress GitHub](https://github.com/cypress-io/cypress)
- [Cypress Examples](https://github.com/cypress-io/cypress-example-recipes)
- [Awesome Cypress](https://github.com/chrisbreiding/awesome-cypress)

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests for new functionality
5. Run the test suite: `npm test`
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a pull request

### Code Standards
- Follow ESLint configuration
- Write descriptive commit messages
- Include tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Brian LaTorraca**
- Email: latorocka@gmail.com
- GitHub: [@latorocka](https://github.com/latorocka)
- LinkedIn: [Brian LaTorraca](https://linkedin.com/in/brian-latorraca)

## 🙏 Acknowledgments

- Cypress team for the amazing testing framework
- Open source community for continuous inspiration
- QA automation professionals for best practices and patterns

---

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Email: latorocka@gmail.com
- Documentation: [Framework Documentation](docs/)

---

*This framework demonstrates enterprise-grade test automation capabilities and serves as a comprehensive example of modern QA automation practices.*