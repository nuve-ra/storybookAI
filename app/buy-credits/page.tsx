// "use client";
// import React, { useState } from 'react';
// import { PayPalButtons } from "@paypal/react-paypal-js";

// function BuyCredit() {
//   const Options = [
//     {
//       id: 1,
//       price: 1.99,
//       credits: 10
//     },
//     {
//       id: 2,
//       price: 2.99,
//       credits: 30
//     },
//     {
//       id: 3,
//       price: 5.99,
//       credits: 75
//     },
//     {
//       id: 4,
//       price: 8.99,
//       credits: 70
//     }
//   ];

//   const [selectedOption, setSelectedOption] = useState<number | null>(null);

//   return (
//     <div className="min-h-screen text-center p-10 md:px-20 lg:px-40 bg-white">
//       <h2 className="text-3xl font-bold text-black">Add More Credits</h2>
//       <div className="grid grid-cols-2 md:grid-cols-2 mt-10 gap-10 items-center justify-center">
//         {Options.map((option) => (
//           <div
//             key={option.id}
//             className={`p-6 my-3 border rounded-lg cursor-pointer transition-all text-center
//               hover:scale-105
//               ${selectedOption === option.id ? 'bg-black text-white' : 'bg-primary'}`}
//             onClick={() => setSelectedOption(option.id)}
//           >
//             <h2>
//               Get {option.credits} Credit{option.credits > 1 ? 's' : ''} = {option.credits} Story
//             </h2>
//             <h2>${option.price}</h2>
//           </div>
//         ))}
//       </div>
//       <div>
//         <PayPalButtons style={{ layout: "vertical" }} disabled={!selectedOption} />

//       </div>
//     </div>
//   );
// }

// export default BuyCredit;
'use client';
import React, { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

function BuyCredit() {
  const Options = [
    { id: 1, price: 1.99, credits: 10 },
    { id: 2, price: 2.99, credits: 30 },
    { id: 3, price: 5.99, credits: 75 },
    { id: 4, price: 8.99, credits: 70 },
  ];

  const [selectedOption, setSelectedOption] = useState<number | null>(0);

  const selected = Options.find((opt) => opt.id === selectedOption);

  return (
    <div className="min-h-screen text-center p-10 md:px-20 lg:px-40 bg-white">
      <h2 className="text-3xl font-bold text-black">Add More Credits</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 mt-10 gap-10 items-center justify-center">
        {Options.map((option) => (
          <button
            key={option.id}
            className={`p-6 my-3 border rounded-lg cursor-pointer transition-all text-center 
      hover:scale-105 w-full
      ${selectedOption === option.id ? 'bg-black text-white' : 'bg-primary'}`}
            type="button"
            onClick={() => setSelectedOption(option.id)}
          >
            <h2>
              Get {option.credits} Credit{option.credits > 1 ? 's' : ''} ={' '}
              {option.credits} Story
            </h2>
            <h2>${option.price}</h2>
          </button>
        ))}
      </div>

      <div className="mt-10">
        <PayPalButtons
          disabled={!selected}
          style={{ layout: 'vertical' }}
          // eslint-disable-next-line react/jsx-sort-props
          onApprove={async () => {
            alert('Payment successful!');
          }}
          forceReRender={[selectedOption]} // triggers rerender if option changes
          //@ts-ignore
          createOrder={(data, actions) => {
            if (!selected) return;

            return actions.order.create({
              purchase_units: [
                {
                  //@ts-ignore
                  amount: {
                    value: selected.price.toFixed(2),
                  },
                  description: `${selected.credits} credits`,
                },
              ],
            });
          }}
        />
      </div>
    </div>
  );
}

export default BuyCredit;
