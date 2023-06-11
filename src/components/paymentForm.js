import React from "react";
import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import Cookies from "js-cookie";

export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const token = Cookies.get("token");
        const { id } = paymentMethod;
        const response = await axios.post(
          "http://localhost:3232/orders/",
          {
            payment_id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
        }
      } catch (err) {
        console.log("error");
      }
    }
  };

  return (
    <>
      {!success ? (
        <form className="py-5 px-2" onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div>
              <CardElement className=""></CardElement>
            </div>
          </fieldset>
          <button type="submit">Pay</button>
        </form>
      ) : (
        <div>
          <h2>You just bought a sweet spatula</h2>
        </div>
      )}
    </>
  );
}
