import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import API from "../api/axios";
import ProductCard from "./ProductCard";

const FILTERS = [
  { label: "Best Seller", sort_by: null },
  { label: "Newest", sort_by: "newest" },
  { label: "Price: Low to High", sort_by: "price_asc" },
  { label: "Price: High to Low", sort_by: "price_desc" },
];

const CardSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden animate-pulse">
    <div className="h-72 bg-gray-200" />
    <div className="p-4 space-y-3">
      <div className="h-3 w-1/3 bg-gray-200 rounded" />
      <div className="h-4 w-4/5 bg-gray-200 rounded" />
      <div className="h-8 w-2/5 bg-gray-200 rounded mt-4" />
    </div>
  </div>
);

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);

  const loadProducts = async (filter) => {
    setLoading(true);
    try {
      const params = { limit: 8 };
      if (filter.sort_by) params.sort_by = filter.sort_by;

      const res = await API.get("/products", { params });
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(activeFilter);
  }, [activeFilter]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Today's For You
        </h2>

        <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {FILTERS.map((filter) => (
            <button
              key={filter.label}
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition ${
                activeFilter.label === filter.label
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-600 border-gray-300 hover:border-slate-400"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/products"
          className="group inline-flex items-center gap-2 border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white px-6 py-3 rounded-xl font-bold text-sm transition"
        >
          View All Products
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;