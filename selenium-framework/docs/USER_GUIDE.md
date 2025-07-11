# User Guide - Selenium Test Framework

## Overview

This guide provides comprehensive instructions for using the Selenium Test Framework effectively. The framework is designed for QA engineers and developers who need to create, maintain, and execute automated web tests.

## Test Execution

### Running Tests

#### 1. Basic Test Execution
```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=LoginTest

# Run specific test method
mvn test -Dtest=LoginTest#testValidLogin
```

#### 2. Browser Configuration
```bash
# Run tests in Chrome (default)
mvn test -Dbrowser=chrome

# Run tests in Firefox
mvn test -Dbrowser=firefox

# Run tests in headless mode
mvn test -Dbrowser=chrome -Dheadless=true
```

#### 3. Environment Configuration
```bash
# Run against QA environment
mvn test -Denvironment=qa

# Run against Staging environment
mvn test -Denvironment=staging

# Run against Production environment
mvn test -Denvironment=prod
```

#### 4. Test Suite Execution
```bash
# Run smoke tests
mvn test -DsuiteXmlFile=src/test/resources/smoke-suite.xml

# Run regression tests
mvn test -DsuiteXmlFile=src/test/resources/regression-suite.xml

# Run parallel tests
mvn test -DsuiteXmlFile=src/test/resources/parallel-suite.xml
```

### Maven Profiles

The framework includes pre-configured Maven profiles for common test scenarios:

```bash
# Smoke test profile
mvn test -Psmoke

# Regression test profile
mvn test -Pregression

# Parallel execution profile
mvn test -Pparallel
```

## Writing Tests

### 1. Creating a New Page Object

```java
package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class ProductPage extends BasePage {
    
    @FindBy(id = "product-name")
    private WebElement productName;
    
    @FindBy(css = ".add-to-cart-btn")
    private WebElement addToCartButton;
    
    @FindBy(xpath = "//span[@class='price']")
    private WebElement productPrice;
    
    public ProductPage(WebDriver driver) {
        super(driver);
    }
    
    public String getProductName() {
        return getText(productName);
    }
    
    public void clickAddToCart() {
        click(addToCartButton);
    }
    
    public String getProductPrice() {
        return getText(productPrice);
    }
    
    public boolean isAddToCartButtonEnabled() {
        return productPrice.isEnabled();
    }
}
```

### 2. Creating a Test Class

```java
package tests;

import base.BaseTest;
import org.testng.Assert;
import org.testng.annotations.Test;
import pages.ProductPage;
import utils.DriverManager;

public class ProductTest extends BaseTest {
    
    @Test(priority = 1)
    public void testProductPageLoad() {
        navigateToUrl(config.getBaseUrl() + "/products/1");
        
        ProductPage productPage = new ProductPage(DriverManager.getDriver());
        
        Assert.assertNotNull(productPage.getProductName());
        Assert.assertTrue(productPage.isAddToCartButtonEnabled());
    }
    
    @Test(priority = 2)
    public void testAddToCart() {
        ProductPage productPage = new ProductPage(DriverManager.getDriver());
        
        String productName = productPage.getProductName();
        productPage.clickAddToCart();
        
        // Add assertions for cart functionality
        Assert.assertTrue(true); // Replace with actual verification
    }
}
```

### 3. Data-Driven Testing

#### Excel Data Provider
```java
@DataProvider(name = "productData")
public Object[][] getProductTestData() {
    return ExcelUtils.readExcelData("test-data/products.xlsx", "ProductData");
}

@Test(dataProvider = "productData")
public void testProductValidation(Map<String, String> testData) {
    String productId = testData.get("productId");
    String expectedName = testData.get("expectedName");
    String expectedPrice = testData.get("expectedPrice");
    
    navigateToUrl(config.getBaseUrl() + "/products/" + productId);
    
    ProductPage productPage = new ProductPage(DriverManager.getDriver());
    
    Assert.assertEquals(productPage.getProductName(), expectedName);
    Assert.assertEquals(productPage.getProductPrice(), expectedPrice);
}
```

#### Excel File Format (products.xlsx)
| productId | expectedName | expectedPrice |
|-----------|-------------|---------------|
| 1         | Laptop      | $999.00       |
| 2         | Mouse       | $29.99        |
| 3         | Keyboard    | $79.99        |

## Configuration Management

### 1. Environment Configuration
Modify `src/test/resources/config.properties`:

