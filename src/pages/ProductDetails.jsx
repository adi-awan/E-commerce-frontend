import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart } from "../services/cartService";
import { getReviews, addReview } from "../services/reviewService";
import { getRelatedProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import { addWishlist } from "../services/wishlistService";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const loadRelatedProducts = async () => {
    try {
      const data = await getRelatedProducts(id);
      setRelatedProducts(data);
    } catch (err) {
      console.log(err);
    }
  };
  const navigate = useNavigate();

  const handleBuyNow = async () => {
    try {
      await addToCart(product.id, quantity);
      navigate("/checkout");
    } catch (error) {
      console.log(error);
      alert("Please login first.");
    }
  };

  const averageRating =
    reviews.length > 0
      ? (
        reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        ) / reviews.length
      ).toFixed(1)
      : 0;
  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter(
      (review) => review.rating === star
    ).length;

    const percentage =
      reviews.length > 0
        ? (count / reviews.length) * 100
        : 0;

    return {
      star,
      count,
      percentage,
    };
  });

  const loadReviews = async () => {
    try {
      const data = await getReviews(id);
      setReviews(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);

      setProduct(res.data);

    } catch (error) {
      console.log(error);
    }
  };
  const handleWishlist = async () => {
    try {
      await addWishlist(product.id);

      alert("Added to wishlist ❤️");
    } catch (err) {
      console.log(err);
      alert("Please login first");
    }
  };
  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, quantity);

      alert("Added to cart");
    } catch (error) {
      console.log(error);

      alert("Login first");
    }
  };
  const handleReviewSubmit = async () => {

    if (comment.trim() === "") {
      return alert("Please write a review.");
    }

    try {

      setSubmittingReview(true);

      await addReview({
        product_id: product.id,
        rating,
        comment,
      });

      alert("Review added successfully!");

      setComment("");
      setRating(5);

      await loadReviews();

    } catch (error) {

      console.log(error);

      alert("Please login first.");

    } finally {

      setSubmittingReview(false);

    }

  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        getProduct(),
        loadReviews(),
        loadRelatedProducts(),
      ]);
    };

    loadData();
  }, [id]);

  if (!product) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }


  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <div className="grid lg:grid-cols-2 gap-12">

        {/* Product Image */}

        <div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

            <img
              src={
                product.image_url ||
                "https://via.placeholder.com/700"
              }
              alt={product.name}
              className="w-full h-[500px] object-cover hover:scale-105 transition duration-300"
            />

          </div>

        </div>

        {/* Product Info */}

        <div>

          <p className="text-blue-600 font-semibold mb-2">
            {product.category}
          </p>

          <h1 className="text-5xl font-bold">
            {product.name}
          </h1>

          {/* Average Rating */}

          <div className="flex items-center gap-3 mt-4">

            <div className="text-yellow-500 text-xl">

              {"⭐".repeat(Math.round(Number(averageRating)))}

            </div>

            <span className="font-semibold">

              {averageRating}/5

            </span>

            <span className="text-gray-500">

              ({reviews.length} Reviews)

            </span>

          </div>

          {/* Rating Breakdown */}

          <div className="mt-6 space-y-2">

            {ratingBreakdown.map((item) => (

              <div
                key={item.star}
                className="flex items-center gap-3"
              >

                <span className="w-10">

                  {item.star}★

                </span>

                <div className="flex-1 bg-gray-200 rounded-full h-2">

                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{
                      width: `${item.percentage}%`,
                    }}
                  />

                </div>

                <span className="w-8 text-gray-500">

                  {item.count}

                </span>

              </div>

            ))}

          </div>

          <div className="mt-8">

            <span className="text-4xl font-bold text-blue-600">

              Rs. {product.price}

            </span>

          </div>

          <div className="mt-6">

            {product.stock > 10 ? (
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
                ✔ In Stock
              </span>
            ) : product.stock > 0 ? (
              <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">
                ⚠ Only {product.stock} Left
              </span>
            ) : (
              <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full">
                ✖ Out of Stock
              </span>
            )}

          </div>

          <div className="mt-8">

            <h3 className="font-bold text-xl mb-3">
              Description
            </h3>

            <p className="text-gray-600 leading-8">
              {product.description}
            </p>

          </div>

          <div className="mt-10">

            {/* Quantity */}
            <div className="mb-8">

              <h3 className="font-semibold text-gray-700 mb-3">
                Quantity
              </h3>

              <div className="flex items-center gap-4">

                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="
          w-12
          h-12
          rounded-xl
          border
          border-gray-300
          bg-white
          text-2xl
          font-semibold
          hover:bg-gray-100
          transition
        "
                >
                  −
                </button>

                <span className="w-12 text-center text-xl font-bold">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    quantity < product.stock &&
                    setQuantity(quantity + 1)
                  }
                  className="
          w-12
          h-12
          rounded-xl
          border
          border-gray-300
          bg-white
          text-2xl
          font-semibold
          hover:bg-gray-100
          transition
        "
                >
                  +
                </button>

              </div>

            </div>

            {/* Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="
        h-14
        rounded-full
        bg-yellow-400
        hover:bg-yellow-500
        text-black
        font-semibold
        text-lg
        shadow-md
        transition-all
        duration-300
        hover:shadow-lg
        disabled:bg-gray-300
        disabled:cursor-not-allowed
      "
              >
                🛒 Add to Cart
              </button>

              {/* Buy Now */}
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                disabled={product.stock === 0}
                className="
        h-14
        rounded-full
        bg-orange-500
        hover:bg-orange-600
        text-white
        font-semibold
        text-lg
        shadow-md
        transition-all
        duration-300
        hover:shadow-lg
        disabled:bg-gray-300
        disabled:cursor-not-allowed
      "
              >
                ⚡ Buy Now
              </button>

            </div>

          </div>

        </div>

      </div>
      <div className="mt-20">
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-6">

            Write a Review

          </h2>

          <div className="mb-5">

            <label className="font-semibold block mb-2">

              Rating

            </label>

            <select
              value={rating}
              onChange={(e) =>
                setRating(Number(e.target.value))
              }
              className="border rounded-lg p-3"
            >

              <option value={5}>★★★★★</option>
              <option value={4}>★★★★☆</option>
              <option value={3}>★★★☆☆</option>
              <option value={2}>★★☆☆☆</option>
              <option value={1}>★☆☆☆☆</option>

            </select>

          </div>

          <textarea
            rows="5"
            placeholder="Share your experience..."
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            className="border rounded-xl w-full p-4"
          />

          <button
            onClick={handleReviewSubmit}
            disabled={submittingReview}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
          >

            {submittingReview
              ? "Submitting..."
              : "Submit Review"}

          </button>

        </div>

        <h2 className="text-3xl font-bold mb-8">

          Customer Reviews

        </h2>

        {reviews.length === 0 ? (

          <div className="text-gray-500">

            No reviews yet.

          </div>

        ) : (

          <div className="space-y-6">

            {reviews.map((review) => (

              <div
                key={review.id}
                className="bg-white rounded-xl shadow p-6"
              >

                <div className="flex justify-between">

                  <div>

                    <h4 className="font-bold">

                      {review.user_name || "Customer"}

                    </h4>

                    <div className="text-yellow-500">

                      {"⭐".repeat(review.rating)}

                    </div>

                  </div>

                </div>

                <p className="mt-4 text-gray-600">

                  {review.comment}

                </p>

              </div>

            ))}

          </div>

        )}

      </div>
      <div className="mt-24">

        <h2 className="text-3xl font-bold mb-8">

          Related Products

        </h2>

        {relatedProducts.length === 0 ? (

          <p className="text-gray-500">

            No related products found.

          </p>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {relatedProducts.map((product) => (

              <ProductCard
                key={product.id}
                product={product}
              />

            ))}

          </div>

        )}

      </div>

    </div>
  );

};

export default ProductDetails;