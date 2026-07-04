import API from "../api/axios";

export const getUsers = async () => {
  const res = await API.get("/admin/users");
  return res.data;
};

export const updateUserRole = async (id, role) => {
  const res = await API.put(`/admin/users/${id}`, {
    role,
  });

  return res.data;
};

export const deleteUser = async (id) => {
  const res = await API.delete(`/admin/users/${id}`);
  return res.data;
};