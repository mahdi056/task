import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Login from './Components/Login.jsx';
import Dashboard from './Components/Dashboard.jsx';
import Privateroute from './Components/Privateroute.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login></Login>
  },
  {
    path: '/dashboard',
    element: 
    <Privateroute>


      <Dashboard></Dashboard>
    </Privateroute>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />,
  </StrictMode>,
)
