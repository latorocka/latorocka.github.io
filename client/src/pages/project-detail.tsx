import { useRoute } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Github, ExternalLink, Code, FileText, Play } from "lucide-react";
import { projects } from "@/data/resume-data";
import { Link } from "wouter";

export default function ProjectDetail() {
  const [match, params] = useRoute("/project/:id");
  const projectId = params?.id ? parseInt(params.id) : null;
  const project = projects.find(p => p.id === projectId);

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

  const seleniumFramework = {
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

    architecture: [
      {
        component: "Driver Management",
        description: "Thread-safe WebDriver initialization with support for multiple browsers and headless execution"
      },
      {
        component: "Page Object Model",
        description: "Structured page classes with reusable methods and element locators for maintainable test code"
      },
      {
        component: "Test Utilities",
        description: "Helper classes for screenshots, waits, Excel data handling, and configuration management"
      },
      {
        component: "Test Classes",
        description: "Comprehensive test scenarios with data-driven testing and proper test lifecycle management"
      }
    ],

    codeExamples: [
      {
        title: "Driver Manager Implementation",
        language: "java",
        code: `public class DriverManager {
    private static final ThreadLocal<WebDriver> driverThreadLocal = new ThreadLocal<>();
    
    public static void setDriver() {
        String browserName = config.getBrowser().toLowerCase();
        WebDriver driver;
        
        switch (browserName) {
            case "chrome":
                WebDriverManager.chromedriver().setup();
                ChromeOptions chromeOptions = new ChromeOptions();
                if (config.isHeadless()) {
                    chromeOptions.addArguments("--headless");
                }
                driver = new ChromeDriver(chromeOptions);
                break;
            // Additional browser configurations...
        }
        
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(config.getImplicitWait()));
        driverThreadLocal.set(driver);
    }
}`
      },
      {
        title: "Page Object Model Example",
        language: "java",
        code: `public class LoginPage extends BasePage {
    @FindBy(id = "username")
    private WebElement usernameField;
    
    @FindBy(id = "password")
    private WebElement passwordField;
    
    @FindBy(id = "login-button")
    private WebElement loginButton;
    
    public void login(String username, String password) {
        enterUsername(username);
        enterPassword(password);
        clickLoginButton();
    }
    
    public void enterUsername(String username) {
        WaitUtils.waitForElementToBeVisible(driver, USERNAME_FIELD);
        sendKeys(usernameField, username);
    }
}`
      },
      {
        title: "Data-Driven Test Implementation",
        language: "java",
        code: `@Test(dataProvider = "loginData")
public void testDataDrivenLogin(Map<String, String> testData) {
    LoginPage loginPage = new LoginPage(DriverManager.getDriver());
    
    String username = testData.get("username");
    String password = testData.get("password");
    String expectedResult = testData.get("expectedResult");
    
    loginPage.login(username, password);
    
    if (expectedResult.equals("success")) {
        HomePage homePage = new HomePage(DriverManager.getDriver());
        Assert.assertTrue(homePage.isHomePageLoaded());
    } else {
        Assert.assertTrue(loginPage.isErrorMessageDisplayed());
    }
}

@DataProvider(name = "loginData")
public Object[][] getLoginTestData() {
    return ExcelUtils.readExcelData(config.getTestDataPath(), "LoginData");
}`
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Button>
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
              <p className="text-xl text-secondary">{project.description}</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button className="bg-primary hover:bg-primary/90">
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </Button>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Documentation
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-6">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Project Image */}
        <div className="mb-12">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-64 lg:h-96 object-cover rounded-xl shadow-xl"
          />
        </div>

        {/* Overview */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
            <p className="text-secondary leading-relaxed">
              {seleniumFramework.overview}
            </p>
          </CardContent>
        </Card>

        {/* Key Features */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {seleniumFramework.keyFeatures.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-green-500 mt-1 mr-3">✓</span>
                  <span className="text-secondary">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Architecture */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Framework Architecture</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {seleniumFramework.architecture.map((component, index) => (
                <div key={index} className="border rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-3 text-primary">{component.component}</h3>
                  <p className="text-secondary text-sm">{component.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Code Examples */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Code Examples</h2>
            <div className="space-y-8">
              {seleniumFramework.codeExamples.map((example, index) => (
                <div key={index}>
                  <h3 className="font-bold text-lg mb-4 text-accent">{example.title}</h3>
                  <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-6 overflow-x-auto">
                    <pre className="text-sm text-slate-300">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project Structure */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">Project Structure</h2>
            <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-6">
              <pre className="text-sm text-slate-300">
                <code>{`selenium-framework/
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
├── Jenkinsfile           # Jenkins CI/CD pipeline
├── .github/workflows/    # GitHub Actions CI
└── pom.xml              # Maven configuration`}</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Technologies Used */}
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