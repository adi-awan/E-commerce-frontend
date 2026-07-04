const ShippingCard = ({
  shipment,
  onEdit,
  onDelete,
}) => {

  const badgeColor = {
    Pending: "bg-gray-200 text-gray-700",
    Packed: "bg-yellow-200 text-yellow-800",
    Shipped: "bg-blue-200 text-blue-800",
    "In Transit": "bg-purple-200 text-purple-800",
    "Out For Delivery": "bg-orange-200 text-orange-800",
    Delivered: "bg-green-200 text-green-800",
  };

  return (
    <div className="bg-white shadow rounded-xl p-6">

      <div className="flex justify-between items-center">

        <h2 className="font-bold">
          Order #{shipment.order_id}
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-sm ${
            badgeColor[shipment.status] ||
            "bg-gray-200"
          }`}
        >
          {shipment.status}
        </span>

      </div>

      <div className="mt-4 space-y-2">

        <p>
          <strong>Courier:</strong>
          {" "}
          {shipment.courier || "-"}
        </p>

        <p>
          <strong>Tracking:</strong>
          {" "}
          {shipment.tracking_number || "-"}
        </p>

        <p>
          <strong>Delivery:</strong>
          {" "}
          {shipment.estimated_delivery || "-"}
        </p>

      </div>

      <div className="flex gap-3 mt-6">

        <button
          onClick={() => onEdit(shipment)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(shipment.id)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Delete
        </button>

      </div>

    </div>
  );
};

export default ShippingCard;