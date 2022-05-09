import { ResponsiveContainer, Text, AreaChart, XAxis, YAxis, Area } from 'recharts'
import { Link } from 'react-router-dom'

export default function Home ({ workoutlog }) {
  return <div className='home'>
    <img src='./logo-color.png' />
    <div className='title'>workout.log</div>
    <Link to='/new' className='primary button'>start workout</Link>
    <Link to='/stats' className='button'>see stats</Link>
  </div>
}
