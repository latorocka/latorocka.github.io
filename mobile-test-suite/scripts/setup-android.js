#!/usr/bin/env node

/**
 * Android Environment Setup Script
 * Configures Android SDK, emulators, and environment variables
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

class AndroidSetup {
  constructor() {
    this.platform = os.platform();
    this.homeDir = os.homedir();
    this.androidHome = process.env.ANDROID_HOME || this.getDefaultAndroidHome();
  }

  getDefaultAndroidHome() {
    switch (this.platform) {
      case 'darwin': // macOS
        return path.join(this.homeDir, 'Library/Android/sdk');
      case 'win32': // Windows
        return path.join(this.homeDir, 'AppData/Local/Android/Sdk');
      default: // Linux
        return path.join(this.homeDir, 'Android/Sdk');
    }
  }

  log(message) {
    console.log(`[Android Setup] ${message}`);
  }

  error(message) {
    console.error(`[Android Setup ERROR] ${message}`);
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

  checkAndroidHome() {
    this.log('Checking Android SDK installation...');
    
    if (!fs.existsSync(this.androidHome)) {
      this.error(`Android SDK not found at: ${this.androidHome}`);
      this.error('Please install Android Studio and set ANDROID_HOME environment variable');
      return false;
    }
    
    this.log(`Android SDK found at: ${this.androidHome}`);
    return true;
  }

  checkJavaInstallation() {
    this.log('Checking Java installation...');
    
    const javaVersion = this.execCommand('java -version', { silent: true, ignoreError: true });
    if (!javaVersion) {
      this.error('Java not found. Please install JDK 8 or 11');
      return false;
    }
    
    this.log('Java installation verified');
    return true;
  }

  setupEnvironmentVariables() {
    this.log('Setting up environment variables...');
    
    const envVars = {
      ANDROID_HOME: this.androidHome,
      ANDROID_SDK_ROOT: this.androidHome,
    };
    
    // Update PATH
    const pathAdditions = [
      path.join(this.androidHome, 'tools'),
      path.join(this.androidHome, 'tools', 'bin'),
      path.join(this.androidHome, 'platform-tools'),
      path.join(this.androidHome, 'emulator')
    ];
    
    const currentPath = process.env.PATH || '';
    const newPath = [...pathAdditions, currentPath].join(path.delimiter);
    
    // Set environment variables for current session
    Object.entries(envVars).forEach(([key, value]) => {
      process.env[key] = value;
      this.log(`Set ${key}=${value}`);
    });
    
    process.env.PATH = newPath;
    
    // Create environment setup script
    this.createEnvironmentScript(envVars, pathAdditions);
  }

  createEnvironmentScript(envVars, pathAdditions) {
    const scriptExtension = this.platform === 'win32' ? 'bat' : 'sh';
    const scriptPath = path.join(process.cwd(), `android-env.${scriptExtension}`);
    
    let scriptContent;
    if (this.platform === 'win32') {
      scriptContent = Object.entries(envVars)
        .map(([key, value]) => `set ${key}=${value}`)
        .join('\n');
      scriptContent += '\n' + pathAdditions
        .map(p => `set PATH=%PATH%;${p}`)
        .join('\n');
    } else {
      scriptContent = Object.entries(envVars)
        .map(([key, value]) => `export ${key}="${value}"`)
        .join('\n');
      scriptContent += '\n' + pathAdditions
        .map(p => `export PATH="$PATH:${p}"`)
        .join('\n');
    }
    
    fs.writeFileSync(scriptPath, scriptContent);
    this.log(`Environment script created: ${scriptPath}`);
    
    if (this.platform !== 'win32') {
      this.execCommand(`chmod +x ${scriptPath}`);
    }
  }

  checkAdbConnection() {
    this.log('Checking ADB connection...');
    
    const adbPath = path.join(this.androidHome, 'platform-tools', 'adb');
    const adbCommand = this.platform === 'win32' ? `${adbPath}.exe` : adbPath;
    
    const devices = this.execCommand(`${adbCommand} devices`, { silent: true });
    if (devices) {
      this.log('ADB connection verified');
      this.log(devices);
      return true;
    }
    
    this.error('ADB connection failed');
    return false;
  }

  listAvailableEmulators() {
    this.log('Checking available Android emulators...');
    
    const emulatorPath = path.join(this.androidHome, 'emulator', 'emulator');
    const emulatorCommand = this.platform === 'win32' ? `${emulatorPath}.exe` : emulatorPath;
    
    const emulators = this.execCommand(`${emulatorCommand} -list-avds`, { silent: true });
    if (emulators && emulators.trim()) {
      this.log('Available emulators:');
      console.log(emulators);
      return emulators.split('\n').filter(e => e.trim());
    }
    
    this.log('No emulators found. Creating default emulator...');
    return this.createDefaultEmulator();
  }

  createDefaultEmulator() {
    this.log('Creating default Android emulator...');
    
    const avdManagerPath = path.join(this.androidHome, 'tools', 'bin', 'avdmanager');
    const avdManagerCommand = this.platform === 'win32' ? `${avdManagerPath}.bat` : avdManagerPath;
    
    // Download system image if needed
    const sdkManagerPath = path.join(this.androidHome, 'tools', 'bin', 'sdkmanager');
    const sdkManagerCommand = this.platform === 'win32' ? `${sdkManagerPath}.bat` : sdkManagerPath;
    
    this.log('Installing system image...');
    this.execCommand(`${sdkManagerCommand} "system-images;android-31;google_apis;x86_64"`);
    
    // Create AVD
    const createAvdCommand = `${avdManagerCommand} create avd -n "Test_Emulator_API_31" -k "system-images;android-31;google_apis;x86_64" --force`;
    this.execCommand(createAvdCommand);
    
    this.log('Default emulator created: Test_Emulator_API_31');
    return ['Test_Emulator_API_31'];
  }

  startDefaultEmulator() {
    this.log('Starting default Android emulator...');
    
    const emulatorPath = path.join(this.androidHome, 'emulator', 'emulator');
    const emulatorCommand = this.platform === 'win32' ? `${emulatorPath}.exe` : emulatorPath;
    
    // Start emulator in background
    const startCommand = `${emulatorCommand} -avd Test_Emulator_API_31 -no-audio -no-window`;
    
    this.log('Starting emulator (this may take a few minutes)...');
    this.log('Command: ' + startCommand);
    this.log('Note: Emulator will start in headless mode');
    
    // Don't wait for emulator to fully start
    this.execCommand(startCommand + ' &', { ignoreError: true });
    
    return true;
  }

  waitForEmulator() {
    this.log('Waiting for emulator to boot...');
    
    const adbPath = path.join(this.androidHome, 'platform-tools', 'adb');
    const adbCommand = this.platform === 'win32' ? `${adbPath}.exe` : adbPath;
    
    let attempts = 0;
    const maxAttempts = 30; // 5 minutes
    
    const checkBoot = () => {
      const bootComplete = this.execCommand(
        `${adbCommand} shell getprop sys.boot_completed`, 
        { silent: true, ignoreError: true }
      );
      
      if (bootComplete && bootComplete.trim() === '1') {
        this.log('Emulator boot completed');
        return true;
      }
      
      attempts++;
      if (attempts >= maxAttempts) {
        this.error('Emulator boot timeout');
        return false;
      }
      
      this.log(`Waiting for emulator... (${attempts}/${maxAttempts})`);
      setTimeout(checkBoot, 10000); // Check every 10 seconds
      return false;
    };
    
    return checkBoot();
  }

  installRequiredPackages() {
    this.log('Installing required Android SDK packages...');
    
    const sdkManagerPath = path.join(this.androidHome, 'tools', 'bin', 'sdkmanager');
    const sdkManagerCommand = this.platform === 'win32' ? `${sdkManagerPath}.bat` : sdkManagerPath;
    
    const packages = [
      'platform-tools',
      'platforms;android-31',
      'platforms;android-30',
      'platforms;android-29',
      'build-tools;31.0.0',
      'build-tools;30.0.3',
      'system-images;android-31;google_apis;x86_64',
      'system-images;android-30;google_apis;x86_64'
    ];
    
    packages.forEach(pkg => {
      this.log(`Installing ${pkg}...`);
      this.execCommand(`${sdkManagerCommand} "${pkg}"`);
    });
  }

  verifySetup() {
    this.log('Verifying Android setup...');
    
    const checks = [
      { name: 'Android SDK', check: () => this.checkAndroidHome() },
      { name: 'Java', check: () => this.checkJavaInstallation() },
      { name: 'ADB', check: () => this.checkAdbConnection() }
    ];
    
    const results = checks.map(({ name, check }) => {
      const result = check();
      this.log(`${name}: ${result ? '✓ PASS' : '✗ FAIL'}`);
      return result;
    });
    
    return results.every(result => result);
  }

  async run() {
    this.log('Starting Android environment setup...');
    
    try {
      // Basic checks
      if (!this.checkJavaInstallation()) {
        process.exit(1);
      }
      
      if (!this.checkAndroidHome()) {
        process.exit(1);
      }
      
      // Setup environment
      this.setupEnvironmentVariables();
      
      // Install packages
      this.installRequiredPackages();
      
      // Setup emulators
      this.listAvailableEmulators();
      
      // Final verification
      if (this.verifySetup()) {
        this.log('✓ Android setup completed successfully!');
        this.log('');
        this.log('Next steps:');
        this.log('1. Start an emulator or connect a physical device');
        this.log('2. Run: npm run test:android');
        this.log('');
        this.log('To start the default emulator:');
        this.log('emulator -avd Test_Emulator_API_31');
      } else {
        this.error('Android setup failed. Please check the errors above.');
        process.exit(1);
      }
      
    } catch (error) {
      this.error(`Setup failed: ${error.message}`);
      process.exit(1);
    }
  }
}

// Run setup if called directly
if (require.main === module) {
  const setup = new AndroidSetup();
  setup.run();
}

module.exports = AndroidSetup;