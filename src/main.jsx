import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/custom/Header.jsx'
import { Toaster } from './components/ui/sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ViewTrip from './view-trip/[tripId]/index.jsx'
import MyTrips from './my-trips'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/create-trip',
    element:<CreateTrip/>
  },
  {
    path:'view-trip/:tripId',
    element:<ViewTrip/>
  },
  {
    path:'my-trips',
    element:<MyTrips/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <GoogleOAuthProvider clientId="491191520750-27pebfl9qsftds9fd7skjrrm99pe2qpj.apps.googleusercontent.com">
     <Header/>
     <Toaster />
    <RouterProvider router={router}/>
    </GoogleOAuthProvider>;
  </StrictMode>,
)
