const { expect } = require('chai');
const HomePage = require('../../pages/android/HomePage');

describe('Android - Home Page Tests', () => {
  
  beforeEach(async () => {
    // Navigate to home page and wait for it to load
    await HomePage.waitForHomePageToLoad();
  });

  it('should display the app title correctly', async () => {
    const title = await HomePage.getAppTitle();
    expect(title).to.equal('API Demos');
  });

  it('should display all main navigation options', async () => {
    const isAllElementsDisplayed = await HomePage.verifyHomePageElements();
    expect(isAllElementsDisplayed).to.be.true;
  });

  it('should be able to navigate to Accessibility section', async () => {
    await HomePage.selectAccessibility();
    
    // Verify navigation to accessibility page
    const accessibilityTitle = await $('//android.widget.TextView[@text="Accessibility"]');
    await accessibilityTitle.waitForDisplayed({ timeout: 10000 });
    expect(await accessibilityTitle.isDisplayed()).to.be.true;
    
    // Navigate back
    await browser.back();
  });

  it('should be able to navigate to Views section', async () => {
    await HomePage.selectViews();
    
    // Verify navigation to views page
    const viewsTitle = await $('//android.widget.TextView[@text="Views"]');
    await viewsTitle.waitForDisplayed({ timeout: 10000 });
    expect(await viewsTitle.isDisplayed()).to.be.true;
    
    // Navigate back
    await browser.back();
  });

  it('should be able to search for specific options', async () => {
    await HomePage.searchForOption('Animation');
    
    // Verify search results
    const searchResults = await $$('//android.widget.TextView[contains(@text, "Animation")]');
    expect(searchResults.length).to.be.greaterThan(0);
    
    // Clear search
    const clearButton = await $('//android.widget.ImageView[@content-desc="Clear query"]');
    if (await clearButton.isDisplayed()) {
      await clearButton.click();
    }
  });

  it('should be able to scroll through all options', async () => {
    const initialOptions = await HomePage.getAvailableOptions();
    expect(initialOptions.length).to.be.greaterThan(5);
    
    // Scroll down to see more options
    await HomePage.scrollDown();
    
    // Verify we can still see the main options
    expect(await HomePage.isHomePageDisplayed()).to.be.true;
  });

  it('should handle app navigation correctly', async () => {
    // Navigate to Graphics section
    await HomePage.selectGraphics();
    
    // Verify we're in Graphics section
    const graphicsTitle = await $('//android.widget.TextView[@text="Graphics"]');
    await graphicsTitle.waitForDisplayed({ timeout: 10000 });
    expect(await graphicsTitle.isDisplayed()).to.be.true;
    
    // Navigate back to home
    await browser.back();
    
    // Verify we're back on home page
    expect(await HomePage.isHomePageDisplayed()).to.be.true;
  });

  it('should support touch interactions', async () => {
    // Test tap interaction
    await HomePage.selectMedia();
    
    // Verify navigation occurred
    const mediaTitle = await $('//android.widget.TextView[@text="Media"]');
    await mediaTitle.waitForDisplayed({ timeout: 10000 });
    expect(await mediaTitle.isDisplayed()).to.be.true;
    
    // Navigate back
    await browser.back();
  });

  it('should maintain app state during navigation', async () => {
    const originalTitle = await HomePage.getAppTitle();
    
    // Navigate away and back
    await HomePage.selectApp();
    await browser.back();
    
    // Verify app state is maintained
    const returnedTitle = await HomePage.getAppTitle();
    expect(returnedTitle).to.equal(originalTitle);
  });

  it('should handle orientation changes', async () => {
    // Test portrait orientation
    await browser.setOrientation('PORTRAIT');
    expect(await HomePage.isHomePageDisplayed()).to.be.true;
    
    // Test landscape orientation
    await browser.setOrientation('LANDSCAPE');
    expect(await HomePage.isHomePageDisplayed()).to.be.true;
    
    // Return to portrait
    await browser.setOrientation('PORTRAIT');
  });

  it('should support accessibility features', async () => {
    await HomePage.selectAccessibility();
    
    // Check if accessibility options are available
    const accessibilityOptions = await $$('//android.widget.TextView[contains(@text, "Accessibility")]');
    expect(accessibilityOptions.length).to.be.greaterThan(0);
    
    await browser.back();
  });

  afterEach(async () => {
    // Ensure we're back on home page after each test
    const isHome = await HomePage.isHomePageDisplayed();
    if (!isHome) {
      await browser.back();
      await HomePage.waitForHomePageToLoad();
    }
  });
});