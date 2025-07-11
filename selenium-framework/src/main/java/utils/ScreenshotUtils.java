package utils;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Screenshot utilities for test evidence and debugging
 * Author: Brian LaTorraca
 */
public class ScreenshotUtils {
    private static final String SCREENSHOT_DIR = "test-output/screenshots/";
    private static final String DATE_FORMAT = "yyyy-MM-dd_HH-mm-ss";

    static {
        // Create screenshot directory if it doesn't exist
        new File(SCREENSHOT_DIR).mkdirs();
    }

    public static String takeScreenshot(WebDriver driver, String testName) {
        try {
            TakesScreenshot takesScreenshot = (TakesScreenshot) driver;
            File sourceFile = takesScreenshot.getScreenshotAs(OutputType.FILE);
            
            String timestamp = new SimpleDateFormat(DATE_FORMAT).format(new Date());
            String fileName = testName + "_" + timestamp + ".png";
            String filePath = SCREENSHOT_DIR + fileName;
            
            File destFile = new File(filePath);
            FileUtils.copyFile(sourceFile, destFile);
            
            return filePath;
        } catch (IOException e) {
            throw new RuntimeException("Failed to take screenshot: " + e.getMessage(), e);
        }
    }

    public static String takeElementScreenshot(WebElement element, String testName) {
        try {
            File sourceFile = element.getScreenshotAs(OutputType.FILE);
            
            String timestamp = new SimpleDateFormat(DATE_FORMAT).format(new Date());
            String fileName = testName + "_element_" + timestamp + ".png";
            String filePath = SCREENSHOT_DIR + fileName;
            
            File destFile = new File(filePath);
            FileUtils.copyFile(sourceFile, destFile);
            
            return filePath;
        } catch (IOException e) {
            throw new RuntimeException("Failed to take element screenshot: " + e.getMessage(), e);
        }
    }

    public static String takeScreenshotAsBase64(WebDriver driver) {
        TakesScreenshot takesScreenshot = (TakesScreenshot) driver;
        return takesScreenshot.getScreenshotAs(OutputType.BASE64);
    }

    public static void takeFailureScreenshot(WebDriver driver, String testName) {
        String screenshotPath = takeScreenshot(driver, testName + "_FAILED");
        System.out.println("Failure screenshot saved: " + screenshotPath);
    }
}