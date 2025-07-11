const { expect } = require('chai');
const HomePage = require('../../pages/ios/HomePage');

describe('iOS - Home Page Tests', () => {
  
  beforeEach(async () => {
    // Navigate to home page and wait for it to load
    await HomePage.waitForHomePageToLoad();
  });

  it('should display the app navigation correctly', async () => {
    const title = await HomePage.getAppTitle();
    expect(title).to.contain('UICatalog');
  });

  it('should display all main UI catalog options', async () => {
    const isAllElementsDisplayed = await HomePage.verifyHomePageElements();
    expect(isAllElementsDisplayed).to.be.true;
  });

  it('should be able to navigate to Buttons section', async () => {
    await HomePage.selectButtons();
    
    // Verify navigation to buttons page
    const buttonsTitle = await $('//XCUIElementTypeNavigationBar[@name="Buttons"]');
    await buttonsTitle.waitForDisplayed({ timeout: 10000 });
    expect(await buttonsTitle.isDisplayed()).to.be.true;
    
    // Navigate back
    await HomePage.goBackToHome();
  });

  it('should be able to navigate to Text Fields section', async () => {
    await HomePage.selectTextFields();
    
    // Verify navigation to text fields page
    const textFieldsTitle = await $('//XCUIElementTypeNavigationBar[@name="Text Fields"]');
    await textFieldsTitle.waitForDisplayed({ timeout: 10000 });
    expect(await textFieldsTitle.isDisplayed()).to.be.true;
    
    // Navigate back
    await HomePage.goBackToHome();
  });

  it('should be able to search for specific UI elements', async () => {
    await HomePage.searchForOption('Button');
    
    // Verify search results show button-related items
    const searchResults = await $$('//XCUIElementTypeCell[contains(@name, "Button")]');
    expect(searchResults.length).to.be.greaterThan(0);
    
    // Clear search
    const searchBar = await $('//XCUIElementTypeSearchField');
    await searchBar.clearValue();
  });

  it('should be able to scroll through all UI catalog options', async () => {
    const initialOptions = await HomePage.getAvailableOptions();
    expect(initialOptions.length).to.be.greaterThan(5);
    
    // Scroll down to see more options
    await HomePage.scrollDown();
    
    // Verify we can still see the navigation
    expect(await HomePage.isHomePageDisplayed()).to.be.true;
  });

  it('should handle iOS navigation correctly', async () => {
    // Navigate to Alert Views section
    await HomePage.selectAlertViews();
    
    // Verify we're in Alert Views section
    const alertTitle = await $('//XCUIElementTypeNavigationBar[@name="Alert Views"]');
    await alertTitle.waitForDisplayed({ timeout: 10000 });
    expect(await alertTitle.isDisplayed()).to.be.true;
    
    // Navigate back to home
    await HomePage.goBackToHome();
    
    // Verify we're back on home page
    expect(await HomePage.isHomePageDisplayed()).to.be.true;
  });

  it('should support iOS touch interactions', async () => {
    // Test tap interaction on sliders
    await HomePage.selectSliders();
    
    // Verify navigation occurred
    const slidersTitle = await $('//XCUIElementTypeNavigationBar[@name="Sliders"]');
    await slidersTitle.waitForDisplayed({ timeout: 10000 });
    expect(await slidersTitle.isDisplayed()).to.be.true;
    
    // Navigate back
    await HomePage.goBackToHome();
  });

  it('should maintain app state during iOS navigation', async () => {
    const originalTitle = await HomePage.getAppTitle();
    
    // Navigate to switches and back
    await HomePage.selectSwitches();
    await HomePage.goBackToHome();
    
    // Verify app state is maintained
    const returnedTitle = await HomePage.getAppTitle();
    expect(returnedTitle).to.equal(originalTitle);
  });

  it('should handle iOS orientation changes', async () => {
    // Test portrait orientation
    await browser.setOrientation('PORTRAIT');
    expect(await HomePage.isHomePageDisplayed()).to.be.true;
    
    // Test landscape orientation
    await browser.setOrientation('LANDSCAPE');
    expect(await HomePage.isHomePageDisplayed()).to.be.true;
    
    // Return to portrait
    await browser.setOrientation('PORTRAIT');
  });

  it('should support iOS accessibility features', async () => {
    // Navigate to a section with accessibility elements
    await HomePage.selectButtons();
    
    // Check for iOS accessibility attributes
    const buttons = await $$('//XCUIElementTypeButton');
    expect(buttons.length).to.be.greaterThan(0);
    
    // Verify accessibility labels exist
    for (let button of buttons) {
      const label = await button.getAttribute('label');
      if (label) {
        expect(label).to.be.a('string');
      }
    }
    
    await HomePage.goBackToHome();
  });

  it('should support iOS pull-to-refresh gesture', async () => {
    // Perform pull-to-refresh action
    await HomePage.pullToRefresh();
    
    // Verify the page is still displayed after refresh
    expect(await HomePage.isHomePageDisplayed()).to.be.true;
  });

  it('should handle iOS swipe gestures', async () => {
    // Navigate to a page with swipeable content
    await HomePage.selectPageControl();
    
    // Verify we're on the page control screen
    const pageControlTitle = await $('//XCUIElementTypeNavigationBar[@name="Page Control"]');
    await pageControlTitle.waitForDisplayed({ timeout: 10000 });
    
    // Test swipe gestures if applicable
    await HomePage.swipeLeft();
    await browser.pause(1000);
    await HomePage.swipeRight();
    
    await HomePage.goBackToHome();
  });

  afterEach(async () => {
    // Ensure we're back on home page after each test
    const isHome = await HomePage.isHomePageDisplayed();
    if (!isHome) {
      await HomePage.goBackToHome();
      await HomePage.waitForHomePageToLoad();
    }
  });
});