import API from "../api/axios";

export const getInventory = async () => {
  const res = await API.get("/inventory");
  return res.data;
};

export const getLowStock = async () => {
  const res = await API.get("/inventory/low-stock");
  return res.data;
};

export const updateStock = async (
  productId,
  quantity
) => {

  const res = await API.patch(
    `/inventory/${productId}`,
    null,
    {
      params: {
        quantity,
      },
    }
  );

  return res.data;
};