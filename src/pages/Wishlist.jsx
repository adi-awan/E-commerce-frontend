import { useEffect, useState } from "react";
import {
  getWishlist,
  removeWishlist,
} from "../services/wishlistService";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
  const [items, setItems] = useState([]);

  const loadWishlist = async () => {
    try {
      const data = await getWishlist();

      setItems(data.items);

    } catch (err) {
      console.log(err);
    }
  };
  const handleRemove = async (itemId) => {
    try {
      await removeWishlist(itemId);

      setItems((prev) =>
        prev.filter((item) => item.id !== itemId)
      );

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            ❤️ My Wishlist
          </h1>
          <p className="text-gray-500 mt-2">
            Save your favorite products and purchase them anytime.
          </p>
        </div>

        {items.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 py-20 flex flex-col items-center">

            <div className="text-7xl mb-5">
              💔
            </div>

            <h2 className="text-2xl font-semibold text-gray-700">
              Your Wishlist is Empty
            </h2>

            <p className="text-gray-500 mt-3 max-w-md text-center">
              You haven't added any products to your wishlist yet.
              Browse our collection and save your favorite items.
            </p>

            <button
              onClick={() => navigate("/products")}
              className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
            >
              Browse Products
            </button>

          </div>

        ) : (

          <>
            {/* Wishlist Count */}
            <div className="mb-6">
              <span className="inline-flex items-center rounded-full bg-pink-100 text-pink-700 px-4 py-2 text-sm font-semibold">
                ❤️ {items.length} {items.length === 1 ? "Item" : "Items"}
              </span>
            </div>

            {/* Products */}
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="relative"
                >
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="absolute top-3 right-3 z-20 bg-red-500 hover:bg-red-600 text-white w-10 h-10 rounded-full shadow-lg transition"
                  >
                    ✕
                  </button>

                  <ProductCard
                    product={item.products}
                  />
                </div>
              ))}
            </div>
          </>

        )}

      </div>
    </div>
  );
};

export default Wishlist;