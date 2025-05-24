// index.jsx or main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from '@/components/ui/provider'

import Home from './Home/Home.jsx'
import Board from './pages/Board/Board.jsx'
import Projects from './pages/Project/Project.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Board />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/projects/:id" element={<Projects />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