```properties
# Application URLs for different environments
qa.url=https://qa.yourapp.com
staging.url=https://staging.yourapp.com
prod.url=https://production.yourapp.com

# Default environment
environment=qa

# Browser settings
browser=chrome
headless=false

# Timeouts (in seconds)
implicit.wait=10
explicit.wait=20
page.load.timeout=30

# Test data paths
test.data.path=test-data/testdata.xlsx
screenshot.path=test-output/screenshots/
report.path=test-output/reports/

# Parallel execution settings
thread.count=3
data.provider.thread.count=2
```

### 2. TestNG Suite Configuration

#### Basic Suite (testng.xml)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "http://testng.org/testng-1.0.dtd">
<suite name="Test Suite" verbose="1">
    
    <listeners>
        <listener class-name="listeners.TestListener"/>
    </listeners>
    
    <parameter name="browser" value="chrome"/>
    <parameter name="environment" value="qa"/>
    
    <test name="Login Tests">
        <classes>
            <class name="tests.LoginTest"/>
        </classes>
    </test>
    
    <test name="Product Tests">
        <classes>
            <class name="tests.ProductTest"/>
        </classes>
    </test>
    
</suite>
```

#### Parallel Suite (parallel-suite.xml)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE suite SYSTEM "http://testng.org/testng-1.0.dtd">
<suite name="Parallel Suite" parallel="tests" thread-count="3">
    
    <test name="Login Tests - Thread 1">
        <classes>
            <class name="tests.LoginTest">
                <methods>
                    <include name="testValidLogin"/>
                    <include name="testInvalidLogin"/>
                </methods>
            </class>
        </classes>
    </test>
    
    <test name="Product Tests - Thread 2">
        <classes>
            <class name="tests.ProductTest"/>
        </classes>
    </test>
    
</suite>
```

## Reporting

### 1. Test Reports Location
After test execution, reports are generated in:
- `target/surefire-reports/` - TestNG HTML reports
- `test-output/screenshots/` - Failure screenshots
- `test-output/reports/` - Custom reports (if configured)

### 2. Screenshot Capture
Screenshots are automatically captured on test failures. Manual screenshot capture:

```java
@Test
public void testWithScreenshot() {
    // Test code here
    
    // Manual screenshot
    takeScreenshot("manual-screenshot");
    
    // Continue test
}
```

### 3. Viewing Reports
Open `target/surefire-reports/index.html` in a web browser to view detailed test results.

## Best Practices

### 1. Test Organization
- Group related tests in the same test class
- Use meaningful test method names
- Implement proper test priorities
- Use TestNG groups for categorization

```java
@Test(groups = {"smoke", "regression"})
public void testCriticalFeature() {
    // Test implementation
}
```

### 2. Page Object Model Guidelines
- Keep page objects focused on a single page
- Use descriptive locator strategies
- Implement wait strategies properly
- Return page objects from navigation methods

```java
public LoginPage navigateToLogin() {
    click(loginLink);
    return new LoginPage(driver);
}
```

### 3. Test Data Management
- Use external data files for test data
- Implement data providers for parameterized tests
- Keep sensitive data in environment variables
- Use meaningful test data that reflects real scenarios

### 4. Error Handling
- Implement proper exception handling
- Use soft assertions when appropriate
- Add meaningful assertion messages

```java
Assert.assertTrue(element.isDisplayed(), 
    "Element should be visible after clicking submit button");
```

## Debugging Tests

### 1. Debug Mode
Run tests with debug information:
```bash
mvn test -X -Dtest=LoginTest
```

### 2. IDE Debugging
Set breakpoints in your IDE and run tests in debug mode through TestNG configuration.

### 3. Logging
Add logging statements for debugging:
```java
System.out.println("Current URL: " + getCurrentUrl());
System.out.println("Element text: " + element.getText());
```

## Troubleshooting

### Common Issues and Solutions

#### Tests Fail Intermittently
- Increase wait times in config.properties
- Add explicit waits before interactions
- Check for JavaScript loading issues

#### Element Not Found
- Verify locator strategies
- Check if element is in an iframe
- Ensure proper wait conditions

#### Browser Launch Issues
- Update browser to latest version
- Check WebDriverManager configuration
- Try different browser

#### Performance Issues
- Reduce parallel thread count
- Increase JVM memory allocation
- Optimize test data and locators

For additional support, refer to the [Setup Guide](SETUP.md) and [Architecture Documentation](ARCHITECTURE.md).

**Author:** Brian LaTorraca  
**Email:** Latorocka@gmail.com