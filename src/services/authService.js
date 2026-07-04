import API from "../api/axios";
import { jwtDecode } from "jwt-decode";

export const registerUser = async (data) => {
  const res = await API.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (data) => {
  try {
    const res = await API.post("/auth/login", data);

    const token = res.data.access_token;

    localStorage.setItem("token", token);

    const user = jwtDecode(token);

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    return res.data;

  } catch (error) {
    throw error.response?.data || error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};