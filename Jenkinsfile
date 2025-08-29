pipeline {
  agent any

  parameters {
      string(name: 'BRANCH_NAME', defaultValue: 'main', description: 'Branch para build')
  }
  environment {
    GITHUB_CREDENTIALS = credentials('github-pat')
  }

    stages {
        stage('SCM') {
            steps {
                script {
                    notifyGitHub('ci/jenkins/scm', 'PENDING', "Checkout branch ${params.BRANCH_NAME}")
                }
                def branchToBuild = params.BRANCH_NAME ?: env.GIT_BRANCH ?: env.CHANGE_BRANCH
                checkout([$class: 'GitSCM',
                    branches: [[name: "*/${branchToBuild}"]],
                    userRemoteConfigs: [[
                        url: 'https://github.com/tecnodiniz/mono-gin-react',
                        credentialsId: 'github-pat'
                    ]]
                ])
                echo "Branch atual: ${branchToBuild}"
                script {
                    notifyGitHub('ci/jenkins/scm', 'SUCCESS', "Checkout ok branch ${params.BRANCH_NAME}")
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
