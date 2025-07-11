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

  const getApiReferenceContent = (projectId: number) => {
    if (projectId === 1) {
      // Selenium Framework API Reference
      return `# Selenium Test Framework - API Reference & Code Examples

## Core Framework APIs

### WebDriver Management
\`\`\`java
// DriverManager.java
public class DriverManager {
    private static ThreadLocal<WebDriver> driver = new ThreadLocal<>();
    
    public static void setDriver(String browserName) {
        switch (browserName.toLowerCase()) {
            case "chrome":
                driver.set(new ChromeDriver());
                break;
            case "firefox":
                driver.set(new FirefoxDriver());
                break;
            default:
                throw new IllegalArgumentException("Browser not supported: " + browserName);
        }
    }
    
    public static WebDriver getDriver() {
        return driver.get();
    }
    
    public static void quitDriver() {
        if (driver.get() != null) {
            driver.get().quit();
            driver.remove();
        }
    }
}
\`\`\`

### Base Page Object
\`\`\`java
// BasePage.java
public abstract class BasePage {
    protected WebDriver driver;
    protected WebDriverWait wait;
    
    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(30));
        PageFactory.initElements(driver, this);
    }
    
    protected void clickElement(WebElement element) {
        wait.until(ExpectedConditions.elementToBeClickable(element));
        element.click();
    }
    
    protected void sendKeys(WebElement element, String text) {
        wait.until(ExpectedConditions.visibilityOf(element));
        element.clear();
        element.sendKeys(text);
    }
    
    protected String getText(WebElement element) {
        wait.until(ExpectedConditions.visibilityOf(element));
        return element.getText();
    }
    
    protected boolean isElementDisplayed(WebElement element) {
        try {
            return element.isDisplayed();
        } catch (NoSuchElementException e) {
            return false;
        }
    }
}
\`\`\`

### Test Base Class
\`\`\`java
// BaseTest.java
@Listeners({TestListener.class})
public class BaseTest {
    protected WebDriver driver;
    
    @BeforeMethod
    @Parameters({"browser"})
    public void setUp(@Optional("chrome") String browser) {
        DriverManager.setDriver(browser);
        driver = DriverManager.getDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
    }
    
    @AfterMethod
    public void tearDown() {
        DriverManager.quitDriver();
    }
    
    protected void navigateTo(String url) {
        driver.get(ConfigReader.getProperty("base.url") + url);
    }
}
\`\`\`

### Configuration Management
\`\`\`java
// ConfigReader.java
public class ConfigReader {
    private static Properties properties;
    
    static {
        try {
            properties = new Properties();
            FileInputStream file = new FileInputStream("src/test/resources/config.properties");
            properties.load(file);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    public static String getProperty(String key) {
        return properties.getProperty(key);
    }
    
    public static String getBrowser() {
        return getProperty("browser");
    }
    
    public static String getBaseUrl() {
        return getProperty("base.url");
    }
}
\`\`\`

### Wait Utilities
\`\`\`java
// WaitUtils.java
public class WaitUtils {
    private WebDriver driver;
    private WebDriverWait wait;
    
    public WaitUtils(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(30));
    }
    
    public WebElement waitForElement(By locator) {
        return wait.until(ExpectedConditions.presenceOfElementLocated(locator));
    }
    
    public WebElement waitForClickableElement(By locator) {
        return wait.until(ExpectedConditions.elementToBeClickable(locator));
    }
    
    public boolean waitForTextToBePresentInElement(WebElement element, String text) {
        return wait.until(ExpectedConditions.textToBePresentInElement(element, text));
    }
    
    public void waitForPageLoad() {
        wait.until(driver -> ((JavascriptExecutor) driver)
            .executeScript("return document.readyState").equals("complete"));
    }
}
\`\`\`

### Data Provider Utilities
\`\`\`java
// ExcelUtils.java
public class ExcelUtils {
    private static Workbook workbook;
    private static Sheet sheet;
    
    public static Object[][] getTestData(String fileName, String sheetName) {
        try {
            FileInputStream file = new FileInputStream("test-data/" + fileName + ".xlsx");
            workbook = new XSSFWorkbook(file);
            sheet = workbook.getSheet(sheetName);
            
            int rowCount = sheet.getLastRowNum();
            int colCount = sheet.getRow(0).getLastCellNum();
            
            Object[][] data = new Object[rowCount][colCount];
            
            for (int i = 1; i <= rowCount; i++) {
                for (int j = 0; j < colCount; j++) {
                    data[i-1][j] = sheet.getRow(i).getCell(j).toString();
                }
            }
            
            return data;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
\`\`\`

### Screenshot Utilities
\`\`\`java
// ScreenshotUtils.java
public class ScreenshotUtils {
    public static String captureScreenshot(String testName) {
        TakesScreenshot screenshot = (TakesScreenshot) DriverManager.getDriver();
        byte[] sourceFile = screenshot.getScreenshotAs(OutputType.BYTES);
        
        String fileName = testName + "_" + System.currentTimeMillis() + ".png";
        String filePath = "target/screenshots/" + fileName;
        
        try {
            Files.write(Paths.get(filePath), sourceFile);
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        return filePath;
    }
    
    public static void attachScreenshotToReport(String testName) {
        String screenshotPath = captureScreenshot(testName);
        ExtentTestManager.getTest().addScreenCaptureFromPath(screenshotPath);
    }
}
\`\`\`

## Example Usage

### Sample Test Implementation
\`\`\`java
public class LoginTest extends BaseTest {
    private LoginPage loginPage;
    private HomePage homePage;
    
    @BeforeMethod
    public void setUpTest() {
        loginPage = new LoginPage(driver);
        homePage = new HomePage(driver);
        navigateTo("/login");
    }
    
    @Test(dataProvider = "loginData")
    public void testValidLogin(String username, String password) {
        loginPage.enterUsername(username);
        loginPage.enterPassword(password);
        loginPage.clickLoginButton();
        
        Assert.assertTrue(homePage.isWelcomeMessageDisplayed(),
            "Welcome message should be displayed after successful login");
    }
    
    @DataProvider(name = "loginData")
    public Object[][] getLoginData() {
        return ExcelUtils.getTestData("LoginData", "Sheet1");
    }
}
\`\`\`

For complete source code and more examples, visit: ${project.githubUrl}

## GitHub Repository
View the complete implementation, additional utilities, and comprehensive test examples:

[**🔗 View Full Source Code on GitHub**](${project.githubUrl})

Contact: latorocka@gmail.com`;
    } else if (projectId === 2) {
      // API Test Suite API Reference
      return `# API Test Suite - API Reference & Code Examples

## Core Testing APIs

### API Test Base Class
\`\`\`javascript
// base/ApiTestBase.js
const request = require('supertest');
const config = require('../config/test.config');

class ApiTestBase {
  constructor(app) {
    this.app = app;
    this.request = request(app);
  }
  
  async get(endpoint, headers = {}) {
    return await this.request
      .get(endpoint)
      .set(headers)
      .expect(200);
  }
  
  async post(endpoint, data, headers = {}) {
    return await this.request
      .post(endpoint)
      .send(data)
      .set(headers)
      .expect(201);
  }
  
  async put(endpoint, data, headers = {}) {
    return await this.request
      .put(endpoint)
      .send(data)
      .set(headers)
      .expect(200);
  }
  
  async delete(endpoint, headers = {}) {
    return await this.request
      .delete(endpoint)
      .set(headers)
      .expect(204);
  }
}

module.exports = ApiTestBase;
\`\`\`

### GraphQL Testing Utilities
\`\`\`javascript
// utils/GraphQLUtils.js
class GraphQLUtils {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }
  
  async query(query, variables = {}) {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables
      })
    });
    
    return await response.json();
  }
  
  async mutation(mutation, variables = {}) {
    return await this.query(mutation, variables);
  }
  
  validateSchema(response, expectedSchema) {
    const errors = [];
    
    function validate(obj, schema, path = '') {
      for (const key in schema) {
        const currentPath = path ? \`\${path}.\${key}\` : key;
        
        if (!(key in obj)) {
          errors.push(\`Missing field: \${currentPath}\`);
          continue;
        }
        
        if (typeof schema[key] === 'object' && schema[key] !== null) {
          validate(obj[key], schema[key], currentPath);
        } else if (typeof obj[key] !== schema[key]) {
          errors.push(\`Type mismatch at \${currentPath}: expected \${schema[key]}, got \${typeof obj[key]}\`);
        }
      }
    }
    
    validate(response, expectedSchema);
    return errors;
  }
}

module.exports = GraphQLUtils;
\`\`\`

### Performance Testing Framework
\`\`\`javascript
// performance/PerformanceTest.js
class PerformanceTest {
  constructor(endpoint, options = {}) {
    this.endpoint = endpoint;
    this.options = {
      concurrentUsers: options.concurrentUsers || 10,
      duration: options.duration || 30000, // 30 seconds
      rampUp: options.rampUp || 5000, // 5 seconds
      ...options
    };
    this.metrics = {
      requests: 0,
      responses: 0,
      errors: 0,
      responseTimes: [],
      startTime: null,
      endTime: null
    };
  }
  
  async runLoadTest() {
    this.metrics.startTime = Date.now();
    const promises = [];
    
    for (let i = 0; i < this.options.concurrentUsers; i++) {
      promises.push(this.simulateUser());
    }
    
    await Promise.all(promises);
    this.metrics.endTime = Date.now();
    
    return this.generateReport();
  }
  
  async simulateUser() {
    const endTime = Date.now() + this.options.duration;
    
    while (Date.now() < endTime) {
      try {
        const startTime = Date.now();
        this.metrics.requests++;
        
        const response = await fetch(this.endpoint);
        
        const responseTime = Date.now() - startTime;
        this.metrics.responseTimes.push(responseTime);
        this.metrics.responses++;
        
        if (!response.ok) {
          this.metrics.errors++;
        }
      } catch (error) {
        this.metrics.errors++;
      }
      
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  generateReport() {
    const totalTime = this.metrics.endTime - this.metrics.startTime;
    const avgResponseTime = this.metrics.responseTimes.reduce((a, b) => a + b, 0) / this.metrics.responseTimes.length;
    
    return {
      totalRequests: this.metrics.requests,
      successfulResponses: this.metrics.responses,
      errors: this.metrics.errors,
      errorRate: (this.metrics.errors / this.metrics.requests) * 100,
      averageResponseTime: avgResponseTime,
      requestsPerSecond: this.metrics.requests / (totalTime / 1000),
      p95ResponseTime: this.percentile(this.metrics.responseTimes, 95),
      p99ResponseTime: this.percentile(this.metrics.responseTimes, 99)
    };
  }
  
  percentile(arr, p) {
    const sorted = arr.sort((a, b) => a - b);
    const index = Math.ceil((p / 100) * sorted.length) - 1;
    return sorted[index];
  }
}

module.exports = PerformanceTest;
\`\`\`

### Security Testing Utilities
\`\`\`javascript
// security/SecurityTestUtils.js
class SecurityTestUtils {
  static sqlInjectionPayloads = [
    "'; DROP TABLE users; --",
    "' OR '1'='1",
    "'; SELECT * FROM users; --",
    "' UNION SELECT NULL, username, password FROM users; --"
  ];
  
  static xssPayloads = [
    "<script>alert('xss')</script>",
    "<img src=x onerror=alert('xss')>",
    "javascript:alert('xss')",
    "<svg onload=alert('xss')>"
  ];
  
  static async testSqlInjection(apiBase, endpoint, paramName) {
    const results = [];
    
    for (const payload of this.sqlInjectionPayloads) {
      try {
        const response = await apiBase.post(endpoint, {
          [paramName]: payload
        });
        
        results.push({
          payload,
          status: response.status,
          vulnerable: response.status === 200 && !response.body.error
        });
      } catch (error) {
        results.push({
          payload,
          status: error.status || 'ERROR',
          vulnerable: false
        });
      }
    }
    
    return results;
  }
  
  static async testXSS(apiBase, endpoint, paramName) {
    const results = [];
    
    for (const payload of this.xssPayloads) {
      try {
        const response = await apiBase.post(endpoint, {
          [paramName]: payload
        });
        
        const responseText = JSON.stringify(response.body);
        const containsPayload = responseText.includes(payload);
        
        results.push({
          payload,
          status: response.status,
          vulnerable: containsPayload && !responseText.includes('&lt;') // Not encoded
        });
      } catch (error) {
        results.push({
          payload,
          status: error.status || 'ERROR',
          vulnerable: false
        });
      }
    }
    
    return results;
  }
  
  static validateJWT(token) {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return false;
      
      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));
      
      return {
        valid: true,
        header,
        payload,
        expired: payload.exp && payload.exp < Date.now() / 1000
      };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  }
}

module.exports = SecurityTestUtils;
\`\`\`

### WebSocket Testing Framework
\`\`\`javascript
// websocket/WebSocketTest.js
const WebSocket = require('ws');

class WebSocketTest {
  constructor(url) {
    this.url = url;
    this.ws = null;
    this.messages = [];
    this.connected = false;
  }
  
  connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.url);
      
      this.ws.on('open', () => {
        this.connected = true;
        resolve();
      });
      
      this.ws.on('message', (data) => {
        this.messages.push({
          timestamp: Date.now(),
          data: JSON.parse(data)
        });
      });
      
      this.ws.on('error', reject);
    });
  }
  
  send(message) {
    if (!this.connected) {
      throw new Error('WebSocket not connected');
    }
    
    this.ws.send(JSON.stringify(message));
  }
  
  waitForMessage(timeout = 5000) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      
      const checkForMessage = () => {
        if (this.messages.length > 0) {
          resolve(this.messages.shift());
        } else if (Date.now() - startTime > timeout) {
          reject(new Error('Timeout waiting for message'));
        } else {
          setTimeout(checkForMessage, 100);
        }
      };
      
      checkForMessage();
    });
  }
  
  close() {
    if (this.ws) {
      this.ws.close();
      this.connected = false;
    }
  }
}

module.exports = WebSocketTest;
\`\`\`

## Example Usage

### Complete API Test Suite
\`\`\`javascript
const ApiTestBase = require('../base/ApiTestBase');
const PerformanceTest = require('../performance/PerformanceTest');
const SecurityTestUtils = require('../security/SecurityTestUtils');

describe('Complete API Test Suite', () => {
  let apiBase;
  
  beforeAll(() => {
    apiBase = new ApiTestBase(app);
  });
  
  describe('Functional Tests', () => {
    test('should perform CRUD operations', async () => {
      // Create
      const createResponse = await apiBase.post('/api/users', {
        name: 'John Doe',
        email: 'john@example.com'
      });
      
      expect(createResponse.body.id).toBeDefined();
      const userId = createResponse.body.id;
      
      // Read
      const getResponse = await apiBase.get(\`/api/users/\${userId}\`);
      expect(getResponse.body.name).toBe('John Doe');
      
      // Update
      const updateResponse = await apiBase.put(\`/api/users/\${userId}\`, {
        name: 'John Smith'
      });
      expect(updateResponse.body.name).toBe('John Smith');
      
      // Delete
      await apiBase.delete(\`/api/users/\${userId}\`);
    });
  });
  
  describe('Performance Tests', () => {
    test('should handle load testing', async () => {
      const perfTest = new PerformanceTest('/api/users', {
        concurrentUsers: 50,
        duration: 10000
      });
      
      const report = await perfTest.runLoadTest();
      
      expect(report.errorRate).toBeLessThan(5); // Less than 5% error rate
      expect(report.averageResponseTime).toBeLessThan(500); // Less than 500ms
    });
  });
  
  describe('Security Tests', () => {
    test('should prevent SQL injection', async () => {
      const results = await SecurityTestUtils.testSqlInjection(
        apiBase, 
        '/api/users', 
        'name'
      );
      
      const vulnerabilities = results.filter(r => r.vulnerable);
      expect(vulnerabilities).toHaveLength(0);
    });
  });
});
\`\`\`

For complete source code and more examples, visit: ${project.githubUrl}

## GitHub Repository
View the complete implementation, test runners, and live API demonstrations:

[**🔗 View Full Source Code on GitHub**](${project.githubUrl})

Contact: latorocka@gmail.com`;
    } else if (projectId === 3) {
      // Mobile Test Suite API Reference
      return `# Mobile Test Automation Suite - API Reference & Code Examples

## Core Framework APIs

### Device Management API
\`\`\`javascript
// utils/DeviceUtils.js
class DeviceUtils {
  static async getDeviceInfo() {
    const capabilities = await driver.getCapabilities();
    return {
      platform: capabilities.platformName,
      version: capabilities.platformVersion,
      deviceName: capabilities.deviceName,
      udid: capabilities.udid,
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
  
  static getPlatformSelector(androidSelector, iosSelector) {
    const platform = driver.capabilities.platformName;
    return platform === 'Android' ? androidSelector : iosSelector;
  }
}

module.exports = DeviceUtils;
\`\`\`

### Base Page Object
\`\`\`javascript
// pages/base/BasePage.js
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
  
  async swipeElement(element, direction = 'up') {
    await this.waitForElement(element);
    const { x, y, width, height } = await element.getLocation();
    
    let startX = x + width / 2;
    let startY = y + height / 2;
    let endX = startX;
    let endY = startY;
    
    switch (direction) {
      case 'up':
        endY = startY - height / 2;
        break;
      case 'down':
        endY = startY + height / 2;
        break;
      case 'left':
        endX = startX - width / 2;
        break;
      case 'right':
        endX = startX + width / 2;
        break;
    }
    
    await driver.touchPerform([
      { action: 'press', options: { x: startX, y: startY } },
      { action: 'wait', options: { ms: 500 } },
      { action: 'moveTo', options: { x: endX, y: endY } },
      { action: 'release' }
    ]);
  }
  
  async longPress(element, duration = 1000) {
    await this.waitForElement(element);
    await element.touchAction([
      { action: 'press' },
      { action: 'wait', options: { ms: duration } },
      { action: 'release' }
    ]);
  }
  
  getPlatformSelector(androidSelector, iosSelector) {
    return this.platform === 'Android' ? androidSelector : iosSelector;
  }
}

module.exports = BasePage;
\`\`\`

### Gesture Testing Framework
\`\`\`javascript
// utils/GestureUtils.js
class GestureUtils {
  static async swipe(startX, startY, endX, endY, duration = 500) {
    await driver.touchPerform([
      { action: 'press', options: { x: startX, y: startY } },
      { action: 'wait', options: { ms: duration } },
      { action: 'moveTo', options: { x: endX, y: endY } },
      { action: 'release' }
    ]);
  }
  
  static async pinchZoom(element, scale = 2.0) {
    const { x, y, width, height } = await element.getLocation();
    const centerX = x + width / 2;
    const centerY = y + height / 2;
    
    const finger1StartX = centerX - 50;
    const finger1StartY = centerY;
    const finger2StartX = centerX + 50;
    const finger2StartY = centerY;
    
    const finger1EndX = centerX - (50 * scale);
    const finger1EndY = centerY;
    const finger2EndX = centerX + (50 * scale);
    const finger2EndY = centerY;
    
    await driver.multiTouchPerform([
      [
        { action: 'press', options: { x: finger1StartX, y: finger1StartY } },
        { action: 'moveTo', options: { x: finger1EndX, y: finger1EndY } },
        { action: 'release' }
      ],
      [
        { action: 'press', options: { x: finger2StartX, y: finger2StartY } },
        { action: 'moveTo', options: { x: finger2EndX, y: finger2EndY } },
        { action: 'release' }
      ]
    ]);
  }
  
  static async multiTouchDraw(points) {
    const actions = points.map(point => [
      { action: 'press', options: { x: point.x, y: point.y } },
      { action: 'wait', options: { ms: 100 } },
      { action: 'release' }
    ]);
    
    await driver.multiTouchPerform(actions);
  }
  
  static async dragAndDrop(sourceElement, targetElement) {
    const sourceLocation = await sourceElement.getLocation();
    const targetLocation = await targetElement.getLocation();
    
    await this.swipe(
      sourceLocation.x,
      sourceLocation.y,
      targetLocation.x,
      targetLocation.y,
      1000
    );
  }
}

module.exports = GestureUtils;
\`\`\`

### Performance Testing API
\`\`\`javascript
// performance/AppPerformance.js
class AppPerformance {
  static async measureLaunchTime(bundleId) {
    const startTime = Date.now();
    await driver.activateApp(bundleId);
    
    // Wait for app to be fully loaded
    await driver.waitUntil(
      async () => {
        const state = await driver.queryAppState(bundleId);
        return state === 4; // RUNNING_IN_FOREGROUND
      },
      { timeout: 30000, timeoutMsg: 'App did not launch within 30 seconds' }
    );
    
    const launchTime = Date.now() - startTime;
    return launchTime;
  }
  
  static async getMemoryUsage(bundleId) {
    if (driver.capabilities.platformName === 'Android') {
      const memoryInfo = await driver.getPerformanceData(bundleId, 'memoryinfo', 5);
      return {
        totalPss: memoryInfo[0][0],
        nativePss: memoryInfo[0][1],
        dalvikPss: memoryInfo[0][2]
      };
    } else {
      // iOS memory monitoring
      const memoryInfo = await driver.execute('mobile: getMemoryInfo');
      return memoryInfo;
    }
  }
  
  static async getCPUUsage(bundleId) {
    if (driver.capabilities.platformName === 'Android') {
      const cpuInfo = await driver.getPerformanceData(bundleId, 'cpuinfo', 5);
      return {
        user: cpuInfo[0][0],
        kernel: cpuInfo[0][1]
      };
    } else {
      const cpuInfo = await driver.execute('mobile: getCPUInfo');
      return cpuInfo;
    }
  }
  
  static async getBatteryInfo() {
    if (driver.capabilities.platformName === 'Android') {
      const batteryInfo = await driver.getBatteryInfo();
      return batteryInfo;
    } else {
      const batteryInfo = await driver.execute('mobile: batteryInfo');
      return batteryInfo;
    }
  }
  
  static async monitorPerformance(bundleId, duration = 60000) {
    const metrics = {
      memory: [],
      cpu: [],
      battery: [],
      timestamps: []
    };
    
    const startTime = Date.now();
    const interval = 5000; // Collect metrics every 5 seconds
    
    while (Date.now() - startTime < duration) {
      const timestamp = Date.now();
      const memory = await this.getMemoryUsage(bundleId);
      const cpu = await this.getCPUUsage(bundleId);
      const battery = await this.getBatteryInfo();
      
      metrics.memory.push(memory);
      metrics.cpu.push(cpu);
      metrics.battery.push(battery);
      metrics.timestamps.push(timestamp);
      
      await new Promise(resolve => setTimeout(resolve, interval));
    }
    
    return metrics;
  }
}

module.exports = AppPerformance;
\`\`\`

### Network Management API
\`\`\`javascript
// utils/NetworkUtils.js
class NetworkUtils {
  static async setNetworkConnection(connectionType) {
    // Connection types:
    // 0: No network
    // 1: Airplane mode
    // 2: WiFi only
    // 4: Data only
    // 6: WiFi + Data
    await driver.setNetworkConnection(connectionType);
  }
  
  static async getNetworkConnection() {
    return await driver.getNetworkConnection();
  }
  
  static async simulateSlowNetwork() {
    if (driver.capabilities.platformName === 'Android') {
      await this.setNetworkConnection(2); // WiFi only
      await driver.execute('mobile: setNetworkSpeed', { netspeed: 'edge' });
    } else {
      await driver.execute('mobile: throttleNetwork', {
        downlinkKbps: 50,
        uplinkKbps: 20,
        latency: 500
      });
    }
  }
  
  static async resetNetworkConditions() {
    await this.setNetworkConnection(6); // WiFi + Data
    
    if (driver.capabilities.platformName === 'iOS') {
      await driver.execute('mobile: resetNetworkThrottle');
    }
  }
  
  static async toggleAirplaneMode() {
    await this.setNetworkConnection(1);
    await new Promise(resolve => setTimeout(resolve, 2000));
    await this.setNetworkConnection(6);
  }
}

module.exports = NetworkUtils;
\`\`\`

### Test Data Management
\`\`\`javascript
// data/TestDataManager.js
class TestDataManager {
  static getRandomUser() {
    const users = [
      { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
      { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com' },
      { firstName: 'Bob', lastName: 'Johnson', email: 'bob.johnson@example.com' }
    ];
    
    return users[Math.floor(Math.random() * users.length)];
  }
  
  static generateRandomEmail() {
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com'];
    const name = Math.random().toString(36).substring(7);
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return \`\${name}@\${domain}\`;
  }
  
  static generateRandomPhone() {
    const areaCode = Math.floor(Math.random() * 900) + 100;
    const prefix = Math.floor(Math.random() * 900) + 100;
    const number = Math.floor(Math.random() * 9000) + 1000;
    return \`(\${areaCode}) \${prefix}-\${number}\`;
  }
  
  static getCoordinate(position = 'center') {
    const screenSize = { width: 375, height: 667 }; // Default iPhone size
    
    const coordinates = {
      center: { x: screenSize.width / 2, y: screenSize.height / 2 },
      topLeft: { x: 50, y: 50 },
      topRight: { x: screenSize.width - 50, y: 50 },
      bottomLeft: { x: 50, y: screenSize.height - 50 },
      bottomRight: { x: screenSize.width - 50, y: screenSize.height - 50 }
    };
    
    return coordinates[position] || coordinates.center;
  }
  
  static async getDeviceSpecificData() {
    const deviceInfo = await DeviceUtils.getDeviceInfo();
    
    return {
      platform: deviceInfo.platform,
      testData: {
        swipeDistance: deviceInfo.platform === 'iOS' ? 100 : 150,
        tapDelay: deviceInfo.platform === 'iOS' ? 100 : 200,
        animationWait: deviceInfo.platform === 'iOS' ? 300 : 500
      }
    };
  }
}

module.exports = TestDataManager;
\`\`\`

## Example Usage

### Complete Mobile Test Suite
\`\`\`javascript
const BasePage = require('../pages/base/BasePage');
const DeviceUtils = require('../utils/DeviceUtils');
const GestureUtils = require('../utils/GestureUtils');
const AppPerformance = require('../performance/AppPerformance');

describe('Mobile App Test Suite', () => {
  let loginPage;
  
  beforeEach(async () => {
    loginPage = new LoginPage();
    await DeviceUtils.launchApp('com.example.app');
  });
  
  afterEach(async () => {
    await DeviceUtils.takeScreenshot(jasmine.currentSpec.fullName);
    await DeviceUtils.closeApp('com.example.app');
  });
  
  describe('Gesture Testing', () => {
    it('should handle swipe gestures', async () => {
      await GestureUtils.swipe(200, 400, 200, 100); // Swipe up
      await expect($('//android.widget.TextView[@text="Next Screen"]')).toBeDisplayed();
    });
    
    it('should handle pinch zoom', async () => {
      const imageElement = await $('//android.widget.ImageView');
      await GestureUtils.pinchZoom(imageElement, 2.0);
      
      // Verify zoom level changed
      const zoomLevel = await $('//android.widget.TextView[@resource-id="zoom-level"]').getText();
      expect(zoomLevel).toBe('200%');
    });
  });
  
  describe('Performance Testing', () => {
    it('should measure app launch time', async () => {
      const launchTime = await AppPerformance.measureLaunchTime('com.example.app');
      expect(launchTime).toBeLessThan(5000); // Less than 5 seconds
    });
    
    it('should monitor memory usage', async () => {
      const initialMemory = await AppPerformance.getMemoryUsage('com.example.app');
      
      // Perform memory-intensive operations
      await performHeavyOperations();
      
      const finalMemory = await AppPerformance.getMemoryUsage('com.example.app');
      const memoryIncrease = finalMemory.totalPss - initialMemory.totalPss;
      
      expect(memoryIncrease).toBeLessThan(50000); // Less than 50MB increase
    });
  });
  
  describe('Cross-Platform Testing', () => {
    it('should work on both Android and iOS', async () => {
      const platform = driver.capabilities.platformName;
      
      if (platform === 'Android') {
        await androidSpecificTest();
      } else {
        await iosSpecificTest();
      }
      
      // Common assertions
      await expect(successElement).toBeDisplayed();
    });
  });
});
\`\`\`

For complete source code and device setup scripts, visit: ${project.githubUrl}

## GitHub Repository
View the complete implementation, configuration files, and platform-specific utilities:

[**🔗 View Full Source Code on GitHub**](${project.githubUrl})

Contact: latorocka@gmail.com`;
    } else {
      // Cypress Framework API Reference
      return `# Cypress Test Framework - API Reference & Code Examples

## Core Custom Commands

### API Testing Commands
\`\`\`javascript
// cypress/support/commands/api.js
Cypress.Commands.add('api', (method, url, body = null, headers = {}) => {
  return cy.request({
    method,
    url: Cypress.env('API_BASE_URL') + url,
    body,
    headers: {
      'Authorization': \`Bearer \${Cypress.env('AUTH_TOKEN')}\`,
      'Content-Type': 'application/json',
      ...headers
    },
    failOnStatusCode: false
  });
});

Cypress.Commands.add('apiLogin', (username, password) => {
  return cy.api('POST', '/auth/login', { username, password })
    .then((response) => {
      expect(response.status).to.eq(200);
      Cypress.env('AUTH_TOKEN', response.body.token);
      return response;
    });
});

Cypress.Commands.add('graphql', (query, variables = {}) => {
  return cy.request({
    method: 'POST',
    url: Cypress.env('GRAPHQL_URL'),
    body: { query, variables },
    headers: { 'Content-Type': 'application/json' }
  });
});

Cypress.Commands.add('websocket', (url, message) => {
  return cy.window().then((win) => {
    return new Promise((resolve, reject) => {
      const ws = new win.WebSocket(url);
      
      ws.onopen = () => ws.send(JSON.stringify(message));
      ws.onmessage = (event) => {
        resolve(JSON.parse(event.data));
        ws.close();
      };
      ws.onerror = reject;
      
      setTimeout(() => reject(new Error('WebSocket timeout')), 5000);
    });
  });
});
\`\`\`

### UI Automation Commands
\`\`\`javascript
// cypress/support/commands/ui.js
Cypress.Commands.add('login', (email, password) => {
  cy.get('[data-cy="email-input"]').type(email);
  cy.get('[data-cy="password-input"]').type(password);
  cy.get('[data-cy="login-button"]').click();
});

Cypress.Commands.add('fillForm', (formData) => {
  Object.keys(formData).forEach(key => {
    cy.get(\`[data-cy="\${key}-input"]\`).type(formData[key]);
  });
});

Cypress.Commands.add('selectDropdown', (selector, value) => {
  cy.get(selector).click();
  cy.get(\`[data-value="\${value}"]\`).click();
});

Cypress.Commands.add('uploadFile', (selector, fileName, fileType = '') => {
  cy.get(selector).selectFile({
    contents: Cypress.Buffer.from('file contents'),
    fileName: fileName,
    mimeType: fileType
  });
});

Cypress.Commands.add('dragAndDrop', (sourceSelector, targetSelector) => {
  cy.get(sourceSelector).trigger('mousedown', { which: 1 });
  cy.get(targetSelector).trigger('mousemove').trigger('mouseup');
});

Cypress.Commands.add('scrollToElement', (selector) => {
  cy.get(selector).scrollIntoView();
});

Cypress.Commands.add('waitForLoader', () => {
  cy.get('[data-cy="loading-spinner"]').should('not.exist');
});
\`\`\`

### Performance Testing Commands
\`\`\`javascript
// cypress/support/commands/performance.js
Cypress.Commands.add('measurePageLoad', () => {
  cy.window().then((win) => {
    const performance = win.performance;
    const timing = performance.timing;
    
    const metrics = {
      domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
      loadComplete: timing.loadEventEnd - timing.navigationStart,
      firstByte: timing.responseStart - timing.navigationStart
    };
    
    cy.wrap(metrics).as('performanceMetrics');
  });
});

Cypress.Commands.add('checkCoreWebVitals', () => {
  cy.window().then((win) => {
    return new Promise((resolve) => {
      const observer = new win.PerformanceObserver((list) => {
        const entries = list.getEntries();
        const vitals = {};
        
        entries.forEach(entry => {
          if (entry.entryType === 'largest-contentful-paint') {
            vitals.LCP = entry.renderTime || entry.loadTime;
          }
          if (entry.entryType === 'first-input') {
            vitals.FID = entry.processingStart - entry.startTime;
          }
          if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
            vitals.CLS = (vitals.CLS || 0) + entry.value;
          }
        });
        
        resolve(vitals);
      });
      
      observer.observe({ 
        entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] 
      });
      
      // Fallback timeout
      setTimeout(() => resolve({}), 5000);
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

Cypress.Commands.add('measureResourceLoading', () => {
  cy.window().then((win) => {
    const resources = win.performance.getEntriesByType('resource');
    const analysis = {
      totalResources: resources.length,
      totalSize: 0,
      loadTimes: resources.map(r => r.duration),
      largestResource: null,
      slowestResource: null
    };
    
    analysis.largestResource = resources.reduce((prev, current) => 
      (current.transferSize > prev.transferSize) ? current : prev
    );
    
    analysis.slowestResource = resources.reduce((prev, current) => 
      (current.duration > prev.duration) ? current : prev
    );
    
    cy.wrap(analysis).as('resourceAnalysis');
  });
});
\`\`\`

### Accessibility Testing Commands
\`\`\`javascript
// cypress/support/commands/accessibility.js
Cypress.Commands.add('checkA11y', (selector = null, options = {}) => {
  cy.injectAxe();
  cy.checkA11y(selector, {
    rules: {
      'color-contrast': { enabled: true },
      'keyboard-navigation': { enabled: true },
      'aria-labels': { enabled: true },
      'heading-order': { enabled: true },
      ...options.rules
    },
    tags: ['wcag2a', 'wcag2aa'],
    ...options
  });
});

Cypress.Commands.add('testKeyboardNavigation', () => {
  cy.get('body').tab();
  
  cy.get('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])')
    .each(($el) => {
      cy.wrap($el).focus().should('be.focused');
      cy.wrap($el).should('have.attr', 'tabindex').or('match', 'button, a, input, select, textarea');
    });
});

Cypress.Commands.add('testScreenReader', () => {
  cy.get('[aria-label], [aria-labelledby], [aria-describedby]')
    .should('exist')
    .each(($el) => {
      const ariaLabel = $el.attr('aria-label');
      const ariaLabelledby = $el.attr('aria-labelledby');
      const ariaDescribedby = $el.attr('aria-describedby');
      
      expect(ariaLabel || ariaLabelledby || ariaDescribedby).to.exist;
    });
  
  cy.get('img').each(($img) => {
    expect($img.attr('alt')).to.exist;
  });
});

Cypress.Commands.add('checkColorContrast', () => {
  cy.get('*').each(($el) => {
    const computedStyle = win.getComputedStyle($el[0]);
    const bgColor = computedStyle.backgroundColor;
    const textColor = computedStyle.color;
    
    if (bgColor !== 'rgba(0, 0, 0, 0)' && textColor !== 'rgba(0, 0, 0, 0)') {
      const contrast = calculateContrast(textColor, bgColor);
      expect(contrast).to.be.at.least(4.5); // WCAG AA standard
    }
  });
});
\`\`\`

### Visual Testing Commands
\`\`\`javascript
// cypress/support/commands/visual.js
Cypress.Commands.add('compareSnapshot', (name, options = {}) => {
  const defaultOptions = {
    threshold: 0.1,
    thresholdType: 'percent',
    ...options
  };
  
  cy.screenshot(name, { 
    capture: 'viewport',
    overwrite: true 
  });
  
  // Compare with baseline (implementation depends on visual testing tool)
  cy.task('compareImages', { 
    name, 
    options: defaultOptions 
  }).then((result) => {
    if (result.mismatchPercentage > defaultOptions.threshold) {
      throw new Error(\`Visual regression detected: \${result.mismatchPercentage}% difference\`);
    }
  });
});

Cypress.Commands.add('testResponsiveDesign', (breakpoints = [375, 768, 1024, 1920]) => {
  breakpoints.forEach(width => {
    cy.viewport(width, 800);
    cy.wait(500); // Allow time for responsive changes
    cy.compareSnapshot(\`responsive-\${width}px\`);
  });
});

Cypress.Commands.add('testElementPositions', (elements) => {
  elements.forEach(({ selector, expectedPosition }) => {
    cy.get(selector).then(($el) => {
      const rect = $el[0].getBoundingClientRect();
      expect(rect.top).to.be.closeTo(expectedPosition.top, 5);
      expect(rect.left).to.be.closeTo(expectedPosition.left, 5);
    });
  });
});
\`\`\`

### Security Testing Commands
\`\`\`javascript
// cypress/support/commands/security.js
Cypress.Commands.add('testXSS', (inputSelector, payloads = []) => {
  const defaultPayloads = [
    '<script>alert("xss")</script>',
    '<img src=x onerror=alert("xss")>',
    'javascript:alert("xss")',
    '<svg onload=alert("xss")>'
  ];
  
  const testPayloads = payloads.length > 0 ? payloads : defaultPayloads;
  
  testPayloads.forEach(payload => {
    cy.get(inputSelector).clear().type(payload);
    cy.get('form').submit();
    
    // Check that payload is not executed
    cy.get('body').should('not.contain', payload);
    
    // Check that payload is properly encoded
    cy.get('body').then(($body) => {
      const html = $body.html();
      expect(html).to.not.include('<script>');
      expect(html).to.not.include('javascript:');
    });
  });
});

Cypress.Commands.add('testCSRF', () => {
  cy.getCookie('csrf-token').should('exist');
  
  cy.get('form').should('have.attr', 'data-csrf')
    .or('contain', 'input[name="csrf_token"]')
    .or('contain', 'input[name="_token"]');
});

Cypress.Commands.add('testSQLInjection', (inputSelector) => {
  const sqlPayloads = [
    "'; DROP TABLE users; --",
    "' OR '1'='1",
    "'; SELECT * FROM users; --"
  ];
  
  sqlPayloads.forEach(payload => {
    cy.get(inputSelector).clear().type(payload);
    cy.get('form').submit();
    
    // Should show error or sanitize input
    cy.get('body').should('not.contain', 'SQL').and('not.contain', 'database error');
  });
});

Cypress.Commands.add('checkSecurityHeaders', () => {
  cy.request('/').then((response) => {
    expect(response.headers).to.have.property('x-frame-options');
    expect(response.headers).to.have.property('x-content-type-options');
    expect(response.headers).to.have.property('x-xss-protection');
    expect(response.headers).to.have.property('strict-transport-security');
  });
});
\`\`\`

## Test Organization Framework

### Page Object Implementation
\`\`\`javascript
// cypress/support/pages/LoginPage.js
class LoginPage {
  get emailInput() { return cy.get('[data-cy="email-input"]'); }
  get passwordInput() { return cy.get('[data-cy="password-input"]'); }
  get loginButton() { return cy.get('[data-cy="login-button"]'); }
  get errorMessage() { return cy.get('[data-cy="error-message"]'); }
  
  login(email, password) {
    this.emailInput.type(email);
    this.passwordInput.type(password);
    this.loginButton.click();
    return this;
  }
  
  verifyErrorMessage(message) {
    this.errorMessage.should('contain', message);
    return this;
  }
}

export default new LoginPage();
\`\`\`

### Test Suite Example
\`\`\`javascript
// cypress/e2e/comprehensive-test-suite.cy.js
import LoginPage from '../support/pages/LoginPage';

describe('Comprehensive Test Suite', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  
  context('API Testing', () => {
    it('should perform CRUD operations', () => {
      cy.api('POST', '/api/users', { name: 'John', email: 'john@example.com' })
        .then((response) => {
          expect(response.status).to.eq(201);
          const userId = response.body.id;
          
          cy.api('GET', \`/api/users/\${userId}\`)
            .its('status').should('eq', 200);
            
          cy.api('DELETE', \`/api/users/\${userId}\`)
            .its('status').should('eq', 204);
        });
    });
  });
  
  context('Performance Testing', () => {
    it('should meet performance thresholds', () => {
      cy.measurePageLoad();
      cy.checkCoreWebVitals().then((vitals) => {
        expect(vitals.LCP).to.be.lessThan(2500);
        expect(vitals.FID).to.be.lessThan(100);
        expect(vitals.CLS).to.be.lessThan(0.1);
      });
    });
  });
  
  context('Accessibility Testing', () => {
    it('should meet WCAG 2.1 AA standards', () => {
      cy.checkA11y();
      cy.testKeyboardNavigation();
      cy.testScreenReader();
    });
  });
  
  context('Security Testing', () => {
    it('should prevent XSS attacks', () => {
      cy.testXSS('[data-cy="comment-input"]');
      cy.testCSRF();
      cy.checkSecurityHeaders();
    });
  });
  
  context('Visual Testing', () => {
    it('should maintain visual consistency', () => {
      cy.compareSnapshot('homepage');
      cy.testResponsiveDesign();
    });
  });
});
\`\`\`

For complete source code and advanced configurations, visit: ${project.githubUrl}

## GitHub Repository
View the complete implementation, custom commands, and CI/CD configurations:

[**🔗 View Full Source Code on GitHub**](${project.githubUrl})

Contact: latorocka@gmail.com`;
    }
    
    return '';
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
    } else if (docType === 'api-reference') {
      content = getApiReferenceContent(project.id);
    }
    
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>${projectName} - ${docType.charAt(0).toUpperCase() + docType.slice(1).replace('-', ' ')} Guide</title>
            <style>
              body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                max-width: 900px; 
                margin: 0 auto; 
                padding: 30px; 
                line-height: 1.6; 
                background-color: #fafafa;
                color: #333;
              }
              h1 { color: #1e40af; border-bottom: 3px solid #3b82f6; padding-bottom: 10px; }
              h2 { color: #1e40af; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; margin-top: 30px; }
              h3 { color: #374151; margin-top: 25px; }
              pre { 
                background: #1f2937; 
                color: #f9fafb; 
                padding: 20px; 
                border-radius: 8px; 
                overflow-x: auto; 
                white-space: pre-wrap; 
                border-left: 4px solid #3b82f6;
                font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                font-size: 14px;
              }
              code { 
                background: #e5e7eb; 
                padding: 2px 6px; 
                border-radius: 4px; 
                font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
                color: #1f2937;
              }
              a { 
                color: #3b82f6; 
                text-decoration: none; 
                font-weight: 600;
              }
              a:hover { 
                text-decoration: underline; 
              }
              .github-section {
                background: #f3f4f6;
                padding: 20px;
                border-radius: 8px;
                margin-top: 30px;
                border-left: 4px solid #10b981;
              }
              ul { margin-left: 20px; }
              li { margin-bottom: 5px; }
            </style>
          </head>
          <body>
            <div style="white-space: pre-wrap;">${content}</div>
            ${docType === 'api-reference' ? `
              <div class="github-section">
                <h2>🔗 View Full Source Code</h2>
                <p>Access the complete implementation, additional examples, and project files:</p>
                <p><a href="${project.githubUrl}" target="_blank" style="font-size: 18px;">**📚 View on GitHub →**</a></p>
                <p style="margin-top: 15px; font-style: italic;">Contact: latorocka@gmail.com</p>
              </div>
            ` : ''}
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
                  onClick={() => openDocumentation('api-reference')}
                >
                  <Code className="mr-2 h-4 w-4" />
                  View Code Examples
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