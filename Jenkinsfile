pipeline {
    agent any
    
    tools {
        nodejs 'Node 18'
    }

    environment {
        // Define environment variables
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout code from repository
                echo 'Checking out code...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                // Install Node.js dependencies
                sh 'npm ci'

                // Install Playwright browsers
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running Playwright tests...'
                // Run tests with specific configuration
                sh 'npm run test:ci'
            }
        }

        stage('Generate Report') {
            steps {
                echo 'Generating test report...'
                // Generate HTML report
                sh 'npx playwright show-report --host 0.0.0.0 || true'
            }
        }
    }

    post {
        always {
            // Archive test results and reports
            echo 'Archiving test results...'

            // Archive Playwright HTML report
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report',
                reportTitles: 'Playwright Test Report'
            ])

            // Archive test videos and traces if they exist
            archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true

            // Clean workspace
            cleanWs()
        }

        success {
            echo 'Pipeline succeeded! All tests passed.'
        }

        failure {
            echo 'Pipeline failed! Check test results for details.'
            // You can add notification steps here (email, Slack, etc.)
        }
    }
}
