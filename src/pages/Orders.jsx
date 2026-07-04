import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

const Orders = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  const loadOrders = async () => {

    try {

      const res = await API.get("/orders");

      setOrders(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    loadOrders();

  }, []);



  if (loading) {

    return (

      <div className="text-center mt-20 text-xl">
        Loading Orders...
      </div>

    );

  }



  return (

    <div className="max-w-6xl mx-auto p-8">


      <h1 className="text-3xl font-bold mb-8">

        My Orders

      </h1>



      {
        orders.length === 0 ? (

          <div className="bg-white p-6 rounded shadow">

            No Orders Found

          </div>


        ) : (


          orders.map((order) => (


            <div
              key={order.id}
              className="bg-white border rounded-lg p-6 mb-5 shadow"
            >


              <h2 className="font-bold text-lg">

                Order ID:

                <span className="ml-2">

                  {order.id}

                </span>

              </h2>



              <p className="mt-3">

                Status:

                <span className="ml-2 font-semibold text-blue-600">

                  {order.status}

                </span>

              </p>



              <p className="mt-2">

                Payment Status:

                <span className="ml-2 font-semibold">

                  {order.payment_status}

                </span>

              </p>



              <p className="mt-2 text-green-600 font-bold">

                Rs. {order.total_amount}

              </p>



              {/* Tracking Button */}

              <div className="mt-5">


                <Link
                  to={`/track/${order.id}`}
                  className="
                    bg-blue-600
                    text-white
                    px-4
                    py-2
                    rounded
                    inline-block
                    mt-4
                    "
                >
                  Track Shipment
                </Link>
                <Link
                  to={`/orders/${order.id}`}
                  className="
                    bg-gray-800
                    text-white
                    px-4
                    py-2
                    rounded
                    mt-4
                    inline-block
                    "
                >
                  View Details
                </Link>


              </div>


            </div>


          ))

        )

      }


    </div>

  );

};


export default Orders;