import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { InterestListProvider } from './context/InterestListContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InterestListProvider>
      <App />
    </InterestListProvider>
  </StrictMode>,
)
