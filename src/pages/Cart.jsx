import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getCart,
  removeFromCart,
  updateCartQuantity 
} from "../services/cartService";

const Cart = () => {
  const [items, setItems] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await getCart();

      setItems(res.items || []);
    } catch (error) {
      console.log(error);
    }
  };
  const handleIncrease = async (item) => {
  try {

    const updated = items.map(cartItem =>
      cartItem.id === item.id
        ? {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          }
        : cartItem
    );

    setItems(updated);

    await updateCartQuantity(
      item.id,
      item.quantity + 1
    );

  } catch (error) {
    fetchCart();
  }
};

const handleDecrease = async (item) => {

  if (item.quantity === 1) return;

  try {

    const updated = items.map(cartItem =>
      cartItem.id === item.id
        ? {
            ...cartItem,
            quantity: cartItem.quantity - 1,
          }
        : cartItem
    );

    setItems(updated);

    await updateCartQuantity(
      item.id,
      item.quantity - 1
    );

  } catch (error) {
    fetchCart();
  }
};

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (id) => {
    try {
      await removeFromCart(id);

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };
  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const total = items.reduce(
    (sum, item) =>
      sum +
      item.quantity *
        item.products.price,
    0
  );

 return (
  <div className="min-h-screen bg-gray-100">
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          🛒 Shopping Cart
        </h1>
        <p className="text-gray-500 mt-2">
          Review your selected products before checkout.
        </p>
      </div>

      {items.length === 0 ? (

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 py-24 px-8 flex flex-col items-center text-center">

          {/* Cart Icon */}
          <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center mb-6">
            <span className="text-6xl">🛒</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-800">
            Your Cart is Empty
          </h2>

          <p className="text-gray-500 mt-4 max-w-lg leading-relaxed">
            Looks like you haven't added anything to your cart yet.
            Browse our products and add your favorite items before checking out.
          </p>

          <Link
            to="/products"
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition shadow-md"
          >
            Continue Shopping
          </Link>

        </div>

      ) : (

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT SIDE */}

          <div className="lg:col-span-2 space-y-6">

            {items.map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md border p-6 flex justify-between items-center hover:shadow-lg transition"
              >

                <div className="flex gap-5">

                  <img
                    src={item.products.image_url}
                    alt={item.products.name}
                    className="w-28 h-28 object-cover rounded-lg"
                  />

                  <div>

                    <h2 className="text-2xl font-bold">
                      {item.products.name}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      Rs. {item.products.price}
                    </p>

                    <div className="flex items-center gap-4 mt-5">

                      <button
                        onClick={() => handleDecrease(item)}
                        className="w-10 h-10 rounded-full bg-red-500 text-white hover:bg-red-600"
                      >
                        -
                      </button>

                      <span className="font-bold text-xl">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => handleIncrease(item)}
                        className="w-10 h-10 rounded-full bg-green-600 text-white hover:bg-green-700"
                      >
                        +
                      </button>

                    </div>

                    <p className="mt-4 text-lg font-semibold">
                      Subtotal
                      <span className="text-blue-600 ml-2">
                        Rs. {item.products.price * item.quantity}
                      </span>
                    </p>

                  </div>

                </div>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-lg"
                >
                  Remove
                </button>

              </div>

            ))}

          </div>

          {/* RIGHT SIDE */}

          <div>

            <div className="bg-white shadow-xl rounded-xl p-8 sticky top-28">

              <h2 className="text-2xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 border-b pb-5 mb-5">

                {items.map((item) => (

                  <div
                    key={item.id}
                    className="flex justify-between"
                  >

                    <div>

                      <p className="font-medium">
                        {item.products.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>

                    </div>

                    <p className="font-semibold">
                      Rs. {item.products.price * item.quantity}
                    </p>

                  </div>

                ))}

              </div>

              <div className="space-y-4">

                <div className="flex justify-between">
                  <span>Total Products</span>
                  <span>{totalItems}</span>
                </div>

                <div className="flex justify-between">
                  <span>Different Items</span>
                  <span>{items.length}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">
                    Free
                  </span>
                </div>

              </div>

              <div className="border-t mt-6 pt-6 flex justify-between text-2xl font-bold">

                <span>Grand Total</span>

                <span className="text-green-600">
                  Rs. {total}
                </span>

              </div>

              <Link
                to="/checkout"
                className="mt-8 block w-full bg-green-600 hover:bg-green-700 text-white text-center py-4 rounded-lg text-lg font-semibold transition"
              >
                Proceed to Checkout
              </Link>

            </div>

          </div>

        </div>

      )}

    </div>
  </div>
);
};

export default Cart;