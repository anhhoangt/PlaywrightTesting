# Quick Start Guide: Jenkins Pipeline for Playwright Tests

This is a condensed guide to get your Jenkins CI/CD pipeline up and running quickly.

## Prerequisites Checklist
- [ ] Java 11+ installed
- [ ] Git installed
- [ ] Code in a Git repository
- [ ] Jenkins installed and running on `http://localhost:8080`

---

## 🚀 5-Minute Setup

### Step 1: Install Jenkins Plugins (2 minutes)
1. Go to **Manage Jenkins** → **Manage Plugins** → **Available**
2. Search and install:
   - NodeJS Plugin
   - HTML Publisher Plugin
3. Click **Install without restart**

### Step 2: Configure Node.js (1 minute)
1. **Manage Jenkins** → **Global Tool Configuration**
2. Under **NodeJS**, click **Add NodeJS**
3. Name: `Node 18`, Version: `18.x`, Check **Install automatically**
4. Click **Save**

### Step 3: Create Pipeline Job (2 minutes)
1. **New Item** → Name: `Playwright-Tests` → Select **Pipeline** → **OK**
2. Under **Pipeline**:
   - Select **Pipeline script from SCM**
   - SCM: **Git**
   - Repository URL: `your-repo-url`
   - Branch: `*/main`
   - Script Path: `Jenkinsfile`
3. Click **Save**

### Step 4: Run Build
1. Click **Build Now**
2. Wait for completion
3. View **Playwright Test Report**

✅ Done! Your pipeline is running.

---

## 📁 Required Files in Your Repository

### 1. Jenkinsfile (Already created)
```groovy
pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm run test:ci'
            }
        }
    }

    post {
        always {
            publishHTML([
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report'
            ])
        }
    }
}
```

### 2. package.json script (Already added)
```json
{
  "scripts": {
    "test:ci": "playwright test --config=playwright.config.js --reporter=html"
  }
}
```

### 3. Updated playwright.config.js (Recommended)
```javascript
const config = {
  testDir: "./",
  testMatch: ["**/*.spec.js"],
  retries: process.env.CI ? 2 : 0,
  use: {
    headless: true,
    video: process.env.CI ? 'retain-on-failure' : 'on',
  },
};
module.exports = config;
```

---

## 🔄 Trigger Options

### Option A: Manual Trigger
- Click **Build Now** in Jenkins

### Option B: On Git Push (Recommended)
In Jenkins job configuration → **Build Triggers**:
- Check **Poll SCM**
- Schedule: `H/15 * * * *` (checks every 15 min)

### Option C: Webhook (Advanced)
**GitHub:**
- Repo **Settings** → **Webhooks** → **Add webhook**
- URL: `http://your-jenkins-url:8080/github-webhook/`
- Content type: `application/json`
- Events: Push events

---

## 📊 Viewing Results

After build completes:
1. Click build number (e.g., #1)
2. Click **Playwright Test Report**
3. View test results, screenshots, and videos

---

## 🐛 Common Issues & Quick Fixes

| Issue | Fix |
|-------|-----|
| `npm: command not found` | Install NodeJS plugin and configure in Global Tool Configuration |
| `Playwright browsers not found` | Add `npx playwright install --with-deps` to Install stage |
| Tests pass locally but fail in CI | Set `headless: true` in config, increase timeouts |
| HTML report not showing | Install HTML Publisher Plugin |
| Port 8080 in use | Change Jenkins port or stop conflicting service |

---

## 🎯 Pipeline Flow

```
[Push to Git]
    ↓
[Jenkins detects change]
    ↓
[Checkout code]
    ↓
[Install dependencies + browsers]
    ↓
[Run Playwright tests]
    ↓
[Generate HTML report]
    ↓
[Archive results]
    ↓
[Send notification] ✅ or ❌
```

---

## 📝 What Gets Generated

```
workspace/
├── playwright-report/      # HTML test report
│   └── index.html
├── test-results/           # Screenshots, videos, traces
│   ├── login-chromium/
│   │   └── video.webm
│   └── ...
└── ...
```

---

## ⚡ Pro Tips

1. **Run tests in parallel**: Set `workers: 2` in playwright.config.js
2. **Only save videos on failure**: `video: 'retain-on-failure'`
3. **Use npm ci instead of npm install**: Faster and more reliable
4. **Archive only failures**: Saves disk space
5. **Set up Slack/Email notifications**: Know immediately when tests fail

---

## 🔗 Quick Links

- Full Setup Guide: `JENKINS_SETUP.md`
- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Playwright CI Docs](https://playwright.dev/docs/ci)

---

## Need Help?

1. Check **Console Output** in Jenkins build
2. Review full documentation in `JENKINS_SETUP.md`
3. Check screenshots/videos in test-results
4. Enable trace: `trace: 'on'` in config

Happy Testing! 🎉
