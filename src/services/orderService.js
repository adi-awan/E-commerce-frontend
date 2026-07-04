import API from "../api/axios";

export const checkout = async (data) => {
  const res = await API.post("/orders/checkout", data);
  return res.data;
};

export const getOrders = async () => {
  const res = await API.get("/orders");

  return res.data;
};
export const getOrder = async (id) => {

  const res = await API.get(`/orders/${id}`);

  return res.data;

};
export const downloadInvoice = async (id) => {

  const response = await API.get(
    `/orders/${id}/invoice`,
    {
      responseType: "blob",
    }
  );

  return response.data;

};
export const cancelOrder = async (id) => {
  const res = await API.put(`/orders/${id}/cancel`);
  return res.data;
};