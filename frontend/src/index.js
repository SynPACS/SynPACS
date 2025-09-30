import React from 'react';
import { createRoot } from 'react-dom/client'; // ✅ Use curly braces
import './index.css';
import './land.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();