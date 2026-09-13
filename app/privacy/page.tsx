import Link from "next/link";

export default function PrivacyPage() {
  return <main className="mx-auto min-h-screen max-w-3xl px-5 py-12 sm:py-20">
    <Link href="/" className="text-sm font-bold text-[#287b5c]">← กลับหน้า ClassMakeup</Link>
    <h1 className="mt-8 text-3xl font-black text-[#173c31] sm:text-5xl">นโยบายความเป็นส่วนตัว</h1>
    <p className="mt-4 text-sm text-[#71807a]">ปรับปรุงล่าสุด: 13 กันยายน 2569</p>
    <div className="mt-10 space-y-8 text-sm leading-7 text-[#50615a]">
      <section><h2 className="text-lg font-black text-[#243f36]">ข้อมูลที่เราเก็บ</h2><p className="mt-2">เมื่อคุณลงทะเบียน Early Access เราเก็บชื่อสถาบัน ประเภทและขนาดสถาบัน จำนวนคำขอเรียนชดเชย อีเมล เบอร์โทรศัพท์ ความสนใจต่อราคา และข้อมูลแหล่งที่มาของหน้าเว็บ เช่น UTM campaign</p></section>
      <section><h2 className="text-lg font-black text-[#243f36]">วัตถุประสงค์</h2><p className="mt-2">เราใช้ข้อมูลเพื่อติดต่อเกี่ยวกับการทดลอง ClassMakeup ประเมินความต้องการของตลาด และปรับปรุงผลิตภัณฑ์เท่านั้น เราไม่ขายข้อมูลส่วนบุคคลให้บุคคลอื่น</p></section>
      <section><h2 className="text-lg font-black text-[#243f36]">การจัดเก็บและการเข้าถึง</h2><p className="mt-2">ข้อมูล Early Access จัดเก็บใน Google Sheets ที่จำกัดการเข้าถึงเฉพาะทีมผู้ดูแล อาจมีผู้ให้บริการโครงสร้างพื้นฐานที่ประมวลผลข้อมูลตามความจำเป็นในการให้บริการ</p></section>
      <section><h2 className="text-lg font-black text-[#243f36]">ระยะเวลาและสิทธิ์ของคุณ</h2><p className="mt-2">เราเก็บข้อมูลเท่าที่จำเป็นต่อการทดสอบผลิตภัณฑ์ คุณสามารถขอเข้าถึง แก้ไข ถอนความยินยอม หรือลบข้อมูลได้ผ่านช่องทางติดต่อที่ประกาศบนเว็บไซต์ก่อนเปิดรับโฆษณาจริง</p></section>
      <aside className="rounded-2xl bg-[#fff3d8] p-5 text-[#684f1d]"><strong>ก่อนเปิดรับข้อมูลจริง:</strong> ผู้ดำเนินการต้องเพิ่มชื่อผู้ควบคุมข้อมูลและช่องทางติดต่อที่ใช้งานได้ในหน้านี้</aside>
    </div>
  </main>;
}
