import moment from 'moment'

const URL = 'https://script.google.com/macros/s/AKfycbwZRxN9ykrydWphLaT4-CJOXknKIhhaL9t0cN9SWkA237D7CaMr1FZPSdaLw4IpE_yl/exec'
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
    console.log(this.raw)
    this.data = { excercises: this.raw.excercises, log: this.raw.log.map(rawLog => LogEntry(rawLog)) }
    return this.data
  }
}

class LogEntry {
  constructor (raw) {
    Object.assign(this, {
      date: moment(raw.date),
      excercises: raw.excercises.map(ExcerciseEntry)
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
}

class Repetitions {
  constructor (raw) {
    this.raw = raw
    this.value = raw.includes(',') ? raw.split(',').map(Number) : raw
  }

  next () {
    if (!Array.isArray(this.value))
      return new Repetitions(this.raw)

    if (this.value.every(rep => rep === this.value[0]) && this.value[0] !== 8) {
      return new Repetitions(this.value.map((rep,i) => i === 0 ? (rep+1) : rep).map(String).join(','))
    }

    let found = false
    return new Repetitions(this.value.map(rep => {
      const result = (this.value[0] !== rep && !found) ? (rep+1) : rep
      found = found || this.value[0] !== rep
      return result
    }).map(String).join(','))
  }
}
