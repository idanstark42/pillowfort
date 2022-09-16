import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer, Slide } from 'react-toastify'

import Home from './components/home'
import Stats from './components/stats'
import Summary from './components/summary'
import Practice from './components/practice'

import { WithLog } from './components/log-context'

import './App.css'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return <WithLog>
    <ToastContainer position='bottom-right' transition={Slide} />
    <Router>
      <Routes>
        <Route path='/new' element={<Practice />} />
        <Route path='/stats' element={<Stats />} />
        <Route path='/summary' element={<Summary />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  </WithLog>
}

export default App;
