pipeline {
  // ระบุ agent ที่ใช้รัน pipeline (สามารถระบุ node label เฉพาะได้ถ้าต้องการ)
  agent any

  // กำหนด environment variables (ถ้ามี)
  environment {
     NETLIFY_SITE_ID = 'df186cfc-0fd4-4ec3-8aa7-14521a0bad15'
     NETLIFY_AUTH_TOKEN = credentials('netlify-token')
  }

  stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                echo "🔧 Checking required files..."
                sh '''
                    test -f index.html || (echo "❌ Missing public/index.html" && exit 1)
                    test -f functions/randomNCT127.js || (echo "❌ Missing functions/randomNCT127.js" && exit 1)
                    echo "✅ Build check passed."
                '''
            }
        }

        stage('Test') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                echo "🧪 Testing function syntax..."
                sh '''
                    node -e "require('./functions/randomNCT127.js'); console.log('✅ Function loaded successfully')"
                '''
            }
        }

        stage('Deploy') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                echo "🚀 Deploying to Netlify..."
                sh '''
                    npm install netlify-cli
                    node_modules/.bin/netlify deploy \
                      --auth=$NETLIFY_AUTH_TOKEN \
                      --site=$NETLIFY_SITE_ID \
                      --dir=. \
                      --functions=functions \
                      --prod
                '''
            }
        }

        stage('Post Deploy') {
            steps {
                echo "✅ Deployment complete! Your app is live."
            }
        }
    }

    post {
        success {
            echo "🎉 CI/CD pipeline finished successfully."
        }
        failure {
            echo "❌ Pipeline failed. Check logs for details."
        }
    }
}
