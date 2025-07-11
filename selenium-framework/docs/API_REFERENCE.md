# API Reference - Selenium Test Framework

## Overview

This document provides detailed API reference for all classes and methods in the Selenium Test Framework. Use this as a quick reference when developing tests or extending the framework.

## Core Classes

### DriverManager

#### Class Description
Manages WebDriver instances in a thread-safe manner for parallel test execution.

#### Methods

##### `setDriver()`
```java
public static void setDriver()
```
Initializes a new WebDriver instance based on configuration settings.

**Parameters:** None  
**Returns:** void  
**Throws:** IllegalArgumentException if browser is not supported

**Example:**
```java
DriverManager.setDriver();
WebDriver driver = DriverManager.getDriver();
```

##### `getDriver()`
```java
public static WebDriver getDriver()
```
Returns the current WebDriver instance for the thread.

**Returns:** WebDriver instance  
**Throws:** IllegalStateException if driver not initialized

##### `quitDriver()`
```java
public static void quitDriver()
```
Quits the current WebDriver instance and removes it from ThreadLocal.

**Returns:** void

##### `isDriverInitialized()`
```java
public static boolean isDriverInitialized()
```
Checks if WebDriver is initialized for current thread.

**Returns:** boolean - true if driver exists, false otherwise

---

### ConfigManager

#### Class Description
Singleton class for managing application configuration properties.

#### Methods

##### `getInstance()`
```java
public static ConfigManager getInstance()
```
Returns singleton instance of ConfigManager.

**Returns:** ConfigManager instance

##### `getProperty(String key)`
```java
public String getProperty(String key)
```
Gets property value by key, checking system properties first.

**Parameters:**
- `key` (String) - Property key

**Returns:** String - Property value or null if not found

##### `getBrowser()`
```java
public String getBrowser()
```
Gets configured browser name.

**Returns:** String - Browser name (chrome, firefox, edge, safari)

##### `isHeadless()`
```java
public boolean isHeadless()
```
Checks if headless execution is enabled.

**Returns:** boolean - true if headless mode enabled

##### `getImplicitWait()`
```java
public int getImplicitWait()
```
Gets implicit wait timeout in seconds.

**Returns:** int - Timeout in seconds

##### `getExplicitWait()`
```java
public int getExplicitWait()
```
Gets explicit wait timeout in seconds.

**Returns:** int - Timeout in seconds

##### `getBaseUrl()`
```java
public String getBaseUrl()
```
Gets base URL for current environment.

**Returns:** String - Base URL

##### `getTestDataPath()`
```java
public String getTestDataPath()
```
Gets path to test data file.

**Returns:** String - File path

---

### WaitUtils

#### Class Description
Utility class providing various wait strategies for element synchronization.

#### Methods

##### `getWait(WebDriver driver)`
```java
public static WebDriverWait getWait(WebDriver driver)
```
Creates WebDriverWait with default timeout.

**Parameters:**
- `driver` (WebDriver) - WebDriver instance

**Returns:** WebDriverWait instance

##### `waitForElementToBeVisible(WebDriver driver, By locator)`
```java
public static WebElement waitForElementToBeVisible(WebDriver driver, By locator)
```
Waits for element to be visible.

**Parameters:**
- `driver` (WebDriver) - WebDriver instance
- `locator` (By) - Element locator

**Returns:** WebElement - Visible element  
**Throws:** TimeoutException if element not visible within timeout

##### `waitForElementToBeClickable(WebDriver driver, By locator)`
```java
public static WebElement waitForElementToBeClickable(WebDriver driver, By locator)
```
Waits for element to be clickable.

**Parameters:**
- `driver` (WebDriver) - WebDriver instance
- `locator` (By) - Element locator

**Returns:** WebElement - Clickable element

##### `waitForElementToBeInvisible(WebDriver driver, By locator)`
```java
public static boolean waitForElementToBeInvisible(WebDriver driver, By locator)
```
Waits for element to become invisible.

**Parameters:**
- `driver` (WebDriver) - WebDriver instance
- `locator` (By) - Element locator

**Returns:** boolean - true if element becomes invisible

##### `waitForTextToBePresentInElement(WebDriver driver, By locator, String text)`
```java
public static boolean waitForTextToBePresentInElement(WebDriver driver, By locator, String text)
```
Waits for specific text to be present in element.

**Parameters:**
- `driver` (WebDriver) - WebDriver instance
- `locator` (By) - Element locator
- `text` (String) - Expected text

**Returns:** boolean - true if text is present

##### `waitForPageToLoad(WebDriver driver)`
```java
public static void waitForPageToLoad(WebDriver driver)
```
Waits for page to fully load using JavaScript.

