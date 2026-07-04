const AdminCouponCard = ({
  coupon,
  onEdit,
  onDelete,
  onToggle,
}) => {

  return (

    <div className="bg-white shadow-lg rounded-lg p-6">

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-2xl font-bold">

            {coupon.code}

          </h2>

          <p className="text-gray-600 mt-2">

            Discount:

            {" "}

            {coupon.type === "percentage"
              ? `${coupon.discount}%`
              : `Rs. ${coupon.discount}`}

          </p>

          <p className="text-gray-600">

            Type:

            {" "}

            {coupon.type}

          </p>

          <p className="text-gray-600">

            Expires:

            {" "}

            {coupon.expires_at
              ? coupon.expires_at.substring(0, 10)
              : "No Expiry"}

          </p>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            coupon.active
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >

          {coupon.active
            ? "Active"
            : "Inactive"}

        </span>

      </div>

      <div className="flex gap-3 mt-6">

        <button
          onClick={() => onEdit(coupon)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >

          Edit

        </button>

        <button
          onClick={() => onToggle(coupon.id)}
          className={`flex-1 py-2 rounded text-white ${
            coupon.active
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >

          {coupon.active
            ? "Disable"
            : "Enable"}

        </button>

        <button
          onClick={() => onDelete(coupon.id)}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded"
        >

          Delete

        </button>

      </div>

    </div>

  );

};

export default AdminCouponCard;