import { useRoute } from "wouter";
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

  const seleniumFramework = {
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

    architecture: [
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
    ],

    codeExamples: [
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
    ]
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
            <h2 className="text-2xl font-bold mb-6">Framework Architecture</h2>
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
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Project Structure</h2>
            <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-6">
              <pre className="text-sm text-slate-300">
                <code>{`selenium-framework/
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
└── pom.xml              # Maven configuration`}</code>
              </pre>
            </div>
          </CardContent>
        </Card>

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
                  Complete installation and configuration instructions for getting the framework up and running.
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    // Create a new window/tab with the setup guide content
                    const setupContent = `# Setup Guide - Selenium Test Framework

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
                    
                    const newWindow = window.open('', '_blank');
                    if (newWindow) {
                      newWindow.document.write(`
                        <html>
                          <head>
                            <title>Selenium Framework - Setup Guide</title>
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
                  Comprehensive guide for writing, executing, and managing automated tests with the framework.
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const userGuideContent = `# User Guide - Selenium Test Framework

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
                    
                    const newWindow = window.open('', '_blank');
                    if (newWindow) {
                      newWindow.document.write(`
                        <html>
                          <head>
                            <title>Selenium Framework - User Guide</title>
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
                  Detailed technical documentation covering framework design, patterns, and implementation details.
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const architectureContent = `# Architecture Documentation - Selenium Test Framework

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
                    
                    const newWindow = window.open('', '_blank');
                    if (newWindow) {
                      newWindow.document.write(`
                        <html>
                          <head>
                            <title>Selenium Framework - Architecture</title>
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
                  Complete API documentation with class references, method signatures, and usage examples.
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const apiReferenceContent = `# API Reference - Selenium Test Framework

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

For complete API documentation, contact: Latorocka@gmail.com`;
                    
                    const newWindow = window.open('', '_blank');
                    if (newWindow) {
                      newWindow.document.write(`
                        <html>
                          <head>
                            <title>Selenium Framework - API Reference</title>
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