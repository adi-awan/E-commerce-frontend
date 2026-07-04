import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";
import { getCategories } from "../services/categoryService";
import { FiFilter, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const LIMIT = 8;
const RAIL_LIMIT = 8;
const RAIL_CATEGORY_CAP = 6;

const catLabel = (cat) =>
  typeof cat === "string" ? cat : cat?.name || cat?.category || cat?.title || "";

/* ---------------------------------- */
/* Skeleton card shown while loading   */
/* ---------------------------------- */
const CardSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden animate-pulse">
    <div className="h-72 bg-gray-200" />
    <div className="p-4 space-y-3">
      <div className="h-3 w-1/3 bg-gray-200 rounded" />
      <div className="h-4 w-4/5 bg-gray-200 rounded" />
      <div className="h-3 w-1/2 bg-gray-200 rounded" />
      <div className="h-8 w-2/5 bg-gray-200 rounded mt-4" />
    </div>
  </div>
);

/* ---------------------------------- */
/* One horizontally-scrolling category */
/* ---------------------------------- */
const CategoryRail = ({ title, products, loading, onViewAll }) => {
  if (!loading && products.length === 0) return null;

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        <button
          onClick={onViewAll}
          className="text-sm font-semibold text-orange-600 hover:text-orange-700"
        >
          View all →
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="min-w-[220px] max-w-[220px] snap-start">
                <CardSkeleton />
              </div>
            ))
          : products.map((product) => (
              <div key={product.id} className="min-w-[220px] max-w-[220px] snap-start">
                <ProductCard product={product} />
              </div>
            ))}
      </div>
    </section>
  );
};

