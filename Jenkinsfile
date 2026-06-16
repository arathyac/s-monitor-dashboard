pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Code checked out from GitHub'
            }
        }

        stage('Build') {
            steps {
                echo 'Building Server Monitoring Dashboard'
                sh 'ls -la'
            }
        }

        stage('Test') {
            steps {
                echo 'Checking required project files'
                sh 'test -f app.py'
                sh 'test -f templates/index.html'
                sh 'test -f static/style.css'
                sh 'test -f static/script.js'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying latest dashboard'
                sh '''
                    sudo fuser -k 5000/tcp || true
                    nohup python3 app.py > app.log 2>&1 &
                    sudo systemctl reload nginx
                '''
            }
        }
    }

    post {
        success {
            emailext(
                to: 'arathyac2004@gmail.com',
                subject: 'SUCCESS: Server Monitoring Dashboard Deployment',
                body: 'The latest deployment was successful.'
            )
        }

        failure {
            emailext(
                to: 'arathyac2004@gmail.com',
                subject: 'FAILED: Server Monitoring Dashboard Deployment',
                body: 'The latest deployment failed. Please check Jenkins console output.'
            )
        }
    }
}
