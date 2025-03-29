pipeline {
  agent any

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
        echo "🔍 กำลังตรวจสอบว่า index.html อยู่ในโปรเจกต์..."
        sh '''
          test -f index.html || (echo "🚫 ไม่พบไฟล์ index.html!" && exit 1)
          echo "✅ พบไฟล์ index.html แล้ว พร้อมสำหรับขั้นตอนถัดไป"
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
        echo "🚀 กำลัง deploy เว็บของคุณไปยัง Netlify..."
        sh '''
          npm ci || npm install
          npx netlify deploy \
            --auth=$NETLIFY_AUTH_TOKEN \
            --site=$NETLIFY_SITE_ID \
            --dir=. \
            --prod
        '''
      }
    }

    stage('Post Deploy') {
      steps {
        echo "🌐 Deploy เสร็จสมบูรณ์! เว็บออนไลน์เรียบร้อยแล้ว 🎉"
      }
    }
  }

  post {
    success {
      echo "✅ Pipeline ทำงานเสร็จสมบูรณ์!"
    }
    failure {
      echo "⚠️ มีข้อผิดพลาดใน pipeline กรุณาตรวจสอบ log"
    }
  }
}