**Parameters:**
- `driver` (WebDriver) - WebDriver instance

**Returns:** void

---

### ScreenshotUtils

#### Class Description
Utility class for capturing screenshots during test execution.

#### Methods

##### `takeScreenshot(WebDriver driver, String testName)`
```java
public static String takeScreenshot(WebDriver driver, String testName)
```
Captures full page screenshot.

**Parameters:**
- `driver` (WebDriver) - WebDriver instance
- `testName` (String) - Test name for file naming

**Returns:** String - Path to saved screenshot  
**Throws:** RuntimeException if screenshot capture fails

##### `takeElementScreenshot(WebElement element, String testName)`
```java
public static String takeElementScreenshot(WebElement element, String testName)
```
Captures screenshot of specific element.

**Parameters:**
- `element` (WebElement) - Element to capture
- `testName` (String) - Test name for file naming

**Returns:** String - Path to saved screenshot

##### `takeScreenshotAsBase64(WebDriver driver)`
```java
public static String takeScreenshotAsBase64(WebDriver driver)
```
Captures screenshot and returns as Base64 string.

**Parameters:**
- `driver` (WebDriver) - WebDriver instance

**Returns:** String - Base64 encoded screenshot

##### `takeFailureScreenshot(WebDriver driver, String testName)`
```java
public static void takeFailureScreenshot(WebDriver driver, String testName)
```
Captures screenshot specifically for test failures.

**Parameters:**
- `driver` (WebDriver) - WebDriver instance
- `testName` (String) - Test name

**Returns:** void

---

### ExcelUtils

#### Class Description
Utility class for reading test data from Excel files.

#### Methods

##### `readExcelData(String filePath, String sheetName)`
```java
public static Object[][] readExcelData(String filePath, String sheetName)
```
Reads Excel data and returns as Object array for TestNG DataProvider.

**Parameters:**
- `filePath` (String) - Path to Excel file
- `sheetName` (String) - Sheet name to read

**Returns:** Object[][] - Test data array  
**Throws:** RuntimeException if file not found or read error

##### `readExcelDataAsList(String filePath, String sheetName)`
```java
public static List<Map<String, String>> readExcelDataAsList(String filePath, String sheetName)
```
Reads Excel data and returns as List of Maps.

**Parameters:**
- `filePath` (String) - Path to Excel file
- `sheetName` (String) - Sheet name to read

**Returns:** List<Map<String, String>> - Test data list

##### `getRowCount(String filePath, String sheetName)`
```java
public static int getRowCount(String filePath, String sheetName)
```
Gets total number of rows in Excel sheet.

**Parameters:**
- `filePath` (String) - Path to Excel file
- `sheetName` (String) - Sheet name

**Returns:** int - Row count

##### `getColumnCount(String filePath, String sheetName)`
```java
public static int getColumnCount(String filePath, String sheetName)
```
Gets total number of columns in Excel sheet.

**Parameters:**
- `filePath` (String) - Path to Excel file
- `sheetName` (String) - Sheet name

**Returns:** int - Column count

---

### BasePage

#### Class Description
Abstract base class providing common page interaction methods.

#### Constructor
```java
public BasePage(WebDriver driver)
```
Initializes page object with WebDriver instance.

**Parameters:**
- `driver` (WebDriver) - WebDriver instance

#### Methods

##### `click(By locator)`
```java
protected void click(By locator)
```
Clicks element after waiting for it to be clickable.

**Parameters:**
- `locator` (By) - Element locator

##### `sendKeys(By locator, String text)`
```java
protected void sendKeys(By locator, String text)
```
Clears field and enters text after waiting for element.

**Parameters:**
- `locator` (By) - Element locator
- `text` (String) - Text to enter

##### `getText(By locator)`
```java
protected String getText(By locator)
```
Gets text content of element after waiting for visibility.

**Parameters:**
- `locator` (By) - Element locator

**Returns:** String - Element text

##### `getAttribute(By locator, String attributeName)`
```java
protected String getAttribute(By locator, String attributeName)
```
Gets attribute value of element.

**Parameters:**
- `locator` (By) - Element locator
- `attributeName` (String) - Attribute name

**Returns:** String - Attribute value

##### `isElementDisplayed(By locator)`
```java
protected boolean isElementDisplayed(By locator)
```
Checks if element is displayed.

**Parameters:**
- `locator` (By) - Element locator

**Returns:** boolean - true if element is displayed

##### `scrollToElement(By locator)`
```java
protected void scrollToElement(By locator)
```
Scrolls element into view using JavaScript.

