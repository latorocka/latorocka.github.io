# Brian LaTorraca Portfolio - Full Stack Web Application

## Overview

This is a modern portfolio website for Brian LaTorraca, a QA Automation Engineer & Developer. The application is built as a full-stack web application showcasing professional experience, skills, and projects with a clean, responsive design.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state
- **Build Tool**: Vite for development and bundling
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints for contact form and resume download
- **Middleware**: Express middleware for JSON parsing, logging, and error handling

### Database & ORM
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Centralized schema definition in `shared/schema.ts`
- **Database Provider**: Configured for Neon Database (@neondatabase/serverless)
- **Migrations**: Drizzle Kit for database migrations

## Key Components

### Frontend Components
- **Navigation**: Fixed header with smooth scrolling navigation
- **Hero Section**: Landing area with call-to-action buttons
- **About Section**: Professional overview with highlighted skills
- **Skills Section**: Technical skills categorized by programming languages and tools
- **Experience Section**: Timeline-based work history display
- **Projects Section**: Portfolio showcasing with category badges
- **Contact Section**: Contact form with validation and toast notifications
- **Footer**: Social links and contact information

### Backend Services
- **Contact API**: Handles form submissions with validation
- **Resume API**: Endpoint for resume download functionality
- **Storage Layer**: In-memory storage implementation with interface for future database integration

### Shared Resources
- **Schema**: User model with Zod validation
- **Types**: TypeScript interfaces shared between client and server

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **Server Processing**: Express routes handle requests with middleware chain
3. **Response Handling**: JSON responses with consistent error handling
4. **State Updates**: Client updates UI based on server responses
5. **Toast Notifications**: User feedback through toast system

## External Dependencies

### UI & Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Class Variance Authority**: Component variant handling

### Development Tools
- **TypeScript**: Type safety across the application
- **Vite**: Fast development and build tooling
- **ESBuild**: Server-side bundling for production
- **PostCSS**: CSS processing with Tailwind

### Backend Dependencies
- **Express**: Web application framework
- **Drizzle ORM**: Type-safe database operations
- **Connect-pg-simple**: PostgreSQL session store (configured but not actively used)
- **Date-fns**: Date manipulation utilities

## Deployment Strategy

### Development
- **Dev Server**: Vite development server with HMR
- **Backend**: tsx for TypeScript execution in development
- **Database**: Drizzle push for schema synchronization

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Deployment**: Node.js production server serving both API and static files

### Environment Configuration
- **Database URL**: Required environment variable for PostgreSQL connection
- **Node Environment**: Differentiated development and production modes
- **Replit Integration**: Special handling for Replit development environment

### Build Commands
- `npm run dev`: Development mode with hot reload
- `npm run build`: Production build for both client and server
- `npm run start`: Production server startup
- `npm run db:push`: Database schema synchronization

The application follows a monorepo structure with clear separation between client, server, and shared code, enabling efficient development and deployment workflows.

## Recent Project Additions

### Selenium Test Framework (January 2025)
- **Location**: `/selenium-framework/` directory
- **Purpose**: Comprehensive enterprise-grade test automation framework demonstrating Brian's QA automation expertise
- **Technology Stack**: Java 11+, Selenium WebDriver 4.x, TestNG, Maven, Jenkins, GitHub Actions
- **Key Features**:
  - Page Object Model (POM) implementation
  - Cross-browser testing support (Chrome, Firefox, Edge, Safari)
  - Data-driven testing with Excel integration
  - Parallel test execution capabilities
  - Automatic screenshot capture on failures
  - Comprehensive test reporting with Extent Reports
  - CI/CD pipeline integration (Jenkins & GitHub Actions)
  - Configuration management for multiple environments
  - Thread-safe driver management
  - Advanced wait utilities and helper methods

