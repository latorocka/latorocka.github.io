package utils;

import config.ConfigManager;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Screenshot capture utilities
 * 
 * @author Brian LaTorraca
 */
public class ScreenshotUtils {
    
    private static final ConfigManager config = ConfigManager.getInstance();
    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("yyyy-MM-dd_HH-mm-ss");
    
    /**
     * Take full page screenshot
     * 
     * @param driver WebDriver instance
     * @param screenshotName Name for the screenshot file
     * @return File path of the screenshot
     */
    public static String takeScreenshot(WebDriver driver, String screenshotName) {
        try {
            TakesScreenshot takesScreenshot = (TakesScreenshot) driver;
            File sourceFile = takesScreenshot.getScreenshotAs(OutputType.FILE);
            
            String timestamp = LocalDateTime.now().format(DATE_FORMAT);
            String fileName = screenshotName + "_" + timestamp + ".png";
            String filePath = config.getScreenshotPath() + fileName;
            
            File destFile = new File(filePath);
            destFile.getParentFile().mkdirs(); // Create directories if they don't exist
            FileUtils.copyFile(sourceFile, destFile);
            
            System.out.println("Screenshot saved: " + filePath);
            return filePath;
            
        } catch (IOException e) {
            System.err.println("Failed to take screenshot: " + e.getMessage());
            return null;
        }
    }
    
    /**
     * Take screenshot of specific element
     * 
     * @param element WebElement to capture
     * @param screenshotName Name for the screenshot file
     * @return File path of the screenshot
     */
    public static String takeElementScreenshot(WebElement element, String screenshotName) {
        try {
            File sourceFile = element.getScreenshotAs(OutputType.FILE);
            
            String timestamp = LocalDateTime.now().format(DATE_FORMAT);
            String fileName = screenshotName + "_element_" + timestamp + ".png";
            String filePath = config.getScreenshotPath() + fileName;
            
            File destFile = new File(filePath);
            destFile.getParentFile().mkdirs();
            FileUtils.copyFile(sourceFile, destFile);
            
            System.out.println("Element screenshot saved: " + filePath);
            return filePath;
            
        } catch (IOException e) {
            System.err.println("Failed to take element screenshot: " + e.getMessage());
            return null;
        }
    }
    
    /**
     * Take screenshot and return as Base64 string
     * 
     * @param driver WebDriver instance
     * @return Base64 encoded screenshot
     */
    public static String takeScreenshotAsBase64(WebDriver driver) {
        try {
            TakesScreenshot takesScreenshot = (TakesScreenshot) driver;
            return takesScreenshot.getScreenshotAs(OutputType.BASE64);
        } catch (Exception e) {
            System.err.println("Failed to take Base64 screenshot: " + e.getMessage());
            return null;
        }
    }
    
    /**
     * Take screenshot specifically for test failures
     * 
     * @param driver WebDriver instance
     * @param testName Name of the failed test
     * @return File path of the screenshot
     */
    public static String takeFailureScreenshot(WebDriver driver, String testName) {
        return takeScreenshot(driver, "FAILED_" + testName);
    }
}