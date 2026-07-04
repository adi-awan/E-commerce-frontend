import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (value) => {
    return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid Gmail address.");
      return;
    }

    try {
      setLoading(true);

      // Backend API will be connected later
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setMessage(
        "If this Gmail account exists, a password reset link has been sent."
      );
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">

        <div className="text-center mb-8">

          <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">

            <Mail className="text-blue-600" size={30} />

          </div>

          <h1 className="text-3xl font-bold mt-5">
            Forgot Password
          </h1>

          <p className="text-gray-500 mt-2">
            Enter the Gmail account used during registration.
          </p>

        </div>

        {message && (
          <div className="mb-4 rounded-lg bg-green-100 text-green-700 p-3 text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 text-red-600 p-3 text-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="font-medium text-sm">
              Gmail Address
            </label>

            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-3 font-semibold transition disabled:opacity-60 flex justify-center items-center gap-2"
          >

            {loading ? (
              <>
                <Loader2
                  size={20}
                  className="animate-spin"
                />
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}

          </button>

        </form>

        <div className="mt-8 text-center">

          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-blue-600 hover:underline"
          >

            <ArrowLeft size={18} />

            Back to Login

          </Link>

        </div>

      </div>

    </div>
  );
};

export default ForgotPassword;