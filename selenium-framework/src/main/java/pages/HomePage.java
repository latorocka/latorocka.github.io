package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import utils.WaitUtils;

import java.util.List;

/**
 * Home Page Object Model class
 * Author: Brian LaTorraca
 */
public class HomePage extends BasePage {

    // Header elements
    @FindBy(css = ".header .logo")
    private WebElement logo;

    @FindBy(css = ".header .navigation")
    private WebElement navigationMenu;

    @FindBy(css = ".user-profile")
    private WebElement userProfile;

    @FindBy(css = ".logout-button")
    private WebElement logoutButton;

    // Main content elements
    @FindBy(css = ".welcome-message")
    private WebElement welcomeMessage;

    @FindBy(css = ".dashboard-widgets")
    private List<WebElement> dashboardWidgets;

    @FindBy(css = ".quick-actions")
    private WebElement quickActionsSection;

    @FindBy(css = ".recent-activities")
    private WebElement recentActivitiesSection;

    // Navigation menu items
    @FindBy(xpath = "//nav//a[text()='Dashboard']")
    private WebElement dashboardLink;

    @FindBy(xpath = "//nav//a[text()='Products']")
    private WebElement productsLink;

    @FindBy(xpath = "//nav//a[text()='Orders']")
    private WebElement ordersLink;

    @FindBy(xpath = "//nav//a[text()='Customers']")
    private WebElement customersLink;

    @FindBy(xpath = "//nav//a[text()='Settings']")
    private WebElement settingsLink;

    // Search functionality
    @FindBy(id = "search-input")
    private WebElement searchInput;

    @FindBy(css = ".search-button")
    private WebElement searchButton;

    @FindBy(css = ".search-results")
    private WebElement searchResults;

    // Locators
    private final By WELCOME_MESSAGE = By.css(".welcome-message");
    private final By USER_PROFILE = By.css(".user-profile");
    private final By LOGOUT_BUTTON = By.css(".logout-button");
    private final By SEARCH_INPUT = By.id("search-input");
    private final By SEARCH_RESULTS = By.css(".search-results");

    public HomePage(WebDriver driver) {
        super(driver);
    }

    // Page verification methods
    public boolean isHomePageLoaded() {
        return isElementDisplayed(WELCOME_MESSAGE) && 
               isElementDisplayed(USER_PROFILE) &&
               getPageTitle().contains("Home");
    }

    public String getWelcomeMessage() {
        WaitUtils.waitForElementToBeVisible(driver, WELCOME_MESSAGE);
        return getText(welcomeMessage);
    }

    public boolean isUserLoggedIn() {
        return isElementDisplayed(USER_PROFILE) && isElementDisplayed(LOGOUT_BUTTON);
    }

    // Navigation methods
    public void clickLogo() {
        click(logo);
    }

    public void navigateToDashboard() {
        click(dashboardLink);
    }

    public void navigateToProducts() {
        click(productsLink);
    }

    public void navigateToOrders() {
        click(ordersLink);
    }

    public void navigateToCustomers() {
        click(customersLink);
    }

    public void navigateToSettings() {
        click(settingsLink);
    }

    // User profile actions
    public void clickUserProfile() {
        click(userProfile);
    }

    public void logout() {
        click(logoutButton);
        WaitUtils.waitForUrlContains(driver, "login");
    }

    public String getUserProfileName() {
        return getText(userProfile);
    }

    // Search functionality
    public void performSearch(String searchTerm) {
        WaitUtils.waitForElementToBeVisible(driver, SEARCH_INPUT);
        sendKeys(searchInput, searchTerm);
        click(searchButton);
        WaitUtils.waitForElementToBeVisible(driver, SEARCH_RESULTS);
    }

    public boolean areSearchResultsDisplayed() {
        return isElementDisplayed(SEARCH_RESULTS);
    }

    public int getSearchResultsCount() {
        List<WebElement> results = getElements(By.css(".search-results .result-item"));
        return results.size();
    }

    public void clearSearch() {
        searchInput.clear();
    }

    // Dashboard widgets
    public int getDashboardWidgetCount() {
        return dashboardWidgets.size();
    }

    public boolean isDashboardWidgetDisplayed(String widgetName) {
        By widgetLocator = By.xpath("//div[@class='dashboard-widgets']//div[contains(@class,'widget') and contains(text(),'" + widgetName + "')]");
        return isElementDisplayed(widgetLocator);
    }

    public void clickDashboardWidget(String widgetName) {
        By widgetLocator = By.xpath("//div[@class='dashboard-widgets']//div[contains(@class,'widget') and contains(text(),'" + widgetName + "')]");
        click(widgetLocator);
    }

    // Quick actions
    public boolean isQuickActionsSectionDisplayed() {
        return isElementDisplayed(quickActionsSection);
    }

    public void clickQuickAction(String actionName) {
        By actionLocator = By.xpath("//div[@class='quick-actions']//button[contains(text(),'" + actionName + "')]");
        click(actionLocator);
    }

    // Recent activities
    public boolean isRecentActivitiesSectionDisplayed() {
        return isElementDisplayed(recentActivitiesSection);
    }

    public int getRecentActivitiesCount() {
        List<WebElement> activities = getElements(By.css(".recent-activities .activity-item"));
        return activities.size();
    }

    public String getFirstRecentActivity() {
        WebElement firstActivity = driver.findElement(By.css(".recent-activities .activity-item:first-child"));
        return getText(firstActivity);
    }

    // Page state methods
    public void waitForPageToFullyLoad() {
        WaitUtils.waitForElementToBeVisible(driver, WELCOME_MESSAGE);
        WaitUtils.waitForElementToBeVisible(driver, USER_PROFILE);
        waitForPageLoad();
    }

    public boolean isNavigationMenuVisible() {
        return isElementDisplayed(navigationMenu);
    }

    public void refreshDashboard() {
        refreshPage();
        waitForPageToFullyLoad();
    }
}