/* ---------------------------------- */
/* Shared filter fields (desktop+mobile) */
/* ---------------------------------- */
const FilterFields = ({
  categories,
  category,
  setCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  inStock,
  setInStock,
  resetFilters,
}) => (
  <div className="space-y-7">
    {/* Category */}
    <div>
      <h4 className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-3">
        Category
      </h4>
      <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
        <label className="flex items-center gap-2.5 cursor-pointer text-sm py-1">
          <input
            type="radio"
            name="category"
            checked={category === ""}
            onChange={() => setCategory("")}
            className="accent-orange-600 w-4 h-4"
          />
          <span className={category === "" ? "font-semibold text-slate-900" : "text-slate-600"}>
            All categories
          </span>
        </label>

        {categories.map((cat, i) => {
          const label = catLabel(cat);
          return (
            <label key={i} className="flex items-center gap-2.5 cursor-pointer text-sm py-1">
              <input
                type="radio"
                name="category"
                checked={category === label}
                onChange={() => setCategory(label)}
                className="accent-orange-600 w-4 h-4"
              />
              <span
                className={
                  category === label ? "font-semibold text-slate-900" : "text-slate-600"
                }
              >
                {label}
              </span>
            </label>
          );
        })}
      </div>
    </div>

    <hr className="border-gray-200" />

    {/* Price */}
    <div>
      <h4 className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-3">
        Price Range (Rs.)
      </h4>
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
        />
        <span className="text-gray-400">–</span>
        <input
          type="number"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
        />
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {[
          ["Under 1k", 0, 1000],
          ["1k–5k", 1000, 5000],
          ["5k–20k", 5000, 20000],
          ["20k+", 20000, ""],
        ].map(([label, min, max]) => (
          <button
            key={label}
            onClick={() => {
              setMinPrice(min);
              setMaxPrice(max);
            }}
            className="text-xs px-3 py-1.5 rounded-full border border-gray-300 text-slate-600 hover:border-orange-500 hover:text-orange-600 transition"
          >
            {label}
          </button>
        ))}
      </div>
    </div>

    <hr className="border-gray-200" />

    {/* Availability */}
    <div className="flex items-center justify-between">
      <h4 className="text-xs font-bold uppercase tracking-wide text-slate-500">
        In Stock Only
      </h4>
      <button
        onClick={() => setInStock(!inStock)}
        className={`w-11 h-6 rounded-full transition relative ${
          inStock ? "bg-orange-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
            inStock ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>

    <button
      onClick={resetFilters}
      className="w-full text-center text-sm font-semibold text-slate-500 hover:text-red-600 border border-gray-300 hover:border-red-300 rounded-lg py-2.5 transition"
    >
      Reset all filters
    </button>
  </div>
);

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [categories, setCategories] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const [category, setCategory] = useState(searchParams.get("category") || "");

  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStock, setInStock] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  const [rails, setRails] = useState({}); // { categoryLabel: products[] }
  const [railsLoading, setRailsLoading] = useState(true);

  const isBrowseMode = !search && !category;

  useEffect(() => {
    setCategory(searchParams.get("category") || "");
  }, [searchParams]);

  /* -------- categories -------- */
  useEffect(() => {
    (async () => {
      try {
        const data = await getCategories();
        setCategories(data || []);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  /* -------- category rails (browse mode only) -------- */
  useEffect(() => {
    if (!isBrowseMode || categories.length === 0) return;

    let cancelled = false;

    (async () => {
      setRailsLoading(true);
      try {
        const topCats = categories.slice(0, RAIL_CATEGORY_CAP);

        const results = await Promise.all(
          topCats.map((cat) =>
            API.get("/products", {
              params: { category: catLabel(cat), page: 1, limit: RAIL_LIMIT },
            }).then((res) => [catLabel(cat), res.data])
          )
        );

        if (!cancelled) {
          const map = {};
          results.forEach(([label, data]) => (map[label] = data));
          setRails(map);
        }
      } catch (err) {
        console.log(err);
      } finally {
        if (!cancelled) setRailsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isBrowseMode, categories]);

  /* -------- reset page when filters change -------- */
  useEffect(() => {
    setPage(1);
  }, [search, category, sort, minPrice, maxPrice, inStock]);

  /* -------- fetch filtered/paginated products -------- */
  const getProducts = useCallback(async () => {
    setLoadingProducts(true);
    try {
      const params = { page, limit: LIMIT };
      if (search.trim()) params.search = search;
      if (category) params.category = category;
      if (sort) params.sort_by = sort;
      if (minPrice !== "") params.min_price = Number(minPrice);
      if (maxPrice !== "") params.max_price = Number(maxPrice);
      if (inStock) params.in_stock = true;

      const res = await API.get("/products", { params });
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingProducts(false);
    }
  }, [search, category, sort, minPrice, maxPrice, inStock, page]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const resetFilters = () => {
    setCategory("");
    setSort("");
    setMinPrice("");
    setMaxPrice("");
    setInStock(false);
    setPage(1);

    const params = new URLSearchParams(searchParams);
    params.delete("search");
    params.delete("category");
    setSearchParams(params);
    setShowDrawer(false);
  };

  const goToCategory = (label) => {
    setCategory(label);
    const params = new URLSearchParams(searchParams);
    params.set("category", label);
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeFilterCount =
    (category ? 1 : 0) + (minPrice !== "" ? 1 : 0) + (maxPrice !== "" ? 1 : 0) + (inStock ? 1 : 0);

  const hasNextPage = products.length === LIMIT;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-orange-950" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-14 sm:py-16">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-orange-400 mb-3">
            Marketplace
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight max-w-2xl">
            Everything you need, at prices that make sense.
          </h1>
          <p className="mt-3 text-slate-300 max-w-xl text-sm sm:text-base">
            Verified sellers, secure checkout, and free delivery on every order.
          </p>

          {(search || category) && (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {search && (
                <span className="flex items-center gap-2 bg-white/10 text-white text-sm px-4 py-1.5 rounded-full">
                  Search: "{search}"
                  <button
                    onClick={() => {
                      const params = new URLSearchParams(searchParams);
                      params.delete("search");
                      setSearchParams(params);
                    }}
                  >
                    <FiX size={14} />
                  </button>
                </span>
              )}
              {category && (
                <span className="flex items-center gap-2 bg-white/10 text-white text-sm px-4 py-1.5 rounded-full">
                  {category}
                  <button onClick={() => goToCategory("")}>
                    <FiX size={14} />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Category pill nav */}
        {categories.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-4 mb-2 [&::-webkit-scrollbar]:hidden">
            <button
              onClick={() => goToCategory("")}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition ${
                category === ""
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-slate-600 border-gray-300 hover:border-orange-400"
              }`}
            >
              All
            </button>
            {categories.map((cat, i) => {
              const label = catLabel(cat);
              return (
                <button
                  key={i}
                  onClick={() => goToCategory(label)}
                  className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition ${
                    category === label
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-white text-slate-600 border-gray-300 hover:border-orange-400"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}

        {/* Browse mode: category rails */}
        {isBrowseMode && (
          <div className="mt-6">
            {(railsLoading ? categories.slice(0, RAIL_CATEGORY_CAP) : Object.keys(rails)).map(
              (catOrLabel, i) => {
                const label = railsLoading ? catLabel(catOrLabel) : catOrLabel;
                return (
                  <CategoryRail
                    key={label + i}
                    title={label}
                    products={rails[label] || []}
                    loading={railsLoading}
                    onViewAll={() => goToCategory(label)}
                  />
                );
              }
            )}

            <hr className="border-gray-200 my-10" />

            <h2 className="text-2xl font-bold text-slate-900 mb-6">All Products</h2>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sticky top-6">
              <h2 className="text-lg font-bold text-slate-900 mb-6">Filters</h2>
              <FilterFields
                categories={categories}
                category={category}
                setCategory={(c) => goToCategory(c)}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                inStock={inStock}
                setInStock={setInStock}
                resetFilters={resetFilters}
              />
            </div>
          </aside>

          {/* Product results */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-center justify-between gap-3 mb-6">
              <button
                onClick={() => setShowDrawer(true)}
                className="lg:hidden flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700"
              >
                <FiFilter size={16} />
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <span className="hidden sm:block text-sm text-slate-500 font-medium">
                {loadingProducts ? "Loading…" : `${products.length} results`}
              </span>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="ml-auto rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
              >
                <option value="">Sort: Featured</option>
                <option value="price_asc">Price: Low → High</option>
                <option value="price_desc">Price: High → Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            {/* Grid */}
            {loadingProducts ? (
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-8">
                {Array.from({ length: LIMIT }).map((_, i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 py-20 px-8 text-center">
                <div className="w-28 h-28 mx-auto rounded-full bg-orange-50 flex items-center justify-center mb-6">
                  <span className="text-6xl">📦</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">No products found</h2>
                <p className="mt-3 text-slate-500 max-w-md mx-auto text-sm">
                  Try a different keyword or clear your filters to see more results.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-semibold transition"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loadingProducts && products.length > 0 && (
              <div className="flex justify-center items-center gap-3 mt-12">
                <button
                  onClick={() => page > 1 && setPage((p) => p - 1)}
                  disabled={page === 1}
                  className="flex items-center gap-1 px-4 py-2.5 rounded-lg bg-white border border-gray-300 shadow-sm text-sm font-semibold text-slate-700 hover:border-orange-400 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <FiChevronLeft size={16} /> Prev
                </button>

                <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold">
                  {page}
                </div>

                <button
                  onClick={() => hasNextPage && setPage((p) => p + 1)}
                  disabled={!hasNextPage}
                  className="flex items-center gap-1 px-4 py-2.5 rounded-lg bg-white border border-gray-300 shadow-sm text-sm font-semibold text-slate-700 hover:border-orange-400 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Next <FiChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowDrawer(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl p-6 overflow-y-auto animate-[slideIn_0.25s_ease-out]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">Filters</h2>
              <button onClick={() => setShowDrawer(false)}>
                <FiX size={22} />
              </button>
            </div>
            <FilterFields
              categories={categories}
              category={category}
              setCategory={(c) => {
                goToCategory(c);
                setShowDrawer(false);
              }}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              inStock={inStock}
              setInStock={setInStock}
              resetFilters={resetFilters}
            />
            <button
              onClick={() => setShowDrawer(false)}
              className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
            >
              Show {products.length} Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;