import React, { useState } from 'react'
import { Button, Col, Container, Form, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function AddProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector(state => state.user.token);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('TODO: Dispatch a new event to add product: ');
    console.log(product);
    // dispatch(addProduct({product: product,token: token}));
    // navigate('/products');
  }

  return (
    <>
      <Container>
        <Row>
          <Col md={{span: 12}}>
            <Form id='addProductForm' onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <FormLabel htmlFor={'product-name'}>Name</FormLabel>
                <input type={'text'} className="form-control" id={'product-name'} name="name" onChange={handleAddProductChange} autoComplete='off' required />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel htmlFor={'product-description'}>Description</FormLabel>
                <input type={'text'} className="form-control" id={'product-description'} name="description" onChange={handleAddProductChange} autoComplete='off' required />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel htmlFor={'product-price'}>Price</FormLabel>
                <input type={'number'} className="form-control" id={'product-price'} name="price" onChange={handleAddProductChange} autoComplete='off' required />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel htmlFor={'product-availability'}></FormLabel>
                <Form.Check type="checkbox" label="Availability" id={'product-availability'} name="availability" onChange={handleAddProductChange}/>
              </FormGroup>
              <Button variant="primary" type="submit">
                Add to Product List
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}
