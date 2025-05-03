import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter } from "react-router-dom"; // ojo, es react-router-dom, no "react-router"
import './index.css';
import App from './App.jsx';

const root = document.getElementById("root");
createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
