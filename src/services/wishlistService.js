import API from "../api/axios";

export const getWishlist = async () => {
  const res = await API.get("/wishlist");
  return res.data;
};

export const addWishlist = async (productId) => {
  const res = await API.post("/wishlist/add", {
    product_id: productId,
  });

  return res.data;
};

export const removeWishlist = async (itemId) => {
  const res = await API.delete(`/wishlist/${itemId}`);
  return res.data;
};