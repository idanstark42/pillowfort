import {  useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts'
import { useNavigate } from 'react-router'
import { FaArrowLeft } from 'react-icons/fa'
import BarLoader from 'react-spinners/BarLoader'

import { useGodSheets } from './godsheets-context'

const EXPENSE_TYPE_COLORS = [
  { name: 'living', color: '#FF6464' },
  { name: 'groceries', color: '#FFB764' },
  { name: 'entretainment', color: '#FFE364' },
  { name: 'dining', color: '#646464' },
  { name: 'projects', color: '#6494FF' },
  { name: 'books', color: '#64FFB9' },
  { name: 'charity', color: '#64FF64' },
  { name: 'social', color: '#B9B9B9' },
  { name: 'transportation', color: '#64FF64' },
]

const INCOME_TYPE_COLORS = [
  { name: 'freelance', color: '#FF6464' },
  { name: 'employee', color: '#FFB764' }
]

export default function Stats () {
  const { godSheets } = useGodSheets()
  const current = godSheets[new Date().getFullYear()]
  console.log(current)
  
  const navigate = useNavigate()

  useEffect(() => {
    if (!current) return navigate('/')
  }, [current, navigate])

  if (!godSheets || !current) return <div className='loader'><BarLoader color='#2d3f47' loading={true} size={100} /></div>

  return <div className='stats'>
    <div className='icon' style={{ position: 'absolute', left: '1rem' }}><Link to='/'><FaArrowLeft style={{ color: 'var(--main)' }} /></Link></div>
    <div className='title'>statistics</div>

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
