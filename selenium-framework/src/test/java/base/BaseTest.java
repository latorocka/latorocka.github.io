package base;

import config.ConfigManager;
import org.testng.ITestResult;
import org.testng.annotations.*;
import utils.DriverManager;
import utils.ScreenshotUtils;

import java.lang.reflect.Method;

/**
 * Base test class providing setup and teardown functionality
 * 
 * @author Brian LaTorraca
 */
public abstract class BaseTest {
    
    protected ConfigManager config;
    
    @BeforeSuite
    public void suiteSetup() {
        System.out.println("=== Test Suite Starting ===");
        config = ConfigManager.getInstance();
        
        // Create output directories
        createOutputDirectories();
        
        System.out.println("Browser: " + config.getBrowser());
        System.out.println("Environment: " + config.getEnvironment());
        System.out.println("Base URL: " + config.getBaseUrl());
        System.out.println("Headless: " + config.isHeadless());
    }
    
    @BeforeMethod
    public void testSetup(Method method) {
        System.out.println("\n--- Starting Test: " + method.getName() + " ---");
        
        // Initialize WebDriver
        DriverManager.setDriver();
        
        // Navigate to base URL if specified
        String baseUrl = config.getBaseUrl();
        if (baseUrl != null && !baseUrl.isEmpty()) {
            navigateToUrl(baseUrl);
        }
    }
    
    @AfterMethod
    public void testTeardown(ITestResult result) {
        String testName = result.getMethod().getMethodName();
        
        // Take screenshot if test failed or if configured to take on pass
        if (result.getStatus() == ITestResult.FAILURE && config.isScreenshotOnFailure()) {
            ScreenshotUtils.takeFailureScreenshot(DriverManager.getDriver(), testName);
        }
        
        // Print test result
        switch (result.getStatus()) {
            case ITestResult.SUCCESS:
                System.out.println("✓ Test PASSED: " + testName);
                break;
            case ITestResult.FAILURE:
                System.out.println("✗ Test FAILED: " + testName);
                System.out.println("Failure Reason: " + result.getThrowable().getMessage());
                break;
            case ITestResult.SKIP:
                System.out.println("⊘ Test SKIPPED: " + testName);
                break;
        }
        
        // Quit WebDriver
        DriverManager.quitDriver();
        
        System.out.println("--- Test Completed: " + testName + " ---\n");
    }
    
    @AfterSuite
    public void suiteTeardown() {
        System.out.println("=== Test Suite Completed ===");
    }
    
    /**
     * Navigate to specified URL
     * 
     * @param url Target URL
     */
    protected void navigateToUrl(String url) {
        System.out.println("Navigating to: " + url);
        DriverManager.getDriver().get(url);
    }
    
    /**
     * Take screenshot manually during test execution
     * 
     * @param screenshotName Name for the screenshot file
     */
    protected void takeScreenshot(String screenshotName) {
        ScreenshotUtils.takeScreenshot(DriverManager.getDriver(), screenshotName);
    }
    
    /**
     * Create necessary output directories
     */
    private void createOutputDirectories() {
        try {
            java.nio.file.Files.createDirectories(java.nio.file.Paths.get(config.getScreenshotPath()));
            java.nio.file.Files.createDirectories(java.nio.file.Paths.get(config.getReportPath()));
            System.out.println("Output directories created successfully");
        } catch (Exception e) {
            System.err.println("Failed to create output directories: " + e.getMessage());
        }
    }
}