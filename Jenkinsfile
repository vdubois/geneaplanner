node('slave') {
    try {
        stage('checkout') {
            checkout scm
        }
        stage('build') {
            nodejs(nodeJSInstallationName: 'node-16') {
                parallel(
                    backend: {
                        dir('backend') {
                            sh 'npm install'
                            sh 'npm test'
                        }
                    },
                    frontend: {
                        dir('frontend') {
                            sh 'npm install --force'
                            sh 'npm run build'
                        }
                    }
                )
            }
        }
        stage('deploy-dev') {
            nodejs(nodeJSInstallationName: 'node-16') {
                parallel(
                    backend: {
                        dir ('backend') {
                            sh 'npm run deploy-dev'
                        }
                    },
                    frontend: {
                        dir('frontend') {
                            sh 'npm run deploy-dev'
                        }
                    }
                )
            }
        }
        stage('end-to-end') {
        }
        stage('deploy-prod') {
            nodejs(nodeJSInstallationName: 'node-16') {
                dir ('backend') {
                    sh 'npm run deploy-prod'
                }
            }
        }
        currentBuild.result = 'SUCCESS'
    } catch (error) {
        echo "Erreur : ${error}"
        currentBuild.result = 'FAILURE'
    } finally {
        stage('notification') {
            if (currentBuild.result == 'FAILURE') {
                emailext body: "${currentBuild.currentResult}: Job ${env.JOB_NAME}\nAccès au job ici : ${env.BUILD_URL}",
                    subject: '[Geneaplanner] BUILD FAILED',
                    to: 'dubois.vct@free.fr'
            }
        }
    }
}
