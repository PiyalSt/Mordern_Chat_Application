import React from 'react'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Home from './pages/Home'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import RootLayout from './layout/RootLayout'

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />}/>
      </Route>
    )
  )

  return (
    <RouterProvider router={router} ></RouterProvider>
  )
}

export default App
