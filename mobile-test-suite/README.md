# Mobile Test Automation Suite

Enterprise-grade mobile test automation framework built with Appium and WebDriverIO for comprehensive cross-platform mobile application testing.

## Overview

This framework demonstrates advanced mobile testing capabilities including cross-platform test execution, Page Object Model implementation, parallel testing, and comprehensive device management. Designed for testing both Android and iOS applications with real device and emulator/simulator support.

## Key Features

- **Cross-Platform Testing**: Android and iOS application testing with unified test scripts
- **Page Object Model**: Maintainable test architecture with platform-specific implementations
- **Parallel Execution**: Multi-device testing with concurrent test execution
- **Real Device Support**: Physical device testing alongside emulator/simulator support
- **Comprehensive Testing**: Functional, performance, accessibility, and gesture testing
- **Advanced Reporting**: Allure integration with screenshot capture and device information
- **CI/CD Ready**: Jenkins and GitHub Actions pipeline configurations included

## Technology Stack

- **Test Framework**: WebDriverIO v8.x
- **Mobile Automation**: Appium v2.x
- **Test Runner**: Mocha with Chai assertions
- **Reporting**: Allure Reports
- **Languages**: JavaScript/Node.js
- **Device Management**: Custom utilities for Android SDK and iOS Simulator
- **CI/CD**: Jenkins, GitHub Actions

## Code Examples

### Cross-Platform Page Object Model

```javascript
const BasePage = require('../base/BasePage');

class HomePage extends BasePage {
  constructor() {
    super();
    this.platform = browser.capabilities.platformName.toLowerCase();
  }

  // Cross-platform selectors
  get appTitle() {
    return this.platform === 'android' 
      ? $('//android.widget.TextView[@text="API Demos"]')
      : $('//XCUIElementTypeNavigationBar[@name="UICatalog"]');
  }

  // Unified actions
  async selectMainOption() {
    await this.safeClick(this.mainOption);
    return this;
  }

  async verifyHomePageLoaded() {
    await this.waitForDisplayed(this.appTitle, 30000);
    return this.appTitle.isDisplayed();
  }
}
```

### Performance Testing with Device Management

```javascript
describe('Mobile Performance Testing', () => {
  it('should measure app performance metrics', async () => {
    const deviceUtils = new DeviceUtils();
    
    // App launch time measurement
    const launchStart = Date.now();
    await deviceUtils.activateApp('com.example.app');
    const launchTime = Date.now() - launchStart;
    
    console.log(`App launch time: ${launchTime}ms`);
    expect(launchTime).toBeLessThan(5000);
    
    // Memory and battery monitoring
    const deviceInfo = await deviceUtils.getDeviceInfo();
    const batteryInfo = await deviceUtils.getBatteryInfo();
    
    if (batteryInfo) {
      expect(batteryInfo.level).toBeGreaterThan(20);
    }
  });
});
```

### Comprehensive Gesture Testing

```javascript
describe('Advanced Gesture Testing', () => {
  it('should perform multi-touch interactions', async () => {
    const screenSize = await browser.getWindowSize();
    const centerX = screenSize.width / 2;
    const centerY = screenSize.height / 2;
    
    // Multi-touch pinch gesture
    await browser.touchAction([
      { action: 'press', x: centerX - 50, y: centerY },
      { action: 'moveTo', x: centerX - 100, y: centerY },
      { action: 'release' }
    ]);
    
    // Long press with validation
    await browser.touchAction([
      { action: 'press', element: targetElement },
      { action: 'wait', ms: 2000 },
      { action: 'release' }
    ]);
  });
});
```

## Getting Started

### Prerequisites

#### For Android Testing:
- Android Studio with SDK Tools
- Java JDK 8 or 11
- Android SDK (API levels 29-31)
- Android emulator or physical device

#### For iOS Testing (macOS only):
- Xcode 14.x or later
- iOS Simulator
- Command Line Tools for Xcode
- Valid Apple Developer account (for real device testing)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd mobile-test-suite
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install Appium and drivers**:
   ```bash
   npm install -g appium
   appium driver install uiautomator2
   appium driver install xcuitest
   ```

4. **Setup Android environment** (if testing Android):
   ```bash
   node scripts/setup-android.js
   ```

5. **Setup iOS environment** (if testing iOS on macOS):
   ```bash
   node scripts/setup-ios.js
   ```

## Configuration

### Parallel Test Execution

