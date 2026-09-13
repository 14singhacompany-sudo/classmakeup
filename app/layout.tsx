import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClassMakeup — จัดคลาสชดเชยให้จบในลิงก์เดียว",
  description: "ให้ผู้ปกครองดูรอบว่างและจองคลาสชดเชยเอง ลดงานแชตของสถาบัน"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="th"><body>{children}</body></html>;
}
