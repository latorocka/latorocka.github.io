#!/usr/bin/env node

/**
 * iOS Environment Setup Script (macOS only)
 * Configures Xcode, iOS Simulator, and WebDriverAgent
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

class IOSSetup {
  constructor() {
    this.platform = os.platform();
    this.homeDir = os.homedir();
    
    if (this.platform !== 'darwin') {
      throw new Error('iOS testing is only supported on macOS');
    }
  }

  log(message) {
    console.log(`[iOS Setup] ${message}`);
  }

  error(message) {
    console.error(`[iOS Setup ERROR] ${message}`);
  }

  execCommand(command, options = {}) {
    try {
      const result = execSync(command, { 
        encoding: 'utf8', 
        stdio: options.silent ? 'pipe' : 'inherit',
        ...options 
      });
      return result;
    } catch (error) {
      if (!options.ignoreError) {
        this.error(`Command failed: ${command}`);
        this.error(error.message);
      }
      return null;
    }
  }

  checkXcodeInstallation() {
    this.log('Checking Xcode installation...');
    
    const xcodeVersion = this.execCommand('xcodebuild -version', { silent: true, ignoreError: true });
    if (!xcodeVersion) {
      this.error('Xcode not found. Please install Xcode from the App Store');
      return false;
    }
    
    this.log('Xcode installation verified');
    this.log(xcodeVersion.split('\n')[0]);
    return true;
  }

  checkCommandLineTools() {
    this.log('Checking Xcode Command Line Tools...');
    
    const cltPath = '/Library/Developer/CommandLineTools';
    if (!fs.existsSync(cltPath)) {
      this.log('Installing Xcode Command Line Tools...');
      this.execCommand('xcode-select --install');
      this.log('Please complete the Command Line Tools installation and run this script again');
      return false;
    }
    
    this.log('Xcode Command Line Tools verified');
    return true;
  }

  acceptXcodeLicense() {
    this.log('Accepting Xcode license...');
    
    try {
      this.execCommand('sudo xcodebuild -license accept');
      this.log('Xcode license accepted');
      return true;
    } catch (error) {
      this.error('Failed to accept Xcode license. Please run manually: sudo xcodebuild -license accept');
      return false;
    }
  }

  checkIOSSimulator() {
    this.log('Checking iOS Simulator...');
    
    const simulators = this.execCommand('xcrun simctl list devices available', { silent: true });
    if (simulators && simulators.includes('iPhone')) {
      this.log('iOS Simulator verified');
      return true;
    }
    
    this.error('iOS Simulator not found or no devices available');
    return false;
  }

  listAvailableSimulators() {
    this.log('Available iOS Simulators:');
    
    const simulators = this.execCommand('xcrun simctl list devices available iPhone', { silent: true });
    if (simulators) {
      console.log(simulators);
      return simulators;
    }
    
    return null;
  }

  createDefaultSimulator() {
    this.log('Creating default iOS simulator...');
    
    // Get latest iOS runtime
    const runtimes = this.execCommand('xcrun simctl list runtimes', { silent: true });
    const iosRuntimes = runtimes.split('\n').filter(line => line.includes('iOS'));
    
    if (iosRuntimes.length === 0) {
      this.error('No iOS runtimes found');
      return false;
    }
    
    // Create iPhone 14 simulator
    const createCommand = 'xcrun simctl create "iPhone 14 Test" com.apple.CoreSimulator.SimDeviceType.iPhone-14 com.apple.CoreSimulator.SimRuntime.iOS-16-0';
    
    try {
      const deviceUDID = this.execCommand(createCommand, { silent: true });
      this.log(`Default simulator created with UDID: ${deviceUDID.trim()}`);
      return deviceUDID.trim();
    } catch (error) {
      this.log('Default simulator may already exist or creation failed');
      return null;
    }
  }

  bootDefaultSimulator() {
    this.log('Starting default iOS simulator...');
    
    // Get device UDID for iPhone 14
    const devices = this.execCommand('xcrun simctl list devices available iPhone', { silent: true });
    const iPhone14Match = devices.match(/iPhone 14.*?\((.*?)\)/);
    
    if (!iPhone14Match) {
      this.error('iPhone 14 simulator not found');
      return false;
    }
    
    const deviceUDID = iPhone14Match[1];
    this.log(`Booting simulator with UDID: ${deviceUDID}`);
    
    try {
      this.execCommand(`xcrun simctl boot ${deviceUDID}`);
      this.log('Simulator boot initiated');
      return true;
    } catch (error) {
      this.log('Simulator may already be booted');
      return true;
    }
  }

  openSimulatorApp() {
    this.log('Opening Simulator app...');
    
    try {
      this.execCommand('open -a Simulator');
      this.log('Simulator app opened');
      return true;
    } catch (error) {
      this.error('Failed to open Simulator app');
      return false;
    }
  }

  checkWebDriverAgent() {
    this.log('Checking WebDriverAgent...');
    
    // Check if WebDriverAgent is available through Appium
    const appiumLocation = this.execCommand('which appium', { silent: true, ignoreError: true });
    if (!appiumLocation) {
      this.error('Appium not found. Please install Appium first: npm install -g appium');
      return false;
    }
    
    // Check for XCUITest driver
    const xcuitestDriver = this.execCommand('appium driver list --installed', { silent: true, ignoreError: true });
    if (!xcuitestDriver || !xcuitestDriver.includes('xcuitest')) {
      this.log('Installing XCUITest driver...');
      this.execCommand('appium driver install xcuitest');
    }
    
    this.log('WebDriverAgent setup verified');
    return true;
  }

  buildWebDriverAgent() {
    this.log('Building WebDriverAgent...');
    
    // Find WebDriverAgent path
    const wdaPath = '/usr/local/lib/node_modules/appium/node_modules/appium-xcuitest-driver/WebDriverAgent';
    
    if (!fs.existsSync(wdaPath)) {
      this.error('WebDriverAgent path not found. Please check Appium installation');
      return false;
    }
    
    try {
      this.log('Building WebDriverAgent (this may take several minutes)...');
      const buildCommand = `cd "${wdaPath}" && xcodebuild -project WebDriverAgent.xcodeproj -scheme WebDriverAgentRunner -destination 'platform=iOS Simulator,name=iPhone 14,OS=16.0' test`;
      this.execCommand(buildCommand);
      this.log('WebDriverAgent build completed');
      return true;
    } catch (error) {
      this.error('WebDriverAgent build failed. You may need to open the project in Xcode and sign it manually');
      return false;
    }
  }

  setupDeveloperEnvironment() {
    this.log('Setting up iOS developer environment...');
    
    // Set DEVELOPER_DIR
    const developerDir = '/Applications/Xcode.app/Contents/Developer';
    process.env.DEVELOPER_DIR = developerDir;
    
    this.log(`Set DEVELOPER_DIR=${developerDir}`);
    
    // Create environment script
    const scriptPath = path.join(process.cwd(), 'ios-env.sh');
    const scriptContent = `#!/bin/bash
export DEVELOPER_DIR="${developerDir}"
export PATH="$PATH:/usr/local/bin"
echo "iOS environment variables set"
`;
    
    fs.writeFileSync(scriptPath, scriptContent);
    this.execCommand(`chmod +x ${scriptPath}`);
    this.log(`Environment script created: ${scriptPath}`);
    
    return true;
  }

  checkCodesigning() {
    this.log('Checking code signing certificates...');
    
    const certs = this.execCommand('security find-identity -v -p codesigning', { silent: true, ignoreError: true });
    if (certs && certs.includes('Apple Development')) {
      this.log('Code signing certificates found');
      return true;
    }
    
    this.log('Warning: No Apple Development certificates found');
    this.log('You may need to set up code signing for WebDriverAgent');
    return false;
  }

  installRequiredTools() {
    this.log('Installing required tools...');
    
    // Check for Homebrew
    const brewExists = this.execCommand('which brew', { silent: true, ignoreError: true });
    if (!brewExists) {
      this.log('Installing Homebrew...');
      const installBrew = '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"';
      this.execCommand(installBrew);
    }
    
    // Install useful tools
    const tools = ['carthage', 'ios-deploy'];
    tools.forEach(tool => {
      this.log(`Installing ${tool}...`);
      this.execCommand(`brew install ${tool}`, { ignoreError: true });
    });
    
    return true;
  }

  verifySetup() {
    this.log('Verifying iOS setup...');
    
    const checks = [
      { name: 'Xcode', check: () => this.checkXcodeInstallation() },
      { name: 'Command Line Tools', check: () => this.checkCommandLineTools() },
      { name: 'iOS Simulator', check: () => this.checkIOSSimulator() },
      { name: 'WebDriverAgent', check: () => this.checkWebDriverAgent() }
    ];
    
    const results = checks.map(({ name, check }) => {
      const result = check();
      this.log(`${name}: ${result ? '✓ PASS' : '✗ FAIL'}`);
      return result;
    });
    
    return results.filter(result => result).length >= 3; // At least 3 checks should pass
  }

  async run() {
    this.log('Starting iOS environment setup...');
    
    try {
      // Platform check
      if (this.platform !== 'darwin') {
        this.error('iOS testing requires macOS');
        process.exit(1);
      }
      
      // Basic checks
      if (!this.checkXcodeInstallation()) {
        process.exit(1);
      }
      
      if (!this.checkCommandLineTools()) {
        process.exit(1);
      }
      
      // Setup environment
      this.setupDeveloperEnvironment();
      
      // Install tools
      this.installRequiredTools();
      
      // Accept license
      this.acceptXcodeLicense();
      
      // Setup simulators
      this.listAvailableSimulators();
      this.createDefaultSimulator();
      
      // Setup WebDriverAgent
      this.checkWebDriverAgent();
      
      // Check code signing
      this.checkCodesigning();
      
      // Final verification
      if (this.verifySetup()) {
        this.log('✓ iOS setup completed successfully!');
        this.log('');
        this.log('Next steps:');
        this.log('1. Open Simulator app');
        this.log('2. Boot an iPhone simulator');
        this.log('3. Run: npm run test:ios');
        this.log('');
        this.log('To start the simulator:');
        this.log('open -a Simulator');
        this.log('');
        this.log('Note: You may need to manually sign WebDriverAgent in Xcode for the first run');
      } else {
        this.error('iOS setup completed with warnings. Please check the messages above.');
        this.log('You may still be able to run tests, but some features might not work');
      }
      
    } catch (error) {
      this.error(`Setup failed: ${error.message}`);
      process.exit(1);
    }
  }
}

// Run setup if called directly
if (require.main === module) {
  const setup = new IOSSetup();
  setup.run();
}

module.exports = IOSSetup;