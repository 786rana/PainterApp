import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './auth/AuthContext'
import { ServicesProvider } from './data/ServicesContext'
import { ThemeProvider } from './theme/ThemeContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <ThemeProvider>
          <ServicesProvider>
            <App />
          </ServicesProvider>
        </ThemeProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
)
