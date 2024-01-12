import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer, Slide } from 'react-toastify'

import Home from './components/home'
import Add from './components/add'
import Stats from './components/stats'
import Status from './components/status'

import { WithGodSheets } from './components/godsheets-context'

import './App.css'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return <WithGodSheets>
    <ToastContainer position='bottom-right' transition={Slide} />
    <Router>
      <Routes>
        <Route path='/status' element={<Status />} />
        <Route path='/stats' element={<Stats />} />
        <Route path='/add' element={<Add />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  </WithGodSheets>
}

export default App;
