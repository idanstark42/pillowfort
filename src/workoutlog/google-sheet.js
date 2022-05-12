const HTTP_OPTIONS = {
  redirect: 'follow',
  mode: 'cors',
  dataType: 'jsonp',
  referrerPolicy: 'no-referrer',
  headers: { 'Content-Type': 'text/plain; charset=UTF-8' }
}

export async function loadFromGoogleSheet (url) {
  const response = await fetch(url, { ...HTTP_OPTIONS, method: 'GET' })
  return await response.json()
}

export async function saveToGoogleSheet (url, entry) {
  const response = await fetch(url, { ...HTTP_OPTIONS, method: 'POST', body: JSON.stringify(entry) })
  return await response.json()
}
