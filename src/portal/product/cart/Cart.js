import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../../features/product/productSice';
import { Link } from 'react-router-dom';

export default function Cart() {
  const cart = useSelector(state => state.cart.items);
  const token = useSelector(state => state.user.token);
  const status = useSelector(state => state.product.status);
  const products = useSelector(state => state.product.products);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchProducts(token));
    // eslint-disable-next-line
  }, []);

  return (
    <div className='container'>
      { cart.length === 0 ?
          <h1>
            Cart is empty, add some items from
            <Link to='/products'>Product List</Link>
          </h1>
        : <ol>
            {cart.map(cart =>
              <li key={cart.id}>
                {cart.name}
              </li>
            )}
          </ol>
      }
    </div>
  )
}
