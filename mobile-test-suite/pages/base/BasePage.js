class BasePage {
  constructor() {
    this.platform = browser.capabilities.platformName.toLowerCase();
    this.isAndroid = this.platform === 'android';
    this.isIOS = this.platform === 'ios';
  }

  /**
   * Wait for element to be displayed
   * @param {WebdriverIO.Element} element - Element to wait for
   * @param {number} timeout - Timeout in milliseconds
   */
  waitForDisplayed(element, timeout = 30000) {
    element.waitForDisplayed({
      timeout,
      timeoutMsg: `Element not displayed within ${timeout}ms`
    });
  }

  /**
   * Wait for element to be clickable
   * @param {WebdriverIO.Element} element - Element to wait for
   * @param {number} timeout - Timeout in milliseconds
   */
  waitForClickable(element, timeout = 30000) {
    element.waitForClickable({
      timeout,
      timeoutMsg: `Element not clickable within ${timeout}ms`
    });
  }

  /**
   * Safe click with wait
   * @param {WebdriverIO.Element} element - Element to click
   */
  safeClick(element) {
    this.waitForClickable(element);
    element.click();
  }

  /**
   * Safe text input with clear
   * @param {WebdriverIO.Element} element - Input element
   * @param {string} text - Text to input
   */
  safeSetValue(element, text) {
    this.waitForDisplayed(element);
    element.clearValue();
    element.setValue(text);
  }

  /**
   * Scroll to element
   * @param {WebdriverIO.Element} element - Element to scroll to
   */
  scrollToElement(element) {
    element.scrollIntoView();
  }

  /**
   * Swipe down to refresh (pull to refresh)
   */
  pullToRefresh() {
    if (this.isAndroid) {
      browser.touchAction([
        { action: 'press', x: 300, y: 200 },
        { action: 'wait', ms: 1000 },
        { action: 'moveTo', x: 300, y: 600 },
        { action: 'release' }
      ]);
    } else {
      // iOS swipe down
      browser.touchAction([
        { action: 'press', x: 200, y: 200 },
        { action: 'wait', ms: 1000 },
        { action: 'moveTo', x: 200, y: 600 },
        { action: 'release' }
      ]);
    }
  }

  /**
   * Swipe left
   */
  swipeLeft() {
    const screenSize = browser.getWindowSize();
    const startX = screenSize.width * 0.8;
    const endX = screenSize.width * 0.2;
    const y = screenSize.height * 0.5;

    browser.touchAction([
      { action: 'press', x: startX, y: y },
      { action: 'wait', ms: 1000 },
      { action: 'moveTo', x: endX, y: y },
      { action: 'release' }
    ]);
  }

  /**
   * Swipe right
   */
  swipeRight() {
    const screenSize = browser.getWindowSize();
    const startX = screenSize.width * 0.2;
    const endX = screenSize.width * 0.8;
    const y = screenSize.height * 0.5;

    browser.touchAction([
      { action: 'press', x: startX, y: y },
      { action: 'wait', ms: 1000 },
      { action: 'moveTo', x: endX, y: y },
      { action: 'release' }
    ]);
  }

  /**
   * Scroll down
   */
  scrollDown() {
    const screenSize = browser.getWindowSize();
    const startY = screenSize.height * 0.8;
    const endY = screenSize.height * 0.2;
    const x = screenSize.width * 0.5;

    browser.touchAction([
      { action: 'press', x: x, y: startY },
      { action: 'wait', ms: 1000 },
      { action: 'moveTo', x: x, y: endY },
      { action: 'release' }
    ]);
  }

  /**
   * Scroll up
   */
  scrollUp() {
    const screenSize = browser.getWindowSize();
    const startY = screenSize.height * 0.2;
    const endY = screenSize.height * 0.8;
    const x = screenSize.width * 0.5;

    browser.touchAction([
      { action: 'press', x: x, y: startY },
      { action: 'wait', ms: 1000 },
      { action: 'moveTo', x: x, y: endY },
      { action: 'release' }
    ]);
  }

  /**
   * Take screenshot with custom name
   * @param {string} name - Screenshot name
   */
  takeScreenshot(name) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${name}_${timestamp}.png`;
    browser.saveScreenshot(`./screenshots/${filename}`);
    return filename;
  }

  /**
   * Hide keyboard (mobile specific)
   */
  hideKeyboard() {
    if (this.isAndroid) {
      browser.hideKeyboard();
    } else {
      // iOS - tap done button or hide keyboard
      try {
        const doneButton = $('//XCUIElementTypeButton[@name="Done"]');
        if (doneButton.isDisplayed()) {
          doneButton.click();
        } else {
          browser.hideKeyboard();
        }
      } catch (error) {
        console.log('Keyboard hide not needed or failed');
      }
    }
  }

  /**
   * Get platform-specific selector
   * @param {string} androidSelector - Android selector
   * @param {string} iosSelector - iOS selector
   * @returns {string} Platform-appropriate selector
   */
  getPlatformSelector(androidSelector, iosSelector) {
    return this.isAndroid ? androidSelector : iosSelector;
  }

  /**
   * Wait for app to load
   */
  waitForAppToLoad() {
    browser.pause(3000); // Allow app to fully initialize
  }

  /**
   * Navigate back (Android back button or iOS navigation)
   */
  goBack() {
    if (this.isAndroid) {
      browser.back();
    } else {
      // iOS - look for back button
      const backButton = $('//XCUIElementTypeButton[@name="Back"]');
      if (backButton.isDisplayed()) {
        backButton.click();
      }
    }
  }

  /**
   * Check if element exists
   * @param {WebdriverIO.Element} element - Element to check
   * @returns {boolean} True if element exists
   */
  elementExists(element) {
    try {
      return element.isExisting();
    } catch (error) {
      return false;
    }
  }

  /**
   * Get element text safely
   * @param {WebdriverIO.Element} element - Element to get text from
   * @returns {string} Element text or empty string
   */
  getElementText(element) {
    try {
      this.waitForDisplayed(element, 5000);
      return element.getText();
    } catch (error) {
      console.log('Could not get element text:', error.message);
      return '';
    }
  }
}

module.exports = BasePage;