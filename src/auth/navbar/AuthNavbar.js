import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

export default function AuthNavbar() {
  return (
    <>
      <Navbar bg="light" expand="lg" className="navbar-light">
        <Container>
          <Navbar.Brand>React Auth Demo</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  )
}
