const HTTP_OPTIONS = {
  method: 'get',
  redirect: 'follow',
  mode: 'cors',
  dataType: 'jsonp',
  referrerPolicy: 'no-referrer',
  headers: { 'Content-Type': 'text/plain; charset=UTF-8' }
}

export async function ping (url) {
  const response = await action(url, 'ping')
  return await response.json()
}

export async function load (url) {
  const response = await action(url, 'load')
  return await response.json()
}

export async function add (url, type, data) {
  await action(url, 'add', { type, data: JSON.stringify(data) })
  return true
}

async function action (url, action, params = {}) {
  const fullUrl = `${url}?${Object.entries({ ...params, action }).map(([key, value]) => `${key}=${value}`).join('&')}`
  return await fetch(fullUrl, HTTP_OPTIONS)
}
