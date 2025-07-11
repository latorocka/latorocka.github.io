package config;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * Singleton configuration manager for test properties
 * 
 * @author Brian LaTorraca
 */
public class ConfigManager {
    
    private static ConfigManager instance;
    private Properties properties;
    
    private ConfigManager() {
        loadProperties();
    }
    
    /**
     * Get singleton instance of ConfigManager
     * 
     * @return ConfigManager instance
     */
    public static ConfigManager getInstance() {
        if (instance == null) {
            synchronized (ConfigManager.class) {
                if (instance == null) {
                    instance = new ConfigManager();
                }
            }
        }
        return instance;
    }
    
    /**
     * Load properties from config file
     */
    private void loadProperties() {
        properties = new Properties();
        try (InputStream input = getClass().getClassLoader().getResourceAsStream("config.properties")) {
            if (input == null) {
                throw new RuntimeException("Unable to find config.properties file");
            }
            properties.load(input);
        } catch (IOException e) {
            throw new RuntimeException("Error loading config.properties file", e);
        }
    }
    
    /**
     * Get property value by key, checking system properties first
     * 
     * @param key Property key
     * @return Property value or null if not found
     */
    public String getProperty(String key) {
        // Check system properties first (for runtime overrides)
        String systemValue = System.getProperty(key);
        if (systemValue != null && !systemValue.isEmpty()) {
            return systemValue;
        }
        
        // Fall back to config file
        return properties.getProperty(key);
    }
    
    /**
     * Get browser name
     * 
     * @return Browser name
     */
    public String getBrowser() {
        return getProperty("browser");
    }
    
    /**
     * Check if headless execution is enabled
     * 
     * @return true if headless mode enabled
     */
    public boolean isHeadless() {
        String headless = getProperty("headless");
        return Boolean.parseBoolean(headless);
    }
    
    /**
     * Check if window should be maximized
     * 
     * @return true if maximize enabled
     */
    public boolean shouldMaximize() {
        String maximize = getProperty("maximize");
        return Boolean.parseBoolean(maximize);
    }
    
    /**
     * Get implicit wait timeout
     * 
     * @return Timeout in seconds
     */
    public int getImplicitWait() {
        String timeout = getProperty("implicit.wait");
        return Integer.parseInt(timeout != null ? timeout : "10");
    }
    
    /**
     * Get explicit wait timeout
     * 
     * @return Timeout in seconds
     */
    public int getExplicitWait() {
        String timeout = getProperty("explicit.wait");
        return Integer.parseInt(timeout != null ? timeout : "20");
    }
    
    /**
     * Get page load timeout
     * 
     * @return Timeout in seconds
     */
    public int getPageLoadTimeout() {
        String timeout = getProperty("page.load.timeout");
        return Integer.parseInt(timeout != null ? timeout : "30");
    }
    
    /**
     * Get script timeout
     * 
     * @return Timeout in seconds
     */
    public int getScriptTimeout() {
        String timeout = getProperty("script.timeout");
        return Integer.parseInt(timeout != null ? timeout : "30");
    }
    
    /**
     * Get base URL for current environment
     * 
     * @return Base URL
     */
    public String getBaseUrl() {
        String environment = getEnvironment();
        return getProperty(environment + ".url");
    }
    
    /**
     * Get current environment
     * 
     * @return Environment name
     */
    public String getEnvironment() {
        return getProperty("environment");
    }
    
    /**
     * Get test data file path
     * 
     * @return File path
     */
    public String getTestDataPath() {
        return getProperty("test.data.path");
    }
    
    /**
     * Get screenshot directory path
     * 
     * @return Directory path
     */
    public String getScreenshotPath() {
        return getProperty("screenshot.path");
    }
    
    /**
     * Get report directory path
     * 
     * @return Directory path
     */
    public String getReportPath() {
        return getProperty("report.path");
    }
    
    /**
     * Get thread count for parallel execution
     * 
     * @return Thread count
     */
    public int getThreadCount() {
        String count = getProperty("thread.count");
        return Integer.parseInt(count != null ? count : "1");
    }
    
    /**
     * Check if screenshot on failure is enabled
     * 
     * @return true if enabled
     */
    public boolean isScreenshotOnFailure() {
        String enabled = getProperty("screenshot.on.failure");
        return Boolean.parseBoolean(enabled);
    }
    
    /**
     * Check if retry is enabled for failed tests
     * 
     * @return true if enabled
     */
    public boolean isRetryEnabled() {
        String enabled = getProperty("retry.failed.tests");
        return Boolean.parseBoolean(enabled);
    }
    
    /**
     * Get retry count for failed tests
     * 
     * @return Retry count
     */
    public int getRetryCount() {
        String count = getProperty("retry.count");
        return Integer.parseInt(count != null ? count : "0");
    }
}