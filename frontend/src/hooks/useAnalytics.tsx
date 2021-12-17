declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

function sendParkClick(parkId: string) {
  window.gtag('event', 'select_content', {
    event_category: 'click',
    park_id: parkId,
  });
}

function sendLogin(userEmail: string) {
  window.gtag('event', 'login', {
    event_label: userEmail,
  });
}

function sendParkTypeHide(parkType: string) {
  window.gtag('event', 'select_content', {
    event_category: 'filter',
    toggle_filter: 'off',
    item_id: parkType,
  });
}

function sendParkTypeShow(parkType: string) {
  window.gtag('event', 'select_content', {
    event_category: 'filter',
    toggle_filter: 'on',
    item_id: parkType,
  });
}

function sendCheckAll() {
  window.gtag('event', 'select_content', {
    event_category: 'filter',
    event_label: 'check_all',
  });
}

function sendUncheckAll() {
  window.gtag('event', 'select_content', {
    event_category: 'filter',
    event_label: 'uncheck_all',
  });
}

interface Props {
  sendParkClick: (code: string) => void;
  sendLogin: (email: string) => void;
  sendParkTypeHide: (type: string) => void;
  sendParkTypeShow: (type: string) => void;
  sendCheckAll: () => void;
  sendUncheckAll: () => void;
}

function useAnalytics(): Props {
  return {
    sendParkClick,
    sendLogin,
    sendParkTypeHide,
    sendParkTypeShow,
    sendCheckAll,
    sendUncheckAll,
  };
}

export default useAnalytics;
