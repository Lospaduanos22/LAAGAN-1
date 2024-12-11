import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Header from './components/custom/Header.jsx' // Adjust the path to your Header file
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'

// Create the router
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/create-trip',
    element: <CreateTrip />,
  },
]);

// Render the app with Header and Router
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div>
      <Header /> {/* Display header above all routes */}
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
