import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import { useForceUpdate } from './force-update-hook'
import { useLog, REQUIRES_LOGIN } from './log-context'

export default function Practice () {
  const { log } = useLog()
  const navigate = useNavigate()
  const forceUpdate = useForceUpdate()
  const [last, setLast] = useState()
  const [current, setCurrent] = useState()
  const perform = (exercise, performance) => {
    current.perform(exercise.name, performance)
    forceUpdate()
  }

  useEffect(() => {
    if (log === REQUIRES_LOGIN) {
      navigate('/')
    } else {
      setLast(log.entries[log.entries.length - 1])
      setCurrent(log.entries[log.entries.length - 1].next())
    }
  }, [log, navigate])

  if (log === REQUIRES_LOGIN || !last || !current) {
    return <div className='loading' />
  }

  return <div className='practice'>
    {last.exerciseEntries.map(({ exercise, progression, goal, performance }) =>
      <div key={exercise.name} className={`exercise card ${exercise.name}`}>
        <div className='title'>{exercise.name.replace('_', ' ')}</div>
        <div className='last-time'>
          <div className='sub-title'>Last Time</div>
          <div className='data progression'>{progression}</div>
          <div className='data goal'>{goal}</div>
          <div className='data performance'>{performance}</div>
        </div>
        <div className='this-time'>
          <div className='sub-title'>This Time</div>
          <div className='data progression'>{current.progression(exercise.name)}</div>
          <div className='data goal'>{current.goal(exercise.name)}</div>
          <div className='data performance'>
            <input type="text" placeholder="how did you do?" value={current.performance(exercise.name) || ''} onChange={e => perform(exercise, e.target.value)}/>
          </div>
          <div className='form'>
            <div className='buttons'>
              <button className="success primary small button" onClick={() => perform(exercise, goal)}>I did it!</button>
              <button className="redo small button" onClick={() => perform(exercise, 'redo')}>redo</button>
            </div>
          </div>
        </div>
      </div>
    )}
    <div className="footer">
      <div className="primary button" onClick={() => log.save(current)}>done</div>
    </div>
  </div>
}
