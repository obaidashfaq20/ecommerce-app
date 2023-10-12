import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PortalNavbar from "./portal/navbar/PortalNavbar";
import PortalFooter from "./portal/footer/PortalFooter";
import AuthNavbar from "./auth/navbar/AuthNavbar";
import AuthFooter from "./auth/footer/AuthFooter";
function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUserToken = () => {
    const userToken = localStorage.getItem('user-token');
    if (!userToken || userToken === undefined) {
      localStorage.clear();
      navigate('/auth/login');
    }
    setIsLoggedIn(true);
  }

  useEffect(()=>{
    checkUserToken();
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
