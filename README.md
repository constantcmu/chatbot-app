# README.md

# AI Chat Assistant

แอพพลิเคชันแชทบอทอัจฉริยะที่ใช้ Gemini API จาก Google Cloud สำหรับการประมวลผลภาษาธรรมชาติ พร้อมความสามารถในการแสดงผลสมการคณิตศาสตร์และสัญลักษณ์เคมี

## ฟีเจอร์หลัก

- 🤖 รองรับการสนทนาโต้ตอบด้วย Gemini API
- 📊 แสดงผลสมการคณิตศาสตร์ด้วย MathJax และ KaTeX
- ⚗️ รองรับการแสดงสัญลักษณ์เคมีและสูตรโมเลกุล
- 📝 แสดงผลภาษาไทยและอังกฤษได้อย่างสวยงาม
- 💾 บันทึกประวัติการสนทนา
- 📱 รองรับการแสดงผลบนทุกขนาดหน้าจอ

## เทคโนโลยีที่ใช้

- Frontend:
  - HTML5, CSS3, JavaScript
  - MathJax และ KaTeX สำหรับแสดงผลสมการ
  - CSS Grid และ Flexbox สำหรับ Layout
  - CSS Custom Properties สำหรับธีม

- Backend:
  - Google Cloud Gemini API
  - Node.js (เฉพาะการพัฒนา)

## โครงสร้างโปรเจค

```
chatbot-app
├── backend
│   ├── app.py                # Main entry point for the backend application
│   ├── requirements.txt      # Lists dependencies for the backend
│   └── .env                  # Contains environment variables (API keys)
├── frontend
│   ├── index.html            # Main HTML file for the frontend
│   ├── css
│   │   ├── style.css         # Main styles for the frontend
│   │   └── responsive.css     # Responsive styles for different screen sizes
│   ├── js
│   │   ├── app.js            # Main JavaScript logic for the frontend
│   │   ├── chat.js           # Manages chatbot functionality
│   │   └── sidebar.js        # Handles sidebar functionality
│   └── assets
│       └── icons             # Directory for icon files
├── README.md                 # Documentation for the project
└── .gitignore                # Specifies files to be ignored by Git
```

## คำแนะนำในการตั้งค่า

1. โคลน repository:
   ```
   git clone <repository-url>
   cd chatbot-app
   ```

2. ตั้งค่า backend:
   - ไปที่ไดเรกทอรี `backend`
   - ติดตั้ง dependencies ที่ต้องการ:
     ```
     pip install -r requirements.txt
     ```
   - สร้างไฟล์ `.env` และเพิ่ม OpenAI API key ของคุณ:
     ```
     OPENAI_API_KEY=your_api_key_here
     ```

3. รัน backend server:
   ```
   python app.py
   ```

4. ตั้งค่า frontend:
   - เปิด `index.html` ในเว็บเบราว์เซอร์ของคุณเพื่อดูแอพพลิเคชั่น

## การใช้งาน

- อินเตอร์เฟซแชทบอทช่วยให้ผู้ใช้สามารถโต้ตอบกับแชทบอทที่ขับเคลื่อนโดย Gemini API
- หน้าเว็บรองรับการแสดงผลบนอุปกรณ์ทุกขนาดหน้าจอ

## หมายเหตุ

โปรเจคนี้เป็นส่วนหนึ่งของการเรียนรู้และพัฒนาทักษะการเขียนโปรแกรม ไม่ได้มีการกำหนดใบอนุญาตการใช้งานใดๆ