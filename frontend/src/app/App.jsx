import { Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import CalculatorPage from '../features/calculator/pages/calculatorPage'
import BasicResult from '../pages/BasicResult'
import FullResult from '../pages/FullResult'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/form" element={<CalculatorPage />} />
        <Route path='/result' element={<BasicResult/>}/>
        <Route path="/result-full" element={<FullResult/>} />
      </Routes>
    </>
  )
}

export default App
