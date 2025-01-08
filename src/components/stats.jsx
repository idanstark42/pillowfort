import {  useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts'
import { useNavigate } from 'react-router'
import { FaArrowLeft } from 'react-icons/fa'
import BarLoader from 'react-spinners/BarLoader'
import CountUp from 'react-countup'

import { useGodSheets } from './godsheets-context'

const EXPENSE_TYPE_COLORS = [
  { name: 'living', color: '#9e0142' },
  { name: 'groceries', color: '#d53e4f' },
  { name: 'entretainment', color: '#f46d43' },
  { name: 'dining', color: '#fdae61' },
  { name: 'projects', color: '#fee08b' },
  { name: 'books', color: '#e6f598' },
  { name: 'charity', color: '#abdda4' },
  { name: 'social', color: '#66c2a5' },
  { name: 'transportation', color: '#3288bd' },
]

const INCOME_TYPE_COLORS = [
  { name: 'freelance', color: '#9e0142' },
  { name: 'employee', color: '#5e4fa2' }
]

export default function Stats () {
  const { godSheets } = useGodSheets()
  const current = godSheets[new Date().getFullYear()]
  console.log(current)
  const last = current.summary.findLast(month => month.total)
  console.log(last)
  
  const navigate = useNavigate()

  useEffect(() => {
    if (!current) return navigate('/')
  }, [current, navigate])

  if (!godSheets || !current) return <div className='loader'><BarLoader color='#2d3f47' loading={true} size={100} /></div>

  return <div className='stats'>
    <div className='icon' style={{ position: 'absolute', left: '1rem' }}><Link to='/'><FaArrowLeft style={{ color: 'var(--main)' }} /></Link></div>
    <div className='title'>statistics</div>

    <div className='summary'>
      <div className='partials'><CountUp end={last.liquid} /> + <CountUp end={last.stocks} /></div>
      <div className='total'><CountUp end={last.total} />₪</div>
    </div>

    <ResponsiveContainer width='90%' height='40%'>
      <BarChart data={current.expenseTypes}>
        {EXPENSE_TYPE_COLORS.map(({ name, color }) => <Bar dataKey={name} fill={color} stroke={color} stackId='1' />)}
        <XAxis dataKey='month' height={1}/>
        <YAxis tickLine={false} stroke='#2d3f47'/>
        <Tooltip contentStyle={{ fontFamily: 'Comfortaa', fontSize: 12 }} formatter={value => Math.round(value)}/>
      </BarChart>
    </ResponsiveContainer>
    <ResponsiveContainer width='90%' height='40%'>
      <AreaChart data={current.projection}>
        <Area type='monotone' dataKey='liquid' fill="#FF6464" stroke="#FF6464" fillOpacity={0.5} stackId='1' />
        <Area type='monotone' dataKey='stocks' fill="#6494FF" stroke="#6494FF" fillOpacity={0.5} stackId='1' />
        <Area type='monotone' dataKey='total' stroke="#000000" fillOpacity={0}  strokeOpacity={0} />
        <XAxis dataKey='date' height={1}/>
        <YAxis tickLine={false} stroke='#2d3f47'/>
        <Tooltip contentStyle={{ fontFamily: 'Comfortaa', fontSize: 12 }} formatter={value => Math.round(value)}/>
      </AreaChart>
    </ResponsiveContainer>
    <ResponsiveContainer width='90%' height='40%'>
      <BarChart data={current.incomeTypes}>
        {INCOME_TYPE_COLORS.map(({ name, color }) => <Bar dataKey={name} fill={color} stroke={color} stackId='1' />)}
        <XAxis dataKey='month' height={1}/>
        <YAxis tickLine={false} stroke='#2d3f47'/>
        <Tooltip contentStyle={{ fontFamily: 'Comfortaa', fontSize: 12 }} formatter={value => Math.round(value)}/>
      </BarChart>
    </ResponsiveContainer>
  </div>
}
