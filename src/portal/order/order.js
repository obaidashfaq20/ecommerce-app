import React, { useEffect } from 'react'
import { Button, Container, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../features/order/orderSlice';
import { Link } from 'react-router-dom';
import { fetchTimeAgo } from '../../util/fetchTimeAgo';
import { getOrderItems } from '../../features/order_item/orderItemSlice';

export default function Order() {
  const token = useSelector(state => state.user.token);
  const orders = useSelector(state => state.order.items);
  const email = useSelector(state => state.user.email);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getOrders(token));
    // eslint-disable-next-line
  }, []);

  const getOrderDetails = (order_id) => {
    console.log(`Get order items for order[${order_id}]`);
    dispatch(getOrderItems({token: token, id: order_id}))
  }

  return (
    <Container>
      { orders.length === 0 ?
          <h3>
            No order for { email }, add payment to &nbsp;
            <Link to='/cart'>Cart</Link>
          </h3>
        : <>
            <h3>Total Orders: {orders.length}</h3>
            <ListGroup  as="ol" numbered>
              { orders.map(order =>
                  <ListGroup.Item
                    as="li"
                    key={order.id}
                    className="d-flex justify-content-between align-items-start"
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{order.status}</div>
                      {fetchTimeAgo(order.created_at)}
                    </div>
                    <div className='me-auto'>
                      <p className={`h3 text-${order.status === 'pending' ? 'info' : order.status === 'processing' ? 'primary' : 'success'}`}>
                        { order.status.toUpperCase() }
                      </p>
                    </div>
                    <Button className="btn-primary" onClick={()=> getOrderDetails(order.id)}>Order Details</Button>
                  </ListGroup.Item>
              )}
            </ListGroup>
          </>
      }
    </Container>
  )
}
