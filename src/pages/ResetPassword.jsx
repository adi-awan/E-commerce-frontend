import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Lock,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle,
} from "lucide-react";

const ResetPassword = () => {
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const passwordStrength = (password) => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return "Weak";
    if (score === 2 || score === 3) return "Medium";

    return "Strong";
  };

  const strength = passwordStrength(form.password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // FastAPI API will be connected later
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setMessage("Password has been reset successfully.");

      setForm({
        password: "",
        confirmPassword: "",
      });
    } catch {
      setError("Unable to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">

        <div className="text-center mb-8">

          <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">

            <Lock
              size={30}
              className="text-green-600"
            />

          </div>

          <h1 className="text-3xl font-bold mt-5">
            Reset Password
          </h1>

          <p className="text-gray-500 mt-2">
            Create your new password.
          </p>

        </div>

        {message && (
          <div className="mb-5 bg-green-100 text-green-700 rounded-lg p-3 text-sm flex items-center gap-2">
            <CheckCircle size={18} />
            {message}
          </div>
        )}

        {error && (
          <div className="mb-5 bg-red-100 text-red-600 rounded-lg p-3 text-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="font-medium text-sm">
              New Password
            </label>

            <div className="relative mt-2">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-3.5"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          <div>

            <label className="font-medium text-sm">
              Confirm Password
            </label>

            <div className="relative mt-2">

              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({
                    ...form,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full border rounded-xl p-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirm(!showConfirm)
                }
                className="absolute right-4 top-3.5"
              >
                {showConfirm ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

          </div>

          <div>

            <div className="flex justify-between text-sm">

              <span>Password Strength</span>

              <span
                className={
                  strength === "Strong"
                    ? "text-green-600"
                    : strength === "Medium"
                    ? "text-yellow-600"
                    : "text-red-600"
                }
              >
                {strength}
              </span>

            </div>

            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">

              <div
                className={`h-full ${
                  strength === "Weak"
                    ? "bg-red-500 w-1/3"
                    : strength === "Medium"
                    ? "bg-yellow-500 w-2/3"
                    : "bg-green-500 w-full"
                }`}
              />

            </div>

          </div>

          <button
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl p-3 font-semibold transition flex justify-center items-center gap-2 disabled:opacity-60"
          >

            {loading ? (
              <>
                <Loader2
                  className="animate-spin"
                  size={20}
                />
                Updating...
              </>
            ) : (
              "Reset Password"
            )}

          </button>

        </form>

        <div className="text-center mt-8">

          <Link
            to="/login"
            className="text-blue-600 hover:underline"
          >
            Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
};

export default ResetPassword;