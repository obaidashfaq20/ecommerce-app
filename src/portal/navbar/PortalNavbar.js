import axios from 'axios';
import React from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { LOGOUT_URL } from '../../constants/constant';

export default function PortalNavbar() {
  const userEmail = localStorage.getItem('user-email')
  const navigate = useNavigate();

  const copyToken = () => {
    const token = localStorage.getItem('user-token');
    navigator.clipboard.writeText(token);
  }

  const logout = async() => {
    const token = localStorage.getItem('user-token');
    const response = await axios.delete(LOGOUT_URL,{
      headers: {Authorization: `Bearer ${token}`}
    });
    if (response.status >= 200 && response.status < 300) {
      localStorage.clear();
      navigate('/auth/login');
    } else {
      console.log(response.data);
    }
  }

  const forceLogout = () => {
    localStorage.clear();
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
              <Nav.Link>
                <Link to='products/new' className="btn btn-primary"> ADD a product </Link>
              </Nav.Link>

              <Nav.Link>
                <Link to='/products' className="nav-link">Prodcuts</Link>
              </Nav.Link>

              <Nav.Link>
                <button onClick={() => copyToken()} className='nav-link' >Copy token</button>
              </Nav.Link>

              <Nav.Link>
                <span className="nav-link">You are logged in as {userEmail}</span>
              </Nav.Link>

              <Nav.Link>
                <Button className='btn-warning' onClick={logout}>Logout</Button>
              </Nav.Link>

              <Nav.Link>
                <Button className='btn-secondary' onClick={forceLogout}>Force Logout</Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </> 
  )
}
