const { expect } = require('chai');
const BasePage = require('../../pages/base/BasePage');

describe('Cross-Platform - Gesture Tests', () => {
  let basePage;
  
  beforeEach(async () => {
    basePage = new BasePage();
    await basePage.waitForAppToLoad();
  });

  it('should support basic tap gestures', async () => {
    const platform = browser.capabilities.platformName.toLowerCase();
    
    if (platform === 'android') {
      const viewsOption = await $('//android.widget.TextView[@text="Views"]');
      await basePage.safeClick(viewsOption);
      
      const viewsTitle = await $('//android.widget.TextView[@text="Views"]');
      await viewsTitle.waitForDisplayed({ timeout: 10000 });
      expect(await viewsTitle.isDisplayed()).to.be.true;
      
      await browser.back();
    } else {
      const buttonsOption = await $('//XCUIElementTypeCell[@name="Buttons"]');
      await basePage.safeClick(buttonsOption);
      
      const buttonsTitle = await $('//XCUIElementTypeNavigationBar[@name="Buttons"]');
      await buttonsTitle.waitForDisplayed({ timeout: 10000 });
      expect(await buttonsTitle.isDisplayed()).to.be.true;
      
      const backButton = await $('//XCUIElementTypeButton[@name="UICatalog"]');
      if (await backButton.isDisplayed()) {
        await basePage.safeClick(backButton);
      }
    }
  });

  it('should support scroll gestures', async () => {
    // Test scroll down
    await basePage.scrollDown();
    await browser.pause(1000);
    
    // Test scroll up
    await basePage.scrollUp();
    await browser.pause(1000);
    
    // Verify we can still interact with the app
    const platform = browser.capabilities.platformName.toLowerCase();
    if (platform === 'android') {
      const appTitle = await $('//android.widget.TextView[@text="API Demos"]');
      expect(await appTitle.isDisplayed()).to.be.true;
    } else {
      const appTitle = await $('//XCUIElementTypeNavigationBar[@name="UICatalog"]');
      expect(await appTitle.isDisplayed()).to.be.true;
    }
  });

  it('should support swipe gestures', async () => {
    const platform = browser.capabilities.platformName.toLowerCase();
    
    if (platform === 'android') {
      // Navigate to a page with swipeable content
      const viewsOption = await $('//android.widget.TextView[@text="Views"]');
      await basePage.safeClick(viewsOption);
      
      // Test swipe gestures
      await basePage.swipeLeft();
      await browser.pause(1000);
      await basePage.swipeRight();
      
      await browser.back();
    } else {
      // Navigate to a swipeable view
      const pageControlOption = await $('//XCUIElementTypeCell[@name="Page Control"]');
      if (await pageControlOption.isDisplayed()) {
        await basePage.safeClick(pageControlOption);
        
        // Test swipe gestures
        await basePage.swipeLeft();
        await browser.pause(1000);
        await basePage.swipeRight();
        
        const backButton = await $('//XCUIElementTypeButton[@name="UICatalog"]');
        if (await backButton.isDisplayed()) {
          await basePage.safeClick(backButton);
        }
      }
    }
  });

  it('should support pull-to-refresh gesture', async () => {
    // Test pull-to-refresh
    await basePage.pullToRefresh();
    await browser.pause(2000);
    
    // Verify app is still responsive
    const platform = browser.capabilities.platformName.toLowerCase();
    if (platform === 'android') {
      const appTitle = await $('//android.widget.TextView[@text="API Demos"]');
      expect(await appTitle.isDisplayed()).to.be.true;
    } else {
      const appTitle = await $('//XCUIElementTypeNavigationBar[@name="UICatalog"]');
      expect(await appTitle.isDisplayed()).to.be.true;
    }
  });

  it('should handle long press gestures', async () => {
    const platform = browser.capabilities.platformName.toLowerCase();
    
    if (platform === 'android') {
      const viewsOption = await $('//android.widget.TextView[@text="Views"]');
      
      // Perform long press
      await browser.touchAction([
        { action: 'press', element: viewsOption },
        { action: 'wait', ms: 2000 },
        { action: 'release' }
      ]);
      
      await browser.pause(1000);
    } else {
      const buttonsOption = await $('//XCUIElementTypeCell[@name="Buttons"]');
      
      // Perform long press
      await browser.touchAction([
        { action: 'press', element: buttonsOption },
        { action: 'wait', ms: 2000 },
        { action: 'release' }
      ]);
      
      await browser.pause(1000);
    }
  });

  it('should support multi-touch gestures', async () => {
    const screenSize = await browser.getWindowSize();
    const centerX = screenSize.width / 2;
    const centerY = screenSize.height / 2;
    
    // Simulate pinch gesture (zoom out)
    await browser.touchAction([
      { action: 'press', x: centerX - 50, y: centerY },
      { action: 'moveTo', x: centerX - 100, y: centerY },
      { action: 'release' }
    ]);
    
    await browser.touchAction([
      { action: 'press', x: centerX + 50, y: centerY },
      { action: 'moveTo', x: centerX + 100, y: centerY },
      { action: 'release' }
    ]);
    
    await browser.pause(1000);
  });

  it('should handle orientation changes with gestures', async () => {
    // Test in portrait
    await browser.setOrientation('PORTRAIT');
    await basePage.scrollDown();
    await browser.pause(1000);
    
    // Test in landscape
    await browser.setOrientation('LANDSCAPE');
    await basePage.scrollDown();
    await browser.pause(1000);
    
    // Return to portrait
    await browser.setOrientation('PORTRAIT');
  });

  it('should support edge swipes', async () => {
    const screenSize = await browser.getWindowSize();
    
    // Swipe from left edge (Android back gesture on newer versions)
    await browser.touchAction([
      { action: 'press', x: 10, y: screenSize.height / 2 },
      { action: 'moveTo', x: 100, y: screenSize.height / 2 },
      { action: 'release' }
    ]);
    
    await browser.pause(1000);
    
    // Swipe from right edge
    await browser.touchAction([
      { action: 'press', x: screenSize.width - 10, y: screenSize.height / 2 },
      { action: 'moveTo', x: screenSize.width - 100, y: screenSize.height / 2 },
      { action: 'release' }
    ]);
    
    await browser.pause(1000);
  });

  afterEach(async () => {
    // Ensure we're in a stable state
    await browser.setOrientation('PORTRAIT');
    await browser.pause(1000);
  });
});