import { useEffect, useState } from "react";

import {
  getOrders,
  updateOrderStatus,
} from "../services/adminOrderService";

import AdminOrderCard from "../components/AdminOrderCard";

const AdminOrders = () => {

  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
  try {
    const data = await getOrders();
    setOrders(data);

  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {

    loadOrders();

  }, []);

  const changeStatus = async (
    id,
    status
  ) => {

    try {

      await updateOrderStatus(
        id,
        status
      );

      loadOrders();

      alert("Order Updated");

    } catch (error) {

      console.log(error);

    }
  };

  return (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          Order Management
        </h1>
        <p className="text-gray-500 mt-2">
          View and manage customer orders.
        </p>
      </div>

      {/* Empty State */}
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-200 py-20">

          <div className="text-7xl mb-4">📦</div>

          <h2 className="text-2xl font-semibold text-gray-700">
            No Orders Found
          </h2>

          <p className="text-gray-500 mt-2 text-center max-w-md">
            There are currently no customer orders.
            Once customers place orders, they will appear here.
          </p>

        </div>
      ) : (

        <>
          {/* Total Orders */}
          <div className="mb-6">
            <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-700 px-4 py-2 text-sm font-semibold">
              Total Orders: {orders.length}
            </span>
          </div>

          {/* Orders Grid */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {orders.map((order) => (
              <AdminOrderCard
                key={order.id}
                order={order}
                onStatusChange={changeStatus}
              />
            ))}
          </div>
        </>
      )}
    </div>
  </div>
);
};

export default AdminOrders;