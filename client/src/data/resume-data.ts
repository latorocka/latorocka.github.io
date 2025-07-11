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
    period: "February 2025 - May 2025",
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
    period: "October 2021 - December 2021",
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
    period: "February 2021 - April 2021",
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
    description: "Professional API testing framework featuring working implementations against live public endpoints. Demonstrates practical testing expertise through executable tests that validate real GitHub repository data, SpaceX mission information, and WebSocket communication with immediate execution capability.",
    technologies: ["Jest", "Supertest", "GraphQL", "WebSocket", "REST API", "CI/CD", "Performance Testing"],
    category: "API Testing",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    githubUrl: "https://github.com/latorocka/api-test-suite",
    features: [
      "Live REST API testing against JSONPlaceholder and GitHub APIs",
      "Working GraphQL queries against SpaceX API with real data",
      "Functional WebSocket testing with echo server connections",
      "Real-time API response validation and error handling",
      "Performance testing with concurrent request execution",
      "Actual HTTP request/response cycle demonstration",
      "Live demonstration script with working examples",
      "Comprehensive test coverage of public API endpoints",
      "Working code examples that can be executed immediately",
      "Real-world API testing scenarios with authentic data"
    ]
  },
  {
    id: 3,
    title: "Mobile Test Automation",
    description: "Cross-platform mobile testing framework using Appium and Android Studio for comprehensive mobile app validation.",
    technologies: ["Appium", "Android Studio", "Espresso", "Mobile Testing"],
    category: "Mobile Testing",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
  }
];
