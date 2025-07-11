const axios = require('axios');

describe('Performance and Load Testing', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com';
  const githubURL = 'https://api.github.com';

  describe('Response Time Tests', () => {
    test('should respond within 2 seconds for single requests', async () => {
      const endpoints = [
        '/users',
        '/posts',
        '/comments',
        '/albums',
        '/photos'
      ];

      for (const endpoint of endpoints) {
        const startTime = Date.now();
        const response = await axios.get(`${baseURL}${endpoint}`);
        const endTime = Date.now();
        
        const responseTime = endTime - startTime;
        expect(response.status).toBe(200);
        expect(responseTime).toBeLessThan(2000);
        
        console.log(`${endpoint}: ${responseTime}ms`);
      }
    });

    test('should maintain consistent response times under repeated requests', async () => {
      const requestCount = 10;
      const responseTimes = [];
      
      for (let i = 0; i < requestCount; i++) {
        const startTime = Date.now();
        const response = await axios.get(`${baseURL}/users`);
        const endTime = Date.now();
        
        expect(response.status).toBe(200);
        responseTimes.push(endTime - startTime);
      }
      
      // Calculate statistics
      const averageTime = responseTimes.reduce((sum, time) => sum + time, 0) / requestCount;
      const maxTime = Math.max(...responseTimes);
      const minTime = Math.min(...responseTimes);
      const variance = responseTimes.reduce((sum, time) => sum + Math.pow(time - averageTime, 2), 0) / requestCount;
      const standardDeviation = Math.sqrt(variance);
      
      // Performance assertions
      expect(averageTime).toBeLessThan(1500);
      expect(maxTime).toBeLessThan(3000);
      expect(standardDeviation).toBeLessThan(500); // Response times should be consistent
      
      console.log(`Performance Stats - Avg: ${averageTime.toFixed(2)}ms, Max: ${maxTime}ms, Min: ${minTime}ms, StdDev: ${standardDeviation.toFixed(2)}ms`);
    });
  });

  describe('Concurrent Request Testing', () => {
    test('should handle 10 concurrent requests efficiently', async () => {
      const concurrentCount = 10;
      const requests = Array(concurrentCount).fill().map((_, index) => 
        axios.get(`${baseURL}/users/${(index % 10) + 1}`)
      );
      
      const startTime = Date.now();
      const responses = await Promise.all(requests);
      const endTime = Date.now();
      
      const totalTime = endTime - startTime;
      
      // Verify all requests succeeded
      responses.forEach((response, index) => {
        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('id');
      });
      
      // Performance assertions
      expect(totalTime).toBeLessThan(5000); // All concurrent requests within 5 seconds
      
      const avgTimePerRequest = totalTime / concurrentCount;
      expect(avgTimePerRequest).toBeLessThan(1000); // Average per request should be reasonable
      
      console.log(`Concurrent Test - Total: ${totalTime}ms, Avg per request: ${avgTimePerRequest.toFixed(2)}ms`);
    });

    test('should handle burst of mixed API calls', async () => {
      const burstRequests = [
        axios.get(`${baseURL}/users`),
        axios.get(`${baseURL}/posts`),
        axios.get(`${githubURL}/users/latorocka`),
        axios.get(`${baseURL}/comments?postId=1`),
        axios.get(`${baseURL}/albums`),
        axios.post(`${baseURL}/posts`, {
          title: 'Performance Test Post',
          body: 'Testing concurrent POST performance',
          userId: 1
        }),
        axios.get(`${baseURL}/users/1`),
        axios.get(`${githubURL}/repos/latorocka/selenium-framework`)
      ];
      
      const startTime = Date.now();
      const responses = await Promise.allSettled(burstRequests);
      const endTime = Date.now();
      
      const totalTime = endTime - startTime;
      const successfulResponses = responses.filter(result => result.status === 'fulfilled');
      const failedResponses = responses.filter(result => result.status === 'rejected');
      
      // Verify most requests succeeded
      expect(successfulResponses.length).toBeGreaterThanOrEqual(6); // At least 75% success rate
      expect(totalTime).toBeLessThan(8000); // Complete within 8 seconds
      
      console.log(`Burst Test - Total: ${totalTime}ms, Successful: ${successfulResponses.length}/${responses.length}, Failed: ${failedResponses.length}`);
    });
  });

  describe('Throughput Testing', () => {
    test('should maintain throughput under sustained load', async () => {
      const duration = 5000; // 5 seconds
      const startTime = Date.now();
      const completedRequests = [];
      let requestCounter = 0;
      
      // Function to make a single request
      const makeRequest = async () => {
        const requestId = ++requestCounter;
        const requestStart = Date.now();
        
        try {
          const response = await axios.get(`${baseURL}/posts/${(requestId % 100) + 1}`);
          const requestEnd = Date.now();
          
          completedRequests.push({
            id: requestId,
            status: response.status,
            duration: requestEnd - requestStart,
            timestamp: requestEnd
          });
        } catch (error) {
          completedRequests.push({
            id: requestId,
            status: error.response?.status || 'error',
            duration: Date.now() - requestStart,
            timestamp: Date.now(),
            error: true
          });
        }
      };
      
      // Generate sustained load
      const loadPromises = [];
      while (Date.now() - startTime < duration) {
        loadPromises.push(makeRequest());
        await new Promise(resolve => setTimeout(resolve, 100)); // 100ms interval between requests
      }
      
      // Wait for all requests to complete
      await Promise.all(loadPromises);
      
      const totalTime = Date.now() - startTime;
      const successfulRequests = completedRequests.filter(req => !req.error && req.status === 200);
      const errorRequests = completedRequests.filter(req => req.error || req.status !== 200);
      
      // Calculate throughput metrics
      const throughput = (successfulRequests.length / totalTime) * 1000; // requests per second
      const errorRate = errorRequests.length / completedRequests.length;
      const avgResponseTime = successfulRequests.reduce((sum, req) => sum + req.duration, 0) / successfulRequests.length;
      
      // Performance assertions
      expect(throughput).toBeGreaterThan(5); // At least 5 requests per second
      expect(errorRate).toBeLessThan(0.1); // Less than 10% error rate
      expect(avgResponseTime).toBeLessThan(2000); // Average response time under 2 seconds
      
      console.log(`Throughput Test - RPS: ${throughput.toFixed(2)}, Error Rate: ${(errorRate * 100).toFixed(2)}%, Avg Response: ${avgResponseTime.toFixed(2)}ms`);
    });
  });

  describe('Scalability Testing', () => {
    test('should scale gracefully with increasing load', async () => {
      const loadLevels = [1, 5, 10, 20]; // Different concurrent request levels
      const results = [];
      
      for (const concurrentRequests of loadLevels) {
        const requests = Array(concurrentRequests).fill().map((_, index) => 
          axios.get(`${baseURL}/users/${(index % 10) + 1}`)
        );
        
        const startTime = Date.now();
        const responses = await Promise.allSettled(requests);
        const endTime = Date.now();
        
        const totalTime = endTime - startTime;
        const successCount = responses.filter(r => r.status === 'fulfilled').length;
        const avgTimePerRequest = totalTime / concurrentRequests;
        
        results.push({
          concurrentRequests,
          totalTime,
          successCount,
          successRate: successCount / concurrentRequests,
          avgTimePerRequest
        });
        
        console.log(`Load Level ${concurrentRequests} - Time: ${totalTime}ms, Success: ${successCount}/${concurrentRequests}, Avg: ${avgTimePerRequest.toFixed(2)}ms`);
      }
      
      // Verify scalability characteristics
      results.forEach(result => {
        expect(result.successRate).toBeGreaterThan(0.8); // At least 80% success rate at all levels
        expect(result.avgTimePerRequest).toBeLessThan(2000); // Reasonable response time scaling
      });
      
      // Check that performance doesn't degrade too severely with load
      const degradationFactor = results[results.length - 1].avgTimePerRequest / results[0].avgTimePerRequest;
      expect(degradationFactor).toBeLessThan(5); // Performance shouldn't degrade more than 5x
    });
  });

  describe('Memory and Resource Usage', () => {
    test('should not cause memory leaks during extended testing', async () => {
      const initialMemory = process.memoryUsage().heapUsed;
      const requestCount = 100;
      
      // Make many requests to test for memory leaks
      for (let i = 0; i < requestCount; i++) {
        await axios.get(`${baseURL}/users/${(i % 10) + 1}`);
        
        // Force garbage collection every 10 requests if available
        if (global.gc && i % 10 === 0) {
          global.gc();
        }
      }
      
      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;
      const memoryIncreasePerRequest = memoryIncrease / requestCount;
      
      // Memory usage should not grow excessively
      expect(memoryIncreasePerRequest).toBeLessThan(10000); // Less than 10KB per request
      
      console.log(`Memory Test - Initial: ${(initialMemory / 1024 / 1024).toFixed(2)}MB, Final: ${(finalMemory / 1024 / 1024).toFixed(2)}MB, Increase: ${(memoryIncrease / 1024).toFixed(2)}KB`);
    });
  });

  describe('API Rate Limiting Behavior', () => {
    test('should respect API rate limits and handle them gracefully', async () => {
      const rapidRequests = Array(50).fill().map((_, index) => 
        axios.get(`${githubURL}/users/latorocka`, {
          timeout: 5000,
          validateStatus: status => status < 500 // Accept rate limit responses
        })
      );
      
      const responses = await Promise.allSettled(rapidRequests);
      const successfulResponses = responses.filter(r => r.status === 'fulfilled' && r.value.status === 200);
      const rateLimitedResponses = responses.filter(r => r.status === 'fulfilled' && r.value.status === 429);
      const errorResponses = responses.filter(r => r.status === 'rejected');
      
      // Verify we get some successful responses
      expect(successfulResponses.length).toBeGreaterThan(0);
      
      // If we hit rate limits, verify they're handled properly
      if (rateLimitedResponses.length > 0) {
        rateLimitedResponses.forEach(response => {
          expect(response.value.status).toBe(429);
          expect(response.value.headers).toHaveProperty('x-ratelimit-remaining');
        });
      }
      
      console.log(`Rate Limit Test - Success: ${successfulResponses.length}, Rate Limited: ${rateLimitedResponses.length}, Errors: ${errorResponses.length}`);
    });
  });
});

module.exports = {
  testPerformance: () => describe('Performance and Load Testing', () => {})
};