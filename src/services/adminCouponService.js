import API from "../api/axios";

export const getCoupons = async () => {
  const res = await API.get("/coupons/");
  return res.data;
};

export const createCoupon = async (data) => {
  const res = await API.post("/coupons/", data);
  return res.data;
};

export const updateCoupon = async (id, data) => {
  const res = await API.put(`/coupons/${id}`, data);
  return res.data;
};

export const deleteCoupon = async (id) => {
  const res = await API.delete(`/coupons/${id}`);
  return res.data;
};

export const toggleCoupon = async (id) => {
  const res = await API.patch(`/coupons/${id}/toggle`);
  return res.data;
};