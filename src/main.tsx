import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.scss'
import { AppRoutes } from './routes'
import Header from '../src/components/Header'
import Footer from '../src/components/Footer'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <AppRoutes />
    <Footer />
  </StrictMode>,
)
