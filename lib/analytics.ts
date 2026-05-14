export const GA_TRACKING_ID = "G-84J9SX1W3V";

export const trackEvent = (
  action: string,
  category: string,
  label: string
) => {
  if (
    typeof window !== "undefined" &&
    typeof window.gtag === "function"
  ) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
    });
  }
};