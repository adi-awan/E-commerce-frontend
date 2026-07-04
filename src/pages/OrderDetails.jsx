import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { Link } from "react-router-dom";
import {
  downloadInvoice,
  cancelOrder,
} from "../services/orderService";


const OrderDetails = () => {

  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleInvoice = async () => {

    const blob = await downloadInvoice(order.order.id);

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `Invoice-${order.order.id}.pdf`;

    link.click();

  };



  const loadOrder = async () => {

    try {

      const res =
        await API.get(`/orders/${id}`);

      setOrder(res.data);

    }
    catch (error) {

      console.log(error);

    }
    finally {

      setLoading(false);

    }

  };
  const handleCancelOrder = async () => {

    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) return;

    try {

      await cancelOrder(order.order.id);

      alert("Order cancelled successfully.");

      loadOrder();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.detail ||
        "Unable to cancel order."
      );

    }

  };


  useEffect(() => {

    loadOrder();

  }, []);



  if (loading) {

    return (

      <div className="text-center mt-20">

        Loading...

      </div>

    );

  }



  if (!order) {

    return (

      <div className="text-center mt-20">

        Order not found

      </div>

    );

  }



  return (

    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">

        Order Details

      </h1>



      <div className="bg-white shadow rounded-xl p-6">



        <div className="flex justify-between">


          <div>

            <h2 className="font-bold text-xl">

              Order #{order.order.id}

            </h2>


            <p className="text-gray-500">

              {new Date(order.order.created_at)
                .toLocaleDateString()}

            </p>


          </div>



          <span className="font-bold text-blue-600">

            {order.order.status}

          </span>


        </div>




        {/* Products */}


        <h2 className="text-2xl font-bold mt-8 mb-4">

          Products

        </h2>



        {
          order.items.map((item) => (


            <div
              key={item.id}
              className="flex justify-between border-b py-4"
            >


              <div>


                <p className="font-semibold">

                  {item.products?.name}

                </p>
                <img
                  src={item.products.image}
                  className="w-20 h-20 rounded object-cover"
                />


                <p>

                  Quantity:
                  {" "}
                  {item.quantity}

                </p>


              </div>



              <p className="font-bold">

                Rs.
                {" "}
                {item.price}

              </p>


            </div>


          ))
        }





        {/* Payment */}


        <div className="mt-8">


          <h2 className="text-2xl font-bold">

            Payment

          </h2>


          <p className="mt-3">

            Method:
            {" "}
            {order.order.payment_method}

          </p>



          <p>

            Status:
            {" "}
            {order.order.payment_status}

          </p>


        </div>


        <div className="mt-8 text-right">


          <p className="text-3xl font-bold text-green-600">

            Rs.
            {" "}
            {order.order.total_amount}

          </p>


        </div>



      </div>
      <div className="mt-8">

        <h2 className="text-2xl font-bold mb-4">
          Shipping Address
        </h2>

        <div className="border rounded-lg p-5">

          <p><strong>Name:</strong> {order.shipping.full_name}</p>

          <p><strong>Email:</strong> {order.shipping.email}</p>

          <p><strong>Phone:</strong> {order.shipping.phone}</p>

          <p><strong>City:</strong> {order.shipping.city}</p>

          <p><strong>Address:</strong> {order.shipping.address}</p>

          <p><strong>Postal Code:</strong> {order.shipping.postal_code}</p>

        </div>

      </div>

      <div className="mt-8 flex justify-end gap-4">

        {order.order.status === "Pending" && (
          <button
            onClick={handleCancelOrder}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Cancel Order
          </button>
        )}

        <button
          onClick={handleInvoice}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Download Invoice
        </button>

        <Link
          to={`/track/${order.order.id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Track Order
        </Link>

      </div>


    </div>

  );

};

export default OrderDetails;