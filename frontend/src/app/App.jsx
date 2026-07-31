import { Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import CalculatorPage from '../features/calculator/pages/calculatorPage'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/form" element={<CalculatorPage />} />
      </Routes>
    </>
  )
}

export default App
