#!/usr/bin/env node

/**
 * API Test Suite Runner
 * Comprehensive test execution with detailed reporting and categorization
 */

const { spawn } = require('child_process');
const path = require('path');

class TestRunner {
  constructor() {
    this.testCategories = {
      'Functional Tests': {
        path: 'tests/rest/user-api.test.js',
        description: 'CRUD operations and core API functionality'
      },
      'Integration Tests': {
        path: 'tests/integration/api-integration.test.js',
        description: 'Cross-API workflows and data consistency'
      },
      'Performance Tests': {
        path: 'tests/performance/load-testing.test.js',
        description: 'Response times, throughput, and scalability'
      },
      'Security Tests': {
        path: 'tests/security/security-validation.test.js',
        description: 'Input validation, authentication, and security vulnerabilities'
      },
      'Data Validation Tests': {
        path: 'tests/data-validation/schema-validation.test.js',
        description: 'Schema validation and data structure verification'
      },
      'GraphQL Tests': {
        path: 'tests/graphql/user-queries.test.js',
        description: 'GraphQL query validation and schema testing'
      },
      'WebSocket Tests': {
        path: 'tests/websocket/real-time.test.js',
        description: 'Real-time communication and connection management'
      },
      'GitHub API Tests': {
        path: 'tests/rest/github-api.test.js',
        description: 'GitHub repository and user data validation'
      }
    };
    
    this.results = {
      passed: 0,
      failed: 0,
      skipped: 0,
      totalTime: 0,
      categories: {}
    };
  }

  async runAllTests() {
    console.log('🚀 API Test Suite - Comprehensive Test Execution');
    console.log('=' .repeat(80));
    console.log('');
    
    const startTime = Date.now();
    
    for (const [category, config] of Object.entries(this.testCategories)) {
      await this.runTestCategory(category, config);
    }
    
    const endTime = Date.now();
    this.results.totalTime = endTime - startTime;
    
    this.generateSummaryReport();
  }

  async runTestCategory(category, config) {
    console.log(`📋 ${category}`);
    console.log(`   ${config.description}`);
    console.log('   ' + '-'.repeat(60));
    
    const categoryStartTime = Date.now();
    
    try {
      const result = await this.executeJestTest(config.path);
      const categoryEndTime = Date.now();
      const categoryTime = categoryEndTime - categoryStartTime;
      
      this.results.categories[category] = {
        ...result,
        executionTime: categoryTime,
        description: config.description
      };
      
      this.results.passed += result.passed;
      this.results.failed += result.failed;
      this.results.skipped += result.skipped;
      
      const status = result.failed === 0 ? '✅ PASSED' : '❌ FAILED';
      console.log(`   ${status} - ${result.passed} passed, ${result.failed} failed, ${result.skipped} skipped (${categoryTime}ms)`);
      
    } catch (error) {
      console.log(`   ❌ ERROR - Category failed to execute: ${error.message}`);
      this.results.categories[category] = {
        passed: 0,
        failed: 1,
        skipped: 0,
        executionTime: Date.now() - categoryStartTime,
        error: error.message
      };
      this.results.failed++;
    }
    
    console.log('');
  }

  async executeJestTest(testPath) {
    return new Promise((resolve, reject) => {
      const jest = spawn('npx', ['jest', testPath, '--json'], {
        stdio: ['ignore', 'pipe', 'pipe'],
        cwd: path.dirname(__dirname)
      });

      let stdout = '';
      let stderr = '';

      jest.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      jest.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      jest.on('close', (code) => {
        try {
          const result = JSON.parse(stdout);
          resolve({
            passed: result.numPassedTests || 0,
            failed: result.numFailedTests || 0,
            skipped: result.numPendingTests || 0,
            testResults: result.testResults
          });
        } catch (parseError) {
          // If JSON parsing fails, try to extract basic info
          const passedMatch = stderr.match(/(\d+) passing/);
          const failedMatch = stderr.match(/(\d+) failing/);
          
          resolve({
            passed: passedMatch ? parseInt(passedMatch[1]) : 0,
            failed: failedMatch ? parseInt(failedMatch[1]) : (code !== 0 ? 1 : 0),
            skipped: 0,
            rawOutput: stderr
          });
        }
      });

      jest.on('error', (error) => {
        reject(error);
      });
    });
  }

