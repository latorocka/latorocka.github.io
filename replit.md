# Brian LaTorraca Portfolio - Full Stack Web Application

## Overview
This project is a full-stack portfolio web application for Brian LaTorraca, a QA Automation Engineer & Developer. It showcases his professional experience, skills, and projects through a clean, responsive design. The application integrates comprehensive demonstrations of his expertise in test automation, including enterprise-grade frameworks for Selenium, API testing, mobile automation, and Cypress. The business vision is to provide a compelling, interactive resume that highlights advanced technical skills and project capabilities to potential employers, leveraging modern web technologies and robust backend services.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui and Radix UI primitives
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript (ES modules)
- **API Design**: RESTful for contact form and resume download
- **Middleware**: JSON parsing, logging, and error handling

### Database & ORM
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Centralized definition in `shared/schema.ts`
- **Database Provider**: Configured for Neon Database
- **Migrations**: Drizzle Kit

### Key Features
- **UI/UX**: Fixed header navigation, Hero section, About, Skills, Experience (timeline), Projects (with category badges), Contact form with validation, and Footer. Uses a dark theme with improved contrast.
- **Backend Services**: Contact API with SendGrid integration, Resume API for PDF download.
- **Shared Resources**: Zod validation for user models, shared TypeScript interfaces.
- **Deployment**: Monorepo structure for client, server, and shared code. Frontend builds to `dist/public`, backend bundles to `dist/index.js`. Deployed via GitHub Pages for frontend and Node.js for backend.

### Project Showcase Implementations
- **Selenium Test Framework**: Java 11+, Selenium WebDriver 4.x, TestNG, Maven. Features POM, cross-browser, data-driven, parallel execution, and CI/CD integration.
- **API Test Suite**: Demonstrates API testing for REST, GraphQL, and WebSockets.
- **Mobile Test Automation Suite**: Appium and WebDriverIO-based for Android/iOS with POM, real device support, and parallel execution.
- **Cypress Test Framework**: JavaScript/TypeScript framework for API, UI, Performance, Accessibility, and Security testing with over 100 custom commands, cross-browser support, and CI/CD integration.

## External Dependencies

### UI & Styling
- Radix UI
- Tailwind CSS
- Lucide React (Icon library)
- Class Variance Authority

### Development Tools
- TypeScript
- Vite
- ESBuild
- PostCSS

### Backend Dependencies
- Express
- Drizzle ORM
- SendGrid (for email functionality)
- Date-fns