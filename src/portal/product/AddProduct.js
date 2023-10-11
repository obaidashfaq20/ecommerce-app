import axios from 'axios';
import React, { useState } from 'react'
import { PRODUCTS_URL } from '../../constants/constant';
import { Button, Col, Container, Form, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0.0,
    availability: false
  });

  const handleAddProductChange = event => {
    const { name, value, type, checked } = event.target;
    let newValue = type === 'checkbox' ? checked: value;
    setProduct({...product, [name]: newValue });
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    const token = localStorage.getItem('user-token');
    try {
      var data = JSON.stringify({ product });
      var config = {
        method: 'post',
        url: PRODUCTS_URL,
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data : data
      };
      const response = await axios(config);
      navigate('/products');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Container className='my-5'>
        <h2 className='fw-normal mb-5'>Add a new Product</h2>
        <Row>
          <Col md={{span: 6}}>
            <Form id='addProductForm' onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <FormLabel htmlFor={'product-name'}>Name</FormLabel>
                <input type={'text'} className="form-control" id={'product-name'} name="name" onChange={handleAddProductChange}required />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel htmlFor={'product-description'}>Description</FormLabel>
                <input type={'text'} className="form-control" id={'product-description'} name="description" onChange={handleAddProductChange} required />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel htmlFor={'product-price'}>Price</FormLabel>
                <input type={'number'} className="form-control" id={'product-price'} name="price" onChange={handleAddProductChange} required />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel htmlFor={'product-availability'}></FormLabel>
                <Form.Check type="checkbox" label="Availability" name="availability" onChange={handleAddProductChange}/>
              </FormGroup>
              <Button type="submit" className="btn-success mt-2" id="login-btn">Login</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
    // <div>
    //   <h2></h2>
    // <form>
    //   <div className="form-group">
    //     <label htmlFor="name">Name</label>
    //     <input onChange={handleAddProductChange} type="text" name="name" className="form-control" id="name" placeholder="Enter name" required />
    //   </div>
    //   <div className="form-group">
    //     <label htmlFor="description">Description</label>
    //     <input onChange={handleAddProductChange} type="text" name="description" className="form-control" id="description" placeholder="description" required/>
    //   </div>
    //   <div className="form-group">
    //     <label htmlFor="price">Price</label>
    //     <input onChange={handleAddProductChange} type="number" name="price" className="form-control" id="price" placeholder="price" required/>
    //   </div>
    //   <div className="form-check">
    //     <input onChange={handleAddProductChange} className="form-check-input" name="availability" type="checkbox" id="availability" />
    //     <label className="form-check-label" htmlFor="availability">
    //       Availability
    //     </label>
    //   </div>
    //   <button onClick={handleSubmit} type="submit" className="btn btn-primary">Add Product</button>
    // </form>
    // </div>
  )
}
