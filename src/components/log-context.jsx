import { createContext, useContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'

import WorkoutLog from '../workoutlog'

const CONNECTION_KEY = 'connection_cookie'
export const REQUIRES_LOGIN = 'requires-login'
const LogContext = createContext()

export const useLog = () => useContext(LogContext)

// https://script.google.com/macros/s/AKfycbyjI5YIyE_wj_UP0zeNDXiI5u0cSXfjdJCmuVul8X2hIbHRUXC-XjLWtniKESKlz6ct/exec
export function WithLog ({ appId, children }) {
  const [log, setLog] = useState(false)
  const [user, setUser] = useState()
  const [url, setURL] = useState(Cookies.get(CONNECTION_KEY))

  async function loadLog (logURL) {
      if (logURL) {
        const user = await WorkoutLog.ping(logURL)
        if (!user) {
          updateURL(undefined)
          console.log('Invalid URL found, please enter a new one')
          setLog(REQUIRES_LOGIN)
        } else {
          setUser(user)
          setLog(await WorkoutLog.load(logURL))
        }
      } else {
        setLog(REQUIRES_LOGIN)
      }
  }

  async function updateURL (newURL) {
    console.log('update', newURL)
    await Cookies.set(CONNECTION_KEY, newURL)
    await setURL(newURL)
    await loadLog(newURL)
  }

  useEffect(() => {
    (async () => {
      await loadLog(url)
    })()
  }, [])

  if (!log) {
    return <div className='loading' />
  }

  return <LogContext.Provider value={{ log, url, updateURL, user }}>{children}</LogContext.Provider>
}
