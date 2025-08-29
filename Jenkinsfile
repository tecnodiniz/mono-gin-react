pipeline {
  agent any

    environment {
      // Define a credencial do GitHub para todos os stages
      GITHUB_CREDENTIALS = credentials('github-pat')
    }

  stages {
    stage('SCM') {
      steps {
        githubNotify context: 'ci/jenkins/scm', status: 'PENDING', description: 'Checkout'
        checkout scm
        echo "Branch atual: ${env.GIT_BRANCH ?: env.BRANCH_NAME}"
        githubNotify context: 'ci/jenkins/scm', status: 'SUCCESS', description: 'Checkout ok'
      }
    }

    stage('Frontend Test') {
      tools {nodejs "Node24"}
      steps {
        githubNotify context: 'ci/jenkins/tests', status: 'PENDING', description: 'Rodando testes'
        dir('frontend') {
          sh 'npm ci'
          sh 'npm run test:coverage'
        }
        githubNotify context: 'ci/jenkins/tests', status: 'SUCCESS', description: 'Testes ok'
      }
    }

    stage('SonarQube Analysis') {
      steps {
        script {
          def scannerHome = tool 'SonarScanner'
          withSonarQubeEnv() {
            dir('frontend') {
              def prArgs = ''
              if(env.CHANGE_ID){
                prArgs = "-Dsonar.pullrequest.key=${env.CHANGE_ID}" +
                         "-Dsonar.pullrequest.branch=${env.CHANGE_BRANCH}" +
                         "-Dsonar.pullrequest.base=${env.CHANGE_TARGET}"
              }
              sh "${scannerHome}/bin/sonar-scanner ${prArgs}"
            }
          }
        }
      }
    }

  }

  post {
    success {
      githubNotify context: 'ci/jenkins/pipeline', status: 'SUCCESS', description: 'Pipeline succeeded'
    }
    failure {
      githubNotify context: 'ci/jenkins/pipeline', status: 'FAILURE', description: 'Pipeline failed'
    }
  }
}

def notifyGitHub(String context, String status, String description) {
    githubNotify(
        context: context,
        status: status,
        description: description,
        accessTokenVariable: 'GITHUB_CREDENTIALS'
    )
}
