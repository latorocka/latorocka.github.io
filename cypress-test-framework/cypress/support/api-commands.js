// ***********************************************
// API Testing Commands
// Custom commands for API testing scenarios
// ***********************************************

/**
 * Custom command to make GET request with validation
 * @param {string} endpoint - API endpoint
 * @param {object} options - Request options
 */
Cypress.Commands.add('apiGet', (endpoint, options = {}) => {
  return cy.request({
    method: 'GET',
    url: endpoint,
    ...options
  }).then((response) => {
    expect(response.status).to.be.oneOf([200, 201, 202]);
    return response;
  });
});

/**
 * Custom command to make POST request with validation
 * @param {string} endpoint - API endpoint
 * @param {object} body - Request body
 * @param {object} options - Request options
 */
Cypress.Commands.add('apiPost', (endpoint, body, options = {}) => {
  return cy.request({
    method: 'POST',
    url: endpoint,
    body: body,
    ...options
  }).then((response) => {
    expect(response.status).to.be.oneOf([200, 201, 202]);
    return response;
  });
});

/**
 * Custom command to make PUT request with validation
 * @param {string} endpoint - API endpoint
 * @param {object} body - Request body
 * @param {object} options - Request options
 */
Cypress.Commands.add('apiPut', (endpoint, body, options = {}) => {
  return cy.request({
    method: 'PUT',
    url: endpoint,
    body: body,
    ...options
  }).then((response) => {
    expect(response.status).to.be.oneOf([200, 201, 202]);
    return response;
  });
});

/**
 * Custom command to make PATCH request with validation
 * @param {string} endpoint - API endpoint
 * @param {object} body - Request body
 * @param {object} options - Request options
 */
Cypress.Commands.add('apiPatch', (endpoint, body, options = {}) => {
  return cy.request({
    method: 'PATCH',
    url: endpoint,
    body: body,
    ...options
  }).then((response) => {
    expect(response.status).to.be.oneOf([200, 201, 202]);
    return response;
  });
});

/**
 * Custom command to make DELETE request with validation
 * @param {string} endpoint - API endpoint
 * @param {object} options - Request options
 */
Cypress.Commands.add('apiDelete', (endpoint, options = {}) => {
  return cy.request({
    method: 'DELETE',
    url: endpoint,
    ...options
  }).then((response) => {
    expect(response.status).to.be.oneOf([200, 201, 202, 204]);
    return response;
  });
});

/**
 * Custom command to validate API response schema
 * @param {object} response - API response object
 * @param {object} schema - Expected schema
 */
Cypress.Commands.add('validateApiSchema', (response, schema) => {
  Object.keys(schema).forEach(key => {
    expect(response.body).to.have.property(key);
    if (schema[key] !== null) {
      expect(response.body[key]).to.be.a(schema[key]);
    }
  });
});

/**
 * Custom command to validate API response time
 * @param {object} response - API response object
 * @param {number} maxTime - Maximum acceptable response time in ms
 */
Cypress.Commands.add('validateApiResponseTime', (response, maxTime) => {
  expect(response.duration).to.be.lessThan(maxTime);
});

/**
 * Custom command to validate API response headers
 * @param {object} response - API response object
 * @param {object} expectedHeaders - Expected headers
 */
Cypress.Commands.add('validateApiHeaders', (response, expectedHeaders) => {
  Object.keys(expectedHeaders).forEach(header => {
    expect(response.headers).to.have.property(header.toLowerCase());
    if (expectedHeaders[header] !== null) {
      expect(response.headers[header.toLowerCase()]).to.equal(expectedHeaders[header]);
    }
  });
});

/**
 * Custom command to validate API error response
 * @param {object} response - API response object
 * @param {number} expectedStatus - Expected error status code
 * @param {string} expectedMessage - Expected error message
 */
Cypress.Commands.add('validateApiError', (response, expectedStatus, expectedMessage = null) => {
  expect(response.status).to.equal(expectedStatus);
  if (expectedMessage) {
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.contain(expectedMessage);
  }
});

/**
 * Custom command to authenticate API request
 * @param {string} token - Authentication token
 */
Cypress.Commands.add('setApiAuth', (token) => {
  cy.intercept('**', (req) => {
    req.headers['Authorization'] = `Bearer ${token}`;
  });
});

/**
 * Custom command to set API headers
 * @param {object} headers - Headers to set
 */
Cypress.Commands.add('setApiHeaders', (headers) => {
  cy.intercept('**', (req) => {
    Object.keys(headers).forEach(key => {
      req.headers[key] = headers[key];
    });
  });
});

/**
 * Custom command to mock API response
 * @param {string} endpoint - API endpoint to mock
 * @param {object} mockResponse - Mock response data
 * @param {number} statusCode - Response status code
 */
Cypress.Commands.add('mockApiResponse', (endpoint, mockResponse, statusCode = 200) => {
  cy.intercept('GET', endpoint, {
    statusCode: statusCode,
    body: mockResponse
  }).as('mockedApiCall');
});

/**
 * Custom command to test API rate limiting
 * @param {string} endpoint - API endpoint
 * @param {number} requestCount - Number of requests to make
 * @param {number} timeWindow - Time window in ms
 */
Cypress.Commands.add('testApiRateLimit', (endpoint, requestCount, timeWindow) => {
  const requests = [];
  for (let i = 0; i < requestCount; i++) {
    requests.push(cy.request({ url: endpoint, failOnStatusCode: false }));
  }
  
  return cy.wrap(Promise.all(requests)).then((responses) => {
    const rateLimitedResponses = responses.filter(r => r.status === 429);
    expect(rateLimitedResponses.length).to.be.greaterThan(0);
  });
});

