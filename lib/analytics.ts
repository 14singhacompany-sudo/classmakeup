export type AnalyticsEvent = "demo_slot_selected" | "demo_booking_confirmed" | "demo_booking_cancelled" | "lead_form_started" | "lead_submitted" | "lead_submit_failed" | "line_add_clicked";

declare global {
  interface Window { dataLayer?: Array<Record<string, unknown>>; }
}

export function track(event: AnalyticsEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
}
