import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderItems } from '../../features/order_item/orderItemSlice';
import { Container, ListGroup } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

export default function OrderItem() {
  const token = useSelector(state => state.user.token);
  const orderItems = useSelector(state => state.orderItem.items);
  const dispatch = useDispatch();
  let { order_id } = useParams();

  useEffect(() => {
    dispatch(getOrderItems({token: token, id: order_id}))
    // eslint-disable-next-line
  }, [order_id])

  return (
    <Container>
      <Link to='/orders'>Back</Link>
      { orderItems.length === 0 ?
          <h3>
            No order item for this particular order
          </h3>
        : <>
            <h3>Total Items: {orderItems.length}</h3>
            <ListGroup  as="ol" numbered>
              { orderItems.map(product =>
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
                  </ListGroup.Item>
              )}
            </ListGroup>
          </>
      }
    </Container>
  )
}
