# Setup Guide - Selenium Test Framework

## Prerequisites

Before setting up the Selenium Test Framework, ensure you have the following installed:

### Required Software
- **Java Development Kit (JDK) 11 or higher**
  - Download from [Oracle](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://openjdk.org/)
  - Verify installation: `java -version`

- **Apache Maven 3.6+**
  - Download from [Maven Official Site](https://maven.apache.org/download.cgi)
  - Verify installation: `mvn -version`

- **IDE (Recommended)**
  - IntelliJ IDEA (Community or Ultimate)
  - Eclipse IDE for Java Developers
  - Visual Studio Code with Java extensions

### Browser Requirements
The framework supports multiple browsers:
- **Google Chrome** (Latest stable version)
- **Mozilla Firefox** (Latest stable version)
- **Microsoft Edge** (Latest stable version)
- **Safari** (macOS only)

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/brianlatorraca/selenium-framework.git
cd selenium-framework
```

### 2. Install Dependencies
```bash
mvn clean install
```

### 3. Configure Test Environment
Edit `src/test/resources/config.properties`:

```properties
# Browser Configuration
browser=chrome
headless=false
implicit.wait=10
explicit.wait=20

# Environment URLs
qa.url=https://your-qa-environment.com
staging.url=https://your-staging-environment.com
prod.url=https://your-production-environment.com
environment=qa

# Test Data
test.data.path=test-data/testdata.xlsx

# Reporting
screenshot.path=test-output/screenshots/
report.path=test-output/reports/
```

### 4. Verify Installation
Run a quick smoke test to verify everything is working:

```bash
mvn test -DsuiteXmlFile=src/test/resources/smoke-suite.xml
```

## IDE Setup

### IntelliJ IDEA Configuration

1. **Import Project**
   - File → Open → Select the project root directory
   - Import as Maven project

2. **Configure TestNG Plugin**
   - File → Settings → Plugins
   - Install TestNG plugin if not already installed

3. **Set Project SDK**
   - File → Project Structure → Project
   - Set Project SDK to Java 11+

4. **Configure Run Configurations**
   - Run → Edit Configurations
   - Add new TestNG configuration
   - Set Suite to `src/test/resources/testng.xml`

### Eclipse IDE Configuration

1. **Import Project**
   - File → Import → Existing Maven Projects
   - Browse to project root directory

2. **Install TestNG Plugin**
   - Help → Eclipse Marketplace
   - Search for "TestNG" and install

3. **Configure Build Path**
   - Right-click project → Properties → Java Build Path
   - Ensure JDK 11+ is configured

## Environment Variables (Optional)

Set environment variables for dynamic configuration:

```bash
# Windows
set BROWSER=chrome
set ENVIRONMENT=qa
set HEADLESS=false

# macOS/Linux
export BROWSER=chrome
export ENVIRONMENT=qa
export HEADLESS=false
```

## Troubleshooting

### Common Issues

#### WebDriver Executable Not Found
The framework uses WebDriverManager to automatically download drivers. If you encounter issues:

1. Check internet connectivity
2. Verify Maven dependencies are downloaded
3. Clear Maven local repository: `mvn dependency:purge-local-repository`

#### Test Data File Not Found
1. Ensure `test-data/testdata.xlsx` exists
2. Verify the path in `config.properties`
3. Check file permissions

#### Browser Launch Issues
1. Update browser to latest version
2. Check if browser is installed in default location
3. Try running in headless mode: set `headless=true` in config

#### Memory Issues
Add JVM arguments to Maven execution:
```bash
mvn test -Xmx2048m -XX:MaxPermSize=512m
```

## Next Steps

After successful setup:

1. Review the [User Guide](USER_GUIDE.md) for test execution
2. Check [Architecture Documentation](ARCHITECTURE.md) for framework details
3. Explore example test cases in `src/test/java/tests/`
4. Customize configuration for your application under test

## Support

For additional help:
- Review the main [README.md](../README.md)
- Check existing test examples
- Consult framework documentation in `/docs` directory

**Author:** Brian LaTorraca  
**Email:** Latorocka@gmail.com  
**Location:** Long Beach, CA