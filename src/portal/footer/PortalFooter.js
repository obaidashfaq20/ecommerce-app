import React from 'react'
import { Container } from 'react-bootstrap'
import { BASE_URL } from '../../constants/constant'

export default function PortalFooter() {
  return (
    <>
      <footer className='bg-light border-top py-3 fixed-bottom'>
        <Container className='d-flex justify-content-around'>
          <div>
          &copy; React Auth Demo -2023 | Portal
          </div>
          <div>
            <a href={ `${BASE_URL}/api-docs`} target="_blank" rel="noopener noreferrer">Go to API Docs</a>
          </div>
        </Container>
      </footer>
    </>
  )
}
