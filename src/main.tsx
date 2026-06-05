import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Providers } from './app/providers.tsx'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './app/router'

const router = createRouter({ routeTree })


const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
   <Providers>
    <RouterProvider router={router} />
  </Providers>,
  </StrictMode>,
)
