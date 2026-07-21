import React from 'react'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Home from './pages/Home'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import RootLayout from './layout/RootLayout'

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
          <Route path='/' element={<Login />}/>
          <Route path='/registration' element={<Registration />}/>
        <Route path='/' element={<RootLayout />}>
          <Route path='home' element={<Home />}/>
        </Route>
      </Route>
    )
  )

  return (
    <RouterProvider router={router} ></RouterProvider>
  )
}

export default App
