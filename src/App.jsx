import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TrafficSimulation from './Traffic'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <TrafficSimulation />
      </div>
    </>
  )
}

export default App
