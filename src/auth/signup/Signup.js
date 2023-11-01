import React, { useEffect } from 'react'
import { Button, Col, Container, Form, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { postSignupRequest } from '../../features/user/userSlice';

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.user.token);

  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const formElement = document.querySelector('#signupForm');
    const formData = new FormData(formElement);
    const formDataJson = Object.fromEntries(formData);
    const buttonPointer = document.querySelector('#signup-btn');
    buttonPointer.innerHTML = 'Please Wait...';
    buttonPointer.setAttribute('disabled', true);
    dispatch(postSignupRequest(formDataJson));
  }

  useEffect(()=>{
    if(token) {
      navigate('/');
    }
  }, [token, navigate]);
  return (
    <Container className='my-5'>
      <h2 className='fw-normal mb-5'>Signup to CRUD Prodcuts</h2>
      <Row>
        <Col md={{span: 6}}>
          <Form id='signupForm' onSubmit={handleSubmit}>
            <FormGroup className="mb-3">
              <FormLabel htmlFor={'signup-name'}>Name</FormLabel>
              <input type={'name'} className="form-control" id={'signup-name'} name="name" autoComplete="off" required />
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel htmlFor={'signup-email'}>Email</FormLabel>
              <input type={'email'} className="form-control" id={'signup-email'} name="email" autoComplete="off" required />
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel htmlFor={'signup-password'}>Password</FormLabel>
              <input type={'password'} className="form-control" id={'signup-password'} name="password" required />
            </FormGroup>
            <Button type="submit" className="btn-success mt-2" id="signup-btn">Create an account</Button>
          </Form>
        </Col>
      </Row>
      <Link to="/auth/login" className=''>Already have an account</Link>
  </Container>
  )
}
