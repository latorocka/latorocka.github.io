package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import utils.WaitUtils;

/**
 * Login Page Object Model class
 * Author: Brian LaTorraca
 */
public class LoginPage extends BasePage {

    // Page locators using @FindBy annotations
    @FindBy(id = "username")
    private WebElement usernameField;

    @FindBy(id = "password")
    private WebElement passwordField;

    @FindBy(id = "login-button")
    private WebElement loginButton;

    @FindBy(xpath = "//a[text()='Forgot Password?']")
    private WebElement forgotPasswordLink;

    @FindBy(id = "remember-me")
    private WebElement rememberMeCheckbox;

    @FindBy(css = ".error-message")
    private WebElement errorMessage;

    @FindBy(css = ".success-message")
    private WebElement successMessage;

    // Alternative locators for elements that might change
    private final By USERNAME_FIELD = By.id("username");
    private final By PASSWORD_FIELD = By.id("password");
    private final By LOGIN_BUTTON = By.id("login-button");
    private final By ERROR_MESSAGE = By.css(".error-message");

    public LoginPage(WebDriver driver) {
        super(driver);
    }

    // Page actions
    public void enterUsername(String username) {
        WaitUtils.waitForElementToBeVisible(driver, USERNAME_FIELD);
        sendKeys(usernameField, username);
    }

    public void enterPassword(String password) {
        WaitUtils.waitForElementToBeVisible(driver, PASSWORD_FIELD);
        sendKeys(passwordField, password);
    }

    public void clickLoginButton() {
        WaitUtils.waitForElementToBeClickable(driver, LOGIN_BUTTON);
        click(loginButton);
    }

    public void clickForgotPassword() {
        click(forgotPasswordLink);
    }

    public void toggleRememberMe() {
        click(rememberMeCheckbox);
    }

    public boolean isRememberMeSelected() {
        return rememberMeCheckbox.isSelected();
    }

    // Combined actions
    public void login(String username, String password) {
        enterUsername(username);
        enterPassword(password);
        clickLoginButton();
    }

    public void loginWithRememberMe(String username, String password) {
        enterUsername(username);
        enterPassword(password);
        if (!isRememberMeSelected()) {
            toggleRememberMe();
        }
        clickLoginButton();
    }

    // Verification methods
    public boolean isErrorMessageDisplayed() {
        return isElementDisplayed(ERROR_MESSAGE);
    }

    public String getErrorMessage() {
        WaitUtils.waitForElementToBeVisible(driver, ERROR_MESSAGE);
        return getText(errorMessage);
    }

    public boolean isSuccessMessageDisplayed() {
        return isElementDisplayed(successMessage);
    }

    public String getSuccessMessage() {
        return getText(successMessage);
    }

    public boolean isLoginButtonEnabled() {
        return loginButton.isEnabled();
    }

    public boolean isUsernameFieldEmpty() {
        return getAttribute(usernameField, "value").isEmpty();
    }

    public boolean isPasswordFieldEmpty() {
        return getAttribute(passwordField, "value").isEmpty();
    }

    // Page state verification
    public boolean isLoginPageLoaded() {
        return isElementDisplayed(USERNAME_FIELD) && 
               isElementDisplayed(PASSWORD_FIELD) && 
               isElementDisplayed(LOGIN_BUTTON);
    }

    public String getPageTitle() {
        return driver.getTitle();
    }

    public void clearLoginForm() {
        usernameField.clear();
        passwordField.clear();
        if (isRememberMeSelected()) {
            toggleRememberMe();
        }
    }

    // Wait for page transitions
    public void waitForLoginCompletion() {
        WaitUtils.waitForElementToBeInvisible(driver, LOGIN_BUTTON);
    }

    public void waitForErrorMessage() {
        WaitUtils.waitForElementToBeVisible(driver, ERROR_MESSAGE);
    }
}