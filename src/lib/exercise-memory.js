import Cookies from 'js-cookie'

const ENTRY_KEY = 'last_ex'
const SEPERATOR = ';'

export const loadPerformance = logEntry => {
  const value = Cookies.get(ENTRY_KEY)
  if (value) {
    const performance = value.split(SEPERATOR)
    logEntry.exerciseEntries.forEach((exEntry, index) => exEntry.perform(performance[index]))
  }
}

export const savePerformance = logEntry => {
  const value = logEntry.exerciseEntries.map(exEntry => exEntry.performance).join(SEPERATOR)
  Cookies.set(ENTRY_KEY, value, { expires: 1 })
}
