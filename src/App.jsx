import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import WorkoutLog from './workoutlog.js'

import Home from './components/home'
import Practice from './components/practice'

import './App.css'

function App() {
  const [log, setLog] = useState(new WorkoutLog())
  const [data, setData] = useState(false)

  useEffect(() => {
    (async () => {
      setData(await log.init())
    })()
  }, [log])

  if (!log || !data || !log.data) {
    return <div className='loading' />
  }

  return <Router>
    <Routes>
      <Route path='/new' element={<Practice workoutlog={log} />} />
      <Route path='/' element={<Home workoutlog={log} />} />
    </Routes>
  </Router>
}

export default App;
