import { Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import BasicResult from '../pages/BasicResult'
import FullResult from '../pages/FullResult'
import CalculatorFormPage from '../pages/CalculatorFormPage'



function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/form" element={<CalculatorFormPage />} />
        <Route path='/result/:id' element={<BasicResult/>}/>
        <Route path="/full-result" element={<FullResult/>} />
      </Routes>
    </>
  )
}

export default App
