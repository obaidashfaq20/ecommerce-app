import React from 'react'
import AuthNavbar from './navbar/AuthNavbar'
import { Outlet } from 'react-router-dom'
import AuthFooter from './footer/AuthFooter'

export default function Auth() {
  return (
    <>
      <AuthNavbar />
      <Outlet />
      <AuthFooter />
    </>
  )
}
