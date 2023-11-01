import React, { useEffect } from 'react'
import { Button, Col, Container, Form, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postLoginReqesut } from '../../features/user/userSlice';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(state => state.user.token);

  const handleSubmit = async(event) => {
    event.preventDefault();
    const formElement = document.querySelector('#loginForm');
    const formData = new FormData(formElement);
    const formDataJson = Object.fromEntries(formData); //{username: '', password:''}
    const buttonPointer = document.querySelector('#login-btn');
    buttonPointer.innerHTML = 'Please Wait...';
    buttonPointer.setAttribute('disabled', true);
    dispatch(postLoginReqesut(formDataJson))
  }

  useEffect(()=>{
    if (token){
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <>
      <Container className='my-5'>
        <h2 className='fw-normal mb-5'>Login to CRUD Prodcuts</h2>
        <Row>
          <Col md={{span: 6}}>
            <Form id='loginForm' onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <FormLabel htmlFor={'login-email'}>Email</FormLabel>
                <input type={'email'} className="form-control" id={'login-email'} name="email" autoComplete="off" required />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel htmlFor={'login-password'}>Password</FormLabel>
                <input type={'password'} className="form-control" id={'login-password'} name="password" required />
              </FormGroup>
              <Button type="submit" className="btn-success mt-2" id="login-btn">Login</Button>
            </Form>
          </Col>
        </Row>
        <Link to="/auth/signup">Don't have an account check here</Link>
      </Container>
    </>
  )
}
