import React, { useEffect } from 'react'
import { Alert, Container } from 'react-bootstrap';
import './product.css'
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, fetchProducts } from '../../features/product/productSice';
// import { unwrapResult } from '@reduxjs/toolkit';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBinLine } from 'react-icons/ri';
import { IoMdAdd } from 'react-icons/io';
import { addToCart } from '../../features/cart/cartSlice';

export default function Product() {
  const status = useSelector(state => state.product.status);
  const error = useSelector(state => state.product.errors);
  const products = useSelector(state => state.product.products);
  const token = useSelector(state => state.user.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleEdit = (product_id) => {
    console.log('TODO: Edit product '+product_id);
    const product = products.find(product => product.id === product_id)
    const query_params = `id=${product_id}&name=${product.name}&desc=${product.description}&price=${product.price}&availability=${product.availability}`
    navigate(`/products/new?${query_params}`);
  }

  const handleDelete = async(product_id) => {
    dispatch(deleteProduct({token: token, product_id: product_id}));
  }

  const handleAddToCart = (product_id) => {
    const product = products.find(product => product.id === product_id)
    dispatch(addToCart({product: product, token: token}))
  }

  const fetchTimeAgo = (updatedAt) => {
    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo('en-US');
    const inSeconds = new Date(updatedAt).getTime();
    const minutesAgo = timeAgo.format(inSeconds - 60 * 1000);
    return minutesAgo;
  }

  return (
    <>
      <Container className='d-flex flex-wrap' style={{paddingBottom: '100px'}}>
      { status === 'successful' ?
        <>
          { products.map(product=>
            <div key={product.id} className="card col-md-6" style={{width: "18rem"}}>
              <div className="card-body">
                <h5 className="card-title">Product title: {product.name}</h5>
                <p className="card-text">Product Description: {product.description}</p>
                <p className={product.availability ? "text-success" : "text-danger"}>{product.availability ? 'In Stock' : 'Out of Stock'}</p>
                <p className="h2 text-success">${product.price}</p>
                <p className="h5 text-primary">Updated: {fetchTimeAgo(product.updated_at)}</p>

                <button
                  id={`edit_product_${product.id}`}
                  onClick={()=>handleEdit(product.id)}
                  className="btn btn-primary">Edit
                </button>

                <button
                  id={`delete_product_${product.id}`}
                  onClick={()=>handleDelete(product.id)}
                  className="btn btn-danger"><RiDeleteBinLine />
                </button>

                <button
                  id={`add_to_cart_product_${product.id}`}
                  onClick={()=>handleAddToCart(product.id)}
                  className="btn btn-link"
                  disabled={!product.availability}  
                > <IoMdAdd /> Add to Cart
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
