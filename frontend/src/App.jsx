import { useState } from 'react'

import Layout from './components/Layout'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
      <Layout />
    </>
  )
}

export default App
