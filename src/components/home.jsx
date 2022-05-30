import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaTimes, FaCheck } from 'react-icons/fa'
import ClipLoader from 'react-spinners/ClipLoader'

import { useLog, REQUIRES_LOGIN } from './log-context'

export default function Home () {
  const { log, user } = useLog()
  const requiresLogin = log === REQUIRES_LOGIN
  const [loading, setLoading] = useState(false)
  return <div className='home'>
    {(loading || (requiresLogin && user)) ? <div className='loader'><ClipLoader speedMultiplier={0.6} color='#663300' loading={true} size={100} /></div> : ''}
    <img src='./logo-color.png' alt=''/>
    <div className='title'>workout.log</div>
    <Link to='/new' className={`primary ${requiresLogin ? 'disabled' : ''} button`}>start workout</Link>
    <Link to='/stats' className={`${requiresLogin ? 'disabled' : ''} button`}>see stats</Link>
    <Login setLoading={setLoading}/>
  </div>
}

function Login ({ setLoading }) {
  const { url, updateURL, user } = useLog()
  const [editing, setEditing] = useState(!user)
  const [loginValue, setLoginValue] = useState(false)
  const login = async () => {
    await setLoading(true)
    await updateURL(String(loginValue))
    await setLoading(false)
  }

  if (user && !editing) {
    return <div className='login'>
      <div className='data'>Welcome {user}</div>
      <div className='small link button' onClick={() => setEditing(true)}>Choose another user</div>
    </div>
  }
  return <div className='login editing'>
    <input type='text' name='url' value={loginValue} onChange={e => setLoginValue(e.target.value)} />
    <div className='done icon' onClick={() => { login(); setEditing(false) }}><FaCheck /></div>
    <div className='close icon' onClick={() => setEditing(false)}><FaTimes /></div>
  </div>
}