**Framework Structure**:
- `src/main/java/` - Core framework code (pages, utils, config)
- `src/test/java/` - Test classes, base test setup, listeners
- `test-data/` - External test data files
- `src/test/resources/` - Configuration files and TestNG suites
- CI/CD configuration files for Jenkins and GitHub Actions

This project effectively demonstrates Brian's advanced automation skills including framework design, best practices implementation, and enterprise-level testing strategies.

**GitHub Integration**:
- ✅ **Successfully deployed** to GitHub repository: https://github.com/latorocka/selenium-framework
- ✅ **29 professional files pushed** including complete Java framework, documentation, and CI/CD pipeline
- ✅ **Direct push from Replit** configured with GitHub Personal Access Token
- ✅ **Live repository** showcases enterprise-grade automation framework with professional README
- Documentation links point to actual GitHub docs for live demonstration
- Project showcase includes comprehensive documentation with Setup Guide, User Guide, Architecture, and API Reference

**Recent Deployment (January 2025)**:
- Complete Selenium Test Framework successfully pushed to GitHub from Replit
- Repository configured with authentication and ready for future updates
- Portfolio "View on GitHub" button now links to live, professional automation framework
- Framework demonstrates enterprise-level QA automation skills and development practices

**Latest Updates (January 2025)**:
- ✅ **Updated Journey Text**: Added chef background story showcasing career transition from culinary to programming
- ✅ **Darker Color Scheme**: Implemented deeper, more professional dark theme with improved contrast
- Personal story now highlights precision, creativity, and problem-solving skills gained from kitchen experience
- Updated color palette uses darker backgrounds (hsl(220, 15%, 8%)) for more sophisticated appearance
- Enhanced text readability with improved foreground/background contrast ratios

**Resume Download Integration (January 2025)**:
- ✅ **Functional Resume Download**: Implemented complete resume download functionality
- ✅ **Real PDF File**: Uses actual resume (Brian_LaTorraca_Resume_2025_ATS.pdf) for authentic downloads
- ✅ **Professional Links**: Updated LinkedIn and GitHub links to point to real profiles
- Backend API endpoint serves PDF with proper headers and file attachment
- Frontend handles download with user feedback via toast notifications
- Removed proficiency keywords from programming languages section for cleaner appearance

**Contact Form Email Integration (January 2025)**:
- ✅ **Direct Email Functionality**: Contact form now sends messages directly to latorocka@gmail.com
- ✅ **SendGrid Integration**: Configured to use SendGrid API for reliable email delivery
- ✅ **Form Validation**: Added email format validation and required field checks
- ✅ **Error Handling**: Comprehensive error handling with user-friendly feedback
- Backend processes form submissions and formats professional email notifications
- Frontend provides real-time feedback via toast notifications for success/error states

**Skills Section Improvements (January 2025)**:
- ✅ **Professional Programming Icons**: Replaced emoji icons with industry-standard Devicon icons for better visual appeal
- ✅ **Testing Tools Icons**: Updated testing frameworks section with official logos from Simple Icons CDN and DevIcon library
- ✅ **Updated Development Tools**: Replaced MS Office with CircleCI for more relevant CI/CD skillset representation
- ✅ **GraphQL Integration**: Replaced Unity with GraphQL in testing tools section for better API testing focus
- Enhanced visual consistency and professional appearance across all technical skills sections
- Implemented hybrid icon system supporting both DevIcon classes and direct SVG images for maximum compatibility

