/**
 * Test Data Management Utilities
 * Provides test data generation and management for mobile test automation
 */

class TestData {
  constructor() {
    this.testUsers = [
      {
        username: 'testuser1',
        email: 'testuser1@example.com',
        password: 'TestPassword123!',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567890'
      },
      {
        username: 'testuser2', 
        email: 'testuser2@example.com',
        password: 'SecurePass456!',
        firstName: 'Jane',
        lastName: 'Smith',
        phone: '+1987654321'
      }
    ];

    this.testStrings = {
      short: 'Test',
      medium: 'This is a medium length test string',
      long: 'This is a very long test string that contains multiple words and should be used for testing text input fields that have character limits or need to test scrolling behavior',
      emoji: '🎉 Test with emojis 🚀 and special chars!',
      special: 'Test@#$%^&*()_+-=[]{}|;:,.<>?',
      unicode: 'Tëst with ünïcödë chàrâctêrs',
      html: '<script>alert("test")</script>',
      sql: "'; DROP TABLE users; --",
      empty: '',
      whitespace: '   ',
      numbers: '1234567890',
      mixed: 'Test123!@#'
    };

    this.coordinates = {
      center: { x: 0.5, y: 0.5 },
      topLeft: { x: 0.1, y: 0.1 },
      topRight: { x: 0.9, y: 0.1 },
      bottomLeft: { x: 0.1, y: 0.9 },
      bottomRight: { x: 0.9, y: 0.9 },
      leftEdge: { x: 0.01, y: 0.5 },
      rightEdge: { x: 0.99, y: 0.5 },
      topEdge: { x: 0.5, y: 0.01 },
      bottomEdge: { x: 0.5, y: 0.99 }
    };
  }

  /**
   * Get random test user
   * @returns {Object} Random test user object
   */
  getRandomUser() {
    return this.testUsers[Math.floor(Math.random() * this.testUsers.length)];
  }

  /**
   * Get specific test user by index
   * @param {number} index - User index
   * @returns {Object} Test user object
   */
  getUser(index = 0) {
    return this.testUsers[index] || this.testUsers[0];
  }

