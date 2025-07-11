import { useRoute } from "wouter";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Github, ExternalLink, Code, FileText, Play, Book, Settings, Users } from "lucide-react";
import { projects } from "@/data/resume-data";
import { Link } from "wouter";

export default function ProjectDetail() {
  const [match, params] = useRoute("/project/:id");
  const projectId = params?.id ? parseInt(params.id) : null;
  const project = projects.find(p => p.id === projectId);

  // Scroll to top when component mounts or project changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
            <p className="text-secondary mb-8">The project you're looking for doesn't exist.</p>
            <Link href="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getProjectContent = () => {
    if (project.id === 1) {
      // Selenium Framework
      return {
        overview: `This comprehensive Selenium Test Framework demonstrates enterprise-level test automation practices. Built from scratch using Java and Maven, it implements industry best practices including the Page Object Model pattern, data-driven testing, and robust CI/CD integration.`,
        
        keyFeatures: [
          "Page Object Model (POM) implementation for maintainable test code",
          "Cross-browser testing support (Chrome, Firefox, Edge, Safari)",
          "Data-driven testing with Excel file integration",
          "Parallel test execution for faster feedback",
          "Automatic screenshot capture on test failures",
          "Comprehensive test reporting with Extent Reports",
          "Thread-safe WebDriver management",
          "Advanced wait utilities and helper methods",
          "Environment-specific configuration management",
          "CI/CD pipeline integration (Jenkins & GitHub Actions)"
        ],
        sectionTitle: "Framework Architecture",
        hasCodeExamples: true,
        hasProjectStructure: true
      };
    } else if (project.id === 2) {
      // API Test Suite
      return {
        overview: `This enterprise-grade API Test Suite demonstrates comprehensive testing expertise through 8 specialized testing categories including Functional, Integration, Performance, Security, and Data Validation testing. Features automated test runner with detailed reporting, live API endpoint validation, and production-ready error handling with metrics analysis.`,
        
        keyFeatures: [
          "8 specialized testing categories: Functional, Integration, Performance, Security, Data Validation",
          "Automated test runner with CLI interface and detailed reporting",
          "Live API endpoint testing against JSONPlaceholder, GitHub, and SpaceX APIs",
          "Comprehensive CRUD operations validation with real data verification",
          "Cross-API workflow testing and data consistency validation",
          "Performance testing with load, throughput, and scalability analysis",
          "Security testing including SQL injection and XSS protection validation",
          "Data validation with schema verification across multiple API protocols",
          "Professional error handling with metrics analysis and success rate tracking",
          "Real-time demonstration capabilities with immediate execution verification"
        ],
        sectionTitle: "Testing Categories",
        hasCodeExamples: true,
        hasProjectStructure: true
      };
    } else if (project.id === 3) {
      // Mobile Test Suite
      return {
        overview: `This enterprise-grade cross-platform mobile test automation framework built with Appium and WebDriverIO demonstrates comprehensive mobile testing capabilities. Features advanced Page Object Model architecture, parallel execution across multiple devices, gesture testing, performance monitoring, and device management utilities for Android and iOS applications.`,
        
        keyFeatures: [
          "Cross-platform testing framework with unified Page Object Model for Android and iOS",
          "Enterprise-grade test architecture with base page classes and platform-specific implementations",
          "Real device and emulator/simulator support with automated environment setup scripts",
          "Parallel test execution across multiple devices with WebDriverIO configuration management",
          "Advanced gesture testing framework including multi-touch, pinch, zoom, and directional swipes",
          "Performance testing suite with app launch time, memory usage, battery impact, and network analysis",
          "Accessibility testing with screen reader compatibility and ADA compliance validation",
          "Comprehensive device management utilities for app lifecycle, network control, and permission handling",
          "Professional reporting with Allure integration, screenshot capture, and device information",
          "CI/CD pipeline integration with Jenkins and GitHub Actions for automated testing workflows"
        ],
        sectionTitle: "Mobile Testing Capabilities",
        hasCodeExamples: true,
        hasProjectStructure: true
      };
    } else {
      // Cypress Test Framework
      return {
        overview: `This advanced end-to-end test automation framework built with Cypress 13.x demonstrates modern testing practices and enterprise-grade architecture. The comprehensive framework showcases professional QA automation skills through multi-layered testing strategies, 100+ custom command libraries, and production-ready CI/CD integration with detailed performance and accessibility validation.`,
        
        keyFeatures: [
          "Multi-layered testing architecture with API, UI, Performance, and Accessibility test suites",
          "100+ specialized custom commands for comprehensive testing scenarios across all categories",
          "Professional test organization with smoke, regression, integration, and critical path testing",
          "Cross-browser testing support for Chrome, Firefox, Edge, and Safari with parallel execution",
          "Advanced performance testing with Core Web Vitals monitoring and load testing capabilities",
          "WCAG 2.1 AA accessibility compliance testing with keyboard navigation and screen reader support",
          "Comprehensive API testing with REST, GraphQL, and WebSocket endpoint validation",
          "Visual regression testing with screenshot comparison and responsive design validation",
          "Security testing including XSS, CSRF, and SQL injection protection verification",
          "Professional reporting with Mochawesome, video recordings, and CI/CD artifact management",
          "Mobile and responsive testing with touch interaction simulation and viewport testing",
          "Enterprise-grade CI/CD integration with Jenkins pipelines and GitHub Actions workflows"
        ],
        sectionTitle: "Testing Architecture",
        hasCodeExamples: true,
        hasProjectStructure: true
      };
    }
  };

  const projectContent = getProjectContent();

  const openDocumentation = (docType: string) => {
    const projectName = project.id === 1 ? 'Selenium Test Framework' : 
                       project.id === 2 ? 'API Test Suite' : 
                       project.id === 3 ? 'Mobile Test Automation Suite' :
                       'Cypress Test Framework';
    
    let content = '';
    
    if (docType === 'setup') {
      content = `# Setup Guide - ${projectName}

## Overview
Complete installation and configuration guide for ${project.title}.

## Prerequisites
${project.id === 1 ? 
  '- Java Development Kit (JDK) 11+\n- Apache Maven 3.6+\n- IDE (IntelliJ IDEA, Eclipse, VS Code)\n- Browser support: Chrome, Firefox, Edge, Safari' :
  project.id === 2 ?
  '- Node.js 16.x or higher\n- npm or yarn package manager\n- Internet connection for live API testing\n- Jest testing framework' :
  project.id === 3 ?
  '- Node.js 16.x or higher\n- Android Studio with SDK Tools\n- Xcode 14.x or later (macOS)\n- Appium 2.x drivers' :
  '- Node.js 16.x or higher\n- npm or yarn package manager\n- Cypress 13.x test framework\n- Browser support: Chrome, Firefox, Edge, Safari'
}

## Installation
${project.id === 1 ?
  '1. Clone repository\n2. Run: mvn clean install\n3. Execute: mvn test' :
  project.id === 2 ?
  '1. Clone repository\n2. Run: npm install\n3. Execute: npm test' :
  project.id === 3 ?
  '1. Clone repository\n2. Run: npm install\n3. Install Appium drivers\n4. Setup Android/iOS environment' :
  '1. Clone repository\n2. Run: npm install\n3. Execute: npm run cy:open\n4. Run tests: npm run cy:run'
}

## Configuration
${project.id === 1 ?
  'Edit config.properties for environment settings.' :
  project.id === 2 ?
  'No additional configuration required. Tests run against public APIs.' :
  project.id === 3 ?
  'Configure device settings in wdio configuration files.' :
  'Configure cypress.config.js for environment settings and test configuration.'
}

For complete documentation, visit: ${project.githubUrl}
Contact: Latorocka@gmail.com`;
    }
    
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>${projectName} - ${docType.charAt(0).toUpperCase() + docType.slice(1)} Guide</title>
            <style>
              body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
              h1, h2, h3 { color: #2563eb; }
              pre { background: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; white-space: pre-wrap; }
            </style>
          </head>
          <body>
            <pre>${content}</pre>
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Button>
          </Link>
        </div>

        {/* Project Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="md:w-1/2">
              <Badge className="mb-4">{project.category}</Badge>
              <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
              <p className="text-lg text-secondary mb-6">{project.description}</p>
              
              <div className="flex gap-4">
                <Button asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View on GitHub
                  </a>
                </Button>
                <Button variant="outline" onClick={() => openDocumentation('setup')}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Documentation
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Project Overview */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Project Overview</h2>
            <p className="text-lg leading-relaxed mb-6">{projectContent.overview}</p>
            
            <h3 className="text-xl font-semibold mb-4">{projectContent.sectionTitle}</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {projectContent.keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.features.map((feature, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span className="text-sm">{feature}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Documentation */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Documentation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Book className="h-6 w-6 text-blue-500" />
                  <h3 className="font-bold text-lg">Setup Guide</h3>
                </div>
                <p className="text-secondary text-sm mb-4">
                  Complete installation and configuration instructions.
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => openDocumentation('setup')}
                >
                  <Book className="mr-2 h-4 w-4" />
                  View Setup Guide
                </Button>
              </div>

              <div className="border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-6 w-6 text-green-500" />
                  <h3 className="font-bold text-lg">User Guide</h3>
                </div>
                <p className="text-secondary text-sm mb-4">
                  Comprehensive guide for using the framework.
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    window.open(project.githubUrl, '_blank');
                  }}
                >
                  <Users className="mr-2 h-4 w-4" />
                  View on GitHub
                </Button>
              </div>

              <div className="border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Code className="h-6 w-6 text-orange-500" />
                  <h3 className="font-bold text-lg">Code Examples</h3>
                </div>
                <p className="text-secondary text-sm mb-4">
                  Working code examples and implementation patterns.
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    window.open(project.githubUrl, '_blank');
                  }}
                >
                  <Code className="mr-2 h-4 w-4" />
                  View Examples
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technologies */}
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Technologies & Tools</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {project.technologies.map((tech) => (
                <div key={tech} className="text-center p-4 border rounded-lg">
                  <span className="font-medium">{tech}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}