import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  User,
  Package,
  Heart,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

const UserMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);

  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  // Close menu
  const closeMenu = () => {
    setOpen(false);
  };

  // Logout
  const logout = () => {
    closeMenu();

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // Close menu when route changes
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // Close menu when pressing Escape
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className="relative"
    >
      {/* User Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 hover:text-blue-600 transition-colors"
      >
        <User size={22} />

        <span className="hidden md:block font-medium">
          {user?.name || "Account"}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute
            right-0
            mt-4
            w-64
            bg-white
            rounded-2xl
            shadow-2xl
            border
            border-gray-200
            overflow-hidden
            z-50
          "
        >
          {/* User Info */}
          <div className="p-4 border-b bg-gray-50">
            <p className="font-semibold text-gray-900">
              {user?.name}
            </p>

            <p className="text-sm text-gray-500 truncate">
              {user?.email}
            </p>
          </div>

          {/* Profile */}
          <Link
            to="/profile"
            onClick={closeMenu}
            className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <User size={18} />
            Profile
          </Link>

          {/* Orders */}
          <Link
            to="/orders"
            onClick={closeMenu}
            className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <Package size={18} />
            Orders
          </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            onClick={closeMenu}
            className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <Heart size={18} />
            Wishlist
          </Link>

          {/* Admin */}
          {user?.role === "admin" && (
            <Link
              to="/admin/dashboard"
              onClick={closeMenu}
              className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 hover:text-blue-600 transition"
            >
              <LayoutDashboard size={18} />
              Admin Dashboard
            </Link>
          )}

          {/* Logout */}
          <button
            onClick={logout}
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              text-red-600
              hover:bg-red-50
              transition
              border-t
            "
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;