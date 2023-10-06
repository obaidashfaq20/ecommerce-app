import React, { useEffect } from 'react'

export default function Navbar(props) {
  useEffect(()=>{
    console.log(props)
  }, [props]);
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand m-2" href="/">Ecommerce App {props.userEmail}</a>
    </nav>
  )
}
