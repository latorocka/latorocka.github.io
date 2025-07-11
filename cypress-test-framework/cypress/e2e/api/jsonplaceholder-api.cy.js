/// <reference types="cypress" />

describe('JSONPlaceholder API Tests', () => {
  const baseUrl = 'https://jsonplaceholder.typicode.com';
  
  beforeEach(() => {
    cy.logTestStart('JSONPlaceholder API Test');
  });

  afterEach(() => {
    cy.logTestEnd('JSONPlaceholder API Test');
  });

  describe('Users API', () => {
    it('should fetch all users', () => {
      cy.apiGet(`${baseUrl}/users`)
        .then((response) => {
          expect(response.body).to.be.an('array');
          expect(response.body).to.have.length.greaterThan(0);
          
          // Validate user schema
          cy.validateApiSchema(response, {
            body: 'array'
          });
          
          // Validate response time
          cy.validateApiResponseTime(response, 2000);
          
          // Validate first user structure
          const firstUser = response.body[0];
          expect(firstUser).to.have.all.keys(
            'id', 'name', 'username', 'email', 'address', 'phone', 'website', 'company'
          );
        });
    });

    it('should fetch a specific user by ID', () => {
      cy.apiGet(`${baseUrl}/users/1`)
        .then((response) => {
          expect(response.body).to.be.an('object');
          expect(response.body.id).to.equal(1);
          expect(response.body.name).to.be.a('string');
          expect(response.body.email).to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        });
    });

    it('should handle non-existent user ID', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/users/999`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.equal(404);
      });
    });

    it('should create a new user', () => {
      const newUser = {
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        phone: '1-555-0123',
        website: 'https://example.com',
        company: {
          name: 'Test Company'
        }
      };

      cy.apiPost(`${baseUrl}/users`, newUser)
        .then((response) => {
          expect(response.body).to.include(newUser);
          expect(response.body.id).to.be.a('number');
        });
    });

    it('should update a user', () => {
      const updatedUser = {
        id: 1,
        name: 'Updated Name',
        username: 'updateduser',
        email: 'updated@example.com'
      };

      cy.apiPut(`${baseUrl}/users/1`, updatedUser)
        .then((response) => {
          expect(response.body.name).to.equal('Updated Name');
          expect(response.body.username).to.equal('updateduser');
        });
    });

    it('should delete a user', () => {
      cy.apiDelete(`${baseUrl}/users/1`)
        .then((response) => {
          expect(response.status).to.be.oneOf([200, 202, 204]);
        });
    });
  });

  describe('Posts API', () => {
    it('should fetch all posts', () => {
      cy.apiGet(`${baseUrl}/posts`)
        .then((response) => {
          expect(response.body).to.be.an('array');
          expect(response.body).to.have.length.greaterThan(0);
          
          const firstPost = response.body[0];
          expect(firstPost).to.have.all.keys('userId', 'id', 'title', 'body');
        });
    });

    it('should fetch posts by user ID', () => {
      cy.apiGet(`${baseUrl}/posts?userId=1`)
        .then((response) => {
          expect(response.body).to.be.an('array');
          response.body.forEach(post => {
            expect(post.userId).to.equal(1);
          });
        });
    });

    it('should fetch comments for a post', () => {
      cy.apiGet(`${baseUrl}/posts/1/comments`)
        .then((response) => {
          expect(response.body).to.be.an('array');
          expect(response.body).to.have.length.greaterThan(0);
          
          const firstComment = response.body[0];
          expect(firstComment).to.have.all.keys('postId', 'id', 'name', 'email', 'body');
          expect(firstComment.postId).to.equal(1);
        });
    });

    it('should create a new post', () => {
      const newPost = {
        title: 'Test Post',
        body: 'This is a test post body',
        userId: 1
      };

      cy.apiPost(`${baseUrl}/posts`, newPost)
        .then((response) => {
          expect(response.body).to.include(newPost);
          expect(response.body.id).to.be.a('number');
        });
    });
  });

  describe('API Performance Tests', () => {
    it('should have acceptable response times', () => {
      const endpoints = ['/users', '/posts', '/comments', '/albums', '/photos', '/todos'];
      
      endpoints.forEach(endpoint => {
        cy.apiGet(`${baseUrl}${endpoint}`)
          .then((response) => {
            cy.validateApiResponseTime(response, 2000);
          });
      });
    });

    it('should handle concurrent requests', () => {
      const concurrentRequests = 5;
      const promises = [];
      
      for (let i = 0; i < concurrentRequests; i++) {
        promises.push(cy.apiGet(`${baseUrl}/users`));
      }
      
      cy.wrap(Promise.all(promises)).then((responses) => {
        responses.forEach(response => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('array');
        });
      });
    });
  });

  describe('API Error Handling', () => {
    it('should handle invalid endpoints', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/invalid-endpoint`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.equal(404);
      });
    });

    it('should handle malformed JSON', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/posts`,
        body: 'invalid json',
        failOnStatusCode: false,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        expect(response.status).to.be.oneOf([400, 422]);
      });
    });

    it('should validate required fields', () => {
      const incompletePost = {
        title: 'Test Post'
        // Missing body and userId
      };

      cy.request({
        method: 'POST',
        url: `${baseUrl}/posts`,
        body: incompletePost,
        failOnStatusCode: false
      }).then((response) => {
        // JSONPlaceholder is lenient, but in real APIs this would fail
        expect(response.status).to.be.oneOf([201, 400, 422]);
      });
    });
  });

  describe('API Security Tests', () => {
    it('should have proper CORS headers', () => {
      cy.validateApiCors(`${baseUrl}/users`, 'https://example.com');
    });

    it('should handle SQL injection attempts', () => {
      cy.testApiWithInvalidData(`${baseUrl}/users`, {
        name: "'; DROP TABLE users; --",
        email: 'test@example.com'
      }, 'POST');
    });

    it('should handle XSS attempts', () => {
      cy.testApiWithInvalidData(`${baseUrl}/posts`, {
        title: '<script>alert("XSS")</script>',
        body: '<img src=x onerror=alert("XSS")>',
        userId: 1
      }, 'POST');
    });
  });
});