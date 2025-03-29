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
        echo "🔍 ตรวจสอบว่า index.html อยู่ในโปรเจกต์..."
        sh '''
          test -f index.html || (echo "🚫 ไม่พบไฟล์ index.html!" && exit 1)
          echo "✅ พร้อมเข้าสู่ขั้นตอนถัดไป"
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
        echo "🧪 เริ่มต้นการทดสอบเนื้อหา index.html..."
        sh '''
          TITLE=$(grep -o '<title>.*</title>' index.html | sed -e 's/<\\/?title>//g')
          if [ -z "$TITLE" ]; then
            echo "❌ ไม่พบ <title> ใน index.html หรือค่าว่าง"
            exit 1
          fi
          echo "✅ พบ title: $TITLE"
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
        echo "🚀 Deploy เว็บของคุณไปยัง Netlify..."
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
        echo "🌐 Deploy เสร็จสมบูรณ์! เว็บไซต์ของคุณออนไลน์แล้ว 🎉"
      }
    }
  }

  post {
    success {
      echo "✅ Pipeline ทำงานครบทุกขั้นตอนอย่างราบรื่น!"
    }
    failure {
      echo "⚠️ เกิดข้อผิดพลาดใน pipeline กรุณาตรวจสอบ log"
    }
  }
}