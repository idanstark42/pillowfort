export default class ExerciseEntry {
  constructor (exercise, progression, goal, performance, active) {
    Object.assign(this, { exercise, progression, goal, performance, active })
  }

  next (active = true) {
    if (!this.active && this.last) {
      return this.last.next(active)
    }
    const [nextProgression, nextGoal] = this.exercise.nextGoal(this.progression, this.goal, this.performance)
    return new ExerciseEntry(this.exercise, nextProgression, active ? nextGoal : this.goal, null, active)
  }

  lastActive () {
    if (!this.active && this.last) return this.last
    return this
  }

  perform (performance) {
    this.performance = performance
  }

  increaseGoal () {
    this.goal = this.exercise.toText(this.exercise.toNumber(this.goal) + 1)
  }

  reduceGoal () {
    this.goal = this.exercise.toText(this.exercise.toNumber(this.goal) - 1)
  }

  reduceProgression () {
    this.progression = this.exercise.progressions[this.exercise.progressions.indexOf(this.progression) - 1] || this.exercise.progressions[0]
  }

  increaseProgression () {
    this.progression = this.exercise.progressions[this.exercise.progressions.indexOf(this.progression) + 1] || this.exercise.progressions[this.exercise.progressions.length - 1]
  }

  toJson () {
    return { name: this.exercise.name, progression: this.progression, goal: this.goal, performance: this.performance }
  }
}
