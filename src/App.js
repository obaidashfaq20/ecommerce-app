import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PortalNavbar from "./portal/navbar/PortalNavbar";
import PortalFooter from "./portal/footer/PortalFooter";
import AuthNavbar from "./auth/navbar/AuthNavbar";
import AuthFooter from "./auth/footer/AuthFooter";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUserLoggedIn } from "./features/user/userSlice";
function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const token = useSelector(state => state.user.token);

  const checkUserToken = () => {
    if (!token || token === undefined) {
      dispatch(logout());
      navigate('/auth/login');
    }
    dispatch(setUserLoggedIn());
  }

  useEffect(()=>{
    checkUserToken();
  }, [isLoggedIn, checkUserToken]);

  return(
    <>
      { isLoggedIn ? <PortalNavbar /> : <AuthNavbar />}
      <Outlet />
      { isLoggedIn ? <PortalFooter /> : <AuthFooter /> }
    </>
  )
}

export default App;
