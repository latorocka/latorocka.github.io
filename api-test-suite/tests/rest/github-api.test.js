const axios = require('axios');

describe('GitHub API Testing', () => {
  const baseURL = 'https://api.github.com';
  const testRepo = 'latorocka/selenium-framework';

  beforeAll(() => {
    // Configure axios for GitHub API
    axios.defaults.timeout = 15000;
    axios.defaults.headers.common['Accept'] = 'application/vnd.github.v3+json';
  });

  describe('Public Repository Information', () => {
    test('should fetch repository information', async () => {
      const response = await axios.get(`${baseURL}/repos/${testRepo}`);
      
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('id');
      expect(response.data).toHaveProperty('name', 'selenium-framework');
      expect(response.data).toHaveProperty('full_name', testRepo);
      expect(response.data).toHaveProperty('owner');
      expect(response.data.owner.login).toBe('latorocka');
    });

    test('should validate repository structure', async () => {
      const response = await axios.get(`${baseURL}/repos/${testRepo}`);
      
      const repo = response.data;
      expect(repo).toHaveProperty('description');
      expect(repo).toHaveProperty('language');
      expect(repo).toHaveProperty('created_at');
      expect(repo).toHaveProperty('updated_at');
      expect(repo).toHaveProperty('stargazers_count');
      expect(repo).toHaveProperty('forks_count');
      expect(repo).toHaveProperty('default_branch');
    });

    test('should check if repository is public', async () => {
      const response = await axios.get(`${baseURL}/repos/${testRepo}`);
      
      expect(response.data.private).toBe(false);
      expect(response.data.visibility).toBe('public');
    });
  });

  describe('Repository Contents', () => {
    test('should list repository contents', async () => {
      const response = await axios.get(`${baseURL}/repos/${testRepo}/contents`);
      
      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Array);
      expect(response.data.length).toBeGreaterThan(0);
      
      // Check for common files
      const fileNames = response.data.map(file => file.name);
      expect(fileNames).toContain('README.md');
    });

    test('should fetch README content', async () => {
      const response = await axios.get(`${baseURL}/repos/${testRepo}/readme`);
      
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('name', 'README.md');
      expect(response.data).toHaveProperty('content');
      expect(response.data).toHaveProperty('encoding', 'base64');
      
      // Decode and verify content
      const content = Buffer.from(response.data.content, 'base64').toString();
      expect(content).toContain('Selenium');
      expect(content.length).toBeGreaterThan(100);
    });
  });

  describe('Repository Statistics', () => {
    test('should fetch commit activity', async () => {
      const response = await axios.get(`${baseURL}/repos/${testRepo}/stats/commit_activity`);
      
      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Array);
    });

    test('should fetch language statistics', async () => {
      const response = await axios.get(`${baseURL}/repos/${testRepo}/languages`);
      
      expect(response.status).toBe(200);
      expect(typeof response.data).toBe('object');
      expect(response.data).toHaveProperty('Java');
    });
  });

  describe('User Information', () => {
    test('should fetch user profile', async () => {
      const response = await axios.get(`${baseURL}/users/latorocka`);
      
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('login', 'latorocka');
      expect(response.data).toHaveProperty('id');
      expect(response.data).toHaveProperty('type', 'User');
      expect(response.data).toHaveProperty('public_repos');
    });

    test('should list user repositories', async () => {
      const response = await axios.get(`${baseURL}/users/latorocka/repos`);
      
      expect(response.status).toBe(200);
      expect(response.data).toBeInstanceOf(Array);
      
      // Check if selenium-framework is in the list
      const repoNames = response.data.map(repo => repo.name);
      expect(repoNames).toContain('selenium-framework');
    });
  });

  describe('API Rate Limits', () => {
    test('should check rate limit status', async () => {
      const response = await axios.get(`${baseURL}/rate_limit`);
      
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('rate');
      expect(response.data.rate).toHaveProperty('limit');
      expect(response.data.rate).toHaveProperty('remaining');
      expect(response.data.rate).toHaveProperty('reset');
    });

    test('should include rate limit headers', async () => {
      const response = await axios.get(`${baseURL}/users/latorocka`);
      
      expect(response.headers).toHaveProperty('x-ratelimit-limit');
      expect(response.headers).toHaveProperty('x-ratelimit-remaining');
      expect(response.headers).toHaveProperty('x-ratelimit-reset');
    });
  });

  describe('Error Handling', () => {
    test('should handle non-existent repository', async () => {
      try {
        await axios.get(`${baseURL}/repos/latorocka/non-existent-repo-12345`);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error.response.status).toBe(404);
        expect(error.response.data).toHaveProperty('message', 'Not Found');
      }
    });

    test('should handle non-existent user', async () => {
      try {
        await axios.get(`${baseURL}/users/non-existent-user-12345-xyz`);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error.response.status).toBe(404);
        expect(error.response.data).toHaveProperty('message', 'Not Found');
      }
    });

    test('should handle malformed requests', async () => {
      try {
        await axios.get(`${baseURL}/invalid-endpoint-test`);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error.response.status).toBe(404);
      }
    });
  });

  describe('Performance Testing', () => {
    test('should respond within acceptable time', async () => {
      const startTime = Date.now();
      await axios.get(`${baseURL}/repos/${testRepo}`);
      const endTime = Date.now();
      
      const responseTime = endTime - startTime;
      expect(responseTime).toBeLessThan(3000); // 3 seconds max
    });

    test('should handle concurrent requests', async () => {
      const requests = [
        axios.get(`${baseURL}/repos/${testRepo}`),
        axios.get(`${baseURL}/users/latorocka`),
        axios.get(`${baseURL}/repos/${testRepo}/languages`)
      ];
      
      const responses = await Promise.all(requests);
      
      responses.forEach(response => {
        expect(response.status).toBe(200);
      });
    });
  });
});