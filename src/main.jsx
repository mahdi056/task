import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Login from './Components/Login.jsx';
import Dashboard from './Components/Dashboard.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login></Login>
  },
  {
    path: '/dashboard',
    element: <Dashboard></Dashboard>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />,
  </StrictMode>,
)
