import axios from 'axios';
import React, { useState } from 'react'
import { PRODUCTS_URL } from '../../constants/constant';
import { Modal, Button, Col, Container, Form, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { Modal } from 'bootstrap';

export default function AddProduct() {
  const navigate = useNavigate();

  const token = useSelector(state => state.user.token);
  const [show, setShow] = useState(false);
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
      await axios(config);
      navigate('/products');
    } catch (error) {
      console.log(error);
    }
  }

  const handleShow = () => {setShow(true)};
  const handleClose =() => {setShow(false)};

  return (
    <>
    <Button variant="primary" onClick={handleShow}>
        Add Prodcuts
      </Button>
      {/*  Do not close modal on escape key keyboard={false} */}
      {/*  Do not close modal on click outside of modal backdrop="static" */}
      <Modal show={show} onHide={handleClose} keyboard={false} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title className='fw-normal'>Add a New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col md={{span: 12}}>
                <Form id='addProductForm' onSubmit={handleSubmit}>
                  <FormGroup className="mb-3">
                    <FormLabel htmlFor={'product-name'}>Name</FormLabel>
                    <input type={'text'} className="form-control" id={'product-name'} name="name" onChange={handleAddProductChange} required />
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
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Add to Product List
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
