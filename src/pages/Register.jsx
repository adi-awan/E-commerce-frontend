import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaUser } from "react-icons/fa";
import toast from "react-hot-toast";

import AuthLayout from "../components/auth/AuthLayout";
import PasswordInput from "../components/auth/PasswordInput";
import LoadingButton from "../components/auth/LoadingButton";
import GoogleButton from "../components/auth/GoogleButton";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const getPasswordStrength = (password) => {
    if (password.length < 6) {
      return {
        text: "Weak",
        color: "bg-red-500",
      };
    }

    if (
      password.length >= 6 &&
      password.length < 8
    ) {
      return {
        text: "Medium",
        color: "bg-yellow-500",
      };
    }

    return {
      text: "Strong",
      color: "bg-green-500",
    };
  };

  const strength = getPasswordStrength(form.password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      return toast.error("Please fill all fields.");
    }

    if (!form.email.endsWith("@gmail.com")) {
      return toast.error(
        "Please enter a valid Gmail address."
      );
    }

    if (form.password.length < 8) {
      return toast.error(
        "Password must be at least 8 characters."
      );
    }

    if (
      form.password !== form.confirmPassword
    ) {
      return toast.error(
        "Passwords do not match."
      );
    }

    try {
      setLoading(true);

      // Backend will be connected in Phase 2

      await new Promise((resolve) =>
        setTimeout(resolve, 1500)
      );

      toast.success(
        "Registration UI completed."
      );

      navigate("/login");
    } catch (error) {
      console.log(error);

      toast.error(
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join ShopHub and start shopping today."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Name */}

        <div className="relative">

          <FaUser
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="
              w-full
              h-12
              border
              rounded-xl
              pl-12
              border-gray-300
              focus:ring-2
              focus:ring-blue-300
              focus:border-blue-600
              outline-none
            "
          />

        </div>

        {/* Email */}

        <div className="relative">

          <FaEnvelope
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            type="email"
            placeholder="Gmail Address"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="
              w-full
              h-12
              border
              rounded-xl
              pl-12
              border-gray-300
              focus:ring-2
              focus:ring-blue-300
              focus:border-blue-600
              outline-none
            "
          />

        </div>

        {/* Password */}

        <PasswordInput
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
          placeholder="Password"
        />

        {/* Password Strength */}

        {form.password && (
          <div>

            <div className="w-full h-2 rounded-full bg-gray-200">

              <div
                className={`h-2 rounded-full ${strength.color}`}
                style={{
                  width:
                    strength.text === "Weak"
                      ? "33%"
                      : strength.text === "Medium"
                      ? "66%"
                      : "100%",
                }}
              />

            </div>

            <p className="text-sm mt-1 text-gray-600">
              Password Strength:
              <span className="font-semibold ml-1">
                {strength.text}
              </span>
            </p>

          </div>
        )}

        {/* Confirm Password */}

        <PasswordInput
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({
              ...form,
              confirmPassword:
                e.target.value,
            })
          }
          placeholder="Confirm Password"
          name="confirmPassword"
        />

        <LoadingButton
          loading={loading}
          text="Create Account"
          loadingText="Creating Account..."
        />

        {/* Divider */}

        <div className="relative">

          <div className="absolute inset-0 flex items-center">

            <div className="w-full border-t border-gray-300"></div>

          </div>

          <div className="relative flex justify-center">

            <span className="bg-white px-4 text-gray-500 text-sm">
              OR
            </span>

          </div>

        </div>

        <GoogleButton />

        <p className="text-center text-gray-600">

          Already have an account?

          <Link
            to="/login"
            className="ml-2 text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>

        </p>

      </form>
    </AuthLayout>
  );
};

export default Register;