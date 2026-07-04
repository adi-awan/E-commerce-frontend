import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  FaUserCircle,
  FaUser,
  FaEnvelope,
  FaShieldAlt,
  FaSave,
} from "react-icons/fa";
import {
  FiEye,
  FiEyeOff,
  FiLock
} from "react-icons/fi";

import {
  getProfile,
  updateProfile,
  changePassword,
} from "../services/profileService";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: ""
  });

  const [loadingPassword, setLoadingPassword] = useState(false);

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();

      setProfile({
        name: data.name,
        email: data.email,
        role: data.role,
      });
    } catch (err) {
      toast.error("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    if (!profile.name.trim()) {
      toast.error("Name is required");
      return;
    }

    try {
      setSaving(true);

      await updateProfile({
        name: profile.name,
        email: profile.email,
      });

      toast.success("Profile Updated Successfully");
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };
  const getPasswordStrength = (password) => {
    if (password.length < 6)
      return {
        text: "Weak",
        color: "bg-red-500",
      };

    if (
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      password.length >= 8
    ) {
      return {
        text: "Strong",
        color: "bg-green-500",
      };
    }

    return {
      text: "Medium",
      color: "bg-yellow-500",
    };
  };

  const handleChangePassword = async () => {

    if (
      passwordData.new_password !==
      passwordData.confirm_password
    ) {
      toast.error("Passwords do not match");
      return;
    }

    if (passwordData.new_password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {

      setLoadingPassword(true);

      await changePassword({
        old_password: passwordData.old_password,
        new_password: passwordData.new_password,
      });

      toast.success("Password updated successfully");

      setPasswordData({
        old_password: "",
        new_password: "",
        confirm_password: "",
      });

    } catch (err) {

      toast.error(
        err.response?.data?.detail ||
        "Failed to update password"
      );

    } finally {

      setLoadingPassword(false);

    }

  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-10">

        <div className="max-w-6xl mx-auto px-6 space-y-8 animate-pulse">

          <div className="bg-white rounded-3xl p-10 shadow">

            <div className="flex items-center gap-8">

              <div className="w-32 h-32 rounded-full bg-gray-300"></div>

              <div className="flex-1">

                <div className="h-8 bg-gray-300 rounded w-64 mb-4"></div>

                <div className="h-5 bg-gray-300 rounded w-80 mb-3"></div>

                <div className="h-8 bg-gray-300 rounded w-32"></div>

              </div>

            </div>

          </div>

          <div className="bg-white rounded-3xl h-[430px] shadow"></div>

          <div className="bg-white rounded-3xl h-[470px] shadow"></div>

        </div>

      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 py-10"
    >


      <div className="min-h-screen bg-gray-100 py-10">

        <div className="max-w-6xl mx-auto px-6">

          {/* Header */}

          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-3xl shadow-2xl overflow-hidden ">

            <div className="p-10 flex flex-col md:flex-row text-center md:text-left justify-between items-center">

              <div className="relative">

                <div className="w-36 h-36 rounded-full bg-white shadow-xl border-4 border-white flex items-center justify-center">

                  <span className="text-6xl font-bold text-blue-700">

                    {profile.name
                      ?.split(" ")
                      .map(word => word[0])
                      .join("")
                      .substring(0, 2)
                      .toUpperCase()}

                  </span>

                </div>

                <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-green-500 border-4 border-white"></div>

              </div>

              <div>

                <h1 className="text-4xl font-bold">
                  {profile.name}
                </h1>
                <p className="mt-3 text-lg text-blue-100">

                  Welcome back 👋

                  Manage your personal information and account security.

                </p>

                <p className="text-blue-100 mt-2">
                  {profile.email}
                </p>

              </div>

            </div>

          </div>
          <div className="grid md:grid-cols-3 gap-6 my-10">

            <div className="bg-white rounded-2xl shadow-md p-6">

              <h3 className="text-gray-500">

                Account Status

              </h3>

              <p className="text-2xl font-bold text-green-600 mt-2">

                Verified

              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">

              <h3 className="text-gray-500">

                Role

              </h3>

              <p className="text-2xl font-bold capitalize mt-2">

                {profile.role}

              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">

              <h3 className="text-gray-500">

                Member Since

              </h3>

              <p className="text-2xl font-bold mt-2">

                2026

              </p>

            </div>

          </div>

          {/* Personal Information */}

          <div className="mt-10 bg-white rounded-3xl shadow-lg p-8">

            <div className="flex items-center gap-3 mb-8">

              <FaUser className="text-blue-600 text-xl" />

              <h2 className="text-2xl font-bold">
                Personal Information
              </h2>

            </div>

            <form
              onSubmit={handleProfileUpdate}
              className="space-y-6"
            >

              <div>

                <label className="font-semibold block mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                />

              </div>

              <div>

                <label className="font-semibold block mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                />

              </div>

              <button
                disabled={saving}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl py-3 px-8 font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02]"              >
                <FaSave />

                {saving ? "Saving..." : "Save Changes"}

              </button>

            </form>

          </div>
          <div className="mt-10 bg-white rounded-3xl shadow-lg p-8">

            <div className="flex items-center gap-3 mb-8">

              <FiLock className="text-blue-600 text-xl" />

              <h2 className="text-2xl font-bold">

                Change Password

              </h2>

            </div>

            {/* Old Password */}

            <div className="relative mb-5">

              <input
                type={showOld ? "text" : "password"}
                placeholder="Current Password"
                value={passwordData.old_password}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    old_password: e.target.value
                  })
                }
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowOld(!showOld)}
                className="absolute right-4 top-4"
              >
                {showOld ? <FiEyeOff /> : <FiEye />}
              </button>

            </div>

            {/* New Password */}

            <div className="relative mb-2">

              <input
                type={showNew ? "text" : "password"}
                placeholder="New Password"
                value={passwordData.new_password}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    new_password: e.target.value
                  })
                }
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-4"
              >
                {showNew ? <FiEyeOff /> : <FiEye />}
              </button>

            </div>

            {passwordData.new_password && (

              <div className="mb-5">

                <div className="w-full h-2 rounded-full bg-gray-200">

                  <div
                    className={`h-2 rounded-full ${getPasswordStrength(passwordData.new_password).color}`}
                    style={{
                      width:
                        getPasswordStrength(passwordData.new_password).text === "Weak"
                          ? "35%"
                          : getPasswordStrength(passwordData.new_password).text === "Medium"
                            ? "70%"
                            : "100%"
                    }}
                  />

                </div>

                <p className="text-sm mt-2">

                  Password Strength:

                  <span className="font-semibold ml-2">

                    {getPasswordStrength(passwordData.new_password).text}

                  </span>

                </p>

              </div>

            )}

            {/* Confirm Password */}

            <div className="relative mb-6">

              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                value={passwordData.confirm_password}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirm_password: e.target.value
                  })
                }
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-4"
              >
                {showConfirm ? <FiEyeOff /> : <FiEye />}
              </button>

            </div>

            <button
              onClick={handleChangePassword}
              disabled={loadingPassword}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-60"
            >

              {loadingPassword ? (
                <div className="flex justify-center items-center gap-3">

                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />

                  Updating...

                </div>
              ) : (
                "Update Password"
              )}

            </button>

          </div>

        </div>

      </div>
    </motion.div>
  );
};

export default Profile;