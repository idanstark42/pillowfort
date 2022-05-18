import { useState, useEffect } from 'react'
import { ResponsiveContainer, BarChart, Bar, AreaChart, XAxis, YAxis, Area } from 'recharts'
import { useNavigate } from 'react-router'
import { useLog, REQUIRES_LOGIN } from './log-context'

export default function Stats () {
  const { log } = useLog()
  const navigate = useNavigate()
  const [attendanceData, setAddendenceData] = useState()
  const [graphsData, setGraphsData] = useState()
  useEffect(() => {
    if (log === REQUIRES_LOGIN) {
      navigate('/')
    } else {
      setAddendenceData(log.entries.map(entry => entry.date).filter(Boolean).reduce((months, date) => {
        const monthStr = date.substr(date.indexOf('.') + 1)
        let monthEntry = months.find(month => month.month === monthStr)
        if (!monthEntry) {
          monthEntry = { month: monthStr, attendance: 0 }
          months.push(monthEntry)
        }
        monthEntry.attendance = monthEntry.attendance + 1
        return months
      }, []))

      setGraphsData(log.entries
    .map(entry => entry.exerciseEntries.reduce((datum, exEntry) => {
      return Object.assign(datum, { [exEntry.exercise.name]: exEntry.exercise.toNumber(exEntry.performance) })
    }, { name: entry.date }))
    .filter(({ name }) => name !== 'Invalid date'))
    }
  }, [log, navigate, setAddendenceData])

  if (log === REQUIRES_LOGIN) {
    return <div className='loading' />
  }

  return <div className='stats'>
    <div className='card'>
      <div className='title'>Attendence/month</div>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={attendanceData} margin={{ top: 10, right: 10, left: -40, bottom: 40 }}>
          <Bar dataKey='attendance' fill="#663300" stroke="#663300" />
          <XAxis dataKey='month' tickLine={false} stroke="#663300"/>
          <YAxis tickLine={false} stroke="#663300"/>
        </BarChart>
      </ResponsiveContainer>
    </div>
    {log.exercises.map(exercise => <div id={exercise.name} key={exercise.name} className='exercise card'>
      <div className='title'>{exercise.name}</div>
      <ResponsiveContainer width='100%' height='80%'>
        <AreaChart data={graphsData} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
          <Area dataKey={exercise.name} fill="#663300" stroke="#663300" />
          <XAxis dataKey='name' stroke="#663300"/>
        </AreaChart>
      </ResponsiveContainer>
    </div>)}
  </div>
}
