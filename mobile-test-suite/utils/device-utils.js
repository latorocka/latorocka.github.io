/**
 * Device utilities for mobile test automation
 * Provides platform-agnostic device management and interaction methods
 */

class DeviceUtils {
  constructor() {
    this.platform = browser.capabilities.platformName.toLowerCase();
    this.isAndroid = this.platform === 'android';
    this.isIOS = this.platform === 'ios';
  }

  /**
   * Get device information
   * @returns {Object} Device information
   */
  async getDeviceInfo() {
    const capabilities = browser.capabilities;
    return {
      platform: this.platform,
      deviceName: capabilities['appium:deviceName'] || capabilities.deviceName,
      platformVersion: capabilities['appium:platformVersion'] || capabilities.platformVersion,
      automationName: capabilities['appium:automationName'] || capabilities.automationName,
      orientation: await browser.getOrientation(),
      screenSize: await browser.getWindowSize()
    };
  }

  /**
   * Get platform-specific selector strategy
   * @param {string} androidSelector - Android selector
   * @param {string} iosSelector - iOS selector
   * @returns {string} Platform-appropriate selector
   */
  getPlatformSelector(androidSelector, iosSelector) {
    return this.isAndroid ? androidSelector : iosSelector;
  }

  /**
   * Handle platform-specific back navigation
   */
  async navigateBack() {
    if (this.isAndroid) {
      await browser.back();
    } else {
      // iOS - look for back button
      const backButton = $('//XCUIElementTypeButton[@name="Back"]');
      if (await backButton.isDisplayed()) {
        await backButton.click();
      }
    }
  }

  /**
   * Hide keyboard in a platform-specific way
   */
  async hideKeyboard() {
    try {
      if (this.isAndroid) {
        await browser.hideKeyboard();
      } else {
        // iOS - try different methods
        const doneButton = $('//XCUIElementTypeButton[@name="Done"]');
        if (await doneButton.isDisplayed()) {
          await doneButton.click();
        } else {
          await browser.hideKeyboard();
        }
      }
    } catch (error) {
      console.log('Keyboard hide not needed or failed:', error.message);
    }
  }

  /**
   * Get app version information
   * @returns {string} App version
   */
  async getAppVersion() {
    try {
      if (this.isAndroid) {
        // Android - get version from package info
        const packageInfo = await browser.getCurrentPackage();
        return packageInfo.versionName || 'Unknown';
      } else {
        // iOS - get version from bundle info
        const bundleInfo = await browser.execute('mobile: getBundleInfo');
        return bundleInfo.CFBundleShortVersionString || 'Unknown';
      }
    } catch (error) {
      console.log('Could not retrieve app version:', error.message);
      return 'Unknown';
    }
  }

