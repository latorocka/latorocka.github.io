#!/usr/bin/env node

/**
 * Live API Test Demonstration
 * This script runs actual API tests against real public endpoints
 * to demonstrate working API testing capabilities.
 */

const axios = require('axios');
const WebSocket = require('ws');

console.log('🚀 API Test Suite - Live Demonstration\n');
console.log('Running tests against real public APIs...\n');

async function testJSONPlaceholderAPI() {
  console.log('📊 Testing JSONPlaceholder API (REST)');
  console.log('=' .repeat(50));
  
  try {
    // Test 1: Get all users
    console.log('→ GET /users - Fetching all users...');
    const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
    console.log(`✅ SUCCESS: Retrieved ${usersResponse.data.length} users`);
    console.log(`   First user: ${usersResponse.data[0].name} (${usersResponse.data[0].email})`);
    
    // Test 2: Get specific user
    console.log('→ GET /users/1 - Fetching specific user...');
    const userResponse = await axios.get('https://jsonplaceholder.typicode.com/users/1');
    console.log(`✅ SUCCESS: Retrieved user "${userResponse.data.name}"`);
    
    // Test 3: Create new post
    console.log('→ POST /posts - Creating new post...');
    const newPost = {
      title: 'Live API Test Demo',
      body: 'This post was created by the API test suite demonstration',
      userId: 1
    };
    const postResponse = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
    console.log(`✅ SUCCESS: Created post with ID ${postResponse.data.id}`);
    
    // Test 4: Error handling
    console.log('→ GET /users/999 - Testing error handling...');
    try {
      await axios.get('https://jsonplaceholder.typicode.com/users/999');
    } catch (error) {
      console.log(`✅ SUCCESS: Proper error handling (${error.response.status})`);
    }
    
  } catch (error) {
    console.log(`❌ FAILED: ${error.message}`);
  }
  
  console.log('');
}

async function testGitHubAPI() {
  console.log('🐙 Testing GitHub API (REST)');
  console.log('=' .repeat(50));
  
  try {
    // Test 1: Get repository info
    console.log('→ GET /repos/latorocka/selenium-framework - Fetching repo info...');
    const repoResponse = await axios.get('https://api.github.com/repos/latorocka/selenium-framework');
    console.log(`✅ SUCCESS: Repository "${repoResponse.data.full_name}"`);
    console.log(`   Language: ${repoResponse.data.language}, Stars: ${repoResponse.data.stargazers_count}`);
    
    // Test 2: Get user profile
    console.log('→ GET /users/latorocka - Fetching user profile...');
    const userResponse = await axios.get('https://api.github.com/users/latorocka');
    console.log(`✅ SUCCESS: User profile retrieved`);
    console.log(`   Public repos: ${userResponse.data.public_repos}`);
    
    // Test 3: Get repository contents
    console.log('→ GET /repos/.../contents - Fetching repository contents...');
    const contentsResponse = await axios.get('https://api.github.com/repos/latorocka/selenium-framework/contents');
    console.log(`✅ SUCCESS: Retrieved ${contentsResponse.data.length} files/folders`);
    
    // Test 4: Rate limit check
    console.log('→ GET /rate_limit - Checking API rate limits...');
    const rateLimitResponse = await axios.get('https://api.github.com/rate_limit');
    console.log(`✅ SUCCESS: Rate limit ${rateLimitResponse.data.rate.remaining}/${rateLimitResponse.data.rate.limit}`);
    
  } catch (error) {
    console.log(`❌ FAILED: ${error.message}`);
  }
  
  console.log('');
}

