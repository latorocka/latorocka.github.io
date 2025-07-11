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
          "Production-ready framework with concurrent request handling and timeout management"
        ],
        sectionTitle: "Testing Categories",
        hasCodeExamples: true,
        hasProjectStructure: true
      };
    } else if (project.id === 3) {
      // Mobile Test Automation
      return {
        overview: `This enterprise-grade mobile test automation framework demonstrates advanced cross-platform testing capabilities using Appium and WebDriverIO. Designed for comprehensive mobile application validation across Android and iOS platforms with real device support, parallel execution, and professional CI/CD integration.`,
        
        keyFeatures: [
          "Cross-platform testing framework for Android and iOS applications",
          "Page Object Model implementation for maintainable test architecture",
          "Real device and emulator/simulator support with automated setup scripts",
          "Parallel test execution across multiple devices and platforms",
          "Comprehensive gesture testing (tap, swipe, pinch, long press, multi-touch)",
          "Performance testing with app launch time, memory usage, and battery impact",
          "Accessibility testing with screen reader and ADA compliance validation",
          "Network condition testing and app behavior under various connectivity states",
          "Advanced device management with app lifecycle control and screenshot capture",
          "CI/CD integration with Jenkins and GitHub Actions pipeline configurations"
        ],
        sectionTitle: "Mobile Testing Excellence",
        hasCodeExamples: true,
        hasProjectStructure: true
      };
    } else {
      // Default/other projects
      return {
        overview: project.description,
        keyFeatures: project.features || [],
        sectionTitle: "Key Features",
        hasCodeExamples: false,
        hasProjectStructure: false
      };
    }
  };

  const projectContent = getProjectContent();

  const seleniumFramework = {
    overview: projectContent.overview,
    keyFeatures: projectContent.keyFeatures,

    architecture: project.id === 1 ? [
      {
        component: "Driver Management",
        description: "Thread-safe WebDriver initialization with support for multiple browsers and headless execution"
      },
      {
        component: "Page Object Model",
        description: "Structured page classes with reusable methods and element locators for maintainable test code"
      },
      {
        component: "Test Utilities",
        description: "Helper classes for screenshots, waits, Excel data handling, and configuration management"
      },
      {
        component: "Test Classes",
        description: "Comprehensive test scenarios with data-driven testing and proper test lifecycle management"
      }
    ] : project.id === 2 ? [
      {
        component: "Functional Tests",
        description: "Complete CRUD operations validation with input validation, response structure verification, and error handling"
      },
      {
        component: "Integration Tests",
        description: "Cross-API workflows, data consistency validation, cascading requests, and failure recovery mechanisms"
      },
      {
        component: "Performance Tests",
        description: "Response time analysis, concurrent load testing, throughput measurement, and scalability validation"
      },
      {
        component: "Security Tests",
        description: "SQL injection prevention, XSS protection, authentication testing, and rate limiting validation"
      },
      {
        component: "Data Validation",
        description: "Schema verification, type consistency, cross-API integrity checks, and custom validation rules"
      },
      {
        component: "Test Runner",
        description: "Automated CLI interface with category-based execution, detailed reporting, and performance metrics"
      }
    ] : project.id === 3 ? [
      {
        component: "Page Object Model",
        description: "Cross-platform page objects with Android and iOS specific selectors and unified test interactions"
      },
      {
        component: "Device Management",
        description: "Platform-agnostic device utilities for app lifecycle, network control, and screenshot capture"
      },
      {
        component: "Test Categories",
        description: "Functional, performance, accessibility, and gesture testing with comprehensive coverage analysis"
      },
      {
        component: "Configuration",
        description: "WebDriverIO configurations for Android, iOS, parallel execution, and CI/CD pipeline integration"
      },
      {
        component: "Utilities",
        description: "Test data management, device utilities, and automated setup scripts for Android SDK and iOS"
      },
      {
        component: "Reporting",
        description: "Allure integration with screenshot capture, device information, and comprehensive test metrics"
      }
    ] : [],

    codeExamples: project.id === 1 ? [
      {
        title: "Driver Manager Implementation",
        language: "java",
        code: `public class DriverManager {
    private static final ThreadLocal<WebDriver> driverThreadLocal = new ThreadLocal<>();
    
    public static void setDriver() {
        String browserName = config.getBrowser().toLowerCase();
        WebDriver driver;
        
        switch (browserName) {
            case "chrome":
                WebDriverManager.chromedriver().setup();
                ChromeOptions chromeOptions = new ChromeOptions();
                if (config.isHeadless()) {
                    chromeOptions.addArguments("--headless");
                }
                driver = new ChromeDriver(chromeOptions);
                break;
            // Additional browser configurations...
        }
        
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(config.getImplicitWait()));
        driverThreadLocal.set(driver);
    }
}`
      },
      {
        title: "Page Object Model Example",
        language: "java",
        code: `public class LoginPage extends BasePage {
    @FindBy(id = "username")
    private WebElement usernameField;
    
    @FindBy(id = "password")
    private WebElement passwordField;
    
    @FindBy(id = "login-button")
    private WebElement loginButton;
    
    public void login(String username, String password) {
        enterUsername(username);
        enterPassword(password);
        clickLoginButton();
    }
    
    public void enterUsername(String username) {
        WaitUtils.waitForElementToBeVisible(driver, USERNAME_FIELD);
        sendKeys(usernameField, username);
    }
}`
      },
      {
        title: "Data-Driven Test Implementation",
        language: "java",
        code: `@Test(dataProvider = "loginData")
public void testDataDrivenLogin(Map<String, String> testData) {
    LoginPage loginPage = new LoginPage(DriverManager.getDriver());
    
    String username = testData.get("username");
    String password = testData.get("password");
    String expectedResult = testData.get("expectedResult");
    
    loginPage.login(username, password);
    
    if (expectedResult.equals("success")) {
        HomePage homePage = new HomePage(DriverManager.getDriver());
        Assert.assertTrue(homePage.isHomePageLoaded());
    } else {
        Assert.assertTrue(loginPage.isErrorMessageDisplayed());
    }
}

@DataProvider(name = "loginData")
public Object[][] getLoginTestData() {
    return ExcelUtils.readExcelData(config.getTestDataPath(), "LoginData");
}`
      }
    ] : project.id === 2 ? [
      {
        title: "Automated Test Runner with CLI Interface",
        language: "javascript",
        code: `class TestRunner {
  constructor() {
    this.results = [];
    this.categories = [
      'functional', 'integration', 'performance', 
      'security', 'data-validation', 'graphql', 
      'websocket', 'github-api'
    ];
  }

  async runAllTests() {
    console.log('🚀 Starting API Test Suite - Enterprise Grade Framework');
    
    for (const category of this.categories) {
      await this.runTestCategory(category);
    }
    
    this.generateSummaryReport();
  }

  async runTestCategory(category) {
    const startTime = Date.now();
    const testResult = await this.executeJestTest(\`tests/\${category}\`);
    const duration = Date.now() - startTime;
    
    this.results.push({
      category,
      passed: testResult.numPassedTests,
      failed: testResult.numFailedTests,
      duration: \`\${duration}ms\`
    });
  }
}`
      },
      {
        title: "Performance Testing with Concurrent Load Analysis",
        language: "javascript",
        code: `describe('Performance Tests - Load & Scalability', () => {
  test('Concurrent API load testing', async () => {
    const concurrentRequests = [1, 5, 10, 20];
    const results = [];

    for (const count of concurrentRequests) {
      const startTime = Date.now();
      
      const promises = Array.from({ length: count }, () => 
        axios.get('https://jsonplaceholder.typicode.com/users')
      );
      
      const responses = await Promise.all(promises);
      const totalTime = Date.now() - startTime;
      
      results.push({
        concurrentRequests: count,
        totalTime,
        averageTime: totalTime / count,
        successRate: responses.filter(r => r.status === 200).length / count * 100
      });
      
      expect(responses.every(r => r.status === 200)).toBe(true);
      expect(totalTime).toBeLessThan(5000); // 5 second threshold
    }
    
    console.log('📊 Performance Results:', results);
  });
});`
      },
      {
        title: "Security Testing with SQL Injection & XSS Prevention",
        language: "javascript",
        code: `describe('Security Tests - Injection & XSS Protection', () => {
  const maliciousInputs = [
    "'; DROP TABLE users; --",
    "<script>alert('XSS')</script>",
    "' OR '1'='1",
    "<img src=x onerror=alert('XSS')>",
    "../../etc/passwd",
    "javascript:alert('XSS')"
  ];

  test('SQL injection prevention validation', async () => {
    for (const maliciousInput of maliciousInputs) {
      try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
          title: maliciousInput,
          body: 'Test content',
          userId: 1
        });
        
        // Verify malicious input is sanitized or rejected
        expect(response.data.title).not.toContain('DROP TABLE');
        expect(response.data.title).not.toContain('<script>');
        expect(response.status).toBe(201);
        
      } catch (error) {
        // Expected behavior for rejected malicious input
        expect(error.response.status).toBeGreaterThanOrEqual(400);
      }
    }
  });
});`
      }
    ] : project.id === 3 ? [
      {
        title: "Cross-Platform Page Object Model Implementation",
        language: "javascript",
        code: `const BasePage = require('../base/BasePage');

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

  get mainOption() {
    return this.platform === 'android'
      ? $('//android.widget.TextView[@text="Views"]')
      : $('//XCUIElementTypeCell[@name="Buttons"]');
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
}`
      },
      {
        title: "Comprehensive Gesture Testing Framework",
        language: "javascript",
        code: `describe('Cross-Platform Gesture Tests', () => {
  let basePage;
  
  beforeEach(async () => {
    basePage = new BasePage();
    await basePage.waitForAppToLoad();
  });

  it('should perform advanced gesture interactions', async () => {
    // Multi-touch pinch gesture
    const screenSize = await browser.getWindowSize();
    const centerX = screenSize.width / 2;
    const centerY = screenSize.height / 2;
    
    await browser.touchAction([
      { action: 'press', x: centerX - 50, y: centerY },
      { action: 'moveTo', x: centerX - 100, y: centerY },
      { action: 'release' }
    ]);
    
    // Long press with context validation
    const targetElement = await basePage.getMainNavigationElement();
    await browser.touchAction([
      { action: 'press', element: targetElement },
      { action: 'wait', ms: 2000 },
      { action: 'release' }
    ]);
    
    // Swipe gestures with performance tracking
    const swipeStart = Date.now();
    await basePage.swipeLeft();
    const swipeTime = Date.now() - swipeStart;
    
    expect(swipeTime).toBeLessThan(1000);
  });
});`
      },
      {
        title: "Performance & Device Management Testing",
        language: "javascript",
        code: `describe('Mobile Performance & Device Management', () => {
  let deviceUtils;
  
  beforeEach(async () => {
    deviceUtils = new DeviceUtils();
  });

  it('should measure app performance metrics', async () => {
    // App launch time measurement
    const launchStart = Date.now();
    await deviceUtils.activateApp('com.example.app');
    
    const appTitle = await deviceUtils.waitForAppToLoad();
    const launchTime = Date.now() - launchStart;
    
    console.log(\`App launch time: \${launchTime}ms\`);
    expect(launchTime).toBeLessThan(5000);
    
    // Memory usage monitoring
    const memoryInfo = await deviceUtils.getDeviceInfo();
    console.log('Device memory info:', memoryInfo);
    
    // Battery impact analysis
    const batteryInfo = await deviceUtils.getBatteryInfo();
    if (batteryInfo) {
      expect(batteryInfo.level).toBeGreaterThan(20);
    }
    
    // Network condition testing
    if (deviceUtils.isAndroid) {
      await deviceUtils.setNetworkConnection({
        airplaneMode: false,
        wifi: false,
        data: true
      });
      
      const networkInfo = await deviceUtils.getNetworkConnection();
      expect(networkInfo.data).toBe(true);
    }
  });
});`
      },
      {
        title: "Parallel Test Execution Configuration",
        language: "javascript",
        code: `// wdio.parallel.conf.js
const { config } = require('./wdio.base.conf');

config.capabilities = [
  {
    platformName: 'Android',
    'appium:deviceName': 'Pixel_6_API_31',
    'appium:platformVersion': '12.0',
    'appium:automationName': 'UiAutomator2',
    'appium:app': './apps/ApiDemos.apk'
  },
  {
    platformName: 'iOS',
    'appium:deviceName': 'iPhone 14',
    'appium:platformVersion': '16.0',
    'appium:automationName': 'XCUITest',
    'appium:app': './apps/UICatalog.app'
  },
  {
    platformName: 'Android',
    'appium:deviceName': 'Samsung_Galaxy_S21',
    'appium:platformVersion': '11.0',
    'appium:automationName': 'UiAutomator2',
    'appium:app': './apps/ApiDemos.apk'
  }
];

config.maxInstances = 3;
config.maxInstancesPerCapability = 1;

// Enable parallel execution reporting
config.reporters = [
  ['allure', {
    outputDir: 'allure-results',
    disableWebdriverStepsReporting: true,
    disableWebdriverScreenshotsReporting: false,
  }]
];

exports.config = config;`
      }
    ] : []
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Button>
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
              <p className="text-xl text-secondary">{project.description}</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                className="bg-primary hover:bg-primary/90"
                onClick={() => window.open(project.githubUrl, '_blank')}
              >
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  const documentationSection = document.getElementById('documentation-section');
                  if (documentationSection) {
                    documentationSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <FileText className="mr-2 h-4 w-4" />
                Documentation
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-6">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Project Image */}
        <div className="mb-12">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-64 lg:h-96 object-cover rounded-xl shadow-xl"
          />
        </div>

        {/* Overview */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
            <p className="text-secondary leading-relaxed">
              {seleniumFramework.overview}
            </p>
          </CardContent>
        </Card>

        {/* Key Features */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {seleniumFramework.keyFeatures.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-green-500 mt-1 mr-3">✓</span>
                  <span className="text-secondary">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Architecture */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">{projectContent.sectionTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {seleniumFramework.architecture.map((component, index) => (
                <div key={index} className="border rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-3 text-primary">{component.component}</h3>
                  <p className="text-secondary text-sm">{component.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Code Examples */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Code Examples</h2>
            <div className="space-y-8">
              {seleniumFramework.codeExamples.map((example, index) => (
                <div key={index}>
                  <h3 className="font-bold text-lg mb-4 text-accent">{example.title}</h3>
                  <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-sm text-slate-300">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project Structure */}
        {projectContent.hasProjectStructure && (
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Project Structure</h2>
              <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-6">
                <pre className="text-sm text-slate-300">
                  <code>{project.id === 1 ? `selenium-framework/
├── src/
│   ├── main/java/
│   │   ├── pages/           # Page Object Model classes
│   │   ├── utils/           # Utility classes
│   │   └── config/          # Configuration management
│   └── test/java/
│       ├── tests/           # Test classes
│       ├── listeners/       # TestNG listeners
│       └── base/            # Base test class
├── test-data/              # Test data files
├── test-output/           # Test reports and screenshots
├── src/test/resources/    # Configuration files
├── Jenkinsfile           # Jenkins CI/CD pipeline
├── .github/workflows/    # GitHub Actions CI
└── pom.xml              # Maven configuration` : project.id === 2 ? `api-test-suite/
├── tests/
│   ├── rest/                    # Functional API tests
│   │   ├── user-api.test.js         # CRUD operations testing
│   │   └── github-api.test.js       # GitHub API integration
│   ├── integration/             # Cross-API workflow tests
│   │   └── api-integration.test.js  # Multi-step API validation
│   ├── performance/             # Load & scalability tests
│   │   └── load-testing.test.js     # Concurrent request analysis
│   ├── security/                # Security validation tests
│   │   └── security-validation.test.js # SQL injection, XSS protection
│   ├── data-validation/         # Schema & data integrity tests
│   │   └── schema-validation.test.js   # API response validation
│   ├── graphql/                 # GraphQL API tests
│   │   └── user-queries.test.js     # GraphQL query validation
│   ├── websocket/               # Real-time communication tests
│   │   └── real-time.test.js        # WebSocket connection testing
│   ├── test-runner.js           # Automated test execution CLI
│   └── setup.js                 # Test configuration & utilities
├── demo/
│   └── run-live-tests.js        # Live API demonstration script
├── jest.config.js               # Jest testing framework config
├── package.json                 # Dependencies & scripts
└── README.md                    # Comprehensive documentation` : project.id === 3 ? `mobile-test-suite/
├── config/                      # WebDriverIO configurations
│   ├── wdio.base.conf.js           # Base configuration
│   ├── wdio.android.conf.js        # Android-specific config
│   ├── wdio.ios.conf.js            # iOS-specific config
│   └── wdio.parallel.conf.js       # Parallel execution config
├── pages/                       # Page Object Model
│   ├── base/                       # Base page classes
│   │   └── BasePage.js                # Common page functionality
│   ├── android/                    # Android-specific pages
│   │   └── HomePage.js                # Android home page
│   └── ios/                        # iOS-specific pages
│       └── HomePage.js                # iOS home page
├── tests/                       # Test specifications
│   ├── android/                    # Android-specific tests
│   │   └── home.spec.js               # Android home tests
│   ├── ios/                        # iOS-specific tests
│   │   └── home.spec.js               # iOS home tests
│   └── cross-platform/             # Cross-platform tests
│       ├── gestures.spec.js           # Gesture testing
│       └── performance.spec.js        # Performance testing
├── utils/                       # Utility classes
│   ├── device-utils.js             # Device management utilities
│   └── test-data.js                # Test data management
├── scripts/                     # Setup and automation scripts
│   ├── setup-android.js            # Android environment setup
│   └── setup-ios.js                # iOS environment setup
├── package.json                 # Dependencies & npm scripts
├── .gitignore                   # Git ignore rules
└── README.md                    # Comprehensive documentation` : ''}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Documentation */}
        <Card className="mb-12" id="documentation-section">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Documentation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Book className="h-6 w-6 text-blue-500" />
                  <h3 className="font-bold text-lg">Setup Guide</h3>
                </div>
                <p className="text-secondary text-sm mb-4">
                  {project.id === 1 ? 
                    "Complete installation and configuration instructions for getting the framework up and running." :
                  project.id === 2 ?
                    "Complete installation and configuration instructions for setting up the API test suite and running tests." :
                    "Complete installation and configuration instructions for setting up the mobile test automation framework with Android and iOS support."
                  }
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    // Create a new window/tab with the setup guide content
                    let setupContent = '';
                    if (project.id === 1) {
                      setupContent = `# Setup Guide - Selenium Test Framework

## Prerequisites
- Java Development Kit (JDK) 11 or higher
- Apache Maven 3.6+
- IDE (IntelliJ IDEA, Eclipse, or VS Code)
- Browser support: Chrome, Firefox, Edge, Safari

## Installation Steps
1. Clone the repository
2. Install dependencies: mvn clean install
3. Configure test environment
4. Verify installation: mvn test

## Browser Requirements
- Google Chrome (Latest stable version)
- Mozilla Firefox (Latest stable version)
- Microsoft Edge (Latest stable version)
- Safari (macOS only)

## Configuration
Edit src/test/resources/config.properties for your environment settings.

For complete setup instructions, contact: Latorocka@gmail.com`;
                    } else if (project.id === 2) {
                      setupContent = `# Setup Guide - API Test Suite

## Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager
- Internet connection for live API testing
- Jest testing framework (installed via npm)

## Installation Steps
1. Clone the repository
   git clone https://github.com/latorocka/api-test-suite.git
   cd api-test-suite

2. Install dependencies
   npm install

3. Verify installation
   npm test

4. Run specific test categories
   node tests/test-runner.js --category functional
   node tests/test-runner.js --category performance

## Quick Start
# Run all tests
npm test

# Run live API demonstration
node demo/run-live-tests.js

# Run specific test category
node tests/test-runner.js --category security

# Run with detailed reporting
node tests/test-runner.js --verbose

## Configuration
No additional configuration required. Tests run against public APIs:
- JSONPlaceholder (REST API testing)
- GitHub API (Repository validation)
- SpaceX API (GraphQL testing)
- WebSocket Echo Server (Real-time testing)

For complete setup instructions, contact: Latorocka@gmail.com`;
                    } else {
                      setupContent = `# Setup Guide - Mobile Test Automation Suite

## Prerequisites

### For Android Testing:
- Node.js 16.x or higher
- npm or yarn package manager
- Android Studio with SDK Tools
- Java JDK 8 or 11
- Android SDK (API levels 29-31)
- Android emulator or physical device

### For iOS Testing (macOS only):
- Xcode 14.x or later
- iOS Simulator
- Command Line Tools for Xcode
- Valid Apple Developer account (for real device testing)

## Installation Steps

1. Clone the repository
   git clone https://github.com/latorocka/mobile-test-suite.git
   cd mobile-test-suite

2. Install dependencies
   npm install

3. Install Appium and drivers
   npm install -g appium
   appium driver install uiautomator2
   appium driver install xcuitest

4. Setup Android environment (if testing Android)
   node scripts/setup-android.js

5. Setup iOS environment (if testing iOS on macOS)
   node scripts/setup-ios.js

## Quick Start

# Run Android tests
npm run test:android

# Run iOS tests
npm run test:ios

# Run cross-platform tests
npm run test:cross-platform

# Run parallel tests across multiple devices
npm run test:parallel

# Run specific test categories
npm run test:gestures
npm run test:performance
npm run test:accessibility

## Configuration

### Android Configuration
Update config/wdio.android.conf.js with your device details:
- deviceName: 'Your_Device_Name'
- platformVersion: '12.0'
- app: './apps/your-app.apk'

### iOS Configuration
Update config/wdio.ios.conf.js with your device details:
- deviceName: 'iPhone 14'
- platformVersion: '16.0'
- app: './apps/your-app.app'

## Device Setup

### Android Setup:
1. Enable USB debugging on your device
2. Verify ADB can detect your device: adb devices
3. Set ANDROID_HOME environment variable

### iOS Setup:
1. Open Xcode and accept license agreements
2. Install iOS Simulator
3. Build WebDriverAgent for real device testing

For complete setup instructions, contact: Latorocka@gmail.com`;
                    }
                    
                    const newWindow = window.open('', '_blank');
                    if (newWindow) {
                      const titleText = project.id === 1 ? 'Selenium Framework' : project.id === 2 ? 'API Test Suite' : 'Mobile Test Automation Suite';
                      newWindow.document.write(`
                        <html>
                          <head>
                            <title>${titleText} - Setup Guide</title>
                            <style>
                              body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
                              h1, h2, h3 { color: #2563eb; }
                              pre { background: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
                              code { background: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
                            </style>
                          </head>
                          <body>
                            <pre>${setupContent}</pre>
                          </body>
                        </html>
                      `);
                      newWindow.document.close();
                    }
                  }}
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
                  {project.id === 1 ?
                    "Comprehensive guide for writing, executing, and managing automated tests with the framework." :
                  project.id === 2 ?
                    "Comprehensive guide for executing test categories, analyzing results, and using the automated test runner." :
                    "Comprehensive guide for writing mobile tests, configuring devices, and managing cross-platform test execution."
                  }
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    let userGuideContent = '';
                    if (project.id === 1) {
                      userGuideContent = `# User Guide - Selenium Test Framework

## Test Execution

### Running Tests
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=LoginTest

# Run tests in different browsers
mvn test -Dbrowser=chrome
mvn test -Dbrowser=firefox
mvn test -Dbrowser=edge

# Run headless tests
mvn test -Dheadless=true

### Test Suite Execution
# Run smoke tests
mvn test -DsuiteXmlFile=src/test/resources/smoke-suite.xml

# Run regression tests  
mvn test -DsuiteXmlFile=src/test/resources/regression-suite.xml

## Writing Tests

### Creating Page Objects
public class LoginPage extends BasePage {
    @FindBy(id = "username")
    private WebElement usernameField;
    
    public void login(String username, String password) {
        enterUsername(username);
        enterPassword(password);
        clickLoginButton();
    }
}

### Data-Driven Testing
@Test(dataProvider = "loginData")
public void testLogin(Map<String, String> testData) {
    // Use Excel data for test parameters
}

## Configuration Management
Edit config.properties for environment settings:
- browser=chrome
- environment=qa
- headless=false

For detailed usage examples, contact: Latorocka@gmail.com`;
                    } else if (project.id === 2) {
                      userGuideContent = `# User Guide - API Test Suite

## Test Execution

### Running All Tests
# Execute complete test suite
npm test

# Run all tests with detailed output
npm test -- --verbose

# Run specific test file
npm test tests/rest/user-api.test.js

### Category-Based Execution
# Run specific test category
node tests/test-runner.js --category functional
node tests/test-runner.js --category integration
node tests/test-runner.js --category performance
node tests/test-runner.js --category security

# Run multiple categories
node tests/test-runner.js --category functional,performance

# List all available categories
node tests/test-runner.js --list

### Live API Demonstration
# Run live API demo (all endpoints)
node demo/run-live-tests.js

# This demonstrates working tests against:
# - JSONPlaceholder (REST API)
# - GitHub API (Repository data)
# - SpaceX GraphQL API (Mission data)
# - WebSocket Echo Server (Real-time)

## Test Categories

### 1. Functional Tests
- CRUD operations validation
- Input validation testing
- Response structure verification
- Error handling validation

### 2. Integration Tests
- Cross-API workflow testing
- Data consistency validation
- Cascading request scenarios
- Failure recovery testing

### 3. Performance Tests
- Response time analysis
- Concurrent load testing (1, 5, 10, 20+ requests)
- Throughput measurement
- Scalability validation

### 4. Security Tests
- SQL injection prevention
- XSS protection validation
- Authentication testing
- Rate limiting validation

### 5. Data Validation Tests
- Schema verification
- Type consistency checks
- Cross-API data integrity
- Custom validation rules

## Test Results & Reporting
The test runner provides:
- Category-specific success rates
- Performance metrics and timing
- Detailed error reporting
- Summary statistics

## Advanced Usage
# Run with performance profiling
node tests/test-runner.js --category performance --profile

# Generate detailed HTML report
node tests/test-runner.js --report-html

# Run in CI/CD mode
node tests/test-runner.js --ci

For detailed usage examples, contact: Latorocka@gmail.com`;
                    } else {
                      userGuideContent = `# User Guide - Mobile Test Automation Suite

## Test Execution

### Running Single Platform Tests
# Run Android tests only
npm run test:android

# Run iOS tests only (macOS required)
npm run test:ios

### Running Cross-Platform Tests
# Execute tests across both platforms
npm run test:cross-platform

# Run parallel tests on multiple devices
npm run test:parallel

### Test Categories
# Run gesture tests
npm run test:gestures

# Run performance tests
npm run test:performance

# Run accessibility tests
npm run test:accessibility

# Run all test categories
npm test

## Device Configuration

### Android Device Setup
# List available Android devices/emulators
adb devices

# Start Android emulator
emulator -avd Pixel_6_API_31

# Install app on device
adb install path/to/your-app.apk

### iOS Device Setup (macOS only)
# List available iOS simulators
xcrun simctl list devices

# Boot iOS simulator
xcrun simctl boot "iPhone 14"

# Install app on simulator
xcrun simctl install booted path/to/your-app.app

## Writing Tests

### Creating Cross-Platform Page Objects
class HomePage extends BasePage {
  constructor() {
    super();
    this.platform = browser.capabilities.platformName.toLowerCase();
  }

  get loginButton() {
    return this.platform === 'android' 
      ? $('//android.widget.Button[@text="Login"]')
      : $('//XCUIElementTypeButton[@name="Login"]');
  }

  async performLogin(username, password) {
    await this.safeClick(this.loginButton);
    return this;
  }
}

### Gesture Testing Examples
# Tap gesture
await browser.touchAction('tap', { x: 100, y: 200 });

# Long press
await browser.touchAction([
  { action: 'press', x: 100, y: 200 },
  { action: 'wait', ms: 2000 },
  { action: 'release' }
]);

# Swipe gesture
await browser.touchAction([
  { action: 'press', x: 300, y: 500 },
  { action: 'moveTo', x: 300, y: 200 },
  { action: 'release' }
]);

## Device Management

### App Lifecycle Management
# Install app
await deviceUtils.installApp('./apps/test-app.apk');

# Activate app
await deviceUtils.activateApp('com.example.testapp');

# Terminate app
await deviceUtils.terminateApp('com.example.testapp');

# Remove app
await deviceUtils.removeApp('com.example.testapp');

### Network Testing
# Disable WiFi (Android)
await deviceUtils.setNetworkConnection({
  airplaneMode: false,
  wifi: false,
  data: true
});

# Enable airplane mode
await deviceUtils.setNetworkConnection({
  airplaneMode: true,
  wifi: false,
  data: false
});

## Performance Testing

### App Launch Time Measurement
const launchStart = Date.now();
await deviceUtils.activateApp('com.example.app');
const launchTime = Date.now() - launchStart;
console.log(\`App launch time: \${launchTime}ms\`);

### Memory Usage Monitoring
const deviceInfo = await deviceUtils.getDeviceInfo();
console.log('Memory usage:', deviceInfo.memory);

### Battery Impact Analysis
const batteryInfo = await deviceUtils.getBatteryInfo();
if (batteryInfo) {
  console.log('Battery level:', batteryInfo.level);
  expect(batteryInfo.level).toBeGreaterThan(20);
}

## Parallel Execution

### Multi-Device Configuration
Configure multiple devices in wdio.parallel.conf.js:
- Android Pixel 6 (API 31)
- iOS iPhone 14 (iOS 16.0)
- Android Samsung Galaxy S21 (API 30)

### Running Parallel Tests
# Execute tests across all configured devices
npm run test:parallel

# Monitor test execution
# Each device runs tests independently
# Results are aggregated in final report

## Reporting & Analysis

### Allure Reports
# Generate comprehensive test reports
npm run report:generate

# Open interactive report
npm run report:open

### Screenshot Capture
Screenshots are automatically captured:
- On test failures
- During key test steps
- With device information overlay

### Test Metrics
The framework captures:
- Test execution times
- Device performance metrics
- App crash reports
- Network usage statistics
- Battery consumption data

## Troubleshooting

### Common Android Issues
1. ADB not found: Add Android SDK to PATH
2. Device not detected: Enable USB debugging
3. App installation fails: Check app signing

### Common iOS Issues
1. Simulator not booting: Reset simulator
2. WebDriverAgent build fails: Check Xcode setup
3. Real device testing: Verify developer certificate

For detailed troubleshooting, contact: Latorocka@gmail.com`;
                    }
                    
                    const newWindow = window.open('', '_blank');
                    if (newWindow) {
                      const userTitleText = project.id === 1 ? 'Selenium Framework' : project.id === 2 ? 'API Test Suite' : 'Mobile Test Automation Suite';
                      newWindow.document.write(`
                        <html>
                          <head>
                            <title>${userTitleText} - User Guide</title>
                            <style>
                              body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
                              h1, h2, h3 { color: #2563eb; }
                              pre { background: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
                              code { background: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
                            </style>
                          </head>
                          <body>
                            <pre>${userGuideContent}</pre>
                          </body>
                        </html>
                      `);
                      newWindow.document.close();
                    }
                  }}
                >
                  <Users className="mr-2 h-4 w-4" />
                  View User Guide
                </Button>
              </div>

              <div className="border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Settings className="h-6 w-6 text-purple-500" />
                  <h3 className="font-bold text-lg">Architecture</h3>
                </div>
                <p className="text-secondary text-sm mb-4">
                  {project.id === 1 ?
                    "Detailed technical documentation covering framework design, patterns, and implementation details." :
                  project.id === 2 ?
                    "Comprehensive technical documentation covering test suite architecture, design patterns, and implementation strategies." :
                    "Comprehensive technical documentation covering mobile testing architecture, cross-platform design patterns, and device management strategies."
                  }
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    let architectureContent = '';
                    if (project.id === 1) {
                      architectureContent = `# Architecture Documentation - Selenium Test Framework

## Framework Components

### 1. Driver Management Layer
- DriverManager: Thread-safe WebDriver instantiation
- Cross-browser support (Chrome, Firefox, Edge, Safari)
- Headless execution support
- Automatic driver binary management

### 2. Page Object Model (POM) Layer
- BasePage: Common page interactions and utilities
- Page-specific classes extending BasePage
- WebElement initialization using Page Factory
- Encapsulated page functionality

### 3. Wait Management Layer
- WaitUtils: Explicit wait strategies
- Element visibility and clickability waits
- Custom wait conditions
- JavaScript execution waits

### 4. Test Foundation Layer
- BaseTest: Test lifecycle management
- Setup and teardown methods
- Screenshot capture on failures
- Test result handling

### 5. Data Management Layer
- ExcelUtils: Excel file reading and parsing
- TestNG DataProvider integration
- Dynamic test data injection
- Data-driven testing support

### 6. Configuration Management
- ConfigManager: Singleton configuration access
- Environment-specific settings
- Runtime property override support
- External configuration files

## Design Patterns
- Singleton Pattern: ConfigManager
- Factory Pattern: WebDriverManager, Page Factory
- Template Method: BasePage, BaseTest
- Strategy Pattern: Wait strategies, Browser strategies
- Observer Pattern: TestNG Listeners

## Thread Safety
- ThreadLocal WebDriver implementation
- Parallel test execution support
- Thread isolation for concurrent testing

## CI/CD Integration
- Jenkins pipeline support
- GitHub Actions workflow
- Multi-browser testing matrix
- Automated reporting and artifacts

Contact: Latorocka@gmail.com for architecture details`;
                    } else if (project.id === 2) {
                      architectureContent = `# Architecture Documentation - API Test Suite

## Framework Components

### 1. Test Runner Layer
- TestRunner: Central orchestration of test execution
- Category-based test organization and execution
- CLI interface with detailed reporting
- Performance metrics collection and analysis

### 2. Test Category Layer
- Functional Tests: CRUD operations and input validation
- Integration Tests: Cross-API workflow validation
- Performance Tests: Load testing and scalability analysis
- Security Tests: Injection prevention and authentication validation
- Data Validation Tests: Schema verification and integrity checks

### 3. API Client Layer
- HTTP Client: Axios-based REST API communication
- GraphQL Client: Query execution and response validation
- WebSocket Client: Real-time communication testing
- Request/Response interceptors for logging and metrics

### 4. Validation Layer
- Response Validators: Schema and data structure verification
- Performance Validators: Timing and throughput analysis
- Security Validators: Injection attempt detection
- Error Validators: Proper error response handling

### 5. Reporting Layer
- Test Results Aggregation: Category-specific success rates
- Performance Metrics: Response time and throughput analysis
- Error Reporting: Detailed failure analysis and debugging
- Summary Generation: Comprehensive test execution reports

### 6. Configuration Layer
- Environment Configuration: API endpoint management
- Test Configuration: Category-specific settings
- Runtime Configuration: Dynamic parameter handling
- Credential Management: API key and authentication handling

## Design Patterns
- Strategy Pattern: Test execution strategies per category
- Factory Pattern: Test runner and validator creation
- Observer Pattern: Test result collection and reporting
- Template Method: Base test structure and lifecycle
- Command Pattern: CLI command processing

## API Integration Architecture
- Live API Endpoints: JSONPlaceholder, GitHub, SpaceX, WebSocket
- Error Handling: Comprehensive error scenarios and validation
- Rate Limiting: API quota management and retry logic
- Authentication: Token-based and header authentication support

## Performance Architecture
- Concurrent Testing: Multi-threaded request execution
- Load Testing: Scalable request volume handling
- Metrics Collection: Real-time performance data capture
- Bottleneck Analysis: Response time and throughput optimization

## Test Execution Flow
1. Test Runner initialization with category selection
2. Test discovery and dependency resolution
3. Parallel test execution with resource management
4. Real-time result collection and validation
5. Performance metrics calculation and reporting
6. Comprehensive summary generation and output

Contact: Latorocka@gmail.com for architecture details`;
                    } else {
                      architectureContent = `# Architecture Documentation - Mobile Test Automation Suite

## Framework Components

### 1. Configuration Management Layer
- Base Configuration: Common WebDriverIO settings and capabilities
- Platform-Specific Configs: Android and iOS specific configurations
- Parallel Execution Config: Multi-device testing orchestration
- Environment Management: Development, staging, and production settings

### 2. Page Object Model Layer
- BasePage: Common mobile interaction patterns and utilities
- Platform-Specific Pages: Android and iOS page implementations
- Cross-Platform Abstraction: Unified interface for different platforms
- Element Management: Smart selector strategies for mobile elements

### 3. Device Management Layer
- DeviceUtils: Comprehensive device interaction utilities
- App Lifecycle Management: Install, activate, terminate, and remove apps
- Network Control: WiFi, cellular, and airplane mode management
- Performance Monitoring: Memory, battery, and CPU usage tracking

### 4. Test Execution Layer
- Cross-Platform Tests: Unified test scenarios for both platforms
- Platform-Specific Tests: Android and iOS specialized test cases
- Parallel Execution: Multi-device test orchestration
- Test Categories: Functional, performance, accessibility, and gesture testing

### 5. Utility and Data Layer
- Test Data Management: Dynamic test data generation and management
- Screenshot Utilities: Automated capture with device information
- Setup Scripts: Automated environment configuration for Android and iOS
- Reporting Integration: Allure reports with comprehensive metrics

### 6. CI/CD Integration Layer
- Jenkins Pipeline: Automated test execution in CI/CD workflows
- GitHub Actions: Cross-platform testing in cloud environments
- Device Farm Integration: Scalable testing across multiple real devices
- Artifact Management: Test reports, screenshots, and logs collection

## Design Patterns

### Cross-Platform Patterns
- Strategy Pattern: Platform-specific implementation strategies
- Factory Pattern: Device and page object creation
- Template Method: Common test execution flow with platform variations
- Adapter Pattern: Unified interface for different mobile platforms

### Mobile-Specific Patterns
- Page Object Model: Maintainable mobile page representations
- Screen Object Pattern: Mobile screen interaction abstractions
- Device Object Pattern: Device capability and state management
- Test Data Builder: Dynamic test data construction for mobile scenarios

## Mobile Testing Architecture

### Android Testing Architecture
- UiAutomator2 Driver: Native Android automation capabilities
- Android SDK Integration: Direct device and emulator management
- ADB Communication: Device interaction and app management
- Gradle Build Integration: Automated app building and deployment

### iOS Testing Architecture
- XCUITest Driver: Native iOS automation capabilities
- Xcode Integration: iOS Simulator and real device testing
- WebDriverAgent: iOS test automation proxy
- TestFlight Integration: Production app testing capabilities

### Cross-Platform Coordination
- Unified Test Interface: Common test writing patterns
- Platform Detection: Automatic platform-specific behavior
- Shared Test Data: Cross-platform test scenario data
- Parallel Execution: Simultaneous testing across platforms

## Device Farm Integration

### Scalable Testing Architecture
- Multi-Device Support: Parallel execution across multiple devices
- Device Pool Management: Dynamic device allocation and release
- Load Balancing: Optimal test distribution across available devices
- Resource Monitoring: Device performance and availability tracking

### Real Device Testing
- Physical Device Support: USB and network connected devices
- Device Capabilities Detection: Automatic capability discovery
- Performance Profiling: Real-world performance measurement
- Network Condition Testing: Various connectivity scenarios

## Performance Testing Architecture

### Mobile Performance Metrics
- App Launch Time: Cold and warm start measurement
- Memory Usage: Heap and non-heap memory monitoring
- Battery Impact: Power consumption analysis
- Network Usage: Data transfer and API call optimization

### Performance Test Categories
- Load Testing: App behavior under various user loads
- Stress Testing: Device resource limitation testing
- Endurance Testing: Long-running operation validation
- Scalability Testing: Multi-user scenario simulation

## Test Execution Flow

### 1. Environment Setup Phase
- Device capability detection and validation
- App installation and configuration
- Network and permission setup
- Test data preparation and injection

### 2. Test Discovery Phase
- Platform-specific test identification
- Cross-platform test coordination
- Parallel execution planning
- Resource allocation and scheduling

### 3. Test Execution Phase
- Parallel test execution across devices
- Real-time progress monitoring
- Dynamic error handling and recovery
- Performance metrics collection

### 4. Results Collection Phase
- Cross-platform result aggregation
- Screenshot and video capture
- Performance data compilation
- Error analysis and categorization

### 5. Reporting Phase
- Comprehensive test result reporting
- Device-specific performance analysis
- Cross-platform comparison metrics
- CI/CD integration and artifact generation

## Error Handling and Recovery

### Robust Error Management
- Device Connection Recovery: Automatic reconnection handling
- App Crash Detection: Crash detection and recovery mechanisms
- Network Failure Handling: Timeout and retry strategies
- Platform-Specific Error Handling: iOS and Android specific error scenarios

### Test Reliability Features
- Smart Waits: Intelligent element waiting strategies
- Retry Mechanisms: Automatic test retry on transient failures
- Cleanup Procedures: Proper test environment cleanup
- State Management: Consistent app and device state handling

Contact: Latorocka@gmail.com for architecture details`;
                    }
                    
                    const newWindow = window.open('', '_blank');
                    if (newWindow) {
                      const archTitleText = project.id === 1 ? 'Selenium Framework' : project.id === 2 ? 'API Test Suite' : 'Mobile Test Automation Suite';
                      newWindow.document.write(`
                        <html>
                          <head>
                            <title>${archTitleText} - Architecture</title>
                            <style>
                              body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
                              h1, h2, h3 { color: #2563eb; }
                              pre { background: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
                              code { background: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
                            </style>
                          </head>
                          <body>
                            <pre>${architectureContent}</pre>
                          </body>
                        </html>
                      `);
                      newWindow.document.close();
                    }
                  }}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  View Architecture
                </Button>
              </div>

              <div className="border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Code className="h-6 w-6 text-orange-500" />
                  <h3 className="font-bold text-lg">API Reference</h3>
                </div>
                <p className="text-secondary text-sm mb-4">
                  {project.id === 1 ?
                    "Complete API documentation with class references, method signatures, and usage examples." :
                    "Complete API reference with test runner methods, category execution, and reporting interfaces."
                  }
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const apiReferenceContent = project.id === 1 ? `# API Reference - Selenium Test Framework

## Core Classes

### DriverManager
Thread-safe WebDriver management for parallel execution.

#### Methods
- setDriver(): Initializes WebDriver based on configuration
- getDriver(): Returns current WebDriver instance for thread
- quitDriver(): Quits driver and removes from ThreadLocal
- isDriverInitialized(): Checks if driver exists for current thread

### ConfigManager
Singleton configuration management.

#### Methods
- getInstance(): Returns singleton ConfigManager instance
- getProperty(String key): Gets property value by key
- getBrowser(): Gets configured browser name
- isHeadless(): Checks if headless execution enabled
- getImplicitWait(): Gets implicit wait timeout
- getExplicitWait(): Gets explicit wait timeout
- getBaseUrl(): Gets base URL for current environment

### WaitUtils
Element synchronization utilities.

#### Methods
- waitForElementToBeVisible(WebDriver, By): Waits for element visibility
- waitForElementToBeClickable(WebDriver, By): Waits for element clickability
- waitForElementToBeInvisible(WebDriver, By): Waits for element invisibility
- waitForTextToBePresentInElement(WebDriver, By, String): Waits for text presence
- waitForPageToLoad(WebDriver): Waits for page load completion

### BasePage
Abstract base class for page objects.

#### Constructor
- BasePage(WebDriver): Initializes page with WebDriver instance

#### Protected Methods
- click(By): Clicks element after wait
- sendKeys(By, String): Enters text after clearing field
- getText(By): Gets element text content
- getAttribute(By, String): Gets element attribute value
- isElementDisplayed(By): Checks element visibility
- scrollToElement(By): Scrolls element into view
- hoverOver(By): Hovers mouse over element

### BaseTest
Base test class with lifecycle management.

#### Lifecycle Methods
- @BeforeSuite suiteSetup(): Initializes configuration
- @BeforeMethod testSetup(Method): Sets up driver and navigation
- @AfterMethod testTeardown(ITestResult): Captures screenshots, quits driver
- @AfterSuite suiteTeardown(): Final cleanup

#### Utility Methods
- navigateToUrl(String): Navigates to specified URL
- takeScreenshot(String): Manually captures screenshot

### ExcelUtils
Test data management from Excel files.

#### Methods
- readExcelData(String, String): Returns Object[][] for DataProvider
- readExcelDataAsList(String, String): Returns List<Map<String, String>>
- getRowCount(String, String): Gets total row count
- getColumnCount(String, String): Gets total column count

### ScreenshotUtils
Screenshot capture utilities.

#### Methods
- takeScreenshot(WebDriver, String): Captures full page screenshot
- takeElementScreenshot(WebElement, String): Captures element screenshot
- takeScreenshotAsBase64(WebDriver): Returns Base64 screenshot
- takeFailureScreenshot(WebDriver, String): Captures failure screenshot

## Usage Examples

### Basic Test Structure
public class ExampleTest extends BaseTest {
    @Test
    public void testExample() {
        LoginPage loginPage = new LoginPage(DriverManager.getDriver());
        loginPage.login("user", "pass");
        
        HomePage homePage = new HomePage(DriverManager.getDriver());
        Assert.assertTrue(homePage.isWelcomeMessageDisplayed());
    }
}

### Data-Driven Test
@Test(dataProvider = "testData")
public void testWithData(Map<String, String> data) {
    // Use data parameters
}

@DataProvider(name = "testData")
public Object[][] getTestData() {
    return ExcelUtils.readExcelData("test-data/data.xlsx", "Sheet1");
}

For complete API documentation, contact: Latorocka@gmail.com` : `# API Reference - API Test Suite

## Core Classes

### TestRunner
Central test execution orchestrator with CLI interface.

#### Constructor
- TestRunner(): Initializes test runner with default configuration

#### Methods
- runAllTests(): Executes all test categories with comprehensive reporting
- runTestCategory(category): Runs specific test category with detailed metrics
- runSpecificCategory(categoryName): Executes single category with validation
- listCategories(): Lists all available test categories
- generateSummaryReport(): Creates comprehensive execution summary

#### Properties
- results: Array of test execution results with metrics
- categories: Available test categories (functional, integration, performance, etc.)

### APIClient
HTTP client wrapper for REST API testing.

#### Methods
- get(url, config): Performs GET request with error handling
- post(url, data, config): Performs POST request with validation
- put(url, data, config): Performs PUT request with response verification
- delete(url, config): Performs DELETE request with status validation
- performConcurrentRequests(requests, count): Executes concurrent API calls

#### Properties
- baseURL: Configured API endpoint base URL
- timeout: Request timeout configuration
- headers: Default headers for all requests

### PerformanceAnalyzer
Performance metrics collection and analysis.

#### Methods
- measureResponseTime(testFunction): Measures execution time of API calls
- analyzeConcurrentLoad(requestCount): Analyzes load testing results
- calculateThroughput(requests, duration): Calculates API throughput metrics
- generatePerformanceReport(): Creates detailed performance analysis

#### Properties
- metrics: Collection of performance measurements
- thresholds: Configurable performance thresholds
- results: Performance analysis results

### SecurityValidator
Security testing validation utilities.

#### Methods
- validateSQLInjectionPrevention(inputs): Tests SQL injection prevention
- validateXSSProtection(inputs): Tests cross-site scripting protection
- validateAuthenticationHandling(credentials): Tests authentication mechanisms
- validateRateLimiting(requests): Tests rate limiting implementation

#### Properties
- maliciousInputs: Collection of security test payloads
- vulnerabilities: Detected security issues
- recommendations: Security improvement suggestions

### SchemaValidator
API response schema validation.

#### Methods
- validateResponseSchema(response, schema): Validates API response structure
- validateDataTypes(data, expectedTypes): Validates data type consistency
- validateRequiredFields(data, requiredFields): Validates required field presence
- validateCrossAPIConsistency(responses): Validates data consistency across APIs

#### Properties
- schemas: Collection of expected API schemas
- validationRules: Custom validation rule definitions
- errors: Schema validation errors

## CLI Commands

### Test Execution
- node tests/test-runner.js: Run all test categories
- node tests/test-runner.js --category <name>: Run specific category
- node tests/test-runner.js --list: List available categories
- node tests/test-runner.js --verbose: Run with detailed output

### Reporting
- node tests/test-runner.js --report: Generate summary report
- node tests/test-runner.js --report-html: Generate HTML report
- node tests/test-runner.js --profile: Run with performance profiling

### Live Demonstration
- node demo/run-live-tests.js: Run live API demonstration
- npm test: Execute Jest test suite
- npm test -- --verbose: Run tests with detailed output

## Usage Examples

### Basic Test Execution
const testRunner = new TestRunner();
await testRunner.runAllTests();

### Category-Specific Execution
const testRunner = new TestRunner();
await testRunner.runTestCategory('performance');

### Performance Analysis
const analyzer = new PerformanceAnalyzer();
const metrics = analyzer.measureResponseTime(apiCall);
const report = analyzer.generatePerformanceReport();

### Security Testing
const validator = new SecurityValidator();
const results = validator.validateSQLInjectionPrevention(inputs);

For complete API documentation, contact: Latorocka@gmail.com`;
                    
                    const newWindow = window.open('', '_blank');
                    if (newWindow) {
                      newWindow.document.write(`
                        <html>
                          <head>
                            <title>${project.id === 1 ? 'Selenium Framework' : 'API Test Suite'} - API Reference</title>
                            <style>
                              body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
                              h1, h2, h3, h4 { color: #2563eb; }
                              pre { background: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
                              code { background: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
                            </style>
                          </head>
                          <body>
                            <pre>${apiReferenceContent}</pre>
                          </body>
                        </html>
                      `);
                      newWindow.document.close();
                    }
                  }}
                >
                  <Code className="mr-2 h-4 w-4" />
                  View API Reference
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technologies Used */}
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