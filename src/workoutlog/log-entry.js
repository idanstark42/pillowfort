export default class LogEntry {
  constructor (date, exerciseEntries) {
    Object.assign(this, { date, exerciseEntries })
  }

  next () {
    const date = (new Date()).toLocaleDateString('en-GB').replaceAll('/', '.')
    return new LogEntry(date, this.exerciseEntries.map(exerciseEntry => exerciseEntry.next(this.isNextExerciseEntryActive(exerciseEntry))))
  }

  perform (exercise, performance) {
    this.exerciseEntries.find(exEntry => exEntry.exercise.name === exercise).perform(performance)
  }

  done () {
    return this.exerciseEntries.every(exEntry => !exEntry.active || Boolean(exEntry.performance))
  }

  get (exercise) {
    return this.exerciseEntries.find(exEntry => exEntry.exercise.name === exercise)
  }

  isNextExerciseEntryActive (exEntry){
    if (!exEntry.exercise.group)  return true

    const groupedExEntries = this.exerciseEntries.filter(groupedExEntry => groupedExEntry.exercise.group === exEntry.exercise.group)
    const currentActiveIndex = groupedExEntries.findIndex(groupedExEntry => groupedExEntry.active)
    const nextActiveIndex = (currentActiveIndex + 1) % groupedExEntries.length
    return groupedExEntries[nextActiveIndex].exercise === exEntry.exercise
  }

  toJson () {
    return { date: this.date, exercises: this.exerciseEntries.map(exEntry => exEntry.toJson()) }
  }
}
