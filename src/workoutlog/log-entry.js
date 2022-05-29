export default class LogEntry {
  constructor (date, exerciseEntries) {
    Object.assign(this, { date, exerciseEntries })
  }

  next () {
    const date = (new Date()).toLocaleDateString('en-GB').replaceAll('/', '.')
    return new LogEntry(date, this.exerciseEntries.map(exerciseEntry => exerciseEntry.next()))
  }

  perform (exercise, performance) {
    this.exerciseEntries.find(exEntry => exEntry.exercise.name === exercise).perform(performance)
  }

  done () {
    return this.exerciseEntries.every(exEntry => Boolean(exEntry.performance))
  }

  toJson () {
    return { date: this.date, exercises: this.exerciseEntries.map(exEntry => exEntry.toJson()) }
  }
}
