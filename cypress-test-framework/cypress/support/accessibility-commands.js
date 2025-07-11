// ***********************************************
// Accessibility Testing Commands
// Custom commands for accessibility testing scenarios
// ***********************************************

/**
 * Custom command to run comprehensive accessibility audit
 * @param {object} options - Axe-core options
 */
Cypress.Commands.add('runAccessibilityAudit', (options = {}) => {
  cy.injectAxe();
  cy.checkA11y(null, options, (violations) => {
    cy.task('log', `Accessibility violations found: ${violations.length}`);
    violations.forEach(violation => {
      cy.task('log', `Violation: ${violation.id} - ${violation.description}`);
      cy.task('log', `Impact: ${violation.impact}`);
      cy.task('log', `Nodes: ${violation.nodes.length}`);
    });
  });
});

/**
 * Custom command to test keyboard navigation
 */
Cypress.Commands.add('testKeyboardNavigation', () => {
  cy.get('body').tab();
  
  // Test Tab navigation
  cy.focused().then($focused => {
    if ($focused.length > 0) {
      cy.log(`First focusable element: ${$focused[0].tagName}`);
      cy.task('log', `First focusable element: ${$focused[0].tagName}`);
    }
  });
  
  // Test Shift+Tab navigation
  cy.get('body').tab({ shift: true });
  
  // Test Enter key activation
  cy.focused().then($focused => {
    if ($focused.length > 0 && ($focused[0].tagName === 'BUTTON' || $focused[0].tagName === 'A')) {
      cy.focused().type('{enter}');
    }
  });
  
  // Test Escape key
  cy.get('body').type('{esc}');
  
  // Test Arrow keys navigation
  cy.get('body').type('{rightarrow}');
  cy.get('body').type('{leftarrow}');
  cy.get('body').type('{downarrow}');
  cy.get('body').type('{uparrow}');
});

/**
 * Custom command to test focus management
 */
Cypress.Commands.add('testFocusManagement', () => {
  // Test initial focus
  cy.focused().should('exist');
  
  // Test focus trap in modals
  cy.get('[data-testid="modal-trigger"]').click();
  cy.get('[data-testid="modal"]').should('be.visible');
  
  // Test focus within modal
  cy.get('[data-testid="modal"]').within(() => {
    cy.get('input, button, select, textarea, [tabindex]').first().should('be.focused');
  });
  
  // Test focus return when modal closes
  cy.get('[data-testid="modal-close"]').click();
  cy.get('[data-testid="modal-trigger"]').should('be.focused');
});

/**
 * Custom command to test ARIA attributes
 */
Cypress.Commands.add('testAriaAttributes', () => {
  // Test ARIA labels
  cy.get('[aria-label]').each($el => {
    cy.wrap($el).should('have.attr', 'aria-label').and('not.be.empty');
  });
  
  // Test ARIA described by
  cy.get('[aria-describedby]').each($el => {
    const describedBy = $el.attr('aria-describedby');
    cy.get(`#${describedBy}`).should('exist');
  });
  
  // Test ARIA labelledby
  cy.get('[aria-labelledby]').each($el => {
    const labelledBy = $el.attr('aria-labelledby');
    cy.get(`#${labelledBy}`).should('exist');
  });
  
  // Test ARIA expanded
  cy.get('[aria-expanded]').each($el => {
    cy.wrap($el).should('have.attr', 'aria-expanded').and('match', /^(true|false)$/);
  });
  
  // Test ARIA hidden
  cy.get('[aria-hidden="true"]').each($el => {
    cy.wrap($el).should('not.be.visible');
  });
});

/**
 * Custom command to test color contrast
 */
Cypress.Commands.add('testColorContrast', () => {
  cy.injectAxe();
  cy.checkA11y(null, {
    rules: {
      'color-contrast': { enabled: true }
    }
  }, (violations) => {
    const contrastViolations = violations.filter(v => v.id === 'color-contrast');
    if (contrastViolations.length > 0) {
      cy.task('log', `Color contrast violations: ${contrastViolations.length}`);
      contrastViolations.forEach(violation => {
        cy.task('log', `Contrast violation: ${violation.description}`);
      });
    }
  });
});

