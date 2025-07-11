# Selenium Test Framework - User Guide

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
- Browser drivers (automatically managed by WebDriverManager)

### Quick Start
1. Clone the repository
2. Import as Maven project in your IDE
3. Run `mvn clean test` to execute all tests
4. View reports in `target/extent-reports/`

## Project Structure

```
selenium-framework/
├── src/
│   ├── main/
│   │   └── java/
│   │       ├── pages/          # Page Object classes
│   │       ├── utils/          # Utility classes
│   │       └── config/         # Configuration management
│   └── test/
│       ├── java/
│       │   ├── tests/          # Test classes
│       │   └── listeners/      # TestNG listeners
│       └── resources/
│           ├── testng.xml      # Test suites
│           └── config.properties
├── test-data/                  # Excel test data files
├── screenshots/                # Test failure screenshots
└── target/
    └── extent-reports/         # Test reports
```

## Writing Tests

### Basic Test Structure
```java
@Test(description = "Login with valid credentials")
public void testValidLogin() {
    // Navigate to login page
    loginPage.navigateToLogin();
    
    // Perform login
    loginPage.enterCredentials("user@example.com", "password123");
    loginPage.clickLoginButton();
    
    // Verify successful login
    Assert.assertTrue(dashboardPage.isDisplayed());
}
```

### Using Page Objects
```java
public class LoginPage extends BasePage {
    @FindBy(id = "email")
    private WebElement emailField;
    
    @FindBy(id = "password")
    private WebElement passwordField;
    
    @FindBy(css = ".login-button")
    private WebElement loginButton;
    
    public void enterCredentials(String email, String password) {
        sendKeys(emailField, email);
        sendKeys(passwordField, password);
    }
    
    public void clickLoginButton() {
        click(loginButton);
    }
}
```

### Data-Driven Tests
```java
@Test(dataProvider = "loginData")
public void testLoginWithMultipleUsers(String email, String password, String expectedResult) {
    loginPage.enterCredentials(email, password);
    loginPage.clickLoginButton();
    
    if (expectedResult.equals("success")) {
        Assert.assertTrue(dashboardPage.isDisplayed());
    } else {
        Assert.assertTrue(loginPage.isErrorDisplayed());
    }
}

@DataProvider(name = "loginData")
public Object[][] getLoginData() {
    return ExcelUtils.getTestData("test-data/users.xlsx", "LoginData");
}
```

## Running Tests

### Command Line Execution
```bash
# Run all tests
mvn clean test

# Run specific test suite
mvn clean test -DsuiteXmlFile=src/test/resources/smoke-tests.xml

# Run tests in parallel
mvn clean test -DsuiteXmlFile=src/test/resources/parallel-tests.xml

# Run with specific browser
mvn clean test -Dbrowser=firefox

# Run with custom environment
mvn clean test -Denvironment=staging
```

### IDE Execution
1. Right-click on test class/method
2. Select "Run as TestNG Test"
3. View results in TestNG results tab

### Test Suites
#### Smoke Tests
```xml
<suite name="Smoke Tests" parallel="methods" thread-count="3">
    <test name="Critical Path">
        <classes>
            <class name="tests.LoginTest"/>
            <class name="tests.DashboardTest"/>
        </classes>
    </test>
</suite>
```

#### Regression Tests
```xml
<suite name="Regression Tests" parallel="classes" thread-count="5">
    <test name="Full Regression">
        <packages>
            <package name="tests.*"/>
        </packages>
    </test>
</suite>
```

## Configuration

### Browser Configuration
```properties
# config.properties
browser=chrome
headless=false
implicit.wait=10
explicit.wait=20
page.load.timeout=30
```

### Environment Configuration
```properties
# Environment URLs
dev.url=https://dev.example.com
staging.url=https://staging.example.com
prod.url=https://prod.example.com

# Database connections
dev.db.url=jdbc:mysql://dev-db:3306/testdb
staging.db.url=jdbc:mysql://staging-db:3306/testdb
```

### Dynamic Configuration
```java
public class ConfigManager {
    private static Properties config = loadProperties();
    
    public static String getBrowser() {
        return System.getProperty("browser", config.getProperty("browser"));
    }
    
    public static String getEnvironmentUrl() {
        String env = System.getProperty("environment", "dev");
        return config.getProperty(env + ".url");
    }
}
```

## Page Object Model