  generateSummaryReport() {
    console.log('📊 Test Execution Summary');
    console.log('=' .repeat(80));
    console.log('');
    
    // Overall results
    const totalTests = this.results.passed + this.results.failed + this.results.skipped;
    const successRate = totalTests > 0 ? ((this.results.passed / totalTests) * 100).toFixed(1) : 0;
    
    console.log(`Total Tests: ${totalTests}`);
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`⏸️  Skipped: ${this.results.skipped}`);
    console.log(`📈 Success Rate: ${successRate}%`);
    console.log(`⏱️  Total Time: ${this.results.totalTime}ms`);
    console.log('');
    
    // Category breakdown
    console.log('📋 Category Results:');
    console.log('-'.repeat(80));
    
    for (const [category, result] of Object.entries(this.results.categories)) {
      const categoryTotal = result.passed + result.failed + result.skipped;
      const categorySuccess = categoryTotal > 0 ? ((result.passed / categoryTotal) * 100).toFixed(1) : 0;
      const status = result.failed === 0 ? '✅' : '❌';
      
      console.log(`${status} ${category.padEnd(25)} | ${result.passed.toString().padStart(3)} passed | ${result.failed.toString().padStart(3)} failed | ${categorySuccess.padStart(5)}% | ${result.executionTime.toString().padStart(6)}ms`);
    }
    
    console.log('');
    
    // Recommendations
    if (this.results.failed > 0) {
      console.log('🔍 Recommendations:');
      console.log('-'.repeat(40));
      
      for (const [category, result] of Object.entries(this.results.categories)) {
        if (result.failed > 0) {
          console.log(`• Review ${category} - ${result.failed} test(s) failed`);
        }
      }
      console.log('');
    }
    
    // Performance insights
    const avgCategoryTime = Object.values(this.results.categories)
      .reduce((sum, cat) => sum + cat.executionTime, 0) / Object.keys(this.results.categories).length;
    
    console.log('⚡ Performance Insights:');
    console.log('-'.repeat(40));
    console.log(`Average category execution time: ${avgCategoryTime.toFixed(0)}ms`);
    
    const slowestCategory = Object.entries(this.results.categories)
      .sort((a, b) => b[1].executionTime - a[1].executionTime)[0];
    
    if (slowestCategory) {
      console.log(`Slowest category: ${slowestCategory[0]} (${slowestCategory[1].executionTime}ms)`);
    }
    
    console.log('');
    
    // Final status
    if (this.results.failed === 0) {
      console.log('🎉 All tests passed! API suite is functioning correctly.');
    } else {
      console.log('⚠️  Some tests failed. Review the detailed results above.');
    }
    
    console.log('=' .repeat(80));
  }

  async runSpecificCategory(categoryName) {
    console.log(`🎯 Running specific category: ${categoryName}`);
    console.log('=' .repeat(60));
    
    const config = this.testCategories[categoryName];
    if (!config) {
      console.error(`❌ Category "${categoryName}" not found.`);
      console.log('Available categories:');
      Object.keys(this.testCategories).forEach(cat => console.log(`  • ${cat}`));
      return;
    }
    
    await this.runTestCategory(categoryName, config);
  }

  listCategories() {
    console.log('📋 Available Test Categories:');
    console.log('=' .repeat(60));
    
    for (const [category, config] of Object.entries(this.testCategories)) {
      console.log(`• ${category}`);
      console.log(`  ${config.description}`);
      console.log(`  Path: ${config.path}`);
      console.log('');
    }
  }
}

// CLI interface
async function main() {
  const runner = new TestRunner();
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    await runner.runAllTests();
  } else if (args[0] === '--list') {
    runner.listCategories();
  } else if (args[0] === '--category' && args[1]) {
    await runner.runSpecificCategory(args[1]);
  } else {
    console.log('API Test Suite Runner');
    console.log('');
    console.log('Usage:');
    console.log('  node test-runner.js                    # Run all tests');
    console.log('  node test-runner.js --list             # List available categories');
    console.log('  node test-runner.js --category <name>  # Run specific category');
    console.log('');
    console.log('Examples:');
    console.log('  node test-runner.js --category "Functional Tests"');
    console.log('  node test-runner.js --category "Performance Tests"');
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = TestRunner;