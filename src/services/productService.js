import API from "../api/axios";

export const getProducts = () =>
  API.get("/products");

export const getProduct = (id) =>
  API.get(`/products/${id}`);
export const getRelatedProducts = async (id) => {
  const res = await API.get(`/products/${id}/related`);
  return res.data;
};