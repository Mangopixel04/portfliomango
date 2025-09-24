declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
  }
}

export function initGA() {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  
  if (!measurementId) {
    console.warn('Google Analytics measurement ID not found');
    return;
  }

  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.gtag = window.gtag || function() {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId);
}

export function trackEvent(eventAction: string, eventCategory: string, eventLabel?: string, value?: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventAction, {
      event_category: eventCategory,
      event_label: eventLabel,
      value: value,
    });
  }
}

export function trackPageView(path: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
      page_path: path,
    });
  }
}