export function createFetchRequest(req) {
  const origin = `${req.protocol}://${req.get('host')}`
  const url = new URL(req.originalUrl || req.url || '/', origin)

  const controller = new AbortController()
  req.on('close', () => controller.abort())

  const headers = new Headers()
  for (const [key, values] of Object.entries(req.headers)) {
    if (!values) continue
    if (Array.isArray(values)) {
      for (const value of values) {
        headers.append(key, value)
      }
    } else {
      headers.set(key, values)
    }
  }

  const init = {
    method: req.method,
    headers,
    signal: controller.signal,
  }

  if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
    if (typeof req.body === 'string' || req.body instanceof Buffer) {
      init.body = req.body
    } else {
      init.body = JSON.stringify(req.body)
      headers.set('Content-Type', 'application/json')
    }
  }

  return new Request(url.href, init)
}
