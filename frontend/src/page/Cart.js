import React from 'react';
import { useSelector } from 'react-redux';
import CartProduct from "../component/CartProduct";
import empty from "../asset/empty.gif";
import toast from 'react-hot-toast';
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from 'react-router';

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Function to safely parse price strings
  const parsePrice = (priceString) => {
    if (typeof priceString === "number") return priceString; // If already a number
    if (typeof priceString !== "string") return 0; // If not a string, default to 0
    return parseFloat(priceString.replace(/,/g, '')) || 0; // Remove commas and convert to float
  };

  // Calculate total price and quantity
  const totalPrice = productCartItem.reduce((acc, curr) => {
    const price = parsePrice(curr.price || 0); // Convert price to float
    const total = curr.total ? parsePrice(curr.total) : curr.qty * price; // Convert total to float
    return acc + total; // Accumulate total
  }, 0);

  const totalQty = productCartItem.reduce((acc, curr) => {
    const qty = curr.qty ? parseInt(curr.qty, 10) : 0; // Parse quantity
    return acc + qty; // Accumulate quantity
  }, 0);

  const handlePayment = async () => {
    if (user.email) {
      try {
        const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
        const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/checkout-payment`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(
            productCartItem.map((item) => ({
              ...item,
              price: parsePrice(item.price), // Convert price to float for backend
              total: parsePrice(item.total), // Convert total to float for backend
            }))
          ),
        });

        if (res.statusCode === 500) {
          console.error("Server error during payment initialization");
          return;
        }

        const data = await res.json();
        toast("Redirecting to payment gateway");
        stripePromise.redirectToCheckout({ sessionId: data });
      } catch (error) {
        console.error("Error during payment:", error);
        toast.error("Payment failed. Please try again.");
      }
    } else {
      toast("You have not logged in. Please login.");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };

  return (
    <>
      <div className='p-2 md:p-4'>
        <h2 className='text-lg md:text-2xl font-bold text-slate-600'>Your Cart Items</h2>
        {productCartItem[0] ? (
          <div className='my-4 flex gap-3'>
            {/* Display cart items */}
            <div className='w-full max-w-3xl'>
              {productCartItem.map((el) => (
                <CartProduct
                  key={el._id}
                  id={el._id}
                  name={el.name}
                  image={el.image}
                  category={el.category}
                  qty={el.qty}
                  total={parsePrice(el.total)} // Convert total to float
                  price={parsePrice(el.price)} // Convert price to float
                />
              ))}
            </div>

            {/* Summary Section */}
            <div className='w-full max-w-md ml-auto'>
              <h2 className='bg-blue-500 text-white p-2 text-lg'>Summary</h2>
              <div className='flex w-full py-2 text-lg border-b'>
                <p>Total Qty:</p>
                <p className='ml-auto w-32 font-bold'>{totalQty}</p>
              </div>
              <div className='flex w-full py-2 text-lg border-b'>
                <p>Total Price:</p>
                <p className='ml-auto w-32 font-bold'>
                  <span className='text-red-500'>$</span>{totalPrice.toFixed(2)}
                </p>
              </div>
              <button
                className='bg-red-500 w-full text-lg font-bold py-2 text-white'
                onClick={handlePayment}
              >
                Payment
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className='flex w-full justify-center items-center flex-col'>
              <img src={empty} alt="emptyCart" className='w-full max-w-sm' />
              <p className='text-slate-500 text-3xl font-bold'>Empty Cart</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
