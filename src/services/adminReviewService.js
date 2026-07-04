import API from "../api/axios";

export const getReviews = async () => {
  const res = await API.get("/admin/reviews");
  return res.data;
};

export const getReviewStats = async () => {
  const res = await API.get("/admin/reviews/stats");
  return res.data;
};

export const deleteReview = async (id) => {
  const res = await API.delete(`/admin/reviews/${id}`);
  return res.data;
};