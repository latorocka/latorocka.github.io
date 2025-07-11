package utils;

import config.ConfigManager;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.edge.EdgeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.safari.SafariDriver;

import java.time.Duration;

/**
 * Thread-safe WebDriver management for parallel test execution
 * 
 * @author Brian LaTorraca
 */
public class DriverManager {
    
    private static final ThreadLocal<WebDriver> driverThreadLocal = new ThreadLocal<>();
    private static final ConfigManager config = ConfigManager.getInstance();
    
    /**
     * Private constructor to prevent instantiation
     */
    private DriverManager() {}
    
    /**
     * Initialize WebDriver based on configuration
     */
    public static void setDriver() {
        String browserName = getBrowserName().toLowerCase();
        WebDriver driver;
        
        switch (browserName) {
            case "chrome":
                driver = createChromeDriver();
                break;
            case "firefox":
                driver = createFirefoxDriver();
                break;
            case "edge":
                driver = createEdgeDriver();
                break;
            case "safari":
                driver = createSafariDriver();
                break;
            default:
                throw new IllegalArgumentException("Browser not supported: " + browserName);
        }
        
        // Configure timeouts
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(config.getImplicitWait()));
        driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(config.getPageLoadTimeout()));
        driver.manage().timeouts().scriptTimeout(Duration.ofSeconds(config.getScriptTimeout()));
        
        // Maximize window if specified
        if (config.shouldMaximize()) {
            driver.manage().window().maximize();
        }
        
        driverThreadLocal.set(driver);
    }
    
    /**
     * Get the current WebDriver instance for this thread
     * 
     * @return WebDriver instance
     * @throws IllegalStateException if driver not initialized
     */
    public static WebDriver getDriver() {
        WebDriver driver = driverThreadLocal.get();
        if (driver == null) {
            throw new IllegalStateException("WebDriver not initialized. Call setDriver() first.");
        }
        return driver;
    }
    
    /**
     * Quit the current WebDriver instance and remove from ThreadLocal
     */
    public static void quitDriver() {
        WebDriver driver = driverThreadLocal.get();
        if (driver != null) {
            driver.quit();
            driverThreadLocal.remove();
        }
    }
    
    /**
     * Check if WebDriver is initialized for current thread
     * 
     * @return true if driver exists, false otherwise
     */
    public static boolean isDriverInitialized() {
        return driverThreadLocal.get() != null;
    }
    
    /**
     * Create Chrome WebDriver with options
     */
    private static WebDriver createChromeDriver() {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        
        if (config.isHeadless()) {
            options.addArguments("--headless=new");
        }
        
        // Add Chrome options from config
        String chromeOptions = config.getProperty("chrome.options");
        if (chromeOptions != null && !chromeOptions.isEmpty()) {
            String[] optionArray = chromeOptions.split(",");
            for (String option : optionArray) {
                options.addArguments(option.trim());
            }
        }
        
        // Additional Chrome options for stability
        options.addArguments("--disable-blink-features=AutomationControlled");
        options.addArguments("--disable-extensions");
        options.addArguments("--disable-plugins");
        options.addArguments("--disable-images");
        options.addArguments("--disable-javascript");
        options.setExperimentalOption("useAutomationExtension", false);
        options.setExperimentalOption("excludeSwitches", new String[]{"enable-automation"});
        
        return new ChromeDriver(options);
    }
    
    /**
     * Create Firefox WebDriver with options
     */
    private static WebDriver createFirefoxDriver() {
        WebDriverManager.firefoxdriver().setup();
        FirefoxOptions options = new FirefoxOptions();
        
        if (config.isHeadless()) {
            options.addArguments("--headless");
        }
        
        // Add Firefox options from config
        String firefoxOptions = config.getProperty("firefox.options");
        if (firefoxOptions != null && !firefoxOptions.isEmpty()) {
            String[] optionArray = firefoxOptions.split(",");
            for (String option : optionArray) {
                options.addArguments(option.trim());
            }
        }
        
        return new FirefoxDriver(options);
    }
    
    /**
     * Create Edge WebDriver with options
     */
    private static WebDriver createEdgeDriver() {
        WebDriverManager.edgedriver().setup();
        EdgeOptions options = new EdgeOptions();
        
        if (config.isHeadless()) {
            options.addArguments("--headless=new");
        }
        
        // Add Edge options from config
        String edgeOptions = config.getProperty("edge.options");
        if (edgeOptions != null && !edgeOptions.isEmpty()) {
            String[] optionArray = edgeOptions.split(",");
            for (String option : optionArray) {
                options.addArguments(option.trim());
            }
        }
        
        return new EdgeDriver(options);
    }
    
    /**
     * Create Safari WebDriver (macOS only)
     */
    private static WebDriver createSafariDriver() {
        if (!System.getProperty("os.name").toLowerCase().contains("mac")) {
            throw new UnsupportedOperationException("Safari is only supported on macOS");
        }
        return new SafariDriver();
    }
    
    /**
     * Get browser name from system property or config
     */
    private static String getBrowserName() {
        String browser = System.getProperty("browser");
        if (browser == null || browser.isEmpty()) {
            browser = config.getBrowser();
        }
        return browser;
    }
}