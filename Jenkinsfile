pipeline{
    agent any
    tools{
        jdk 'jdk-17'
        nodejs 'node-23'
    }
    environment {
        SCANNER_HOME=tool 'sonar-scanner'
    }
    stages {
        stage('Clean Workspace'){
            steps{
                cleanWs()
            }
        }
        stage('Checkout from Git'){
            steps{
                git branch: 'main', url: 'https://github.com/trane7776/trane-hub.git'
            }
        }
        
        // Фронтенд анализ и тесты
        stage("Frontend SonarQube Analysis"){
            steps{
                dir('frontend-trane-hub') {
                    withSonarQubeEnv('sonar-server') {
                        sh '''
                        $SCANNER_HOME/bin/sonar-scanner \
                        -Dsonar.projectName=TraneHubFrontend \
                        -Dsonar.projectKey=TraneHubFrontend \
                        -Dsonar.sources=src
                        '''
                    }
                }
            }
        }
        
        // Бэкенд анализ и тесты
        stage("Backend SonarQube Analysis"){
            steps{
                dir('backend-trane-hub') {
                    withSonarQubeEnv('sonar-server') {
                        sh '''
                        $SCANNER_HOME/bin/sonar-scanner \
                        -Dsonar.projectName=TraneHubBackend \
                        -Dsonar.projectKey=TraneHubBackend \
                        -Dsonar.sources=src
                        '''
                    }
                }
            }
        }
        
        stage("Quality Gate"){
           steps {
                script {
                    waitForQualityGate abortPipeline: false, credentialsId: 'Sonar-token' 
                }
            } 
        }
        
        stage('Install Dependencies Frontend') {
            steps {
                dir('frontend-trane-hub') {
                    sh "npm install"
                }
            }
        }
        
        stage('Install Dependencies Backend') {
            steps {
                dir('backend-trane-hub') {
                    sh "npm install"
                }
            }
        }
        
        stage('Frontend OWASP Scan') {
            steps {
                dir('frontend-trane-hub') {
                    dependencyCheck additionalArguments: '--scan ./ --disableYarnAudit --disableNodeAudit', odcInstallation: 'DP-Check'
                    dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
                }
            }
        }
        
        stage('Backend OWASP Scan') {
            steps {
                dir('backend-trane-hub') {
                    dependencyCheck additionalArguments: '--scan ./ --disableYarnAudit --disableNodeAudit', odcInstallation: 'DP-Check'
                    dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
                }
            }
        }
        
        stage('TRIVY FS Scan') {
            steps {
                sh "trivy fs . > trivyfs.txt"
            }
        }
        
        stage('Build and Run with Docker-Compose') {
            steps {
                sh 'docker compose down -v || true'
                sh 'docker compose build --no-cache'
                sh 'docker compose up -d'
            }
        }
        
        stage('Integration Tests') {
            steps {
                script {
                    // Ждем запуска сервисов
                    sh 'sleep 30'
                    
                    // Проверяем, что сервисы запущены
                    sh 'docker ps | grep -q frontend'
                    sh 'docker ps | grep -q backend'
                    sh 'docker ps | grep -q nginx'
                    
                }
            }
        }
        
        stage('Save Test Reports') {
            steps {
                archiveArtifacts artifacts: 'trivyfs.txt', fingerprint: true
            }
        }
    }
    
    post {
        always {
            echo 'Cleaning up...'
            sh 'docker compose logs > docker-compose-logs.txt'
        }
        success {
            echo 'Build succeeded! Application is running in Docker Compose'
        }
        failure {
            echo 'Build failed :('
            // Опционально: остановка контейнеров при ошибке
            // sh 'docker-compose down'
        }
    }
}