```javascript
// wdio.parallel.conf.js
config.capabilities = [
  {
    platformName: 'Android',
    'appium:deviceName': 'Pixel_6_API_31',
    'appium:platformVersion': '12.0',
    'appium:automationName': 'UiAutomator2'
  },
  {
    platformName: 'iOS',
    'appium:deviceName': 'iPhone 14',
    'appium:platformVersion': '16.0',
    'appium:automationName': 'XCUITest'
  }
];

config.maxInstances = 3;
config.maxInstancesPerCapability = 1;
```

## Running Tests

### Single Platform Testing

**Android Tests**:
```bash
npm run test:android
```

**iOS Tests**:
```bash
npm run test:ios
```

### Cross-Platform Testing
```bash
npm run test:cross-platform
```

### Parallel Testing
```bash
npm run test:parallel
```

### Specific Test Categories
```bash
npm run test:gestures
npm run test:performance
npm run test:accessibility
```

## Framework Structure

```
mobile-test-suite/
├── config/                 # WebDriverIO configurations
│   ├── wdio.base.conf.js   # Base configuration
│   ├── wdio.android.conf.js # Android-specific config
│   ├── wdio.ios.conf.js    # iOS-specific config
│   └── wdio.parallel.conf.js # Parallel execution config
├── pages/                  # Page Object Model
│   ├── base/               # Base page classes
│   ├── android/            # Android-specific pages
│   └── ios/                # iOS-specific pages
├── tests/                  # Test specifications
│   ├── android/            # Android-specific tests
│   ├── ios/                # iOS-specific tests
│   └── cross-platform/     # Cross-platform tests
├── utils/                  # Utility classes
│   ├── device-utils.js     # Device management utilities
│   └── test-data.js        # Test data management
├── scripts/                # Setup and automation scripts
│   ├── setup-android.js    # Android environment setup
│   └── setup-ios.js        # iOS environment setup
└── reports/                # Test reports and screenshots
```

## Test Categories

### Functional Tests
- Navigation testing across platforms
- UI interaction validation
- Form handling and data input
- Cross-platform compatibility verification

### Performance Tests
- App launch time measurement
- Memory usage monitoring and analysis
- Battery impact assessment
- Network condition testing and validation

### Accessibility Tests
- Screen reader compatibility testing
- ADA compliance validation
- Focus management and navigation testing
- Color contrast and readability verification

### Gesture Tests
- Touch interactions (tap, long press, multi-touch)
- Swipe gestures (directional swiping)
- Pinch and zoom operations
- Edge swipes and system gesture handling

## Device Management Features

The framework includes comprehensive device management utilities:

- **App Lifecycle Management**: Install, activate, terminate, and query app states
- **Device Control**: Lock/unlock, orientation changes, shake gestures
- **Network Management**: WiFi/cellular control, airplane mode testing
- **Screenshot/Recording**: Automated capture with device information
- **Permission Handling**: Automated permission dialog management
- **Performance Monitoring**: Memory, battery, and network usage tracking

## CI/CD Integration

### Jenkins Pipeline

The framework includes Jenkins pipeline configuration for continuous integration with parallel execution across multiple devices and comprehensive reporting.

### GitHub Actions

Automated testing workflows for pull requests and deployments with cross-platform test execution and artifact collection.

## Reporting

### Allure Reports

Generate comprehensive test reports with:
- Test execution metrics and timelines
- Device information and capabilities
- Screenshot capture on failures
- Performance measurements and analytics
- Network and battery usage statistics

### Custom Reporting

The framework provides detailed reporting including:
- Cross-platform test coverage analysis
- Device-specific test results
- Performance benchmarks and trends
- Failure analysis with diagnostic information

## Best Practices Implemented

### Test Design
1. Page Object Model for maintainable cross-platform code
2. Platform-agnostic test logic with device-specific implementations
3. Explicit waits and robust element interaction patterns
4. Comprehensive error handling and recovery mechanisms

### Device Management
1. Automated device state management between tests
2. Permission and system dialog handling
3. Resource monitoring and cleanup
4. Timeout optimization for mobile operations

### Performance Testing
1. Launch time optimization and monitoring
2. Memory leak detection and analysis
3. Battery usage impact assessment
4. Network condition simulation and testing

## Enterprise Features

- **Scalable Architecture**: Supports testing across multiple device farms
- **Comprehensive Reporting**: Enterprise-grade test reporting with metrics
- **CI/CD Integration**: Production-ready pipeline configurations
- **Device Management**: Advanced device utilities for enterprise testing
- **Performance Analytics**: Detailed performance monitoring and analysis
- **Security Testing**: App security validation and compliance testing

## License

This project demonstrates enterprise-grade mobile test automation capabilities and best practices for cross-platform mobile application testing.