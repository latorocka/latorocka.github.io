// ***********************************************
// UI Testing Commands
// Custom commands for UI testing scenarios
// ***********************************************

/**
 * Custom command to login with user credentials
 * @param {string} username - Username
 * @param {string} password - Password
 */
Cypress.Commands.add('login', (username, password) => {
  cy.get('[data-testid="username"]').type(username);
  cy.get('[data-testid="password"]').type(password);
  cy.get('[data-testid="login-button"]').click();
  cy.url().should('not.contain', '/login');
});

/**
 * Custom command to logout user
 */
Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="logout-button"]').click();
  cy.url().should('contain', '/login');
});

/**
 * Custom command to handle modal dialogs
 * @param {string} action - Action to perform (open, close, confirm, cancel)
 * @param {string} modalSelector - CSS selector for modal
 */
Cypress.Commands.add('handleModal', (action, modalSelector = '[data-testid="modal"]') => {
  switch (action) {
    case 'open':
      cy.get(modalSelector).should('be.visible');
      break;
    case 'close':
      cy.get(`${modalSelector} [data-testid="close-button"]`).click();
      cy.get(modalSelector).should('not.exist');
      break;
    case 'confirm':
      cy.get(`${modalSelector} [data-testid="confirm-button"]`).click();
      break;
    case 'cancel':
      cy.get(`${modalSelector} [data-testid="cancel-button"]`).click();
      break;
  }
});

/**
 * Custom command to handle alerts
 * @param {string} action - Action to perform (accept, dismiss)
 * @param {string} expectedText - Expected alert text
 */
Cypress.Commands.add('handleAlert', (action, expectedText = null) => {
  cy.window().then((win) => {
    cy.stub(win, 'alert').as('windowAlert');
    cy.stub(win, 'confirm').as('windowConfirm');
    cy.stub(win, 'prompt').as('windowPrompt');
  });
  
  if (expectedText) {
    cy.get('@windowAlert').should('have.been.calledWith', expectedText);
  }
  
  if (action === 'accept') {
    cy.get('@windowAlert').should('have.been.called');
  }
});

/**
 * Custom command to handle drag and drop
 * @param {string} sourceSelector - Source element selector
 * @param {string} targetSelector - Target element selector
 */
Cypress.Commands.add('dragAndDrop', (sourceSelector, targetSelector) => {
  cy.get(sourceSelector).trigger('mousedown', { button: 0 });
  cy.get(targetSelector).trigger('mousemove').trigger('mouseup');
});

/**
 * Custom command to handle file upload
 * @param {string} selector - File input selector
 * @param {string} fileName - File name to upload
 * @param {string} fileType - File type
 */
Cypress.Commands.add('uploadFile', (selector, fileName, fileType = 'image/png') => {
  cy.get(selector).attachFile({
    filePath: fileName,
    mimeType: fileType
  });
});

/**
 * Custom command to handle infinite scroll
 * @param {number} scrollCount - Number of scrolls to perform
 * @param {string} containerSelector - Container selector
 */
Cypress.Commands.add('infiniteScroll', (scrollCount = 5, containerSelector = 'body') => {
  for (let i = 0; i < scrollCount; i++) {
    cy.get(containerSelector).scrollTo('bottom');
    cy.wait(1000); // Wait for content to load
  }
});

/**
 * Custom command to handle table interactions
 * @param {string} tableSelector - Table selector
 * @param {number} rowIndex - Row index
 * @param {number} colIndex - Column index
 * @param {string} action - Action to perform (click, getText, etc.)
 */
Cypress.Commands.add('handleTableCell', (tableSelector, rowIndex, colIndex, action = 'click') => {
  const cellSelector = `${tableSelector} tbody tr:nth-child(${rowIndex}) td:nth-child(${colIndex})`;
  
  switch (action) {
    case 'click':
      cy.get(cellSelector).click();
      break;
    case 'getText':
      return cy.get(cellSelector).invoke('text');
    case 'doubleClick':
      cy.get(cellSelector).dblclick();
      break;
    case 'rightClick':
      cy.get(cellSelector).rightclick();
      break;
  }
});

