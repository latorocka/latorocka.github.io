const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // Base URL for the application under test
    baseUrl: 'https://jsonplaceholder.typicode.com',
    
    // Viewport settings
    viewportWidth: 1920,
    viewportHeight: 1080,
    
    // Test settings
    testIsolation: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 30000,
    
    // Retry settings
    retries: {
      runMode: 2,
      openMode: 0
    },
    
    // Video and screenshot settings
    video: true,
    screenshotOnRunFailure: true,
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    
    // Specs and support files
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',
    
    // Environment variables
    env: {
      apiUrl: 'https://jsonplaceholder.typicode.com',
      githubApi: 'https://api.github.com',
      testUser: 'testuser@example.com',
      testPassword: 'testpassword123'
    },
    
    // Browser settings
    chromeWebSecurity: false,
    blockHosts: ['*.google-analytics.com', '*.doubleclick.net'],
    
    // Experimental features
    experimentalStudio: true,
    experimentalWebKitSupport: true,
    
    setupNodeEvents(on, config) {
      // Task definitions
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
        
        getCurrentTimestamp() {
          return new Date().toISOString();
        },
        
        generateTestData() {
          return {
            email: `test${Date.now()}@example.com`,
            username: `user${Date.now()}`,
            password: 'TestPass123!',
            firstName: 'Test',
            lastName: 'User'
          };
        }
      });
      
      // Plugin configurations
      require('cypress-visual-regression/dist/plugin')(on, config);
      
      // Browser launch options
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome') {
          launchOptions.args.push('--disable-dev-shm-usage');
          launchOptions.args.push('--disable-gpu');
          launchOptions.args.push('--no-sandbox');
          launchOptions.args.push('--disable-web-security');
          launchOptions.args.push('--allow-running-insecure-content');
        }
        
        if (browser.name === 'firefox') {
          launchOptions.preferences['dom.ipc.processCount'] = 8;
        }
        
        return launchOptions;
      });
      
      // Environment-specific configuration
      if (config.env.environment === 'staging') {
        config.baseUrl = 'https://staging.example.com';
      } else if (config.env.environment === 'production') {
        config.baseUrl = 'https://www.example.com';
      }
      
      return config;
    },
  },
  
  // Component testing configuration
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/component.js',
  },
  
  // Global configuration
  userAgent: 'Cypress Test Framework v1.0.0',
  
  // Reporting configuration
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'mochawesome',
    mochawesomeReporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true,
      timestamp: 'mmddyyyy_HHMMss'
    }
  }
});