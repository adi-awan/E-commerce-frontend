import API from "../api/axios";

export const getSuggestions = async (keyword) => {
  const res = await API.get("/products/suggestions", {
    params: {
      keyword,
    },
  });

  return res.data;
};