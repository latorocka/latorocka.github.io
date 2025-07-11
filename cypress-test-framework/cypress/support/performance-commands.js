// ***********************************************
// Performance Testing Commands
// Custom commands for performance testing scenarios
// ***********************************************

/**
 * Custom command to measure and validate page load performance
 * @param {number} maxLoadTime - Maximum acceptable load time in ms
 */
Cypress.Commands.add('measurePagePerformance', (maxLoadTime = 3000) => {
  cy.window().then((win) => {
    // Get performance metrics
    const performanceMetrics = {
      domContentLoaded: win.performance.timing.domContentLoadedEventEnd - win.performance.timing.navigationStart,
      fullyLoaded: win.performance.timing.loadEventEnd - win.performance.timing.navigationStart,
      domInteractive: win.performance.timing.domInteractive - win.performance.timing.navigationStart,
      firstByte: win.performance.timing.responseStart - win.performance.timing.navigationStart,
      dns: win.performance.timing.domainLookupEnd - win.performance.timing.domainLookupStart,
      tcp: win.performance.timing.connectEnd - win.performance.timing.connectStart,
      request: win.performance.timing.responseEnd - win.performance.timing.requestStart,
      response: win.performance.timing.responseEnd - win.performance.timing.responseStart
    };
    
    // Log performance metrics
    cy.log(`Performance Metrics:`, performanceMetrics);
    cy.task('log', `Performance Metrics: ${JSON.stringify(performanceMetrics)}`);
    
    // Validate performance thresholds
    expect(performanceMetrics.fullyLoaded).to.be.lessThan(maxLoadTime);
    expect(performanceMetrics.domContentLoaded).to.be.lessThan(maxLoadTime * 0.8);
    expect(performanceMetrics.firstByte).to.be.lessThan(1000);
    
    return performanceMetrics;
  });
});

/**
 * Custom command to measure Core Web Vitals
 */
Cypress.Commands.add('measureCoreWebVitals', () => {
  cy.window().then((win) => {
    return new Promise((resolve) => {
      // Measure LCP (Largest Contentful Paint)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lcp = entries[entries.length - 1];
        
        // Measure FID (First Input Delay) simulation
        let fid = 0;
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          fid = entries[0].processingStart - entries[0].startTime;
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        
        // Measure CLS (Cumulative Layout Shift)
        let cls = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            if (!entry.hadRecentInput) {
              cls += entry.value;
            }
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        
        setTimeout(() => {
          const webVitals = {
            lcp: lcp ? lcp.startTime : 0,
            fid: fid,
            cls: cls
          };
          
          cy.log(`Core Web Vitals:`, webVitals);
          cy.task('log', `Core Web Vitals: ${JSON.stringify(webVitals)}`);
          
          // Validate Core Web Vitals thresholds
          expect(webVitals.lcp).to.be.lessThan(2500); // Good LCP < 2.5s
          expect(webVitals.fid).to.be.lessThan(100);  // Good FID < 100ms
          expect(webVitals.cls).to.be.lessThan(0.1);  // Good CLS < 0.1
          
          resolve(webVitals);
        }, 2000);
      });
      
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    });
  });
});

/**
 * Custom command to measure resource loading performance
 */
Cypress.Commands.add('measureResourcePerformance', () => {
  cy.window().then((win) => {
    const resources = win.performance.getEntriesByType('resource');
    const resourceMetrics = {
      totalResources: resources.length,
      totalSize: 0,
      totalDuration: 0,
      slowestResource: null,
      resourcesByType: {}
    };
    
    resources.forEach(resource => {
      const duration = resource.responseEnd - resource.startTime;
      resourceMetrics.totalDuration += duration;
      resourceMetrics.totalSize += resource.transferSize || 0;
      
      if (!resourceMetrics.slowestResource || duration > resourceMetrics.slowestResource.duration) {
        resourceMetrics.slowestResource = {
          name: resource.name,
          duration: duration,
          size: resource.transferSize || 0,
          type: resource.initiatorType
        };
      }
      
      const type = resource.initiatorType || 'other';
      if (!resourceMetrics.resourcesByType[type]) {
        resourceMetrics.resourcesByType[type] = { count: 0, totalSize: 0, totalDuration: 0 };
      }
      resourceMetrics.resourcesByType[type].count++;
      resourceMetrics.resourcesByType[type].totalSize += resource.transferSize || 0;
      resourceMetrics.resourcesByType[type].totalDuration += duration;
    });
    
    cy.log(`Resource Performance:`, resourceMetrics);
    cy.task('log', `Resource Performance: ${JSON.stringify(resourceMetrics)}`);
    
    // Validate resource performance thresholds
    expect(resourceMetrics.totalResources).to.be.lessThan(100);
    expect(resourceMetrics.totalSize).to.be.lessThan(2000000); // 2MB
    expect(resourceMetrics.slowestResource.duration).to.be.lessThan(5000); // 5s
    
    return resourceMetrics;
  });
});

