import API from "../api/axios";

export const getStats = async () => {
  const res = await API.get("/admin/stats");
  return res.data;
};

export const getRecentOrders = async () => {
  const res = await API.get("/admin/recent-orders");
  return res.data;
};

export const getLowStockProducts = async () => {
  const res = await API.get("/admin/low-stock");
  return res.data;
};