# ClassMakeup

MVP ระบบจัดคลาสเรียนชดเชยสำหรับสถาบันดนตรี กีฬา ศิลปะ ภาษา และกวดวิชา สร้างด้วย Next.js, TypeScript และ Tailwind CSS

## ฟีเจอร์

- Landing page ภาษาไทยแบบ mobile-first
- Interactive demo: ดูสิทธิ์ เลือกรอบ ยืนยัน และยกเลิกการจอง
- แบบฟอร์ม Early Access สำหรับทดสอบความสนใจแพ็กเกจ 590 บาท/เดือน
- เก็บ lead ลง Google Sheets ผ่าน Google Apps Script webhook พร้อม UTM attribution
- หน้า Privacy Policy และ conversion events ผ่าน `window.dataLayer`

## วิธีรัน

ต้องใช้ Node.js 18.17 ขึ้นไป (แนะนำ Node.js 20 LTS)

```bash
npm install
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000)

## เชื่อม Google Sheets

1. เปิดชีต `ClassMakeup Early Access Leads` และคัดลอก Spreadsheet ID จาก URL
2. สร้าง Google Apps Script ใหม่ วางโค้ดจาก `google-apps-script/Code.gs`
3. ใน **Project Settings → Script Properties** เพิ่ม `SPREADSHEET_ID` และ `WEBHOOK_SECRET`
4. Deploy เป็น Web app โดย Execute as: **Me** และ Who has access: **Anyone**
5. คัดลอก Web app URL และสร้าง `.env.local` จาก `.env.example`
6. ใช้ secret เดียวกันใน Apps Script และ `.env.local` แล้ว restart dev server

ฟอร์มจะส่งผ่าน `/api/leads` เพื่อไม่เปิดเผย secret ใน browser ก่อนยิงแอดจริงให้ลบแถวตัวอย่างในชีต เพิ่มชื่อผู้ควบคุมข้อมูล/ช่องทางติดต่อในหน้า Privacy และทดสอบ submission หนึ่งครั้ง

## ตรวจสอบก่อนส่งงาน

```bash
npm run typecheck
npm run lint
npm run build
```

## Deploy บน Vercel

1. นำ repository ขึ้น Git provider ที่รองรับ
2. เข้า Vercel และเลือก **Add New Project**
3. Import repository นี้ โดย Framework Preset จะถูกตรวจเป็น Next.js อัตโนมัติ
4. ใช้ Build Command `npm run build` และ Output ตามค่าเริ่มต้นของ Next.js
5. กด Deploy และตรวจหน้า production อีกครั้ง

โปรเจกต์นี้ยังไม่มี backend การ deploy รุ่นทดสอบจึงไม่ต้องตั้ง environment variables หากนำไปใช้งานจริง ควรเพิ่มระบบจัดเก็บข้อมูล การยืนยันตัวตน นโยบายความเป็นส่วนตัว และการรักษาความปลอดภัยก่อน
