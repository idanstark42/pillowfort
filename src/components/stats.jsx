import { useState, useEffect } from 'react'
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis } from 'recharts'
import { useNavigate } from 'react-router'
import { useLog, REQUIRES_LOGIN } from './log-context'

export default function Stats () {
  const { log } = useLog()
  const navigate = useNavigate()
  const [exercises, setExercises] = useState()
  const [attendanceData, setAddendenceData] = useState()
  const [successesData, setSuccessesData] = useState()
  const [exerciseSuccessesData, setExerciseSuccessesData] = useState()

  useEffect(() => {
    if (log === REQUIRES_LOGIN) return navigate('/')

    setExercises(log.entries[log.entries.length - 1].exerciseEntries.map(exEntry => exEntry.exercise))

    setAddendenceData(log.entries.map(entry => entry.date).filter(Boolean).reduce((months, date) => {
      const monthStr = date.substr(date.indexOf('.') + 1).split('.').map(str => String(Number(str))).join('.')
      let monthEntry = months.find(month => month.month === monthStr)
      if (!monthEntry) {
        monthEntry = { month: monthStr, attendance: 0 }
        months.push(monthEntry)
      }
      monthEntry.attendance = monthEntry.attendance + 1
      return months
    }, []))

    setSuccessesData(log.entries.filter(entry => Boolean(entry.date)).map(entry =>
      ({ date: entry.date, successes: entry.exerciseEntries.filter(exEntry => exEntry.success()).length })))

    setExerciseSuccessesData(log.entries.filter(entry => Boolean(entry.date)).reduce((months, entry) => {
      const monthStr = entry.date.substr(entry.date.indexOf('.') + 1).split('.').map(str => String(Number(str))).join('.')
      let monthEntry = months.find(month => month.month === monthStr)
      if (!monthEntry) {
        monthEntry = { month: monthStr, ...entry.exerciseEntries.reduce((all, exEntry) => ({ ...all, [exEntry.exercise.name]: 0 }), { }) }
        months.push(monthEntry)
      }
      entry.exerciseEntries.filter(exEntry => exEntry.success()).forEach(exEntry => { monthEntry[exEntry.exercise.name] = monthEntry[exEntry.exercise.name] + 1 })
      return months
    }, []))
    console.log(exerciseSuccessesData)

  }, [log, navigate, setExercises, setAddendenceData, setSuccessesData, setExerciseSuccessesData])

  if (log === REQUIRES_LOGIN || !exercises) {
    return <div className='loading' />
  }

  return <div className='stats'>
  <div className='title'>STATISTICS</div>
    <div className='card'>
      <div className='title'>Attendence/month</div>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={attendanceData} margin={{ top: 10, right: 10, left: -40, bottom: 80 }}>
          <Bar dataKey='attendance' fill='#663300' stroke='#663300' />
          <XAxis dataKey='month' angle={-45} textAnchor='end' stroke='#663300'/>
          <YAxis tickLine={false} stroke='#663300'/>
        </BarChart>
      </ResponsiveContainer>
    </div>

    <div className='card'>
      <div className='title'>Successes/workout</div>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart data={successesData} margin={{ top: 10, right: 10, left: -40, bottom: 80 }}>
          <Line dataKey='successes' dot={false} fill='#663300' stroke='#663300' />
          <XAxis dataKey='date' angle={-45} textAnchor='end' stroke='#663300' tickFormatter={value => value.split('.').splice(1, 2).join()} />
          <YAxis tickLine={false} stroke='#663300'/>
        </LineChart>
      </ResponsiveContainer>
    </div>

    {exercises.map(exercise => <div className='card'>
      <div className='title'>{exercise.name.replace('_', ' ')} success rate</div>
      <ResponsiveContainer width='100%' height='80%'>
        <LineChart data={exerciseSuccessesData} margin={{ top: 10, right: 10, left: -40, bottom: 80 }}>
          <Line dataKey={exercise.name} dot={false} fill='#663300' stroke='#663300' />
          <XAxis dataKey='month' angle={-45} textAnchor='end' stroke='#663300' />
          <YAxis tickLine={false} stroke='#663300'/>
        </LineChart>
      </ResponsiveContainer>
    </div>)}

  </div>
}
