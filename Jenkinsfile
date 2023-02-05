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
            sh "mkdir -p ${pwd()}/e2e/.npm"
            sh "mkdir -p ${pwd()}/e2e/.cypress/cache"
            sh "mkdir -p ${pwd()}/e2e/cypress/reports"
            sh "wget https://github.com/cucumber/json-formatter/releases/download/v19.0.0/cucumber-json-formatter-linux-amd64"
            sh "chmod +x cucumber-json-formatter-linux-amd64"

            withDockerContainer(image: "cypress/base:16.13.0", args: "-v ${pwd()}/e2e/.npm:/.npm -v ${pwd()}/e2e/.cypress:/.cypress -e CYPRESS_CACHE_FOLDER=/.cypress/cache") {
                dir('e2e') {
                    sh "npm install"
                }
            }

            try {
                sh "docker run --rm --network host -w /workspace/e2e -v ${pwd()}/cucumber-json-formatter-linux-amd64:/usr/bin/cucumber-json-formatter -v ${pwd()}/e2e/.npm:/.npm -v ${pwd()}:/workspace:rw,z -v ${pwd()}@tmp:/workspace@tmp:rw,z -v ${pwd()}/e2e/.cypress:/.cypress -e CYPRESS_CACHE_FOLDER=/.cypress/cache -e CYPRESS_BASE_URL=https://geneaplanner-dev.surge.sh cypress/included:12.5.1 --e2e --browser chrome --spec **/*.feature --record --key 40e62d58-9151-42d7-b625-5d2482bc7f37"
            } catch (erreur) {
                throw erreur
            } finally {
                sh "docker run --rm -w /workspace/e2e -v ${pwd()}/e2e/.npm:/.npm -v ${pwd()}:/workspace:rw,z -v ${pwd()}@tmp:/workspace@tmp:rw,z cypress/base:16.18.1 node cucumber-html-reporter.js"
                archiveArtifacts artifacts: 'e2e/cypress/screenshots/**/*, e2e/cypress/reports/index.html, e2e/cypress/videos/**/*', allowEmptyArchive: true
            }
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
                mail body: "${env.BUILD_URL}/console",
                    subject: '[Geneaplanner] BUILD FAILED',
                    to: 'dubois.vct@free.fr'
            }
        }
    }
}
