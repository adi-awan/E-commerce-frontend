import API from "../api/axios";

export const getSalesReport = async () => {

  const res = await API.get("/reports/sales");

  return res.data;

};