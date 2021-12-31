declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

function sendParkClick(parkId: string) {
  window.gtag('event', 'click_park', {
    park_id: parkId,
  });
}

function sendLogin(userEmail: string) {
  window.gtag('event', 'login', {
    user_email: userEmail,
  });
}

function sendParkTypeHide(parkType: string) {
  window.gtag('event', 'hide_park_type', {
    park_type: parkType,
  });
}

function sendParkTypeShow(parkType: string) {
  window.gtag('event', 'show_park_type', {
    park_type: parkType,
  });
}

function sendCheckAll() {
  window.gtag('event', 'check_all_filters');
}

function sendUncheckAll() {
  window.gtag('event', 'uncheck_all_filters');
}

function sendSearch(parkName: string) {
  window.gtag('event', 'search_park', {
    park_name: parkName,
  });
}

interface Props {
  sendParkClick: (code: string) => void;
  sendLogin: (email: string) => void;
  sendParkTypeHide: (type: string) => void;
  sendParkTypeShow: (type: string) => void;
  sendCheckAll: () => void;
  sendUncheckAll: () => void;
  sendSearch: (parkName: string) => void;
}

function useAnalytics(): Props {
  return {
    sendParkClick,
    sendLogin,
    sendParkTypeHide,
    sendParkTypeShow,
    sendCheckAll,
    sendUncheckAll,
    sendSearch,
  };
}

export default useAnalytics;
