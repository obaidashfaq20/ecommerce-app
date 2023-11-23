import React from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/user/userSlice';
import { setShowNofificationCopiedModal } from '../../features/setting/settingSlice';
import Notifier from '../../helpers/notifier';

export default function PortalNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userEmail = useSelector(state => state.user.email);
  const token = useSelector(state => state.user.token);
  const cart = useSelector(state => state.cart.items);

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
      <Navbar bg="light" expand="lg" className='navbar-light sticky-top'>
        <Container>
          <Navbar.Brand>
            <Link className='nav-link' to='/'> CRUD Prodcuts | Portal</Link>
            </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse>
            <Nav className='ms-auto'>              
              <Link to='products/new' className="nav-link mt-2"> ADD a product </Link>

              <Link to='/products' className="nav-link mt-2">Prodcuts</Link>
              <Link to='/cart' className="nav-link mt-2">Cart <strong>{cart.length}</strong></Link>

              <Nav.Link>
                <button onClick={() => copyToken()} className='nav-link' >Copy token</button>
              </Nav.Link>

              <div className="nav-link mt-2">You are logged in as <Link to='/orders'>{userEmail}</Link></div>

              <Nav.Link>
                <Button className='btn-warning' onClick={handleLogout}>Logout</Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Notifier />
    </> 
  )
}
