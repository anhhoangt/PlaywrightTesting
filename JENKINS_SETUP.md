# Jenkins CI/CD Pipeline Setup for Playwright Tests

This guide will walk you through setting up a Jenkins CI/CD pipeline to automatically run your Playwright tests.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Jenkins Installation](#jenkins-installation)
3. [Jenkins Configuration](#jenkins-configuration)
4. [Pipeline Setup](#pipeline-setup)
5. [Running Your First Build](#running-your-first-build)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting, ensure you have:
- Java 11 or later installed (required for Jenkins)
- Git installed on your system
- Your code in a Git repository (GitHub, GitLab, Bitbucket, etc.)
- Access to install Jenkins on your machine or server

---

## Step 1: Jenkins Installation

### For macOS:
```bash
# Install Jenkins using Homebrew
brew install jenkins-lts

# Start Jenkins
brew services start jenkins-lts
```

### For Ubuntu/Debian:
```bash
# Add Jenkins repository
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null

# Install Jenkins
sudo apt-get update
sudo apt-get install jenkins

# Start Jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins
```

### For Windows:
1. Download Jenkins from https://www.jenkins.io/download/
2. Run the installer
3. Follow the installation wizard

### Access Jenkins:
1. Open your browser and go to `http://localhost:8080`
2. Get the initial admin password:
   ```bash
   # macOS/Linux:
   cat /Users/Shared/Jenkins/Home/secrets/initialAdminPassword

   # Or check your terminal output during installation
   ```
3. Paste the password and click **Continue**
4. Select **Install suggested plugins**
5. Create your first admin user
6. Complete the setup

---

## Step 2: Jenkins Configuration

### Install Required Plugins

1. Go to **Manage Jenkins** → **Manage Plugins**
2. Click the **Available plugins** tab
3. Search and install these plugins:
   - **NodeJS Plugin** (for running Node.js and npm)
   - **HTML Publisher Plugin** (for publishing Playwright reports)
   - **Git Plugin** (usually pre-installed)
   - **Pipeline** (usually pre-installed)
   - **Workspace Cleanup Plugin** (optional but recommended)

4. Click **Install without restart**
5. Wait for installation to complete

### Configure Node.js

1. Go to **Manage Jenkins** → **Global Tool Configuration**
2. Scroll to **NodeJS** section
3. Click **Add NodeJS**
4. Configure:
   - **Name**: `Node 18` (or your preferred version)
   - **Version**: Select Node.js 18.x or later
   - Check **Install automatically**
5. Click **Save**

---

## Step 3: Pipeline Setup

### Create a New Pipeline Job

1. From Jenkins dashboard, click **New Item**
2. Enter a name: `Playwright-Tests`
3. Select **Pipeline**
4. Click **OK**

### Configure the Pipeline

#### General Settings:
- **Description**: `Automated Playwright test execution`
- Check **GitHub project** (if applicable) and add your repository URL

#### Build Triggers:
Choose one or more:
- **Poll SCM**: `H/15 * * * *` (checks for changes every 15 minutes)
- **GitHub hook trigger for GITScm polling** (for webhook-based triggers)
- **Build periodically**: `H 2 * * *` (runs daily at 2 AM)

#### Pipeline Configuration:

**Option 1: Pipeline from SCM (Recommended)**
1. Under **Pipeline** section, select **Pipeline script from SCM**
2. **SCM**: Git
3. **Repository URL**: Enter your Git repository URL
   - Example: `https://github.com/yourusername/PlaywrightTesting.git`
4. **Credentials**: Add your Git credentials if needed
   - Click **Add** → **Jenkins**
   - Select **Username with password**
   - Enter your Git credentials
   - Click **Add**
5. **Branch**: `*/main` or `*/master` (your default branch)
6. **Script Path**: `Jenkinsfile`
7. Click **Save**

**Option 2: Pipeline Script (For Testing)**
1. Under **Pipeline** section, select **Pipeline script**
2. Copy the contents of the `Jenkinsfile` provided in this repository
3. Paste it into the **Script** text area
4. Click **Save**

---

## Step 4: Update Your Project Configuration

### 1. Add CI Script to package.json

Add this script to your `package.json`:

```json
{
  "scripts": {
    "test:ci": "playwright test --config=playwright.config.js --reporter=html"
  }
}
```

### 2. Update Playwright Config for CI

Update your `playwright.config.js` to detect CI environment:

```javascript
const config = {
  testDir: "./",
  testMatch: ["**/*.spec.js", "**/*.spec.ts"],
  retries: process.env.CI ? 2 : 0,  // Retry failed tests in CI
  timeout: 30000,
  reporter: process.env.CI ? [['html'], ['list']] : [['list'], ['./reporter.js']],
  use: {
    baseURL: "https://automationexercise.com",
    headless: true,  // Always run headless in CI
    viewport: { width: 1280, height: 720 },
    video: process.env.CI ? 'retain-on-failure' : 'on',
    screenshot: 'only-on-failure',
    trace: process.env.CI ? 'retain-on-failure' : 'on',
  },
  projects: [
    {
      name: "Chrome",
      use: { browserName: "chromium" },
    },
  ],
};

module.exports = config;
```

---

## Step 5: Running Your First Build

### Manual Build:
1. Go to your pipeline job (`Playwright-Tests`)
2. Click **Build Now**
3. Watch the build progress in the **Build History**
4. Click on the build number (e.g., #1) to see details
5. Click **Console Output** to see detailed logs

### What Happens During Build:
1. **Checkout**: Jenkins clones your Git repository
2. **Install Dependencies**: Runs `npm ci` to install packages
3. **Install Browsers**: Playwright installs required browsers
4. **Run Tests**: Executes your Playwright tests
5. **Generate Report**: Creates HTML test report
6. **Archive**: Saves reports and test artifacts

### View Test Results:
1. After build completes, go to the build page
2. Click **Playwright Test Report** to view detailed results
3. Check **test-results** artifacts for videos and traces

---

## Step 6: Set Up Git Webhooks (Optional but Recommended)

### For GitHub:
1. Go to your GitHub repository
2. Click **Settings** → **Webhooks** → **Add webhook**
3. **Payload URL**: `http://your-jenkins-url:8080/github-webhook/`
4. **Content type**: `application/json`
5. **Which events**: Select "Just the push event"
6. **Active**: Check this box
7. Click **Add webhook**

### For GitLab:
1. Go to your GitLab project
2. Click **Settings** → **Webhooks**
3. **URL**: `http://your-jenkins-url:8080/project/Playwright-Tests`
4. **Trigger**: Check "Push events"
5. Click **Add webhook**

---

## Project Structure Expected by Jenkins

Your project should have this structure:

```
PlaywrightTesting/
├── Jenkinsfile                    # Pipeline configuration
├── playwright.config.js           # Playwright config
├── package.json                   # Node dependencies
├── practice/                      # Test files
│   ├── addReviewOnProd.spec.js
│   └── ...other test files
├── playwright-report/             # Generated by tests (gitignored)
└── test-results/                  # Generated by tests (gitignored)
```

---

## Understanding the Pipeline Stages

### 1. Checkout Stage
- Clones your repository
- Uses the `scm` variable (automatically configured)

### 2. Install Dependencies Stage
- Runs `npm ci` (faster, more reliable than `npm install`)
- Installs Playwright browsers with `npx playwright install --with-deps`

### 3. Run Tests Stage
- Executes `npm run test:ci`
- Runs tests in headless mode
- Retries failed tests

### 4. Generate Report Stage
- Creates HTML test report
- Stores in `playwright-report` directory

### 5. Post Actions (Always Runs)
- **publishHTML**: Makes test report viewable in Jenkins
- **archiveArtifacts**: Saves videos, traces, screenshots
- **cleanWs**: Cleans workspace to save disk space

---

## Customization Options

### Run Specific Tests Only:
Modify the "Run Tests" stage:
```groovy
sh 'npx playwright test practice/login.spec.js --config=playwright.config.js'
```

### Run Tests in Parallel:
Update `playwright.config.js`:
```javascript
workers: process.env.CI ? 2 : undefined,
```

### Add Email Notifications:
Add to `post` section in Jenkinsfile:
```groovy
failure {
    emailext (
        subject: "Build Failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
        body: "Check console output at ${env.BUILD_URL}",
        to: 'your-email@example.com'
    )
}
```

### Add Slack Notifications:
1. Install **Slack Notification Plugin**
2. Configure Slack workspace in Jenkins
3. Add to `post` section:
```groovy
success {
    slackSend (color: 'good', message: "Tests Passed: ${env.JOB_NAME} #${env.BUILD_NUMBER}")
}
failure {
    slackSend (color: 'danger', message: "Tests Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}")
}
```

---

## Troubleshooting

### Common Issues:

#### 1. "npm: command not found"
**Solution**: Install NodeJS plugin and configure it in Jenkins Global Tool Configuration

#### 2. "Playwright browsers not found"
**Solution**: Ensure `npx playwright install --with-deps` is running in Install Dependencies stage

#### 3. "Permission denied"
**Solution**:
```bash
# On Linux/Mac, give Jenkins user proper permissions
sudo usermod -a -G docker jenkins  # If using Docker
sudo systemctl restart jenkins
```

#### 4. "Port 8080 already in use"
**Solution**: Change Jenkins port in configuration or stop conflicting service

#### 5. Tests fail in CI but pass locally
**Solution**:
- Check if tests depend on local files/data
- Ensure headless mode compatibility
- Increase timeouts for CI environment
- Check video/screenshots for debugging

#### 6. HTML Report not showing
**Solution**:
- Install HTML Publisher Plugin
- Check `playwright-report` directory exists
- Verify report path in publishHTML configuration

### Debug Tips:

1. **Check Console Output**: Always review full console output
2. **Archive Artifacts**: Enable artifact archiving to see screenshots/videos
3. **Enable Trace**: Set `trace: 'on'` in CI to debug failures
4. **Increase Verbosity**: Use `DEBUG=pw:api` environment variable

---

## Best Practices

1. **Use npm ci instead of npm install** - Faster and more reliable in CI
2. **Always run headless in CI** - GUI not needed, saves resources
3. **Retry failed tests** - Network/timing issues are common in CI
4. **Archive only on failure** - Saves disk space
5. **Clean workspace** - Prevents disk space issues
6. **Use webhooks** - Faster than polling
7. **Run tests in parallel** - Faster execution
8. **Set appropriate timeouts** - CI environments can be slower

---

## Next Steps

1. ✅ Set up Jenkins and create pipeline
2. ✅ Push Jenkinsfile to your repository
3. ✅ Configure webhook for automatic builds
4. ✅ Run your first build
5. 📧 Set up notifications (email/Slack)
6. 📊 Create dashboard for test metrics
7. 🔄 Add more test environments (staging, production)
8. 🐳 Consider using Docker for consistent environments

---

## Additional Resources

- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Playwright CI Guide](https://playwright.dev/docs/ci)
- [Jenkins Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [HTML Publisher Plugin](https://plugins.jenkins.io/htmlpublisher/)

---

## Support

If you encounter issues:
1. Check Jenkins console output
2. Review Playwright documentation
3. Check this repository's issues section
4. Jenkins community forums

Good luck with your CI/CD pipeline! 🚀
