const { config } = require('./wdio.base.conf.js');
const { join } = require('path');

// Parallel execution configuration
config.specs = [
  './tests/android/**/*.spec.js',
  './tests/ios/**/*.spec.js',
  './tests/cross-platform/**/*.spec.js'
];

config.maxInstances = 4;

config.capabilities = [
  // Android devices
  {
    platformName: 'Android',
    'appium:deviceName': 'Pixel_6_API_31',
    'appium:platformVersion': '12.0',
    'appium:automationName': 'UiAutomator2',
    'appium:app': join(process.cwd(), 'apps/android/ApiDemos-debug.apk'),
    'appium:appPackage': 'io.appium.android.apis',
    'appium:appActivity': '.ApiDemos',
    'appium:systemPort': 8200,
    'appium:newCommandTimeout': 300,
    'appium:autoGrantPermissions': true
  },
  {
    platformName: 'Android',
    'appium:deviceName': 'Samsung_Galaxy_S21_API_30',
    'appium:platformVersion': '11.0',
    'appium:automationName': 'UiAutomator2',
    'appium:app': join(process.cwd(), 'apps/android/ApiDemos-debug.apk'),
    'appium:appPackage': 'io.appium.android.apis',
    'appium:appActivity': '.ApiDemos',
    'appium:systemPort': 8201,
    'appium:newCommandTimeout': 300,
    'appium:autoGrantPermissions': true
  },
  // iOS devices
  {
    platformName: 'iOS',
    'appium:deviceName': 'iPhone 14',
    'appium:platformVersion': '16.0',
    'appium:automationName': 'XCUITest',
    'appium:app': join(process.cwd(), 'apps/ios/TestApp.app'),
    'appium:bundleId': 'com.example.apple-samplecode.UICatalog',
    'appium:wdaLocalPort': 8100,
    'appium:newCommandTimeout': 300,
    'appium:autoAcceptAlerts': true
  },
  {
    platformName: 'iOS',
    'appium:deviceName': 'iPhone 13 Pro',
    'appium:platformVersion': '15.5',
    'appium:automationName': 'XCUITest',
    'appium:app': join(process.cwd(), 'apps/ios/TestApp.app'),
    'appium:bundleId': 'com.example.apple-samplecode.UICatalog',
    'appium:wdaLocalPort': 8101,
    'appium:newCommandTimeout': 300,
    'appium:autoAcceptAlerts': true
  }
];

// Parallel execution services
config.services = [
  ['appium', {
    args: {
      address: 'localhost',
      port: 4723,
      relaxedSecurity: true
    },
    logPath: './logs/parallel/'
  }]
];

exports.config = config;