import API from "../api/axios";

export const getOrders = async () => {
  const res = await API.get("/admin/orders");
  return res.data;
};

export const updateOrderStatus = async (id, status) => {
  const res = await API.put(`/admin/orders/${id}`, {
    status,
  });

  return res.data;
};