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
    const goalText = String(goal)
    const performanceText = String(performance)
    const goalNumber = this.toNumber(goalText) || 0
    const performanceNumber = this.toNumber(performanceText) || 0

    switch (this.compare(goalNumber, performanceNumber, goalText, performanceText)) {
      case -1: return [progression, goal]
      case 0: return [this.progressions[this.progressions.indexOf(progression) + 1], this.firstGoal()]
      default: return [progression, this.toText(performanceNumber + this.interval)]
    }
  }

  compare (goalNumber, performanceNumber) {
    if (goalNumber > performanceNumber) {
      return -1
    } else if (goalNumber === this.max) {
      return 0
    }
    return 1
  }
}