**Parameters:**
- `locator` (By) - Element locator

##### `hoverOver(By locator)`
```java
protected void hoverOver(By locator)
```
Hovers mouse over element.

**Parameters:**
- `locator` (By) - Element locator

##### `doubleClick(By locator)`
```java
protected void doubleClick(By locator)
```
Double-clicks element.

**Parameters:**
- `locator` (By) - Element locator

##### `rightClick(By locator)`
```java
protected void rightClick(By locator)
```
Right-clicks element (context menu).

**Parameters:**
- `locator` (By) - Element locator

##### `dragAndDrop(By sourceLocator, By targetLocator)`
```java
protected void dragAndDrop(By sourceLocator, By targetLocator)
```
Drags element from source to target location.

**Parameters:**
- `sourceLocator` (By) - Source element locator
- `targetLocator` (By) - Target element locator

##### `getCurrentUrl()`
```java
protected String getCurrentUrl()
```
Gets current page URL.

**Returns:** String - Current URL

##### `getPageTitle()`
```java
protected String getPageTitle()
```
Gets current page title.

**Returns:** String - Page title

##### `refreshPage()`
```java
protected void refreshPage()
```
Refreshes current page.

##### `navigateBack()`
```java
protected void navigateBack()
```
Navigates to previous page.

##### `navigateForward()`
```java
protected void navigateForward()
```
Navigates to next page in history.

---

### BaseTest

#### Class Description
Base test class providing common test setup and teardown functionality.

#### Methods

##### `suiteSetup()`
```java
@BeforeSuite(alwaysRun = true)
public void suiteSetup()
```
Executes before entire test suite. Initializes configuration.

##### `testSetup(Method method)`
```java
@BeforeMethod(alwaysRun = true)
public void testSetup(Method method)
```
Executes before each test method. Initializes driver and navigates to base URL.

**Parameters:**
- `method` (Method) - Test method being executed

##### `testTeardown(ITestResult result)`
```java
@AfterMethod(alwaysRun = true)
public void testTeardown(ITestResult result)
```
Executes after each test method. Captures screenshots on failure and quits driver.

**Parameters:**
- `result` (ITestResult) - Test execution result

##### `suiteTeardown()`
```java
@AfterSuite(alwaysRun = true)
public void suiteTeardown()
```
Executes after entire test suite completion.

##### `navigateToUrl(String url)`
```java
protected void navigateToUrl(String url)
```
Navigates to specified URL.

**Parameters:**
- `url` (String) - Target URL

##### `takeScreenshot(String testName)`
```java
protected void takeScreenshot(String testName)
```
Manually captures screenshot during test.

**Parameters:**
- `testName` (String) - Test name for file naming

---

## Usage Examples

### Basic Test Structure
```java
public class ExampleTest extends BaseTest {
    
    @Test
    public void testExample() {
        // Page object instantiation
        LoginPage loginPage = new LoginPage(DriverManager.getDriver());
        
        // Page interactions
        loginPage.enterUsername("testuser");
        loginPage.enterPassword("password");
        loginPage.clickLogin();
        
        // Verifications
        HomePage homePage = new HomePage(DriverManager.getDriver());
        Assert.assertTrue(homePage.isWelcomeMessageDisplayed());
    }
}
```

### Data-Driven Test Example
```java
@Test(dataProvider = "testData")
public void testWithData(Map<String, String> data) {
    String username = data.get("username");
    String password = data.get("password");
    String expectedResult = data.get("expectedResult");
    
    // Test implementation using data
}

@DataProvider(name = "testData")
public Object[][] getTestData() {
    return ExcelUtils.readExcelData("test-data/login.xlsx", "TestData");
}
```

### Page Object Example
```java
public class LoginPage extends BasePage {
    
    @FindBy(id = "username")
    private WebElement usernameField;
    
    @FindBy(id = "password")
    private WebElement passwordField;
    
    @FindBy(css = ".login-btn")
    private WebElement loginButton;
    
    public LoginPage(WebDriver driver) {
        super(driver);
    }
    
    public void enterUsername(String username) {
        sendKeys(usernameField, username);
    }
    
    public void enterPassword(String password) {
        sendKeys(passwordField, password);
    }
    
    public void clickLogin() {
        click(loginButton);
    }
    
    public void login(String username, String password) {
        enterUsername(username);
        enterPassword(password);
        clickLogin();
    }
}
```

This API reference provides comprehensive documentation for all framework components. For implementation examples and best practices, refer to the [User Guide](USER_GUIDE.md).

**Author:** Brian LaTorraca  
**Email:** Latorocka@gmail.com  
**Location:** Long Beach, CA