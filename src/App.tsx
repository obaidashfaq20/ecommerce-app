import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PortalNavbar from "./portal/navbar/PortalNavbar";
import PortalFooter from "./portal/footer/PortalFooter";
import AuthNavbar from "./auth/navbar/AuthNavbar";
import AuthFooter from "./auth/footer/AuthFooter";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUserLoggedIn } from "./features/user/userSlice";
import { stateInterface } from "./interfaces";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: stateInterface) => state.user.isLoggedIn);
  const token = useSelector((state: stateInterface) => state.user.token);

  const checkUserToken = () => {
    if (!token || token === undefined) {
      dispatch(logout());
      navigate('/auth/login');
    }
    dispatch(setUserLoggedIn());
  }

  useEffect(()=>{
    checkUserToken();
    // eslint-disable-next-line 
  }, [isLoggedIn]);

  return(
    <>
      { isLoggedIn ? <PortalNavbar /> : <AuthNavbar />}
      <Outlet />
      { isLoggedIn ? <PortalFooter /> : <AuthFooter /> }
    </>
  )
}

export default App;
