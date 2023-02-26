import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "../App.css";

const stripePromise = loadStripe("pk_test_51Mb8mPF6RxBlwxAlmEu6D4T8OjxlLgUVYdik8EsfRKCrZNmxoAKDZt6SQYajGiJaSjWoWssvSVjS6tpkIsFLdx6R00gFrAg0bO");

export default function App() {
    const [clientSecret, setClientSecret] = useState("");
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("/payment/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [{ id: "price_1MdKakF6RxBlwxAlsO5acLa9" }],
                email: "",
                name: "",
                description: "",
            }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const appearance = {
        theme: 'flat',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="login-form">
            <h1>BackAppX Pro Plan</h1>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );
}