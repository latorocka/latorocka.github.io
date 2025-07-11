const { expect } = require('chai');
const DeviceUtils = require('../../utils/device-utils');

describe('Cross-Platform - Performance Tests', () => {
  let deviceUtils;
  
  beforeEach(async () => {
    deviceUtils = new DeviceUtils();
    await deviceUtils.switchToNativeContext();
  });

  it('should measure app launch time', async () => {
    const startTime = Date.now();
    
    // Wait for app to fully load
    const platform = browser.capabilities.platformName.toLowerCase();
    if (platform === 'android') {
      const appTitle = await $('//android.widget.TextView[@text="API Demos"]');
      await appTitle.waitForDisplayed({ timeout: 30000 });
    } else {
      const appTitle = await $('//XCUIElementTypeNavigationBar[@name="UICatalog"]');
      await appTitle.waitForDisplayed({ timeout: 30000 });
    }
    
    const endTime = Date.now();
    const launchTime = endTime - startTime;
    
    console.log(`App launch time: ${launchTime}ms`);
    expect(launchTime).to.be.below(30000); // App should launch within 30 seconds
  });

  it('should measure navigation performance', async () => {
    const platform = browser.capabilities.platformName.toLowerCase();
    
    const startTime = Date.now();
    
    if (platform === 'android') {
      const viewsOption = await $('//android.widget.TextView[@text="Views"]');
      await viewsOption.click();
      
      const viewsTitle = await $('//android.widget.TextView[@text="Views"]');
      await viewsTitle.waitForDisplayed({ timeout: 10000 });
    } else {
      const buttonsOption = await $('//XCUIElementTypeCell[@name="Buttons"]');
      await buttonsOption.click();
      
      const buttonsTitle = await $('//XCUIElementTypeNavigationBar[@name="Buttons"]');
      await buttonsTitle.waitForDisplayed({ timeout: 10000 });
    }
    
    const endTime = Date.now();
    const navigationTime = endTime - startTime;
    
    console.log(`Navigation time: ${navigationTime}ms`);
    expect(navigationTime).to.be.below(5000); // Navigation should complete within 5 seconds
    
    // Navigate back
    await deviceUtils.navigateBack();
  });

  it('should measure scroll performance', async () => {
    const startTime = Date.now();
    
    // Perform multiple scroll operations
    for (let i = 0; i < 5; i++) {
      await browser.pause(200);
      
      const scrollStart = Date.now();
      
      // Scroll down
      const screenSize = await browser.getWindowSize();
      await browser.touchAction([
        { action: 'press', x: screenSize.width / 2, y: screenSize.height * 0.8 },
        { action: 'moveTo', x: screenSize.width / 2, y: screenSize.height * 0.2 },
        { action: 'release' }
      ]);
      
      const scrollEnd = Date.now();
      const scrollTime = scrollEnd - scrollStart;
      
      console.log(`Scroll ${i + 1} time: ${scrollTime}ms`);
      expect(scrollTime).to.be.below(1000); // Each scroll should complete within 1 second
    }
    
    const totalTime = Date.now() - startTime;
    console.log(`Total scroll performance test time: ${totalTime}ms`);
  });

  it('should measure memory usage', async () => {
    // Get initial memory info
    const deviceInfo = await deviceUtils.getDeviceInfo();
    console.log('Device info:', deviceInfo);
    
    // Perform memory-intensive operations
    const platform = browser.capabilities.platformName.toLowerCase();
    
    for (let i = 0; i < 3; i++) {
      if (platform === 'android') {
        const viewsOption = await $('//android.widget.TextView[@text="Views"]');
        await viewsOption.click();
        await browser.back();
      } else {
        const buttonsOption = await $('//XCUIElementTypeCell[@name="Buttons"]');
        await buttonsOption.click();
        await deviceUtils.navigateBack();
      }
      
      await browser.pause(1000);
    }
    
    // Memory usage should remain stable (this is a basic check)
    const finalInfo = await deviceUtils.getDeviceInfo();
    expect(finalInfo).to.be.an('object');
  });

  it('should measure battery impact', async () => {
    const batteryInfo = await deviceUtils.getBatteryInfo();
    
    if (batteryInfo) {
      console.log('Battery info:', batteryInfo);
      
      // Perform operations that might impact battery
      const platform = browser.capabilities.platformName.toLowerCase();
      
      for (let i = 0; i < 10; i++) {
        if (platform === 'android') {
          const option = await $('//android.widget.TextView[@text="Graphics"]');
          await option.click();
          await browser.back();
        } else {
          const option = await $('//XCUIElementTypeCell[@name="Image View"]');
          if (await option.isDisplayed()) {
            await option.click();
            await deviceUtils.navigateBack();
          }
        }
        
        await browser.pause(500);
      }
      
      const finalBatteryInfo = await deviceUtils.getBatteryInfo();
      if (finalBatteryInfo) {
        console.log('Final battery info:', finalBatteryInfo);
      }
    } else {
      console.log('Battery info not available on this device/emulator');
    }
  });

  it('should measure network performance', async () => {
    const networkInfo = await deviceUtils.getNetworkConnection();
    
    if (networkInfo) {
      console.log('Network connection:', networkInfo);
      
      // Test with different network conditions (Android only)
      if (deviceUtils.isAndroid) {
        // Disable WiFi temporarily
        await deviceUtils.setNetworkConnection({
          airplaneMode: false,
          wifi: false,
          data: true
        });
        
        await browser.pause(2000);
        
        // Re-enable WiFi
        await deviceUtils.setNetworkConnection({
          airplaneMode: false,
          wifi: true,
          data: true
        });
        
        const finalNetworkInfo = await deviceUtils.getNetworkConnection();
        console.log('Final network connection:', finalNetworkInfo);
        expect(finalNetworkInfo.wifi).to.be.true;
      }
    } else {
      console.log('Network control not available on this platform');
    }
  });

  it('should handle performance under load', async () => {
    const startTime = Date.now();
    
    // Simulate heavy usage
    const platform = browser.capabilities.platformName.toLowerCase();
    
    const operations = [];
    for (let i = 0; i < 20; i++) {
      operations.push(async () => {
        if (platform === 'android') {
          const options = await $$('//android.widget.TextView[contains(@text, "")]');
          if (options.length > 0) {
            const randomOption = options[Math.floor(Math.random() * Math.min(options.length, 5))];
            try {
              if (await randomOption.isDisplayed()) {
                await randomOption.click();
                await browser.pause(200);
                await browser.back();
              }
            } catch (error) {
              // Ignore errors for this stress test
            }
          }
        } else {
          const options = await $$('//XCUIElementTypeCell');
          if (options.length > 0) {
            const randomOption = options[Math.floor(Math.random() * Math.min(options.length, 5))];
            try {
              if (await randomOption.isDisplayed()) {
                await randomOption.click();
                await browser.pause(200);
                await deviceUtils.navigateBack();
              }
            } catch (error) {
              // Ignore errors for this stress test
            }
          }
        }
      });
    }
    
    // Execute operations with some concurrency
    for (let i = 0; i < operations.length; i += 3) {
      const batch = operations.slice(i, i + 3);
      await Promise.all(batch.map(op => op()));
    }
    
    const totalTime = Date.now() - startTime;
    console.log(`Performance under load test completed in: ${totalTime}ms`);
    
    // App should still be responsive
    if (platform === 'android') {
      const appTitle = await $('//android.widget.TextView[@text="API Demos"]');
      expect(await appTitle.isDisplayed()).to.be.true;
    } else {
      const appTitle = await $('//XCUIElementTypeNavigationBar[@name="UICatalog"]');
      expect(await appTitle.isDisplayed()).to.be.true;
    }
  });

  it('should measure orientation change performance', async () => {
    const orientations = ['PORTRAIT', 'LANDSCAPE'];
    
    for (const orientation of orientations) {
      const startTime = Date.now();
      
      await browser.setOrientation(orientation);
      
      // Wait for UI to adjust
      await browser.pause(2000);
      
      const endTime = Date.now();
      const orientationTime = endTime - startTime;
      
      console.log(`Orientation change to ${orientation}: ${orientationTime}ms`);
      expect(orientationTime).to.be.below(5000); // Orientation change should complete within 5 seconds
      
      // Verify app is still functional
      const platform = browser.capabilities.platformName.toLowerCase();
      if (platform === 'android') {
        const appTitle = await $('//android.widget.TextView[@text="API Demos"]');
        expect(await appTitle.isDisplayed()).to.be.true;
      } else {
        const appTitle = await $('//XCUIElementTypeNavigationBar[@name="UICatalog"]');
        expect(await appTitle.isDisplayed()).to.be.true;
      }
    }
    
    // Return to portrait
    await browser.setOrientation('PORTRAIT');
  });

  afterEach(async () => {
    // Cleanup: ensure we're in a stable state
    await browser.setOrientation('PORTRAIT');
    
    // Reset network if modified (Android)
    if (deviceUtils.isAndroid) {
      await deviceUtils.setNetworkConnection({
        airplaneMode: false,
        wifi: true,
        data: true
      });
    }
  });
});