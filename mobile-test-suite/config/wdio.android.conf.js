const { config } = require('./wdio.base.conf.js');
const { join } = require('path');

// Android-specific configuration
config.specs = [
  './tests/android/**/*.spec.js',
  './tests/cross-platform/**/*.spec.js'
];

config.capabilities = [
  {
    // Primary Android device configuration
    platformName: 'Android',
    'appium:deviceName': 'Android Emulator',
    'appium:platformVersion': '12.0',
    'appium:automationName': 'UiAutomator2',
    'appium:app': join(process.cwd(), 'apps/android/ApiDemos-debug.apk'),
    'appium:appPackage': 'io.appium.android.apis',
    'appium:appActivity': '.ApiDemos',
    'appium:newCommandTimeout': 300,
    'appium:noReset': false,
    'appium:fullReset': false,
    'appium:autoGrantPermissions': true,
    'appium:systemPort': 8200,
    'appium:chromedriverExecutable': '/usr/local/bin/chromedriver'
  }
];

// Additional Android-specific settings
config.services = [
  ['appium', {
    args: {
      address: 'localhost',
      port: 4723,
      relaxedSecurity: true
    },
    logPath: './logs/android/'
  }]
];

// Android-specific hooks
config.beforeSession = function (config, capabilities, specs) {
  console.log('Starting Android test session...');
  console.log(`Device: ${capabilities['appium:deviceName']}`);
  console.log(`Platform Version: ${capabilities['appium:platformVersion']}`);
};

config.before = function (capabilities, specs) {
  // Android-specific setup
  browser.setTimeout({
    implicit: 15000,
    pageLoad: 30000,
    script: 30000
  });
  
  // Set device orientation to portrait
  browser.setOrientation('PORTRAIT');
};

exports.config = config;