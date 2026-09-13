import { NextResponse } from "next/server";

const allowedTypes = ["ดนตรี", "กีฬา", "ศิลปะ", "ภาษา", "กวดวิชา", "อื่น ๆ"];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.institute || !body.type || !body.size || !body.requests || !body.email || !body.phone || !body.interest || body.consent !== true) {
      return NextResponse.json({ error: "กรุณากรอกข้อมูลให้ครบ" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return NextResponse.json({ error: "รูปแบบอีเมลไม่ถูกต้อง" }, { status: 400 });
    const phone = String(body.phone).replace(/[\s()-]/g, "");
    if (!/^(?:\+66|0)\d{8,9}$/.test(phone)) return NextResponse.json({ error: "รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง" }, { status: 400 });
    if (!allowedTypes.includes(body.type)) return NextResponse.json({ error: "ประเภทสถาบันไม่ถูกต้อง" }, { status: 400 });

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
    if (!webhookUrl || !secret) return NextResponse.json({ error: "ระบบรับข้อมูลยังไม่ได้ตั้งค่า" }, { status: 503 });

    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...body, phone, contact: `Email: ${body.email} | โทร: ${phone}`, secret, submittedAt: new Date().toISOString() }),
      cache: "no-store"
    });
    const result = await upstream.json().catch(() => ({ ok: false }));
    if (!upstream.ok || !result.ok) throw new Error("Google Sheets rejected the lead");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "ส่งข้อมูลไม่สำเร็จ กรุณาลองอีกครั้ง" }, { status: 500 });
  }
}
