# Selenium Test Framework

[![Java](https://img.shields.io/badge/Java-11+-orange.svg)](https://www.oracle.com/java/)
[![Maven](https://img.shields.io/badge/Maven-3.6+-blue.svg)](https://maven.apache.org/)
[![Selenium](https://img.shields.io/badge/Selenium-4.x-green.svg)](https://selenium.dev/)
[![TestNG](https://img.shields.io/badge/TestNG-7.x-red.svg)](https://testng.org/)

## Overview

Enterprise-grade Selenium Test Automation Framework built with Java, Maven, and TestNG. Features Page Object Model design, data-driven testing, parallel execution, and comprehensive CI/CD integration.

## Key Features

- **Page Object Model (POM)** - Maintainable and reusable page classes
- **Cross-Browser Testing** - Chrome, Firefox, Edge, Safari support
- **Data-Driven Testing** - Excel integration with TestNG DataProvider
- **Parallel Execution** - Thread-safe driver management
- **Screenshot Capture** - Automatic failure screenshots
- **Comprehensive Reporting** - TestNG HTML reports and custom reporting
- **CI/CD Integration** - Jenkins and GitHub Actions support
- **Configuration Management** - Environment-specific settings
- **Thread-Safe Architecture** - ThreadLocal WebDriver implementation
- **Advanced Wait Utilities** - Explicit and fluent wait strategies

## Quick Start

### Prerequisites

- Java Development Kit (JDK) 11 or higher
- Apache Maven 3.6+
- IDE (IntelliJ IDEA, Eclipse, or VS Code)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/latorocka/selenium-framework.git
   cd selenium-framework
   ```

2. **Install dependencies**
   ```bash
   mvn clean install
   ```

3. **Run tests**
   ```bash
   # Run all tests
   mvn test
   
   # Run specific browser
   mvn test -Dbrowser=chrome
   
   # Run headless
   mvn test -Dheadless=true
   ```

## Project Structure

```
selenium-framework/
├── src/
│   ├── main/java/
│   │   ├── pages/           # Page Object Model classes
│   │   │   ├── BasePage.java
│   │   │   └── LoginPage.java
│   │   ├── utils/           # Utility classes
│   │   │   ├── DriverManager.java
│   │   │   ├── WaitUtils.java
│   │   │   ├── ExcelUtils.java
│   │   │   └── ScreenshotUtils.java
│   │   └── config/          # Configuration management
│   │       └── ConfigManager.java
│   └── test/java/
│       ├── tests/           # Test classes
│       │   └── LoginTest.java
│       ├── listeners/       # TestNG listeners
│       │   └── TestListener.java
│       └── base/            # Base test class
│           └── BaseTest.java
├── test-data/              # Test data files
│   └── testdata.xlsx
├── test-output/           # Test reports and screenshots
├── src/test/resources/    # Configuration files
│   ├── config.properties
│   ├── testng.xml
│   ├── smoke-suite.xml
│   ├── regression-suite.xml
│   └── parallel-suite.xml
├── docs/                  # Documentation
│   ├── SETUP.md
│   ├── USER_GUIDE.md
│   ├── ARCHITECTURE.md
│   └── API_REFERENCE.md
├── .github/workflows/     # GitHub Actions CI
│   └── ci.yml
├── Jenkinsfile           # Jenkins CI/CD pipeline
├── pom.xml              # Maven configuration
└── README.md            # This file
```

## Usage Examples

### Basic Test Class

```java
public class LoginTest extends BaseTest {
    
    @Test
    public void testValidLogin() {
        LoginPage loginPage = new LoginPage(DriverManager.getDriver());
        
        loginPage.enterUsername("testuser");
        loginPage.enterPassword("password");
        loginPage.clickLogin();
        
        HomePage homePage = new HomePage(DriverManager.getDriver());
        Assert.assertTrue(homePage.isWelcomeMessageDisplayed());
    }
}
```

### Data-Driven Test

```java
@Test(dataProvider = "loginData")
public void testDataDrivenLogin(Map<String, String> testData) {
    String username = testData.get("username");
    String password = testData.get("password");
    String expectedResult = testData.get("expectedResult");
    
    LoginPage loginPage = new LoginPage(DriverManager.getDriver());
    loginPage.login(username, password);
    
    // Verify results based on test data
}

@DataProvider(name = "loginData")
public Object[][] getLoginTestData() {
    return ExcelUtils.readExcelData("test-data/logindata.xlsx", "LoginData");
}
```

## Configuration

### Browser Configuration

Edit `src/test/resources/config.properties`:

```properties
# Browser settings
browser=chrome
headless=false
implicit.wait=10
explicit.wait=20

# Environment URLs
qa.url=https://qa.yourapp.com
staging.url=https://staging.yourapp.com
prod.url=https://production.yourapp.com
environment=qa

# Test data
test.data.path=test-data/testdata.xlsx
```

### Parallel Execution

Configure parallel execution in TestNG suite files:

```xml
<suite name="Parallel Suite" parallel="tests" thread-count="3">
    <test name="Chrome Tests">
        <parameter name="browser" value="chrome"/>
        <classes>
            <class name="tests.LoginTest"/>
        </classes>
    </test>
    <test name="Firefox Tests">
        <parameter name="browser" value="firefox"/>
        <classes>
            <class name="tests.LoginTest"/>
        </classes>
    </test>
</suite>
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Selenium Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        browser: [chrome, firefox]
        java-version: [11, 17]
    
    steps:
    - uses: actions/checkout@v3
    - name: Set up JDK ${{ matrix.java-version }}
      uses: actions/setup-java@v3
      with:
        java-version: ${{ matrix.java-version }}
        distribution: 'temurin'
    
    - name: Run tests
      run: mvn test -Dbrowser=${{ matrix.browser }} -Dheadless=true
```

### Jenkins Pipeline

```groovy
pipeline {
    agent any
    
    tools {
        maven 'Maven-3.8'
        jdk 'JDK-11'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Test') {
            parallel {
                stage('Chrome Tests') {
                    steps {
                        sh 'mvn test -Dbrowser=chrome -Dheadless=true'
                    }
                }
                stage('Firefox Tests') {
                    steps {
                        sh 'mvn test -Dbrowser=firefox -Dheadless=true'
                    }
                }
            }
        }
    }
    
    post {
        always {
            publishTestResults testResultsPattern: 'target/surefire-reports/*.xml'
            archiveArtifacts artifacts: 'test-output/**/*', allowEmptyArchive: true
        }
    }
}
```

## Documentation

- [Setup Guide](docs/SETUP.md) - Installation and configuration
- [User Guide](docs/USER_GUIDE.md) - Test execution and development
- [Architecture](docs/ARCHITECTURE.md) - Framework design and patterns
- [API Reference](docs/API_REFERENCE.md) - Class and method documentation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Technologies Used

- **Java 11+** - Programming language
- **Selenium WebDriver 4.x** - Browser automation
- **TestNG** - Test framework
- **Maven** - Build and dependency management
- **WebDriverManager** - Automatic driver management
- **Apache POI** - Excel data handling
- **Jenkins** - CI/CD pipeline
- **GitHub Actions** - Automated testing

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

**Brian LaTorraca**  
QA Automation Engineer & Developer  
📧 Latorocka@gmail.com  
🌍 Long Beach, CA  
💼 [Portfolio](https://your-portfolio-url.com)  
🔗 [LinkedIn](https://linkedin.com/in/your-profile)

---

⭐ **Star this repository if you find it helpful!**