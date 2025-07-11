# Selenium Test Framework

A comprehensive, scalable test automation framework built with Selenium WebDriver, TestNG, and Maven. This framework demonstrates advanced automation testing patterns including Page Object Model, data-driven testing, and CI/CD integration.

## Features

- **Page Object Model (POM)** - Maintainable and reusable page classes
- **Data-Driven Testing** - External test data management with Excel/CSV support
- **Cross-Browser Testing** - Chrome, Firefox, Edge, and Safari support
- **Parallel Execution** - TestNG parallel test execution
- **Reporting** - Extent Reports with screenshots and detailed logs
- **CI/CD Ready** - Jenkins and GitHub Actions integration
- **Configuration Management** - Environment-specific configurations
- **Custom Utilities** - Screenshot capture, wait utilities, and data helpers

## Technology Stack

- **Java 11+** - Programming language
- **Selenium WebDriver 4.x** - Browser automation
- **TestNG** - Testing framework
- **Maven** - Build and dependency management
- **Extent Reports** - Test reporting
- **Apache POI** - Excel data handling
- **WebDriverManager** - Driver management

## Project Structure

```
selenium-framework/
├── src/
│   ├── main/java/
│   │   ├── pages/           # Page Object Model classes
│   │   ├── utils/           # Utility classes
│   │   └── config/          # Configuration management
│   └── test/java/
│       ├── tests/           # Test classes
│       ├── listeners/       # TestNG listeners
│       └── base/            # Base test class
├── test-data/              # Test data files
├── test-output/           # Test reports and screenshots
├── src/test/resources/    # Configuration files
└── pom.xml               # Maven configuration
```

## Getting Started

### Prerequisites

- Java 11 or higher
- Maven 3.6+
- IDE (IntelliJ IDEA/Eclipse)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/selenium-framework.git
cd selenium-framework
```

2. Install dependencies:
```bash
mvn clean install
```

3. Run tests:
```bash
mvn test
```

### Configuration

Edit `src/test/resources/config.properties`:

```properties
# Browser Configuration
browser=chrome
headless=false
implicit.wait=10
explicit.wait=20

# Application URLs
qa.url=https://qa-environment.com
staging.url=https://staging-environment.com
prod.url=https://production-environment.com

# Test Data
test.data.path=test-data/testdata.xlsx
```

## Test Execution

### Single Test
```bash
mvn test -Dtest=LoginTest
```

### Specific Browser
```bash
mvn test -Dbrowser=firefox
```

### Parallel Execution
```bash
mvn test -DsuiteXmlFile=testng-parallel.xml
```

### Environment Specific
```bash
mvn test -Denvironment=qa
```

## Reporting

After test execution, find reports in:
- `test-output/ExtentReports/` - Detailed HTML reports
- `test-output/screenshots/` - Failure screenshots
- `target/surefire-reports/` - TestNG reports

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## Best Practices

- Always use Page Object Model
- Implement proper wait strategies
- Capture screenshots on failures
- Use meaningful test data
- Follow naming conventions
- Maintain test independence

## Author

**Brian LaTorraca**  
QA Automation Engineer & Developer  
Email: Latorocka@gmail.com  
Phone: 714-316-3506  
Location: Long Beach, CA