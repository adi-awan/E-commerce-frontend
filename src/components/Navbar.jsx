import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ShoppingCart, Heart, Menu, X } from "lucide-react";

import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center gap-8">
        {/* Logo */}
        <Link to="/" className="shrink-0 flex items-baseline text-2xl font-extrabold tracking-tight">
          <span className="text-slate-900">Shop</span>
          <span className="text-orange-500">Hub</span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:block flex-1 max-w-xl">
          <SearchBar />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-1 ml-auto">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {token ? (
            <div className="flex items-center gap-1 ml-3 pl-3 border-l border-gray-200">
              <Link
                to="/wishlist"
                aria-label="Wishlist"
                className="relative w-10 h-10 flex items-center justify-center rounded-full text-slate-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
              >
                <Heart size={20} />
              </Link>

              <Link
                to="/cart"
                aria-label="Cart"
                className="relative w-10 h-10 flex items-center justify-center rounded-full text-slate-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
              >
                <ShoppingCart size={20} />
                {/* Wire this to your cart count when available, e.g. cartCount > 0 && (...) */}
              </Link>

              <div className="ml-1">
                <UserMenu />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 ml-3 pl-3 border-l border-gray-200">
              <Link
                to="/login"
                className="px-3 py-2 text-sm font-semibold text-slate-600 hover:text-orange-600 transition-colors"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Cart/Wishlist quick access + menu toggle */}
        <div className="flex items-center gap-1 ml-auto lg:hidden">
          {token && (
            <>
              <Link
                to="/wishlist"
                aria-label="Wishlist"
                className="w-10 h-10 flex items-center justify-center rounded-full text-slate-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
              >
                <Heart size={20} />
              </Link>
              <Link
                to="/cart"
                aria-label="Cart"
                className="w-10 h-10 flex items-center justify-center rounded-full text-slate-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
              >
                <ShoppingCart size={20} />
              </Link>
            </>
          )}

          <button
            className="w-10 h-10 flex items-center justify-center rounded-full text-slate-700 hover:bg-orange-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-6 pb-4">
        <SearchBar />
      </div>

      {/* Mobile Navigation */}
      <MobileMenu open={menuOpen} user={user} logout={logout} />
    </nav>
  );
};

export default Navbar;