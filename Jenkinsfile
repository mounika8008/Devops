pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                checkout scm
            }
        }

        stage('Verify Files') {
            steps {
                echo 'Checking project files...'
                sh '''
                    pwd
                    ls -la
                    echo "Checking Docker Compose file..."
                    ls -l docker-compose.yml
                '''
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Building application Docker images...'
                sh 'docker compose build'
            }
        }

        stage('Deploy Application') {
            steps {
                echo 'Stopping old application containers...'
                sh 'docker compose down || true'

                echo 'Starting application containers...'
                sh 'docker compose up -d'
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Checking running containers...'
                sh 'docker compose ps'

                echo 'Checking Docker containers...'
                sh 'docker ps'
            }
        }
    }

    post {

        success {
            echo '========================================='
            echo 'APPLICATION DEPLOYED SUCCESSFULLY'
            echo '========================================='
        }

        failure {
            echo '========================================='
            echo 'JENKINS BUILD FAILED'
            echo 'Check the Console Output for the error.'
            echo '========================================='
        }

        always {
            echo 'Pipeline execution completed.'
        }
    }
}
