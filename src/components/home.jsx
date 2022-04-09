import { ResponsiveContainer, Text, AreaChart, XAxis, YAxis, Area } from 'recharts'
import { Link } from 'react-router-dom'

export default function Home ({ workoutlog }) {
  const graphData = workoutlog.data.log
    .map(entry => entry.exercises.reduce((datum, exercise) => {
      return Object.assign(datum, { [exercise.name]: exercise.toNumber() })
    }, { name: entry.date.format('DD/MM/yyyy') }))
    .filter(({ name }) => name !== 'Invalid date')

  return <div className='home'>
    <div className='exercises'>
      {workoutlog.data.exercises.map(exercise => <div id={exercise.name} key={exercise.name} className='exercise card'>
        <div className='title'>{exercise.name}</div>
        <ResponsiveContainer width='100%' height='80%'>
          <AreaChart data={graphData} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
            <Area dataKey={exercise.name} fill="#191970" stroke="#101035" />
            <XAxis dataKey='name' stroke="#101035"/>
          </AreaChart>
        </ResponsiveContainer>
      </div>)}
    </div>
    <div className='footer'>
      <Link id="new" to="/new">Start new exercise</Link>
    </div>
  </div>
}