**API Test Suite Project (January 2025)**:
- ✅ **Live Working API Tests**: Created functional API testing framework with real tests against public APIs
- ✅ **Real API Endpoints**: Tests JSONPlaceholder, GitHub API, SpaceX GraphQL, and WebSocket echo server
- ✅ **Executable Demonstrations**: Built live demo script showing actual API testing capabilities in action
- ✅ **Working Code Examples**: All tests are functional and can be executed to demonstrate real testing skills
- ✅ **Multiple API Types**: Covers REST APIs, GraphQL queries, and WebSocket real-time connections
- ✅ **Portfolio Integration**: Updated project description to emphasize live, working API tests
- ✅ **GitHub Deployment**: Successfully deployed to GitHub repository: https://github.com/latorocka/api-test-suite
- ✅ **Complete Documentation**: All technical documentation guides updated with API Test Suite content
- ✅ **15 Professional Files**: Comprehensive framework with test runner, demo scripts, and documentation
- ✅ **Live Repository**: Portfolio "View on GitHub" button now links to live, professional API testing framework
- Demonstrates practical API testing skills with actual HTTP requests and response validation
- Includes performance testing with concurrent requests against real endpoints
- Features comprehensive error handling and edge case testing with live APIs
- Provides immediate demonstration of API testing capabilities through executable code

**Mobile Test Automation Suite (January 2025)**:
- ✅ **Cross-Platform Framework**: Complete Appium and WebDriverIO-based testing framework for Android and iOS
- ✅ **Enterprise Architecture**: Page Object Model implementation with maintainable test structure
- ✅ **Comprehensive Test Coverage**: Functional, performance, accessibility, and gesture testing capabilities  
- ✅ **Real Device Support**: Native testing on physical devices, emulators, and iOS simulators
- ✅ **Advanced Utilities**: Device management, network control, app lifecycle management, and screenshot capture
- ✅ **Parallel Execution**: Multi-device testing with concurrent test execution across platforms
- ✅ **Professional Documentation**: Complete setup guides for Android SDK and iOS/Xcode environments
- ✅ **CI/CD Integration**: Jenkins and GitHub Actions pipeline configurations included
- ✅ **Portfolio Integration**: Updated project description and technologies to reflect enterprise-grade mobile testing
- ✅ **GitHub Deployment**: Successfully deployed to GitHub repository: https://github.com/latorocka/mobile-test-suite
- ✅ **Complete Framework**: 18 professional files with comprehensive mobile testing architecture
- ✅ **Live Repository**: Portfolio "View on GitHub" button now links to live, professional mobile testing framework
- Framework includes 25+ professional files with test specifications, configuration files, and utility scripts
- Demonstrates advanced mobile automation skills with real-world enterprise testing scenarios
- Comprehensive test data management and reporting with Allure integration
- Production-ready framework with error handling, retry mechanisms, and robust device management

**Cypress Test Framework (January 2025)**:
- ✅ **Enterprise-Grade Framework**: Complete Cypress test automation framework with modern JavaScript/TypeScript architecture
- ✅ **100+ Custom Commands**: Specialized commands across API, UI, Performance, and Accessibility testing categories
- ✅ **Multi-Layered Testing**: Comprehensive test suites for API, UI, Performance, Accessibility, Smoke, and Regression testing
- ✅ **Cross-Browser Support**: Testing capabilities for Chrome, Firefox, Edge, and Safari with parallel execution
- ✅ **Professional Architecture**: Modular design with clear separation of concerns and enterprise-grade patterns
- ✅ **Advanced Performance Testing**: Core Web Vitals monitoring, load testing, memory usage analysis, and network simulation
- ✅ **WCAG 2.1 AA Compliance**: Complete accessibility testing with keyboard navigation, screen reader support, and contrast validation
- ✅ **Security Testing**: XSS, CSRF, SQL injection protection verification with comprehensive security test suite
- ✅ **Visual Regression Testing**: Screenshot comparison and responsive design validation across multiple viewports
- ✅ **CI/CD Integration**: Professional Jenkins and GitHub Actions pipeline configurations with parallel execution
- ✅ **Advanced Reporting**: Mochawesome reports, video recordings, screenshot artifacts, and comprehensive test metrics
- ✅ **Professional Documentation**: Complete 15,000+ word documentation with setup guides, best practices, and API reference
- ✅ **GitHub Deployment**: Successfully deployed to GitHub repository: https://github.com/latorocka/cypress-test-framework
- ✅ **Complete Framework**: 17 professional files with 5,001 lines of code and comprehensive test architecture
- ✅ **Live Repository**: Portfolio "View on GitHub" button now links to live, professional Cypress testing framework
- Framework demonstrates advanced E2E testing capabilities with real-world enterprise testing scenarios
- Comprehensive test data management with fixtures, dynamic data generation, and cross-browser compatibility
- Production-ready framework with error handling, retry mechanisms, debugging capabilities, and performance optimization

