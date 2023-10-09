import React, { useEffect, useState } from 'react'
import { PRODUCTS_URL } from '../constants/constant';
import axios from 'axios';
import './product.css'

export default function Product(props) {
  const [products, setProduct] = useState([]);
  useEffect(() => {
    const fetchProducts = async() =>{
      try {
        const response = await axios.get(PRODUCTS_URL,{
          headers: {Authorization: `Bearer ${props.token}`}
        });
        setProduct(response.data);
      } catch(error){
        console.log(error);
      }
    }
    fetchProducts();
  }, []);

  const handleShow = (product_id) => {
    console.log('Showing details for product '+product_id);
  }

  const handleEdit = (product_id) => {
    console.log('Edit product '+product_id);
  }

  const handleDelete = (product_id) => {
    console.log('Delete product '+product_id);
  }

  
  return (
    <div className='d-flex'>
    { products && 
      products.map(product=>
        <div key={product.id} className="card" style={{width: "18rem"}}>
          <div className="card-body">
            <h5 className="card-title">Product title: {product.name}</h5>
            <p className="card-text">Product Description: {product.descrition}</p>
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
    </div>
  )
}