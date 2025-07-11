/// <reference types="cypress" />

describe('Critical Path Smoke Tests', () => {
  beforeEach(() => {
    cy.logTestStart('Critical Path Smoke Test');
  });

  afterEach(() => {
    cy.logTestEnd('Critical Path Smoke Test');
  });

  describe('Application Health Check', () => {
    it('should load the application successfully', () => {
      cy.visit('/');
      
      // Verify page loads within acceptable time
      cy.measurePagePerformance(5000);
      
      // Verify critical elements are present
      cy.get('[data-testid="main-navigation"]').should('be.visible');
      cy.get('[data-testid="primary-content"]').should('be.visible');
      cy.get('[data-testid="footer"]').should('be.visible');
      
      // Verify no JavaScript errors
      cy.window().then((win) => {
        expect(win.console.error).to.not.have.been.called;
      });
    });

    it('should have working navigation', () => {
      cy.visit('/');
      
      // Test main navigation links
      cy.get('[data-testid="nav-home"]').should('be.visible').click();
      cy.assertCurrentUrl('/');
      
      cy.get('[data-testid="nav-about"]').should('be.visible').click();
      cy.assertUrlContains('/about');
      
      cy.get('[data-testid="nav-services"]').should('be.visible').click();
      cy.assertUrlContains('/services');
      
      cy.get('[data-testid="nav-contact"]').should('be.visible').click();
      cy.assertUrlContains('/contact');
    });

    it('should have accessible content', () => {
      cy.visit('/');
      
      // Basic accessibility checks
      cy.runAccessibilityAudit({
        tags: ['wcag2a'],
        rules: {
          'color-contrast': { enabled: true },
          'image-alt': { enabled: true },
          'keyboard': { enabled: true }
        }
      });
      
      // Test keyboard navigation
      cy.get('body').tab();
      cy.focused().should('exist');
    });
  });

  describe('Core Functionality', () => {
    it('should handle search functionality', () => {
      cy.visit('/');
      
      // Open search
      cy.get('[data-testid="search-trigger"]').click();
      cy.get('[data-testid="search-input"]').should('be.visible').and('be.focused');
      
      // Perform search
      cy.get('[data-testid="search-input"]').type('test query');
      cy.get('[data-testid="search-button"]').click();
      
      // Verify search results
      cy.get('[data-testid="search-results"]').should('be.visible');
      cy.get('[data-testid="search-results-count"]').should('be.visible');
    });

    it('should handle contact form submission', () => {
      cy.visit('/contact');
      
      // Fill required fields
      cy.get('[data-testid="contact-name"]').type('John Doe');
      cy.get('[data-testid="contact-email"]').type('john@example.com');
      cy.get('[data-testid="contact-message"]').type('Test message');
      
      // Submit form
      cy.get('[data-testid="contact-submit"]').click();
      
      // Verify success message
      cy.get('[data-testid="success-message"]').should('be.visible');
      cy.get('[data-testid="success-message"]').should('contain.text', 'Thank you');
    });

    it('should handle error states gracefully', () => {
      // Test 404 page
      cy.visit('/non-existent-page', { failOnStatusCode: false });
      cy.get('[data-testid="error-404"]').should('be.visible');
      cy.get('[data-testid="back-to-home"]').should('be.visible');
      
      // Test network error handling
      cy.intercept('GET', '/api/data', { forceNetworkError: true }).as('networkError');
      cy.visit('/data-page');
      cy.wait('@networkError');
      
      cy.get('[data-testid="error-message"]').should('be.visible');
      cy.get('[data-testid="retry-button"]').should('be.visible');
    });
  });

  describe('Performance Critical Paths', () => {
    it('should load homepage within performance budget', () => {
      cy.visit('/');
      
      // Measure and validate performance
      cy.measurePagePerformance(3000).then((metrics) => {
        expect(metrics.fullyLoaded).to.be.lessThan(3000);
        expect(metrics.domContentLoaded).to.be.lessThan(2000);
        expect(metrics.firstByte).to.be.lessThan(800);
      });
      
      // Validate Core Web Vitals
      cy.measureCoreWebVitals().then((webVitals) => {
        expect(webVitals.lcp).to.be.lessThan(2500);
        expect(webVitals.cls).to.be.lessThan(0.1);
      });
    });

    it('should handle concurrent users', () => {
      cy.testPageUnderLoad(5).then((results) => {
        expect(results.averageLoadTime).to.be.lessThan(4000);
        expect(results.successRate).to.be.greaterThan(95);
      });
    });
  });

  describe('API Health Check', () => {
    it('should verify critical API endpoints', () => {
      const criticalEndpoints = [
        '/api/health',
        '/api/status',
        '/api/config'
      ];
      
      criticalEndpoints.forEach(endpoint => {
        cy.apiGet(endpoint).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          cy.validateApiResponseTime(response, 1000);
        });
      });
    });

    it('should handle API authentication', () => {
      // Test authenticated endpoint
      cy.request({
        method: 'GET',
        url: '/api/user/profile',
        headers: {
          'Authorization': 'Bearer test-token'
        }
      }).then((response) => {
        expect(response.status).to.be.oneOf([200, 401]);
      });
    });
  });

  describe('Mobile Responsiveness', () => {
    it('should work on mobile devices', () => {
      cy.viewport(375, 667); // iPhone SE
      cy.visit('/');
      
      // Verify mobile navigation
      cy.get('[data-testid="mobile-menu-toggle"]').should('be.visible');
      cy.get('[data-testid="mobile-menu-toggle"]').click();
      cy.get('[data-testid="mobile-menu"]').should('be.visible');
      
      // Test mobile form interaction
      cy.get('[data-testid="mobile-search"]').should('be.visible').click();
      cy.get('[data-testid="mobile-search-input"]').should('be.visible').type('mobile search');
      
      // Verify mobile performance
      cy.measurePagePerformance(4000).then((metrics) => {
        expect(metrics.fullyLoaded).to.be.lessThan(4000);
      });
    });

    it('should support touch interactions', () => {
      cy.viewport(375, 667);
      cy.visit('/');
      
      // Test touch scrolling
      cy.get('body').trigger('touchstart', { clientY: 100 });
      cy.get('body').trigger('touchmove', { clientY: 50 });
      cy.get('body').trigger('touchend');
      
      // Test touch tap
      cy.get('[data-testid="touch-button"]').trigger('touchstart');
      cy.get('[data-testid="touch-button"]').trigger('touchend');
      
      // Verify touch interaction worked
      cy.get('[data-testid="touch-feedback"]').should('be.visible');
    });
  });

  describe('Cross-Browser Compatibility', () => {
    it('should work across different browsers', () => {
      cy.visit('/');
      
      // Test browser-specific features
      cy.window().then((win) => {
        // Test local storage
        win.localStorage.setItem('test', 'value');
        expect(win.localStorage.getItem('test')).to.equal('value');
        
        // Test session storage
        win.sessionStorage.setItem('test', 'value');
        expect(win.sessionStorage.getItem('test')).to.equal('value');
        
        // Test cookies
        cy.setCookie('test', 'value');
        cy.getCookie('test').should('have.property', 'value', 'value');
      });
    });

    it('should handle browser-specific quirks', () => {
      cy.visit('/');
      
      // Test CSS feature detection
      cy.window().then((win) => {
        const supportsGrid = CSS.supports('display', 'grid');
        const supportsFlexbox = CSS.supports('display', 'flex');
        
        if (supportsGrid) {
          cy.get('[data-testid="grid-container"]').should('have.css', 'display', 'grid');
        }
        
        if (supportsFlexbox) {
          cy.get('[data-testid="flex-container"]').should('have.css', 'display', 'flex');
        }
      });
    });
  });

  describe('Security Smoke Tests', () => {
    it('should have basic security headers', () => {
      cy.request('/').then((response) => {
        // Check for security headers
        expect(response.headers).to.have.property('x-frame-options');
        expect(response.headers).to.have.property('x-content-type-options');
        expect(response.headers).to.have.property('x-xss-protection');
      });
    });

    it('should handle XSS attempts', () => {
      cy.visit('/');
      
      // Test XSS in search
      cy.get('[data-testid="search-input"]').type('<script>alert("XSS")</script>');
      cy.get('[data-testid="search-button"]').click();
      
      // Verify XSS was prevented
      cy.get('[data-testid="search-results"]').should('not.contain', '<script>');
    });

    it('should protect against CSRF', () => {
      cy.visit('/');
      
      // Test CSRF protection on forms
      cy.get('[data-testid="contact-form"]').within(() => {
        cy.get('input[name="_token"]').should('exist');
      });
    });
  });

  describe('Data Integrity', () => {
    it('should handle form data correctly', () => {
      cy.visit('/contact');
      
      const testData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message with special chars: <>&"'
      };
      
      // Fill form
      cy.get('[data-testid="contact-name"]').type(testData.name);
      cy.get('[data-testid="contact-email"]').type(testData.email);
      cy.get('[data-testid="contact-message"]').type(testData.message);
      
      // Submit and verify
      cy.get('[data-testid="contact-submit"]').click();
      
      // Verify data was processed correctly
      cy.get('[data-testid="success-message"]').should('contain', testData.name);
    });

    it('should maintain session state', () => {
      cy.visit('/');
      
      // Set session data
      cy.setSessionStorage('user_preference', 'dark_mode');
      cy.setLocalStorage('last_visit', new Date().toISOString());
      
      // Navigate and verify persistence
      cy.visit('/about');
      cy.getSessionStorage('user_preference').should('equal', 'dark_mode');
      cy.getLocalStorage('last_visit').should('not.be.empty');
    });
  });

  describe('Accessibility Compliance', () => {
    it('should meet WCAG 2.1 AA standards', () => {
      cy.visit('/');
      
      // Run comprehensive accessibility audit
      cy.runAccessibilityAudit({
        tags: ['wcag2a', 'wcag2aa'],
        rules: {
          'color-contrast': { enabled: true },
          'keyboard': { enabled: true },
          'focus-order': { enabled: true },
          'image-alt': { enabled: true },
          'label': { enabled: true }
        }
      });
    });

    it('should support keyboard navigation', () => {
      cy.visit('/');
      
      // Test tab order
      cy.get('body').tab();
      cy.focused().should('exist');
      
      // Test skip links
      cy.get('body').tab();
      cy.focused().should('contain.text', 'Skip to main content');
      
      // Test main navigation
      cy.get('[data-testid="main-navigation"]').within(() => {
        cy.get('a').first().focus();
        cy.focused().should('be.visible');
      });
    });
  });

  describe('Integration Points', () => {
    it('should integrate with external services', () => {
      // Test analytics integration
      cy.window().then((win) => {
        // Check if analytics is loaded
        expect(win.gtag || win.ga || win._gaq).to.exist;
      });
      
      // Test third-party widgets
      cy.get('[data-testid="social-widget"]').should('be.visible');
      cy.get('[data-testid="chat-widget"]').should('be.visible');
    });

    it('should handle service failures gracefully', () => {
      // Simulate service failure
      cy.intercept('GET', '/api/external-service', { statusCode: 500 }).as('serviceFailure');
      
      cy.visit('/');
      cy.wait('@serviceFailure');
      
      // Verify graceful degradation
      cy.get('[data-testid="fallback-content"]').should('be.visible');
      cy.get('[data-testid="error-boundary"]').should('not.exist');
    });
  });
});