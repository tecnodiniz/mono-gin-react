pipeline {
  agent any

  environment {
    GITHUB_CREDENTIALS = credentials('github-pat')
  }

  stages {
    stage('SCM') {
      steps {
        script {
          notifyGitHub('ci/jenkins/scm', 'PENDING', 'Checkout')
        }
        checkout scm
        echo "Branch atual: ${env.GIT_BRANCH ?: env.BRANCH_NAME}"
        script {
          notifyGitHub('ci/jenkins/scm', 'SUCCESS', 'Checkout ok')
        }
      }
    }

    stage('Frontend Test') {
      tools { nodejs "Node24" }
      steps {
        script {
          notifyGitHub('ci/jenkins/tests', 'PENDING', 'Rodando testes')
        }
        dir('frontend') {
          sh 'npm ci'
          sh 'npm run test:coverage'
        }
        script {
          notifyGitHub('ci/jenkins/tests', 'SUCCESS', 'Testes ok')
        }
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
      script {
        notifyGitHub('ci/jenkins/pipeline', 'SUCCESS', 'Pipeline succeeded')
      }
    }
    failure {
      script {
        notifyGitHub('ci/jenkins/pipeline', 'FAILURE', 'Pipeline failed')
      }
    }
  }
}

// Função utilitária para enviar status ao GitHub
def notifyGitHub(String context, String status, String description) {
    githubNotify(
        context: context,
        status: status,
        description: description,
        repo: 'mono-gin-react',
        sha: env.GIT_COMMIT,
        credentialsId: 'github-pat',
        account: 'tecnodiniz'
    )
}