### Base Page Class
```java
public abstract class BasePage {
    protected WebDriver driver;
    protected WebDriverWait wait;
    
    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(20));
        PageFactory.initElements(driver, this);
    }
    
    protected void click(WebElement element) {
        wait.until(ExpectedConditions.elementToBeClickable(element)).click();
    }
    
    protected void sendKeys(WebElement element, String text) {
        wait.until(ExpectedConditions.visibilityOf(element));
        element.clear();
        element.sendKeys(text);
    }
    
    protected boolean isDisplayed(WebElement element) {
        try {
            return wait.until(ExpectedConditions.visibilityOf(element)).isDisplayed();
        } catch (TimeoutException e) {
            return false;
        }
    }
}
```

### Page-Specific Implementation
```java
public class ProductPage extends BasePage {
    @FindBy(css = ".product-grid .product-card")
    private List<WebElement> productCards;
    
    @FindBy(id = "search-input")
    private WebElement searchInput;
    
    @FindBy(css = ".filter-dropdown")
    private WebElement filterDropdown;
    
    public void searchProduct(String productName) {
        sendKeys(searchInput, productName);
        searchInput.sendKeys(Keys.ENTER);
    }
    
    public void selectFilter(String filterValue) {
        Select dropdown = new Select(filterDropdown);
        dropdown.selectByVisibleText(filterValue);
    }
    
    public int getProductCount() {
        wait.until(ExpectedConditions.visibilityOfAllElements(productCards));
        return productCards.size();
    }
}
```

## Data-Driven Testing

### Excel Data Management
```java
public class ExcelUtils {
    public static Object[][] getTestData(String filePath, String sheetName) {
        try {
            Workbook workbook = WorkbookFactory.create(new File(filePath));
            Sheet sheet = workbook.getSheet(sheetName);
            
            int rowCount = sheet.getLastRowNum();
            int colCount = sheet.getRow(0).getLastCellNum();
            
            Object[][] data = new Object[rowCount][colCount];
            
            for (int i = 1; i <= rowCount; i++) {
                for (int j = 0; j < colCount; j++) {
                    data[i-1][j] = getCellValue(sheet.getRow(i).getCell(j));
                }
            }
            return data;
        } catch (Exception e) {
            throw new RuntimeException("Failed to read Excel file: " + e.getMessage());
        }
    }
    
    private static String getCellValue(Cell cell) {
        if (cell == null) return "";
        
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                return String.valueOf(cell.getNumericCellValue());
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            default:
                return "";
        }
    }
}
```

### Test Data Organization
```
test-data/
├── users.xlsx
│   ├── LoginData (sheet)
│   ├── RegistrationData (sheet)
│   └── ProfileData (sheet)
├── products.xlsx
│   ├── SearchData (sheet)
│   └── FilterData (sheet)
└── orders.xlsx
    ├── CheckoutData (sheet)
    └── PaymentData (sheet)
```

## Reporting

### Extent Reports Configuration
```java
public class ExtentManager {
    private static ExtentReports extent;
    private static ExtentTest test;
    
    public static void initReports() {
        ExtentSparkReporter sparkReporter = new ExtentSparkReporter("target/extent-reports/index.html");
        sparkReporter.config().setDocumentTitle("Test Automation Report");
        sparkReporter.config().setReportName("Selenium Test Results");
        
        extent = new ExtentReports();
        extent.attachReporter(sparkReporter);
        extent.setSystemInfo("Browser", ConfigManager.getBrowser());
        extent.setSystemInfo("Environment", ConfigManager.getEnvironment());
    }
    
    public static void createTest(String testName, String description) {
        test = extent.createTest(testName, description);
    }
    
    public static void logPass(String message) {
        test.log(Status.PASS, message);
    }
    
    public static void logFail(String message) {
        test.log(Status.FAIL, message);
        attachScreenshot();
    }
    
    private static void attachScreenshot() {
        String screenshotPath = ScreenshotUtils.captureScreenshot();
        test.addScreenCaptureFromPath(screenshotPath);
    }
}
```

### Custom Test Listener
```java
public class TestListener implements ITestListener {
    @Override
    public void onTestStart(ITestResult result) {
        String testName = result.getMethod().getMethodName();
        String description = result.getMethod().getDescription();
        ExtentManager.createTest(testName, description);
    }
    
    @Override
    public void onTestSuccess(ITestResult result) {
        ExtentManager.logPass("Test passed successfully");
    }
    
    @Override
    public void onTestFailure(ITestResult result) {
        ExtentManager.logFail("Test failed: " + result.getThrowable().getMessage());
    }
    
    @Override
    public void onFinish(ITestContext context) {
        ExtentManager.flushReports();
    }
}
```

## Best Practices

