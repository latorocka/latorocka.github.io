export const personalInfo = {
  name: "Brian LaTorraca",
  title: "QA Automation Engineer & Developer",
  location: "Long Beach, CA 90804",
  email: "Latorocka@gmail.com",
  phone: "714-316-3506"
};

export const experiences = [
  {
    id: 1,
    title: "Software QA Engineer",
    company: "Escape AI",
    location: "Remote",
    period: "February 2025 - Present",
    type: "current",
    description: "AI driven mobile application",
    responsibilities: [
      "Tested AI responses in LLM",
      "Generated bug reports, and communicated QA analytics",
      "Conducted Ad Hoc testing"
    ]
  },
  {
    id: 2,
    title: "QA Automation Engineer",
    company: "Mercury Insurance",
    location: "Remote",
    period: "May 2023 - November 2023",
    type: "previous",
    responsibilities: [
      "Developed test cases, submitted bug reports, and conducted automation testing using Eclipse IDE for Agile development and SaaS platforms",
      "Utilized knowledge of SDLC, Git, MySQL, Guidewire, and Duckcreek to maintain and verify data in MySQL for effective automated script functionality",
      "Identified and automated test cases to ensure desired outcomes were achieved",
      "Executed weekly automated regression tests to promptly report any script bugs or issues"
    ]
  },
  {
    id: 3,
    title: "QA Automation Engineer",
    company: "Upkeep",
    location: "Remote",
    period: "October 2021 - March 2023",
    type: "previous",
    responsibilities: [
      "Developed test cases for web applications",
      "Tested API endpoints using Postman",
      "Conducted weekly manual regression tests",
      "Ran post-production automated smoke tests",
      "Created and maintained automated regression suite using Selenium",
      "Conducted mobile testing using Android Studio",
      "Automated front and back end testing with Cucumber and Java to test user flow and server communication",
      "Utilized Cypress.io for automation in JavaScript to test front end user flow"
    ]
  },
  {
    id: 4,
    title: "QA Automation Engineer",
    company: "SQaaS",
    location: "Remote",
    period: "May 2021 - May 2023",
    type: "previous",
    responsibilities: [
      "Developed automated regression suite from scratch, utilizing Selenium Java",
      "Maintained and ensured functionality of automated regression suite in Selenium Java",
      "Reported bugs discovered during regression testing to facilitate prompt resolution",
      "Conducted mobile testing using Android Studio",
      "Automated front and back end testing with Cucumber and Java to test user flow and server communication",
      "Utilized Cypress.io for automation in JavaScript to test front end user flow"
    ]
  },
  {
    id: 5,
    title: "QA Automation Engineer",
    company: "Tatum Games",
    location: "Remote",
    period: "October 2021 - March 2022",
    type: "previous",
    responsibilities: [
      "Assist in developing from scratch automated regression suite",
      "Maintain automated regression suite and ensure working as expected in Selenium Java",
      "Developed test cases, submitted bug reports, and conducted automation testing using Eclipse IDE for Agile development and SaaS platforms",
      "Report bugs found through regression testing"
    ]
  },
  {
    id: 6,
    title: "Jr QA Analyst",
    company: "Tatum Games",
    location: "Remote",
    period: "February 2021 - July 2021",
    type: "previous",
    responsibilities: [
      "Tracked events, generated bug reports, and communicated QA analytics findings",
      "Conducted Ad Hoc testing",
      "Tested JDK in Unity to ensure seamless communication between Unity projects and Production page",
      "Reported bugs in production environment"
    ]
  }
];

export const skills = {
  languages: ["Java", "Javascript", "Python", "HTML5", "CSS", "PHP", "C#", "MySQL", "Swift"],
  tools: [
    "IntelliJ",
    "MongoDB", 
    "Jenkins",
    "Visual Studio",
    "WordPress",
    "FlutterFlow",
    "Unity Game Engine",
    "CircleCI"
  ],
  frameworks: [
    "Selenium",
    "Cypress.io",
    "Postman",
    "Android Studio",
    "Cucumber",
    "TestNG",
    "Appium"
  ],
  specialties: [
    "Large Language Models",
    "Management",
    "PayRoll",
    "Labor Forecasting"
  ],
  softSkills: [
    "Team work",
    "Problem solving", 
    "Adaptability",
    "Time management",
    "Communication"
  ]
};

export const education = [
  {
    degree: "Computer Science | Associate - Degree",
    school: "Long Beach City College", 
    period: "2024 - 2025"
  },
  {
    degree: "Computer Science | Fullstack Developer - Certificate",
    school: "Long Beach City College",
    period: "2024 - 2025"
  },
  {
    degree: "Computer Science | PHP Programmer - Certificate", 
    school: "Long Beach City College",
    period: "2023 - 2024"
  },
  {
    degree: "Computer Science | Web Developer - Certificate",
    school: "Long Beach City College",
    period: "2021 - 2023"
  }
];

