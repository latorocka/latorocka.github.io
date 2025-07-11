# Mobile Test Automation Suite - User Guide

## Table of Contents
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Project Architecture](#project-architecture)
- [Writing Tests](#writing-tests)
- [Page Object Model](#page-object-model)
- [Running Tests](#running-tests)
- [Device Management](#device-management)
- [Test Data Management](#test-data-management)
- [Reporting](#reporting)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Getting Started

### Prerequisites
- Node.js 16.x or higher
- Android Studio with SDK Tools (for Android testing)
- Xcode 14.x or later (for iOS testing on macOS)
- Appium 2.x drivers
- Java Development Kit (JDK) 11+

### Quick Start
```bash
# Clone the repository
git clone https://github.com/latorocka/mobile-test-suite.git
cd mobile-test-suite

# Install dependencies
npm install

# Install Appium drivers
npm run setup:drivers

# Setup Android environment (if testing Android)
npm run setup:android

# Setup iOS environment (if testing iOS on macOS)
npm run setup:ios

# Run sample tests
npm run test:sample
```

## Environment Setup

### Android Setup
```bash
# Download and install Android Studio
# Set ANDROID_HOME environment variable
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools

# Install required SDK packages
sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.0"

# Create and start emulator
avd create -n TestDevice -k "system-images;android-33;google_apis;x86_64"
emulator -avd TestDevice
```

### iOS Setup (macOS only)
```bash
# Install Xcode from App Store
# Install Xcode Command Line Tools
xcode-select --install

# Install iOS Simulator
# Install WebDriverAgent
npm install -g ios-deploy
npm install -g ios-webkit-debug-proxy
```

### Appium Server Setup
```bash
# Install Appium globally
npm install -g appium@next

# Install drivers
appium driver install uiautomator2  # For Android
appium driver install xcuitest      # For iOS

# Install plugins
appium plugin install images
appium plugin install device-farm

# Start Appium server
appium server --use-plugins=device-farm,images
```

## Project Architecture

### Directory Structure
```
mobile-test-suite/
├── config/
│   ├── wdio.android.conf.js    # Android configuration
│   ├── wdio.ios.conf.js        # iOS configuration
│   ├── wdio.parallel.conf.js   # Parallel execution
│   └── wdio.base.conf.js       # Base configuration
├── tests/
│   ├── specs/                  # Test specifications
│   ├── pageobjects/           # Page Object classes
│   └── helpers/               # Test helper functions
├── utils/
│   ├── device-utils.js        # Device management
│   ├── test-data.js          # Test data utilities
│   └── app-utils.js          # App lifecycle management
├── apps/                      # Test applications
│   ├── android/              # Android APK files
│   └── ios/                  # iOS app files
├── reports/                   # Test reports
└── scripts/                   # Setup and utility scripts
```

### Configuration Files
```javascript
// wdio.base.conf.js
exports.config = {
  runner: 'local',
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },
  reporters: [
    'spec',
    ['allure', {
      outputDir: 'reports/allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false
    }]
  ],
  services: [
    ['appium', {
      command: 'appium',
      args: {
        relaxedSecurity: true,
        log: './appium.log'
      }
    }]
  ],
  capabilities: [],
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3
};
```

## Writing Tests

### Basic Test Structure
```javascript
// tests/specs/login.spec.js
import LoginPage from '../pageobjects/login.page.js';
import HomePage from '../pageobjects/home.page.js';
import { users } from '../test-data/users.js';

describe('Login Functionality', () => {
  beforeEach(async () => {
    await LoginPage.open();
  });

  it('should login with valid credentials', async () => {
    const user = users.validUser;
    
    await LoginPage.enterUsername(user.username);
    await LoginPage.enterPassword(user.password);
    await LoginPage.clickLoginButton();
    
    await expect(HomePage.welcomeMessage).toBeDisplayed();
    await expect(HomePage.welcomeMessage).toHaveText(`Welcome, ${user.firstName}!`);
  });

  it('should show error for invalid credentials', async () => {
    const user = users.invalidUser;
    
    await LoginPage.enterUsername(user.username);
    await LoginPage.enterPassword(user.password);
    await LoginPage.clickLoginButton();
    
    await expect(LoginPage.errorMessage).toBeDisplayed();
    await expect(LoginPage.errorMessage).toHaveText('Invalid credentials');
  });
});
```

### Cross-Platform Test
```javascript
describe('Cross-Platform Navigation', () => {
  it('should navigate between screens on both platforms', async () => {
    // Get platform-specific selectors
    const menuButton = await driver.$(
      driver.isAndroid 
        ? '//android.widget.ImageButton[@content-desc="Open navigation drawer"]'
        : '//XCUIElementTypeButton[@name="Menu"]'
    );
    
    await menuButton.click();
    
    // Platform-specific navigation verification
    if (driver.isAndroid) {
      await expect($('//android.widget.ListView')).toBeDisplayed();
    } else {
      await expect($('//XCUIElementTypeTable')).toBeDisplayed();
    }
  });
});
```

### Gesture Testing
```javascript
describe('Gesture Testing', () => {
  it('should support swipe gestures', async () => {
    const screen = await driver.getWindowSize();
    
    // Swipe right to left (next page)
    await driver.touchAction([
      { action: 'press', x: screen.width * 0.8, y: screen.height * 0.5 },
      { action: 'wait', ms: 1000 },
      { action: 'moveTo', x: screen.width * 0.2, y: screen.height * 0.5 },
      { action: 'release' }
    ]);
    
    await expect($('[data-testid="page-2"]')).toBeDisplayed();
  });
  
  it('should support pinch zoom gestures', async () => {
    const image = await $('[data-testid="zoomable-image"]');
    await image.click();
    
    // Pinch zoom in
    await driver.touchAction([
      {
        action: 'press',
        x: 200,
        y: 200
      },
      {
        action: 'press',
        x: 300,
        y: 300
      },
      {
        action: 'wait',
        ms: 1000
      },
      {
        action: 'moveTo',
        x: 100,
        y: 100
      },
      {
        action: 'moveTo',
        x: 400,
        y: 400
      },
      {
        action: 'release'
      },
      {
        action: 'release'
      }
    ]);
    
    // Verify zoom effect
    const imageSize = await image.getSize();
    expect(imageSize.width).toBeGreaterThan(300);
  });
});
```

## Page Object Model

### Base Page Class
```javascript
// pageobjects/base.page.js
export default class BasePage {
  constructor() {
    this.platform = driver.isAndroid ? 'android' : 'ios';
  }
  
  async getElement(androidSelector, iosSelector) {
    const selector = driver.isAndroid ? androidSelector : iosSelector;
    return await $(selector);
  }
  
  async waitForElement(selector, timeout = 10000) {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout });
    return element;
  }
  
  async tapElement(selector) {
    const element = await this.waitForElement(selector);
    await element.click();
  }
  
  async enterText(selector, text) {
    const element = await this.waitForElement(selector);
    await element.clearValue();
    await element.setValue(text);
  }
  
  async swipeUp() {
    const { width, height } = await driver.getWindowSize();
    await driver.touchAction([
      { action: 'press', x: width / 2, y: height * 0.8 },
      { action: 'wait', ms: 1000 },
      { action: 'moveTo', x: width / 2, y: height * 0.2 },
      { action: 'release' }
    ]);
  }
  
  async swipeDown() {
    const { width, height } = await driver.getWindowSize();
    await driver.touchAction([
      { action: 'press', x: width / 2, y: height * 0.2 },
      { action: 'wait', ms: 1000 },
      { action: 'moveTo', x: width / 2, y: height * 0.8 },
      { action: 'release' }
    ]);
  }
  
  async takeScreenshot(name) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${name}-${this.platform}-${timestamp}.png`;
    await driver.saveScreenshot(`./reports/screenshots/${filename}`);
    return filename;
  }
}
```

### Platform-Specific Page Object
```javascript
// pageobjects/login.page.js
import BasePage from './base.page.js';

class LoginPage extends BasePage {
  get usernameField() {
    return this.getElement(
      '//android.widget.EditText[@resource-id="username"]',
      '//XCUIElementTypeTextField[@name="username"]'
    );
  }
  
  get passwordField() {
    return this.getElement(
      '//android.widget.EditText[@resource-id="password"]',
      '//XCUIElementTypeSecureTextField[@name="password"]'
    );
  }
  
  get loginButton() {
    return this.getElement(
      '//android.widget.Button[@text="Login"]',
      '//XCUIElementTypeButton[@name="Login"]'
    );
  }
  
  get errorMessage() {
    return this.getElement(
      '//android.widget.TextView[@resource-id="error-message"]',
      '//XCUIElementTypeStaticText[@name="error-message"]'
    );
  }
  
  async open() {
    if (driver.isAndroid) {
      await driver.startActivity('com.example.app', '.LoginActivity');
    } else {
      await driver.execute('mobile: launchApp', { bundleId: 'com.example.app' });
    }
  }
  
  async enterUsername(username) {
    await this.enterText(await this.usernameField, username);
  }
  
  async enterPassword(password) {
    await this.enterText(await this.passwordField, password);
  }
  
  async clickLoginButton() {
    await this.tapElement(await this.loginButton);
  }
  
  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }
}

export default new LoginPage();
```

### Dynamic Element Handling
```javascript
class ProductListPage extends BasePage {
  async getProductByName(productName) {
    if (driver.isAndroid) {
      return await $(`//android.widget.TextView[@text="${productName}"]`);
    } else {
      return await $(`//XCUIElementTypeStaticText[@name="${productName}"]`);
    }
  }
  
  async scrollToProduct(productName) {
    let product;
    let attempts = 0;
    const maxAttempts = 10;
    
    while (attempts < maxAttempts) {
      try {
        product = await this.getProductByName(productName);
        if (await product.isDisplayed()) {
          return product;
        }
      } catch (e) {
        // Element not found, continue scrolling
      }
      
      await this.swipeUp();
      attempts++;
    }
    
    throw new Error(`Product ${productName} not found after ${maxAttempts} scroll attempts`);
  }
  
  async selectProduct(productName) {
    const product = await this.scrollToProduct(productName);
    await product.click();
  }
}
```

## Running Tests

### Single Platform Execution
```bash
# Run Android tests
npm run test:android

# Run iOS tests (macOS only)
npm run test:ios

# Run specific test file
npm run test:android -- --spec=tests/specs/login.spec.js

# Run tests with specific device
npm run test:android -- --device="Pixel_6_API_33"
```

### Parallel Execution
```bash
# Run tests in parallel across multiple devices
npm run test:parallel

# Custom parallel configuration
npm run test:parallel -- --maxInstances=4
```

### Test Execution Configuration
```javascript
// wdio.parallel.conf.js
const { config } = require('./wdio.base.conf.js');

config.capabilities = [
  {
    platformName: 'Android',
    'appium:deviceName': 'Pixel_6_API_33',
    'appium:platformVersion': '13',
    'appium:automationName': 'UiAutomator2',
    'appium:app': './apps/android/app-debug.apk'
  },
  {
    platformName: 'Android',
    'appium:deviceName': 'Galaxy_S21_API_33',
    'appium:platformVersion': '13',
    'appium:automationName': 'UiAutomator2',
    'appium:app': './apps/android/app-debug.apk'
  },
  {
    platformName: 'iOS',
    'appium:deviceName': 'iPhone 14',
    'appium:platformVersion': '16.0',
    'appium:automationName': 'XCUITest',
    'appium:app': './apps/ios/TestApp.app'
  }
];

config.maxInstances = 3;
config.maxInstancesPerCapability = 1;

exports.config = config;
```

## Device Management

### Device Utilities
```javascript
// utils/device-utils.js
export class DeviceUtils {
  static async getDeviceInfo() {
    const platformName = await driver.getPlatform();
    const platformVersion = await driver.getPlatformVersion();
    const deviceName = driver.capabilities.deviceName;
    
    return {
      platform: platformName.toLowerCase(),
      version: platformVersion,
      device: deviceName,
      isAndroid: platformName.toLowerCase() === 'android',
      isIOS: platformName.toLowerCase() === 'ios'
    };
  }
  
  static async installApp(appPath) {
    if (driver.isAndroid) {
      await driver.installApp(appPath);
    } else {
      await driver.execute('mobile: installApp', { app: appPath });
    }
  }
  
  static async removeApp(bundleId) {
    if (driver.isAndroid) {
      await driver.removeApp(bundleId);
    } else {
      await driver.execute('mobile: removeApp', { bundleId });
    }
  }
  
  static async launchApp(bundleId) {
    if (driver.isAndroid) {
      await driver.activateApp(bundleId);
    } else {
      await driver.execute('mobile: launchApp', { bundleId });
    }
  }
  
  static async terminateApp(bundleId) {
    await driver.terminateApp(bundleId);
  }
  
  static async resetApp() {
    await driver.reset();
  }
  
  static async hideKeyboard() {
    try {
      if (driver.isAndroid) {
        await driver.hideKeyboard();
      } else {
        await driver.execute('mobile: hideKeyboard');
      }
    } catch (e) {
      // Keyboard might not be visible
      console.log('Keyboard hide failed:', e.message);
    }
  }
  
  static async setNetworkConnection(type) {
    if (driver.isAndroid) {
      // 0: No connectivity, 1: Airplane mode, 2: Wifi only, 4: Data only, 6: All network on
      await driver.setNetworkConnection(type);
    }
  }
  
  static async rotateDevice(orientation) {
    await driver.orientation = orientation; // PORTRAIT or LANDSCAPE
  }
  
  static async shakeDevice() {
    if (driver.isIOS) {
      await driver.execute('mobile: shake');
    }
  }
}
```

### App Lifecycle Management
```javascript
// utils/app-utils.js
export class AppUtils {
  static async backgroundApp(seconds = 5) {
    await driver.background(seconds);
  }
  
  static async foregroundApp() {
    const bundleId = driver.capabilities.bundleId || driver.capabilities.appPackage;
    await DeviceUtils.launchApp(bundleId);
  }
  
  static async restartApp() {
    const bundleId = driver.capabilities.bundleId || driver.capabilities.appPackage;
    await DeviceUtils.terminateApp(bundleId);
    await driver.pause(2000);
    await DeviceUtils.launchApp(bundleId);
  }
  
  static async clearAppData() {
    if (driver.isAndroid) {
      const appPackage = driver.capabilities.appPackage;
      await driver.execute('mobile: shell', {
        command: 'pm',
        args: ['clear', appPackage]
      });
    } else {
      await DeviceUtils.resetApp();
    }
  }
  
  static async getAppState(bundleId) {
    return await driver.queryAppState(bundleId);
    // 0: not installed, 1: not running, 2: running in background, 3: running in background (suspended), 4: running in foreground
  }
}
```

## Test Data Management

### Test Data Factory
```javascript
// utils/test-data.js
export class TestDataFactory {
  static generateUser() {
    const timestamp = Date.now();
    return {
      username: `testuser${timestamp}`,
      email: `test${timestamp}@example.com`,
      password: 'TestPassword123!',
      firstName: 'Test',
      lastName: 'User',
      phone: `555${String(timestamp).slice(-7)}`
    };
  }
  
  static generateProduct() {
    const products = [
      'Smartphone', 'Laptop', 'Tablet', 'Headphones', 'Watch'
    ];
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    
    return {
      name: `${randomProduct} Test`,
      price: Math.floor(Math.random() * 1000) + 100,
      description: `Test ${randomProduct.toLowerCase()} for automation`,
      category: 'Electronics'
    };
  }
  
  static getTestCredentials(type = 'valid') {
    const credentials = {
      valid: {
        username: 'testuser@example.com',
        password: 'ValidPassword123!'
      },
      invalid: {
        username: 'invalid@example.com',
        password: 'wrongpassword'
      },
      empty: {
        username: '',
        password: ''
      }
    };
    
    return credentials[type];
  }
  
  static getDeviceSpecificData() {
    const deviceInfo = DeviceUtils.getDeviceInfo();
    
    return {
      android: {
        backButton: '//android.widget.ImageButton[@content-desc="Navigate up"]',
        menuButton: '//android.widget.ImageButton[@content-desc="Open navigation drawer"]'
      },
      ios: {
        backButton: '//XCUIElementTypeButton[@name="Back"]',
        menuButton: '//XCUIElementTypeButton[@name="Menu"]'
      }
    }[deviceInfo.platform];
  }
}
```

### Environment-Specific Data
```javascript
// test-data/environments.js
export const environments = {
  dev: {
    apiUrl: 'https://dev-api.example.com',
    appId: 'com.example.app.dev',
    users: {
      admin: { username: 'admin@dev.com', password: 'DevAdmin123!' },
      user: { username: 'user@dev.com', password: 'DevUser123!' }
    }
  },
  staging: {
    apiUrl: 'https://staging-api.example.com',
    appId: 'com.example.app.staging',
    users: {
      admin: { username: 'admin@staging.com', password: 'StagingAdmin123!' },
      user: { username: 'user@staging.com', password: 'StagingUser123!' }
    }
  },
  production: {
    apiUrl: 'https://api.example.com',
    appId: 'com.example.app',
    users: {
      admin: { username: 'admin@example.com', password: 'ProdAdmin123!' },
      user: { username: 'user@example.com', password: 'ProdUser123!' }
    }
  }
};

export function getEnvironmentData(env = 'dev') {
  return environments[env] || environments.dev;
}
```

## Reporting

### Allure Reporting
```javascript
// Allure configuration in wdio.conf.js
reporters: [
  ['allure', {
    outputDir: 'reports/allure-results',
    disableWebdriverStepsReporting: true,
    disableWebdriverScreenshotsReporting: false,
    useCucumberStepReporter: false
  }]
]

// In test files
import allure from '@wdio/allure-reporter';

describe('Test Suite', () => {
  it('should perform test action', async () => {
    allure.addFeature('Login');
    allure.addStory('Valid Login');
    allure.addSeverity('critical');
    
    // Test steps
    allure.addStep('Enter username');
    await LoginPage.enterUsername('testuser');
    
    allure.addStep('Enter password');
    await LoginPage.enterPassword('password');
    
    allure.addStep('Click login button');
    await LoginPage.clickLoginButton();
    
    // Attach screenshot
    const screenshot = await driver.takeScreenshot();
    allure.addAttachment('Login Screenshot', Buffer.from(screenshot, 'base64'), 'image/png');
  });
});
```

### Custom Test Reporter
```javascript
// utils/test-reporter.js
export class TestReporter {
  static testResults = [];
  
  static addTestResult(testName, status, duration, platform, device) {
    this.testResults.push({
      name: testName,
      status,
      duration,
      platform,
      device,
      timestamp: new Date().toISOString()
    });
  }
  
  static generateSummary() {
    const total = this.testResults.length;
    const passed = this.testResults.filter(r => r.status === 'passed').length;
    const failed = this.testResults.filter(r => r.status === 'failed').length;
    const skipped = this.testResults.filter(r => r.status === 'skipped').length;
    
    return {
      total,
      passed,
      failed,
      skipped,
      successRate: (passed / total) * 100,
      averageDuration: this.testResults.reduce((sum, r) => sum + r.duration, 0) / total
    };
  }
  
  static generateDeviceReport() {
    const deviceResults = {};
    
    this.testResults.forEach(result => {
      const key = `${result.platform}-${result.device}`;
      if (!deviceResults[key]) {
        deviceResults[key] = { passed: 0, failed: 0, total: 0 };
      }
      
      deviceResults[key].total++;
      if (result.status === 'passed') {
        deviceResults[key].passed++;
      } else if (result.status === 'failed') {
        deviceResults[key].failed++;
      }
    });
    
    return deviceResults;
  }
  
  static async saveReport(filename = 'test-report.json') {
    const report = {
      summary: this.generateSummary(),
      deviceResults: this.generateDeviceReport(),
      detailedResults: this.testResults,
      generatedAt: new Date().toISOString()
    };
    
    const fs = require('fs').promises;
    await fs.writeFile(`./reports/${filename}`, JSON.stringify(report, null, 2));
    return report;
  }
}
```

## Performance Testing

### App Performance Metrics
```javascript
describe('Performance Testing', () => {
  it('should measure app launch time', async () => {
    const bundleId = driver.capabilities.bundleId || driver.capabilities.appPackage;
    
    // Terminate app
    await DeviceUtils.terminateApp(bundleId);
    await driver.pause(2000);
    
    // Measure launch time
    const startTime = Date.now();
    await DeviceUtils.launchApp(bundleId);
    
    // Wait for app to be fully loaded
    await driver.waitUntil(
      async () => {
        const appState = await AppUtils.getAppState(bundleId);
        return appState === 4; // Running in foreground
      },
      { timeout: 30000 }
    );
    
    const launchTime = Date.now() - startTime;
    
    // Assert launch time is acceptable
    expect(launchTime).toBeLessThan(5000); // 5 seconds max
    
    console.log(`App launch time: ${launchTime}ms`);
  });
  
  it('should measure page load time', async () => {
    const startTime = Date.now();
    
    await LoginPage.open();
    await LoginPage.usernameField.waitForDisplayed();
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000); // 3 seconds max
  });
});
```

### Memory Usage Monitoring
```javascript
describe('Memory Performance', () => {
  it('should monitor memory usage during test execution', async () => {
    const bundleId = driver.capabilities.bundleId || driver.capabilities.appPackage;
    
    // Get initial memory usage
    const initialMemory = await getMemoryUsage(bundleId);
    
    // Perform memory-intensive operations
    for (let i = 0; i < 10; i++) {
      await ProductListPage.scrollToProduct(`Product ${i}`);
      await driver.pause(1000);
    }
    
    // Get final memory usage
    const finalMemory = await getMemoryUsage(bundleId);
    
    // Check for memory leaks
    const memoryIncrease = finalMemory - initialMemory;
    expect(memoryIncrease).toBeLessThan(50); // Max 50MB increase
  });
  
  async function getMemoryUsage(bundleId) {
    if (driver.isAndroid) {
      const result = await driver.execute('mobile: shell', {
        command: 'dumpsys',
        args: ['meminfo', bundleId]
      });
      
      // Parse memory info from result
      const memoryMatch = result.match(/TOTAL\s+(\d+)/);
      return memoryMatch ? parseInt(memoryMatch[1]) / 1024 : 0; // Convert to MB
    } else {
      // iOS memory monitoring would require different approach
      return 0;
    }
  }
});
```

## Best Practices

### Test Structure and Organization
```javascript
// Group tests logically
describe('User Authentication', () => {
  describe('Login Flow', () => {
    beforeEach(async () => {
      await AppUtils.clearAppData();
      await LoginPage.open();
    });
    
    it('should login with valid credentials', async () => {
      // Test implementation
    });
    
    it('should handle invalid credentials', async () => {
      // Test implementation
    });
  });
  
  describe('Registration Flow', () => {
    // Registration tests
  });
});
```

### Waiting Strategies
```javascript
// Explicit waits (recommended)
await element.waitForDisplayed({ timeout: 10000 });
await element.waitForClickable({ timeout: 5000 });

// Custom wait conditions
await driver.waitUntil(
  async () => {
    const elements = await $$('.list-item');
    return elements.length > 0;
  },
  { timeout: 15000, timeoutMsg: 'List items not loaded' }
);

// Wait for network requests to complete
await driver.waitUntil(
  async () => {
    const networkState = await driver.execute('mobile: getNetworkState');
    return networkState.connected;
  },
  { timeout: 10000 }
);
```

### Error Handling
```javascript
// Robust element interaction
async function safeClick(element) {
  try {
    await element.waitForDisplayed({ timeout: 10000 });
    await element.waitForClickable({ timeout: 5000 });
    await element.click();
  } catch (error) {
    // Take screenshot for debugging
    const screenshot = await driver.takeScreenshot();
    console.log('Click failed, screenshot taken');
    throw error;
  }
}

// Retry mechanism for flaky operations
async function retryOperation(operation, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await driver.pause(1000 * (i + 1)); // Exponential backoff
    }
  }
}
```

### Test Data Management
```javascript
// Use data providers for parameterized tests
const loginTestData = [
  { username: 'user1@example.com', password: 'Pass123!', expected: 'success' },
  { username: 'user2@example.com', password: 'wrongpass', expected: 'error' },
  { username: '', password: 'Pass123!', expected: 'validation' }
];

loginTestData.forEach(({ username, password, expected }) => {
  it(`should handle login with ${username}`, async () => {
    await LoginPage.login(username, password);
    
    switch (expected) {
      case 'success':
        await expect(HomePage.welcomeMessage).toBeDisplayed();
        break;
      case 'error':
        await expect(LoginPage.errorMessage).toBeDisplayed();
        break;
      case 'validation':
        await expect(LoginPage.validationMessage).toBeDisplayed();
        break;
    }
  });
});
```

## Troubleshooting

### Common Issues and Solutions

#### App Installation Issues
```javascript
// Problem: App installation fails
// Solution: Check app signing and device compatibility
try {
  await driver.installApp('./apps/android/app-debug.apk');
} catch (error) {
  console.log('Installation failed:', error.message);
  
  // Try alternative installation method
  await driver.execute('mobile: shell', {
    command: 'pm',
    args: ['install', '-r', './apps/android/app-debug.apk']
  });
}
```

#### Element Not Found
```javascript
// Problem: Elements not found consistently
// Solution: Improve element location strategies
class RobustElementFinder {
  static async findElement(selectors, timeout = 10000) {
    const strategies = [
      () => $(selectors.id),
      () => $(selectors.xpath),
      () => $(selectors.className),
      () => $(selectors.accessibility)
    ];
    
    for (const strategy of strategies) {
      try {
        const element = await strategy();
        await element.waitForDisplayed({ timeout: 2000 });
        return element;
      } catch (error) {
        continue;
      }
    }
    
    throw new Error('Element not found with any strategy');
  }
}
```

#### Device Connection Issues
```javascript
// Check device connection
async function checkDeviceConnection() {
  try {
    const devices = await driver.execute('mobile: getDeviceInfo');
    console.log('Connected devices:', devices);
    return true;
  } catch (error) {
    console.log('Device connection issue:', error.message);
    
    // Restart Appium server
    await restartAppiumServer();
    return false;
  }
}
```

#### Performance Issues
```javascript
// Optimize test execution
beforeEach(async () => {
  // Disable animations for faster execution
  if (driver.isAndroid) {
    await driver.execute('mobile: shell', {
      command: 'settings',
      args: ['put', 'global', 'window_animation_scale', '0']
    });
  }
});

// Use app reset instead of reinstall when possible
afterEach(async () => {
  await AppUtils.backgroundApp(1);
  await AppUtils.clearAppData();
});
```

### Debug Mode
```javascript
// Enable debug logging
process.env.DEBUG = 'appium:*';

// Add debug information to tests
beforeEach(async () => {
  const deviceInfo = await DeviceUtils.getDeviceInfo();
  console.log('Test device:', deviceInfo);
  
  const appState = await AppUtils.getAppState(bundleId);
  console.log('App state:', appState);
});

// Custom debug commands
global.debug = {
  screenshot: async (name) => {
    const timestamp = Date.now();
    await driver.saveScreenshot(`./debug/${name}-${timestamp}.png`);
  },
  
  pageSource: async () => {
    const source = await driver.getPageSource();
    console.log('Page source:', source);
    return source;
  },
  
  deviceLogs: async () => {
    const logs = await driver.getLogs('logcat'); // Android
    console.log('Device logs:', logs);
    return logs;
  }
};
```

---

**Need Help?** Contact: latorocka@gmail.com