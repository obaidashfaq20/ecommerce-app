// containers/PaymentContainer.js
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentContainer = ({ payment_amount, cartItems }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm paymentAmount={payment_amount} cartItems={cartItems} />
    </Elements>
  );
};

export default PaymentContainer;
