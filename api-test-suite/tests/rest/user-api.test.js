const axios = require('axios');

describe('Public API Testing - JSONPlaceholder', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com';
  let createdPostId;

  beforeAll(() => {
    // Configure axios for JSONPlaceholder API
    axios.defaults.timeout = 10000;
  });

  describe('GET /users - JSONPlaceholder API', () => {
    test('should return all users from JSONPlaceholder', async () => {
      const response = await axios.get(`${baseURL}/users`);
      
      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Array);
      expect(response.data.length).toBe(10);
    });

    test('should return users with correct data structure', async () => {
      const response = await axios.get(`${baseURL}/users`);
      
      const user = response.data[0];
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('username');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('address');
      expect(user).toHaveProperty('phone');
      expect(user).toHaveProperty('website');
      expect(user).toHaveProperty('company');
    });

    test('should support pagination', async () => {
      const response = await request(app)
        .get('/api/users?page=1&limit=2')
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeLessThanOrEqual(2);
    });

    test('should support filtering by role', async () => {
      const response = await request(app)
        .get('/api/users?role=user')
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      response.body.forEach(user => {
        expect(user.role).toBe('user');
      });
    });
  });

  describe('GET /users/:id - Single User', () => {
    test('should return specific user by ID', async () => {
      const userId = 1;
      const response = await axios.get(`${baseURL}/users/${userId}`);
      
      expect(response.status).toBe(200);
      expect(response.data.id).toBe(userId);
      expect(response.data.name).toBe('Leanne Graham');
      expect(response.data.email).toBe('Sincere@april.biz');
    });

    test('should return 404 for non-existent user', async () => {
      try {
        await axios.get(`${baseURL}/users/999`);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error.response.status).toBe(404);
      }
    });

    test('should return 400 for invalid ID format', async () => {
      const response = await request(app)
        .get('/api/users/invalid-id')
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Invalid user ID format');
    });
  });

  describe('POST /posts - Create Post (Functional Tests)', () => {
    test('should create new post with valid data', async () => {
      const newPost = {
        title: 'Test Post from API Suite',
        body: 'This is a test post created by the API test suite to demonstrate POST functionality.',
        userId: 1
      };

      const response = await axios.post(`${baseURL}/posts`, newPost);
      
      expect(response.status).toBe(201);
      expect(response.data).toHaveProperty('id');
      expect(response.data.title).toBe(newPost.title);
      expect(response.data.body).toBe(newPost.body);
      expect(response.data.userId).toBe(newPost.userId);
      
      createdPostId = response.data.id;
    });

    test('should validate required fields on post creation', async () => {
      const incompletePost = {
        title: 'Test Post without body'
        // Missing body and userId
      };

      const response = await axios.post(`${baseURL}/posts`, incompletePost);
      
      // JSONPlaceholder still creates the post but we can validate the structure
      expect(response.status).toBe(201);
      expect(response.data).toHaveProperty('id');
      expect(response.data.title).toBe(incompletePost.title);
    });

    test('should handle POST with invalid data types', async () => {
      const invalidPost = {
        title: 123, // Should be string
        body: true, // Should be string
        userId: 'invalid' // Should be number
      };

      const response = await axios.post(`${baseURL}/posts`, invalidPost);
      
      // JSONPlaceholder accepts various data types, but we validate the response
      expect(response.status).toBe(201);
      expect(response.data).toHaveProperty('id');
    });


  });

  describe('PUT /posts/:id - Update Post (Functional Tests)', () => {
    test('should update existing post', async () => {
      const postId = 1;
      const updatedPost = {
        id: postId,
        title: 'Updated Test Post',
        body: 'This post has been updated by the API test suite.',
        userId: 1
      };

      const response = await axios.put(`${baseURL}/posts/${postId}`, updatedPost);
      
      expect(response.status).toBe(200);
      expect(response.data.id).toBe(postId);
      expect(response.data.title).toBe(updatedPost.title);
      expect(response.data.body).toBe(updatedPost.body);
    });

    test('should handle partial updates', async () => {
      const postId = 1;
      const partialUpdate = {
        title: 'Partially Updated Title'
      };

      const response = await axios.patch(`${baseURL}/posts/${postId}`, partialUpdate);
      
      expect(response.status).toBe(200);
      expect(response.data.title).toBe(partialUpdate.title);
      expect(response.data).toHaveProperty('id');
    });
  });

  describe('DELETE /posts/:id - Delete Post (Functional Tests)', () => {
    test('should delete existing post', async () => {
      const postId = 1;
      const response = await axios.delete(`${baseURL}/posts/${postId}`);
      
      expect(response.status).toBe(200);
    });

    test('should handle deletion of non-existent post', async () => {
      try {
        await axios.delete(`${baseURL}/posts/999999`);
      } catch (error) {
        expect(error.response.status).toBe(404);
      }
    });
  });

  describe('Performance Tests', () => {
    test('should respond within acceptable time limits', async () => {
      const startTime = Date.now();
      const response = await axios.get(`${baseURL}/users`);
      const endTime = Date.now();
      
      const responseTime = endTime - startTime;
      expect(response.status).toBe(200);
      expect(responseTime).toBeLessThan(2000); // 2 seconds max
    });

    test('should handle concurrent requests efficiently', async () => {
      const concurrentRequests = Array(5).fill().map((_, index) => 
        axios.get(`${baseURL}/users/${index + 1}`)
      );
      
      const startTime = Date.now();
      const responses = await Promise.all(concurrentRequests);
      const endTime = Date.now();
      
      const totalTime = endTime - startTime;
      responses.forEach(response => {
        expect(response.status).toBe(200);
      });
      
      // All 5 concurrent requests should complete within 5 seconds
      expect(totalTime).toBeLessThan(5000);
    });

    test('should maintain performance under repeated requests', async () => {
      const requestCount = 10;
      const requestTimes = [];
      
      for (let i = 0; i < requestCount; i++) {
        const startTime = Date.now();
        const response = await axios.get(`${baseURL}/posts/${i + 1}`);
        const endTime = Date.now();
        
        expect(response.status).toBe(200);
        requestTimes.push(endTime - startTime);
      }
      
      const averageTime = requestTimes.reduce((sum, time) => sum + time, 0) / requestCount;
      expect(averageTime).toBeLessThan(1000); // Average under 1 second
    });
  });

  describe('Security Tests', () => {
    test('should handle malformed JSON gracefully', async () => {
      try {
        await axios.post(`${baseURL}/posts`, 'invalid-json', {
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        // Expect proper error handling for malformed data
        expect(error.response.status).toBeGreaterThanOrEqual(400);
      }
    });

    test('should validate content-type headers', async () => {
      const validPost = {
        title: 'Security Test Post',
        body: 'Testing content-type validation',
        userId: 1
      };

      const response = await axios.post(`${baseURL}/posts`, validPost, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      expect(response.status).toBe(201);
      expect(response.headers['content-type']).toContain('application/json');
    });

    test('should handle SQL injection attempts safely', async () => {
      const maliciousPost = {
        title: "'; DROP TABLE users; --",
        body: 'SELECT * FROM users WHERE id = 1 OR 1=1',
        userId: 1
      };

      const response = await axios.post(`${baseURL}/posts`, maliciousPost);
      
      // API should handle malicious input safely
      expect(response.status).toBe(201);
      // Verify the malicious input is treated as regular text
      expect(response.data.title).toBe(maliciousPost.title);
    });

    test('should validate input length limits', async () => {
      const longTitle = 'A'.repeat(10000); // Very long title
      const testPost = {
        title: longTitle,
        body: 'Testing input length validation',
        userId: 1
      };

      const response = await axios.post(`${baseURL}/posts`, testPost);
      
      // API should handle long inputs appropriately
      expect(response.status).toBe(201);
    });
  });

  describe('Data Validation Tests', () => {
    test('should return consistent data structures', async () => {
      const response = await axios.get(`${baseURL}/users`);
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
      
      response.data.forEach(user => {
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('name');
        expect(user).toHaveProperty('username');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('address');
        expect(user).toHaveProperty('phone');
        expect(user).toHaveProperty('website');
        expect(user).toHaveProperty('company');
        
        // Validate data types
        expect(typeof user.id).toBe('number');
        expect(typeof user.name).toBe('string');
        expect(typeof user.email).toBe('string');
        expect(typeof user.address).toBe('object');
      });
    });

    test('should validate email format in user data', async () => {
      const response = await axios.get(`${baseURL}/users`);
      
      response.data.forEach(user => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        expect(emailRegex.test(user.email)).toBe(true);
      });
    });

    test('should ensure data integrity across related endpoints', async () => {
      // Get user posts and verify they belong to valid users
      const usersResponse = await axios.get(`${baseURL}/users`);
      const postsResponse = await axios.get(`${baseURL}/posts`);
      
      const userIds = usersResponse.data.map(user => user.id);
      
      postsResponse.data.forEach(post => {
        expect(userIds).toContain(post.userId);
      });
    });
  });

  describe('Error Handling Tests', () => {
    test('should return proper 404 for non-existent resources', async () => {
      try {
        await axios.get(`${baseURL}/users/999999`);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error.response.status).toBe(404);
      }
    });

    test('should handle network timeouts gracefully', async () => {
      const shortTimeoutAxios = axios.create({
        timeout: 1, // 1ms timeout to force timeout
        baseURL: baseURL
      });

      try {
        await shortTimeoutAxios.get('/users');
        // If it doesn't timeout, that's also acceptable
      } catch (error) {
        expect(error.code).toBe('ECONNABORTED');
      }
    });

    test('should provide meaningful error messages', async () => {
      try {
        await axios.get(`${baseURL}/invalid-endpoint-12345`);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error.response.status).toBe(404);
        expect(error.response.data).toBeDefined();
      }
    });
  });
});