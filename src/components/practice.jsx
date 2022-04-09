import { ResponsiveContainer, Text, AreaChart, XAxis, YAxis, Area } from 'recharts'
import { Link } from 'react-router-dom'

export default function Practice ({ workoutlog }) {
  const last = workoutlog.data.log[workoutlog.data.log.length - 1]
  return <div className='practice'>
    {last.exercises.map(exercise => <div key={exercise.name} className={`exercise card ${exercise.name}`}>
      <div className='title'>{exercise.name.replace('_', ' ')}</div>
      <div className='last-time'>
        <div className='last-time-title'>Last Time</div>
        <div className='goal'>Goal: {exercise.goal.toString()}</div>
        <div className='performed'>Performed: {exercise.performed.toString()}</div>
      </div>
      <div className='this-time'>
        <div className='last-time-title'>This Time</div>
        <div className='goal'>Goal: {exercise.goal.toString()}</div>
        <div className='performed'>
          Performed:
          <input type="text" />
          <button className="success">I did it!</button>
          <button className="redo">I need to repeat this...</button>
        </div>
      </div>
    </div>)}
  </div>
}
