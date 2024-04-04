"use client"

import React, { useState } from "react"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import api from "@/lib/api"

export default function PaymentForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [paymentError, setPaymentError] = useState<any>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    // @ts-ignore
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    })

    if (error) {
      console.error("Error creating payment method:", error)
      setPaymentError(error.message || "An error occurred while creating the payment method.")
    } else {
      console.log("Payment method created:", paymentMethod)

      // Enviar os detalhes do pagamento para o backend
      try {
        const response = await api.post("/confirm-payment", {
          amount: 1000, // Valor em centavos
          currency: "usd", // Moeda
          paymentMethodId: paymentMethod.id,
        })
        console.log("Payment confirmed:", response.data)
        // Lidar com o pagamento confirmado
      } catch (error) {
        console.error("Error confirming payment:", error)
        // Lidar com o erro
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={{ hidePostalCode: true, style: { base: { fontSize: "16px" } } }} />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {paymentError && <div>{paymentError}</div>}
    </form>
  )
}
