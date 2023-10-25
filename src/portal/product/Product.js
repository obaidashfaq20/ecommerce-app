import React, { useEffect } from 'react'
import { Alert, Container } from 'react-bootstrap';
import './product.css'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, fetchProducts } from '../../features/product/productSice';
// import { unwrapResult } from '@reduxjs/toolkit';
import Notifier from '../../helpers/notifier';

export default function Product() {
  const status = useSelector(state => state.product.status);
  const error = useSelector(state => state.product.errors);
  const products = useSelector(state => state.product.products);
  const token = useSelector(state => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchProducts(token));  
    
    // if you want to capture error here in classic way
    // we have to add some extra steps as createAyncThunk will always returned a resolved promise
    // OR we can use the approach where we can use extra error object in global state of that slice
    // which keeps the track of that
    // 
    // We can capture error here using a function(unwrapResult) provided by @reduxjs/toolkit
    // import { unwrapResult } from '@reduxjs/toolkit';
    // 
    // dispatch(fetchProducts(token)).
    //   .then(unwrapResult)
    //   .then(originalPromiseResult => {})
    //   .catch(rejectedValueOfSerializedError => {})

    // cancel dispatch if while resolving the promise user clicks on some other link then
    // we don't need that specific reducer to complete is fetching, abort that
    // [On unmounting i.e return function from useEffect we can cancel that createAsynThunk by using abort]
    const promise = dispatch(fetchProducts(token));
    return () => {
      promise.abort();
    }
    // eslint-disable-next-line 
  }, [token]);

  const handleShow = (product_id) => {
    console.log('TODO: Showing details for product '+product_id); 
  }

  const handleEdit = (product_id) => {
    console.log('TODO: Edit product '+product_id);
  }

  const handleDelete = async(product_id) => {
    dispatch(deleteProduct({token: token, product_id: product_id}));
  }

  return (
    <>
      <Container className='d-flex flex-wrap'>
      <Notifier />
      { status === 'successful' ?
        <>
          { products.map(product=>
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
          ) }
        </>: 
          <Alert key='danger' variant='danger'>
            {error}
          </Alert>
      }
      </Container>
    </>
  )
}
