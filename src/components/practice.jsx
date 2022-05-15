import { useState } from 'react'

import { useForceUpdate } from './force-update-hook'

export default function Practice ({ workoutlog }) {
  const forceUpdate = useForceUpdate()
  const [last] = useState(workoutlog.entries[workoutlog.entries.length - 1])
  const [current] = useState(last.next())
  const perform = (exercise, performence) => {
    current.perform(exercise.name, performence)
    forceUpdate()
  }
  return <div className='practice'>
    {last.exerciseEntries.map(({ exercise, progression, goal, performence }) =>
      <div key={exercise.name} className={`exercise card ${exercise.name}`}>
        <div className='title'>{exercise.name.replace('_', ' ')}</div>
        <div className='last-time'>
          <div className='sub-title'>Last Time</div>
          <div className='data goal'>You tried:</div><div className='data goal'>{goal}</div>
          <div className='data performed'>and did:</div><div className='data performed  '>{performence}</div>
        </div>
        <div className='this-time'>
          <div className='sub-title'>This Time</div>
          <div className='data goal'>Try:</div><div className='data goal'>{current.goal(exercise.name)}</div>
          <div className='data performed'>and then write how you did:</div>
          <div className='form'>
            <input type="text" placeholder="how did you do?" value={current.performence(exercise.name) || ''} onChange={e => perform(exercise, e.target.value)}/>
            <div className='buttons'>
              <button className="success primary small button" onClick={() => perform(exercise, goal)}>I did it!</button>
              <button className="redo small button" onClick={() => perform(exercise, 'redo')}>redo</button>
            </div>
          </div>
        </div>
      </div>
    )}
    <div className="footer">
      <div className="primary button" onClick={() => workoutlog.save(current)}>done</div>
    </div>
  </div>
}