/**
 * Custom command to sort table by column
 * @param {string} tableSelector - Table selector
 * @param {number} columnIndex - Column index to sort by
 */
Cypress.Commands.add('sortTableByColumn', (tableSelector, columnIndex) => {
  cy.get(`${tableSelector} thead tr th:nth-child(${columnIndex})`).click();
});

/**
 * Custom command to filter table
 * @param {string} filterSelector - Filter input selector
 * @param {string} filterValue - Value to filter by
 */
Cypress.Commands.add('filterTable', (filterSelector, filterValue) => {
  cy.get(filterSelector).clear().type(filterValue);
  cy.wait(500); // Wait for filtering to complete
});

/**
 * Custom command to handle tabs
 * @param {string} tabSelector - Tab selector
 * @param {number} tabIndex - Tab index to click
 */
Cypress.Commands.add('switchTab', (tabSelector, tabIndex) => {
  cy.get(`${tabSelector}:nth-child(${tabIndex})`).click();
});

/**
 * Custom command to handle accordion
 * @param {string} accordionSelector - Accordion selector
 * @param {number} sectionIndex - Section index
 * @param {string} action - Action (expand, collapse, toggle)
 */
Cypress.Commands.add('handleAccordion', (accordionSelector, sectionIndex, action = 'toggle') => {
  const sectionSelector = `${accordionSelector} .accordion-section:nth-child(${sectionIndex})`;
  const headerSelector = `${sectionSelector} .accordion-header`;
  
  switch (action) {
    case 'expand':
      cy.get(headerSelector).click();
      cy.get(`${sectionSelector} .accordion-content`).should('be.visible');
      break;
    case 'collapse':
      cy.get(headerSelector).click();
      cy.get(`${sectionSelector} .accordion-content`).should('not.be.visible');
      break;
    case 'toggle':
      cy.get(headerSelector).click();
      break;
  }
});

/**
 * Custom command to handle carousel/slider
 * @param {string} carouselSelector - Carousel selector
 * @param {string} direction - Direction (next, previous)
 * @param {number} steps - Number of steps
 */
Cypress.Commands.add('navigateCarousel', (carouselSelector, direction = 'next', steps = 1) => {
  for (let i = 0; i < steps; i++) {
    if (direction === 'next') {
      cy.get(`${carouselSelector} .carousel-next`).click();
    } else {
      cy.get(`${carouselSelector} .carousel-prev`).click();
    }
    cy.wait(500); // Wait for transition
  }
});

/**
 * Custom command to handle image lazy loading
 * @param {string} imageSelector - Image selector
 */
Cypress.Commands.add('waitForImageLoad', (imageSelector) => {
  cy.get(imageSelector).should('be.visible').and(($img) => {
    expect($img[0].naturalWidth).to.be.greaterThan(0);
  });
});

/**
 * Custom command to handle responsive design testing
 * @param {string} breakpoint - Breakpoint (mobile, tablet, desktop)
 */
Cypress.Commands.add('testResponsiveDesign', (breakpoint) => {
  const viewports = {
    mobile: [375, 667],
    tablet: [768, 1024],
    desktop: [1920, 1080]
  };
  
  cy.viewport(viewports[breakpoint][0], viewports[breakpoint][1]);
});

/**
 * Custom command to handle print preview
 */
Cypress.Commands.add('testPrintPreview', () => {
  cy.window().then((win) => {
    cy.stub(win, 'print').as('windowPrint');
  });
  
  cy.get('[data-testid="print-button"]').click();
  cy.get('@windowPrint').should('have.been.called');
});

/**
 * Custom command to handle keyboard navigation
 * @param {string} key - Key to press
 * @param {object} options - Key options
 */
Cypress.Commands.add('pressKey', (key, options = {}) => {
  cy.get('body').type(`{${key}}`, options);
});

/**
 * Custom command to handle keyboard shortcuts
 * @param {string} shortcut - Keyboard shortcut (e.g., 'ctrl+s')
 */
