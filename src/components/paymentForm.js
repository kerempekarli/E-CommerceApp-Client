import React from "react";
import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import Cookies from "js-cookie";

export default function PaymentForm() {
  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        zIndex: 30,
        iconColor: "#c4f0ff",
        color: "#ffffff",
        fontWeight: 500,
        backgroundColor: "#0d36db",
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "32px",
        fontSmoothing: "antialiased",
        maxWidth: "400px",
        ":-webkit-autofill": { color: "#fce883" },
        "::placeholder": { color: "#87bbfd" },
      },
      invalid: {
        iconColor: "#db0d30",
        color: "#db0d30",
      },
    },
  };
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
        <form className="py-5 px-2 max-w-2xl mx-auto" onSubmit={handleSubmit}>
          <fieldset className="text-white">
            <div>
              <CardElement options={CARD_OPTIONS}></CardElement>
            </div>
          </fieldset>
          <button
            className="text-white bg-blue-600 font-semibold  px-20 text-2xl py-5 rounded-xl mt-4"
            type="submit"
          >
            Pay
          </button>
        </form>
      ) : (
        <div>
          <h2>You just bought a sweet spatula</h2>
        </div>
      )}
    </>
  );
}
