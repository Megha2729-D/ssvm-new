import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './router';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { SecurityErrorBoundary, SecurityUtils } from './utils/Security';

/* ✅ 1. VERSION-BASED AUTOMATIC CACHE CLEARING */
const APP_VERSION = '1.0.5'; // Increment this to force clear cache for all users

const handleVersionUpgrade = async () => {
  const savedVersion = localStorage.getItem('ssvm_version');

  // If no version exists, it's a first-time visitor - no need to clear cache
  if (!savedVersion) {
    localStorage.setItem('ssvm_version', APP_VERSION);
    return;
  }

  // If version mismatch, perform deep clear and reload
  if (savedVersion !== APP_VERSION) {
    console.log(`Update detected: ${savedVersion} -> ${APP_VERSION}. Synchronizing...`);
    await SecurityUtils.clearAppCache();
    localStorage.setItem('ssvm_version', APP_VERSION);
    window.location.reload(true);
  }
};

handleVersionUpgrade();

/* ✅ 2. PREVENT BACK/FORWARD CACHE ISSUES */
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    window.location.reload();
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <SecurityErrorBoundary>
      <Router />
    </SecurityErrorBoundary>
  </React.StrictMode>
);

reportWebVitals();