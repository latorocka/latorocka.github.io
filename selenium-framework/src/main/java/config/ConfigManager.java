package config;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

/**
 * Configuration Manager for handling application properties
 * Author: Brian LaTorraca
 */
public class ConfigManager {
    private static ConfigManager instance;
    private Properties properties;
    private static final String CONFIG_FILE_PATH = "src/test/resources/config.properties";

    private ConfigManager() {
        loadProperties();
    }

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

    private void loadProperties() {
        properties = new Properties();
        try (FileInputStream fis = new FileInputStream(CONFIG_FILE_PATH)) {
            properties.load(fis);
        } catch (IOException e) {
            throw new RuntimeException("Failed to load configuration file: " + CONFIG_FILE_PATH, e);
        }
    }

    public String getProperty(String key) {
        String value = System.getProperty(key);
        if (value == null) {
            value = properties.getProperty(key);
        }
        return value;
    }

    public String getBrowser() {
        return getProperty("browser");
    }

    public boolean isHeadless() {
        return Boolean.parseBoolean(getProperty("headless"));
    }

    public int getImplicitWait() {
        return Integer.parseInt(getProperty("implicit.wait"));
    }

    public int getExplicitWait() {
        return Integer.parseInt(getProperty("explicit.wait"));
    }

    public String getBaseUrl() {
        String environment = getProperty("environment");
        if (environment == null) {
            environment = "qa";
        }
        return getProperty(environment + ".url");
    }

    public String getTestDataPath() {
        return getProperty("test.data.path");
    }

    public String getScreenshotPath() {
        return getProperty("screenshot.path");
    }

    public String getReportPath() {
        return getProperty("report.path");
    }
}