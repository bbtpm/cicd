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
        echo "🔍 ตรวจสอบไฟล์ที่จำเป็นสำหรับการ build..."
        sh '''
          test -f index.html || (echo "🚫 ไม่พบไฟล์ public/index.html!" && exit 1)
          echo "✅ พร้อมสำหรับขั้นตอน build แล้ว"
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
        echo "🧹 กำลังตรวจสอบ syntax ของฟังก์ชัน..."
        sh '''
          node -e "require('./functions/randomNCT127.js'); console.log('📦 โหลดฟังก์ชันได้สำเร็จ')"
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
        echo "📤 เริ่มต้น Deploy โปรเจกต์ไปยัง Netlify..."
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
        echo "🌐 Deploy เสร็จเรียบร้อย! เว็บไซต์ของคุณออนไลน์แล้ว"
      }
    }
  }

  post {
    success {
      echo "✅ Pipeline ทำงานครบทุกขั้นตอนเรียบร้อยแล้ว!"
    }
    failure {
      echo "⚠️ เกิดข้อผิดพลาดใน pipeline กรุณาตรวจสอบ log"
    }
  }
}
