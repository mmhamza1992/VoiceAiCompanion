
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { LanguageProvider } from './contexts/LanguageContext'
// Import test utilities for debugging
import './utils/test-bookings'

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </BrowserRouter>
);
