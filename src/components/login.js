import React, { useState } from 'react'

export default function Login(props) {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input onChange={props.handleChange} type="email" name="email" className="form-control" id="email" placeholder="Enter email" required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input onChange={props.handleChange} type="password" name="password" className="form-control" id="password" placeholder="Password" required/>
      </div>
      <button onClick={props.handleLogin} type="submit" className="btn btn-primary">Login</button>
    </form>
  )
}