### Wait Strategies
```java
// Explicit waits (recommended)
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));
wait.until(ExpectedConditions.elementToBeClickable(button));

// Fluent waits for custom conditions
Wait<WebDriver> fluentWait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(30))
    .pollingEvery(Duration.ofSeconds(2))
    .ignoring(NoSuchElementException.class);

fluentWait.until(driver -> element.isDisplayed());
```

### Exception Handling
```java
public void clickElement(WebElement element) {
    try {
        wait.until(ExpectedConditions.elementToBeClickable(element)).click();
        ExtentManager.logPass("Successfully clicked element");
    } catch (TimeoutException e) {
        ExtentManager.logFail("Element not clickable: " + e.getMessage());
        throw new RuntimeException("Failed to click element", e);
    } catch (WebDriverException e) {
        ExtentManager.logFail("WebDriver error: " + e.getMessage());
        throw e;
    }
}
```

### Test Independence
```java
@BeforeMethod
public void setUp() {
    driver = WebDriverFactory.createDriver();
    driver.get(ConfigManager.getBaseUrl());
}

@AfterMethod
public void tearDown() {
    if (driver != null) {
        driver.quit();
    }
}
```

### Assertion Best Practices
```java
// Use descriptive assertions
Assert.assertTrue(loginPage.isDisplayed(), "Login page should be displayed");
Assert.assertEquals(dashboardPage.getWelcomeMessage(), "Welcome, John!", 
    "Welcome message should display user name");

// Soft assertions for multiple validations
SoftAssert softAssert = new SoftAssert();
softAssert.assertTrue(header.isDisplayed(), "Header should be visible");
softAssert.assertTrue(footer.isDisplayed(), "Footer should be visible");
softAssert.assertAll(); // This will report all failures
```

## Troubleshooting

### Common Issues and Solutions

#### WebDriver Issues
```
Issue: WebDriverException - driver executable not found
Solution: WebDriverManager automatically handles this, ensure internet connection
```

#### Element Not Found
```
Issue: NoSuchElementException
Solutions:
1. Check element locator accuracy
2. Add appropriate waits
3. Verify element is in current frame/window
4. Check if element is dynamically loaded
```

#### Stale Element Reference
```java
// Problem: Element reference becomes stale
WebElement element = driver.findElement(By.id("dynamic-element"));
// Page refreshes or DOM changes
element.click(); // Throws StaleElementReferenceException

// Solution: Re-find the element
public void clickElementSafely(By locator) {
    try {
        driver.findElement(locator).click();
    } catch (StaleElementReferenceException e) {
        driver.findElement(locator).click();
    }
}
```

#### Parallel Execution Issues
```java
// Problem: WebDriver instances interfering with each other
// Solution: Use ThreadLocal for driver management
public class DriverManager {
    private static ThreadLocal<WebDriver> driverThreadLocal = new ThreadLocal<>();
    
    public static void setDriver(WebDriver driver) {
        driverThreadLocal.set(driver);
    }
    
    public static WebDriver getDriver() {
        return driverThreadLocal.get();
    }
    
    public static void quitDriver() {
        WebDriver driver = driverThreadLocal.get();
        if (driver != null) {
            driver.quit();
            driverThreadLocal.remove();
        }
    }
}
```

### Debug Mode
```java
// Enable debug logging
System.setProperty("webdriver.chrome.verboseLogging", "true");

// Add debug information to tests
@Test
public void debugTest() {
    System.out.println("Current URL: " + driver.getCurrentUrl());
    System.out.println("Page title: " + driver.getTitle());
    System.out.println("Window handles: " + driver.getWindowHandles().size());
}
```

### Performance Optimization
```java
// Disable images for faster loading
ChromeOptions options = new ChromeOptions();
options.addArguments("--disable-images");
options.addArguments("--disable-javascript"); // Only if JS not needed

// Set page load strategy
options.setPageLoadStrategy(PageLoadStrategy.EAGER);
```

## Support and Resources

### Documentation Links
- [Selenium WebDriver Documentation](https://selenium-python.readthedocs.io/)
- [TestNG Documentation](https://testng.org/doc/)
- [Maven Documentation](https://maven.apache.org/guides/)

### Community Support
- [Selenium User Group](https://groups.google.com/forum/#!forum/selenium-users)
- [Stack Overflow - Selenium](https://stackoverflow.com/questions/tagged/selenium)

### Framework Maintenance
- Regular dependency updates in `pom.xml`
- Browser driver version compatibility
- Test data maintenance and cleanup
- Report archive management

---

**Need Help?** Contact: latorocka@gmail.com