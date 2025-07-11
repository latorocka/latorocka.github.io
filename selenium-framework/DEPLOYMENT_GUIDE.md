# GitHub Deployment Guide - Selenium Test Framework

## Steps to Push Framework to GitHub

### 1. Prepare the Framework Files

All necessary files are now created in the `selenium-framework/` directory:

- ✅ Complete Maven project structure
- ✅ Core Java classes (DriverManager, ConfigManager, BasePage, BaseTest)
- ✅ Configuration files (config.properties, TestNG suites)
- ✅ CI/CD pipeline (GitHub Actions)
- ✅ Professional README with badges and documentation
- ✅ Proper .gitignore for Java/Maven projects

### 2. Create New Repository on GitHub

1. Go to [GitHub](https://github.com) and log in to your account
2. Click the "+" button in the top right corner
3. Select "New repository"
4. Name it: `selenium-framework`
5. Add description: "Enterprise-grade Selenium Test Automation Framework"
6. Make it **Public** (so it shows in your portfolio)
7. **Don't** initialize with README (we have our own)
8. Click "Create repository"

### 3. Initialize Git and Push Framework

Open terminal/command prompt in the `selenium-framework` directory and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit: Complete Selenium Test Framework

- Enterprise-grade framework with Page Object Model
- Cross-browser support (Chrome, Firefox, Edge, Safari)
- Thread-safe WebDriver management
- Data-driven testing with Excel integration
- Parallel execution capabilities
- CI/CD with GitHub Actions and Jenkins
- Comprehensive configuration management
- Advanced wait utilities and screenshot capture"

# Add remote repository (replace 'latorocka' with your GitHub username)
git remote add origin https://github.com/latorocka/selenium-framework.git

# Push to GitHub
git push -u origin main
```

### 4. Verify Repository Setup

After pushing, your repository should have:

- ✅ Professional README with badges and documentation
- ✅ Complete Maven project structure
- ✅ Working GitHub Actions CI pipeline
- ✅ All source code and configuration files
- ✅ Proper .gitignore and project metadata

### 5. Update Portfolio Button

Once the repository is live, update your portfolio's "View on GitHub" button to point to:
`https://github.com/latorocka/selenium-framework`

The button should now work perfectly and showcase your complete, professional automation framework.

## Repository Structure After Push

```
selenium-framework/
├── .github/workflows/ci.yml          # GitHub Actions CI
├── src/main/java/
│   ├── config/ConfigManager.java     # Configuration management
│   ├── pages/BasePage.java           # Base page object class
│   └── utils/DriverManager.java      # WebDriver management
├── src/test/java/
│   └── base/BaseTest.java            # Base test class
├── src/test/resources/
│   ├── config.properties             # Test configuration
│   └── testng.xml                    # TestNG suite configuration
├── .gitignore                        # Git ignore rules
├── DEPLOYMENT_GUIDE.md               # This file
├── README.md                         # Professional documentation
└── pom.xml                          # Maven configuration
```

## Next Steps After Deployment

1. **GitHub Actions will run automatically** on push/PR
2. **Add additional test classes** as needed
3. **Configure repository settings**:
   - Enable Issues for bug tracking
   - Set up branch protection rules
   - Add repository topics/tags
4. **Add to your resume** as a featured project
5. **Share in professional networks** (LinkedIn, etc.)

## Troubleshooting

### If Push Fails:
```bash
# If repository already exists with content
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### If Authentication Required:
- Use GitHub Personal Access Token instead of password
- Or set up SSH keys for authentication

### Repository URL Format:
- HTTPS: `https://github.com/latorocka/selenium-framework.git`
- SSH: `git@github.com:latorocka/selenium-framework.git`

## Professional Impact

This framework demonstrates:
- ✅ **Enterprise-level automation skills**
- ✅ **Best practices implementation**
- ✅ **CI/CD pipeline knowledge**
- ✅ **Professional code organization**
- ✅ **Documentation and maintenance capabilities**

Perfect for showcasing to potential employers and clients!