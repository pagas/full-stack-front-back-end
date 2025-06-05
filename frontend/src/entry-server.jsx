import ReactDOMServer from 'react-dom/server'
import { createStaticRouter, StaticRouterProvider } from 'react-router' // <-- import from react-router (not react-router-dom/server)

import { routes } from './routes.jsx'
import { App } from './App.jsx'

import { createFetchRequest } from './request.js'

export async function render(req) {
  const fetchRequest = createFetchRequest(req)

  // Create static router for SSR
  const router = createStaticRouter(routes)

  // Handle the request, passing fetchRequest (Request-like object)
  const context = await router.handleRequest(fetchRequest)

  // Render to string with StaticRouterProvider and context from handleRequest
  return ReactDOMServer.renderToString(
    <App>
      <StaticRouterProvider router={router} context={context} />
    </App>,
  )
}
