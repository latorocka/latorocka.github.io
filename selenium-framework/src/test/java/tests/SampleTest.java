package tests;

import base.BaseTest;
import org.testng.Assert;
import org.testng.annotations.Test;
import utils.DriverManager;

/**
 * Sample test class demonstrating framework usage
 * 
 * @author Brian LaTorraca
 */
public class SampleTest extends BaseTest {
    
    @Test(description = "Verify Google homepage loads successfully")
    public void testGoogleHomepage() {
        // Navigate to Google
        DriverManager.getDriver().get("https://www.google.com");
        
        // Verify page title
        String pageTitle = DriverManager.getDriver().getTitle();
        Assert.assertTrue(pageTitle.contains("Google"), 
            "Page title should contain 'Google', but was: " + pageTitle);
        
        // Take a screenshot
        takeScreenshot("google_homepage");
        
        System.out.println("Google homepage test completed successfully");
    }
    
    @Test(description = "Verify page navigation works")
    public void testPageNavigation() {
        // Navigate to a test page
        DriverManager.getDriver().get("https://example.com");
        
        // Verify we're on the correct page
        String currentUrl = DriverManager.getDriver().getCurrentUrl();
        Assert.assertTrue(currentUrl.contains("example.com"), 
            "Should be on example.com but was: " + currentUrl);
        
        // Verify page contains expected content
        String pageSource = DriverManager.getDriver().getPageSource();
        Assert.assertTrue(pageSource.contains("Example Domain"), 
            "Page should contain 'Example Domain'");
        
        System.out.println("Navigation test completed successfully");
    }
    
    @Test(description = "Demonstrate screenshot capture on failure", 
          expectedExceptions = AssertionError.class)
    public void testScreenshotOnFailure() {
        // Navigate to a page
        DriverManager.getDriver().get("https://example.com");
        
        // This assertion will fail to demonstrate screenshot capture
        Assert.fail("This test is designed to fail to demonstrate screenshot capture");
    }
}