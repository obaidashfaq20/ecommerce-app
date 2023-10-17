import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setUserLoggedIn, setUserLoggedOut } from '../features/user/userSlice';

export default function ProtectedRoute(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const token = useSelector(state => state.user.token);

  const checkUserToken = () => {
    if(!token || token === undefined) {
      dispatch(setUserLoggedOut());
      navigate('/auth/login');
    }
    dispatch(setUserLoggedIn());
  }

  useEffect(()=>{
    checkUserToken();
  }, [isLoggedIn]);

  return (
    <>
      {
        isLoggedIn ? props.children : null
      }
    </>
  )
}
