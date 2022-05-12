import TimeableExercise from './timable-exercise'
import TimeableSetsExercise from './timable-sets-exercise'
import CountableSetsExercise from './countable-sets-exercise'

const TYPES = {
  'time': TimeableExercise,
  'time-sets': TimeableSetsExercise,
  'count-sets': CountableSetsExercise
}

export default function parseExercise (raw) {
  return new TYPES[raw.type](raw)
}