Cypress.Commands.add('pressShortcut', (shortcut) => {
  cy.get('body').type(`{${shortcut}}`);
});

/**
 * Custom command to handle tooltip
 * @param {string} triggerSelector - Element that triggers tooltip
 * @param {string} expectedText - Expected tooltip text
 */
Cypress.Commands.add('verifyTooltip', (triggerSelector, expectedText) => {
  cy.get(triggerSelector).trigger('mouseover');
  cy.get('[data-testid="tooltip"]').should('be.visible').and('contain.text', expectedText);
  cy.get(triggerSelector).trigger('mouseout');
  cy.get('[data-testid="tooltip"]').should('not.be.visible');
});

/**
 * Custom command to handle context menu
 * @param {string} selector - Element selector
 * @param {string} menuItem - Menu item to select
 */
Cypress.Commands.add('useContextMenu', (selector, menuItem) => {
  cy.get(selector).rightclick();
  cy.get('[data-testid="context-menu"]').should('be.visible');
  cy.get(`[data-testid="context-menu-${menuItem}"]`).click();
});

/**
 * Custom command to handle search functionality
 * @param {string} searchSelector - Search input selector
 * @param {string} searchTerm - Search term
 * @param {string} resultSelector - Results container selector
 */
Cypress.Commands.add('performSearch', (searchSelector, searchTerm, resultSelector) => {
  cy.get(searchSelector).clear().type(searchTerm);
  cy.get('[data-testid="search-button"]').click();
  cy.get(resultSelector).should('be.visible');
});

/**
 * Custom command to handle breadcrumb navigation
 * @param {string} breadcrumbSelector - Breadcrumb selector
 * @param {number} levelIndex - Level index to click
 */
Cypress.Commands.add('navigateBreadcrumb', (breadcrumbSelector, levelIndex) => {
  cy.get(`${breadcrumbSelector} .breadcrumb-item:nth-child(${levelIndex})`).click();
});

/**
 * Custom command to handle multi-select
 * @param {string} selectSelector - Select element selector
 * @param {Array} options - Options to select
 */
Cypress.Commands.add('selectMultipleOptions', (selectSelector, options) => {
  cy.get(selectSelector).click();
  options.forEach(option => {
    cy.get(`[data-value="${option}"]`).click();
  });
});

/**
 * Custom command to handle form validation
 * @param {string} formSelector - Form selector
 * @param {object} validationRules - Validation rules
 */
Cypress.Commands.add('validateForm', (formSelector, validationRules) => {
  Object.keys(validationRules).forEach(fieldName => {
    const rule = validationRules[fieldName];
    const fieldSelector = `${formSelector} [name="${fieldName}"]`;
    
    if (rule.required) {
      cy.get(fieldSelector).clear();
      cy.get(`${formSelector} [type="submit"]`).click();
      cy.get(`${fieldSelector}-error`).should('be.visible');
    }
    
    if (rule.minLength) {
      cy.get(fieldSelector).clear().type('a'.repeat(rule.minLength - 1));
      cy.get(`${formSelector} [type="submit"]`).click();
      cy.get(`${fieldSelector}-error`).should('be.visible');
    }
    
    if (rule.pattern) {
      cy.get(fieldSelector).clear().type('invalid');
      cy.get(`${formSelector} [type="submit"]`).click();
      cy.get(`${fieldSelector}-error`).should('be.visible');
    }
  });
});

/**
 * Custom command to handle progressive web app features
 * @param {string} feature - PWA feature to test (install, offline, push)
 */
Cypress.Commands.add('testPWAFeature', (feature) => {
  switch (feature) {
    case 'install':
      cy.window().then((win) => {
        cy.stub(win, 'addEventListener').as('installPrompt');
      });
      break;
    case 'offline':
      cy.window().then((win) => {
        cy.stub(win.navigator, 'onLine').value(false);
      });
      break;
    case 'push':
      cy.window().then((win) => {
        cy.stub(win.Notification, 'permission').value('granted');
      });
      break;
  }
});