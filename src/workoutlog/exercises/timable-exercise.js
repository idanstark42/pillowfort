import BasicExercise from './basic-exercise'

export default class TimableExercise extends BasicExercise {
  constructor ({ name, progressions, min, max, interval, group }) {
    super(name, progressions)
    this.group = group
    this.interval = interval
    this.min = min
    this.max = max
  }

  toNumber (value='') { return Number(value) || 0 }
  toText   (value=0) { return String(value) }
}
