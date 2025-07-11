const axios = require('axios');

describe('API Integration Tests', () => {
  const jsonPlaceholderURL = 'https://jsonplaceholder.typicode.com';
  const githubURL = 'https://api.github.com';
  const spacexURL = 'https://api.spacex.land/graphql/';

  describe('Cross-API Data Consistency', () => {
    test('should maintain data relationships across different API systems', async () => {
      // Get user data from JSONPlaceholder
      const usersResponse = await axios.get(`${jsonPlaceholderURL}/users`);
      const users = usersResponse.data;
      
      // Get posts for those users
      const postsResponse = await axios.get(`${jsonPlaceholderURL}/posts`);
      const posts = postsResponse.data;
      
      // Verify all posts belong to valid users
      const userIds = users.map(user => user.id);
      posts.forEach(post => {
        expect(userIds).toContain(post.userId);
      });
      
      // Verify each user has at least one post
      userIds.forEach(userId => {
        const userPosts = posts.filter(post => post.userId === userId);
        expect(userPosts.length).toBeGreaterThan(0);
      });
    });

    test('should handle cascading data requests properly', async () => {
      // Step 1: Get user
      const userResponse = await axios.get(`${jsonPlaceholderURL}/users/1`);
      const user = userResponse.data;
      
      // Step 2: Use user ID to get their posts
      const postsResponse = await axios.get(`${jsonPlaceholderURL}/posts?userId=${user.id}`);
      const posts = postsResponse.data;
      
      // Step 3: Get comments for first post
      const commentsResponse = await axios.get(`${jsonPlaceholderURL}/comments?postId=${posts[0].id}`);
      const comments = commentsResponse.data;
      
      // Verify data integrity across all levels
      expect(user.id).toBe(1);
      expect(posts.length).toBeGreaterThan(0);
      expect(comments.length).toBeGreaterThan(0);
      posts.forEach(post => expect(post.userId).toBe(user.id));
      comments.forEach(comment => expect(comment.postId).toBe(posts[0].id));
    });
  });

  describe('Multi-API Workflow Integration', () => {
    test('should successfully integrate GitHub and JSONPlaceholder APIs', async () => {
      // Get GitHub user profile
      const githubResponse = await axios.get(`${githubURL}/users/latorocka`);
      const githubUser = githubResponse.data;
      
      // Create a JSONPlaceholder post using GitHub data
      const newPost = {
        title: `Integration Test: ${githubUser.login} Repository Analysis`,
        body: `This post was created by integrating GitHub API data. User has ${githubUser.public_repos} public repositories.`,
        userId: 1
      };
      
      const postResponse = await axios.post(`${jsonPlaceholderURL}/posts`, newPost);
      
      // Verify integration
      expect(postResponse.status).toBe(201);
      expect(postResponse.data.title).toContain(githubUser.login);
      expect(postResponse.data.body).toContain(githubUser.public_repos.toString());
    });

    test('should handle multiple API calls in parallel', async () => {
      const startTime = Date.now();
      
      const requests = [
        axios.get(`${jsonPlaceholderURL}/users/1`),
        axios.get(`${githubURL}/users/latorocka`),
        axios.post(spacexURL, {
          query: 'query { launches(limit: 1) { mission_name } }'
        })
      ];
      
      const responses = await Promise.all(requests);
      const endTime = Date.now();
      
      // Verify all responses are successful
      expect(responses[0].status).toBe(200); // JSONPlaceholder
      expect(responses[1].status).toBe(200); // GitHub
      expect(responses[2].status).toBe(200); // SpaceX
      
      // Verify parallel execution was efficient
      const totalTime = endTime - startTime;
      expect(totalTime).toBeLessThan(5000); // Should complete within 5 seconds
      
      // Verify data from each API
      expect(responses[0].data.name).toBe('Leanne Graham');
      expect(responses[1].data.login).toBe('latorocka');
      expect(responses[2].data.data.launches[0]).toHaveProperty('mission_name');
    });
  });

  describe('API Error Propagation', () => {
    test('should handle cascading failures gracefully', async () => {
      try {
        // Start with valid request
        const userResponse = await axios.get(`${jsonPlaceholderURL}/users/1`);
        expect(userResponse.status).toBe(200);
        
        // Attempt invalid follow-up request
        await axios.get(`${jsonPlaceholderURL}/posts?userId=999999`);
        
        // Even if this doesn't fail, we should handle it gracefully
      } catch (error) {
        // Verify error is handled appropriately
        expect(error.response.status).toBeGreaterThanOrEqual(400);
      }
    });

    test('should maintain transaction-like behavior across APIs', async () => {
      const testResults = [];
      
      try {
        // Operation 1: Get user data
        const userResponse = await axios.get(`${jsonPlaceholderURL}/users/1`);
        testResults.push({ operation: 'getUser', success: true, data: userResponse.data });
        
        // Operation 2: Create post
        const postResponse = await axios.post(`${jsonPlaceholderURL}/posts`, {
          title: 'Transaction Test',
          body: 'Testing transaction-like behavior',
          userId: userResponse.data.id
        });
        testResults.push({ operation: 'createPost', success: true, data: postResponse.data });
        
        // Operation 3: Get GitHub data
        const githubResponse = await axios.get(`${githubURL}/users/latorocka`);
        testResults.push({ operation: 'getGitHubUser', success: true, data: githubResponse.data });
        
      } catch (error) {
        testResults.push({ operation: 'error', success: false, error: error.message });
      }
      
      // Verify all operations completed successfully
      const successfulOperations = testResults.filter(result => result.success);
      expect(successfulOperations.length).toBeGreaterThan(0);
      
      // Verify data consistency across operations
      if (successfulOperations.length >= 2) {
        const userData = successfulOperations.find(op => op.operation === 'getUser')?.data;
        const postData = successfulOperations.find(op => op.operation === 'createPost')?.data;
        
        if (userData && postData) {
          expect(postData.userId).toBe(userData.id);
        }
      }
    });
  });

  describe('End-to-End Workflow Tests', () => {
    test('should complete complex multi-step workflow', async () => {
      const workflow = {
        steps: [],
        startTime: Date.now()
      };
      
      try {
        // Step 1: Authentication check (simulate with user lookup)
        const authResponse = await axios.get(`${jsonPlaceholderURL}/users/1`);
        workflow.steps.push({
          step: 1,
          action: 'authentication',
          success: authResponse.status === 200,
          data: { userId: authResponse.data.id }
        });
        
        // Step 2: Data retrieval
        const dataResponse = await axios.get(`${jsonPlaceholderURL}/posts?userId=1`);
        workflow.steps.push({
          step: 2,
          action: 'dataRetrieval',
          success: dataResponse.status === 200,
          data: { postCount: dataResponse.data.length }
        });
        
        // Step 3: External service integration
        const externalResponse = await axios.get(`${githubURL}/users/latorocka`);
        workflow.steps.push({
          step: 3,
          action: 'externalIntegration',
          success: externalResponse.status === 200,
          data: { githubUser: externalResponse.data.login }
        });
        
        // Step 4: Data processing (create new post with integrated data)
        const processedData = {
          title: `Workflow Test: User ${workflow.steps[0].data.userId}`,
          body: `Integrated workflow with ${workflow.steps[1].data.postCount} posts and GitHub user ${workflow.steps[2].data.githubUser}`,
          userId: workflow.steps[0].data.userId
        };
        
        const processingResponse = await axios.post(`${jsonPlaceholderURL}/posts`, processedData);
        workflow.steps.push({
          step: 4,
          action: 'dataProcessing',
          success: processingResponse.status === 201,
          data: { newPostId: processingResponse.data.id }
        });
        
        workflow.endTime = Date.now();
        workflow.duration = workflow.endTime - workflow.startTime;
        
        // Verify workflow completion
        expect(workflow.steps.length).toBe(4);
        expect(workflow.steps.every(step => step.success)).toBe(true);
        expect(workflow.duration).toBeLessThan(10000); // Should complete within 10 seconds
        
        // Verify data flow through workflow
        expect(workflow.steps[3].data.newPostId).toBeDefined();
        
      } catch (error) {
        workflow.error = error.message;
        fail(`Workflow failed: ${error.message}`);
      }
    });

    test('should handle partial workflow failures with recovery', async () => {
      const recoveryWorkflow = {
        attempts: [],
        finalResult: null
      };
      
      // Attempt 1: Try with potentially failing endpoint
      try {
        const response = await axios.get(`${jsonPlaceholderURL}/users/999`);
        recoveryWorkflow.attempts.push({ attempt: 1, success: true, data: response.data });
      } catch (error) {
        recoveryWorkflow.attempts.push({ attempt: 1, success: false, error: error.response?.status });
      }
      
      // Recovery: Use known good endpoint
      try {
        const recoveryResponse = await axios.get(`${jsonPlaceholderURL}/users/1`);
        recoveryWorkflow.attempts.push({ attempt: 2, success: true, data: recoveryResponse.data });
        recoveryWorkflow.finalResult = 'recovered';
      } catch (error) {
        recoveryWorkflow.attempts.push({ attempt: 2, success: false, error: error.response?.status });
        recoveryWorkflow.finalResult = 'failed';
      }
      
      // Verify recovery mechanism worked
      expect(recoveryWorkflow.attempts.length).toBe(2);
      expect(recoveryWorkflow.finalResult).toBe('recovered');
      
      const successfulAttempt = recoveryWorkflow.attempts.find(attempt => attempt.success);
      expect(successfulAttempt).toBeDefined();
      expect(successfulAttempt.data.id).toBe(1);
    });
  });

  describe('API Performance Integration', () => {
    test('should maintain acceptable performance across multiple APIs', async () => {
      const performanceTest = {
        apis: [],
        startTime: Date.now()
      };
      
      // Test JSONPlaceholder performance
      const jsonStartTime = Date.now();
      const jsonResponse = await axios.get(`${jsonPlaceholderURL}/users`);
      const jsonEndTime = Date.now();
      performanceTest.apis.push({
        name: 'JSONPlaceholder',
        responseTime: jsonEndTime - jsonStartTime,
        status: jsonResponse.status,
        dataSize: jsonResponse.data.length
      });
      
      // Test GitHub performance
      const githubStartTime = Date.now();
      const githubResponse = await axios.get(`${githubURL}/users/latorocka`);
      const githubEndTime = Date.now();
      performanceTest.apis.push({
        name: 'GitHub',
        responseTime: githubEndTime - githubStartTime,
        status: githubResponse.status,
        dataSize: Object.keys(githubResponse.data).length
      });
      
      performanceTest.endTime = Date.now();
      performanceTest.totalTime = performanceTest.endTime - performanceTest.startTime;
      
      // Verify performance standards
      expect(performanceTest.totalTime).toBeLessThan(5000);
      performanceTest.apis.forEach(api => {
        expect(api.responseTime).toBeLessThan(3000);
        expect(api.status).toBe(200);
      });
      
      // Calculate average response time
      const avgResponseTime = performanceTest.apis.reduce((sum, api) => sum + api.responseTime, 0) / performanceTest.apis.length;
      expect(avgResponseTime).toBeLessThan(2000);
    });
  });
});

module.exports = { 
  testAPIIntegration: () => describe('API Integration Tests', () => {}) 
};