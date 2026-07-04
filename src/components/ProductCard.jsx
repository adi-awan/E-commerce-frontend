import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaHeart, FaRegHeart, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { addToCart } from "../services/cartService";
import { addWishlist } from "../services/wishlistService";

const Rating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => {
      if (rating >= star) return <FaStar key={star} className="text-orange-400 text-xs" />;
      if (rating >= star - 0.5) return <FaStarHalfAlt key={star} className="text-orange-400 text-xs" />;
      return <FaRegStar key={star} className="text-orange-400 text-xs" />;
    })}
  </div>
);

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [wishlisted, setWishlisted] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  const stockBadge = () => {
    if (product.stock <= 0)
      return { text: "Out of Stock", classes: "bg-red-500 text-white" };
    if (product.stock <= 5)
      return { text: `Only ${product.stock} left`, classes: "bg-amber-500 text-white" };
    return null;
  };

  const averageRating = parseFloat(product.rating ?? 0);
  const reviewCount = parseInt(product.review_count ?? 0, 10);
  const badge = stockBadge();

  const handleAddToCart = async () => {
    setAddingToCart(true);
    try {
      await addToCart(product.id);
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.log(error);
      toast.error("Please login first.");
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    try {
      await addToCart(product.id, 1);
      navigate("/checkout");
    } catch (error) {
      console.log(error);
      toast.error("Please login first.");
    }
  };

  const handleWishlist = async (e) => {
    e.preventDefault();
    try {
      await addWishlist(product.id);
      setWishlisted(true);
      toast.success("Added to wishlist");
    } catch (error) {
      console.log(error);
      toast.error("Please login first.");
    }
  };

  return (
    <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-orange-200 transition-all duration-300 h-full flex flex-col">
      {/* Image */}
      <Link
        to={`/products/${product.id}`}
        className="relative block h-72 bg-gray-50 overflow-hidden"
      >
        <img
          src={product.image_url || "https://via.placeholder.com/400"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 duration-500"
        />

        {badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${badge.classes}`}
          >
            {badge.text}
          </span>
        )}

        <button
          onClick={handleWishlist}
          aria-label="Add to wishlist"
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {wishlisted ? (
            <FaHeart className="text-orange-500 text-sm" />
          ) : (
            <FaRegHeart className="text-slate-600 text-sm" />
          )}
        </button>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 px-4 pb-4">
        {/* Category */}
        <span className="text-[11px] uppercase tracking-wide font-semibold text-orange-600 mt-3">
          {product.category}
        </span>

        {/* Name */}
        <Link to={`/products/${product.id}`}>
          <h2 className="mt-1.5 text-[15px] font-semibold text-slate-900 line-clamp-2 hover:text-orange-600 transition-colors">
            {product.name}
          </h2>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <Rating rating={averageRating} />
          <span className="text-slate-700 font-semibold text-xs">
            {averageRating > 0 ? averageRating.toFixed(1) : "0.0"}
          </span>
          <Link
            to={`/products/${product.id}`}
            className="text-slate-400 hover:text-orange-600 text-xs transition-colors"
          >
            {reviewCount > 0
              ? `(${reviewCount} ${reviewCount === 1 ? "review" : "reviews"})`
              : "(No reviews)"}
          </Link>
        </div>

        {/* Description */}
        <p className="mt-2 text-sm text-slate-500 line-clamp-2 min-h-[40px]">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-3">
          <span className="text-2xl font-extrabold text-slate-900">
            Rs. {product.price}
          </span>
          <span className="text-xs text-emerald-600 font-semibold">
            Free Delivery
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-auto pt-4 space-y-2">
          <button
            onClick={handleBuyNow}
            disabled={product.stock <= 0}
            className="w-full h-11 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm transition shadow-sm hover:shadow-md active:scale-[0.98] disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {product.stock <= 0 ? "Unavailable" : "Buy Now"}
          </button>

          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0 || addingToCart}
            className="w-full h-11 rounded-lg border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white font-semibold text-sm transition active:scale-[0.98] disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            {addingToCart ? "Adding…" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;