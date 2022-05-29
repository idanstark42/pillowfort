export default class ExerciseEntry {
  constructor (exercise, progression, goal, performance) {
    Object.assign(this, { exercise, progression, goal, performance })
  }

  next () {
    const [nextProgression, nextGoal] = this.exercise.nextGoal(this.progression, this.goal, this.performance)
    return new ExerciseEntry(this.exercise, nextProgression, nextGoal, null)
  }

  perform (performance) {
    this.performance = performance
  }

  toJson () {
    return { name: this.exercise.name, progression: this.progression, goal: this.goal, performance: this.performance }
  }
}
