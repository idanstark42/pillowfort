import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { FaTimes, FaCheck, FaMinus, FaPlus } from 'react-icons/fa'
import ClipLoader from 'react-spinners/ClipLoader'
import { toast } from 'react-toastify'

import { useForceUpdate } from './force-update-hook'
import { useLog, REQUIRES_LOGIN } from './log-context'
import { playSuccessSound } from '../lib/success-sound'
import { loadPerformance, savePerformance } from '../lib/exercise-memory'

export default function Practice () {
  const { log } = useLog()
  const navigate = useNavigate()
  const forceUpdate = useForceUpdate()
  const [last, setLast] = useState()
  const [current, setCurrent] = useState()
  const [loading, setLoading] = useState(false)

  const perform = (exercise, performance) => {
    current.perform(exercise.name, performance)
    savePerformance(current)
    forceUpdate()
  }

  const save = async () => {
    setLoading(true)
    await log.save(current)
    navigate('/summary')
    playSuccessSound()
    toast.success('Workout saved to log')
  }

  useEffect(() => {
    if (log === REQUIRES_LOGIN) {
      navigate('/')
    } else {
      setLast(log.entries[log.entries.length - 1])
      const currentLogEntry = log.entries[log.entries.length - 1].next()
      setCurrent(currentLogEntry)
      loadPerformance(currentLogEntry)
    }
  }, [log, navigate])

  if (log === REQUIRES_LOGIN || !last || !current) {
    return <div className='loading' />
  }

  return <div className='practice'>
    {loading ? <div className='loader'><ClipLoader speedMultiplier={0.6} color='#663300' loading={true} size={100} /></div> : ''}
    {last.exerciseEntries.map(previousExEntry => <ExerciseCard key={previousExEntry.exercise.name} previousExEntry={previousExEntry.lastActive()} current={current} perform={perform} />)}
    <div className="footer">
      <div className={`primary button ${current.done() ? '' : 'disabled'}`} onClick={save}>Exercise Completed!</div>
    </div>
  </div>
}


function ExerciseCard ({ previousExEntry, current, perform }) {
  const forceUpdate = useForceUpdate()
  const [writing, setWriting] = useState(false)
  const [editing, setEditing] = useState(false)
  const [explaining, setExplaining] = useState(false)
  const [writingValue, setWritingValue] = useState(current.get(previousExEntry.exercise.name).goal)
  const currentExEntry = current.get(previousExEntry.exercise.name)
  const sameProgration = currentExEntry.progression === previousExEntry.progression

  const progressionName = currentExEntry.progression.split(' - ')[1].replace(/\(.+?\)/,'')
  const parenthases = currentExEntry.progression.match(/\((.+?)\)/) ? currentExEntry.progression.match(/\((.+?)\)/)[1] : false

  const done = currentExEntry.done()
  const exactSuccess = currentExEntry.exactSuccess()
  const success = currentExEntry.success()

  return <div name={currentExEntry.exercise.name.replaceAll('_', ' ')} className={
      `exercise card
        ${previousExEntry.exercise.name}
        ${done ? 'done' : ''}
        ${success ? 'success' : ''}
        ${currentExEntry.active ? '' : 'disabled'}`}
        performance={exactSuccess ? 'DONE' : (currentExEntry.performance || '')}>
    <div className='editable'>
      {(editing && !done) ? <div className='editing icon' onClick={() => { currentExEntry.reduceProgression(); forceUpdate() } }><FaMinus /></div> : ''}
      <div className='header sub-title'>
        {progressionName}
        <div className='data'>{parenthases || ''}</div>
      </div>
      {(editing && !done) ? <div className='editing icon' onClick={() => { currentExEntry.increaseProgression(); forceUpdate() }}><FaPlus /></div> : ''}
    </div>
    <div>
      { done ? '' :
        (editing ?
          <div className='small link right button edit' onClick={() => setEditing(false)}>stop editing</div> :
          <div className='small link right button edit' onClick={() => setEditing(true)}>edit goal</div>) }
      <div className='data'>goal</div>
      <div className='editable'>
        {(editing && !done) ? <div className='editing reduce icon' onClick={() => { currentExEntry.reduceGoal(); forceUpdate() }}><FaMinus /></div> : ''}
        <div className='goal title'>{currentExEntry.goal.replace(/\s?,\s?/g, '|')}</div>
        {(editing && !done) ? <div className='editing add icon' onClick={() => { currentExEntry.increaseGoal(); forceUpdate() }}><FaPlus /></div> : ''}
      </div>
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
      { done ? <div className='small link right button clear' onClick={() => perform(currentExEntry.exercise, undefined)}>Clear</div> : '' }
      <div className='primary button' onClick={() => perform(currentExEntry.exercise, currentExEntry.goal)}>DID IT</div>
      <div className='button' onClick={() => perform(currentExEntry.exercise, 'redo')}>REDO</div>
      {writing ?
        <div className='writing-form'>
          <input type='text' name='input' value={writingValue} onChange={e => setWritingValue(e.target.value)} />
          <div className='done icon' onClick={() => { perform(currentExEntry.exercise, String(writingValue)); setWriting(false) }}><FaCheck /></div>
          <div className='close icon' onClick={() => setWriting(false)}><FaTimes /></div>
        </div>
        :
        <div className='small link button' onClick={() => setWriting(true)}>Let me write on my own</div>
      }
    </div>
  </div>
}
