const { join } = require('path');

exports.config = {
  // Test runner and framework
  runner: 'local',
  framework: 'mocha',
  
  // Test files configuration
  specs: [
    './tests/**/*.spec.js'
  ],
  exclude: [],
  
  // Maximum instances to run
  maxInstances: 5,
  
  // Test capabilities will be defined in platform-specific configs
  capabilities: [],
  
  // Logging and output
  logLevel: 'info',
  bail: 0,
  baseUrl: '',
  waitforTimeout: 30000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  
  // Services
  services: [
    ['appium', {
      args: {
        address: 'localhost',
        port: 4723,
        relaxedSecurity: true,
        noReset: true,
        fullReset: false
      },
      logPath: './logs/'
    }]
  ],
  
  // Test framework options
  mochaOpts: {
    ui: 'bdd',
    timeout: 300000,
    require: ['@babel/register']
  },
  
  // Reporters
  reporters: [
    'spec',
    ['allure', {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false,
      useCucumberStepReporter: false
    }]
  ],
  
  // Hooks
  beforeSession: function (config, capabilities, specs) {
    console.log(`Starting test session on ${capabilities.platformName}`);
  },
  
  before: function (capabilities, specs) {
    // Set implicit wait timeout
    browser.setTimeout({
      implicit: 10000,
      pageLoad: 30000,
      script: 30000
    });
  },
  
  beforeTest: function (test, context) {
    console.log(`Starting test: ${test.title}`);
  },
  
  afterTest: function (test, context, { error, result, duration, passed, retries }) {
    if (!passed) {
      // Take screenshot on test failure
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const screenshotPath = `./screenshots/${test.title}_${timestamp}.png`;
      browser.saveScreenshot(screenshotPath);
      console.log(`Screenshot saved: ${screenshotPath}`);
    }
  },
  
  after: function (result, capabilities, specs) {
    console.log('Test session completed');
  },
  
  afterSession: function (config, capabilities, specs) {
    console.log(`Test session ended for ${capabilities.platformName}`);
  }
};