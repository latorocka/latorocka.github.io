# Configure Replit for Direct GitHub Push

## Method 1: GitHub Personal Access Token (Recommended)

### Step 1: Create GitHub Personal Access Token

1. Go to GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name: "Replit Selenium Framework"
4. Select these scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again)

### Step 2: Configure Git in Replit

Run these commands in Replit terminal:

```bash
# Configure Git with your GitHub credentials
git config --global user.name "Your Name"
git config --global user.email "your-github-email@example.com"

# Navigate to selenium-framework directory
cd selenium-framework

# Initialize repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Enterprise Selenium Test Framework

✅ Complete automation framework featuring:
- Thread-safe WebDriver management
- Page Object Model implementation
- Cross-browser testing support
- Configuration management system
- Data-driven testing capabilities
- CI/CD pipeline with GitHub Actions
- Comprehensive documentation"

# Add remote with token authentication
git remote add origin https://YOUR_GITHUB_TOKEN@github.com/latorocka/selenium-framework.git

# Push to GitHub
git push -u origin main
```

### Step 3: Replace YOUR_GITHUB_TOKEN

Replace `YOUR_GITHUB_TOKEN` in the command above with your actual token.

Example:
```bash
git remote add origin https://ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@github.com/latorocka/selenium-framework.git
```

## Method 2: Using Replit's GitHub Integration

### Alternative: Use Replit's Built-in GitHub Integration

1. In Replit, click the "Version Control" tab (Git icon) in the left sidebar
2. Click "Connect to GitHub"
3. Authorize Replit to access your GitHub account
4. Select your `selenium-framework` repository
5. Replit will handle authentication automatically

## Method 3: SSH Key Setup (Advanced)

### Generate SSH Key in Replit

```bash
# Generate SSH key
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"

# Display public key to copy
cat ~/.ssh/id_rsa.pub
```

Then add this public key to your GitHub account in Settings → SSH and GPG keys.

## Quick Push Commands

Once configured, use these commands for future pushes:

```bash
cd selenium-framework
git add .
git commit -m "Update: Your commit message"
git push origin main
```

## Verify Configuration

After setup, verify with:

```bash
cd selenium-framework
git remote -v
git status
```

Your repository should be accessible at:
https://github.com/latorocka/selenium-framework

## Security Note

- Never commit your personal access token to the repository
- Store tokens securely
- Use token-based authentication for automated pushes
- Consider using SSH keys for enhanced security

Choose Method 1 (Personal Access Token) for the quickest setup!