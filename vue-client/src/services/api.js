export async function apiFetch(url, options = {}) {
  const token = localStorage.getItem('token')

  const res = await fetch(`http://localhost:8080${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: 'Bearer ' + token }),
      ...options.headers
    }
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || 'API Error')
  }

  return res.json()
}