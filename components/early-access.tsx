"use client";

import { FormEvent, useState } from "react";
import { Check } from "./icons";
import { track } from "@/lib/analytics";
import Link from "next/link";
import Image from "next/image";

const field = "w-full rounded-xl border border-[#d8e2dc] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#9aa7a1] focus:border-[#287b5c] focus:ring-2 focus:ring-[#287b5c]/10";

export function EarlyAccessForm() {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true); setError("");
    const form = new FormData(e.currentTarget);
    const query = new URLSearchParams(window.location.search);
    const payload = {
      institute: form.get("institute"), type: form.get("type"), size: form.get("size"),
      requests: form.get("requests"), email: form.get("email"), phone: form.get("phone"), interest: form.get("interest"),
      consent: form.get("consent") === "on", utmSource: query.get("utm_source") || "",
      utmMedium: query.get("utm_medium") || "", utmCampaign: query.get("utm_campaign") || "",
      utmContent: query.get("utm_content") || "", landingUrl: window.location.href
    };
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) { const body = await response.json().catch(() => ({})); throw new Error(body.error || "ส่งข้อมูลไม่สำเร็จ"); }
      setDone(true); track("lead_submitted", { institute_type: payload.type, price_interest: payload.interest });
    } catch (err) { const message = err instanceof Error ? err.message : "ส่งข้อมูลไม่สำเร็จ กรุณาลองอีกครั้ง"; setError(message); track("lead_submit_failed"); }
    finally { setLoading(false); }
  }
  if (done) return <div className="rounded-[28px] bg-white p-6 text-center soft-shadow sm:p-8" aria-live="polite"><span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#dff5e9] text-[#14714a]"><Check className="h-8 w-8" /></span><h3 className="mt-5 text-2xl font-black">ขอบคุณที่สนใจ ClassMakeup</h3><p className="mt-2 text-sm leading-6 text-[#66756f]">เราได้รับข้อมูลแล้ว ทีมงานจะติดต่อกลับทางอีเมล<br />หากอยากคุยกับเราต่อ แอด LINE ได้เลย</p><div className="mx-auto mt-5 w-fit rounded-2xl border border-[#dfe8e3] bg-white p-3"><Image src="https://qr-official.line.me/gs/M_476gyjdx_GW.png?oat_content=qr" alt="QR Code สำหรับแอด LINE ClassMakeup" width={150} height={150} /></div><a href="https://lin.ee/qiBgi1v" target="_blank" rel="noopener noreferrer" onClick={() => track("line_add_clicked")} className="mx-auto mt-4 block max-w-xs rounded-2xl bg-[#06c755] px-5 py-3.5 font-extrabold text-white transition hover:bg-[#05b54d]">แอด LINE เพื่อคุยกับทีม</a><p className="mt-3 text-xs text-[#7b8983]">รับสิทธิ์ทดลองและนัดคุยกับทีมได้สะดวกขึ้น</p><button onClick={() => setDone(false)} className="mt-5 text-sm font-bold text-[#287b5c] underline underline-offset-4">ส่งข้อมูลอีกครั้ง</button></div>;
  return <form onSubmit={submit} onFocus={() => track("lead_form_started")} className="grid gap-4 rounded-[28px] bg-white p-5 soft-shadow sm:p-8">
    <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-bold">ชื่อสถาบัน<input required name="institute" className={`${field} mt-2`} placeholder="เช่น บ้านดนตรีสดใส" /></label><label className="text-sm font-bold">ประเภทสถาบัน<select required name="type" defaultValue="" className={`${field} mt-2`}><option value="" disabled>เลือกประเภท</option><option>ดนตรี</option><option>กีฬา</option><option>ศิลปะ</option><option>ภาษา</option><option>กวดวิชา</option><option>อื่น ๆ</option></select></label></div>
    <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-bold">จำนวนนักเรียนทั้งหมด<select required name="size" defaultValue="" className={`${field} mt-2`}><option value="" disabled>เลือกขนาด</option><option>ไม่เกิน 50 คน</option><option>51–150 คน</option><option>151–500 คน</option><option>มากกว่า 500 คน</option></select></label><label className="text-sm font-bold">คำขอชดเชยต่อเดือน<select required name="requests" defaultValue="" className={`${field} mt-2`}><option value="" disabled>เลือกจำนวนโดยประมาณ</option><option>น้อยกว่า 10 ครั้ง</option><option>10–30 ครั้ง</option><option>31–100 ครั้ง</option><option>มากกว่า 100 ครั้ง</option></select></label></div>
    <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-bold">อีเมลสำหรับติดต่อกลับ<input required type="email" name="email" autoComplete="email" className={`${field} mt-2`} placeholder="name@example.com" /></label><label className="text-sm font-bold">เบอร์โทรศัพท์<input required type="tel" name="phone" autoComplete="tel" inputMode="tel" className={`${field} mt-2`} placeholder="เช่น 0812345678" /></label></div>
    <fieldset><legend className="text-sm font-bold">ความสนใจแพ็กเกจ 590 บาท/เดือน</legend><div className="mt-2 grid gap-2 sm:grid-cols-3">{["สนใจทดลองใช้", "ขอทราบเพิ่ม", "ยังไม่แน่ใจ"].map((v) => <label key={v} className="flex cursor-pointer items-center gap-2 rounded-xl border border-[#d8e2dc] p-3 text-sm"><input required type="radio" name="interest" value={v} className="accent-[#287b5c]" />{v}</label>)}</div></fieldset>
    <label className="flex items-start gap-3 text-xs leading-5 text-[#63726d]"><input required type="checkbox" name="consent" className="mt-1 accent-[#287b5c]" /><span>ยินยอมให้ ClassMakeup เก็บและใช้ข้อมูลนี้เพื่อติดต่อเกี่ยวกับ Early Access เท่านั้น</span></label>
    {error && <p role="alert" className="rounded-xl bg-[#fff0ed] px-4 py-3 text-sm font-bold text-[#a34735]">{error}</p>}
    <button disabled={loading} type="submit" className="rounded-2xl bg-[#ef7f5d] px-5 py-3.5 font-extrabold text-white transition hover:bg-[#db6b4a] disabled:cursor-wait disabled:opacity-60">{loading ? "กำลังส่งข้อมูล…" : "ขอสิทธิ์ทดลองใช้ก่อนใคร"}</button>
    <p className="text-center text-[11px] text-[#87938e]">ข้อมูลจะถูกใช้เพื่อติดต่อเรื่อง Early Access ตาม<Link href="/privacy" className="ml-1 underline">นโยบายความเป็นส่วนตัว</Link></p>
  </form>;
}
