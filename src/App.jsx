import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import WorkoutLog from './workoutlog'

import Home from './components/home'
import Stats from './components/stats'
import Practice from './components/practice'

import './App.css'

function App() {
  const [log, setLog] = useState(false)

  useEffect(() => {
    (async () => {
      setLog(await WorkoutLog.load('https://script.google.com/macros/s/AKfycbxKkrUydtzdX-A-Lfh-3kcH29HIcvAdBFznU14qdSaI9MLlYbx-3fA7TJ3HxhmJl5D3/exec'))
    })()
  }, [])

  if (!log) {
    return <div className='loading' />
  }

  return <Router>
    <Routes>
      <Route path='/new' element={<Practice workoutlog={log} />} />
      <Route path='/stats' element={<Stats workoutlog={log} />} />
      <Route path='/' element={<Home workoutlog={log} />} />
    </Routes>
  </Router>
}

export default App;
