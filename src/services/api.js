// Thin fetch wrapper. Throws {offline:true} when the backend isn't running so the UI can use demo mode.
export async function api(path, { method = 'GET', body, token } = {}) {
  let res
  try {
    res = await fetch(`/api${path}`, {
      method,
      headers: { 'Content-Type': 'application/json', ...(token && { Authorization: `Bearer ${token}` }) },
      body: body && JSON.stringify(body),
    })
  } catch { throw Object.assign(new Error('offline'), { offline: true }) }
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    if (res.status >= 500 && !data.error) throw Object.assign(new Error('offline'), { offline: true })
    throw Object.assign(new Error(data.error || 'Request failed'), { status: res.status })
  }
  return data
}
