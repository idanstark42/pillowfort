export default class Exercise {
  constructor (name, progressions, group) {
    this.name = name
    this.progressions = progressions
    this.group = group
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
      return [progression, goal]
    } else if (goalNumber === this.max) {
      return [this.progressions[this.progressions.indexOf(progression) + 1], this.min]
    } else {
      return [progression, this.toText(performanceNumber + this.interval)]
    }
  }
}
