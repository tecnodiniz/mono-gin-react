pipeline {
  agent any

  stages {
    stage('SCM') {
      steps {
        checkout scm
        echo "Branch atual: ${env.GIT_BRANCH ?: env.BRANCH_NAME}"
      }
    }

    stage('Frontend Test') {
      tools {nodejs: "Node24"}
      steps {
        dir('frontend') {
          sh 'npm ci'
          sh 'npm run test:coverage'
        }
      }
    }

    stage('SonarQube Analysis') {
      steps {
        script {
          def scannerHome = tool 'SonarScanner'
          withSonarQubeEnv() {
            dir('frontend') {
              sh "${scannerHome}/bin/sonar-scanner"
            }
          }
        }
      }
    }
  }
}
