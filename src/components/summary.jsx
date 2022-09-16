import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { FaTimes, FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { useLog, REQUIRES_LOGIN } from './log-context'

export default function Summary () {
  const { log } = useLog()
  const navigate = useNavigate()
  const [workouts, setWorkouts] = useState()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (log === REQUIRES_LOGIN) return navigate('/')

    setWorkouts(Array.from(log.entries).reverse())
  }, [log, navigate, setWorkouts])

  if (log === REQUIRES_LOGIN || !workouts) {
    return <div className='loading' />
  }

  const next = () => setCurrent(current + 1)
  const previous = () => setCurrent(current - 1)

  const canNext = current !== log.length
  const canPrevious = current !== 0
  const workout = workouts[current]

  return <div className='summary'>
    <div className='card'>
      <div className='title'>{workout.date}</div>
      <div className='entries'>
        {workout.exerciseEntries.map((exEntry, key) => <div key={key} className={`ex-entry ${exEntry.active ? '' : 'disabled'} ${exEntry.success() ? 'success' : ''}`} performance={exEntry.exactSuccess() ? 'DONE' : exEntry.performance}>
          <div className='name'>{exEntry.progression.split(' - ')[1].replace(/\(.+?\)/,'')}</div>
          <div className='result'>
            {exEntry.goal}
          </div>
        </div>)}
      </div>
      <div className={`actions ${canPrevious ? 'previous' : ''} ${canNext ? 'next' : ''}`}>
        <FaAngleLeft onClick={previous} />
        <Link to='/'><FaTimes /></Link>
        <FaAngleRight onClick={next} />
      </div>
    </div>
  </div>
}
