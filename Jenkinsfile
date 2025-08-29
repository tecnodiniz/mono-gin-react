pipeline {
    agent any

    environment {
        GITHUB_CREDENTIALS = credentials('github-pat')
    }

    stages {
        stage('SCM') {
            steps {
                script {
                    notifyGitHub('ci/jenkins/scm', 'PENDING', "Checkout branch ${env.BRANCH_NAME}")
                }
                checkout scm
                echo "Branch atual: ${env.BRANCH_NAME}, PR: ${env.CHANGE_ID ?: 'nenhum'}"
                script {
                    notifyGitHub('ci/jenkins/scm', 'SUCCESS', "Checkout ok branch ${env.BRANCH_NAME}")
                }
            }
        }

        stage('Frontend Test') {
            when {
                anyOf {
                    branch 'main'
                    changeRequest() // só executa para PRs
                }
            }
            tools { nodejs "Node24" }
            steps {
                script {
                    notifyGitHub('ci/jenkins/tests', 'PENDING', "Rodando testes branch ${env.BRANCH_NAME}")
                }
                dir('frontend') {
                    sh 'npm ci'
                    sh 'npm run test:coverage'
                }
                script {
                    notifyGitHub('ci/jenkins/tests', 'SUCCESS', "Testes ok branch ${env.BRANCH_NAME}")
                }
            }
        }

        stage('SonarQube Analysis') {
            when {
                anyOf {
                    branch 'main'
                    changeRequest()
                }
            }
            steps {
                script {
                    def scannerHome = tool 'SonarScanner'
                    withSonarQubeEnv() {
                        dir('frontend') {
                            def prArgs = ''
                            if(env.CHANGE_ID){
                                prArgs = "-Dsonar.pullrequest.key=${env.CHANGE_ID} " +
                                         "-Dsonar.pullrequest.branch=${env.CHANGE_BRANCH} " +
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
