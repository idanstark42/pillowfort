import SetsExercise from './sets-exercise'

export default class TimableExercise extends SetsExercise {
  constructor (props) {
    super(props)
    this.max = props.max
    if (String(this.sets).includes('-')) {
      this.sets = String(this.sets).split('-')
    }
  }

  toNumber (value='') {
    const numbers = value.split(this.SEPERATOR).map(repStr => Number(repStr.trim()) || 0)
    return numbers[0]
  }

  toText (number=0) {
    const numbers = Array(Math.floor(this.max / number)).fill(number)
    if (this.max % number > 0) {
      numbers.push(this.max % number)
    }
    return numbers.join(this.SEPERATOR)
  }

  compare (goal, performance, goalText, performanceText) {
    const goalNumbers = goalText.split(this.SEPERATOR).map(repStr => Number(repStr.trim()) || 0)
    const performanceNumbers = performanceText.split(this.SEPERATOR).map(repStr => Number(repStr.trim()) || 0)
    for (let i = 0; i < goalNumbers.length; i++) {
      if (!performanceNumbers[i] || goalNumbers[i] > performanceNumbers[i]) return -1
    }
    if (performanceNumbers.length === 1) return 0
    return 1
  }
}
