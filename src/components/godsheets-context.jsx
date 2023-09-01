import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

import * as GodSheets from '../logic/godsheets'

const CONNECTION_KEY = 'connection_cookie'
const GodSheetsContext = createContext()

export const useGodSheets = () => useContext(GodSheetsContext)

export function WithGodSheets ({ children }) {
  const [godSheets, setGodSheets] = useState(false)
  const [years, setYears] = useState(JSON.parse(Cookies.get(CONNECTION_KEY) || '{}'))

  const addYear = async url => {
    const yearData = await GodSheets.ping(url)
    if (!yearData) {
      toast.error('Failed to connect to GodSheets')
      return
    }
    const newYears = { ...years, [yearData.year]: url }
    save(newYears)
  }

  const removeYear = year => {
    const newYears = { ...years }
    delete newYears[year]
    save(newYears)
  }

  const save = newYears => {
    Cookies.set(CONNECTION_KEY, JSON.stringify(newYears), { expires: 365 })
    setYears(newYears)
  }

  const addExpense = async (year, { date, title, amount, type, details }) => {
    await GodSheets.add(years[year], 'expenses', [date, title, amount, type, details])
    await updateGodSheets(year)
  }

  const addIncome = async (year, { date, title, amount, profile, details }) => {
    await GodSheets.add(years[year], 'incomes', [date, title, amount, profile, details])
  }

  const updateGodSheets = async year => {
    const newGodSheets = { ...godSheets }
    newGodSheets[year] = await GodSheets.load(years[year])
    setGodSheets(newGodSheets)
  }

  const expenseTypes = year => {
    console.log(godSheets)
    return godSheets[year].expenses.reduce((types, expense) => {
      if (!types.includes(expense.type) && expense.type) {
        types.push(expense.type)
      }
      return types
    }, [])
  }
  
  useEffect(() => {
    async function load (years) {
      // go over all urls and load the data from each of them
      const newGodSheets = {}
      for (const year in years) {
        try {
          newGodSheets[year] = await GodSheets.load(years[year])
        } catch (e) {
          toast.error(`Failed to load ${year} data`)
        }
      }
      setGodSheets(newGodSheets)
    }
    (async () => {  await load(years)  })()
  }, [years])

  if (!godSheets) {
    return <div className='loading' />
  }

  return <GodSheetsContext.Provider value={{ godSheets, addYear, removeYear, addExpense, addIncome, expenseTypes }}>{children}</GodSheetsContext.Provider>
}