/**
 * Custom command to simulate slow network conditions
 * @param {string} condition - Network condition (slow3g, fast3g, offline)
 */
Cypress.Commands.add('simulateNetworkCondition', (condition) => {
  const networkConditions = {
    slow3g: { downloadThroughput: 50000, uploadThroughput: 50000, latency: 2000 },
    fast3g: { downloadThroughput: 200000, uploadThroughput: 200000, latency: 1000 },
    offline: { downloadThroughput: 0, uploadThroughput: 0, latency: 0 }
  };
  
  if (networkConditions[condition]) {
    cy.window().then((win) => {
      // Simulate network throttling through service worker or intercepts
      cy.intercept('**', (req) => {
        req.reply((res) => {
          res.delay(networkConditions[condition].latency);
        });
      });
    });
  }
});

/**
 * Custom command to measure memory usage
 */
Cypress.Commands.add('measureMemoryUsage', () => {
  cy.window().then((win) => {
    if (win.performance.memory) {
      const memoryMetrics = {
        usedJSHeapSize: win.performance.memory.usedJSHeapSize,
        totalJSHeapSize: win.performance.memory.totalJSHeapSize,
        jsHeapSizeLimit: win.performance.memory.jsHeapSizeLimit,
        usedPercentage: (win.performance.memory.usedJSHeapSize / win.performance.memory.totalJSHeapSize) * 100
      };
      
      cy.log(`Memory Usage:`, memoryMetrics);
      cy.task('log', `Memory Usage: ${JSON.stringify(memoryMetrics)}`);
      
      // Validate memory usage thresholds
      expect(memoryMetrics.usedPercentage).to.be.lessThan(90); // Less than 90% memory usage
      expect(memoryMetrics.usedJSHeapSize).to.be.lessThan(100000000); // Less than 100MB
      
      return memoryMetrics;
    } else {
      cy.log('Memory API not available in this browser');
      return null;
    }
  });
});

/**
 * Custom command to measure bundle size
 */
Cypress.Commands.add('measureBundleSize', () => {
  cy.window().then((win) => {
    const resources = win.performance.getEntriesByType('resource');
    const bundleMetrics = {
      totalJavaScriptSize: 0,
      totalCSSSize: 0,
      totalImageSize: 0,
      totalFontSize: 0,
      jsFiles: [],
      cssFiles: [],
      imageFiles: [],
      fontFiles: []
    };
    
    resources.forEach(resource => {
      const size = resource.transferSize || 0;
      const name = resource.name;
      
      if (name.includes('.js')) {
        bundleMetrics.totalJavaScriptSize += size;
        bundleMetrics.jsFiles.push({ name, size });
      } else if (name.includes('.css')) {
        bundleMetrics.totalCSSSize += size;
        bundleMetrics.cssFiles.push({ name, size });
      } else if (name.match(/\.(jpg|jpeg|png|gif|svg|webp)$/)) {
        bundleMetrics.totalImageSize += size;
        bundleMetrics.imageFiles.push({ name, size });
      } else if (name.match(/\.(woff|woff2|ttf|otf)$/)) {
        bundleMetrics.totalFontSize += size;
        bundleMetrics.fontFiles.push({ name, size });
      }
    });
    
    cy.log(`Bundle Size Analysis:`, bundleMetrics);
    cy.task('log', `Bundle Size Analysis: ${JSON.stringify(bundleMetrics)}`);
    
    // Validate bundle size thresholds
    expect(bundleMetrics.totalJavaScriptSize).to.be.lessThan(500000); // 500KB
    expect(bundleMetrics.totalCSSSize).to.be.lessThan(100000); // 100KB
    
    return bundleMetrics;
  });
});

/**
 * Custom command to measure paint timings
 */
Cypress.Commands.add('measurePaintTimings', () => {
  cy.window().then((win) => {
    const paintEntries = win.performance.getEntriesByType('paint');
    const paintMetrics = {};
    
    paintEntries.forEach(entry => {
      paintMetrics[entry.name] = entry.startTime;
    });
    
    cy.log(`Paint Timings:`, paintMetrics);
    cy.task('log', `Paint Timings: ${JSON.stringify(paintMetrics)}`);
    
    // Validate paint timing thresholds
    if (paintMetrics['first-paint']) {
      expect(paintMetrics['first-paint']).to.be.lessThan(1000); // FP < 1s
    }
    if (paintMetrics['first-contentful-paint']) {
      expect(paintMetrics['first-contentful-paint']).to.be.lessThan(1500); // FCP < 1.5s
    }
    
    return paintMetrics;
  });
});

/**
 * Custom command to run lighthouse audit
 */
