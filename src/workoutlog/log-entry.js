export default class LogEntry {
  constructor (date, exerciseEntries) {
    Object.assign(this, { date, exerciseEntries })
  }

  next () {
    const date = (new Date()).toLocaleDateString('en-GB')
    return new LogEntry(date, this.exerciseEntries.map(exerciseEntry => exerciseEntry.next()))
  }

  perform (exercise, performence) {
    this.exerciseEntries.find(exEntry => exEntry.exercise.name === exercise).perform(performence)
  }

  goal (exercise) {
    return this.exerciseEntries.find(exEntry => exEntry.exercise.name === exercise).goal
  }

  performence (exercise) {
    return this.exerciseEntries.find(exEntry => exEntry.exercise.name === exercise).performence
  }

  toJson () {
    return { date: this.date, exercises: this.exerciseEntries.map(exEntry => exEntry.toJson()) }
  }
}
