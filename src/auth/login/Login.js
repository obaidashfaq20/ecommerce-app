import axios from 'axios';
import React, { useEffect } from 'react'
import { Button, Col, Container, Form, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { LOGIN_URL } from '../../constants/constant';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async(event) => {
    event.preventDefault();
    const formElement = document.querySelector('#loginForm');
    const formData = new FormData(formElement);
    const formDataJson = Object.fromEntries(formData); //{username: '', password:''}
    const buttonPointer = document.querySelector('#login-btn');
    buttonPointer.innerHTML = 'Please Wait...';
    buttonPointer.setAttribute('disabled', true);

    axios.post(LOGIN_URL,  {user:formDataJson}).then((response)=>{
      buttonPointer.innerHTML = 'Login';
      buttonPointer.removeAttribute('disabled');
      const data = response.data;
      const authorizationHeader = response.headers.get('authorization');
      const token = authorizationHeader.split(' ')[1];

      if(!token) {
        alert('Unable to login! No token provided by Login API');
        return;
      }
      localStorage.clear();
      localStorage.setItem('user-token', token);
      localStorage.setItem('user-email', data.status.data.user.email);
      setTimeout(()=>{
        navigate('/');
      }, 500);
    }).catch((error)=>{
      buttonPointer.innerHTML = 'Login';
      buttonPointer.removeAttribute('disabled');
      alert(error.message);
    });
  }

  useEffect(()=>{
    const token = localStorage.getItem('user-token');
    if (token){
      navigate('/');
    }
  }, []);

  return (
    <>
      <Container className='my-5'>
        <h2 className='fw-normal mb-5'>Login to CRUD Prodcuts</h2>
        <Row>
          <Col md={{span: 6}}>
            <Form id='loginForm' onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <FormLabel htmlFor={'login-email'}>Email</FormLabel>
                <input type={'email'} className="form-control" id={'login-email'} name="email" required />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel htmlFor={'login-password'}>Password</FormLabel>
                <input type={'password'} className="form-control" id={'login-password'} name="password" required />
              </FormGroup>
              <Button type="submit" className="btn-success mt-2" id="login-btn">Login</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}
