import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './router';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { SecurityErrorBoundary, SecurityUtils } from './utils/Security';

/* ✅ 0. AUTO HARD REFRESH ON FIRST LOAD (SAFE - NO LOOP) */
const handleInitialHardRefresh = () => {
  const hasRefreshed = sessionStorage.getItem('initial_hard_refresh');

  if (!hasRefreshed) {
    sessionStorage.setItem('initial_hard_refresh', 'true');

    console.log('Initial load detected → forcing hard refresh...');
    window.location.reload();
  }
};  

handleInitialHardRefresh();

/* ✅ 1. VERSION-BASED AUTOMATIC CACHE CLEARING */
const APP_VERSION = '1.0.5'; // Change this to force update

const handleVersionUpgrade = async () => {
  const savedVersion = localStorage.getItem('ssvm_version');

  // First-time visitor → just store version
  if (!savedVersion) {
    localStorage.setItem('ssvm_version', APP_VERSION);
    return;
  }

  // Version changed → clear cache + reload
  if (savedVersion !== APP_VERSION) {
    console.log(`Update detected: ${savedVersion} → ${APP_VERSION}. Clearing cache...`);

    await SecurityUtils.clearAppCache();

    localStorage.setItem('ssvm_version', APP_VERSION);

    window.location.reload();
  }
};

handleVersionUpgrade();

/* ✅ 2. PREVENT BACK/FORWARD CACHE ISSUES */
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    console.log('Page loaded from bfcache → reloading...');
    window.location.reload();
  }
});

/* ✅ 3. RENDER APP */
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <SecurityErrorBoundary>
      <Router />
    </SecurityErrorBoundary>
  </React.StrictMode>
);

/* ✅ 4. PERFORMANCE LOGGING */
reportWebVitals();