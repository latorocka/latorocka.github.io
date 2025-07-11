package tests;

import base.BaseTest;
import org.testng.Assert;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;
import pages.HomePage;
import pages.LoginPage;
import utils.DriverManager;
import utils.ExcelUtils;

import java.util.Map;

/**
 * Login functionality test cases
 * Author: Brian LaTorraca
 */
public class LoginTest extends BaseTest {

    @Test(priority = 1)
    public void testValidLogin() {
        LoginPage loginPage = new LoginPage(DriverManager.getDriver());
        
        // Verify login page is loaded
        Assert.assertTrue(loginPage.isLoginPageLoaded(), "Login page is not loaded properly");
        
        // Perform login with valid credentials
        loginPage.login("testuser@example.com", "password123");
        
        // Verify successful login
        HomePage homePage = new HomePage(DriverManager.getDriver());
        Assert.assertTrue(homePage.isHomePageLoaded(), "Home page is not loaded after login");
        Assert.assertTrue(homePage.isUserLoggedIn(), "User is not logged in successfully");
    }

    @Test(priority = 2)
    public void testInvalidLogin() {
        LoginPage loginPage = new LoginPage(DriverManager.getDriver());
        
        // Attempt login with invalid credentials
        loginPage.login("invalid@example.com", "wrongpassword");
        
        // Verify error message is displayed
        loginPage.waitForErrorMessage();
        Assert.assertTrue(loginPage.isErrorMessageDisplayed(), "Error message is not displayed");
        
        String errorMessage = loginPage.getErrorMessage();
        Assert.assertTrue(errorMessage.contains("Invalid"), "Error message does not contain expected text");
    }

    @Test(priority = 3)
    public void testEmptyCredentials() {
        LoginPage loginPage = new LoginPage(DriverManager.getDriver());
        
        // Click login without entering credentials
        loginPage.clickLoginButton();
        
        // Verify validation message
        Assert.assertTrue(loginPage.isErrorMessageDisplayed(), "Validation error is not displayed");
    }

    @Test(priority = 4)
    public void testEmptyUsername() {
        LoginPage loginPage = new LoginPage(DriverManager.getDriver());
        
        // Enter only password
        loginPage.enterPassword("password123");
        loginPage.clickLoginButton();
        
        // Verify username validation
        Assert.assertTrue(loginPage.isErrorMessageDisplayed(), "Username validation error is not displayed");
    }

    @Test(priority = 5)
    public void testEmptyPassword() {
        LoginPage loginPage = new LoginPage(DriverManager.getDriver());
        
        // Enter only username
        loginPage.enterUsername("testuser@example.com");
        loginPage.clickLoginButton();
        
        // Verify password validation
        Assert.assertTrue(loginPage.isErrorMessageDisplayed(), "Password validation error is not displayed");
    }

    @Test(priority = 6)
    public void testRememberMeFunctionality() {
        LoginPage loginPage = new LoginPage(DriverManager.getDriver());
        
        // Login with Remember Me checked
        loginPage.loginWithRememberMe("testuser@example.com", "password123");
        
        // Verify successful login
        HomePage homePage = new HomePage(DriverManager.getDriver());
        Assert.assertTrue(homePage.isHomePageLoaded(), "Home page is not loaded");
        
        // Logout and verify remember me functionality
        homePage.logout();
        Assert.assertTrue(getCurrentUrl().contains("login"), "User is not redirected to login page");
    }

    @Test(priority = 7)
    public void testForgotPasswordLink() {
        LoginPage loginPage = new LoginPage(DriverManager.getDriver());
        
        // Click forgot password link
        loginPage.clickForgotPassword();
        
        // Verify navigation to forgot password page
        Assert.assertTrue(getCurrentUrl().contains("forgot"), "Forgot password page is not loaded");
    }

    @Test(priority = 8)
    public void testLoginPageElements() {
        LoginPage loginPage = new LoginPage(DriverManager.getDriver());
        
        // Verify all elements are present
        Assert.assertTrue(loginPage.isLoginPageLoaded(), "Login page elements are not loaded");
        Assert.assertTrue(loginPage.isLoginButtonEnabled(), "Login button is not enabled");
        Assert.assertTrue(loginPage.isUsernameFieldEmpty(), "Username field is not empty initially");
        Assert.assertTrue(loginPage.isPasswordFieldEmpty(), "Password field is not empty initially");
    }

    @Test(priority = 9, dataProvider = "loginData")
    public void testDataDrivenLogin(Map<String, String> testData) {
        LoginPage loginPage = new LoginPage(DriverManager.getDriver());
        
        String username = testData.get("username");
        String password = testData.get("password");
        String expectedResult = testData.get("expectedResult");
        
        // Perform login
        loginPage.login(username, password);
        
        if (expectedResult.equals("success")) {
            HomePage homePage = new HomePage(DriverManager.getDriver());
            Assert.assertTrue(homePage.isHomePageLoaded(), "Login should be successful for: " + username);
        } else {
            Assert.assertTrue(loginPage.isErrorMessageDisplayed(), "Error should be displayed for: " + username);
        }
        
        // Clear form for next iteration
        if (loginPage.isLoginPageLoaded()) {
            loginPage.clearLoginForm();
        }
    }

    @DataProvider(name = "loginData")
    public Object[][] getLoginTestData() {
        String testDataPath = config.getTestDataPath();
        if (testDataPath != null) {
            return ExcelUtils.readExcelData(testDataPath, "LoginData");
        } else {
            // Fallback static data if Excel file is not available
            return new Object[][] {
                {Map.of("username", "admin@example.com", "password", "admin123", "expectedResult", "success")},
                {Map.of("username", "user@example.com", "password", "user123", "expectedResult", "success")},
                {Map.of("username", "invalid@example.com", "password", "wrong", "expectedResult", "failure")},
                {Map.of("username", "", "password", "password", "expectedResult", "failure")},
                {Map.of("username", "user@example.com", "password", "", "expectedResult", "failure")}
            };
        }
    }

    @Test(priority = 10)
    public void testLoginFormClear() {
        LoginPage loginPage = new LoginPage(DriverManager.getDriver());
        
        // Fill the form
        loginPage.enterUsername("testuser@example.com");
        loginPage.enterPassword("password123");
        loginPage.toggleRememberMe();
        
        // Clear the form
        loginPage.clearLoginForm();
        
        // Verify form is cleared
        Assert.assertTrue(loginPage.isUsernameFieldEmpty(), "Username field is not cleared");
        Assert.assertTrue(loginPage.isPasswordFieldEmpty(), "Password field is not cleared");
        Assert.assertFalse(loginPage.isRememberMeSelected(), "Remember me checkbox is still selected");
    }
}