export const projects = [
  {
    id: 1,
    title: "Selenium Test Framework",
    description: "Enterprise-grade test automation framework with Page Object Model, data-driven testing, parallel execution, and CI/CD integration. Includes comprehensive test utilities, screenshot capture, and detailed reporting.",
    technologies: ["Selenium WebDriver 4.x", "TestNG", "Maven", "Java 11+", "Jenkins", "GitHub Actions"],
    category: "Automation",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    githubUrl: "https://github.com/latorocka/selenium-framework",
    features: [
      "Page Object Model implementation",
      "Cross-browser testing (Chrome, Firefox, Edge, Safari)",
      "Data-driven testing with Excel integration",
      "Parallel test execution",
      "Screenshot capture on failures",
      "Comprehensive reporting with Extent Reports",
      "CI/CD pipeline integration",
      "Configuration management"
    ]
  },
  {
    id: 2,
    title: "API Test Suite",
    description: "Comprehensive enterprise-grade API testing framework with 8 specialized testing categories: Functional, Integration, Performance, Security, and Data Validation testing. Features automated test runner with detailed reporting, live API endpoint validation against JSONPlaceholder, GitHub, and SpaceX APIs, and production-ready error handling with metrics analysis.",
    technologies: ["Jest", "Supertest", "GraphQL", "WebSocket", "REST API", "CI/CD", "Performance Testing"],
    category: "API Testing",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    githubUrl: "https://github.com/latorocka/api-test-suite",
    features: [
      "Comprehensive test suite with 8 specialized testing categories",
      "Functional testing with complete CRUD operations validation",
      "Integration testing across multiple API systems with data consistency checks",
      "Performance testing including load, throughput, and scalability analysis",
      "Security testing with input validation, SQL injection, and vulnerability assessment",
      "Data validation with schema verification and cross-API consistency checks",
      "Live API endpoints: JSONPlaceholder, GitHub, SpaceX GraphQL, WebSocket servers",
      "Automated test runner with detailed reporting and category-based execution",
      "Real-time demonstration capabilities with immediate execution verification",
      "Production-ready test framework with professional error handling and metrics"
    ]
  },
  {
    id: 3,
    title: "Mobile Test Automation Suite",
    description: "Enterprise-grade cross-platform mobile test automation framework built with Appium and WebDriverIO. Features comprehensive Page Object Model architecture, parallel execution across multiple devices, advanced gesture testing, performance monitoring, and device management utilities for Android and iOS applications.",
    technologies: ["Appium 2.x", "WebDriverIO 8.x", "Android Studio", "Xcode", "iOS Simulator", "Page Object Model", "Parallel Testing", "Allure Reports", "CI/CD"],
    category: "Mobile Testing",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    githubUrl: "https://github.com/latorocka/mobile-test-suite",
    features: [
      "Cross-platform testing framework with unified Page Object Model for Android and iOS",
      "Enterprise-grade test architecture with base page classes and platform-specific implementations",
      "Real device and emulator/simulator support with automated environment setup scripts",
      "Parallel test execution across multiple devices with WebDriverIO configuration management",
      "Advanced gesture testing framework including multi-touch, pinch, zoom, and directional swipes",
      "Performance testing suite with app launch time, memory usage, battery impact, and network analysis",
      "Accessibility testing with screen reader compatibility and ADA compliance validation",
      "Comprehensive device management utilities for app lifecycle, network control, and permission handling",
      "Professional reporting with Allure integration, screenshot capture, and device information",
      "CI/CD pipeline integration with Jenkins and GitHub Actions for automated testing workflows",
      "Test data management with cross-platform test scenarios and device configuration support",
      "Advanced debugging capabilities with detailed logging, retry mechanisms, and error handling"
    ]
  },
  {
    id: 4,
    title: "Cypress Test Framework",
    description: "Comprehensive enterprise-grade Cypress test automation framework with modern JavaScript/TypeScript architecture. Features 100+ custom commands across API, UI, Performance, and Accessibility testing with professional CI/CD integration and advanced reporting capabilities.",
    technologies: ["Cypress 13.x", "JavaScript/TypeScript", "Mochawesome", "Axe-core", "Visual Regression", "GitHub Actions", "Jenkins", "Cross-browser Testing"],
    category: "E2E Testing",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    githubUrl: "https://github.com/latorocka/cypress-test-framework",
    features: [
      "Multi-layered testing architecture with API, UI, Performance, and Accessibility test suites",
      "100+ specialized custom commands for comprehensive testing scenarios across all categories",
      "Professional test organization with smoke, regression, integration, and critical path testing",
      "Cross-browser testing support for Chrome, Firefox, Edge, and Safari with parallel execution",
      "Advanced performance testing with Core Web Vitals, load testing, and memory monitoring",
      "WCAG 2.1 AA accessibility compliance testing with keyboard navigation and screen reader support",
      "Comprehensive API testing with REST, GraphQL, and WebSocket endpoint validation",
      "Visual regression testing with screenshot comparison and responsive design validation",
      "Security testing including XSS, CSRF, and SQL injection protection verification",
      "Professional reporting with Mochawesome, video recordings, and CI/CD artifact management",
      "Mobile and responsive testing with touch interaction simulation and viewport testing",
      "Enterprise-grade CI/CD integration with Jenkins pipelines and GitHub Actions workflows"
    ]
  }
];
