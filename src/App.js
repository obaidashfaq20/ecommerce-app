import axios from "axios";
import Login from "./components/login";
import Navbar from "./components/navbar";
import { LOGIN_URL, LOGOUT_URL } from './constants/constant';
import React, { useEffect, useState } from 'react'
import Logout from "./components/logout";

function App() {
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    // Check if a token is already stored in local storage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      setUserEmail('');
      setToken('');
      setUser({email: '', password: ''});
    }
  }, []);

  const handleChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL,  {user});
      if (response.status >= 200 && response.status < 300) {
        // The request was successful, and the status code is in the 200-299 range.
        const authorizationHeader = response.headers.get('authorization');
        if (authorizationHeader) {
          const bearerToken = authorizationHeader.split(' ')[1];
          const email = response.data.status.data.user.email;
          setToken(bearerToken);
          setUserEmail(email);
          setError('');
          localStorage.setItem('token', bearerToken);
          localStorage.setItem('userEmail', email);
        } else {
          // Token not found
        }
      } else {
        // The request was not successful, and the status code is outside the 200-299 range.
        console.error('Request failed with status:', response.status);
        setError(response.data);
      }
    } catch (error) {
      setError(error.response.data);
    }
  };

  const handleLogout = async(event) => {
    event.preventDefault();
    // TODO - With out bearer token Handle error
    // const response = await axios.delete(LOGOUT_URL);
    const response = await axios.delete(LOGOUT_URL,{
      headers: {Authorization: `Bearer ${token}`}
    });

    if (response.status >= 200 && response.status < 300) {
      setUserEmail('');
      setToken('');
      setUser({email: '', password: ''});
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
    } else {
      console.log(response.data);
    }
  };

  return (
    <>
    <Navbar token={token} userEmail={userEmail} handleLogout={handleLogout}/>
    <div className="container">
    { !token &&
        <Login 
          user={user}
          error={error}
          handleChange={handleChange}
          handleLogin={handleLogin}
        />
    }
    </div>
    </>
  );
}

export default App;
