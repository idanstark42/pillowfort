import {  useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import BarLoader from 'react-spinners/BarLoader'
import { CircularProgressbar } from 'react-circular-progressbar'
import { FaArrowLeft } from 'react-icons/fa'
import CountUp from 'react-countup'

import { useGodSheets } from './godsheets-context'

import 'react-circular-progressbar/dist/styles.css'

export default function Status () {
  const { godSheets } = useGodSheets()
  const current = godSheets[new Date().getFullYear()]
  const lastMonth = current.summary.findLast(month => month.expanses)
  const lastMonthInPreviousYear = godSheets[new Date().getFullYear() - 1].summary.find(month => month.month === lastMonth.month)

  const lastMonthExpenses = Math.round(lastMonth.expanses * 100) / 100
  const lastMonthInPreviousYearExpenses = Math.round(lastMonthInPreviousYear.expanses * 100) / 100
  
  const navigate = useNavigate()

  useEffect(() => {
    if (!current) return navigate('/')
  }, [current, navigate])

  if (!godSheets || !current) return <div className='loader'><BarLoader color='#2d3f47' loading={true} size={100} /></div>

  return <div className='status'>
    <div className='icon' style={{ position: 'absolute', left: '1rem' }}><Link to='/'><FaArrowLeft style={{ color: 'var(--main)' }} /></Link></div>
    <div className='title'>status</div>

    <div className='summary'>
      <div className='partials'><CountUp end={lastMonth.liquid} /> + <CountUp end={lastMonth.stocks} /></div>
      <div className='total'><CountUp end={lastMonth.total} />₪</div>
    </div>

    <CircularProgressbar value={100 * lastMonthExpenses / lastMonthInPreviousYearExpenses} text={`${lastMonthExpenses}₪`} styles={{ path: { stroke: '#ec644b' }, text: { fill: '#ec644b', fontFamily: 'var(--font)' } }} />
  </div>
}
