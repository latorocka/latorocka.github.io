const request = require('supertest');
const app = require('../../server/mock-server');

describe('User API - REST Endpoints', () => {
  const testUser = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'user'
  };

  beforeAll(async () => {
    // Set up test data
    await request(app)
      .post('/api/users')
      .send(testUser);
  });

  afterAll(async () => {
    // Clean up test data
    await request(app)
      .delete(`/api/users/${testUser.id}`);
  });

  describe('GET /api/users', () => {
    test('should return all users', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(200);

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });

    test('should return users with correct structure', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(200);

      const user = response.body[0];
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('role');
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

  describe('GET /api/users/:id', () => {
    test('should return user by ID', async () => {
      const response = await request(app)
        .get(`/api/users/${testUser.id}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', testUser.id);
      expect(response.body).toHaveProperty('name', testUser.name);
      expect(response.body).toHaveProperty('email', testUser.email);
    });

    test('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .get('/api/users/999999')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'User not found');
    });

    test('should return 400 for invalid ID format', async () => {
      const response = await request(app)
        .get('/api/users/invalid-id')
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Invalid user ID format');
    });
  });

  describe('POST /api/users', () => {
    test('should create new user with valid data', async () => {
      const newUser = {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: 'admin'
      };

      const response = await request(app)
        .post('/api/users')
        .send(newUser)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name', newUser.name);
      expect(response.body).toHaveProperty('email', newUser.email);
      expect(response.body).toHaveProperty('role', newUser.role);
      expect(response.body).toHaveProperty('createdAt');

      // Clean up
      await request(app).delete(`/api/users/${response.body.id}`);
    });

    test('should return 400 for missing required fields', async () => {
      const incompleteUser = {
        name: 'Incomplete User'
        // Missing email and role
      };

      const response = await request(app)
        .post('/api/users')
        .send(incompleteUser)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('required');
    });

    test('should return 400 for invalid email format', async () => {
      const invalidUser = {
        name: 'Invalid Email User',
        email: 'invalid-email-format',
        role: 'user'
      };

      const response = await request(app)
        .post('/api/users')
        .send(invalidUser)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('email');
    });

    test('should return 409 for duplicate email', async () => {
      const duplicateUser = {
        name: 'Duplicate User',
        email: testUser.email, // Using existing email
        role: 'user'
      };

      const response = await request(app)
        .post('/api/users')
        .send(duplicateUser)
        .expect(409);

      expect(response.body).toHaveProperty('error', 'Email already exists');
    });
  });

  describe('PUT /api/users/:id', () => {
    test('should update user with valid data', async () => {
      const updatedData = {
        name: 'John Updated',
        email: 'john.updated@example.com',
        role: 'admin'
      };

      const response = await request(app)
        .put(`/api/users/${testUser.id}`)
        .send(updatedData)
        .expect(200);

      expect(response.body).toHaveProperty('id', testUser.id);
      expect(response.body).toHaveProperty('name', updatedData.name);
      expect(response.body).toHaveProperty('email', updatedData.email);
      expect(response.body).toHaveProperty('role', updatedData.role);
      expect(response.body).toHaveProperty('updatedAt');
    });

    test('should return 404 for non-existent user', async () => {
      const updateData = {
        name: 'Non-existent User',
        email: 'nonexistent@example.com',
        role: 'user'
      };

      const response = await request(app)
        .put('/api/users/999999')
        .send(updateData)
        .expect(404);

      expect(response.body).toHaveProperty('error', 'User not found');
    });

    test('should validate updated email format', async () => {
      const invalidUpdate = {
        name: 'Valid Name',
        email: 'invalid-email',
        role: 'user'
      };

      const response = await request(app)
        .put(`/api/users/${testUser.id}`)
        .send(invalidUpdate)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('email');
    });
  });

  describe('DELETE /api/users/:id', () => {
    test('should delete existing user', async () => {
      // Create user to delete
      const userToDelete = {
        name: 'Delete Me',
        email: 'delete.me@example.com',
        role: 'user'
      };

      const createResponse = await request(app)
        .post('/api/users')
        .send(userToDelete)
        .expect(201);

      const userId = createResponse.body.id;

      // Delete the user
      const deleteResponse = await request(app)
        .delete(`/api/users/${userId}`)
        .expect(200);

      expect(deleteResponse.body).toHaveProperty('message', 'User deleted successfully');

      // Verify user is deleted
      await request(app)
        .get(`/api/users/${userId}`)
        .expect(404);
    });

    test('should return 404 for non-existent user', async () => {
      const response = await request(app)
        .delete('/api/users/999999')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'User not found');
    });

    test('should return 400 for invalid ID format', async () => {
      const response = await request(app)
        .delete('/api/users/invalid-id')
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Invalid user ID format');
    });
  });

  describe('Authentication & Authorization', () => {
    test('should require authentication for protected endpoints', async () => {
      const response = await request(app)
        .get('/api/users/profile')
        .expect(401);

      expect(response.body).toHaveProperty('error', 'Authentication required');
    });

    test('should allow access with valid token', async () => {
      // First, login to get token
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'password123'
        })
        .expect(200);

      const token = loginResponse.body.token;

      // Use token to access protected endpoint
      const response = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('email');
    });

    test('should reject invalid token', async () => {
      const response = await request(app)
        .get('/api/users/profile')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);

      expect(response.body).toHaveProperty('error', 'Invalid token');
    });
  });

  describe('Rate Limiting', () => {
    test('should enforce rate limiting', async () => {
      const promises = [];
      
      // Make multiple requests quickly
      for (let i = 0; i < 15; i++) {
        promises.push(request(app).get('/api/users'));
      }

      const responses = await Promise.all(promises);
      
      // Check if any request was rate limited
      const rateLimitedResponse = responses.find(response => response.status === 429);
      expect(rateLimitedResponse).toBeDefined();
      expect(rateLimitedResponse.body).toHaveProperty('error', 'Too many requests');
    });
  });

  describe('Error Handling', () => {
    test('should handle server errors gracefully', async () => {
      // Force a server error
      const response = await request(app)
        .get('/api/users/error')
        .expect(500);

      expect(response.body).toHaveProperty('error', 'Internal server error');
    });

    test('should return appropriate error messages', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({}) // Empty payload
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('validation');
    });
  });
});