/**
 * Custom command to test screen reader compatibility
 */
Cypress.Commands.add('testScreenReaderCompatibility', () => {
  // Test headings structure
  cy.get('h1, h2, h3, h4, h5, h6').should('exist');
  
  // Test heading hierarchy
  cy.get('h1').should('have.length', 1);
  
  // Test alt text on images
  cy.get('img').each($img => {
    cy.wrap($img).should('have.attr', 'alt');
  });
  
  // Test form labels
  cy.get('input, select, textarea').each($input => {
    const id = $input.attr('id');
    if (id) {
      cy.get(`label[for="${id}"]`).should('exist');
    } else {
      cy.wrap($input).should('have.attr', 'aria-label');
    }
  });
  
  // Test landmarks
  cy.get('[role="main"], main').should('exist');
  cy.get('[role="navigation"], nav').should('exist');
  cy.get('[role="banner"], header').should('exist');
  cy.get('[role="contentinfo"], footer').should('exist');
});

/**
 * Custom command to test high contrast mode
 */
Cypress.Commands.add('testHighContrastMode', () => {
  // Simulate high contrast mode
  cy.window().then((win) => {
    const style = win.document.createElement('style');
    style.textContent = `
      * {
        background-color: black !important;
        color: white !important;
        border-color: white !important;
      }
      a {
        color: yellow !important;
      }
    `;
    win.document.head.appendChild(style);
  });
  
  // Test visibility in high contrast mode
  cy.get('body').should('be.visible');
  cy.get('a').should('be.visible');
  cy.get('button').should('be.visible');
  
  // Take screenshot for visual comparison
  cy.screenshot('high-contrast-mode');
});

/**
 * Custom command to test reduced motion
 */
Cypress.Commands.add('testReducedMotion', () => {
  cy.window().then((win) => {
    // Simulate reduced motion preference
    Object.defineProperty(win.navigator, 'userAgent', {
      writable: true,
      value: win.navigator.userAgent + ' prefers-reduced-motion'
    });
    
    // Add CSS to respect reduced motion
    const style = win.document.createElement('style');
    style.textContent = `
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `;
    win.document.head.appendChild(style);
  });
  
  // Test that animations are disabled or reduced
  cy.get('[data-testid="animated-element"]').should('exist').and('be.visible');
});

/**
 * Custom command to test zoom functionality
 * @param {number} zoomLevel - Zoom level (e.g., 200 for 200%)
 */
Cypress.Commands.add('testZoomLevel', (zoomLevel) => {
  cy.window().then((win) => {
    win.document.body.style.zoom = `${zoomLevel}%`;
  });
  
  // Test content visibility at zoom level
  cy.get('body').should('be.visible');
  cy.get('nav').should('be.visible');
  cy.get('main').should('be.visible');
  
  // Test horizontal scrolling doesn't appear
  cy.window().then((win) => {
    expect(win.document.body.scrollWidth).to.be.at.most(win.innerWidth);
  });
  
  // Take screenshot at zoom level
  cy.screenshot(`zoom-${zoomLevel}percent`);
});

/**
 * Custom command to test text scaling
 */
Cypress.Commands.add('testTextScaling', () => {
  const scaleLevels = [150, 200, 300];
  
  scaleLevels.forEach(scale => {
    cy.window().then((win) => {
      win.document.body.style.fontSize = `${scale}%`;
    });
    
    // Test readability at scaled text
    cy.get('body').should('be.visible');
    cy.get('p, h1, h2, h3, h4, h5, h6').should('be.visible');
    
    // Test no text overlap
    cy.get('p').each($p => {
      cy.wrap($p).should('not.have.css', 'overflow', 'hidden');
    });
    
    cy.screenshot(`text-scale-${scale}percent`);
  });
});

/**
 * Custom command to test language attributes
 */
Cypress.Commands.add('testLanguageAttributes', () => {
  // Test document language
  cy.get('html').should('have.attr', 'lang');
  
  // Test language changes
  cy.get('[lang]').each($el => {
    cy.wrap($el).should('have.attr', 'lang').and('match', /^[a-z]{2}(-[A-Z]{2})?$/);
  });
});

