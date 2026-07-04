import API from "../api/axios";

export const addToCart = async (productId, quantity = 1) => {
  const res = await API.post("/cart/add", {
    product_id: productId,
    quantity,
  });

  return res.data;
};

export const getCart = async () => {
  const res = await API.get("/cart");
  return res.data;
};

export const removeFromCart = async (itemId) => {
  const res = await API.delete(`/cart/${itemId}`);
  return res.data;
};

export const updateCartQuantity = async (
  cartId,
  quantity
) => {

  const res = await API.patch(
    `/cart/${cartId}`,
    {
      quantity,
    }
  );

  return res.data;
};