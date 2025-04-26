
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/global.css'
import App from './App'
import CadastroOferta from './pages/CadastroOfertas'
import { OfertasProvider } from './context/OfertasContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <OfertasProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/cadastro-oferta" element={<CadastroOferta />} />
        </Routes>
      </Router>
    </OfertasProvider>
  </React.StrictMode>
)
