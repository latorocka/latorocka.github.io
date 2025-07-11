# Mobile Test Automation Suite

A comprehensive cross-platform mobile test automation framework built with Appium and WebDriverIO, designed for enterprise-level mobile application testing across Android and iOS platforms.

## 🚀 Features

### Core Capabilities
- **Cross-Platform Testing**: Unified test scripts for Android and iOS applications
- **Real Device Support**: Native testing on physical devices and emulators/simulators
- **Page Object Model**: Maintainable test architecture with reusable page objects
- **Parallel Execution**: Concurrent testing across multiple devices and platforms
- **Advanced Reporting**: Comprehensive test reports with Allure integration
- **CI/CD Integration**: Seamless integration with Jenkins, GitHub Actions, and Azure DevOps

### Testing Categories
- **Functional Testing**: Core app functionality validation
- **UI/UX Testing**: User interface and experience verification
- **Performance Testing**: App performance and responsiveness analysis
- **Compatibility Testing**: Cross-device and OS version validation
- **Accessibility Testing**: ADA compliance and accessibility features
- **Security Testing**: App security and data protection validation

### Device Support
- **Android**: Native apps, hybrid apps, mobile web
- **iOS**: Native apps, hybrid apps, mobile web (Safari)
- **Emulators/Simulators**: Android Virtual Devices (AVD) and iOS Simulator
- **Real Devices**: Physical device testing via USB and wireless connections

## 📋 Prerequisites

### System Requirements
- Node.js 16+ and npm
- Java Development Kit (JDK) 8 or 11
- Android SDK and Android Studio (for Android testing)
- Xcode and iOS Simulator (for iOS testing - macOS only)
- Appium Server 2.0+

### Mobile Development Tools
- **Android Studio**: For Android SDK, AVD Manager, and device debugging
- **Xcode**: For iOS development and simulator access (macOS required)
- **Android SDK Tools**: ADB, platform-tools, build-tools
- **iOS Development Tools**: iOS SDK, Simulator, WebDriverAgent

## 🛠️ Installation

### 1. Clone Repository
```bash
git clone https://github.com/latorocka/mobile-test-suite.git
cd mobile-test-suite
npm install
```

### 2. Install Appium
```bash
npm install -g appium
npm install -g appium-doctor
```

### 3. Install Appium Drivers
```bash
appium driver install uiautomator2
appium driver install xcuitest
```

### 4. Verify Installation
```bash
npm run install:doctor
```

### 5. Platform-Specific Setup

#### Android Setup
```bash
npm run setup:android
```

#### iOS Setup (macOS only)
```bash
npm run setup:ios
```

## 🏃‍♂️ Quick Start

### Run Android Tests
```bash
npm run test:android
```

### Run iOS Tests
```bash
npm run test:ios
```

### Run Parallel Tests
```bash
npm run test:parallel
```

### Generate Test Reports
```bash
npm run report
```

## 📱 Test Execution

### Single Platform Testing
```bash
# Android testing
npm run test:android

# iOS testing  
npm run test:ios
```

### Test Categories
```bash
# Smoke tests
npm run test:smoke

# Full regression suite
npm run test:regression

# Performance tests
npx wdio config/wdio.performance.conf.js

# Accessibility tests
npx wdio config/wdio.accessibility.conf.js
```

### Device-Specific Testing
```bash
# Specific Android device
npx wdio config/wdio.android.conf.js --device "Pixel_6_API_31"

# Specific iOS device
npx wdio config/wdio.ios.conf.js --device "iPhone_14_Pro"
```

## 🔧 Configuration

### Test Configuration Files
- `config/wdio.android.conf.js` - Android-specific configuration
- `config/wdio.ios.conf.js` - iOS-specific configuration
- `config/wdio.parallel.conf.js` - Parallel execution setup
- `config/wdio.base.conf.js` - Base configuration shared across platforms

### Device Configuration
```javascript
// Android configuration example
capabilities: [{
  platformName: 'Android',
  'appium:deviceName': 'Pixel_6_API_31',
  'appium:platformVersion': '12.0',
  'appium:app': './apps/android/app-debug.apk',
  'appium:automationName': 'UiAutomator2'
}]
```

### Environment Variables
```bash
# Android SDK paths
export ANDROID_HOME=/usr/local/android-sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools

# iOS development (macOS)
export DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer
```

## 📂 Project Structure

```
mobile-test-suite/
├── config/                 # WebDriverIO configuration files
│   ├── wdio.base.conf.js   # Base configuration
│   ├── wdio.android.conf.js # Android-specific config
│   ├── wdio.ios.conf.js    # iOS-specific config
│   └── wdio.parallel.conf.js # Parallel execution config
├── tests/                  # Test specifications
│   ├── android/            # Android-specific tests
│   ├── ios/               # iOS-specific tests
│   ├── cross-platform/    # Shared test logic
│   └── accessibility/     # Accessibility test cases
├── pages/                 # Page Object Model classes
│   ├── android/           # Android page objects
│   ├── ios/              # iOS page objects
│   └── base/             # Base page classes
├── utils/                 # Utility functions and helpers
│   ├── device-utils.js    # Device management utilities
│   ├── test-data.js       # Test data management
│   └── reporting.js       # Custom reporting utilities
├── apps/                  # Test applications
│   ├── android/           # Android APK files
│   └── ios/              # iOS IPA files
├── scripts/               # Setup and utility scripts
│   ├── setup-android.js   # Android environment setup
│   └── setup-ios.js      # iOS environment setup
├── allure-results/        # Test execution results
├── screenshots/           # Test failure screenshots
└── README.md             # Project documentation
```

