import React from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { removeFromCart } from '../../../features/cart/cartSlice';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

export default function Cart() {
  const cart = useSelector(state => state.cart.items);
   const token = useSelector(state => state.user.token);
  const dispatch = useDispatch();

  const removeFromTheCart = (product_id) => {
    console.log(product_id);
    dispatch(removeFromCart({product_id: product_id, token: token}))
  };

  const totalCost = () => {
    var totalPrice = 0;
    cart.map(product => totalPrice+=Number(product.price));
    return totalPrice;
  }

  return (
    <div className='container'>
      { cart.length === 0 ?
          <h1>
            Cart is empty, add some items from
            <Link to='/products'>Product List</Link>
          </h1>
        : <>
            {/* <h1>Total Billable Charges: ${totalCost()}</h1>
            {cart.map(product =>
              <div key={product.id} className="card col-md-12" style={{width: "100%"}}>
                {product.name}
                {product.description}
                {product.price}
                <Button
                  id={`remove_from_cart_product_${product.id}`}
                  onClick={()=> removeFromTheCart(product.id)}
                  className="btn btn-link"
                >
                  Remove
                </Button>
              </div>
            )} */}
            <h3>Total Billable Charges: ${totalCost()}</h3>
            <ListGroup  as="ol" numbered>
              { cart.map(product =>
                  <ListGroup.Item
                    as="li"
                    key={product.id}
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{product.name}</div>
                      {product.description}
                    </div>
                    <div className='me-auto'>
                      <p className="h2 text-success">${product.price}</p>
                    </div>
                    <Button onClick={()=> removeFromTheCart(product.id)}>Remove from the cart</Button>

                  </ListGroup.Item>
              )}
            </ListGroup>
          </>
      }
    </div>
  )
}
