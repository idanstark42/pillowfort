export default class ExerciseEntry {
  constructor (exercise, progression, goal, performence) {
    Object.assign(this, { exercise, progression, goal, performence })
  }

  next () {
    return new ExerciseEntry(this.exercise, this.progression, this.exercise.nextGoal(this.progression, this.goal, this.performence), null)
  }

  perform (performence) {
    this.performence = performence
  }

  toJson () {
    return { name: this.exercise.name, progression: this.progression, goal: this.goal, performence: this.performence }
  }
}
