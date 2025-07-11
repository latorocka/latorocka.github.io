package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.PageFactory;
import utils.WaitUtils;

import java.util.List;

/**
 * Base Page class containing common page methods and utilities
 * Author: Brian LaTorraca
 */
public abstract class BasePage {
    protected WebDriver driver;
    protected WaitUtils waitUtils;
    protected Actions actions;
    protected JavascriptExecutor jsExecutor;

    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.waitUtils = new WaitUtils();
        this.actions = new Actions(driver);
        this.jsExecutor = (JavascriptExecutor) driver;
        PageFactory.initElements(driver, this);
    }

    // Basic element interactions
    protected void click(By locator) {
        WaitUtils.waitForElementToBeClickable(driver, locator).click();
    }

    protected void click(WebElement element) {
        WaitUtils.waitForElementToBeClickable(driver, element).click();
    }

    protected void sendKeys(By locator, String text) {
        WebElement element = WaitUtils.waitForElementToBeVisible(driver, locator);
        element.clear();
        element.sendKeys(text);
    }

    protected void sendKeys(WebElement element, String text) {
        WaitUtils.waitForElementToBeVisible(driver, element);
        element.clear();
        element.sendKeys(text);
    }

    protected String getText(By locator) {
        return WaitUtils.waitForElementToBeVisible(driver, locator).getText();
    }

    protected String getText(WebElement element) {
        WaitUtils.waitForElementToBeVisible(driver, element);
        return element.getText();
    }

    protected String getAttribute(By locator, String attributeName) {
        return WaitUtils.waitForElementToBeVisible(driver, locator).getAttribute(attributeName);
    }

    protected String getAttribute(WebElement element, String attributeName) {
        WaitUtils.waitForElementToBeVisible(driver, element);
        return element.getAttribute(attributeName);
    }

    protected boolean isElementDisplayed(By locator) {
        try {
            return driver.findElement(locator).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    protected boolean isElementDisplayed(WebElement element) {
        try {
            return element.isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }

    protected boolean isElementEnabled(By locator) {
        return WaitUtils.waitForElementToBeVisible(driver, locator).isEnabled();
    }

    protected boolean isElementSelected(By locator) {
        return WaitUtils.waitForElementToBeVisible(driver, locator).isSelected();
    }

    protected List<WebElement> getElements(By locator) {
        return WaitUtils.waitForElementsPresence(driver, locator);
    }

    // Advanced interactions
    protected void doubleClick(By locator) {
        WebElement element = WaitUtils.waitForElementToBeClickable(driver, locator);
        actions.doubleClick(element).perform();
    }

    protected void rightClick(By locator) {
        WebElement element = WaitUtils.waitForElementToBeClickable(driver, locator);
        actions.contextClick(element).perform();
    }

    protected void hoverOver(By locator) {
        WebElement element = WaitUtils.waitForElementToBeVisible(driver, locator);
        actions.moveToElement(element).perform();
    }

    protected void dragAndDrop(By sourceLocator, By targetLocator) {
        WebElement source = WaitUtils.waitForElementToBeVisible(driver, sourceLocator);
        WebElement target = WaitUtils.waitForElementToBeVisible(driver, targetLocator);
        actions.dragAndDrop(source, target).perform();
    }

    // JavaScript utilities
    protected void clickUsingJS(By locator) {
        WebElement element = WaitUtils.waitForElementToBeVisible(driver, locator);
        jsExecutor.executeScript("arguments[0].click();", element);
    }

    protected void clickUsingJS(WebElement element) {
        jsExecutor.executeScript("arguments[0].click();", element);
    }

    protected void scrollToElement(By locator) {
        WebElement element = WaitUtils.waitForElementToBeVisible(driver, locator);
        jsExecutor.executeScript("arguments[0].scrollIntoView(true);", element);
    }

    protected void scrollToElement(WebElement element) {
        jsExecutor.executeScript("arguments[0].scrollIntoView(true);", element);
    }

    protected void scrollToTop() {
        jsExecutor.executeScript("window.scrollTo(0, 0);");
    }

    protected void scrollToBottom() {
        jsExecutor.executeScript("window.scrollTo(0, document.body.scrollHeight);");
    }

    protected void highlightElement(By locator) {
        WebElement element = WaitUtils.waitForElementToBeVisible(driver, locator);
        jsExecutor.executeScript("arguments[0].style.border='3px solid red'", element);
    }

    protected void removeHighlight(By locator) {
        WebElement element = driver.findElement(locator);
        jsExecutor.executeScript("arguments[0].style.border=''", element);
    }

    // Navigation utilities
    protected void navigateToUrl(String url) {
        driver.navigate().to(url);
    }

    protected void refreshPage() {
        driver.navigate().refresh();
    }

    protected void navigateBack() {
        driver.navigate().back();
    }

    protected void navigateForward() {
        driver.navigate().forward();
    }

    protected String getCurrentUrl() {
        return driver.getCurrentUrl();
    }

    protected String getPageTitle() {
        return driver.getTitle();
    }

    // Wait utilities
    protected void waitForPageLoad() {
        WaitUtils.waitForPageToLoad(driver);
    }

    protected void waitForAjaxComplete() {
        WaitUtils.waitForAjaxToComplete(driver);
    }

    protected void waitForElementToDisappear(By locator) {
        WaitUtils.waitForElementToBeInvisible(driver, locator);
    }

    protected boolean waitForTextInElement(By locator, String text) {
        return WaitUtils.waitForTextToBePresentInElement(driver, locator, text);
    }

    protected boolean waitForUrlToContain(String urlFraction) {
        return WaitUtils.waitForUrlContains(driver, urlFraction);
    }
}