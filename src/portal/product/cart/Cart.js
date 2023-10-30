import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

export default function Cart() {
  const cart = useSelector(state => state.cart.items);
//  const token = useSelector(state => state.user.token);
  //const dispatch = useDispatch();


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
