import { useParams, Link } from "react-router-dom";

const OrderSuccess = () => {

  const { orderId } = useParams();

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-xl rounded-xl p-10 max-w-lg w-full text-center">

        <div className="text-6xl mb-4">
          ✅
        </div>

        <h1 className="text-3xl font-bold text-green-600">
          Order Placed Successfully
        </h1>

        <p className="mt-5 text-gray-600">
          Thank you for your purchase.
        </p>

        <div className="mt-6 bg-gray-100 rounded-lg p-4">

          <p className="font-semibold">
            Order ID
          </p>

          <p className="text-blue-600 break-all">
            {orderId}
          </p>

        </div>

        <p className="mt-6 text-gray-500">
          Your order has been received and is now being processed.
        </p>

        <div className="mt-8 flex gap-4">

          <Link
            to="/orders"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
          >
            My Orders
          </Link>

          <Link
            to="/"
            className="flex-1 bg-gray-200 hover:bg-gray-300 py-3 rounded-lg"
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </div>

  );

};

export default OrderSuccess;