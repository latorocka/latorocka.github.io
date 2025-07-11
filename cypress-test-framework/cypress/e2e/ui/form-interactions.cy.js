/// <reference types="cypress" />

describe('Form Interactions Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.logTestStart('Form Interactions Test');
  });

  afterEach(() => {
    cy.logTestEnd('Form Interactions Test');
  });

  describe('Basic Form Operations', () => {
    it('should fill and submit a contact form', () => {
      cy.get('@testData').then((data) => {
        const formData = data.formData.contactForm;
        
        // Navigate to contact form
        cy.get('[data-testid="contact-form"]').should('be.visible');
        
        // Fill form fields
        cy.safeType('[data-testid="name-input"]', formData.name);
        cy.safeType('[data-testid="email-input"]', formData.email);
        cy.safeType('[data-testid="subject-input"]', formData.subject);
        cy.safeType('[data-testid="message-input"]', formData.message);
        
        // Submit form
        cy.safeClick('[data-testid="submit-button"]');
        
        // Verify success message
        cy.get('[data-testid="success-message"]').should('be.visible');
        cy.assertElementContainsText('[data-testid="success-message"]', 'success');
      });
    });

    it('should validate required fields', () => {
      cy.get('[data-testid="contact-form"]').should('be.visible');
      
      // Try to submit empty form
      cy.safeClick('[data-testid="submit-button"]');
      
      // Check for validation errors
      cy.get('[data-testid="name-error"]').should('be.visible');
      cy.get('[data-testid="email-error"]').should('be.visible');
      cy.get('[data-testid="message-error"]').should('be.visible');
    });

    it('should validate email format', () => {
      cy.get('[data-testid="contact-form"]').should('be.visible');
      
      // Enter invalid email
      cy.safeType('[data-testid="email-input"]', 'invalid-email');
      cy.safeClick('[data-testid="submit-button"]');
      
      // Check for email validation error
      cy.get('[data-testid="email-error"]').should('be.visible');
      cy.assertElementContainsText('[data-testid="email-error"]', 'valid email');
    });
  });

  describe('Advanced Form Features', () => {
    it('should handle file uploads', () => {
      cy.get('[data-testid="file-upload"]').should('exist');
      
      // Upload a test file
      cy.uploadFile('[data-testid="file-input"]', 'test-file.txt', 'text/plain');
      
      // Verify file was uploaded
      cy.get('[data-testid="uploaded-file"]').should('be.visible');
      cy.assertElementContainsText('[data-testid="uploaded-file"]', 'test-file.txt');
    });

    it('should handle multi-select dropdowns', () => {
      const options = ['Option 1', 'Option 2', 'Option 3'];
      
      cy.selectMultipleOptions('[data-testid="multi-select"]', options);
      
      // Verify selected options
      options.forEach(option => {
        cy.get(`[data-testid="selected-option-${option}"]`).should('be.visible');
      });
    });

    it('should handle dynamic form fields', () => {
      // Add dynamic field
      cy.safeClick('[data-testid="add-field-button"]');
      
      // Verify new field appears
      cy.get('[data-testid="dynamic-field-1"]').should('be.visible');
      
      // Fill dynamic field
      cy.safeType('[data-testid="dynamic-field-1"]', 'Dynamic content');
      
      // Remove dynamic field
      cy.safeClick('[data-testid="remove-field-1"]');
      
      // Verify field is removed
      cy.get('[data-testid="dynamic-field-1"]').should('not.exist');
    });
  });

  describe('Form Validation', () => {
    it('should validate password strength', () => {
      const weakPassword = '123';
      const strongPassword = 'StrongP@ssw0rd123';
      
      // Test weak password
      cy.safeType('[data-testid="password-input"]', weakPassword);
      cy.get('[data-testid="password-strength"]').should('contain.text', 'weak');
      
      // Test strong password
      cy.safeType('[data-testid="password-input"]', strongPassword);
      cy.get('[data-testid="password-strength"]').should('contain.text', 'strong');
    });

    it('should validate password confirmation', () => {
      const password = 'TestPassword123';
      const mismatchedPassword = 'DifferentPassword456';
      
      // Enter password
      cy.safeType('[data-testid="password-input"]', password);
      
      // Enter mismatched confirmation
      cy.safeType('[data-testid="confirm-password-input"]', mismatchedPassword);
      
      // Check for mismatch error
      cy.get('[data-testid="password-mismatch-error"]').should('be.visible');
      
      // Enter matching confirmation
      cy.safeType('[data-testid="confirm-password-input"]', password);
      
      // Verify error is cleared
      cy.get('[data-testid="password-mismatch-error"]').should('not.exist');
    });

    it('should validate real-time field validation', () => {
      // Test email validation while typing
      cy.safeType('[data-testid="email-input"]', 'test@');
      cy.get('[data-testid="email-error"]').should('be.visible');
      
      cy.safeType('[data-testid="email-input"]', 'example.com');
      cy.get('[data-testid="email-error"]').should('not.exist');
    });
  });

  describe('Form Accessibility', () => {
    it('should have proper form accessibility', () => {
      cy.testFormAccessibility();
    });

    it('should support keyboard navigation', () => {
      // Tab through form fields
      cy.get('body').tab();
      cy.focused().should('have.attr', 'data-testid', 'name-input');
      
      cy.get('body').tab();
      cy.focused().should('have.attr', 'data-testid', 'email-input');
      
      cy.get('body').tab();
      cy.focused().should('have.attr', 'data-testid', 'subject-input');
      
      cy.get('body').tab();
      cy.focused().should('have.attr', 'data-testid', 'message-input');
      
      cy.get('body').tab();
      cy.focused().should('have.attr', 'data-testid', 'submit-button');
    });

    it('should announce form errors to screen readers', () => {
      cy.testErrorAnnouncements();
    });
  });

  describe('Form Performance', () => {
    it('should handle large datasets in dropdowns', () => {
      const startTime = Date.now();
      
      // Click dropdown with many options
      cy.safeClick('[data-testid="large-dropdown"]');
      
      // Verify dropdown opens within acceptable time
      cy.get('[data-testid="dropdown-options"]').should('be.visible');
      
      const endTime = Date.now();
      const loadTime = endTime - startTime;
      
      expect(loadTime).to.be.lessThan(1000); // Should open within 1 second
    });

    it('should handle rapid form interactions', () => {
      const rapidInputs = ['a', 'b', 'c', 'd', 'e'];
      
      rapidInputs.forEach(input => {
        cy.safeType('[data-testid="rapid-input"]', input);
        cy.wait(50); // Very fast typing
      });
      
      // Verify all inputs were processed
      cy.get('[data-testid="rapid-input"]').should('have.value', 'abcde');
    });
  });

  describe('Form Cross-Browser Compatibility', () => {
    it('should work across different viewports', () => {
      // Test mobile viewport
      cy.testResponsiveDesign('mobile');
      cy.get('[data-testid="contact-form"]').should('be.visible');
      
      // Test tablet viewport
      cy.testResponsiveDesign('tablet');
      cy.get('[data-testid="contact-form"]').should('be.visible');
      
      // Test desktop viewport
      cy.testResponsiveDesign('desktop');
      cy.get('[data-testid="contact-form"]').should('be.visible');
    });

    it('should handle different input methods', () => {
      // Test mouse interactions
      cy.safeClick('[data-testid="name-input"]');
      cy.safeType('[data-testid="name-input"]', 'Mouse Input');
      
      // Test keyboard interactions
      cy.pressKey('tab');
      cy.focused().type('Keyboard Input');
      
      // Test touch interactions (simulated)
      cy.get('[data-testid="submit-button"]').trigger('touchstart');
      cy.get('[data-testid="submit-button"]').trigger('touchend');
    });
  });
});