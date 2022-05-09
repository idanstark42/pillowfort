import { ResponsiveContainer, Text, AreaChart, XAxis, YAxis, Area } from 'recharts'
import { Link } from 'react-router-dom'

export default function Practice ({ workoutlog }) {
  const last = workoutlog.data.log[workoutlog.data.log.length - 1]
  return <div className='practice'>
    {last.exercises.map(exercise => <div key={exercise.name} className={`exercise card ${exercise.name}`}>
      <div className='title'>{exercise.name.replace('_', ' ')}</div>
      <div className='last-time'>
        <div className='sub-title'>Last Time</div>
        <div className='data goal'>You tried:</div><div className='data goal'>{exercise.goal.toString()}</div>
        <div className='data performed'>and did:</div><div className='data performed  '>{exercise.performed.toString()}</div>
      </div>
      <div className='this-time'>
        <div className='sub-title'>This Time</div>
        <div className='data goal'>Try:</div><div className='data goal'>{exercise.goal.toString()}</div>
        <div className='data performed'>and then write how you did:</div>
        <div className='form'>
          <input type="text" placeholder="how did you do?" />
          <div className='buttons'>
            <button className="success primary small button">I did it!</button>
            <button className="redo small button">I need a do-over</button>
          </div>
        </div>
      </div>
    </div>)}
  </div>
}
