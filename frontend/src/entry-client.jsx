import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { App } from './App.tsx'

const router = createBrowserRouter(routes)

const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.hydrateRoot(
    rootElement,
    <React.StrictMode>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </React.StrictMode>,
  )
} else {
  console.error("Root element with ID 'root' not found.")
}
