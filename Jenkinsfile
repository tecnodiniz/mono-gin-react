node {
  stage('SCM') {
    checkout scm
    script {
    echo "Branch atual: ${env.GIT_BRANCH ?: env.BRANCH_NAME}"
    }
  }

  stage('Frontend Test'){
    steps{
      dir('frontend'){
        sh 'npm ci'
        sh 'npm run test:coverage'
      }
    }
  }
  stage('SonarQube Analysis') {
    def scannerHome = tool 'SonarScanner';
    withSonarQubeEnv() {
      dir('frontend'){
      sh "${scannerHome}/bin/sonar-scanner"
      }
    }
  }
}