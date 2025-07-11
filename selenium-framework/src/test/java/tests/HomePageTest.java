package tests;

import base.BaseTest;
import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import pages.HomePage;
import pages.LoginPage;
import utils.DriverManager;

/**
 * Home Page functionality test cases
 * Author: Brian LaTorraca
 */
public class HomePageTest extends BaseTest {

    private HomePage homePage;
    private LoginPage loginPage;

    @BeforeMethod
    public void loginToApplication() {
        // Login before each test
        loginPage = new LoginPage(DriverManager.getDriver());
        loginPage.login("testuser@example.com", "password123");
        
        homePage = new HomePage(DriverManager.getDriver());
        homePage.waitForPageToFullyLoad();
    }

    @Test(priority = 1)
    public void testHomePageLoad() {
        Assert.assertTrue(homePage.isHomePageLoaded(), "Home page is not loaded properly");
        Assert.assertTrue(homePage.isUserLoggedIn(), "User is not logged in");
        Assert.assertTrue(homePage.isNavigationMenuVisible(), "Navigation menu is not visible");
    }

    @Test(priority = 2)
    public void testWelcomeMessage() {
        String welcomeMessage = homePage.getWelcomeMessage();
        Assert.assertNotNull(welcomeMessage, "Welcome message is null");
        Assert.assertFalse(welcomeMessage.isEmpty(), "Welcome message is empty");
        Assert.assertTrue(welcomeMessage.contains("Welcome"), "Welcome message does not contain 'Welcome'");
    }

    @Test(priority = 3)
    public void testNavigationMenuLinks() {
        // Test Dashboard navigation
        homePage.navigateToDashboard();
        Assert.assertTrue(getCurrentUrl().contains("dashboard"), "Dashboard navigation failed");
        
        // Navigate back to home
        homePage.clickLogo();
        
        // Test Products navigation
        homePage.navigateToProducts();
        Assert.assertTrue(getCurrentUrl().contains("products"), "Products navigation failed");
        
        // Navigate back to home
        homePage.clickLogo();
        
        // Test Orders navigation
        homePage.navigateToOrders();
        Assert.assertTrue(getCurrentUrl().contains("orders"), "Orders navigation failed");
        
        // Navigate back to home
        homePage.clickLogo();
        
        // Test Customers navigation
        homePage.navigateToCustomers();
        Assert.assertTrue(getCurrentUrl().contains("customers"), "Customers navigation failed");
        
        // Navigate back to home
        homePage.clickLogo();
        
        // Test Settings navigation
        homePage.navigateToSettings();
        Assert.assertTrue(getCurrentUrl().contains("settings"), "Settings navigation failed");
    }

    @Test(priority = 4)
    public void testSearchFunctionality() {
        String searchTerm = "test product";
        
        // Perform search
        homePage.performSearch(searchTerm);
        
        // Verify search results
        Assert.assertTrue(homePage.areSearchResultsDisplayed(), "Search results are not displayed");
        
        int resultCount = homePage.getSearchResultsCount();
        Assert.assertTrue(resultCount > 0, "No search results found");
        
        // Clear search
        homePage.clearSearch();
    }

    @Test(priority = 5)
    public void testDashboardWidgets() {
        Assert.assertTrue(homePage.getDashboardWidgetCount() > 0, "No dashboard widgets found");
        
        // Test specific widgets if they exist
        if (homePage.isDashboardWidgetDisplayed("Sales Overview")) {
            homePage.clickDashboardWidget("Sales Overview");
            // Add verification for widget interaction
        }
        
        if (homePage.isDashboardWidgetDisplayed("Recent Orders")) {
            homePage.clickDashboardWidget("Recent Orders");
            // Add verification for widget interaction
        }
    }

    @Test(priority = 6)
    public void testQuickActions() {
        if (homePage.isQuickActionsSectionDisplayed()) {
            // Test common quick actions
            homePage.clickQuickAction("Add Product");
            // Verify navigation or modal opening
            
            // Navigate back if needed
            homePage.clickLogo();
            
            homePage.clickQuickAction("Create Order");
            // Verify navigation or modal opening
        }
    }

    @Test(priority = 7)
    public void testRecentActivities() {
        if (homePage.isRecentActivitiesSectionDisplayed()) {
            int activitiesCount = homePage.getRecentActivitiesCount();
            Assert.assertTrue(activitiesCount >= 0, "Recent activities count is negative");
            
            if (activitiesCount > 0) {
                String firstActivity = homePage.getFirstRecentActivity();
                Assert.assertNotNull(firstActivity, "First activity is null");
                Assert.assertFalse(firstActivity.isEmpty(), "First activity is empty");
            }
        }
    }

    @Test(priority = 8)
    public void testUserProfile() {
        // Click user profile
        homePage.clickUserProfile();
        
        // Verify profile information
        String profileName = homePage.getUserProfileName();
        Assert.assertNotNull(profileName, "Profile name is null");
        Assert.assertFalse(profileName.isEmpty(), "Profile name is empty");
    }

    @Test(priority = 9)
    public void testLogout() {
        // Perform logout
        homePage.logout();
        
        // Verify redirect to login page
        Assert.assertTrue(getCurrentUrl().contains("login"), "User is not redirected to login page after logout");
        
        // Verify login page is loaded
        LoginPage loginPageAfterLogout = new LoginPage(DriverManager.getDriver());
        Assert.assertTrue(loginPageAfterLogout.isLoginPageLoaded(), "Login page is not loaded after logout");
    }

    @Test(priority = 10)
    public void testPageRefresh() {
        String originalUrl = getCurrentUrl();
        
        // Refresh the page
        homePage.refreshDashboard();
        
        // Verify page is still loaded properly
        Assert.assertTrue(homePage.isHomePageLoaded(), "Home page is not loaded properly after refresh");
        Assert.assertEquals(getCurrentUrl(), originalUrl, "URL changed after refresh");
    }

    @Test(priority = 11)
    public void testPageTitleAndBranding() {
        String pageTitle = getPageTitle();
        Assert.assertNotNull(pageTitle, "Page title is null");
        Assert.assertFalse(pageTitle.isEmpty(), "Page title is empty");
        
        // Verify logo is clickable and functional
        homePage.clickLogo();
        Assert.assertTrue(homePage.isHomePageLoaded(), "Logo click does not navigate to home");
    }

    @Test(priority = 12)
    public void testResponsiveElements() {
        // Test if key elements are visible and functional
        Assert.assertTrue(homePage.isNavigationMenuVisible(), "Navigation menu is not visible");
        Assert.assertTrue(homePage.isUserLoggedIn(), "User profile section is not visible");
        
        // Test search functionality on different screen sizes
        homePage.performSearch("responsive test");
        Assert.assertTrue(homePage.areSearchResultsDisplayed(), "Search is not working on current screen size");
    }
}