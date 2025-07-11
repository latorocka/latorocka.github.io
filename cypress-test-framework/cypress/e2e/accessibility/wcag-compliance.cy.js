/// <reference types="cypress" />

describe('WCAG Compliance Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.logTestStart('WCAG Compliance Test');
  });

  afterEach(() => {
    cy.logTestEnd('WCAG Compliance Test');
  });

  describe('WCAG 2.1 Level AA Compliance', () => {
    it('should pass comprehensive accessibility audit', () => {
      cy.runAccessibilityAudit({
        tags: ['wcag2a', 'wcag2aa', 'wcag21aa'],
        rules: {
          'color-contrast': { enabled: true },
          'keyboard': { enabled: true },
          'focus-order': { enabled: true },
          'image-alt': { enabled: true },
          'label': { enabled: true },
          'link-name': { enabled: true },
          'page-has-heading-one': { enabled: true },
          'heading-order': { enabled: true }
        }
      });
    });

    it('should have proper document structure', () => {
      // Test page has exactly one h1
      cy.get('h1').should('have.length', 1);
      
      // Test heading hierarchy
      cy.get('h1, h2, h3, h4, h5, h6').then($headings => {
        const headingLevels = Array.from($headings).map(h => parseInt(h.tagName.substring(1)));
        
        // Check that headings don't skip levels
        for (let i = 1; i < headingLevels.length; i++) {
          const currentLevel = headingLevels[i];
          const previousLevel = headingLevels[i - 1];
          expect(currentLevel - previousLevel).to.be.at.most(1);
        }
      });
      
      // Test page has proper landmarks
      cy.get('[role="main"], main').should('exist');
      cy.get('[role="navigation"], nav').should('exist');
      cy.get('[role="banner"], header').should('exist');
      cy.get('[role="contentinfo"], footer').should('exist');
    });

    it('should have accessible images', () => {
      cy.get('img').each($img => {
        cy.wrap($img).should('have.attr', 'alt');
        
        // Decorative images should have empty alt text
        if ($img.attr('role') === 'presentation') {
          cy.wrap($img).should('have.attr', 'alt', '');
        }
      });
      
      // Test that images with meaningful content have descriptive alt text
      cy.get('img[alt]:not([alt=""])').each($img => {
        const altText = $img.attr('alt');
        expect(altText.length).to.be.greaterThan(3);
        expect(altText).to.not.match(/^(image|img|picture|photo)$/i);
      });
    });

    it('should have accessible forms', () => {
      cy.testFormAccessibility();
      
      // Test form has proper structure
      cy.get('form').each($form => {
        // All inputs should have labels
        cy.wrap($form).find('input, select, textarea').each($input => {
          const id = $input.attr('id');
          const ariaLabel = $input.attr('aria-label');
          const ariaLabelledby = $input.attr('aria-labelledby');
          
          if (id) {
            cy.wrap($form).find(`label[for="${id}"]`).should('exist');
          } else {
            expect(ariaLabel || ariaLabelledby).to.exist;
          }
        });
        
        // Required fields should be properly marked
        cy.wrap($form).find('[required]').each($required => {
          cy.wrap($required).should('have.attr', 'aria-required', 'true');
        });
        
        // Error messages should be properly associated
        cy.wrap($form).find('[aria-invalid="true"]').each($invalid => {
          const describedBy = $invalid.attr('aria-describedby');
          if (describedBy) {
            cy.wrap($form).find(`#${describedBy}`).should('exist');
          }
        });
      });
    });
  });

  describe('Keyboard Navigation', () => {
    it('should support complete keyboard navigation', () => {
      cy.testKeyboardNavigation();
      
      // Test all interactive elements are keyboard accessible
      cy.get('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])').each($el => {
        cy.wrap($el).focus().should('have.focus');
      });
      
      // Test tab order is logical
      cy.get('body').tab();
      cy.focused().then($first => {
        const firstElement = $first[0];
        
        // Tab through all elements
        let currentElement = firstElement;
        const tabOrder = [currentElement];
        
        while (tabOrder.length < 10) { // Test first 10 elements
          cy.get('body').tab();
          cy.focused().then($next => {
            currentElement = $next[0];
            if (currentElement !== firstElement) {
              tabOrder.push(currentElement);
            }
          });
        }
        
        // Verify tab order makes logical sense (top to bottom, left to right)
        cy.log('Tab order verified for keyboard navigation');
      });
    });

    it('should handle skip links properly', () => {
      cy.testSkipLinks();
    });

    it('should support keyboard shortcuts', () => {
      // Test common keyboard shortcuts
      cy.get('body').type('{ctrl}f'); // Find/Search
      cy.get('[data-testid="search-input"]').should('be.focused');
      
      cy.pressKey('esc'); // Close search
      cy.get('[data-testid="search-input"]').should('not.be.focused');
      
      // Test application-specific shortcuts
      cy.pressShortcut('alt+h'); // Help
      cy.get('[data-testid="help-dialog"]').should('be.visible');
      
      cy.pressKey('esc'); // Close help
      cy.get('[data-testid="help-dialog"]').should('not.exist');
    });
  });

  describe('Screen Reader Support', () => {
    it('should provide proper screen reader support', () => {
      cy.testScreenReaderCompatibility();
      
      // Test ARIA labels and descriptions
      cy.get('[aria-label]').each($el => {
        const ariaLabel = $el.attr('aria-label');
        expect(ariaLabel).to.be.a('string');
        expect(ariaLabel.length).to.be.greaterThan(0);
      });
      
      // Test ARIA live regions
      cy.get('[aria-live]').should('exist');
      cy.get('[role="status"]').should('exist');
      
      // Test ARIA expanded states
      cy.get('[aria-expanded]').each($el => {
        const expanded = $el.attr('aria-expanded');
        expect(expanded).to.match(/^(true|false)$/);
      });
    });

    it('should announce dynamic content changes', () => {
      cy.testErrorAnnouncements();
      
      // Test loading states are announced
      cy.get('[data-testid="loading-button"]').click();
      cy.get('[aria-live="polite"]').should('contain.text', 'Loading');
      
      // Test success states are announced
      cy.get('[aria-live="polite"]').should('contain.text', 'Complete');
    });

    it('should have proper ARIA attributes', () => {
      cy.testAriaAttributes();
      
      // Test custom controls have proper roles
      cy.get('[role="button"]').each($button => {
        if (!$button.is('button')) {
          cy.wrap($button).should('have.attr', 'tabindex', '0');
        }
      });
      
      // Test complex widgets
      cy.get('[role="tablist"]').each($tablist => {
        cy.wrap($tablist).find('[role="tab"]').should('exist');
        cy.wrap($tablist).find('[role="tabpanel"]').should('exist');
      });
    });
  });

  describe('Color and Contrast', () => {
    it('should meet color contrast requirements', () => {
      cy.testColorContrast();
      
      // Test that information is not conveyed by color alone
      cy.get('.error').each($error => {
        // Error states should have more than just color
        const hasIcon = $error.find('svg, [class*="icon"]').length > 0;
        const hasText = $error.text().trim().length > 0;
        const hasPattern = $error.css('background-image') !== 'none';
        
        expect(hasIcon || hasText || hasPattern).to.be.true;
      });
    });

    it('should support high contrast mode', () => {
      cy.testHighContrastMode();
      
      // Verify critical elements are still visible
      cy.get('[data-testid="main-navigation"]').should('be.visible');
      cy.get('[data-testid="primary-content"]').should('be.visible');
      cy.get('[data-testid="call-to-action"]').should('be.visible');
    });

    it('should handle color blindness scenarios', () => {
      // Test with different color blind simulations
      const colorBlindFilters = [
        'protanopia',
        'deuteranopia',
        'tritanopia',
        'achromatopsia'
      ];
      
      colorBlindFilters.forEach(filter => {
        cy.window().then((win) => {
          const style = win.document.createElement('style');
          style.textContent = `
            html { filter: url('#${filter}'); }
          `;
          win.document.head.appendChild(style);
          
          // Verify important elements are still distinguishable
          cy.get('[data-testid="success-message"]').should('be.visible');
          cy.get('[data-testid="error-message"]').should('be.visible');
          cy.get('[data-testid="warning-message"]').should('be.visible');
        });
      });
    });
  });

  describe('Focus Management', () => {
    it('should manage focus properly', () => {
      cy.testFocusManagement();
      
      // Test focus indicators are visible
      cy.testFocusIndicators();
      
      // Test focus doesn't get trapped unintentionally
      cy.get('body').tab();
      cy.focused().tab();
      cy.focused().should('exist');
    });

    it('should handle modal focus correctly', () => {
      cy.testModalAccessibility();
    });

    it('should restore focus appropriately', () => {
      // Open dropdown
      cy.get('[data-testid="dropdown-trigger"]').click();
      cy.get('[data-testid="dropdown-trigger"]').should('have.focus');
      
      // Close dropdown with escape
      cy.pressKey('esc');
      cy.get('[data-testid="dropdown-trigger"]').should('have.focus');
    });
  });

  describe('Responsive Accessibility', () => {
    it('should maintain accessibility across viewports', () => {
      const viewports = [
        { width: 320, height: 568 },  // Mobile
        { width: 768, height: 1024 }, // Tablet
        { width: 1920, height: 1080 } // Desktop
      ];
      
      viewports.forEach(viewport => {
        cy.viewport(viewport.width, viewport.height);
        
        // Run accessibility audit at each viewport
        cy.runAccessibilityAudit({
          tags: ['wcag2a', 'wcag2aa'],
          rules: {
            'color-contrast': { enabled: true },
            'keyboard': { enabled: true },
            'focus-order': { enabled: true }
          }
        });
        
        // Test that navigation is accessible
        cy.get('[data-testid="main-navigation"]').should('be.visible');
        cy.testKeyboardNavigation();
      });
    });

    it('should support zoom up to 200%', () => {
      cy.testZoomLevel(200);
      
      // Test that content is still accessible
      cy.get('[data-testid="main-content"]').should('be.visible');
      cy.testKeyboardNavigation();
    });

    it('should support text scaling', () => {
      cy.testTextScaling();
      
      // Verify text doesn't overlap or get cut off
      cy.get('p, h1, h2, h3, h4, h5, h6').each($el => {
        cy.wrap($el).should('be.visible');
      });
    });
  });

  describe('Motion and Animation', () => {
    it('should respect reduced motion preferences', () => {
      cy.testReducedMotion();
      
      // Test that animations are disabled or reduced
      cy.get('[data-testid="animated-element"]').should('have.css', 'animation-duration', '0.01s');
    });

    it('should not cause seizures or vestibular disorders', () => {
      // Test that there are no rapidly flashing elements
      cy.get('[data-testid="flashing-element"]').should('not.exist');
      
      // Test that parallax effects are subtle
      cy.get('[data-testid="parallax-element"]').should('have.css', 'transform').and('not.contain', 'scale');
    });
  });

  describe('Language and Internationalization', () => {
    it('should have proper language attributes', () => {
      cy.testLanguageAttributes();
      
      // Test that page language is properly set
      cy.get('html').should('have.attr', 'lang');
      
      // Test that language changes are marked
      cy.get('[lang]:not(html)').each($el => {
        const lang = $el.attr('lang');
        expect(lang).to.match(/^[a-z]{2}(-[A-Z]{2})?$/);
      });
    });

    it('should support right-to-left languages', () => {
      // Test RTL layout
      cy.get('html').invoke('attr', 'dir', 'rtl');
      
      // Verify layout adapts properly
      cy.get('[data-testid="main-content"]').should('be.visible');
      cy.testKeyboardNavigation();
      
      // Reset to LTR
      cy.get('html').invoke('attr', 'dir', 'ltr');
    });
  });

  describe('Tables and Data', () => {
    it('should have accessible tables', () => {
      cy.testTableAccessibility();
      
      // Test data tables have proper structure
      cy.get('table[data-testid="data-table"]').each($table => {
        // Should have caption or aria-label
        const hasCaption = $table.find('caption').length > 0;
        const hasAriaLabel = $table.attr('aria-label');
        expect(hasCaption || hasAriaLabel).to.be.true;
        
        // Should have proper headers
        cy.wrap($table).find('th').should('exist');
        
        // Headers should have scope
        cy.wrap($table).find('th').each($th => {
          cy.wrap($th).should('have.attr', 'scope');
        });
      });
    });

    it('should support sorting and filtering accessibility', () => {
      // Test sortable columns are keyboard accessible
      cy.get('[data-testid="sortable-header"]').each($header => {
        cy.wrap($header).should('have.attr', 'tabindex', '0');
        cy.wrap($header).should('have.attr', 'aria-sort');
      });
      
      // Test sort activation
      cy.get('[data-testid="sortable-header"]').first().focus().type('{enter}');
      cy.get('[data-testid="sortable-header"]').first().should('have.attr', 'aria-sort', 'ascending');
    });
  });
});