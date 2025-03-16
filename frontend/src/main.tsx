import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Router from './Routes/Router.tsx'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={Router}>
    <App />
  </RouterProvider>
);
