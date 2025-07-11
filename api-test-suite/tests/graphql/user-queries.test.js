const axios = require('axios');

describe('SpaceX GraphQL API Testing', () => {
  const graphqlEndpoint = 'https://api.spacex.land/graphql/';

  async function graphqlQuery(query, variables = {}) {
    const response = await axios.post(graphqlEndpoint, {
      query,
      variables
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000
    });
    
    return response.data;
  }

  describe('SpaceX Launches Query', () => {
    const GET_LAUNCHES = `
      query GetLaunches($limit: Int) {
        launches(limit: $limit) {
          id
          mission_name
          launch_date_utc
          launch_success
          rocket {
            rocket_name
            rocket_type
          }
          links {
            mission_patch_small
            wikipedia
            video_link
          }
        }
      }
    `;

    test('should fetch SpaceX launches with limit', async () => {
      const result = await graphqlQuery(GET_LAUNCHES, { limit: 10 });

      expect(result.errors).toBeUndefined();
      expect(result.data.launches).toBeDefined();
      expect(result.data.launches).toBeInstanceOf(Array);
      expect(result.data.launches.length).toBeLessThanOrEqual(10);
      expect(result.data.launches.length).toBeGreaterThan(0);
    });

    test('should fetch users with filtering', async () => {
      const response = await query({
        query: GET_USERS,
        variables: {
          first: 10,
          filter: {
            role: 'ADMIN'
          }
        }
      });

      expect(response.errors).toBeUndefined();
      expect(response.data.users.edges).toBeInstanceOf(Array);
      
      // Verify all returned users have admin role
      response.data.users.edges.forEach(edge => {
        expect(edge.node.role).toBe('ADMIN');
      });
    });

    test('should validate user data structure', async () => {
      const response = await query({
        query: GET_USERS,
        variables: { first: 1 }
      });

      expect(response.errors).toBeUndefined();
      
      if (response.data.users.edges.length > 0) {
        const user = response.data.users.edges[0].node;
        
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('name');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('role');
        expect(user).toHaveProperty('createdAt');
        expect(user).toHaveProperty('updatedAt');
        
        // Validate data types
        expect(typeof user.id).toBe('string');
        expect(typeof user.name).toBe('string');
        expect(typeof user.email).toBe('string');
        expect(['USER', 'ADMIN', 'MODERATOR']).toContain(user.role);
      }
    });
  });

  describe('Single User Query', () => {
    const GET_USER = gql`
      query GetUser($id: ID!) {
        user(id: $id) {
          id
          name
          email
          role
          profile {
            firstName
            lastName
            bio
            avatar
          }
          posts {
            id
            title
            content
            createdAt
            comments {
              id
              content
              author {
                id
                name
              }
            }
          }
          followers {
            id
            name
          }
          following {
            id
            name
          }
        }
      }
    `;

    test('should fetch user by ID with nested data', async () => {
      const response = await query({
        query: GET_USER,
        variables: { id: '1' }
      });

      expect(response.errors).toBeUndefined();
      expect(response.data.user).toBeDefined();
      expect(response.data.user.id).toBe('1');
      expect(response.data.user.profile).toBeDefined();
      expect(response.data.user.posts).toBeInstanceOf(Array);
    });

    test('should return null for non-existent user', async () => {
      const response = await query({
        query: GET_USER,
        variables: { id: '999999' }
      });

      expect(response.errors).toBeUndefined();
      expect(response.data.user).toBeNull();
    });

    test('should validate nested data structure', async () => {
      const response = await query({
        query: GET_USER,
        variables: { id: '1' }
      });

      expect(response.errors).toBeUndefined();
      
      if (response.data.user) {
        const user = response.data.user;
        
        // Validate profile structure
        if (user.profile) {
          expect(user.profile).toHaveProperty('firstName');
          expect(user.profile).toHaveProperty('lastName');
          expect(user.profile).toHaveProperty('bio');
          expect(user.profile).toHaveProperty('avatar');
        }
        
        // Validate posts structure
        if (user.posts && user.posts.length > 0) {
          const post = user.posts[0];
          expect(post).toHaveProperty('id');
          expect(post).toHaveProperty('title');
          expect(post).toHaveProperty('content');
          expect(post).toHaveProperty('createdAt');
          expect(post).toHaveProperty('comments');
          
          // Validate comments structure
          if (post.comments && post.comments.length > 0) {
            const comment = post.comments[0];
            expect(comment).toHaveProperty('id');
            expect(comment).toHaveProperty('content');
            expect(comment).toHaveProperty('author');
            expect(comment.author).toHaveProperty('id');
            expect(comment.author).toHaveProperty('name');
          }
        }
      }
    });
  });

  describe('User Mutations', () => {
    const CREATE_USER = gql`
      mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
          id
          name
          email
          role
          createdAt
        }
      }
    `;

    const UPDATE_USER = gql`
      mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
        updateUser(id: $id, input: $input) {
          id
          name
          email
          role
          updatedAt
        }
      }
    `;

    const DELETE_USER = gql`
      mutation DeleteUser($id: ID!) {
        deleteUser(id: $id) {
          success
          message
        }
      }
    `;

    test('should create new user', async () => {
      const userInput = {
        name: 'GraphQL Test User',
        email: 'graphql.test@example.com',
        role: 'USER'
      };

      const response = await mutate({
        mutation: CREATE_USER,
        variables: { input: userInput }
      });

      expect(response.errors).toBeUndefined();
      expect(response.data.createUser).toBeDefined();
      expect(response.data.createUser.name).toBe(userInput.name);
      expect(response.data.createUser.email).toBe(userInput.email);
      expect(response.data.createUser.role).toBe(userInput.role);
      expect(response.data.createUser.id).toBeDefined();
      expect(response.data.createUser.createdAt).toBeDefined();
    });

    test('should update existing user', async () => {
      const updateInput = {
        name: 'Updated GraphQL User',
        email: 'updated.graphql@example.com'
      };

      const response = await mutate({
        mutation: UPDATE_USER,
        variables: {
          id: '1',
          input: updateInput
        }
      });

      expect(response.errors).toBeUndefined();
      expect(response.data.updateUser).toBeDefined();
      expect(response.data.updateUser.name).toBe(updateInput.name);
      expect(response.data.updateUser.email).toBe(updateInput.email);
      expect(response.data.updateUser.updatedAt).toBeDefined();
    });

    test('should delete user', async () => {
      const response = await mutate({
        mutation: DELETE_USER,
        variables: { id: '999' }
      });

      expect(response.errors).toBeUndefined();
      expect(response.data.deleteUser).toBeDefined();
      expect(response.data.deleteUser.success).toBe(true);
      expect(response.data.deleteUser.message).toBeDefined();
    });

    test('should validate input data', async () => {
      const invalidInput = {
        name: '', // Empty name
        email: 'invalid-email', // Invalid email format
        role: 'INVALID_ROLE' // Invalid role
      };

      const response = await mutate({
        mutation: CREATE_USER,
        variables: { input: invalidInput }
      });

      expect(response.errors).toBeDefined();
      expect(response.errors.length).toBeGreaterThan(0);
      
      // Check for validation errors
      const errorMessages = response.errors.map(error => error.message);
      expect(errorMessages.some(msg => msg.includes('name'))).toBe(true);
      expect(errorMessages.some(msg => msg.includes('email'))).toBe(true);
    });
  });

  describe('User Subscriptions', () => {
    const USER_UPDATED = gql`
      subscription UserUpdated($userId: ID!) {
        userUpdated(userId: $userId) {
          id
          name
          email
          role
          updatedAt
        }
      }
    `;

    test('should handle user update subscriptions', async () => {
      // Note: This would require a proper subscription testing setup
      // For now, we'll test the subscription definition
      const subscription = await server.createGraphQLServerOptions({});
      
      expect(subscription.typeDefs).toBeDefined();
      expect(subscription.resolvers).toBeDefined();
      expect(subscription.resolvers.Subscription).toBeDefined();
      expect(subscription.resolvers.Subscription.userUpdated).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    test('should handle authentication errors', async () => {
      const PROTECTED_QUERY = gql`
        query GetCurrentUser {
          currentUser {
            id
            name
            email
          }
        }
      `;

      const response = await query({
        query: PROTECTED_QUERY
      });

      expect(response.errors).toBeDefined();
      expect(response.errors[0].message).toContain('authentication');
    });

    test('should handle authorization errors', async () => {
      const ADMIN_QUERY = gql`
        query GetAllUserStats {
          userStats {
            totalUsers
            activeUsers
            adminUsers
          }
        }
      `;

      const response = await query({
        query: ADMIN_QUERY,
        context: {
          user: { id: '1', role: 'USER' } // Non-admin user
        }
      });

      expect(response.errors).toBeDefined();
      expect(response.errors[0].message).toContain('authorization');
    });

    test('should handle validation errors', async () => {
      const INVALID_QUERY = gql`
        query GetUser($id: ID!) {
          user(id: $id) {
            id
            invalidField
          }
        }
      `;

      const response = await query({
        query: INVALID_QUERY,
        variables: { id: '1' }
      });

      expect(response.errors).toBeDefined();
      expect(response.errors[0].message).toContain('Cannot query field');
    });
  });

  describe('Performance Testing', () => {
    test('should handle complex nested queries efficiently', async () => {
      const COMPLEX_QUERY = gql`
        query GetComplexUserData {
          users(first: 10) {
            edges {
              node {
                id
                name
                email
                posts {
                  id
                  title
                  comments {
                    id
                    content
                    author {
                      id
                      name
                      profile {
                        firstName
                        lastName
                      }
                    }
                  }
                }
                followers {
                  id
                  name
                  posts {
                    id
                    title
                  }
                }
              }
            }
          }
        }
      `;

      const startTime = Date.now();
      const response = await query({
        query: COMPLEX_QUERY
      });
      const endTime = Date.now();

      expect(response.errors).toBeUndefined();
      expect(response.data.users).toBeDefined();
      
      // Check query execution time (should be under 1000ms)
      const executionTime = endTime - startTime;
      expect(executionTime).toBeLessThan(1000);
    });

    test('should handle pagination efficiently', async () => {
      const PAGINATED_QUERY = gql`
        query GetPaginatedUsers($first: Int!, $after: String) {
          users(first: $first, after: $after) {
            edges {
              node {
                id
                name
              }
              cursor
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      `;

      const startTime = Date.now();
      const response = await query({
        query: PAGINATED_QUERY,
        variables: { first: 100 }
      });
      const endTime = Date.now();

      expect(response.errors).toBeUndefined();
      expect(response.data.users.edges).toBeInstanceOf(Array);
      
      // Check pagination performance
      const executionTime = endTime - startTime;
      expect(executionTime).toBeLessThan(500);
    });
  });
});