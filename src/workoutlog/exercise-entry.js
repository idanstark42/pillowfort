export default class ExerciseEntry {
  constructor (exercise, progression, goal, performance, active) {
    Object.assign(this, { exercise, progression, goal, performance, active })
  }

  next (active = true) {
    const [nextProgression, nextGoal] = this.exercise.nextGoal(this.progression, this.goal, this.performance)
    return new ExerciseEntry(this.exercise, nextProgression, nextGoal, null, active)
  }

  perform (performance) {
    this.performance = performance
  }

  toJson () {
    return { name: this.exercise.name, progression: this.progression, goal: this.goal, performance: this.performance }
  }
}
