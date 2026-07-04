import API from "../api/axios";

export const getReviews = async (productId) => {
  const res = await API.get(`/reviews/${productId}`);
  return res.data;
};

export const addReview = async (data) => {
  const res = await API.post("/reviews", data);
  return res.data;
};

export const updateReview = async (id, data) => {
  const res = await API.put(`/reviews/${id}`, data);
  return res.data;
};

export const deleteReview = async (id) => {
  const res = await API.delete(`/reviews/${id}`);
  return res.data;
};