/**
 * Custom command to test skip links
 */
Cypress.Commands.add('testSkipLinks', () => {
  // Test skip to main content
  cy.get('body').tab();
  cy.focused().should('contain.text', 'Skip to main content');
  cy.focused().type('{enter}');
  cy.get('main').should('be.focused');
  
  // Test skip to navigation
  cy.get('body').tab();
  cy.focused().should('contain.text', 'Skip to navigation');
  cy.focused().type('{enter}');
  cy.get('nav').should('be.focused');
});

/**
 * Custom command to test error announcements
 */
Cypress.Commands.add('testErrorAnnouncements', () => {
  // Test form validation announcements
  cy.get('form').within(() => {
    cy.get('input[required]').first().clear();
    cy.get('[type="submit"]').click();
    
    // Test ARIA live region for errors
    cy.get('[aria-live="polite"], [aria-live="assertive"]').should('exist');
    cy.get('[role="alert"]').should('exist');
  });
});

/**
 * Custom command to test modal accessibility
 */
Cypress.Commands.add('testModalAccessibility', () => {
  // Open modal
  cy.get('[data-testid="modal-trigger"]').click();
  
  // Test modal has proper ARIA attributes
  cy.get('[data-testid="modal"]').should('have.attr', 'role', 'dialog');
  cy.get('[data-testid="modal"]').should('have.attr', 'aria-modal', 'true');
  cy.get('[data-testid="modal"]').should('have.attr', 'aria-labelledby');
  
  // Test focus management
  cy.get('[data-testid="modal"]').within(() => {
    cy.get('input, button, select, textarea, [tabindex]').first().should('be.focused');
  });
  
  // Test focus trap
  cy.get('[data-testid="modal"]').within(() => {
    cy.get('input, button, select, textarea, [tabindex]').last().tab();
    cy.get('input, button, select, textarea, [tabindex]').first().should('be.focused');
  });
  
  // Test escape key closes modal
  cy.get('body').type('{esc}');
  cy.get('[data-testid="modal"]').should('not.exist');
});

/**
 * Custom command to test custom focus indicators
 */
Cypress.Commands.add('testFocusIndicators', () => {
  cy.get('a, button, input, select, textarea, [tabindex]').each($el => {
    cy.wrap($el).focus();
    cy.wrap($el).should('have.focus');
    
    // Test visible focus indicator
    cy.wrap($el).should('have.css', 'outline-width').and('not.equal', '0px');
  });
});

/**
 * Custom command to test table accessibility
 */
Cypress.Commands.add('testTableAccessibility', () => {
  cy.get('table').each($table => {
    // Test table headers
    cy.wrap($table).find('th').should('exist');
    
    // Test table caption
    cy.wrap($table).find('caption').should('exist');
    
    // Test header scope
    cy.wrap($table).find('th').each($th => {
      cy.wrap($th).should('have.attr', 'scope');
    });
    
    // Test complex table relationships
    cy.wrap($table).find('td[headers]').each($td => {
      const headers = $td.attr('headers');
      cy.wrap($table).find(`#${headers}`).should('exist');
    });
  });
});

/**
 * Custom command to test form accessibility
 */
Cypress.Commands.add('testFormAccessibility', () => {
  cy.get('form').each($form => {
    // Test form labels
    cy.wrap($form).find('input, select, textarea').each($input => {
      const id = $input.attr('id');
      if (id) {
        cy.wrap($form).find(`label[for="${id}"]`).should('exist');
      } else {
        cy.wrap($input).should('have.attr', 'aria-label');
      }
    });
    
    // Test required fields
    cy.wrap($form).find('[required]').each($required => {
      cy.wrap($required).should('have.attr', 'aria-required', 'true');
    });
    
    // Test error messages
    cy.wrap($form).find('[aria-invalid="true"]').each($invalid => {
      const describedBy = $invalid.attr('aria-describedby');
      if (describedBy) {
        cy.wrap($form).find(`#${describedBy}`).should('exist');
      }
    });
    
    // Test fieldsets and legends
    cy.wrap($form).find('fieldset').each($fieldset => {
      cy.wrap($fieldset).find('legend').should('exist');
    });
  });
});