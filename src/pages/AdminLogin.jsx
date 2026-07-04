import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginUser(formData);

      navigate("/admin/dashboard");

    } catch (error) {
      console.log(error);

      alert("Login Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded">

      <h1 className="text-3xl font-bold mb-6">
        Admin Login
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <button
          className="w-full bg-blue-600 text-white py-3 rounded"
        >
          Login
        </button>

      </form>

    </div>
  );
};

export default AdminLogin;