import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PAYMENT_INTENT } from '../../constants/constant';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../features/order/orderSlice';

const PaymentForm = ({ paymentAmount, cartItems }) => {
  const stripe = useStripe();
  const elements = useElements();
  const token = useSelector(state => state.user.token);
  const email = useSelector(state => state.user.email);
  const name = useSelector(state => state.user.name);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const centsToDollars = paymentAmount * 100;
    const response = await fetch(`${PAYMENT_INTENT}/?amount=${centsToDollars}&email=${email}&name=${name}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log({data})

    // Use the client secret to confirm the payment on the client side
    const result = await stripe.confirmCardPayment(data.client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: name,
          email: email,
        },
      },
      
    });

    if (result.error) {
      console.error(result.error.message);
    } else {
      // Payment successful
      console.log('Payment succeeded:', result.paymentIntent);
    }
    dispatch(createOrder({token: token, cartItems: cartItems}))
    navigate('/orders');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <CardElement className='form-control'/>
      <div className='d-flex justify-content-center mt-5'>
        <Button type="submit" className="btn-primary" size='lg'>Proceed to Payment</Button>
      </div>
    </Form>
  );
};

export default PaymentForm;
