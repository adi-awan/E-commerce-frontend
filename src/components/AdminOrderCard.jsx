const AdminOrderCard = ({ order, onStatusChange }) => {

  const getStatusColor = () => {
    switch (order.status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Processing":
        return "bg-blue-100 text-blue-700";

      case "Shipped":
        return "bg-purple-100 text-purple-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      {/* Header */}

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-xl font-bold">
            Order #{order.id}
          </h2>

          <p className="text-gray-500 text-sm">
            {new Date(order.created_at).toLocaleString()}
          </p>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor()}`}
        >
          {order.status}
        </span>

      </div>

      {/* Customer */}

      <div className="mt-6">

        <h3 className="font-bold text-lg mb-2">
          Customer Information
        </h3>

        <p><strong>Name:</strong> {order.shipping?.full_name}</p>
        <p><strong>Email:</strong> {order.shipping?.email}</p>
        <p><strong>Phone:</strong> {order.shipping?.phone}</p>

      </div>

      {/* Address */}

      <div className="mt-5">

        <h3 className="font-bold text-lg mb-2">
          Shipping Address
        </h3>

        <p>{order.shipping?.address}</p>
        <p>{order.shipping?.city}</p>
        <p>{order.shipping?.postal_code}</p>

      </div>

      {/* Products */}

      <div className="mt-6">

        <h3 className="font-bold text-lg mb-3">
          Ordered Products
        </h3>

        {order.items?.map((item) => (

          <div
            key={item.id}
            className="flex items-center justify-between border rounded-lg p-3 mb-3"
          >

            <div className="flex gap-3">

              <img
                src={item.products.image_url}
                alt={item.products.name}
                className="w-16 h-16 rounded-lg object-cover"
              />

              <div>

                <p className="font-semibold">
                  {item.products.name}
                </p>

                <p className="text-gray-500">
                  Quantity: {item.quantity}
                </p>

              </div>

            </div>

            <p className="font-bold">
              Rs. {item.price}
            </p>

          </div>

        ))}

      </div>

      {/* Payment */}

      <div className="mt-6 border-t pt-5">

        <p>
          <strong>Payment Method:</strong>{" "}
          {order.payment_method}
        </p>

        <p>
          <strong>Payment Status:</strong>{" "}
          {order.payment_status}
        </p>

        <p className="text-2xl font-bold text-green-600 mt-3">
          Total: Rs. {order.total_amount}
        </p>

      </div>

      {/* Update Status */}

      <div className="mt-6">

        <label className="block font-semibold mb-2">
          Update Order Status
        </label>

        <select
          value={order.status}
          onChange={(e) =>
            onStatusChange(order.id, e.target.value)
          }
          className="w-full border rounded-lg p-3"
        >
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>

      </div>

    </div>
  );
};

export default AdminOrderCard;