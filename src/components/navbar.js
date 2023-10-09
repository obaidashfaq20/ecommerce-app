import React, { useEffect } from 'react'
import Logout from './logout';

export default function Navbar(props) {

  const forceLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token');
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-center">
        <div>
          <a className="navbar-brand" href="/">Navbar</a>
        </div>

        <div>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0 d-flex">
            { props.token &&
              <>
                <li className="nav-item active">
                  <a className="nav-link" href="/home">Home</a>
                </li>
                <li className="nav-item">
                  <button onClick={() => navigator.clipboard.writeText(props.token)} className='nav-link' >Copy token</button>
                </li>
                  <li className="nav-item">
                    <span className="nav-link">You are logged in as {props.userEmail}</span>
                  </li>
                  <Logout
                    handleLogout={props.handleLogout} 
                    />
                  <button onClick={forceLogout} className='btn btn-secondary' >Force Logout</button>
              </>
            }
          </ul>
        </div>
      </nav>
    </div>
  )
}
