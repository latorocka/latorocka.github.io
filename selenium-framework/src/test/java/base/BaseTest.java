package base;

import config.ConfigManager;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeSuite;
import utils.DriverManager;
import utils.ScreenshotUtils;

import java.lang.reflect.Method;

/**
 * Base Test class providing common test setup and teardown
 * Author: Brian LaTorraca
 */
public class BaseTest {
    protected ConfigManager config;

    @BeforeSuite(alwaysRun = true)
    public void suiteSetup() {
        config = ConfigManager.getInstance();
        System.out.println("===== Test Suite Started =====");
        System.out.println("Browser: " + config.getBrowser());
        System.out.println("Environment: " + config.getBaseUrl());
        System.out.println("Headless: " + config.isHeadless());
    }

    @BeforeMethod(alwaysRun = true)
    public void testSetup(Method method) {
        System.out.println("\n===== Starting Test: " + method.getName() + " =====");
        
        // Initialize WebDriver
        DriverManager.setDriver();
        
        // Navigate to base URL
        String baseUrl = config.getBaseUrl();
        if (baseUrl != null && !baseUrl.isEmpty()) {
            DriverManager.getDriver().get(baseUrl);
        }
        
        System.out.println("Driver initialized and navigated to: " + baseUrl);
    }

    @AfterMethod(alwaysRun = true)
    public void testTeardown(ITestResult result) {
        String testName = result.getMethod().getMethodName();
        
        if (result.getStatus() == ITestResult.FAILURE) {
            System.out.println("Test FAILED: " + testName);
            
            // Take screenshot on failure
            if (DriverManager.isDriverInitialized()) {
                ScreenshotUtils.takeFailureScreenshot(DriverManager.getDriver(), testName);
            }
        } else if (result.getStatus() == ITestResult.SUCCESS) {
            System.out.println("Test PASSED: " + testName);
        } else if (result.getStatus() == ITestResult.SKIP) {
            System.out.println("Test SKIPPED: " + testName);
        }
        
        // Quit driver
        DriverManager.quitDriver();
        System.out.println("===== Finished Test: " + testName + " =====\n");
    }

    @AfterSuite(alwaysRun = true)
    public void suiteTeardown() {
        System.out.println("===== Test Suite Completed =====");
    }

    // Utility methods for tests
    protected void navigateToUrl(String url) {
        DriverManager.getDriver().get(url);
    }

    protected String getCurrentUrl() {
        return DriverManager.getDriver().getCurrentUrl();
    }

    protected String getPageTitle() {
        return DriverManager.getDriver().getTitle();
    }

    protected void takeScreenshot(String testName) {
        ScreenshotUtils.takeScreenshot(DriverManager.getDriver(), testName);
    }
}