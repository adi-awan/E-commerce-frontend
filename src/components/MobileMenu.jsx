import { Link } from "react-router-dom";
import {
  Home,
  ShoppingBag,
  Heart,
  ShoppingCart,
  Package,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

const MobileMenu = ({ open, user, logout }) => {
  if (!open) return null;

  return (
    <div className="lg:hidden bg-white border-t shadow-lg">

      <div className="flex flex-col">

        <Link
          to="/"
          className="flex items-center gap-3 px-6 py-4 hover:bg-gray-100"
        >
          <Home size={20} />
          Home
        </Link>

        <Link
          to="/products"
          className="flex items-center gap-3 px-6 py-4 hover:bg-gray-100"
        >
          <ShoppingBag size={20} />
          Products
        </Link>

        {user && (
          <>
            <Link
              to="/wishlist"
              className="flex items-center gap-3 px-6 py-4 hover:bg-gray-100"
            >
              <Heart size={20} />
              Wishlist
            </Link>

            <Link
              to="/cart"
              className="flex items-center gap-3 px-6 py-4 hover:bg-gray-100"
            >
              <ShoppingCart size={20} />
              Cart
            </Link>

            <Link
              to="/orders"
              className="flex items-center gap-3 px-6 py-4 hover:bg-gray-100"
            >
              <Package size={20} />
              Orders
            </Link>

            {user.role === "admin" && (
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-3 px-6 py-4 hover:bg-gray-100"
              >
                <LayoutDashboard size={20} />
                Admin Dashboard
              </Link>
            )}

            <button
              onClick={logout}
              className="flex items-center gap-3 px-6 py-4 text-red-600 hover:bg-red-50 text-left"
            >
              <LogOut size={20} />
              Logout
            </button>
          </>
        )}

        {!user && (
          <>
            <Link
              to="/login"
              className="px-6 py-4 hover:bg-gray-100"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-6 py-4 hover:bg-gray-100"
            >
              Register
            </Link>
          </>
        )}

      </div>

    </div>
  );
};

export default MobileMenu;