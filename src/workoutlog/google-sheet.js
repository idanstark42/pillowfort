const HTTP_OPTIONS = {
  method: 'get',
  redirect: 'follow',
  mode: 'cors',
  dataType: 'jsonp',
  referrerPolicy: 'no-referrer',
  headers: { 'Content-Type': 'text/plain; charset=UTF-8' }
}

export async function pingGoogleSheet (url) {
  const response = await action(url, 'ping')
  return await response.json()
}

export async function loadFromGoogleSheet (url) {
  const response = await action(url, 'load')
  return await response.json()
}

export async function saveToGoogleSheet (url, entry) {
  const response = await action(url, 'add', { date: entry.date, exercises: JSON.stringify(entry.exercises) })
  return true
}

async function action (url, action, params = {}) {
  const fullUrl = `${url}?${Object.entries({ ...params, action }).map(([key, value]) => `${key}=${value}`).join('&')}`
  return await fetch(fullUrl, HTTP_OPTIONS)
}