  /**
   * Take screenshot with device info
   * @param {string} testName - Test name for screenshot
   * @returns {string} Screenshot filename
   */
  async takeScreenshotWithDeviceInfo(testName) {
    const deviceInfo = await this.getDeviceInfo();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${testName}_${deviceInfo.platform}_${deviceInfo.deviceName}_${timestamp}.png`;
    
    await browser.saveScreenshot(`./screenshots/${filename}`);
    
    console.log(`Screenshot saved: ${filename}`);
    console.log(`Device: ${deviceInfo.deviceName} (${deviceInfo.platform} ${deviceInfo.platformVersion})`);
    
    return filename;
  }

  /**
   * Handle app permissions (Android)
   */
  async handleAppPermissions() {
    if (this.isAndroid) {
      try {
        // Look for permission dialogs
        const allowButton = $('//android.widget.Button[@text="Allow"]');
        const okButton = $('//android.widget.Button[@text="OK"]');
        
        if (await allowButton.isDisplayed()) {
          await allowButton.click();
          console.log('Permission allowed');
        }
        
        if (await okButton.isDisplayed()) {
          await okButton.click();
          console.log('Permission dialog dismissed');
        }
      } catch (error) {
        console.log('No permission dialogs found');
      }
    }
  }

  /**
   * Switch to native app context
   */
  async switchToNativeContext() {
    const contexts = await browser.getContexts();
    const nativeContext = contexts.find(context => 
      context.includes('NATIVE_APP') || context === 'NATIVE_APP'
    );
    
    if (nativeContext) {
      await browser.switchContext(nativeContext);
      console.log(`Switched to native context: ${nativeContext}`);
    }
  }

  /**
   * Switch to webview context
   */
  async switchToWebviewContext() {
    const contexts = await browser.getContexts();
    const webviewContext = contexts.find(context => 
      context.includes('WEBVIEW') || context.includes('CHROMIUM')
    );
    
    if (webviewContext) {
      await browser.switchContext(webviewContext);
      console.log(`Switched to webview context: ${webviewContext}`);
    }
  }

  /**
   * Get network connection status (Android)
   * @returns {Object} Network connection info
   */
  async getNetworkConnection() {
    if (this.isAndroid) {
      try {
        const connection = await browser.getNetworkConnection();
        return {
          airplaneMode: !!(connection & 1),
          wifi: !!(connection & 2),
          data: !!(connection & 4)
        };
      } catch (error) {
        console.log('Could not get network connection:', error.message);
        return null;
      }
    }
    return null;
  }

  /**
   * Set network connection (Android)
   * @param {Object} connection - Connection settings
   */
  async setNetworkConnection(connection) {
    if (this.isAndroid) {
      try {
        let value = 0;
        if (connection.airplaneMode) value |= 1;
        if (connection.wifi) value |= 2;
        if (connection.data) value |= 4;
        
        await browser.setNetworkConnection(value);
        console.log('Network connection updated:', connection);
      } catch (error) {
        console.log('Could not set network connection:', error.message);
      }
    }
  }

  /**
   * Get device battery info
   * @returns {Object} Battery information
   */
  async getBatteryInfo() {
    try {
      if (this.isAndroid) {
        const batteryInfo = await browser.execute('mobile: batteryInfo');
        return batteryInfo;
      } else {
        // iOS battery info
        const batteryInfo = await browser.execute('mobile: batteryInfo');
        return batteryInfo;
      }
    } catch (error) {
      console.log('Could not get battery info:', error.message);
      return null;
    }
  }

  /**
   * Install app from file path
   * @param {string} appPath - Path to app file
   */
  async installApp(appPath) {
    try {
      await browser.installApp(appPath);
      console.log(`App installed: ${appPath}`);
    } catch (error) {
      console.log(`App installation failed: ${error.message}`);
    }
  }

  /**
   * Remove app by bundle ID
   * @param {string} bundleId - App bundle identifier
   */
  async removeApp(bundleId) {
    try {
      await browser.removeApp(bundleId);
      console.log(`App removed: ${bundleId}`);
    } catch (error) {
      console.log(`App removal failed: ${error.message}`);
    }
  }

  /**
   * Activate app by bundle ID
   * @param {string} bundleId - App bundle identifier
   */
  async activateApp(bundleId) {
    try {
      await browser.activateApp(bundleId);
      console.log(`App activated: ${bundleId}`);
    } catch (error) {
      console.log(`App activation failed: ${error.message}`);
    }
  }

  /**
   * Terminate app by bundle ID
   * @param {string} bundleId - App bundle identifier
   */
  async terminateApp(bundleId) {
    try {
      await browser.terminateApp(bundleId);
      console.log(`App terminated: ${bundleId}`);
    } catch (error) {
      console.log(`App termination failed: ${error.message}`);
    }
  }

  /**
   * Get app state
   * @param {string} bundleId - App bundle identifier
   * @returns {number} App state code
   */
  async getAppState(bundleId) {
    try {
      const state = await browser.queryAppState(bundleId);
      const stateMap = {
        0: 'not installed',
        1: 'not running',
        2: 'running in background',
        3: 'running in background (suspended)',
        4: 'running in foreground'
      };
      
      console.log(`App state for ${bundleId}: ${stateMap[state] || 'unknown'}`);
      return state;
    } catch (error) {
      console.log(`Could not get app state: ${error.message}`);
      return -1;
    }
  }

  /**
   * Perform shake gesture
   */
  async shakeDevice() {
    try {
      await browser.shake();
      console.log('Device shake performed');
    } catch (error) {
      console.log(`Shake gesture failed: ${error.message}`);
    }
  }

  /**
   * Lock device
   */
  async lockDevice() {
    try {
      await browser.lock();
      console.log('Device locked');
    } catch (error) {
      console.log(`Device lock failed: ${error.message}`);
    }
  }

  /**
   * Unlock device
   */
  async unlockDevice() {
    try {
      await browser.unlock();
      console.log('Device unlocked');
    } catch (error) {
      console.log(`Device unlock failed: ${error.message}`);
    }
  }

  /**
   * Start recording screen
   */
  async startRecording() {
    try {
      await browser.startRecordingScreen();
      console.log('Screen recording started');
    } catch (error) {
      console.log(`Screen recording start failed: ${error.message}`);
    }
  }

  /**
   * Stop recording screen and save
   * @param {string} filename - Output filename
   * @returns {string} Base64 encoded video
   */
  async stopRecording(filename) {
    try {
      const videoBase64 = await browser.stopRecordingScreen();
      
      if (filename) {
        const fs = require('fs');
        const videoBuffer = Buffer.from(videoBase64, 'base64');
        fs.writeFileSync(`./recordings/${filename}`, videoBuffer);
        console.log(`Screen recording saved: ${filename}`);
      }
      
      return videoBase64;
    } catch (error) {
      console.log(`Screen recording stop failed: ${error.message}`);
      return null;
    }
  }
}

module.exports = DeviceUtils;