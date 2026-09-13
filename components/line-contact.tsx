"use client";

import { track } from "@/lib/analytics";

const lineUrl = "https://lin.ee/qiBgi1v";

export function LineContact() {
  return (
    <a
      href={lineUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("line_add_clicked", { location: "floating_button" })}
      aria-label="คุยกับทีม ClassMakeup ทาง LINE"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-[#06c755] px-4 py-3 font-extrabold text-white shadow-[0_10px_30px_rgba(6,199,85,.3)] transition hover:-translate-y-0.5 hover:bg-[#05b54d] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#06c755]/30 sm:bottom-6 sm:right-6 sm:px-5"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[10px] font-black tracking-[-.06em] text-[#06c755]" aria-hidden="true">LINE</span>
      <span className="text-sm">คุยกับเรา</span>
    </a>
  );
}
