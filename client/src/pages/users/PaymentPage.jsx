import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../../components/paymentpage/PaymentForm";
import { useState, useEffect } from "react";
const stripePromise = loadStripe(`${import.meta.env.STRIPE_PUBLIC_KEY}`);

const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default PaymentPage;