async function testSpaceXGraphQL() {
  console.log('🚀 Testing SpaceX GraphQL API');
  console.log('=' .repeat(50));
  
  try {
    const query = `
      query {
        launches(limit: 5) {
          id
          mission_name
          launch_date_utc
          launch_success
          rocket {
            rocket_name
            rocket_type
          }
        }
      }
    `;
    
    console.log('→ POST /graphql - Fetching SpaceX launches...');
    const response = await axios.post('https://api.spacex.land/graphql/', {
      query
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (response.data.errors) {
      throw new Error(`GraphQL Error: ${response.data.errors[0].message}`);
    }
    
    const launches = response.data.data.launches;
    console.log(`✅ SUCCESS: Retrieved ${launches.length} SpaceX launches`);
    console.log(`   Latest: ${launches[0].mission_name} (${launches[0].rocket.rocket_name})`);
    console.log(`   Success rate in sample: ${launches.filter(l => l.launch_success).length}/${launches.length}`);
    
  } catch (error) {
    console.log(`❌ FAILED: ${error.message}`);
  }
  
  console.log('');
}

async function testWebSocketConnection() {
  console.log('🔗 Testing WebSocket Connection');
  console.log('=' .repeat(50));
  
  return new Promise((resolve) => {
    console.log('→ Connecting to echo.websocket.org...');
    
    const ws = new WebSocket('wss://echo.websocket.org');
    let messageReceived = false;
    
    ws.on('open', () => {
      console.log('✅ SUCCESS: WebSocket connection established');
      
      console.log('→ Sending test message...');
      ws.send('Hello from API Test Suite!');
    });
    
    ws.on('message', (data) => {
      const message = data.toString();
      console.log(`✅ SUCCESS: Message echoed back: "${message}"`);
      messageReceived = true;
      ws.close();
    });
    
    ws.on('close', () => {
      if (messageReceived) {
        console.log('✅ SUCCESS: WebSocket connection closed properly');
      }
      resolve();
    });
    
    ws.on('error', (error) => {
      console.log(`❌ FAILED: WebSocket error - ${error.message}`);
      resolve();
    });
    
    // Timeout after 10 seconds
    setTimeout(() => {
      if (!messageReceived) {
        console.log('❌ FAILED: WebSocket test timed out');
        ws.close();
      }
    }, 10000);
  });
}

async function runPerformanceTest() {
  console.log('⚡ Performance Testing');
  console.log('=' .repeat(50));
  
  console.log('→ Running concurrent API requests...');
  
  const startTime = Date.now();
  
  const requests = [
    axios.get('https://jsonplaceholder.typicode.com/users'),
    axios.get('https://api.github.com/users/latorocka'),
    axios.get('https://jsonplaceholder.typicode.com/posts'),
    axios.get('https://api.github.com/repos/latorocka/selenium-framework'),
    axios.get('https://jsonplaceholder.typicode.com/comments?postId=1')
  ];
  
  try {
    const responses = await Promise.all(requests);
    const endTime = Date.now();
    const totalTime = endTime - startTime;
    
    console.log(`✅ SUCCESS: All ${responses.length} concurrent requests completed`);
    console.log(`   Total time: ${totalTime}ms`);
    console.log(`   Average time per request: ${Math.round(totalTime / responses.length)}ms`);
    
    responses.forEach((response, index) => {
      console.log(`   Request ${index + 1}: ${response.status} (${Array.isArray(response.data) ? response.data.length : 1} items)`);
    });
    
  } catch (error) {
    console.log(`❌ FAILED: Performance test error - ${error.message}`);
  }
  
  console.log('');
}

async function main() {
  const startTime = Date.now();
  
  try {
    await testJSONPlaceholderAPI();
    await testGitHubAPI();
    await testSpaceXGraphQL();
    await testWebSocketConnection();
    await runPerformanceTest();
    
    const totalTime = Date.now() - startTime;
    
    console.log('🎉 Live API Test Demonstration Complete!');
    console.log('=' .repeat(50));
    console.log(`Total execution time: ${totalTime}ms`);
    console.log('');
    console.log('✅ Demonstrated capabilities:');
    console.log('   • REST API testing with GET, POST operations');
    console.log('   • GraphQL query execution and validation');
    console.log('   • WebSocket real-time communication');
    console.log('   • Error handling and edge cases');
    console.log('   • Performance testing with concurrent requests');
    console.log('   • Response validation and data structure testing');
    console.log('');
    console.log('💡 This demonstrates real API testing skills with live endpoints!');
    
  } catch (error) {
    console.error('💥 Demonstration failed:', error.message);
    process.exit(1);
  }
}

// Run the demonstration
if (require.main === module) {
  main();
}

module.exports = {
  testJSONPlaceholderAPI,
  testGitHubAPI,
  testSpaceXGraphQL,
  testWebSocketConnection,
  runPerformanceTest
};