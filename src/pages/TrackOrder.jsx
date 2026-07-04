import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

const TrackOrder = () => {

  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);


  const loadOrder = async () => {

    try {

      const res = await API.get(`/orders/track/${id}`);

      setOrder(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    loadOrder();

  }, []);



  if (loading) {
    return (
      <div className="text-center mt-20">
        Loading Tracking...
      </div>
    );
  }



  if (!order) {
    return (
      <div className="text-center mt-20">
        Order Not Found
      </div>
    );
  }



  return (

  <div className="max-w-4xl mx-auto p-8">

    <h1 className="text-3xl font-bold mb-8">
      Track Order
    </h1>

    <div className="bg-white shadow rounded-lg p-8">

      <h2 className="font-bold text-2xl mb-6">
        Order #{order.id}
      </h2>

      <div className="space-y-4">

        <p>

          <strong>Status:</strong>

          <span
            className={`ml-2 font-bold
              ${
                order.status === "Delivered"
                  ? "text-green-600"
                  : order.status === "Shipped"
                  ? "text-blue-600"
                  : order.status === "Cancelled"
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
          >

            {order.status}

          </span>

        </p>

        <p>

          <strong>Payment Status:</strong>

          <span className="ml-2 font-semibold">

            {order.payment_status}

          </span>

        </p>

        <p>

          <strong>Payment Method:</strong>

          <span className="ml-2">

            {order.payment_method}

          </span>

        </p>

        <p>

          <strong>Total Amount:</strong>

          <span className="ml-2 font-bold text-green-600">

            Rs. {order.total_amount}

          </span>

        </p>

        <p>

          <strong>Order Date:</strong>

          <span className="ml-2">

            {new Date(order.created_at).toLocaleString()}

          </span>

        </p>

        {order.tracking_number && (

          <p>

            <strong>Tracking Number:</strong>

            <span className="ml-2 font-semibold">

              {order.tracking_number}

            </span>

          </p>

        )}

      </div>

      <hr className="my-10" />

      <div className="flex items-center justify-between">

        {[
          "Pending",
          "Processing",
          "Shipped",
          "Delivered"
        ].map((step, index) => {

          const current = [
            "Pending",
            "Processing",
            "Shipped",
            "Delivered"
          ].indexOf(order.status);

          const completed = index <= current;

          return (

            <div
              key={step}
              className="flex flex-col items-center flex-1"
            >

              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold
                  ${
                    completed
                      ? "bg-green-600"
                      : "bg-gray-300"
                  }`}
              >

                ✓

              </div>

              <p className="mt-3 text-sm font-medium text-center">

                {step}

              </p>

            </div>

          );

        })}

      </div>

    </div>

  </div>

);

};


export default TrackOrder;