## 🧪 Test Categories

### Functional Testing
- **Login/Authentication**: User authentication flows
- **Navigation**: App navigation and deep linking
- **Forms**: Input validation and form submissions
- **CRUD Operations**: Create, read, update, delete operations
- **Offline Mode**: App behavior without network connectivity

### UI/UX Testing
- **Layout Validation**: Screen layout and element positioning
- **Responsive Design**: Different screen sizes and orientations
- **Gesture Testing**: Tap, swipe, pinch, and scroll interactions
- **Animation Testing**: UI animations and transitions
- **Theme Testing**: Dark mode, light mode, and custom themes

### Performance Testing
- **App Launch Time**: Cold start and warm start performance
- **Memory Usage**: Memory consumption monitoring
- **Battery Usage**: Power consumption analysis
- **Network Performance**: API response times and data usage
- **Stress Testing**: App behavior under high load

### Compatibility Testing
- **OS Versions**: Testing across different Android/iOS versions
- **Device Types**: Phones, tablets, and different screen sizes
- **Browser Compatibility**: Mobile web testing across browsers
- **Backward Compatibility**: Legacy device and OS support

## 📊 Reporting

### Allure Reports
- **Test Execution Summary**: Pass/fail rates and execution times
- **Test Case Details**: Step-by-step execution with screenshots
- **Device Information**: Test environment and device specifications
- **Historical Trends**: Test execution trends over time
- **Failure Analysis**: Detailed failure reports with stack traces

### Custom Reports
- **Performance Metrics**: App performance data and benchmarks
- **Device Coverage Matrix**: Test coverage across devices and OS versions
- **Accessibility Report**: ADA compliance and accessibility findings
- **Security Analysis**: Security test results and recommendations

## 🔒 Security Testing

### Security Test Categories
- **Data Encryption**: Sensitive data protection validation
- **Authentication Security**: Login security and session management
- **API Security**: Backend API security testing
- **Local Storage**: Secure local data storage verification
- **Network Security**: SSL/TLS and network communication security

## ♿ Accessibility Testing

### Accessibility Features
- **Screen Reader Support**: VoiceOver (iOS) and TalkBack (Android)
- **Keyboard Navigation**: Navigation without touch input
- **Color Contrast**: Visual accessibility compliance
- **Font Scaling**: Dynamic text size support
- **Alternative Text**: Image and element accessibility labels

## 🚀 CI/CD Integration

### Jenkins Pipeline
```groovy
pipeline {
    agent any
    stages {
        stage('Setup') {
            steps {
                sh 'npm install'
                sh 'npm run install:doctor'
            }
        }
        stage('Android Tests') {
            steps {
                sh 'npm run test:android'
            }
        }
        stage('iOS Tests') {
            steps {
                sh 'npm run test:ios'
            }
        }
        stage('Generate Reports') {
            steps {
                sh 'npm run report'
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'allure-report',
                    reportFiles: 'index.html',
                    reportName: 'Mobile Test Report'
                ])
            }
        }
    }
}
```

### GitHub Actions
```yaml
name: Mobile Test Suite
on: [push, pull_request]
jobs:
  mobile-tests:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run test:android
      - run: npm run test:ios
      - run: npm run report
```

## 🎯 Best Practices

### Test Design
- **Page Object Model**: Maintain clean separation between test logic and page interactions
- **Data-Driven Testing**: Use external data sources for test parameterization
- **Explicit Waits**: Use WebDriverWait for reliable element synchronization
- **Error Handling**: Implement comprehensive error handling and recovery
- **Test Independence**: Ensure tests can run independently and in any order

### Performance Optimization
- **Parallel Execution**: Run tests concurrently across multiple devices
- **Test Prioritization**: Execute critical tests first for faster feedback
- **Smart Retry**: Implement intelligent retry mechanisms for flaky tests
- **Resource Management**: Efficiently manage device resources and cleanup

### Maintenance
- **Regular Updates**: Keep Appium drivers and dependencies current
- **Test Review**: Regular review and refactoring of test cases
- **Documentation**: Maintain comprehensive test documentation
- **Code Quality**: Follow coding standards and conduct code reviews

## 🔧 Troubleshooting

### Common Issues

#### Android Setup Issues
```bash
# Fix ADB connection issues
adb kill-server
adb start-server

# Reset Android SDK permissions
chmod +x $ANDROID_HOME/platform-tools/adb
```

#### iOS Setup Issues
```bash
# Reset iOS Simulator
xcrun simctl erase all

# Rebuild WebDriverAgent
cd /usr/local/lib/node_modules/appium/node_modules/appium-xcuitest-driver/WebDriverAgent
xcodebuild -project WebDriverAgent.xcodeproj -scheme WebDriverAgentRunner -destination 'platform=iOS Simulator,name=iPhone 14,OS=16.0' test
```

#### Appium Server Issues
```bash
# Check Appium installation
appium-doctor --android
appium-doctor --ios

# Restart Appium server
pkill -f appium
npm run start:appium
```

## 📞 Support

For questions, issues, or contributions:

- **Email**: latorocka@gmail.com
- **GitHub Issues**: [Create an Issue](https://github.com/latorocka/mobile-test-suite/issues)
- **Documentation**: [Wiki Pages](https://github.com/latorocka/mobile-test-suite/wiki)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Appium Community**: For the powerful mobile automation framework
- **WebDriverIO Team**: For the excellent test runner and ecosystem
- **Mobile Testing Community**: For best practices and continuous innovation

---

**Built with ❤️ by Brian LaTorraca - QA Automation Engineer & Developer**