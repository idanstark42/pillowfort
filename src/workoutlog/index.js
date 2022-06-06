import { pingGoogleSheet, loadFromGoogleSheet, saveToGoogleSheet } from './google-sheet'
import parseExercise from './exercises'
import LogEntry from './log-entry'
import ExerciseEntry from './exercise-entry'

const BACKEND_VERSION = '1.0'

export default class WorkoutLog {
  constructor (url, exercises, entries) {
    Object.assign(this, { url, exercises, entries })

    this.exerciseGroups = this.exercises.reduce((groups, exercise) => {
      if (!exercise.group) {
        groups[0].push(exercise)
        return groups
      }
      if (!groups[exercise.group]) groups[exercise.group] = []
      groups[exercise.group].push(exercise)
      return groups
    }, [[]])
  }

  async save (entry) {
    await saveToGoogleSheet(this.url, entry.toJson())
  }

  static async load (url) {
    const raw = await loadFromGoogleSheet(url)
    const exercises = raw.exercises.map(parseExercise)
    const entries = raw.log.map(entry => new LogEntry(entry.date, entry.exercises.map(exEntry => new ExerciseEntry(exercises.find(ex => ex.name === exEntry.exercise), exEntry.progression, exEntry.goal, exEntry.performance, Boolean(exEntry.performance)))))
    entries.forEach((logEntry, index) => { if (index !== 0) { logEntry.setLast(entries[index - 1]) } })
    return new WorkoutLog(url, exercises, entries)
  }

  static async ping (url) {
    try {
      const ping = await pingGoogleSheet(url)
      if (ping.active && ping.version === BACKEND_VERSION) {
        return ping.user
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  }
}
