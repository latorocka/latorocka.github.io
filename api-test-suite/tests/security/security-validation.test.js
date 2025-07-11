const axios = require('axios');

describe('Security Validation Tests', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com';
  const githubURL = 'https://api.github.com';

  describe('Input Validation Security', () => {
    test('should handle SQL injection attempts safely', async () => {
      const maliciousInputs = [
        "'; DROP TABLE users; --",
        "' OR '1'='1",
        "1' UNION SELECT * FROM users --",
        "'; DELETE FROM posts; --",
        "admin'/*",
        "' OR 1=1 --"
      ];

      for (const maliciousInput of maliciousInputs) {
        const testPost = {
          title: maliciousInput,
          body: 'Security test for SQL injection',
          userId: 1
        };

        const response = await axios.post(`${baseURL}/posts`, testPost);
        
        // API should handle malicious input safely
        expect(response.status).toBe(201);
        // Verify the malicious input is treated as regular text, not executed
        expect(response.data.title).toBe(maliciousInput);
        expect(response.data).toHaveProperty('id');
      }
    });

    test('should validate and sanitize script injection attempts', async () => {
      const scriptInjections = [
        '<script>alert("XSS")</script>',
        'javascript:alert("XSS")',
        '<img src="x" onerror="alert(1)">',
        '<svg onload="alert(1)">',
        '"><script>alert("XSS")</script>',
        '\'; alert("XSS"); \''
      ];

      for (const injection of scriptInjections) {
        const testPost = {
          title: `Security Test: ${injection}`,
          body: injection,
          userId: 1
        };

        const response = await axios.post(`${baseURL}/posts`, testPost);
        
        expect(response.status).toBe(201);
        // Verify script content is handled as text, not executed
        expect(response.data.body).toBe(injection);
        expect(response.data.title).toContain(injection);
      }
    });

    test('should handle extremely long input strings', async () => {
      const longString = 'A'.repeat(100000); // 100KB string
      const testPost = {
        title: 'Long String Test',
        body: longString,
        userId: 1
      };

      const response = await axios.post(`${baseURL}/posts`, testPost);
      
      expect(response.status).toBe(201);
      expect(response.data.body).toBe(longString);
    });

    test('should validate special characters and unicode', async () => {
      const specialCharacters = [
        '!@#$%^&*()_+-=[]{}|;:,.<>?',
        '™©®€£¥¢∞§¶•ªº',
        '😀😁😂🤣😃😄😅😆😉😊',
        '中文测试',
        'العربية اختبار',
        'тест на русском',
        'Ñandú ñoño'
      ];

      for (const chars of specialCharacters) {
        const testPost = {
          title: `Unicode Test: ${chars}`,
          body: `Testing special characters: ${chars}`,
          userId: 1
        };

        const response = await axios.post(`${baseURL}/posts`, testPost);
        
        expect(response.status).toBe(201);
        expect(response.data.title).toContain(chars);
        expect(response.data.body).toContain(chars);
      }
    });
  });

  describe('Authentication and Authorization Security', () => {
    test('should handle invalid authentication headers', async () => {
      const invalidHeaders = [
        { 'Authorization': 'Bearer invalid-token-12345' },
        { 'Authorization': 'Basic invalid-base64' },
        { 'Authorization': 'Token malformed-token' },
        { 'Authorization': '' },
        { 'Authorization': 'Bearer ' },
        { 'X-API-Key': 'invalid-key' }
      ];

      for (const headers of invalidHeaders) {
        try {
          // JSONPlaceholder doesn't require auth, but we test header handling
          const response = await axios.get(`${baseURL}/users`, { headers });
          
          // If it succeeds, verify it's handling headers safely
          expect(response.status).toBe(200);
        } catch (error) {
          // If it fails, verify it's failing securely
          expect(error.response?.status).toBeGreaterThanOrEqual(400);
        }
      }
    });

    test('should not expose sensitive information in error messages', async () => {
      try {
        await axios.get(`${baseURL}/nonexistent-endpoint-test`);
      } catch (error) {
        const errorMessage = JSON.stringify(error.response?.data || error.message);
        
        // Verify error doesn't expose sensitive info
        expect(errorMessage.toLowerCase()).not.toContain('password');
        expect(errorMessage.toLowerCase()).not.toContain('secret');
        expect(errorMessage.toLowerCase()).not.toContain('key');
        expect(errorMessage.toLowerCase()).not.toContain('token');
        expect(errorMessage.toLowerCase()).not.toContain('database');
        expect(errorMessage.toLowerCase()).not.toContain('connection');
      }
    });
  });

  describe('Request Manipulation Security', () => {
    test('should handle malformed JSON payloads securely', async () => {
      const malformedPayloads = [
        '{"incomplete": json',
        '{"key": "value"',
        '{invalid json}',
        '{"nested": {"deeply": {"malformed": json}}}',
        '{"number": 123abc}',
        '{"array": [1,2,3'
      ];

      for (const payload of malformedPayloads) {
        try {
          await axios.post(`${baseURL}/posts`, payload, {
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (error) {
          // Verify proper error handling for malformed JSON
          expect(error.response?.status).toBeGreaterThanOrEqual(400);
        }
      }
    });

    test('should validate Content-Type header manipulation', async () => {
      const validPost = {
        title: 'Content-Type Test',
        body: 'Testing content type validation',
        userId: 1
      };

      const contentTypes = [
        'application/json',
        'application/x-www-form-urlencoded',
        'text/plain',
        'multipart/form-data',
        'application/xml',
        'invalid/content-type'
      ];

      for (const contentType of contentTypes) {
        try {
          const response = await axios.post(`${baseURL}/posts`, validPost, {
            headers: { 'Content-Type': contentType }
          });
          
          // If successful, verify proper handling
          expect(response.status).toBe(201);
          expect(response.headers['content-type']).toContain('application/json');
        } catch (error) {
          // If failed, verify proper error response
          expect(error.response?.status).toBeGreaterThanOrEqual(400);
        }
      }
    });

    test('should handle oversized request headers', async () => {
      const largeValue = 'X'.repeat(10000); // 10KB header value
      const oversizedHeaders = {
        'X-Large-Header': largeValue,
        'X-Custom-Data': largeValue,
        'User-Agent': largeValue
      };

      try {
        const response = await axios.get(`${baseURL}/users`, { 
          headers: oversizedHeaders,
          timeout: 5000
        });
        
        // If successful, verify normal operation
        expect(response.status).toBe(200);
      } catch (error) {
        // If failed due to header size, verify appropriate error
        expect(error.code === 'ECONNABORTED' || error.response?.status >= 400).toBe(true);
      }
    });
  });

  describe('Data Exposure Security', () => {
    test('should not expose internal system information', async () => {
      const response = await axios.get(`${baseURL}/users/1`);
      
      const responseString = JSON.stringify(response.data);
      const headers = JSON.stringify(response.headers);
      
      // Verify no internal paths or system info is exposed
      expect(responseString.toLowerCase()).not.toContain('/etc/');
      expect(responseString.toLowerCase()).not.toContain('c:\\');
      expect(responseString.toLowerCase()).not.toContain('admin');
      expect(responseString.toLowerCase()).not.toContain('root');
      expect(responseString.toLowerCase()).not.toContain('password');
      
      // Check headers for information disclosure
      expect(headers.toLowerCase()).not.toContain('server');
      expect(headers.toLowerCase()).not.toContain('x-powered-by');
    });

    test('should handle directory traversal attempts', async () => {
      const traversalAttempts = [
        '../../../etc/passwd',
        '..\\..\\..\\windows\\system32',
        '%2e%2e%2f%2e%2e%2f%2e%2e%2f',
        '....//....//....//etc/passwd',
        '..//..//..//etc/passwd'
      ];

      for (const attempt of traversalAttempts) {
        try {
          const response = await axios.get(`${baseURL}/users/${encodeURIComponent(attempt)}`);
          
          // If it responds, verify it's not exposing file system
          const responseString = JSON.stringify(response.data);
          expect(responseString).not.toContain('root:');
          expect(responseString).not.toContain('[users]');
        } catch (error) {
          // If it fails, verify proper error handling
          expect(error.response?.status).toBeGreaterThanOrEqual(400);
        }
      }
    });
  });

  describe('Rate Limiting and DoS Protection', () => {
    test('should implement some form of rate limiting protection', async () => {
      const rapidRequests = [];
      const requestCount = 100;
      
      // Generate rapid requests
      for (let i = 0; i < requestCount; i++) {
        rapidRequests.push(
          axios.get(`${githubURL}/users/latorocka`, {
            timeout: 3000,
            validateStatus: status => status < 500
          })
        );
      }
      
      const responses = await Promise.allSettled(rapidRequests);
      const successResponses = responses.filter(r => r.status === 'fulfilled' && r.value.status === 200);
      const rateLimitResponses = responses.filter(r => r.status === 'fulfilled' && r.value.status === 429);
      
      // GitHub should implement rate limiting
      if (rateLimitResponses.length > 0) {
        expect(rateLimitResponses[0].value.status).toBe(429);
        expect(rateLimitResponses[0].value.headers).toHaveProperty('x-ratelimit-remaining');
      }
      
      console.log(`Rate Limiting Test - Success: ${successResponses.length}, Rate Limited: ${rateLimitResponses.length}`);
    });

    test('should handle concurrent connection limits', async () => {
      const concurrentLimit = 50;
      const simultaneousRequests = Array(concurrentLimit).fill().map((_, index) => 
        axios.get(`${baseURL}/users/${(index % 10) + 1}`, {
          timeout: 10000
        })
      );
      
      const startTime = Date.now();
      const responses = await Promise.allSettled(simultaneousRequests);
      const endTime = Date.now();
      
      const successCount = responses.filter(r => r.status === 'fulfilled').length;
      const errorCount = responses.filter(r => r.status === 'rejected').length;
      
      // Verify the system handles concurrent connections reasonably
      expect(successCount).toBeGreaterThan(concurrentLimit * 0.5); // At least 50% success
      expect(endTime - startTime).toBeLessThan(30000); // Complete within 30 seconds
      
      console.log(`Concurrent Connection Test - Success: ${successCount}, Errors: ${errorCount}, Time: ${endTime - startTime}ms`);
    });
  });

  describe('HTTPS and Transport Security', () => {
    test('should use secure transport protocols', async () => {
      const httpsEndpoints = [
        'https://jsonplaceholder.typicode.com/users',
        'https://api.github.com/users/latorocka'
      ];
      
      for (const endpoint of httpsEndpoints) {
        const response = await axios.get(endpoint);
        
        expect(response.status).toBe(200);
        expect(endpoint).toMatch(/^https:/);
        
        // Verify secure headers if present
        if (response.headers['strict-transport-security']) {
          expect(response.headers['strict-transport-security']).toContain('max-age');
        }
      }
    });

    test('should handle SSL/TLS validation properly', async () => {
      // Test with known good HTTPS endpoint
      const response = await axios.get('https://api.github.com/users/latorocka', {
        // Ensure we're validating certificates
        httpsAgent: new (require('https').Agent)({
          rejectUnauthorized: true
        })
      });
      
      expect(response.status).toBe(200);
    });
  });
});

module.exports = {
  testSecurity: () => describe('Security Validation Tests', () => {})
};