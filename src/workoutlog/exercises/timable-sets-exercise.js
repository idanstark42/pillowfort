import SetsExercise from './sets-exercise'

export default class TimableExercise extends SetsExercise {
  constructor (props) {
    super(props)
    if (String(this.sets).inlucdes('-')) {
      this.sets = String(this.sets).split('-')
    }
  }

  toText (value=0) {
    const div = value / this.sets
    let numbers = []
    if (div === Math.round(div)) {
      numbers = Array(this.sets).fill(div)
    } else {
      const upperValue = Math.ceil(div)
      const lowerValue = Math.floor(div)
      const upperValueReps = value - this.sets * lowerValue
      const lowerValueReps = this.sets - upperValueReps

      numbers = Array(upperValueReps).fill(upperValue).concat(Array(lowerValueReps).fill(lowerValue))
    }

    return numbers.map(num => num.toString()).join(this.SEPERATOR)
  }
}
