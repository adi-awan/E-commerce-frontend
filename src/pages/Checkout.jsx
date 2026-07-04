import { useState } from "react";
import { checkout } from "../services/orderService";
import { useNavigate } from "react-router-dom";

const Checkout = () => {

  const [loading, setLoading] = useState(false);

  const [paymentMethod, setPaymentMethod] =
    useState("cod");

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    postal_code: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleCheckout = async () => {

    if (
      !form.full_name ||
      !form.email ||
      !form.phone ||
      !form.city ||
      !form.address
    ) {

      alert("Please fill all required fields.");

      return;

    }

    try {

      setLoading(true);

      const data = {
        ...form,
        payment_method: paymentMethod,
      };

      const res = await checkout(data);

      navigate(`/order-success/${res.order_id}`);

    } catch (error) {

      console.log(error);

      alert("Checkout Failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="max-w-6xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-10">

        Checkout

      </h1>

      <div className="grid md:grid-cols-2 gap-10">

        {/* LEFT */}

        <div className="bg-white shadow-lg rounded-xl p-8">

          <h2 className="text-2xl font-bold mb-6">

            Billing Details

          </h2>

          <div className="space-y-5">

            <input
              name="full_name"
              placeholder="Full Name"
              value={form.full_name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            <textarea
              name="address"
              placeholder="Shipping Address"
              value={form.address}
              onChange={handleChange}
              rows="4"
              className="w-full border rounded-lg p-3"
            />

            <input
              name="postal_code"
              placeholder="Postal Code"
              value={form.postal_code}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

          </div>

        </div>

        {/* RIGHT */}

        <div className="bg-white shadow-lg rounded-xl p-8">

          <h2 className="text-2xl font-bold mb-6">

            Payment Method

          </h2>

          <div className="space-y-5">

            <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer">

              <input
                type="radio"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />

              Cash on Delivery

            </label>

            <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer">

              <input
                type="radio"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) =>
                  setPaymentMethod(e.target.value)
                }
              />

              Credit / Debit Card

            </label>

          </div>

          <hr className="my-8" />

          <h2 className="text-2xl font-bold">

            Order Summary

          </h2>

          <div className="mt-5 space-y-3">

            <div className="flex justify-between">

              <span>

                Shipping

              </span>

              <span className="text-green-600">

                Free

              </span>

            </div>

            <div className="flex justify-between">

              <span>

                Payment

              </span>

              <span>

                {paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : "Credit Card"}

              </span>

            </div>

          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full mt-10 bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg text-lg font-semibold"
          >

            {loading
              ? "Processing..."
              : paymentMethod === "cod"
              ? "Confirm Order"
              : "Proceed to Payment"}

          </button>

        </div>

      </div>

    </div>

  );

};

export default Checkout;