/**
 * Custom command to test API pagination
 * @param {string} endpoint - API endpoint
 * @param {number} pageSize - Page size
 * @param {number} totalPages - Total pages to test
 */
Cypress.Commands.add('testApiPagination', (endpoint, pageSize, totalPages) => {
  const requests = [];
  for (let page = 1; page <= totalPages; page++) {
    requests.push(
      cy.request(`${endpoint}?page=${page}&limit=${pageSize}`)
        .then(response => {
          expect(response.status).to.equal(200);
          expect(response.body.data).to.have.length.at.most(pageSize);
          return response;
        })
    );
  }
  return cy.wrap(Promise.all(requests));
});

/**
 * Custom command to test API sorting
 * @param {string} endpoint - API endpoint
 * @param {string} sortField - Field to sort by
 * @param {string} sortOrder - Sort order (asc/desc)
 */
Cypress.Commands.add('testApiSorting', (endpoint, sortField, sortOrder) => {
  return cy.request(`${endpoint}?sort=${sortField}&order=${sortOrder}`)
    .then(response => {
      expect(response.status).to.equal(200);
      const data = response.body.data || response.body;
      
      if (data.length > 1) {
        for (let i = 1; i < data.length; i++) {
          const current = data[i][sortField];
          const previous = data[i - 1][sortField];
          
          if (sortOrder === 'asc') {
            expect(current).to.be.at.least(previous);
          } else {
            expect(current).to.be.at.most(previous);
          }
        }
      }
      
      return response;
    });
});

/**
 * Custom command to test API filtering
 * @param {string} endpoint - API endpoint
 * @param {object} filters - Filters to apply
 */
Cypress.Commands.add('testApiFiltering', (endpoint, filters) => {
  const queryParams = new URLSearchParams(filters).toString();
  return cy.request(`${endpoint}?${queryParams}`)
    .then(response => {
      expect(response.status).to.equal(200);
      const data = response.body.data || response.body;
      
      // Validate that all returned items match the filters
      data.forEach(item => {
        Object.keys(filters).forEach(filterKey => {
          expect(item[filterKey]).to.equal(filters[filterKey]);
        });
      });
      
      return response;
    });
});

/**
 * Custom command to test API search functionality
 * @param {string} endpoint - API endpoint
 * @param {string} searchTerm - Search term
 * @param {string} searchField - Field to search in
 */
Cypress.Commands.add('testApiSearch', (endpoint, searchTerm, searchField) => {
  return cy.request(`${endpoint}?search=${searchTerm}`)
    .then(response => {
      expect(response.status).to.equal(200);
      const data = response.body.data || response.body;
      
      // Validate that all returned items contain the search term
      data.forEach(item => {
        expect(item[searchField].toLowerCase()).to.contain(searchTerm.toLowerCase());
      });
      
      return response;
    });
});

/**
 * Custom command to perform API load testing
 * @param {string} endpoint - API endpoint
 * @param {number} concurrentUsers - Number of concurrent users
 * @param {number} duration - Test duration in seconds
 */
Cypress.Commands.add('performApiLoadTest', (endpoint, concurrentUsers, duration) => {
  const startTime = Date.now();
  const endTime = startTime + (duration * 1000);
  const requests = [];
  
  for (let i = 0; i < concurrentUsers; i++) {
    const userRequests = [];
    
    const makeRequest = () => {
      if (Date.now() < endTime) {
        userRequests.push(
          cy.request(endpoint).then(response => {
            expect(response.status).to.be.oneOf([200, 201, 202]);
            return response;
          })
        );
        setTimeout(makeRequest, 100); // 100ms between requests per user
      }
    };
    
    makeRequest();
    requests.push(...userRequests);
  }
  
  return cy.wrap(Promise.all(requests)).then(responses => {
    const averageResponseTime = responses.reduce((sum, r) => sum + r.duration, 0) / responses.length;
    const successRate = (responses.filter(r => r.status < 400).length / responses.length) * 100;
    
    cy.log(`Load test results: ${responses.length} requests, ${averageResponseTime.toFixed(2)}ms avg response time, ${successRate.toFixed(2)}% success rate`);
    
    return {
      totalRequests: responses.length,
      averageResponseTime,
      successRate,
      responses
    };
  });
});

/**
 * Custom command to validate API CORS headers
 * @param {string} endpoint - API endpoint
 * @param {string} origin - Origin to test
 */
Cypress.Commands.add('validateApiCors', (endpoint, origin) => {
  return cy.request({
    method: 'OPTIONS',
    url: endpoint,
    headers: {
      'Origin': origin,
      'Access-Control-Request-Method': 'GET'
    }
  }).then(response => {
    expect(response.headers).to.have.property('access-control-allow-origin');
    expect(response.headers).to.have.property('access-control-allow-methods');
    return response;
  });
});

/**
 * Custom command to test API with invalid data
 * @param {string} endpoint - API endpoint
 * @param {object} invalidData - Invalid data to send
 * @param {string} method - HTTP method
 */
Cypress.Commands.add('testApiWithInvalidData', (endpoint, invalidData, method = 'POST') => {
  return cy.request({
    method: method,
    url: endpoint,
    body: invalidData,
    failOnStatusCode: false
  }).then(response => {
    expect(response.status).to.be.oneOf([400, 422]);
    expect(response.body).to.have.property('error');
    return response;
  });
});