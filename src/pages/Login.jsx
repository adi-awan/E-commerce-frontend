import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import toast from "react-hot-toast";

import { loginUser } from "../services/authService";

import AuthLayout from "../components/auth/AuthLayout";
import PasswordInput from "../components/auth/PasswordInput";
import GoogleButton from "../components/auth/GoogleButton";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await loginUser(form);

      toast.success("Login successful 🚀");

      navigate("/");
    } catch (err) {
      const message =
        err?.detail ||
        err?.message ||
        "Invalid email or password";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to continue shopping with ShopHub."
    >
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Error Box */}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="relative">
          <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="email"
            placeholder="Enter your Gmail"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full h-12 border border-gray-300 rounded-xl pl-12 outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Password */}
        <PasswordInput
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* Remember + Forgot */}
        <div className="flex justify-between items-center text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Remember Me
          </label>

          <Link
            to="/forgot-password"
            className="text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-semibold transition disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 border-t" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 border-t" />
        </div>

        {/* Google */}
        <GoogleButton
          onClick={() => toast("Google Login Coming Soon")}
        />

        {/* Register */}
        <p className="text-center text-gray-600">
          Don’t have an account?
          <Link
            to="/register"
            className="ml-2 text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

      </form>
    </AuthLayout>
  );
};

export default Login;