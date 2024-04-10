"use client"

import { Elements } from "@stripe/react-stripe-js"
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js"
import PaymentForm from "./PaymentForm"

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

export default function App() {
  const options: StripeElementsOptions = {
    mode: "payment",
    payment_method_types: ["card"],
    amount: 1000,
    currency: "usd",
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm />
    </Elements>
  )
}
