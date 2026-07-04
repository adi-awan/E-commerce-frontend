import API from "../api/axios";

export const getRevenue = async () => {
  const res = await API.get("/analytics/revenue");
  return res.data;
};

export const getTopProducts = async () => {
  const res = await API.get("/analytics/top-products");
  return res.data;
};