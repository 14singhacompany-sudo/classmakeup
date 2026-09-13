import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;
const base = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
export const Check = (p: IconProps) => <svg {...base} {...p}><path d="m5 12 4 4L19 6"/></svg>;
export const Arrow = (p: IconProps) => <svg {...base} {...p}><path d="M5 12h14m-5-5 5 5-5 5"/></svg>;
export const Calendar = (p: IconProps) => <svg {...base} {...p}><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4m8-4v4M3 10h18"/></svg>;
export const LinkIcon = (p: IconProps) => <svg {...base} {...p}><path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"/></svg>;
export const Chat = (p: IconProps) => <svg {...base} {...p}><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/></svg>;
export const Sparkle = (p: IconProps) => <svg {...base} {...p}><path d="m12 3 1.4 4.1L17 9l-3.6 1.9L12 15l-1.4-4.1L7 9l3.6-1.9zM19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7z"/></svg>;
