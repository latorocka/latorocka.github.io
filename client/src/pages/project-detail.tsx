import { useRoute } from "wouter";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Github, ExternalLink, Code, FileText, Play, Book, Settings, Users } from "lucide-react";
import { projects } from "@/data/resume-data";
import { Link } from "wouter";

export default function ProjectDetail() {
  const [match, params] = useRoute("/project/:id");
  const projectId = params?.id ? parseInt(params.id) : null;
  const project = projects.find(p => p.id === projectId);

  // Scroll to top when component mounts or project changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
            <p className="text-secondary mb-8">The project you're looking for doesn't exist.</p>
            <Link href="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getProjectContent = () => {
    if (project.id === 1) {
      // Selenium Framework
      return {
        overview: `This comprehensive Selenium Test Framework demonstrates enterprise-level test automation practices. Built from scratch using Java and Maven, it implements industry best practices including the Page Object Model pattern, data-driven testing, and robust CI/CD integration.`,
        
        keyFeatures: [
          "Page Object Model (POM) implementation for maintainable test code",
          "Cross-browser testing support (Chrome, Firefox, Edge, Safari)",
          "Data-driven testing with Excel file integration",
          "Parallel test execution for faster feedback",
          "Automatic screenshot capture on test failures",
          "Comprehensive test reporting with Extent Reports",
          "Thread-safe WebDriver management",
          "Advanced wait utilities and helper methods",
          "Environment-specific configuration management",
          "CI/CD pipeline integration (Jenkins & GitHub Actions)"
        ],
        sectionTitle: "Framework Architecture",
        hasCodeExamples: true,
        hasProjectStructure: true
      };
    } else if (project.id === 2) {
      // API Test Suite
      return {
        overview: `This enterprise-grade API Test Suite demonstrates comprehensive testing expertise through 8 specialized testing categories including Functional, Integration, Performance, Security, and Data Validation testing. Features automated test runner with detailed reporting, live API endpoint validation, and production-ready error handling with metrics analysis.`,
        
        keyFeatures: [
          "8 specialized testing categories: Functional, Integration, Performance, Security, Data Validation",
          "Automated test runner with CLI interface and detailed reporting",
          "Live API endpoint testing against JSONPlaceholder, GitHub, and SpaceX APIs",
          "Comprehensive CRUD operations validation with real data verification",
          "Cross-API workflow testing and data consistency validation",
          "Performance testing with load, throughput, and scalability analysis",
          "Security testing including SQL injection and XSS protection validation",
          "Data validation with schema verification across multiple API protocols",
          "Professional error handling with metrics analysis and success rate tracking",
          "Real-time demonstration capabilities with immediate execution verification"
        ],
        sectionTitle: "Testing Categories",
        hasCodeExamples: true,
        hasProjectStructure: true
      };
    } else if (project.id === 3) {
      // Mobile Test Suite
      return {
        overview: `This enterprise-grade cross-platform mobile test automation framework built with Appium and WebDriverIO demonstrates comprehensive mobile testing capabilities. Features advanced Page Object Model architecture, parallel execution across multiple devices, gesture testing, performance monitoring, and device management utilities for Android and iOS applications.`,
        
        keyFeatures: [
          "Cross-platform testing framework with unified Page Object Model for Android and iOS",
          "Enterprise-grade test architecture with base page classes and platform-specific implementations",
          "Real device and emulator/simulator support with automated environment setup scripts",
          "Parallel test execution across multiple devices with WebDriverIO configuration management",
          "Advanced gesture testing framework including multi-touch, pinch, zoom, and directional swipes",
          "Performance testing suite with app launch time, memory usage, battery impact, and network analysis",
          "Accessibility testing with screen reader compatibility and ADA compliance validation",
          "Comprehensive device management utilities for app lifecycle, network control, and permission handling",
          "Professional reporting with Allure integration, screenshot capture, and device information",
          "CI/CD pipeline integration with Jenkins and GitHub Actions for automated testing workflows"
        ],
        sectionTitle: "Mobile Testing Capabilities",
        hasCodeExamples: true,
        hasProjectStructure: true
      };
    } else {
      // Cypress Test Framework
      return {
        overview: `This advanced end-to-end test automation framework built with Cypress 13.x demonstrates modern testing practices and enterprise-grade architecture. The comprehensive framework showcases professional QA automation skills through multi-layered testing strategies, 100+ custom command libraries, and production-ready CI/CD integration with detailed performance and accessibility validation.`,
        
        keyFeatures: [
          "Multi-layered testing architecture with API, UI, Performance, and Accessibility test suites",
          "100+ specialized custom commands for comprehensive testing scenarios across all categories",
          "Professional test organization with smoke, regression, integration, and critical path testing",
          "Cross-browser testing support for Chrome, Firefox, Edge, and Safari with parallel execution",
          "Advanced performance testing with Core Web Vitals monitoring and load testing capabilities",
          "WCAG 2.1 AA accessibility compliance testing with keyboard navigation and screen reader support",
          "Comprehensive API testing with REST, GraphQL, and WebSocket endpoint validation",
          "Visual regression testing with screenshot comparison and responsive design validation",
          "Security testing including XSS, CSRF, and SQL injection protection verification",
          "Professional reporting with Mochawesome, video recordings, and CI/CD artifact management",
          "Mobile and responsive testing with touch interaction simulation and viewport testing",
          "Enterprise-grade CI/CD integration with Jenkins pipelines and GitHub Actions workflows"
        ],
        sectionTitle: "Testing Architecture",
        hasCodeExamples: true,
        hasProjectStructure: true
      };
    }
  };

  const getUserGuideContent = (projectId: number) => {
    if (projectId === 1) {
      // Selenium Framework User Guide
      return `# Selenium Test Framework - User Guide

## Table of Contents
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Writing Tests](#writing-tests)
- [Running Tests](#running-tests)
- [Configuration](#configuration)
- [Page Object Model](#page-object-model)
- [Data-Driven Testing](#data-driven-testing)
- [Reporting](#reporting)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Getting Started

### Prerequisites
- Java Development Kit (JDK) 11 or higher
- Apache Maven 3.6+
- IDE (IntelliJ IDEA, Eclipse, or VS Code)
- Browser support: Chrome, Firefox, Edge, Safari

### Quick Start
1. Clone the repository
2. Run: mvn clean install
3. Execute tests: mvn test
4. View reports in target/reports/

## Project Structure
\`\`\`
selenium-framework/
├── src/main/java/
│   ├── pages/          # Page Object classes
│   ├── utils/          # Utility classes
│   └── config/         # Configuration management
├── src/test/java/
│   ├── tests/          # Test classes
│   ├── base/           # Base test setup
│   └── listeners/      # TestNG listeners
├── test-data/          # External test data
├── src/test/resources/ # Configuration files
└── pom.xml            # Maven dependencies
\`\`\`

## Writing Tests

### Basic Test Structure
\`\`\`java
@Test
public void testLogin() {
    LoginPage loginPage = new LoginPage(driver);
    loginPage.enterUsername("testuser");
    loginPage.enterPassword("password");
    loginPage.clickLoginButton();
    
    Assert.assertTrue(loginPage.isLoginSuccessful());
}
\`\`\`

### Page Object Implementation
\`\`\`java
public class LoginPage extends BasePage {
    @FindBy(id = "username")
    private WebElement usernameField;
    
    @FindBy(id = "password")
    private WebElement passwordField;
    
    public void enterUsername(String username) {
        sendKeys(usernameField, username);
    }
}
\`\`\`

## Running Tests

### Command Line Execution
- All tests: \`mvn test\`
- Specific suite: \`mvn test -Dsuite=smoke\`
- Specific browser: \`mvn test -Dbrowser=chrome\`
- Parallel execution: \`mvn test -Dparallel=true\`

### Test Configuration
- Environment: \`-Denv=staging\`
- Headless mode: \`-Dheadless=true\`
- Remote execution: \`-Dremote=true\`

## Configuration

### config.properties
\`\`\`properties
# Browser Configuration
browser=chrome
headless=false
timeout=30

# Environment URLs
prod.url=https://prod.example.com
staging.url=https://staging.example.com

# Test Data
test.username=testuser
test.password=password123
\`\`\`

### TestNG Suite Configuration
\`\`\`xml
<!DOCTYPE suite SYSTEM "http://testng.org/testng-1.0.dtd">
<suite name="RegressionSuite" parallel="methods" thread-count="3">
    <test name="LoginTests">
        <classes>
            <class name="tests.LoginTest"/>
        </classes>
    </test>
</suite>
\`\`\`

## Page Object Model

### Base Page Class
\`\`\`java
public abstract class BasePage {
    protected WebDriver driver;
    protected WebDriverWait wait;
    
    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(30));
        PageFactory.initElements(driver, this);
    }
    
    protected void sendKeys(WebElement element, String text) {
        wait.until(ExpectedConditions.elementToBeClickable(element));
        element.clear();
        element.sendKeys(text);
    }
}
\`\`\`

## Data-Driven Testing

### Excel Integration
\`\`\`java
@DataProvider(name = "loginData")
public Object[][] getLoginData() {
    return ExcelUtils.getTestData("LoginData", "Sheet1");
}

@Test(dataProvider = "loginData")
public void testLoginWithMultipleUsers(String username, String password, String expected) {
    // Test implementation
}
\`\`\`

## Reporting

### Extent Reports Integration
- Automatic generation of HTML reports
- Screenshot capture on test failures
- Test execution timeline and statistics
- Integration with CI/CD pipelines

### Report Location
- HTML Report: \`target/reports/ExtentReport.html\`
- Screenshots: \`target/screenshots/\`
- TestNG Reports: \`target/surefire-reports/\`

## Best Practices

### Test Design
1. **Single Responsibility**: Each test should verify one specific functionality
2. **Data Independence**: Tests should not depend on data from other tests
3. **Page Object Pattern**: Use POM for better maintainability
4. **Explicit Waits**: Always use WebDriverWait instead of Thread.sleep()

### Code Quality
1. **Meaningful Names**: Use descriptive method and variable names
2. **Code Reusability**: Create utility methods for common operations
3. **Exception Handling**: Implement proper error handling
4. **Documentation**: Add comments for complex business logic

### Execution Strategy
1. **Parallel Execution**: Run tests in parallel for faster feedback
2. **Test Categorization**: Use TestNG groups for different test types
3. **Environment Management**: Support multiple test environments
4. **CI/CD Integration**: Automate test execution in pipelines

## Troubleshooting

### Common Issues

#### Browser Driver Issues
**Problem**: WebDriver executable not found
**Solution**: 
- Download correct driver version
- Add to system PATH or use WebDriverManager
- Verify browser and driver compatibility

#### Element Not Found
**Problem**: NoSuchElementException
**Solution**:
- Verify element locator strategy
- Check if element is in iframe
- Add appropriate waits
- Use browser developer tools to inspect elements

#### Timeout Issues
**Problem**: TimeoutException during waits
**Solution**:
- Increase wait timeout values
- Check network connectivity
- Verify application responsiveness
- Use proper wait conditions

#### Parallel Execution Issues
**Problem**: Tests failing in parallel mode
**Solution**:
- Ensure thread-safe driver management
- Use ThreadLocal for WebDriver instances
- Avoid shared test data
- Implement proper synchronization

### Debug Mode
1. Enable verbose logging in log4j.properties
2. Add breakpoints in IDE
3. Use browser developer tools
4. Capture screenshots at failure points
5. Review detailed error logs

### Performance Optimization
1. **Driver Management**: Use WebDriverManager for automatic driver management
2. **Wait Strategies**: Implement smart wait mechanisms
3. **Resource Cleanup**: Properly quit drivers and close browsers
4. **Memory Management**: Monitor memory usage during long test runs

## Advanced Features

### Cross-Browser Testing
- Chrome, Firefox, Edge, Safari support
- Configurable browser selection
- Remote WebDriver execution
- Mobile browser testing

### CI/CD Integration
- Jenkins pipeline configuration
- GitHub Actions workflows
- Docker container support
- Test result reporting

### Custom Utilities
- Screenshot capture utility
- Database connection helper
- Email verification utility
- File download verification

Contact: latorocka@gmail.com
GitHub: ${project.githubUrl}`;
    } else if (projectId === 2) {
      // API Test Suite User Guide - Shortened version to avoid issues
      return `# API Test Suite - User Guide

## Overview
Comprehensive enterprise-grade API testing framework with 8 specialized testing categories including Functional, Integration, Performance, Security, and Data Validation testing.

## Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager
- Internet connection for live API testing
- Jest testing framework

### Quick Start
1. Clone the repository
2. Run: npm install
3. Execute tests: npm test
4. View live demo: npm run demo

## Test Categories

### 1. Functional Testing
Complete CRUD operations validation with comprehensive endpoint testing.
- GET, POST, PUT, DELETE operation testing
- Request/response validation
- Status code verification
- Data integrity checks

### 2. Integration Testing
Cross-API system testing with data consistency validation.
- Multi-endpoint workflow testing
- Data flow verification
- System integration validation
- Cross-service communication testing

### 3. Performance Testing
Load testing with throughput and scalability analysis.
- Response time analysis
- Concurrent request handling
- Throughput measurement
- Resource utilization monitoring

### 4. Security Testing
Input validation and vulnerability assessment.
- SQL injection protection
- XSS prevention
- Authentication validation
- Authorization testing
- Input sanitization

### 5. Data Validation
Schema verification and consistency checks.
- JSON schema validation
- Data type verification
- Required field validation
- Format validation (email, phone, etc.)

## Live API Testing

### JSONPlaceholder API
Tests basic CRUD operations against a live REST API.
- GET /posts - Fetch all posts
- POST /posts - Create new post
- PUT /posts/1 - Update post
- DELETE /posts/1 - Delete post

### GitHub API
Tests real GitHub API endpoints with authentication.
- Repository information
- User profiles
- Rate limiting handling
- Error response handling

### SpaceX GraphQL API
Tests GraphQL queries against SpaceX data.
- Launch data retrieval
- Rocket information
- Mission details
- Complex nested queries

### WebSocket Testing
Real-time communication testing with echo server.
- Connection establishment
- Message sending/receiving
- Connection closing
- Error handling

## Running Tests

### Command Line Options
- All tests: npm test
- Functional tests: npm run test:functional
- Integration tests: npm run test:integration
- Performance tests: npm run test:performance
- Security tests: npm run test:security
- Coverage report: npm run test:coverage

### Live API Demonstration
- Run live tests: npm run demo
- Test GitHub API: npm run demo:github
- Test JSONPlaceholder: npm run demo:jsonplaceholder
- Test SpaceX API: npm run demo:spacex
- Test WebSocket: npm run demo:websocket

## Configuration

### Environment Variables
- GITHUB_API_KEY: Your GitHub token
- API_BASE_URL: Base API URL
- TEST_TIMEOUT: Test timeout (default: 10000ms)
- PERFORMANCE_THRESHOLD: Performance threshold (default: 500ms)
- CONCURRENT_USERS: Concurrent users for load testing (default: 50)

## Performance Testing Features

### Load Testing Configuration
- Concurrent users: 100
- Test duration: 30 seconds
- Ramp-up time: 10 seconds
- Performance thresholds validation
- Resource utilization monitoring

### Performance Metrics
- Response Time: Average, P95, P99 percentiles
- Throughput: Requests per second
- Error Rate: Percentage of failed requests
- Concurrent Users: Maximum supported load

## Security Testing Features

### Input Validation Tests
- SQL injection protection verification
- XSS prevention testing
- Input sanitization validation
- Malicious payload handling

### Authentication Testing
- JWT token validation
- Protected endpoint access control
- Authorization testing
- Session management verification

## Reporting

### Test Reports
- HTML Report: Comprehensive test execution report
- Coverage Report: Code coverage analysis
- Performance Report: Response time and throughput metrics
- Security Report: Vulnerability assessment results

### CI/CD Integration
- GitHub Actions workflows
- Jenkins pipeline support
- Automated test execution
- Report generation and archiving

## Best Practices

### Test Organization
1. Categorize tests by functionality and test type
2. Use descriptive test names
3. Ensure tests can run independently
4. Use test-specific data

### API Testing Strategy
1. Verify API contracts
2. Test error scenarios
3. Test boundary conditions
4. Keep tests as living documentation

### Performance Considerations
1. Establish performance baselines
2. Continuous performance monitoring
3. Identify and fix bottlenecks
4. Test under various load conditions

### Security Best Practices
1. Test all input vectors
2. Verify security mechanisms
3. Test access controls
4. Regular security assessments

For complete documentation and code examples, visit: ${project.githubUrl}
Contact: latorocka@gmail.com`;
    } else if (projectId === 3) {
      // Mobile Test Suite User Guide
      return `# Mobile Test Automation Suite - User Guide

## Table of Contents
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Project Architecture](#project-architecture)
- [Writing Mobile Tests](#writing-mobile-tests)
- [Page Object Model](#page-object-model)
- [Device Management](#device-management)
- [Test Execution](#test-execution)
- [Reporting](#reporting)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Getting Started

### Prerequisites
- Node.js 16.x or higher
- Android Studio with SDK Tools
- Xcode 14.x or later (macOS only)
- Appium 2.x drivers
- WebDriverIO 8.x

### Quick Start
1. Clone the repository
2. Run: npm install
3. Setup Android environment: npm run setup:android
4. Setup iOS environment: npm run setup:ios (macOS only)
5. Run tests: npm run test:android or npm run test:ios

## Environment Setup

### Android Setup
\`\`\`bash
# Install Android SDK and tools
npm run setup:android

# Set environment variables
export ANDROID_HOME=/path/to/android/sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools

# Verify setup
adb devices
\`\`\`

### iOS Setup (macOS only)
\`\`\`bash
# Install iOS development tools
npm run setup:ios

# Install WebDriverAgent
npm run setup:wda

# Verify setup
xcrun simctl list devices
\`\`\`

### Appium Server
\`\`\`bash
# Install Appium globally
npm install -g appium

# Install drivers
appium driver install uiautomator2
appium driver install xcuitest

# Start Appium server
appium --port 4723
\`\`\`

## Project Architecture

### Directory Structure
\`\`\`
mobile-test-suite/
├── tests/
│   ├── android/           # Android-specific tests
│   ├── ios/              # iOS-specific tests
│   ├── common/           # Cross-platform tests
│   └── specs/            # Test specifications
├── pages/
│   ├── android/          # Android page objects
│   ├── ios/              # iOS page objects
│   └── base/             # Base page classes
├── utils/
│   ├── deviceUtils.js    # Device management utilities
│   ├── testData.js       # Test data management
│   └── helpers.js        # Helper functions
├── config/
│   ├── wdio.android.conf.js  # Android configuration
│   ├── wdio.ios.conf.js      # iOS configuration
│   └── wdio.base.conf.js     # Base configuration
└── reports/              # Test reports
\`\`\`

### Framework Components
1. **Page Object Model**: Maintainable test structure
2. **Device Utilities**: Cross-platform device management
3. **Test Data Management**: Dynamic test data generation
4. **Parallel Execution**: Multi-device testing support
5. **Comprehensive Reporting**: Allure integration

## Writing Mobile Tests

### Basic Test Structure
\`\`\`javascript
describe('Login Functionality', () => {
  beforeEach(async () => {
    await LoginPage.navigateToLogin();
  });
  
  it('should login with valid credentials', async () => {
    await LoginPage.enterUsername('testuser');
    await LoginPage.enterPassword('password123');
    await LoginPage.tapLoginButton();
    
    await expect(HomePage.welcomeMessage).toBeDisplayed();
  });
  
  it('should show error for invalid credentials', async () => {
    await LoginPage.enterUsername('invalid');
    await LoginPage.enterPassword('wrong');
    await LoginPage.tapLoginButton();
    
    await expect(LoginPage.errorMessage).toBeDisplayed();
  });
});
\`\`\`

### Cross-Platform Testing
\`\`\`javascript
describe('Cross-Platform Feature', () => {
  it('should work on both platforms', async () => {
    const platform = await DeviceUtils.getPlatform();
    
    if (platform === 'Android') {
      await AndroidSpecificPage.performAction();
    } else {
      await IOSSpecificPage.performAction();
    }
    
    // Common assertions
    await expect(ResultPage.successMessage).toBeDisplayed();
  });
});
\`\`\`

### Gesture Testing
\`\`\`javascript
describe('Gesture Interactions', () => {
  it('should handle swipe gestures', async () => {
    await GesturePage.swipeLeft();
    await expect(GesturePage.nextScreen).toBeDisplayed();
  });
  
  it('should handle pinch zoom', async () => {
    await ImagePage.pinchZoom(2.0); // 2x zoom
    await expect(ImagePage.zoomLevel).toHaveText('200%');
  });
  
  it('should handle multi-touch', async () => {
    await DrawingPage.multiTouchDraw([
      { x: 100, y: 100 },
      { x: 200, y: 200 }
    ]);
    await expect(DrawingPage.drawing).toBeDisplayed();
  });
});
\`\`\`

## Page Object Model

### Base Page Class
\`\`\`javascript
class BasePage {
  constructor() {
    this.platform = driver.capabilities.platformName;
  }
  
  async waitForElement(element, timeout = 10000) {
    await element.waitForDisplayed({ timeout });
  }
  
  async tapElement(element) {
    await this.waitForElement(element);
    await element.touchAction('tap');
  }
  
  async enterText(element, text) {
    await this.waitForElement(element);
    await element.clearValue();
    await element.setValue(text);
  }
  
  getPlatformSelector(androidSelector, iosSelector) {
    return this.platform === 'Android' ? androidSelector : iosSelector;
  }
}
\`\`\`

### Platform-Specific Page Objects
\`\`\`javascript
class LoginPage extends BasePage {
  get usernameField() {
    const selector = this.getPlatformSelector(
      '//android.widget.EditText[@resource-id="username"]',
      '~username-input'
    );
    return $(selector);
  }
  
  get passwordField() {
    const selector = this.getPlatformSelector(
      '//android.widget.EditText[@resource-id="password"]',
      '~password-input'
    );
    return $(selector);
  }
  
  get loginButton() {
    const selector = this.getPlatformSelector(
      '//android.widget.Button[@text="Login"]',
      '~login-button'
    );
    return $(selector);
  }
  
  async login(username, password) {
    await this.enterText(this.usernameField, username);
    await this.enterText(this.passwordField, password);
    await this.tapElement(this.loginButton);
  }
}
\`\`\`

## Device Management

### Device Utilities
\`\`\`javascript
class DeviceUtils {
  static async getDeviceInfo() {
    const platform = await driver.getPlatform();
    const version = await driver.getPlatformVersion();
    const deviceName = await driver.getDeviceTime();
    
    return {
      platform,
      version,
      deviceName,
      screenSize: await driver.getWindowSize()
    };
  }
  
  static async installApp(appPath) {
    await driver.installApp(appPath);
  }
  
  static async launchApp(bundleId) {
    await driver.activateApp(bundleId);
  }
  
  static async closeApp(bundleId) {
    await driver.terminateApp(bundleId);
  }
  
  static async resetApp() {
    await driver.reset();
  }
  
  static async takeScreenshot(testName) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = \`\${testName}_\${timestamp}.png\`;
    await driver.saveScreenshot(\`./screenshots/\${filename}\`);
    return filename;
  }
}
\`\`\`

### Network Simulation
\`\`\`javascript
describe('Network Conditions', () => {
  it('should handle slow network', async () => {
    // Simulate 3G network
    await driver.setNetworkConnection(6); // 3G
    
    await LoginPage.login('user', 'pass');
    
    // Verify loading states
    await expect(LoadingSpinner.element).toBeDisplayed();
    await expect(HomePage.content).toBeDisplayed({ timeout: 30000 });
  });
  
  it('should handle offline mode', async () => {
    // Disable network
    await driver.setNetworkConnection(0);
    
    await LoginPage.attemptLogin('user', 'pass');
    
    // Verify offline behavior
    await expect(ErrorPage.offlineMessage).toBeDisplayed();
  });
});
\`\`\`

## Test Execution

### Configuration Files

#### Android Configuration
\`\`\`javascript
// wdio.android.conf.js
exports.config = {
  ...require('./wdio.base.conf.js').config,
  
  capabilities: [{
    platformName: 'Android',
    platformVersion: '11',
    deviceName: 'Android Emulator',
    app: './apps/android-app.apk',
    automationName: 'UiAutomator2',
    newCommandTimeout: 240000,
    appWaitActivity: '.MainActivity'
  }],
  
  services: [
    ['appium', {
      command: 'appium',
      args: ['--port', '4723']
    }]
  ]
};
\`\`\`

#### iOS Configuration
\`\`\`javascript
// wdio.ios.conf.js
exports.config = {
  ...require('./wdio.base.conf.js').config,
  
  capabilities: [{
    platformName: 'iOS',
    platformVersion: '15.0',
    deviceName: 'iPhone 13',
    app: './apps/ios-app.app',
    automationName: 'XCUITest',
    newCommandTimeout: 240000,
    bundleId: 'com.example.app'
  }],
  
  services: [
    ['appium', {
      command: 'appium',
      args: ['--port', '4724']
    }]
  ]
};
\`\`\`

### Parallel Execution
\`\`\`javascript
// wdio.parallel.conf.js
exports.config = {
  ...require('./wdio.base.conf.js').config,
  
  maxInstances: 4,
  
  capabilities: [
    {
      platformName: 'Android',
      deviceName: 'Pixel_4_API_30',
      platformVersion: '11'
    },
    {
      platformName: 'Android',
      deviceName: 'Pixel_5_API_31',
      platformVersion: '12'
    },
    {
      platformName: 'iOS',
      deviceName: 'iPhone 12',
      platformVersion: '15.0'
    },
    {
      platformName: 'iOS',
      deviceName: 'iPhone 13 Pro',
      platformVersion: '15.0'
    }
  ]
};
\`\`\`

### Test Commands
\`\`\`bash
# Run Android tests
npm run test:android

# Run iOS tests
npm run test:ios

# Run parallel tests
npm run test:parallel

# Run specific test suite
npm run test:android -- --suite=smoke

# Run with specific device
npm run test:android -- --device="Pixel_4"

# Generate Allure report
npm run report:generate
\`\`\`

## Performance Testing

### App Performance Metrics
\`\`\`javascript
describe('Performance Testing', () => {
  it('should measure app launch time', async () => {
    const startTime = Date.now();
    await driver.activateApp('com.example.app');
    await HomePage.waitForLoad();
    const launchTime = Date.now() - startTime;
    
    expect(launchTime).toBeLessThan(5000); // 5 seconds
  });
  
  it('should monitor memory usage', async () => {
    const initialMemory = await driver.getPerformanceData(
      'com.example.app', 'memoryinfo', 5
    );
    
    // Perform memory-intensive operations
    await performHeavyOperations();
    
    const finalMemory = await driver.getPerformanceData(
      'com.example.app', 'memoryinfo', 5
    );
    
    const memoryIncrease = finalMemory - initialMemory;
    expect(memoryIncrease).toBeLessThan(50); // MB
  });
});
\`\`\`

### Battery Testing
\`\`\`javascript
describe('Battery Impact', () => {
  it('should monitor battery consumption', async () => {
    const initialBattery = await DeviceUtils.getBatteryInfo();
    
    // Run app for extended period
    await runExtendedTest(300000); // 5 minutes
    
    const finalBattery = await DeviceUtils.getBatteryInfo();
    const batteryDrain = initialBattery.level - finalBattery.level;
    
    expect(batteryDrain).toBeLessThan(5); // 5% max drain
  });
});
\`\`\`

## Reporting

### Allure Integration
\`\`\`javascript
// wdio.conf.js
exports.config = {
  reporters: [
    'spec',
    ['allure', {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false
    }]
  ],
  
  afterTest: async function(test, context, { error }) {
    if (error) {
      await DeviceUtils.takeScreenshot(test.title);
    }
  }
};
\`\`\`

### Custom Reporting
\`\`\`javascript
class CustomReporter {
  onTestStart(test) {
    console.log(\`Starting test: \${test.title}\`);
  }
  
  onTestEnd(test) {
    const status = test.state === 'passed' ? '✅' : '❌';
    console.log(\`\${status} \${test.title} - \${test.duration}ms\`);
  }
  
  onSuiteEnd(suite) {
    const passed = suite.tests.filter(t => t.state === 'passed').length;
    const failed = suite.tests.filter(t => t.state === 'failed').length;
    
    console.log(\`Suite: \${suite.title}\`);
    console.log(\`Passed: \${passed}, Failed: \${failed}\`);
  }
}
\`\`\`

## Best Practices

### Test Design
1. **Page Object Pattern**: Use POM for maintainable tests
2. **Cross-Platform Strategy**: Write once, run everywhere
3. **Data Independence**: Avoid test dependencies
4. **Explicit Waits**: Use proper wait strategies

### Device Management
1. **Resource Cleanup**: Always clean up after tests
2. **Device Pools**: Manage device availability
3. **App State**: Reset app state between tests
4. **Version Compatibility**: Test across OS versions

### Performance Optimization
1. **Parallel Execution**: Run tests concurrently
2. **Smart Waits**: Optimize wait strategies
3. **Resource Monitoring**: Track memory and CPU usage
4. **Test Categorization**: Group tests efficiently

### Maintenance
1. **Selector Strategy**: Use stable element locators
2. **Code Reusability**: Create utility functions
3. **Documentation**: Maintain clear documentation
4. **Regular Updates**: Keep dependencies current

## Troubleshooting

### Common Issues

#### App Installation Failures
**Problem**: App fails to install on device
**Solution**:
- Verify app signature and permissions
- Check device storage space
- Ensure device is unlocked
- Verify USB debugging enabled

#### Element Location Issues
**Problem**: Elements not found or stale
**Solution**:
- Use dynamic waits instead of static delays
- Implement retry mechanisms
- Use multiple locator strategies
- Check for app updates that change UI

#### Network Issues
**Problem**: Network connectivity problems
**Solution**:
- Verify network permissions in app
- Check firewall and proxy settings
- Use network simulation for testing
- Implement proper error handling

#### Performance Issues
**Problem**: Slow test execution
**Solution**:
- Optimize selector strategies
- Use parallel execution
- Minimize app resets
- Cache test data

### Debug Techniques
1. **Appium Inspector**: Visual element inspection
2. **Device Logs**: Monitor system and app logs
3. **Screenshots**: Capture state at failure points
4. **Video Recording**: Record test execution
5. **Network Monitoring**: Track API calls

### Environment Issues
1. **SDK Version Conflicts**: Ensure compatible versions
2. **Permission Issues**: Verify developer permissions
3. **Certificate Problems**: Check code signing
4. **Path Configuration**: Verify environment variables

Contact: latorocka@gmail.com
GitHub: ${project.githubUrl}`;
    } else {
      // Cypress Framework User Guide
      return `# Cypress Test Framework - User Guide

## Table of Contents
- [Getting Started](#getting-started)
- [Framework Architecture](#framework-architecture)
- [Writing Tests](#writing-tests)
- [Custom Commands](#custom-commands)
- [Test Organization](#test-organization)
- [Performance Testing](#performance-testing)
- [Accessibility Testing](#accessibility-testing)
- [Visual Testing](#visual-testing)
- [CI/CD Integration](#cicd-integration)
- [Best Practices](#best-practices)

## Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Cypress 13.x test framework

### Quick Start
1. Clone the repository
2. Run: npm install
3. Open Cypress: npm run cy:open
4. Run tests headlessly: npm run cy:run
5. Generate reports: npm run report:generate

## Framework Architecture

### Directory Structure
\`\`\`
cypress-test-framework/
├── cypress/
│   ├── e2e/
│   │   ├── api/           # API test suites
│   │   ├── ui/            # UI test suites
│   │   ├── performance/   # Performance tests
│   │   ├── accessibility/ # Accessibility tests
│   │   ├── visual/        # Visual regression tests
│   │   └── security/      # Security tests
│   ├── support/
│   │   ├── commands/      # Custom commands
│   │   ├── pages/         # Page object classes
│   │   ├── utils/         # Utility functions
│   │   └── e2e.js         # Global setup
│   ├── fixtures/          # Test data
│   └── downloads/         # Downloaded files
├── reports/               # Test reports
└── cypress.config.js      # Configuration
\`\`\`

### Core Components
1. **Multi-layered Testing**: API, UI, Performance, Accessibility
2. **100+ Custom Commands**: Specialized testing utilities
3. **Cross-browser Support**: Chrome, Firefox, Edge, Safari
4. **Advanced Reporting**: Mochawesome integration
5. **CI/CD Ready**: Jenkins and GitHub Actions

## Writing Tests

### Basic Test Structure
\`\`\`javascript
describe('User Authentication', () => {
  beforeEach(() => {
    cy.visit('/login');
  });
  
  it('should login with valid credentials', () => {
    cy.login('testuser@example.com', 'password123');
    cy.url().should('include', '/dashboard');
    cy.get('[data-cy="welcome-message"]').should('be.visible');
  });
  
  it('should show error for invalid credentials', () => {
    cy.login('invalid@example.com', 'wrongpassword');
    cy.get('[data-cy="error-message"]')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });
});
\`\`\`

### API Testing
\`\`\`javascript
describe('API Tests', () => {
  it('should handle user CRUD operations', () => {
    // Create user
    cy.api('POST', '/api/users', {
      name: 'John Doe',
      email: 'john@example.com'
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
      
      const userId = response.body.id;
      
      // Read user
      cy.api('GET', \`/api/users/\${userId}\`)
        .its('status').should('eq', 200);
      
      // Update user
      cy.api('PUT', \`/api/users/\${userId}\`, {
        name: 'John Smith'
      }).its('status').should('eq', 200);
      
      // Delete user
      cy.api('DELETE', \`/api/users/\${userId}\`)
        .its('status').should('eq', 204);
    });
  });
  
  it('should handle GraphQL queries', () => {
    cy.graphql(\`
      query GetUser($id: ID!) {
        user(id: $id) {
          id
          name
          email
          posts {
            title
            content
          }
        }
      }
    \`, { id: '1' }).then((response) => {
      expect(response.data.user).to.exist;
      expect(response.data.user.posts).to.be.an('array');
    });
  });
});
\`\`\`

### UI Automation
\`\`\`javascript
describe('E-commerce Flow', () => {
  it('should complete purchase workflow', () => {
    // Navigate and search
    cy.visit('/');
    cy.searchProduct('laptop');
    
    // Select product
    cy.get('[data-cy="product-card"]').first().click();
    cy.get('[data-cy="add-to-cart"]').click();
    
    // Cart operations
    cy.get('[data-cy="cart-icon"]').click();
    cy.verifyCartItem('laptop');
    cy.get('[data-cy="checkout-btn"]').click();
    
    // Checkout process
    cy.fillShippingInfo({
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St',
      city: 'Anytown',
      zipCode: '12345'
    });
    
    cy.selectPaymentMethod('credit-card');
    cy.fillPaymentInfo({
      cardNumber: '4111111111111111',
      expiry: '12/25',
      cvv: '123'
    });
    
    cy.get('[data-cy="place-order"]').click();
    cy.get('[data-cy="order-confirmation"]').should('be.visible');
  });
});
\`\`\`

## Custom Commands

### API Commands
\`\`\`javascript
// cypress/support/commands/api.js
Cypress.Commands.add('api', (method, url, body = null) => {
  return cy.request({
    method,
    url: Cypress.env('API_BASE_URL') + url,
    body,
    headers: {
      'Authorization': \`Bearer \${Cypress.env('AUTH_TOKEN')}\`,
      'Content-Type': 'application/json'
    }
  });
});

Cypress.Commands.add('graphql', (query, variables = {}) => {
  return cy.request({
    method: 'POST',
    url: Cypress.env('GRAPHQL_URL'),
    body: { query, variables },
    headers: {
      'Content-Type': 'application/json'
    }
  });
});

Cypress.Commands.add('websocket', (url, message) => {
  return cy.window().then((win) => {
    return new Promise((resolve) => {
      const ws = new win.WebSocket(url);
      ws.onopen = () => ws.send(JSON.stringify(message));
      ws.onmessage = (event) => {
        resolve(JSON.parse(event.data));
        ws.close();
      };
    });
  });
});
\`\`\`

### UI Commands
\`\`\`javascript
// cypress/support/commands/ui.js
Cypress.Commands.add('login', (email, password) => {
  cy.get('[data-cy="email-input"]').type(email);
  cy.get('[data-cy="password-input"]').type(password);
  cy.get('[data-cy="login-button"]').click();
});

Cypress.Commands.add('searchProduct', (term) => {
  cy.get('[data-cy="search-input"]').type(term);
  cy.get('[data-cy="search-button"]').click();
  cy.get('[data-cy="search-results"]').should('be.visible');
});

Cypress.Commands.add('fillForm', (formData) => {
  Object.keys(formData).forEach(key => {
    cy.get(\`[data-cy="\${key}-input"]\`).type(formData[key]);
  });
});

Cypress.Commands.add('uploadFile', (selector, fileName) => {
  cy.get(selector).selectFile(\`cypress/fixtures/\${fileName}\`);
});
\`\`\`

### Performance Commands
\`\`\`javascript
// cypress/support/commands/performance.js
Cypress.Commands.add('measurePageLoad', () => {
  cy.window().then((win) => {
    const performance = win.performance;
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    cy.wrap(loadTime).as('pageLoadTime');
  });
});

Cypress.Commands.add('checkCoreWebVitals', () => {
  cy.window().then((win) => {
    return new Promise((resolve) => {
      new win.PerformanceObserver((list) => {
        const entries = list.getEntries();
        const vitals = {
          LCP: entries.find(e => e.entryType === 'largest-contentful-paint')?.value,
          FID: entries.find(e => e.entryType === 'first-input')?.processingStart,
          CLS: entries.find(e => e.entryType === 'layout-shift')?.value
        };
        resolve(vitals);
      }).observe({ entryTypes: ['paint', 'navigation', 'layout-shift'] });
    });
  });
});

Cypress.Commands.add('simulateSlowNetwork', () => {
  cy.intercept('**', (req) => {
    req.reply((res) => {
      res.delay(2000); // 2 second delay
    });
  });
});
\`\`\`

### Accessibility Commands
\`\`\`javascript
// cypress/support/commands/accessibility.js
Cypress.Commands.add('checkA11y', (selector = null, options = {}) => {
  cy.injectAxe();
  cy.checkA11y(selector, {
    rules: {
      'color-contrast': { enabled: true },
      'keyboard-navigation': { enabled: true },
      'aria-labels': { enabled: true }
    },
    ...options
  });
});

Cypress.Commands.add('testKeyboardNavigation', () => {
  cy.get('body').tab();
  cy.focused().should('have.attr', 'tabindex');
  
  // Test all interactive elements
  cy.get('button, a, input, select, textarea, [tabindex]').each(($el) => {
    cy.wrap($el).focus().should('be.focused');
  });
});

Cypress.Commands.add('testScreenReader', () => {
  cy.get('[aria-label], [aria-labelledby], [aria-describedby]').each(($el) => {
    cy.wrap($el).should('have.attr', 'aria-label')
      .or('have.attr', 'aria-labelledby')
      .or('have.attr', 'aria-describedby');
  });
});
\`\`\`

## Test Organization

### Test Suites Structure
\`\`\`javascript
// cypress/e2e/smoke/critical-path.cy.js
describe('Smoke Tests - Critical Path', () => {
  const testCases = [
    { name: 'User Registration', test: () => cy.registerUser() },
    { name: 'User Login', test: () => cy.loginUser() },
    { name: 'Product Search', test: () => cy.searchProducts() },
    { name: 'Add to Cart', test: () => cy.addToCart() },
    { name: 'Checkout', test: () => cy.checkout() }
  ];
  
  testCases.forEach(({ name, test }) => {
    it(\`should complete \${name}\`, test);
  });
});

// cypress/e2e/regression/user-management.cy.js
describe('Regression Tests - User Management', () => {
  beforeEach(() => {
    cy.setupTestData();
  });
  
  afterEach(() => {
    cy.cleanupTestData();
  });
  
  context('User Registration', () => {
    it('should validate email format', () => {
      cy.visit('/register');
      cy.fillRegistrationForm({
        email: 'invalid-email',
        password: 'validPassword123'
      });
      cy.get('[data-cy="email-error"]').should('contain', 'Invalid email format');
    });
  });
  
  context('User Profile', () => {
    it('should update profile information', () => {
      cy.login();
      cy.updateProfile({
        firstName: 'Updated',
        lastName: 'Name'
      });
      cy.get('[data-cy="success-message"]').should('be.visible');
    });
  });
});
\`\`\`

## Performance Testing

### Core Web Vitals Monitoring
\`\`\`javascript
describe('Performance Tests', () => {
  it('should meet Core Web Vitals thresholds', () => {
    cy.visit('/');
    cy.checkCoreWebVitals().then((vitals) => {
      expect(vitals.LCP).to.be.lessThan(2500); // 2.5s
      expect(vitals.FID).to.be.lessThan(100);  // 100ms
      expect(vitals.CLS).to.be.lessThan(0.1);  // 0.1
    });
  });
  
  it('should load page within acceptable time', () => {
    cy.visit('/products');
    cy.measurePageLoad();
    cy.get('@pageLoadTime').should('be.lessThan', 3000);
  });
  
  it('should handle concurrent users', () => {
    const requests = Array(50).fill().map(() => {
      return cy.api('GET', '/api/products');
    });
    
    cy.wrap(Promise.all(requests)).then((responses) => {
      responses.forEach(response => {
        expect(response.status).to.eq(200);
        expect(response.duration).to.be.lessThan(1000);
      });
    });
  });
});
\`\`\`

### Load Testing
\`\`\`javascript
describe('Load Testing', () => {
  it('should maintain performance under load', () => {
    const startTime = Date.now();
    
    // Simulate multiple concurrent requests
    for (let i = 0; i < 100; i++) {
      cy.api('GET', '/api/products');
    }
    
    const endTime = Date.now();
    const avgResponseTime = (endTime - startTime) / 100;
    
    expect(avgResponseTime).to.be.lessThan(500); // 500ms average
  });
});
\`\`\`

## Accessibility Testing

### WCAG 2.1 AA Compliance
\`\`\`javascript
describe('Accessibility Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe();
  });
  
  it('should meet WCAG 2.1 AA standards', () => {
    cy.checkA11y(null, {
      rules: {
        'color-contrast': { enabled: true },
        'heading-order': { enabled: true },
        'landmark-unique': { enabled: true },
        'region': { enabled: true }
      }
    });
  });
  
  it('should support keyboard navigation', () => {
    cy.testKeyboardNavigation();
    
    // Test specific navigation patterns
    cy.get('body').type('{tab}');
    cy.focused().should('match', 'a, button, input, select, textarea');
    
    cy.get('body').type('{enter}');
    // Verify appropriate action occurs
  });
  
  it('should have proper ARIA labels', () => {
    cy.get('button, input, select').each(($el) => {
      cy.wrap($el).should('satisfy', (el) => {
        return el.hasAttribute('aria-label') || 
               el.hasAttribute('aria-labelledby') ||
               el.textContent.trim().length > 0;
      });
    });
  });
  
  it('should support screen readers', () => {
    cy.testScreenReader();
    
    // Test specific screen reader patterns
    cy.get('[role="button"]').should('have.attr', 'aria-label');
    cy.get('[role="navigation"]').should('exist');
    cy.get('h1, h2, h3').should('exist');
  });
});
\`\`\`

## Visual Testing

### Screenshot Comparison
\`\`\`javascript
describe('Visual Regression Tests', () => {
  it('should match homepage design', () => {
    cy.visit('/');
    cy.compareSnapshot('homepage');
  });
  
  it('should match product page across viewports', () => {
    const viewports = [
      { width: 1920, height: 1080 }, // Desktop
      { width: 1024, height: 768 },  // Tablet
      { width: 375, height: 667 }    // Mobile
    ];
    
    viewports.forEach(viewport => {
      cy.viewport(viewport.width, viewport.height);
      cy.visit('/products/1');
      cy.compareSnapshot(\`product-\${viewport.width}x\${viewport.height}\`);
    });
  });
  
  it('should handle responsive design changes', () => {
    cy.visit('/');
    
    // Desktop view
    cy.viewport(1920, 1080);
    cy.get('[data-cy="navigation"]').should('be.visible');
    cy.compareSnapshot('desktop-navigation');
    
    // Mobile view
    cy.viewport(375, 667);
    cy.get('[data-cy="mobile-menu-toggle"]').should('be.visible');
    cy.compareSnapshot('mobile-navigation');
  });
});
\`\`\`

## CI/CD Integration

### GitHub Actions
\`\`\`yaml
# .github/workflows/cypress.yml
name: Cypress Tests

on: [push, pull_request]

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
          node-version: 18
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run Cypress tests
        uses: cypress-io/github-action@v4
        with:
          browser: \${{ matrix.browser }}
          record: true
          parallel: true
          group: \${{ matrix.browser }}
        env:
          CYPRESS_RECORD_KEY: \${{ secrets.CYPRESS_RECORD_KEY }}
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          
      - name: Upload screenshots
        uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: cypress-screenshots-\${{ matrix.browser }}
          path: cypress/screenshots
          
      - name: Upload videos
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: cypress-videos-\${{ matrix.browser }}
          path: cypress/videos
\`\`\`

### Jenkins Pipeline
\`\`\`groovy
pipeline {
  agent any
  
  stages {
    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
      }
    }
    
    stage('Run Tests') {
      parallel {
        stage('Chrome Tests') {
          steps {
            sh 'npm run cy:run -- --browser chrome'
          }
        }
        stage('Firefox Tests') {
          steps {
            sh 'npm run cy:run -- --browser firefox'
          }
        }
      }
    }
    
    stage('Generate Reports') {
      steps {
        sh 'npm run report:generate'
        publishHTML([
          allowMissing: false,
          alwaysLinkToLastBuild: true,
          keepAll: true,
          reportDir: 'reports',
          reportFiles: 'index.html',
          reportName: 'Cypress Test Report'
        ])
      }
    }
  }
  
  post {
    always {
      archiveArtifacts artifacts: 'cypress/videos/**/*.mp4', fingerprint: true
      archiveArtifacts artifacts: 'cypress/screenshots/**/*.png', fingerprint: true
    }
  }
}
\`\`\`

## Best Practices

### Test Design Principles
1. **Atomic Tests**: Each test should be independent
2. **Descriptive Names**: Use clear, descriptive test names
3. **Page Object Pattern**: Organize selectors and actions
4. **Data Management**: Use fixtures and dynamic data

### Selector Strategy
1. **Data Attributes**: Use \`data-cy\` attributes for stability
2. **Semantic Selectors**: Prefer semantic HTML elements
3. **Avoid Dynamic Content**: Don't rely on changing text/IDs
4. **Accessibility Selectors**: Use ARIA labels and roles

### Performance Optimization
1. **Smart Waits**: Use Cypress's built-in retry logic
2. **Minimal DOM Queries**: Cache frequently used elements
3. **Parallel Execution**: Run tests concurrently
4. **Resource Management**: Clean up after tests

### Maintenance
1. **Regular Updates**: Keep Cypress and dependencies current
2. **Code Reviews**: Review test code like production code
3. **Documentation**: Maintain clear test documentation
4. **Monitoring**: Track test stability and performance

Contact: latorocka@gmail.com
GitHub: ${project.githubUrl}`;
    }
    
    return '';
  };

  const projectContent = getProjectContent();

  const openDocumentation = (docType: string) => {
    const projectName = project.id === 1 ? 'Selenium Test Framework' : 
                       project.id === 2 ? 'API Test Suite' : 
                       project.id === 3 ? 'Mobile Test Automation Suite' :
                       'Cypress Test Framework';
    
    let content = '';
    
    if (docType === 'setup') {
      content = `# Setup Guide - ${projectName}

## Overview
Complete installation and configuration guide for ${project.title}.

## Prerequisites
${project.id === 1 ? 
  '- Java Development Kit (JDK) 11+\n- Apache Maven 3.6+\n- IDE (IntelliJ IDEA, Eclipse, VS Code)\n- Browser support: Chrome, Firefox, Edge, Safari' :
  project.id === 2 ?
  '- Node.js 16.x or higher\n- npm or yarn package manager\n- Internet connection for live API testing\n- Jest testing framework' :
  project.id === 3 ?
  '- Node.js 16.x or higher\n- Android Studio with SDK Tools\n- Xcode 14.x or later (macOS)\n- Appium 2.x drivers' :
  '- Node.js 16.x or higher\n- npm or yarn package manager\n- Cypress 13.x test framework\n- Browser support: Chrome, Firefox, Edge, Safari'
}

## Installation
${project.id === 1 ?
  '1. Clone repository\n2. Run: mvn clean install\n3. Execute: mvn test' :
  project.id === 2 ?
  '1. Clone repository\n2. Run: npm install\n3. Execute: npm test' :
  project.id === 3 ?
  '1. Clone repository\n2. Run: npm install\n3. Install Appium drivers\n4. Setup Android/iOS environment' :
  '1. Clone repository\n2. Run: npm install\n3. Execute: npm run cy:open\n4. Run tests: npm run cy:run'
}

## Configuration
${project.id === 1 ?
  'Edit config.properties for environment settings and browser configurations.' :
  project.id === 2 ?
  'Configure API endpoints and test parameters in configuration files.' :
  project.id === 3 ?
  'Configure device settings in wdio configuration files for Android and iOS testing.' :
  'Configure cypress.config.js for environment settings, browser options, and test configuration.'
}

For complete documentation, visit: ${project.githubUrl}
Contact: Latorocka@gmail.com`;
    } else if (docType === 'user-guide') {
      content = getUserGuideContent(project.id);
    }
    
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>${projectName} - ${docType.charAt(0).toUpperCase() + docType.slice(1)} Guide</title>
            <style>
              body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
              h1, h2, h3 { color: #2563eb; }
              pre { background: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; white-space: pre-wrap; }
            </style>
          </head>
          <body>
            <pre>${content}</pre>
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Button>
          </Link>
        </div>

        {/* Project Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="md:w-1/2">
              <Badge className="mb-4">{project.category}</Badge>
              <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
              <p className="text-lg text-secondary mb-6">{project.description}</p>
              
              <div className="flex gap-4">
                <Button asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View on GitHub
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    const docSection = document.getElementById('documentation-section');
                    if (docSection) {
                      docSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Documentation
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Project Overview */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
            <p className="text-lg leading-relaxed mb-6">{projectContent.overview}</p>
            
            <h3 className="text-xl font-semibold mb-4">{projectContent.sectionTitle}</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {projectContent.keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.features.map((feature, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="text-sm">{feature}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Documentation */}
        <Card className="mb-12" id="documentation-section">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Documentation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Book className="h-6 w-6 text-blue-500" />
                  <h3 className="font-bold text-lg">Setup Guide</h3>
                </div>
                <p className="text-secondary text-sm mb-4">
                  Complete installation and configuration instructions.
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => openDocumentation('setup')}
                >
                  <Book className="mr-2 h-4 w-4" />
                  View Setup Guide
                </Button>
              </div>

              <div className="border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-6 w-6 text-green-500" />
                  <h3 className="font-bold text-lg">User Guide</h3>
                </div>
                <p className="text-secondary text-sm mb-4">
                  Comprehensive guide covering test writing, execution, configuration, and best practices.
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => openDocumentation('user-guide')}
                >
                  <Users className="mr-2 h-4 w-4" />
                  View User Guide
                </Button>
              </div>

              <div className="border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Code className="h-6 w-6 text-orange-500" />
                  <h3 className="font-bold text-lg">API Reference</h3>
                </div>
                <p className="text-secondary text-sm mb-4">
                  Complete API documentation with code examples and implementation patterns.
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    window.open(project.githubUrl, '_blank');
                  }}
                >
                  <Code className="mr-2 h-4 w-4" />
                  View Documentation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technologies */}
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Technologies & Tools</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {project.technologies.map((tech) => (
                <div key={tech} className="text-center p-4 border rounded-lg">
                  <span className="font-medium">{tech}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}