import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { FaTimes, FaCheck } from 'react-icons/fa'

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
    {last.exerciseEntries.map(previousExEntry => <ExerciseCard key={previousExEntry.exercise.name} previousExEntry={previousExEntry} current={current} perform={perform} />)}
    <div className="footer">
      <div className={`primary button ${current.done() ? '' : 'disabled'}`} onClick={() => log.save(current)}>DONE</div>
    </div>
  </div>
}


function ExerciseCard ({ previousExEntry, current, perform }) {
  const [writing, setWriting] = useState(false)
  const [explaining, setExplaining] = useState(false)
  const [writingValue, setWritingValue] = useState(current.get(previousExEntry.exercise.name).goal)
  const currentExEntry = current.get(previousExEntry.exercise.name)
  const sameProgration = currentExEntry.progression === previousExEntry.progression

  const progressionName = currentExEntry.progression.split(' - ')[1].replace(/\(.+?\)/,'')
  const parenthases = currentExEntry.progression.match(/\((.+?)\)/) ? currentExEntry.progression.match(/\((.+?)\)/)[1] : false

  return <div name={currentExEntry.exercise.name.replaceAll('_', ' ')} className={`exercise card ${previousExEntry.exercise.name} ${Boolean(currentExEntry.performance) ? 'done' : ''}`} performance={currentExEntry.performance || ''}>
    <div className='sub-title'>
      {progressionName}
      <div className='data'>{parenthases || ''}</div>
    </div>
    <div>
      <div className='data'>goal</div>
      <div className='goal title'>{currentExEntry.goal.replace(/\s?,\s?/g, '|')}</div>
      {explaining ?
        <div className='explanation data' onClick={() => setExplaining(false)}>
          {sameProgration ? 
            `Last time you ${previousExEntry.goal === previousExEntry.performance ? `did ${previousExEntry.goal}, and so now you should try the next step.` : `tried ${previousExEntry.goal}, ${previousExEntry.performance === 'redo' ? `but couldn't do it` : `but you did only ${previousExEntry.performance}`}, and so you should try it again.`}`
            :
            `Last time you finished ${previousExEntry.progression.split(' - ')[1]}.`
          }
        </div>
        :
        <div className='small link button' onClick={() => setExplaining(true)}>why?</div>
      }
    </div>
    <div className='actions'>
      <div className='primary button' onClick={() => perform(currentExEntry.exercise, currentExEntry.goal)}>DID IT</div>
      <div className='button' onClick={() => perform(currentExEntry.exercise, 'redo')}>REDO</div>
      {writing ?
        <div className='writing-form'>
          <input type='text' name='input' value={writingValue} onChange={e => setWritingValue(e.target.val)} />
          <div className='done icon' onClick={() => { perform(currentExEntry.exercise, String(writingValue)); setWriting(false) }}><FaCheck /></div>
          <div className='close icon' onClick={() => setWriting(false)}><FaTimes /></div>
        </div>
        :
        <div className='small link button' onClick={() => setWriting(true)}>Let me write on my own</div>
      }
    </div>
  </div>
}
