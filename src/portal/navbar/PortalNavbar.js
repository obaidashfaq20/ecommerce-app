import React from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/user/userSlice';
import { setShowNofificationCopiedModal } from '../../features/setting/settingSlice';

export default function PortalNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userEmail = useSelector(state => state.user.email);
  const token = useSelector(state => state.user.token);

  const copyToken = () => {
    navigator.clipboard.writeText(token);
    dispatch(setShowNofificationCopiedModal(true))
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth/login');
  }

  return (
    <>
      <Navbar bg="light" expand="lg" className='navbar-light'>
        <Container>
          <Navbar.Brand>
            <Link className='nav-link' to='/'> CRUD Prodcuts | Portal</Link>
            </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse>
            <Nav className='ms-auto'>              
              <Link to='products/new' className="nav-link mt-2"> ADD a product </Link>

              <Link to='/products' className="nav-link mt-2">Prodcuts</Link>

              <Nav.Link>
                <button onClick={() => copyToken()} className='nav-link' >Copy token</button>
              </Nav.Link>

              <Nav.Link>
                <span className="nav-link">You are logged in as {userEmail}</span>
              </Nav.Link>

              <Nav.Link>
                <Button className='btn-warning' onClick={handleLogout}>Logout</Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </> 
  )
}
