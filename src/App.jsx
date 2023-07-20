import { Routes, Route } from 'react-router-dom'

import { Header } from './components/Header'

import { Home } from './pages/Home'
import { Games } from './pages/Games'
import { About } from './pages/About'
import { Card } from './pages/Card'

export const App = () => {
  
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/about" element={<About />} />
        <Route path="/game/:name">
          <Route path="" element={<Card />} />
        </Route>
      </Routes>
    </>
  )
}