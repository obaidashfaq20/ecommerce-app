import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { PRODUCTS_URL } from '../../constants/constant';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './product.css'

export default function Product() {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('user-token') || '');
  useEffect(() => {
    const fetchProducts = async() =>{
      try {
        const response = await axios.get(PRODUCTS_URL,{
          headers: {Authorization: `Bearer ${token}`}
        });
        setProducts(response.data);
      } catch(error){
        console.log(error);
      }
    }
    fetchProducts();
  }, [token]);

  const handleShow = (product_id) => {
    console.log('Showing details for product '+product_id);
  }

  const handleEdit = (product_id) => {
    console.log('Edit product '+product_id);
  }

  const handleDelete = async(product_id) => {
    const response = await axios.delete(`${PRODUCTS_URL}/${product_id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== product_id)
    );
  }

  return (
    <>
      <Container className='d-flex flex-wrap'>  
      { products && 
        products.map(product=>
          <div key={product.id} className="card col-md-6" style={{width: "18rem"}}>
            <div className="card-body">
              <h5 className="card-title">Product title: {product.name}</h5>
              <p className="card-text">Product Description: {product.description}</p>
              <p className={product.availability ? "text-success" : "text-danger"}>{product.availability ? 'In Stock' : 'Out of Stock'}</p>
              <p className="h2 text-success">${product.price}</p>

              <button 
                id={`show_product_${product.id}`} 
                onClick={()=>handleShow(product.id)} 
                className="btn btn-info">Show
              </button>

              <button
                id={`edit_product_${product.id}`}
                onClick={()=>handleEdit(product.id)}
                className="btn btn-primary">Edit
              </button>

              <button
                id={`delete_product_${product.id}`}
                onClick={()=>handleDelete(product.id)}
                className="btn btn-danger">Delete  
              </button>
            </div>
          </div>
        )
      }
      </Container>
    </>
  )
}
