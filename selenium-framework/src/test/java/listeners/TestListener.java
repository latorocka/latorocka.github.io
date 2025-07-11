package listeners;

import org.testng.ITestListener;
import org.testng.ITestResult;
import utils.DriverManager;
import utils.ScreenshotUtils;

/**
 * TestNG listener for enhanced test reporting and screenshot capture
 * Author: Brian LaTorraca
 */
public class TestListener implements ITestListener {

    @Override
    public void onTestStart(ITestResult result) {
        System.out.println("Starting test: " + result.getMethod().getMethodName());
    }

    @Override
    public void onTestSuccess(ITestResult result) {
        System.out.println("Test passed: " + result.getMethod().getMethodName());
    }

    @Override
    public void onTestFailure(ITestResult result) {
        String testName = result.getMethod().getMethodName();
        System.out.println("Test failed: " + testName);
        
        // Capture screenshot on failure
        if (DriverManager.isDriverInitialized()) {
            String screenshotPath = ScreenshotUtils.takeScreenshot(DriverManager.getDriver(), testName + "_FAILED");
            System.out.println("Screenshot captured: " + screenshotPath);
            
            // Set screenshot path in test result for reporting
            System.setProperty("screenshot.path", screenshotPath);
        }
        
        // Print failure details
        Throwable throwable = result.getThrowable();
        if (throwable != null) {
            System.out.println("Failure reason: " + throwable.getMessage());
        }
    }

    @Override
    public void onTestSkipped(ITestResult result) {
        System.out.println("Test skipped: " + result.getMethod().getMethodName());
        
        // Print skip reason if available
        Throwable throwable = result.getThrowable();
        if (throwable != null) {
            System.out.println("Skip reason: " + throwable.getMessage());
        }
    }
}