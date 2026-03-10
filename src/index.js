import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { HelmetProvider } from 'react-helmet-async'; 
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider> {/* 1. Move this to the very top */}
    <BrowserRouter>
      {/* Remove StrictMode temporarily if the error persists, 
          as it double-renders and can break older libraries in React 19 */}
      <App />
    </BrowserRouter>
  </HelmetProvider>
);

reportWebVitals();