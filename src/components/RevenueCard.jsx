const RevenueCard = ({ summary }) => {

  return (

    <div className="grid md:grid-cols-2 gap-6">

      <div className="bg-white shadow rounded-lg p-8">

        <h2 className="text-gray-500">
          Total Revenue
        </h2>

        <p className="text-4xl font-bold text-green-600 mt-3">
          Rs. {summary.total_revenue}
        </p>

      </div>

      <div className="bg-white shadow rounded-lg p-8">

        <h2 className="text-gray-500">
          Total Orders
        </h2>

        <p className="text-4xl font-bold mt-3">
          {summary.total_orders}
        </p>

      </div>

    </div>

  );

};

export default RevenueCard;