package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.interactions.Actions;
import config.ConfigManager;

import java.time.Duration;
import java.util.List;

/**
 * Abstract base class for Page Object Model implementation
 * 
 * @author Brian LaTorraca
 */
public abstract class BasePage {
    
    protected WebDriver driver;
    protected WebDriverWait wait;
    protected Actions actions;
    protected JavascriptExecutor jsExecutor;
    protected ConfigManager config;
    
    /**
     * Constructor for BasePage
     * 
     * @param driver WebDriver instance
     */
    public BasePage(WebDriver driver) {
        this.driver = driver;
        this.config = ConfigManager.getInstance();
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(config.getExplicitWait()));
        this.actions = new Actions(driver);
        this.jsExecutor = (JavascriptExecutor) driver;
    }
    
    /**
     * Click on element after waiting for it to be clickable
     * 
     * @param locator Element locator
     */
    protected void click(By locator) {
        WebElement element = wait.until(ExpectedConditions.elementToBeClickable(locator));
        scrollToElement(element);
        element.click();
    }
    
    /**
     * Enter text into field after clearing it
     * 
     * @param locator Element locator
     * @param text Text to enter
     */
    protected void sendKeys(By locator, String text) {
        WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
        element.clear();
        element.sendKeys(text);
    }
    
    /**
     * Get text content of element
     * 
     * @param locator Element locator
     * @return Element text
     */
    protected String getText(By locator) {
        WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
        return element.getText();
    }
    
    /**
     * Get attribute value of element
     * 
     * @param locator Element locator
     * @param attribute Attribute name
     * @return Attribute value
     */
    protected String getAttribute(By locator, String attribute) {
        WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
        return element.getAttribute(attribute);
    }
    
    /**
     * Check if element is displayed
     * 
     * @param locator Element locator
     * @return true if element is displayed
     */
    protected boolean isElementDisplayed(By locator) {
        try {
            return driver.findElement(locator).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Check if element is enabled
     * 
     * @param locator Element locator
     * @return true if element is enabled
     */
    protected boolean isElementEnabled(By locator) {
        try {
            return driver.findElement(locator).isEnabled();
        } catch (Exception e) {
            return false;
        }
    }
    
    /**
     * Wait for element to be visible
     * 
     * @param locator Element locator
     * @return WebElement
     */
    protected WebElement waitForElementToBeVisible(By locator) {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }
    
    /**
     * Wait for element to be invisible
     * 
     * @param locator Element locator
     */
    protected void waitForElementToBeInvisible(By locator) {
        wait.until(ExpectedConditions.invisibilityOfElementLocated(locator));
    }
    
    /**
     * Scroll element into view
     * 
     * @param locator Element locator
     */
    protected void scrollToElement(By locator) {
        WebElement element = driver.findElement(locator);
        scrollToElement(element);
    }
    
    /**
     * Scroll element into view
     * 
     * @param element WebElement
     */
    protected void scrollToElement(WebElement element) {
        jsExecutor.executeScript("arguments[0].scrollIntoView({block: 'center'});", element);
    }
    
    /**
     * Hover mouse over element
     * 
     * @param locator Element locator
     */
    protected void hoverOver(By locator) {
        WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
        actions.moveToElement(element).perform();
    }
    
    /**
     * Select option from dropdown by visible text
     * 
     * @param locator Dropdown locator
     * @param text Option text
     */
    protected void selectByText(By locator, String text) {
        WebElement dropdown = wait.until(ExpectedConditions.elementToBeClickable(locator));
        Select select = new Select(dropdown);
        select.selectByVisibleText(text);
    }
    
    /**
     * Select option from dropdown by value
     * 
     * @param locator Dropdown locator
     * @param value Option value
     */
    protected void selectByValue(By locator, String value) {
        WebElement dropdown = wait.until(ExpectedConditions.elementToBeClickable(locator));
        Select select = new Select(dropdown);
        select.selectByValue(value);
    }
    
    /**
     * Get all options from dropdown
     * 
     * @param locator Dropdown locator
     * @return List of option texts
     */
    protected List<WebElement> getDropdownOptions(By locator) {
        WebElement dropdown = wait.until(ExpectedConditions.elementToBeClickable(locator));
        Select select = new Select(dropdown);
        return select.getOptions();
    }
    
    /**
     * Execute JavaScript code
     * 
     * @param script JavaScript code
     * @param args Arguments
     * @return Script result
     */
    protected Object executeScript(String script, Object... args) {
        return jsExecutor.executeScript(script, args);
    }
    
    /**
     * Switch to frame by index
     * 
     * @param index Frame index
     */
    protected void switchToFrame(int index) {
        driver.switchTo().frame(index);
    }
    
    /**
     * Switch to frame by name or id
     * 
     * @param nameOrId Frame name or id
     */
    protected void switchToFrame(String nameOrId) {
        driver.switchTo().frame(nameOrId);
    }
    
    /**
     * Switch to frame by element
     * 
     * @param locator Frame element locator
     */
    protected void switchToFrame(By locator) {
        WebElement frame = wait.until(ExpectedConditions.presenceOfElementLocated(locator));
        driver.switchTo().frame(frame);
    }
    
    /**
     * Switch back to default content
     */
    protected void switchToDefaultContent() {
        driver.switchTo().defaultContent();
    }
    
    /**
     * Get current page title
     * 
     * @return Page title
     */
    protected String getPageTitle() {
        return driver.getTitle();
    }
    
    /**
     * Get current page URL
     * 
     * @return Page URL
     */
    protected String getCurrentUrl() {
        return driver.getCurrentUrl();
    }
    
    /**
     * Refresh the current page
     */
    protected void refreshPage() {
        driver.navigate().refresh();
    }
    
    /**
     * Navigate back in browser history
     */
    protected void navigateBack() {
        driver.navigate().back();
    }
    
    /**
     * Navigate forward in browser history
     */
    protected void navigateForward() {
        driver.navigate().forward();
    }
    
    /**
     * Wait for page to load completely
     */
    protected void waitForPageLoad() {
        wait.until(webDriver -> jsExecutor.executeScript("return document.readyState").equals("complete"));
    }
}