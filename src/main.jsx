import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Shopcontextprovider from './context/shopcontext'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
     <Shopcontextprovider>
     <App />
     </Shopcontextprovider>
    
  </BrowserRouter>,
)
