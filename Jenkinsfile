node('slave') {
    stage('checkout') {
        checkout scm
    }
    stage('build') {
        nodejs(nodeJSInstallationName: 'node-16') {
            dir('backend') {
                sh 'npm install'
                sh 'npm test'
            }
            dir('frontend') {
                sh 'npm install'
                sh 'npm run build'
            }
        }
    }
    stage('deploy-dev') {
        nodejs(nodeJSInstallationName: 'node-16') {
            dir ('backend') {
                sh 'npm run deploy-dev'
            }
            dir('frontend') {
                sh 'npm run deploy-dev'
            }
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
    stage('notification') {
        step([$class: 'Mailer',
          notifyEveryUnstableBuild: true,
          recipients: emailextrecipients([culprits(), requestor()])])
    }
}
