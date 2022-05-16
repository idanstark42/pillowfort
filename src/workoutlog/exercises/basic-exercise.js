export default class Exercise {
  constructor (name, progressions) {
    this.name = name
    this.progressions = progressions
  }

  firstProgression () {
    return this.progressions[0]
  }

  firstGoal () {
    return this.toText(this.min)
  }

  nextGoal (progression, goal, performance) {
    const goalNumber = this.toNumber(goal) || 0
    const performanceNumber = this.toNumber(performance) || 0
    if (goalNumber > performanceNumber) {
      return goal
    } else if (goalNumber === this.max) {
      return this.progressions[this.progressions.indexOf(progression) + 1]
    } else {
      return this.toText(performanceNumber + this.interval)
    }
  }
}
