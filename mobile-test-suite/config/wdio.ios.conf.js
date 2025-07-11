const { config } = require('./wdio.base.conf.js');
const { join } = require('path');

// iOS-specific configuration
config.specs = [
  './tests/ios/**/*.spec.js',
  './tests/cross-platform/**/*.spec.js'
];

config.capabilities = [
  {
    // Primary iOS device configuration
    platformName: 'iOS',
    'appium:deviceName': 'iPhone 14',
    'appium:platformVersion': '16.0',
    'appium:automationName': 'XCUITest',
    'appium:app': join(process.cwd(), 'apps/ios/TestApp.app'),
    'appium:bundleId': 'com.example.apple-samplecode.UICatalog',
    'appium:newCommandTimeout': 300,
    'appium:noReset': false,
    'appium:fullReset': false,
    'appium:autoAcceptAlerts': true,
    'appium:autoDismissAlerts': false,
    'appium:wdaLocalPort': 8100,
    'appium:useNewWDA': false,
    'appium:useJSONSource': true
  }
];

// Additional iOS-specific settings
config.services = [
  ['appium', {
    args: {
      address: 'localhost',
      port: 4723,
      relaxedSecurity: true
    },
    logPath: './logs/ios/'
  }]
];

// iOS-specific hooks
config.beforeSession = function (config, capabilities, specs) {
  console.log('Starting iOS test session...');
  console.log(`Device: ${capabilities['appium:deviceName']}`);
  console.log(`Platform Version: ${capabilities['appium:platformVersion']}`);
};

config.before = function (capabilities, specs) {
  // iOS-specific setup
  browser.setTimeout({
    implicit: 15000,
    pageLoad: 30000,
    script: 30000
  });
  
  // Set device orientation to portrait
  browser.setOrientation('PORTRAIT');
};

exports.config = config;