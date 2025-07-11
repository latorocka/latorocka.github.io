const axios = require('axios');

describe('Data Validation and Schema Tests', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com';
  const githubURL = 'https://api.github.com';
  const spacexURL = 'https://api.spacex.land/graphql/';

  describe('JSONPlaceholder Schema Validation', () => {
    test('should validate user object schema', async () => {
      const response = await axios.get(`${baseURL}/users/1`);
      const user = response.data;
      
      // Required fields
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('username');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('address');
      expect(user).toHaveProperty('phone');
      expect(user).toHaveProperty('website');
      expect(user).toHaveProperty('company');
      
      // Data type validation
      expect(typeof user.id).toBe('number');
      expect(typeof user.name).toBe('string');
      expect(typeof user.username).toBe('string');
      expect(typeof user.email).toBe('string');
      expect(typeof user.address).toBe('object');
      expect(typeof user.phone).toBe('string');
      expect(typeof user.website).toBe('string');
      expect(typeof user.company).toBe('object');
      
      // Nested object validation
      expect(user.address).toHaveProperty('street');
      expect(user.address).toHaveProperty('suite');
      expect(user.address).toHaveProperty('city');
      expect(user.address).toHaveProperty('zipcode');
      expect(user.address).toHaveProperty('geo');
      
      expect(user.address.geo).toHaveProperty('lat');
      expect(user.address.geo).toHaveProperty('lng');
      
      expect(user.company).toHaveProperty('name');
      expect(user.company).toHaveProperty('catchPhrase');
      expect(user.company).toHaveProperty('bs');
    });

    test('should validate post object schema', async () => {
      const response = await axios.get(`${baseURL}/posts/1`);
      const post = response.data;
      
      // Required fields
      expect(post).toHaveProperty('userId');
      expect(post).toHaveProperty('id');
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('body');
      
      // Data type validation
      expect(typeof post.userId).toBe('number');
      expect(typeof post.id).toBe('number');
      expect(typeof post.title).toBe('string');
      expect(typeof post.body).toBe('string');
      
      // Content validation
      expect(post.title.length).toBeGreaterThan(0);
      expect(post.body.length).toBeGreaterThan(0);
      expect(post.userId).toBeGreaterThan(0);
      expect(post.id).toBeGreaterThan(0);
    });

    test('should validate comment object schema', async () => {
      const response = await axios.get(`${baseURL}/comments/1`);
      const comment = response.data;
      
      // Required fields
      expect(comment).toHaveProperty('postId');
      expect(comment).toHaveProperty('id');
      expect(comment).toHaveProperty('name');
      expect(comment).toHaveProperty('email');
      expect(comment).toHaveProperty('body');
      
      // Data type validation
      expect(typeof comment.postId).toBe('number');
      expect(typeof comment.id).toBe('number');
      expect(typeof comment.name).toBe('string');
      expect(typeof comment.email).toBe('string');
      expect(typeof comment.body).toBe('string');
      
      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(emailRegex.test(comment.email)).toBe(true);
    });

    test('should validate array responses maintain consistent schemas', async () => {
      const response = await axios.get(`${baseURL}/users`);
      const users = response.data;
      
      expect(Array.isArray(users)).toBe(true);
      expect(users.length).toBe(10);
      
      // Verify all users have consistent schema
      users.forEach((user, index) => {
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('name');
        expect(user).toHaveProperty('username');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('address');
        expect(user).toHaveProperty('phone');
        expect(user).toHaveProperty('website');
        expect(user).toHaveProperty('company');
        
        expect(typeof user.id).toBe('number');
        expect(typeof user.name).toBe('string');
        expect(typeof user.email).toBe('string');
        
        // Verify unique IDs
        expect(user.id).toBe(index + 1);
      });
    });
  });

  describe('GitHub API Schema Validation', () => {
    test('should validate GitHub user schema', async () => {
      const response = await axios.get(`${githubURL}/users/latorocka`);
      const user = response.data;
      
      // Required GitHub user fields
      expect(user).toHaveProperty('login');
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('node_id');
      expect(user).toHaveProperty('avatar_url');
      expect(user).toHaveProperty('gravatar_id');
      expect(user).toHaveProperty('url');
      expect(user).toHaveProperty('html_url');
      expect(user).toHaveProperty('type');
      expect(user).toHaveProperty('site_admin');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('company');
      expect(user).toHaveProperty('blog');
      expect(user).toHaveProperty('location');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('hireable');
      expect(user).toHaveProperty('bio');
      expect(user).toHaveProperty('public_repos');
      expect(user).toHaveProperty('public_gists');
      expect(user).toHaveProperty('followers');
      expect(user).toHaveProperty('following');
      expect(user).toHaveProperty('created_at');
      expect(user).toHaveProperty('updated_at');
      
      // Data type validation
      expect(typeof user.login).toBe('string');
      expect(typeof user.id).toBe('number');
      expect(typeof user.type).toBe('string');
      expect(typeof user.site_admin).toBe('boolean');
      expect(typeof user.public_repos).toBe('number');
      expect(typeof user.followers).toBe('number');
      expect(typeof user.following).toBe('number');
      
      // URL validation
      expect(user.url).toMatch(/^https?:\/\//);
      expect(user.html_url).toMatch(/^https?:\/\//);
      expect(user.avatar_url).toMatch(/^https?:\/\//);
      
      // Date validation
      expect(new Date(user.created_at)).toBeInstanceOf(Date);
      expect(new Date(user.updated_at)).toBeInstanceOf(Date);
    });

    test('should validate GitHub repository schema', async () => {
      const response = await axios.get(`${githubURL}/repos/latorocka/selenium-framework`);
      const repo = response.data;
      
      // Required repository fields
      expect(repo).toHaveProperty('id');
      expect(repo).toHaveProperty('node_id');
      expect(repo).toHaveProperty('name');
      expect(repo).toHaveProperty('full_name');
      expect(repo).toHaveProperty('private');
      expect(repo).toHaveProperty('owner');
      expect(repo).toHaveProperty('html_url');
      expect(repo).toHaveProperty('description');
      expect(repo).toHaveProperty('fork');
      expect(repo).toHaveProperty('url');
      expect(repo).toHaveProperty('created_at');
      expect(repo).toHaveProperty('updated_at');
      expect(repo).toHaveProperty('pushed_at');
      expect(repo).toHaveProperty('git_url');
      expect(repo).toHaveProperty('ssh_url');
      expect(repo).toHaveProperty('clone_url');
      expect(repo).toHaveProperty('size');
      expect(repo).toHaveProperty('stargazers_count');
      expect(repo).toHaveProperty('watchers_count');
      expect(repo).toHaveProperty('language');
      expect(repo).toHaveProperty('forks_count');
      expect(repo).toHaveProperty('default_branch');
      
      // Data type validation
      expect(typeof repo.id).toBe('number');
      expect(typeof repo.name).toBe('string');
      expect(typeof repo.private).toBe('boolean');
      expect(typeof repo.fork).toBe('boolean');
      expect(typeof repo.size).toBe('number');
      expect(typeof repo.stargazers_count).toBe('number');
      expect(typeof repo.forks_count).toBe('number');
      
      // Owner object validation
      expect(repo.owner).toHaveProperty('login');
      expect(repo.owner).toHaveProperty('id');
      expect(repo.owner).toHaveProperty('type');
      expect(typeof repo.owner.login).toBe('string');
      expect(typeof repo.owner.id).toBe('number');
    });
  });

  describe('SpaceX GraphQL Schema Validation', () => {
    test('should validate SpaceX launch schema', async () => {
      const query = `
        query {
          launches(limit: 3) {
            id
            mission_name
            launch_date_utc
            launch_success
            details
            rocket {
              rocket_id
              rocket_name
              rocket_type
            }
            links {
              mission_patch
              mission_patch_small
              wikipedia
              video_link
            }
            launch_site {
              site_id
              site_name
              site_name_long
            }
          }
        }
      `;
      
      const response = await axios.post(spacexURL, { query });
      const data = response.data;
      
      expect(data).toHaveProperty('data');
      expect(data.data).toHaveProperty('launches');
      expect(Array.isArray(data.data.launches)).toBe(true);
      
      data.data.launches.forEach(launch => {
        // Required launch fields
        expect(launch).toHaveProperty('id');
        expect(launch).toHaveProperty('mission_name');
        expect(launch).toHaveProperty('launch_date_utc');
        expect(launch).toHaveProperty('rocket');
        expect(launch).toHaveProperty('links');
        expect(launch).toHaveProperty('launch_site');
        
        // Data type validation
        expect(typeof launch.id).toBe('string');
        expect(typeof launch.mission_name).toBe('string');
        if (launch.launch_success !== null) {
          expect(typeof launch.launch_success).toBe('boolean');
        }
        
        // Rocket object validation
        expect(launch.rocket).toHaveProperty('rocket_id');
        expect(launch.rocket).toHaveProperty('rocket_name');
        expect(launch.rocket).toHaveProperty('rocket_type');
        expect(typeof launch.rocket.rocket_id).toBe('string');
        expect(typeof launch.rocket.rocket_name).toBe('string');
        
        // Links object validation
        expect(launch.links).toHaveProperty('mission_patch');
        expect(launch.links).toHaveProperty('mission_patch_small');
        expect(launch.links).toHaveProperty('wikipedia');
        expect(launch.links).toHaveProperty('video_link');
        
        // Launch site validation
        expect(launch.launch_site).toHaveProperty('site_id');
        expect(launch.launch_site).toHaveProperty('site_name');
        expect(launch.launch_site).toHaveProperty('site_name_long');
        expect(typeof launch.launch_site.site_id).toBe('string');
        expect(typeof launch.launch_site.site_name).toBe('string');
        
        // Date validation
        if (launch.launch_date_utc) {
          expect(new Date(launch.launch_date_utc)).toBeInstanceOf(Date);
        }
      });
    });

    test('should validate GraphQL error responses', async () => {
      const invalidQuery = `
        query {
          invalid_field_name {
            nonexistent_field
          }
        }
      `;
      
      const response = await axios.post(spacexURL, { query: invalidQuery });
      const data = response.data;
      
      expect(data).toHaveProperty('errors');
      expect(Array.isArray(data.errors)).toBe(true);
      
      data.errors.forEach(error => {
        expect(error).toHaveProperty('message');
        expect(error).toHaveProperty('locations');
        expect(typeof error.message).toBe('string');
        expect(Array.isArray(error.locations)).toBe(true);
      });
    });
  });

  describe('Cross-API Data Consistency', () => {
    test('should maintain consistent data types across different APIs', async () => {
      // Get data from multiple APIs
      const jsonPlaceholderUser = await axios.get(`${baseURL}/users/1`);
      const githubUser = await axios.get(`${githubURL}/users/latorocka`);
      
      // Verify consistent ID types
      expect(typeof jsonPlaceholderUser.data.id).toBe('number');
      expect(typeof githubUser.data.id).toBe('number');
      
      // Verify consistent string fields
      expect(typeof jsonPlaceholderUser.data.name).toBe('string');
      expect(typeof githubUser.data.name).toBe('string');
      expect(typeof jsonPlaceholderUser.data.email).toBe('string');
      
      // Verify URL formats are consistent
      if (githubUser.data.blog) {
        expect(githubUser.data.blog).toMatch(/^https?:\/\//);
      }
      expect(githubUser.data.html_url).toMatch(/^https?:\/\//);
    });

    test('should validate data integrity in nested objects', async () => {
      const response = await axios.get(`${baseURL}/users`);
      const users = response.data;
      
      users.forEach(user => {
        // Validate nested address object
        if (user.address) {
          expect(user.address).toHaveProperty('geo');
          if (user.address.geo) {
            expect(user.address.geo).toHaveProperty('lat');
            expect(user.address.geo).toHaveProperty('lng');
            
            // Validate geographic coordinates
            const lat = parseFloat(user.address.geo.lat);
            const lng = parseFloat(user.address.geo.lng);
            expect(lat).toBeGreaterThanOrEqual(-90);
            expect(lat).toBeLessThanOrEqual(90);
            expect(lng).toBeGreaterThanOrEqual(-180);
            expect(lng).toBeLessThanOrEqual(180);
          }
        }
        
        // Validate nested company object
        if (user.company) {
          expect(user.company).toHaveProperty('name');
          expect(typeof user.company.name).toBe('string');
          expect(user.company.name.length).toBeGreaterThan(0);
        }
      });
    });
  });

  describe('Custom Data Validation Rules', () => {
    test('should validate email formats across all APIs', async () => {
      // Test JSONPlaceholder emails
      const usersResponse = await axios.get(`${baseURL}/users`);
      const commentsResponse = await axios.get(`${baseURL}/comments?_limit=5`);
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      usersResponse.data.forEach(user => {
        if (user.email) {
          expect(emailRegex.test(user.email)).toBe(true);
        }
      });
      
      commentsResponse.data.forEach(comment => {
        if (comment.email) {
          expect(emailRegex.test(comment.email)).toBe(true);
        }
      });
    });

    test('should validate URL formats', async () => {
      const githubResponse = await axios.get(`${githubURL}/users/latorocka`);
      const user = githubResponse.data;
      
      const urlRegex = /^https?:\/\/.+/;
      
      expect(urlRegex.test(user.url)).toBe(true);
      expect(urlRegex.test(user.html_url)).toBe(true);
      expect(urlRegex.test(user.avatar_url)).toBe(true);
      
      if (user.blog && user.blog !== '') {
        expect(urlRegex.test(user.blog)).toBe(true);
      }
    });

    test('should validate numeric ranges and constraints', async () => {
      const postsResponse = await axios.get(`${baseURL}/posts`);
      const posts = postsResponse.data;
      
      posts.forEach(post => {
        // Validate positive IDs
        expect(post.id).toBeGreaterThan(0);
        expect(post.userId).toBeGreaterThan(0);
        expect(post.userId).toBeLessThanOrEqual(10); // Known user count
        
        // Validate content length
        expect(post.title.length).toBeGreaterThan(0);
        expect(post.body.length).toBeGreaterThan(0);
        expect(post.title.length).toBeLessThan(200); // Reasonable title length
      });
    });

    test('should validate required vs optional fields', async () => {
      const userResponse = await axios.get(`${baseURL}/users/1`);
      const user = userResponse.data;
      
      // Required fields (should never be null/undefined)
      const requiredFields = ['id', 'name', 'username', 'email'];
      requiredFields.forEach(field => {
        expect(user[field]).toBeDefined();
        expect(user[field]).not.toBeNull();
        if (typeof user[field] === 'string') {
          expect(user[field].length).toBeGreaterThan(0);
        }
      });
      
      // Optional fields (can be null but if present, should be valid)
      const optionalFields = ['website', 'phone'];
      optionalFields.forEach(field => {
        if (user[field] !== null && user[field] !== undefined) {
          expect(typeof user[field]).toBe('string');
          expect(user[field].length).toBeGreaterThan(0);
        }
      });
    });
  });
});

module.exports = {
  testDataValidation: () => describe('Data Validation and Schema Tests', () => {})
};