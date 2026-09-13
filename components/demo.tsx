"use client";

import { useState } from "react";
import { Arrow, Calendar, Check } from "./icons";
import { track } from "@/lib/analytics";

const slots = [
  { id: 1, day: "พฤ. 19 ก.ย.", time: "17:00–18:00", teacher: "ครูมิน", seats: 2 },
  { id: 2, day: "ส. 21 ก.ย.", time: "10:00–11:00", teacher: "ครูปั้น", seats: 1 },
  { id: 3, day: "อา. 22 ก.ย.", time: "13:30–14:30", teacher: "ครูมิน", seats: 3 }
];

export function BookingDemo() {
  const [selected, setSelected] = useState<number | null>(null);
  const [booked, setBooked] = useState<number | null>(null);
  const active = slots.find((s) => s.id === (booked ?? selected));

  return (
    <div className="overflow-hidden rounded-[28px] border border-[#dce9e1] bg-white soft-shadow">
      <div className="flex items-center justify-between border-b border-[#e6eee9] bg-[#f4faf6] px-5 py-4">
        <div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#638277]">ตัวอย่างสำหรับผู้ปกครอง</p><p className="mt-1 font-bold">โรงเรียนดนตรีบ้านโน้ต</p></div>
        <span className="rounded-full bg-[#dff5e9] px-3 py-1.5 text-xs font-bold text-[#176847]">สิทธิ์คงเหลือ 2 ครั้ง</span>
      </div>
      <div className="p-5 sm:p-7">
        {booked ? (
          <div className="py-5 text-center" aria-live="polite">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#dff5e9] text-[#14714a]"><Check className="h-8 w-8" /></span>
            <h3 className="mt-5 text-2xl font-black">จองเรียบร้อยแล้ว!</h3>
            <p className="mt-2 text-sm text-[#63726d]">{active?.day} · {active?.time}<br />ระบบจะส่งรายละเอียดให้ทาง LINE</p>
            <button onClick={() => { setBooked(null); track("demo_booking_cancelled"); }} className="mt-6 rounded-full border border-[#efb8ad] px-5 py-2.5 text-sm font-bold text-[#a34735] transition hover:bg-[#fff2ef]">ยกเลิกการจอง</button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0c9] text-[#956818]"><Calendar /></span><div><h3 className="font-extrabold">เลือกรอบเรียนชดเชย</h3><p className="text-xs text-[#71807a]">วิชาเปียโน · น้องมีนา</p></div></div>
            <div className="mt-5 space-y-3">
              {slots.map((slot) => <button key={slot.id} onClick={() => { setSelected(slot.id); track("demo_slot_selected", { slot_id: slot.id }); }} className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${selected === slot.id ? "border-[#287b5c] bg-[#f0faf4] ring-2 ring-[#287b5c]/10" : "border-[#e2e9e5] hover:border-[#9fbbae]"}`}>
                <span><strong className="block text-sm">{slot.day} · {slot.time}</strong><span className="mt-1 block text-xs text-[#71807a]">{slot.teacher} · เหลือ {slot.seats} ที่</span></span>
                <span className={`h-5 w-5 rounded-full border-2 ${selected === slot.id ? "border-[6px] border-[#287b5c]" : "border-[#bdcac4]"}`} />
              </button>)}
            </div>
            <button disabled={!selected} onClick={() => { if (selected) { setBooked(selected); track("demo_booking_confirmed", { slot_id: selected }); } }} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#183f33] px-5 py-3.5 font-bold text-white transition hover:bg-[#245e4c] disabled:cursor-not-allowed disabled:opacity-35">ยืนยันการจอง <Arrow className="h-5 w-5" /></button>
          </>
        )}
      </div>
    </div>
  );
}
