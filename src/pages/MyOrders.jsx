import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../services/orderService";

const MyOrders = () => {

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadOrders();

  }, []);

  const loadOrders = async () => {

    try {

      const data = await getOrders();

      setOrders(data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  if (loading)
    return <h2 className="text-center mt-20">Loading...</h2>;

  return (

    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">

        My Orders

      </h1>

      {orders.length === 0 && (

        <div className="text-center">

          <h2>No Orders Yet</h2>

        </div>

      )}

      <div className="space-y-6">

        {orders.map((order) => (

          <div
            key={order.id}
            className="border rounded-xl p-6 shadow bg-white"
          >

            <div className="flex justify-between">

              <div>

                <h2 className="font-bold">

                  Order ID

                </h2>

                <p className="text-gray-500">

                  {order.id}

                </p>

              </div>

              <div>

                <span className="font-semibold">

                  Rs. {order.total_amount}

                </span>

              </div>

            </div>

            <div className="grid md:grid-cols-4 gap-5 mt-6">

              <div>

                <p className="text-gray-500">

                  Status

                </p>

                <p>

                  {order.status}

                </p>

              </div>

              <div>

                <p className="text-gray-500">

                  Payment

                </p>

                <p>

                  {order.payment_status}

                </p>

              </div>

              <div>

                <p className="text-gray-500">

                  Method

                </p>

                <p>

                  {order.payment_method}

                </p>

              </div>

              <div>

                <p className="text-gray-500">

                  Date

                </p>

                <p>

                  {new Date(order.created_at).toLocaleDateString()}

                </p>

              </div>

            </div>

            <div className="mt-6">

              <Link

                to={`/orders/${order.id}`}

                className="bg-blue-600 text-white px-5 py-2 rounded"

              >

                View Details

              </Link>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default MyOrders;