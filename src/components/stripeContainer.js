import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./paymentForm";
import React from "react";

const PUBLIC_KEY =
  "pk_test_51NFG9NCmP4UFiokdh07bmbvyyeIZNrfGVhEgg2Bl6Q5mwoPkzjngyzZcOMsRCYASGrC9qOuqb4B1luD6v4rOuow100D9iJCU89";

const stripeTestPromise = loadStripe(PUBLIC_KEY);
export default function StripeContainer() {
  return (
    <Elements className="p-4" stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
}