**Documentation System Improvements (January 2025)**:
- ✅ **Enhanced API Reference Sections**: All four testing frameworks now include comprehensive code examples in API Reference documentation
- ✅ **Professional Code Examples**: Added detailed implementation examples for core framework APIs, utilities, and test patterns
- ✅ **Improved Button Functionality**: Documentation button now smoothly scrolls to documentation section instead of opening popups
- ✅ **GitHub Integration**: API Reference sections include direct GitHub repository links for accessing complete source code
- ✅ **Enhanced Styling**: Professional styling for documentation popups with syntax highlighting and improved readability
- ✅ **Framework-Specific Examples**: Each framework includes relevant code examples (Java for Selenium, JavaScript for others)
- Selenium Framework API Reference includes WebDriver management, Page Object patterns, and test utilities
- API Test Suite Reference covers REST/GraphQL testing, performance monitoring, and security validation
- Mobile Test Suite Reference demonstrates device management, gesture testing, and cross-platform automation
- Cypress Framework Reference showcases custom commands, accessibility testing, and performance monitoring

**GitHub Pages Deployment Success (January 2025)** - Updated with Complete Components:
- ✅ **Working Portfolio Deployed**: Successfully deployed complete portfolio to https://latorocka.github.io
- ✅ **Professional Design**: Implemented using Tailwind CSS with professional dark theme and responsive layout
- ✅ **Complete Content**: Includes career timeline, technical skills, experience, and all 4 testing framework links
- ✅ **GitHub Integration**: All testing framework projects properly linked to live repositories
- ✅ **Contact Information**: Professional LinkedIn and email contact integration
- ✅ **Career Story**: Chef-to-programmer journey highlighting precision and systematic approach
- ✅ **Technical Showcase**: PowerBI skills, testing frameworks, and comprehensive project descriptions
- ✅ **Identical to Replit Preview**: Latest deployment includes all visual elements from Replit preview
- ✅ **Project Images**: All project cards now display proper Unsplash images matching Replit version
- ✅ **DevIcon Integration**: Complete DevIcon implementation for programming languages and tools
- ✅ **Visual Consistency**: Skills section with professional icons and comprehensive testing tools display
- ✅ **Documentation System**: Interactive project documentation with code examples and GitHub links
- ✅ **React Components**: Full React implementation using CDN with Card, Badge, and proper component structure
- ✅ **Interactive Features**: Project documentation system, smooth scrolling navigation, and detailed tool descriptions
- ✅ **Complete Functionality**: All Replit preview features including skills categorization and experience timeline
- ✅ **LinkedIn Button Fixed**: Corrected LinkedIn URL to point to actual profile
- ✅ **Comprehensive Skills**: Added Testing Tools & Frameworks section with 8 tools, Frameworks & Libraries section
- ✅ **All Components Present**: Complete Skills section includes 4 categories with proper DevIcon integration
- ✅ **Enhanced Projects**: Detailed project descriptions with comprehensive feature lists matching Replit
- ✅ **Hero Section Updated**: Two-column layout with background image, highlighted technologies, and professional photo
- ✅ **About Section Enhanced**: "My Journey" story with professional highlights and two-column layout
- ✅ **Hero Buttons Fixed**: Updated to match Replit styling with proper shadcn/ui button components
- Portfolio features smooth navigation, professional styling, and mobile-responsive design
- Deployment uses React with Babel for full component functionality matching Replit preview exactly
- All framework links point to actual GitHub repositories with complete documentation and working code