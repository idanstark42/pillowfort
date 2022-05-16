import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useLog, REQUIRES_LOGIN } from './log-context'

export default function Home () {
  const { log } = useLog()
  const requiresLogin = log === REQUIRES_LOGIN
  return <div className='home'>
    <img src='./logo-color.png' alt=''/>
    <div className='title'>workout.log</div>
    <Link to='/new' className={`primary ${requiresLogin ? 'disabled' : ''} button`}>start workout</Link>
    <Link to='/stats' className={`${requiresLogin ? 'disabled' : ''} button`}>see stats</Link>
    <Login />
  </div>
}

function Login () {
  const { url, updateURL, user } = useLog()
  const [editing, setEditing] = useState(!user)
  if (user && !editing) {
    return <div className='login'>
      <div className='data'>Welcome {user}</div>
      <div className='small link button' onClick={() => setEditing(true)}>Choose another user</div>
    </div>
  }
  return <div className='login'>
    <input type='text' name='url' value={url || ''} onChange={async e => {
      (await updateURL(e.target.value))
      setEditing(false)
    }} />
  </div>
}