  /**
   * Generate random email
   * @returns {string} Random email address
   */
  generateRandomEmail() {
    const domains = ['test.com', 'example.org', 'demo.net'];
    const username = 'user' + Math.floor(Math.random() * 10000);
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${username}@${domain}`;
  }

  /**
   * Generate random phone number
   * @returns {string} Random phone number
   */
  generateRandomPhone() {
    const areaCode = Math.floor(Math.random() * 900) + 100;
    const exchange = Math.floor(Math.random() * 900) + 100;
    const number = Math.floor(Math.random() * 9000) + 1000;
    return `+1${areaCode}${exchange}${number}`;
  }

  /**
   * Get test string by type
   * @param {string} type - Type of test string
   * @returns {string} Test string
   */
  getString(type = 'medium') {
    return this.testStrings[type] || this.testStrings.medium;
  }

  /**
   * Get random string of specified length
   * @param {number} length - String length
   * @returns {string} Random string
   */
  getRandomString(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Get coordinate for screen position
   * @param {string} position - Position name
   * @returns {Object} Coordinate object with x, y
   */
  getCoordinate(position = 'center') {
    return this.coordinates[position] || this.coordinates.center;
  }

  /**
   * Convert relative coordinates to absolute
   * @param {Object} relativeCoord - Relative coordinate (0-1)
   * @param {Object} screenSize - Screen size object
   * @returns {Object} Absolute coordinate
   */
  toAbsoluteCoordinate(relativeCoord, screenSize) {
    return {
      x: Math.floor(relativeCoord.x * screenSize.width),
      y: Math.floor(relativeCoord.y * screenSize.height)
    };
  }

  /**
   * Generate test date
   * @param {string} type - Date type (past, future, today)
   * @returns {Date} Test date
   */
  getTestDate(type = 'today') {
    const today = new Date();
    
    switch (type) {
      case 'past':
        return new Date(today.getTime() - (Math.random() * 365 * 24 * 60 * 60 * 1000));
      case 'future':
        return new Date(today.getTime() + (Math.random() * 365 * 24 * 60 * 60 * 1000));
      case 'yesterday':
        return new Date(today.getTime() - (24 * 60 * 60 * 1000));
      case 'tomorrow':
        return new Date(today.getTime() + (24 * 60 * 60 * 1000));
      default:
        return today;
    }
  }

  /**
   * Format date for mobile input
   * @param {Date} date - Date to format
   * @param {string} format - Format type
   * @returns {string} Formatted date string
   */
  formatDate(date, format = 'YYYY-MM-DD') {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    switch (format) {
      case 'MM/DD/YYYY':
        return `${month}/${day}/${year}`;
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`;
      case 'YYYY-MM-DD':
      default:
        return `${year}-${month}-${day}`;
    }
  }

  /**
   * Get test device configurations
   * @returns {Array} Array of device configurations
   */
  getDeviceConfigurations() {
    return [
      {
        platform: 'Android',
        deviceName: 'Pixel 6',
        platformVersion: '12.0',
        orientation: 'PORTRAIT'
      },
      {
        platform: 'Android',
        deviceName: 'Samsung Galaxy S21',
        platformVersion: '11.0',
        orientation: 'LANDSCAPE'
      },
      {
        platform: 'iOS',
        deviceName: 'iPhone 14',
        platformVersion: '16.0',
        orientation: 'PORTRAIT'
      },
      {
        platform: 'iOS',
        deviceName: 'iPhone 13 Pro',
        platformVersion: '15.5',
        orientation: 'LANDSCAPE'
      }
    ];
  }

  /**
   * Get test scenarios for specific features
   * @param {string} feature - Feature name
   * @returns {Array} Array of test scenarios
   */
  getTestScenarios(feature) {
    const scenarios = {
      login: [
        { type: 'valid', username: 'validuser', password: 'validpass', expected: 'success' },
        { type: 'invalid_username', username: 'invalid', password: 'validpass', expected: 'error' },
        { type: 'invalid_password', username: 'validuser', password: 'invalid', expected: 'error' },
        { type: 'empty_fields', username: '', password: '', expected: 'error' }
      ],
      
      form_validation: [
        { field: 'email', value: 'valid@email.com', expected: 'valid' },
        { field: 'email', value: 'invalid-email', expected: 'invalid' },
        { field: 'phone', value: '+1234567890', expected: 'valid' },
        { field: 'phone', value: 'invalid-phone', expected: 'invalid' }
      ],
      
      navigation: [
        { from: 'home', to: 'profile', method: 'tap' },
        { from: 'profile', to: 'settings', method: 'swipe' },
        { from: 'settings', to: 'home', method: 'back_button' }
      ],
      
      gestures: [
        { type: 'tap', target: 'button', expected: 'action_executed' },
        { type: 'long_press', target: 'item', expected: 'context_menu' },
        { type: 'swipe_left', target: 'screen', expected: 'next_page' },
        { type: 'swipe_right', target: 'screen', expected: 'previous_page' },
        { type: 'pinch_zoom', target: 'image', expected: 'zoom_in' }
      ]
    };
    
    return scenarios[feature] || [];
  }

  /**
   * Get performance test parameters
   * @returns {Object} Performance test configuration
   */
  getPerformanceTestParams() {
    return {
      loadTime: {
        maxAcceptable: 5000, // 5 seconds
        target: 3000 // 3 seconds
      },
      navigationTime: {
        maxAcceptable: 2000, // 2 seconds
        target: 1000 // 1 second
      },
      memoryUsage: {
        maxAcceptable: 500, // 500 MB
        target: 200 // 200 MB
      },
      batteryDrain: {
        maxAcceptable: 10, // 10% per hour
        target: 5 // 5% per hour
      }
    };
  }

  /**
   * Generate test report data
   * @param {string} testName - Test name
   * @param {Object} results - Test results
   * @returns {Object} Report data
   */
  generateReportData(testName, results) {
    return {
      testName,
      timestamp: new Date().toISOString(),
      platform: browser.capabilities.platformName,
      deviceName: browser.capabilities['appium:deviceName'] || 'Unknown',
      platformVersion: browser.capabilities['appium:platformVersion'] || 'Unknown',
      results,
      duration: results.endTime - results.startTime,
      status: results.passed ? 'PASSED' : 'FAILED'
    };
  }

  /**
   * Get accessibility test data
   * @returns {Object} Accessibility test parameters
   */
  getAccessibilityTestData() {
    return {
      screenReaderTexts: [
        'Button for navigation',
        'Text input field',
        'Image with description',
        'List item'
      ],
      colorContrasts: [
        { background: '#FFFFFF', foreground: '#000000', ratio: 21 },
        { background: '#000000', foreground: '#FFFFFF', ratio: 21 },
        { background: '#0066CC', foreground: '#FFFFFF', ratio: 7.1 }
      ],
      fontSizes: [
        { size: 'small', minSize: 12 },
        { size: 'medium', minSize: 16 },
        { size: 'large', minSize: 20 }
      ]
    };
  }

  /**
   * Generate random test data based on type
   * @param {string} dataType - Type of data to generate
   * @param {Object} options - Generation options
   * @returns {*} Generated test data
   */
  generateData(dataType, options = {}) {
    switch (dataType) {
      case 'user':
        return {
          username: this.getRandomString(8),
          email: this.generateRandomEmail(),
          password: this.getRandomString(12) + '!1',
          firstName: this.getRandomString(6),
          lastName: this.getRandomString(8),
          phone: this.generateRandomPhone()
        };
      
      case 'address':
        return {
          street: this.getRandomString(10) + ' Street',
          city: this.getRandomString(8),
          state: this.getRandomString(4).toUpperCase(),
          zipCode: Math.floor(Math.random() * 90000) + 10000,
          country: 'USA'
        };
      
      case 'product':
        return {
          name: 'Test Product ' + this.getRandomString(5),
          price: Math.floor(Math.random() * 1000) + 10,
          category: ['Electronics', 'Clothing', 'Books', 'Home'][Math.floor(Math.random() * 4)],
          description: this.getString('medium')
        };
      
      default:
        return this.getRandomString(options.length || 10);
    }
  }
}

module.exports = new TestData();