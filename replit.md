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
- Connected to real GitHub repository: https://github.com/latorocka/selenium-framework
- Documentation links point to actual GitHub docs for live demonstration
- Project showcase includes comprehensive documentation with Setup Guide, User Guide, Architecture, and API Reference