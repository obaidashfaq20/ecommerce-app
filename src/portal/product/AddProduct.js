import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import productSice, { addProduct, editProduct } from '../../features/product/productSice';

export default function AddProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();
  const [editFlag, setEditFlag] = useState(false);
  const [editProductId, setEditProductId] = useState(0); 

  const token = useSelector(state => state.user.token);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0.0,
    availability: false
  });

  useEffect(()=>{
    const name = params.get('name');
    if (name !== null) {
      const id = params.get('id');
      const description = params.get('desc');
      const price = params.get('price');
      const availability = params.get('availability');
      // editProduct get request to /products/:id
      const editProduct = {
        name: name,
        description: description,
        price: price,
        availability: false
      }
      setEditProductId(id);
      setEditFlag(true);
      setProduct(editProduct);
    }
    console.log(product)
  }, []);

  const handleAddProductChange = event => {
    const { name, value, type, checked } = event.target;
    let newValue = type === 'checkbox' ? checked: value;
    setProduct({...product, [name]: newValue });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    editFlag ? dispatch(editProduct({token: token, product: product, id: editProductId}))
      : dispatch(addProduct({token: token, product: product}))
    navigate('/products');
  }

  return (
    <>
      <Container>
        <Row>
          <Col md={{span: 12}}>
            <Form id='addProductForm' onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <FormLabel htmlFor={'name'}>Name</FormLabel>
                <input type={'text'} className="form-control" id={'product-name'} name="name" onChange={handleAddProductChange} value={product.name} autoComplete='off' required />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel htmlFor={'description'}>Description</FormLabel>
                <input type={'text'} className="form-control" id={'product-description'} name="description" onChange={handleAddProductChange} value={product.description} autoComplete='off' minLength={22} required />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel htmlFor={'price'}>Price</FormLabel>
                <input type={'number'} className="form-control" id={'price'} name="price" onChange={handleAddProductChange} value={product.price} autoComplete='off' required />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel htmlFor={'availability'}></FormLabel>
                <Form.Check type="checkbox" label="Availability" id={'availability'} name="availability" value={product.availability} onChange={handleAddProductChange}/>
              </FormGroup>
              <Button variant="primary" type="submit">
                { editFlag ? "Update" : "Add to Product List"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}
