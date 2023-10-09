import React from 'react'

export default function Logout(props) {
  return (
    <>
      <button onClick={props.handleLogout} className='btn btn-danger'>
        Log Out
      </button>
    </>
  )
}
