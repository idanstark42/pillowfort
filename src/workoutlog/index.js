import { loadFromGoogleSheet, saveToGoogleSheet } from './google-sheet'
import parseExercise from './exercises'
import LogEntry from './log-entry'
import ExerciseEntry from './exercise-entry'

export default class WorkoutLog {
  constructor (url, exercises, entries) {
    Object.assign(this, { url, exercises, entries })
  }

  save (entry) {
    saveToGoogleSheet(this.url, entry.toJson())
  }

  static async load (url) {
    const raw = await loadFromGoogleSheet(url)
    const exercises = raw.exercises.map(parseExercise)
    const entries = raw.log.map(entry => new LogEntry(entry.date, entry.exercises.map(exEntry => new ExerciseEntry(exercises.find(ex => ex.name === exEntry.exercise), exEntry.progression, exEntry.goal, exEntry.performence))))
    return new WorkoutLog(url, exercises, entries)
  }
}
