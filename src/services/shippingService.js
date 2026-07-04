import API from "../api/axios";


// ADMIN

export const getShipments = async () => {

  const res = await API.get("/shipping/");

  return res.data;

};


export const createShipment = async (data) => {

  const res = await API.post(
    "/shipping/",
    data
  );

  return res.data;

};


export const updateShipment = async (
  id,
  data
) => {

  const res = await API.put(
    `/shipping/${id}`,
    data
  );

  return res.data;

};


export const deleteShipment = async (id) => {

  const res = await API.delete(
    `/shipping/${id}`
  );

  return res.data;

};



// CUSTOMER

export const getOrderShipping = async (
  orderId
) => {

  const res = await API.get(
    `/shipping/${orderId}`
  );

  return res.data;

};