Cypress.Commands.add('runLighthouseAudit', () => {
  cy.window().then((win) => {
    // Simulate lighthouse audit checks
    const auditResults = {
      performance: 0,
      accessibility: 0,
      bestPractices: 0,
      seo: 0,
      pwa: 0
    };
    
    // Performance checks
    let performanceScore = 100;
    if (win.performance.timing.loadEventEnd - win.performance.timing.navigationStart > 3000) {
      performanceScore -= 20;
    }
    
    // Check for images without alt text
    const images = win.document.querySelectorAll('img:not([alt])');
    if (images.length > 0) {
      auditResults.accessibility -= 10;
    }
    
    // Check for HTTPS
    if (win.location.protocol !== 'https:') {
      auditResults.bestPractices -= 10;
    }
    
    // Check for meta description
    const metaDescription = win.document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      auditResults.seo -= 10;
    }
    
    // Check for service worker
    if (!('serviceWorker' in win.navigator)) {
      auditResults.pwa -= 20;
    }
    
    auditResults.performance = Math.max(0, performanceScore);
    auditResults.accessibility = Math.max(0, 100 + auditResults.accessibility);
    auditResults.bestPractices = Math.max(0, 100 + auditResults.bestPractices);
    auditResults.seo = Math.max(0, 100 + auditResults.seo);
    auditResults.pwa = Math.max(0, 100 + auditResults.pwa);
    
    cy.log(`Lighthouse Audit Results:`, auditResults);
    cy.task('log', `Lighthouse Audit Results: ${JSON.stringify(auditResults)}`);
    
    // Validate lighthouse scores
    expect(auditResults.performance).to.be.greaterThan(80);
    expect(auditResults.accessibility).to.be.greaterThan(90);
    expect(auditResults.bestPractices).to.be.greaterThan(80);
    expect(auditResults.seo).to.be.greaterThan(80);
    
    return auditResults;
  });
});

/**
 * Custom command to test page under load
 * @param {number} concurrentUsers - Number of concurrent users to simulate
 */
Cypress.Commands.add('testPageUnderLoad', (concurrentUsers = 10) => {
  const promises = [];
  
  for (let i = 0; i < concurrentUsers; i++) {
    promises.push(
      cy.window().then((win) => {
        const startTime = Date.now();
        return cy.reload().then(() => {
          const loadTime = Date.now() - startTime;
          return loadTime;
        });
      })
    );
  }
  
  return cy.wrap(Promise.all(promises)).then((loadTimes) => {
    const averageLoadTime = loadTimes.reduce((sum, time) => sum + time, 0) / loadTimes.length;
    const maxLoadTime = Math.max(...loadTimes);
    const minLoadTime = Math.min(...loadTimes);
    
    const loadTestResults = {
      concurrentUsers,
      averageLoadTime,
      maxLoadTime,
      minLoadTime,
      loadTimes
    };
    
    cy.log(`Load Test Results:`, loadTestResults);
    cy.task('log', `Load Test Results: ${JSON.stringify(loadTestResults)}`);
    
    // Validate load test results
    expect(averageLoadTime).to.be.lessThan(5000);
    expect(maxLoadTime).to.be.lessThan(10000);
    
    return loadTestResults;
  });
});

/**
 * Custom command to measure time to interactive
 */
Cypress.Commands.add('measureTimeToInteractive', () => {
  cy.window().then((win) => {
    return new Promise((resolve) => {
      const startTime = win.performance.timing.navigationStart;
      
      const checkInteractive = () => {
        const currentTime = Date.now();
        const timeElapsed = currentTime - startTime;
        
        // Check if page is interactive (DOM loaded and no long tasks)
        if (win.document.readyState === 'complete') {
          const tti = timeElapsed;
          cy.log(`Time to Interactive: ${tti}ms`);
          cy.task('log', `Time to Interactive: ${tti}ms`);
          
          // Validate TTI threshold
          expect(tti).to.be.lessThan(5000); // TTI < 5s
          
          resolve(tti);
        } else {
          setTimeout(checkInteractive, 100);
        }
      };
      
      checkInteractive();
    });
  });
});

/**
 * Custom command to measure frame rate
 */
Cypress.Commands.add('measureFrameRate', () => {
  cy.window().then((win) => {
    return new Promise((resolve) => {
      let frameCount = 0;
      const startTime = Date.now();
      
      const countFrames = () => {
        frameCount++;
        if (Date.now() - startTime < 1000) {
          requestAnimationFrame(countFrames);
        } else {
          const fps = frameCount;
          cy.log(`Frame Rate: ${fps} FPS`);
          cy.task('log', `Frame Rate: ${fps} FPS`);
          
          // Validate frame rate
          expect(fps).to.be.greaterThan(30); // At least 30 FPS
          
          resolve(fps);
        }
      };
      
      requestAnimationFrame(countFrames);
    });
  });
});