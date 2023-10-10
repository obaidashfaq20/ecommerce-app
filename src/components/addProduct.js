import axios from 'axios';
import React, { useState } from 'react'
import { PRODUCTS_URL } from '../constants/constant';

export default function AddProduct(props) {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0.0,
    availability: false
  });

  const handleAddProductChange = event => {
    const { name, value, type, checked } = event.target;
    let newValue = type === 'checkbox' ? checked: value;
    setProduct({...product, [name]: newValue })
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    props.setNewProduct(false);
    try {
      var data = JSON.stringify({ product });
      var config = {
        method: 'post',
        url: PRODUCTS_URL,
        headers: { 
          Authorization: `Bearer ${props.token}`,
          'Content-Type': 'application/json'
        },
        data : data
      };

      const response = await axios(config);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2>Add a new Product</h2>
    <form>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input onChange={handleAddProductChange} type="name" name="name" className="form-control" id="name" placeholder="Enter name" required />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input onChange={handleAddProductChange} type="description" name="description" className="form-control" id="description" placeholder="description" required/>
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input onChange={handleAddProductChange} type="price" name="price" className="form-control" id="price" placeholder="price" required/>
      </div>
      <div className="form-check">
        <input onChange={handleAddProductChange} className="form-check-input" name="availability" type="checkbox" id="availability" />
        <label className="form-check-label" htmlFor="availability">
          Availability
        </label>
      </div>
      <button onClick={handleSubmit} type="submit" className="btn btn-primary">Add Product</button>
    </form>
    </div>
  )
}
