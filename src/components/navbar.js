import React, { useEffect } from 'react'
import Logout from './logout';

export default function Navbar(props) {
  useEffect(()=>{
    console.log(props)
  }, [props]);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-center">
        <div>
          <a className="navbar-brand" href="#">Navbar</a>
        </div>

        <div>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0 d-flex">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
              <span className="nav-link">You are logged in as {props.userEmail}</span>
            </li>
            <Logout
              handleLogout={props.handleLogout} 
            />
          </ul>
        </div>
      </nav>
    </div>
  )
}
