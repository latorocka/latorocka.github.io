package utils;

import config.ConfigManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

/**
 * Wait utilities for enhanced element synchronization
 * Author: Brian LaTorraca
 */
public class WaitUtils {
    private static final ConfigManager config = ConfigManager.getInstance();
    private static final int DEFAULT_TIMEOUT = config.getExplicitWait();

    public static WebDriverWait getWait(WebDriver driver) {
        return new WebDriverWait(driver, Duration.ofSeconds(DEFAULT_TIMEOUT));
    }

    public static WebDriverWait getWait(WebDriver driver, int timeoutInSeconds) {
        return new WebDriverWait(driver, Duration.ofSeconds(timeoutInSeconds));
    }

    public static WebElement waitForElementToBeVisible(WebDriver driver, By locator) {
        return getWait(driver).until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    public static WebElement waitForElementToBeVisible(WebDriver driver, By locator, int timeoutInSeconds) {
        return getWait(driver, timeoutInSeconds).until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    public static WebElement waitForElementToBeClickable(WebDriver driver, By locator) {
        return getWait(driver).until(ExpectedConditions.elementToBeClickable(locator));
    }

    public static WebElement waitForElementToBeClickable(WebDriver driver, By locator, int timeoutInSeconds) {
        return getWait(driver, timeoutInSeconds).until(ExpectedConditions.elementToBeClickable(locator));
    }

    public static WebElement waitForElementToBeClickable(WebDriver driver, WebElement element) {
        return getWait(driver).until(ExpectedConditions.elementToBeClickable(element));
    }

    public static boolean waitForElementToBeInvisible(WebDriver driver, By locator) {
        return getWait(driver).until(ExpectedConditions.invisibilityOfElementLocated(locator));
    }

    public static boolean waitForElementToBeInvisible(WebDriver driver, By locator, int timeoutInSeconds) {
        return getWait(driver, timeoutInSeconds).until(ExpectedConditions.invisibilityOfElementLocated(locator));
    }

    public static WebElement waitForElementPresence(WebDriver driver, By locator) {
        return getWait(driver).until(ExpectedConditions.presenceOfElementLocated(locator));
    }

    public static List<WebElement> waitForElementsPresence(WebDriver driver, By locator) {
        return getWait(driver).until(ExpectedConditions.presenceOfAllElementsLocatedBy(locator));
    }

    public static boolean waitForTextToBePresentInElement(WebDriver driver, By locator, String text) {
        return getWait(driver).until(ExpectedConditions.textToBePresentInElementLocated(locator, text));
    }

    public static boolean waitForAttributeContains(WebDriver driver, By locator, String attribute, String value) {
        return getWait(driver).until(ExpectedConditions.attributeContains(locator, attribute, value));
    }

    public static boolean waitForUrlContains(WebDriver driver, String fraction) {
        return getWait(driver).until(ExpectedConditions.urlContains(fraction));
    }

    public static boolean waitForUrlToBe(WebDriver driver, String url) {
        return getWait(driver).until(ExpectedConditions.urlToBe(url));
    }

    public static boolean waitForTitleContains(WebDriver driver, String title) {
        return getWait(driver).until(ExpectedConditions.titleContains(title));
    }

    public static boolean waitForTitleIs(WebDriver driver, String title) {
        return getWait(driver).until(ExpectedConditions.titleIs(title));
    }

    public static void waitForPageToLoad(WebDriver driver) {
        getWait(driver).until(webDriver -> 
            ((org.openqa.selenium.JavascriptExecutor) webDriver)
                .executeScript("return document.readyState").equals("complete"));
    }

    public static void waitForAjaxToComplete(WebDriver driver) {
        getWait(driver).until(webDriver -> 
            ((org.openqa.selenium.JavascriptExecutor) webDriver)
                .executeScript("return jQuery.active == 0"));
    }
}