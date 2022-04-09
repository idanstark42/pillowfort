import moment from 'moment'

const URL = 'https://script.google.com/macros/s/AKfycbwZRxN9ykrydWphLaT4-CJOXknKIhhaL9t0cN9SWkA237D7CaMr1FZPSdaLw4IpE_yl/exec'
const MAX_REP = 8

export default class WorkoutLog {
  async init () {
    this.raw = await (await fetch(URL, {
      method: 'GET',
      redirect: 'follow',
      mode: 'cors',
      dataType: 'jsonp',
      headers: {
        'Content-Type': 'text/plain; charset=UTF-8',
      }
    })).json()
    this.data = { exercises: this.raw.excercises, log: this.raw.log.map(rawLog => new LogEntry(rawLog)) }
    return this.data
  }
}

class LogEntry {
  constructor (raw) {
    Object.assign(this, {
      date: moment(raw.date, 'DD.MM.yyyy'),
      exercises: raw.excercises.map(r => new ExcerciseEntry(r))
    })
  }
}

class ExcerciseEntry {
  constructor (raw) {
    Object.assign(this, {
      name: raw.excercise,
      progression: raw.progression,
      goal: new Repetitions(raw.goal),
      performed: new Repetitions(raw.performed)
    })
  }

  toNumber () {
    return parseInt(this.progression) * MAX_REP + (this.performed.toNumber() || this.goal.toNumber())
  }
}

class Repetitions {
  constructor (raw) {
    this.raw = raw
    this.value = String(raw).includes(',') ? raw.split(',').map(rep => Number(rep.trim())) : raw
  }

  toNumber () {
    if (!Array.isArray(this.value))
      return 0
    return this.value.reduce((sum, rep) => sum + rep, 0)
  }

  toString () {
    return Array.isArray(this.value) ? this.value.map(String).join(',') : this.value
  }
}
