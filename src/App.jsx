import { useEffect } from 'react'

import WorkoutLog from './workoutlog.js'

function App() {
  const log = new WorkoutLog()

  useEffect(() => {
    (async () => {
      const data = await log.init()
    })()
  }, [log])

  return <div>HERE!</div>
}

export default App;
