declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

function sendParkClick(parkId: string) {
  window.gtag('event', 'park_click', {
    event_category: 'engagement',
    event_label: parkId,
  });
}

function sendLogin(userEmail: string) {
  window.gtag('event', 'login', {
    event_label: userEmail,
  });
}

function sendParkTypeHide(parkType: string) {
  window.gtag('event', 'park_type_hide', {
    event_category: 'engagement',
    event_label: parkType,
  });
}

interface Props {
  sendParkClick: (code: string) => void;
  sendLogin: (email: string) => void;
  sendParkTypeHide: (type: string) => void;
}

function useAnalytics(): Props {
  return {
    sendParkClick,
    sendLogin,
    sendParkTypeHide,
  };
}

export default useAnalytics;
