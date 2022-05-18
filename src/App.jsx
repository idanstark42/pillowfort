import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import Home from './components/home'
import Stats from './components/stats'
import Practice from './components/practice'

import { WithLog } from './components/log-context'

import './App.css'

function App() {
  return <WithLog>
    <Router>
      <Routes>
        <Route path='/new' element={<Practice />} />
        <Route path='/stats' element={<Stats />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  </WithLog>
}

export default App;
