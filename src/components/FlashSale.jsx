import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Zap, Heart, ChevronRight } from "lucide-react";
import API from "../api/axios";

const FLASH_DURATION_SECONDS = 8 * 3600 + 17 * 60 + 56;

const formatTime = (totalSeconds) => {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0"));
};

const CardSkeleton = () => (
  <div className="min-w-[220px] max-w-[220px] bg-white border border-gray-200 rounded-xl overflow-hidden animate-pulse">
    <div className="h-40 bg-gray-200" />
    <div className="p-4 space-y-2">
      <div className="h-3 w-4/5 bg-gray-200 rounded" />
      <div className="h-4 w-1/2 bg-gray-200 rounded" />
    </div>
  </div>
);

const FlashSale = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(FLASH_DURATION_SECONDS);

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/products", {
          params: { limit: 8, in_stock: true },
        });
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : FLASH_DURATION_SECONDS));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [h, m, s] = formatTime(secondsLeft);

  if (!loading && products.length === 0) return null;

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center">
              <Zap size={16} className="text-orange-400 fill-orange-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Flash Sale</h2>
            <div className="flex items-center gap-1">
              {[h, m, s].map((unit, i) => (
                <span key={i} className="flex items-center gap-1">
                  <span className="bg-red-500 text-white text-xs font-bold w-8 h-8 rounded-md flex items-center justify-center">
                    {unit}
                  </span>
                  {i < 2 && <span className="text-slate-400 font-bold">:</span>}
                </span>
              ))}
            </div>
          </div>

          <Link
            to="/products"
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-orange-600 hover:text-orange-700"
          >
            View All <ChevronRight size={16} />
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => <CardSkeleton key={i} />)
            : products.map((product) => {
                const hasDiscount = product.original_price && product.original_price > product.price;
                const discountPct = hasDiscount
                  ? Math.round(100 - (product.price / product.original_price) * 100)
                  : null;

                return (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    className="group min-w-[220px] max-w-[220px] snap-start bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-orange-200 transition-all"
                  >
                    <div className="relative h-40 bg-gray-50 overflow-hidden">
                      <img
                        src={product.image_url || "https://via.placeholder.com/300"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {discountPct && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                          -{discountPct}%
                        </span>
                      )}
                      <span className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                        <Heart size={14} className="text-slate-500" />
                      </span>
                    </div>

                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 min-h-[40px] group-hover:text-orange-600 transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-base font-extrabold text-slate-900">
                          Rs. {product.price}
                        </span>
                        {hasDiscount && (
                          <span className="text-xs text-slate-400 line-through">
                            Rs. {product.original_price}
                          </span>
                        )}
                      </div>

                      {/* Only renders once your backend tracks sold count against a flash limit */}
                      {product.sold_count != null && product.flash_limit != null && (
                        <div className="mt-3">
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-orange-500 rounded-full"
                              style={{
                                width: `${Math.min(
                                  100,
                                  (product.sold_count / product.flash_limit) * 100
                                )}%`,
                              }}
                            />
                          </div>
                          <span className="text-[11px] text-slate-400 mt-1 block">
                            {product.sold_count}/{product.flash_limit} sold
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
        </div>
      </div>
    </section>
  );
};

export default FlashSale;