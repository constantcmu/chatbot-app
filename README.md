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
│   ├── app.py                # จุดเริ่มต้นหลักสำหรับแอปพลิเคชัน backend
│   ├── requirements.txt      # รายการ dependencies สำหรับ backend
│   └── .env                  # ไฟล์ที่เก็บ environment variables (API keys)
├── frontend
│   ├── index.html            # ไฟล์ HTML หลักสำหรับ frontend
│   ├── css
│   │   ├── style.css         # สไตล์หลักสำหรับ frontend
│   │   └── responsive.css    # สไตล์ responsive สำหรับขนาดหน้าจอต่างๆ
│   ├── js
│   │   ├── app.js            # JavaScript หลักสำหรับ frontend
│   │   ├── chat.js           # จัดการฟังก์ชันการทำงานของแชทบอท
│   │   └── sidebar.js        # จัดการฟังก์ชันการทำงานของ sidebar
│   └── assets
│       └── icons             # ไดเรกทอรีสำหรับไฟล์ไอคอน
├── README.md                 # เอกสารสำหรับโปรเจค
└── .gitignore                # ระบุไฟล์ที่ต้องการให้ Git มองข้าม
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