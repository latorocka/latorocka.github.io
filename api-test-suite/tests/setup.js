// Global test setup
const { performance } = require('perf_hooks');

// Extend Jest matchers
expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () => `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
  
  toBeValidEmail(received) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pass = emailRegex.test(received);
    
    if (pass) {
      return {
        message: () => `expected ${received} not to be a valid email`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be a valid email`,
        pass: false,
      };
    }
  },
  
  toBeValidJWT(received) {
    const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
    const pass = jwtRegex.test(received);
    
    if (pass) {
      return {
        message: () => `expected ${received} not to be a valid JWT`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be a valid JWT`,
        pass: false,
      };
    }
  },
  
  toRespondWithin(received, expectedTime) {
    const pass = received <= expectedTime;
    
    if (pass) {
      return {
        message: () => `expected response time ${received}ms not to be within ${expectedTime}ms`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected response time ${received}ms to be within ${expectedTime}ms`,
        pass: false,
      };
    }
  }
});

// Global test configuration
global.testConfig = {
  timeout: 10000,
  retries: 3,
  baseURL: process.env.TEST_BASE_URL || 'http://localhost:3000',
  webSocketURL: process.env.TEST_WS_URL || 'ws://localhost:8080'
};

// Performance monitoring
global.measurePerformance = (fn) => {
  return async (...args) => {
    const start = performance.now();
    const result = await fn(...args);
    const end = performance.now();
    
    result.performanceMetrics = {
      duration: end - start,
      timestamp: Date.now()
    };
    
    return result;
  };
};

// Test data generators
global.generateTestUser = (overrides = {}) => {
  const defaults = {
    name: 'Test User',
    email: `test.${Date.now()}@example.com`,
    role: 'user'
  };
  
  return { ...defaults, ...overrides };
};

global.generateTestUsers = (count = 5) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Test User ${index + 1}`,
    email: `test.user.${index + 1}@example.com`,
    role: index % 2 === 0 ? 'user' : 'admin',
    createdAt: new Date()
  }));
};

// API helpers
global.apiHelpers = {
  async waitForServer(url, timeout = 30000) {
    const start = Date.now();
    
    while (Date.now() - start < timeout) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          return true;
        }
      } catch (error) {
        // Server not ready yet
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    throw new Error(`Server not ready after ${timeout}ms`);
  },
  
  async retryRequest(requestFn, maxRetries = 3) {
    let lastError;
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await requestFn();
      } catch (error) {
        lastError = error;
        
        if (i < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
      }
    }
    
    throw lastError;
  }
};

// Database helpers
global.dbHelpers = {
  async resetDatabase() {
    // Reset mock database state
    // This would typically reset your test database
    console.log('Resetting test database...');
  },
  
  async seedDatabase(data) {
    // Seed database with test data
    console.log('Seeding test database with data:', data);
  }
};

// Logging helpers
global.testLogger = {
  info: (message, data = {}) => {
    if (process.env.NODE_ENV !== 'test' || process.env.VERBOSE_LOGS) {
      console.log(`[TEST INFO] ${message}`, data);
    }
  },
  
  error: (message, error = {}) => {
    console.error(`[TEST ERROR] ${message}`, error);
  },
  
  debug: (message, data = {}) => {
    if (process.env.DEBUG_TESTS) {
      console.debug(`[TEST DEBUG] ${message}`, data);
    }
  }
};

// Cleanup helpers
global.cleanup = {
  handlers: [],
  
  register(handler) {
    this.handlers.push(handler);
  },
  
  async run() {
    for (const handler of this.handlers) {
      try {
        await handler();
      } catch (error) {
        console.error('Cleanup error:', error);
      }
    }
    
    this.handlers = [];
  }
};

// Global error handler for unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Console override for test output
if (process.env.NODE_ENV === 'test' && !process.env.VERBOSE_LOGS) {
  const originalConsoleLog = console.log;
  console.log = (...args) => {
    // Only log if it's a test result or important message
    if (args.some(arg => typeof arg === 'string' && (arg.includes('PASS') || arg.includes('FAIL')))) {
      originalConsoleLog(...args);
    }
  };
}

// Jest hooks
beforeEach(() => {
  // Clear any registered cleanup handlers
  global.cleanup.handlers = [];
  
  // Reset any global state
  global.testLogger.info('Starting test case');
});

afterEach(async () => {
  // Run cleanup handlers
  await global.cleanup.run();
  
  global.testLogger.info('Test case completed');
});

// Global test utilities
global.sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

global.randomString = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

global.randomEmail = () => {
  return `${global.randomString(8)}@${global.randomString(6)}.com`;
};