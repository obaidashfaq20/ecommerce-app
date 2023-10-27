import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../../features/product/productSice';

export default function Cart() {
  const token = useSelector(state => state.user.token);
  const status = useSelector(state => state.product.status);
  const products = useSelector(state => state.product.products);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchProducts(token));
    // eslint-disable-next-line
  }, [])

  return (
    <div className='container'>
      { status === 'successful' &&
          <ol>
            {products.map(product =>
              <li key={product.id}>
                {product.name}
              </li>
            )}
          </ol>
      }
    </div>
  )
}
