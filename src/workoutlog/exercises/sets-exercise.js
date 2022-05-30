import BasicExercise from './basic-exercise'

export default class SetsExercise extends BasicExercise {
  constructor ({ name, progressions, min, max, interval, sets, group }) {
    super(name, progressions, group)
    this.sets = sets
    this.interval = interval
    this.min = sets * min
    this.max = sets * max
    this.SEPERATOR = SetsExercise.SEPERATOR
  }

  toNumber (value='') {
    const numbers = value.split(this.SEPERATOR).map(repStr => Number(repStr.trim()) || 0)
    return numbers.reduce((sum, num) => sum + num, 0)
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

SetsExercise.SEPERATOR = ','
