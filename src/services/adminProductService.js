import API from "../api/axios";

export const getProducts = async () => {
  const res = await API.get("/products");
  return res.data;
};

export const createProduct = async (data) => {
  const res = await API.post("/products", data);
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await API.put(`/products/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await API.delete(`/products/${id}`);
  return res.data;
};

export const uploadImage = async (file) => {

  const formData = new FormData();

  formData.append("file", file);

  const token = localStorage.getItem("token");

  const res = await API.post(
    "/products/upload-image",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};