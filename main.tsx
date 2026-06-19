import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Suppress benign WebSocket connection/rejection errors caused by Vite HMR constraints in the platform preview
if (typeof window !== 'undefined') {
  const isWebSocketError = (err: any): boolean => {
    if (!err) return false;
    const str = String(err.message || err.stack || err);
    return str.includes('WebSocket') || str.includes('websocket') || str.includes('ws://') || str.includes('wss://');
  };

  window.addEventListener('unhandledrejection', (event) => {
    if (isWebSocketError(event.reason)) {
      event.preventDefault();
      console.warn('Suppressed benign HMR WebSocket unhandled rejection:', event.reason);
    }
  });

  window.addEventListener('error', (event) => {
    if (isWebSocketError(event.message) || isWebSocketError(event.error)) {
      event.preventDefault();
      console.warn('Suppressed benign HMR WebSocket error:', event.message || event.error);
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
