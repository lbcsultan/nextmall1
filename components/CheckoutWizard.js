import React from 'react'

export default function CheckoutWizard({ activeStep = 0 }) {
  const steps = [
    'User Login',
    'Shipping Address',
    'Payment Method',
    'Place Order',
  ]

  return (
    <div className="mb-5 flex flex-row flex-wrap">
      {steps.map((step, index) => (
        <div
          key={step}
          className={`flex-1 border-b-2 text-center ${
            index <= activeStep
              ? 'border-indigo-500 text-indigo-r00'
              : 'border-gray-400 text-gray-400'
          }`}
        >
          {step}
        </div>
      ))}
    </div>
  )
}
