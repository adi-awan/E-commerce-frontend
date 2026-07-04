import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LayoutGrid } from "lucide-react";
import { getCategories } from "../services/categoryService";
import { getCategoryIcon } from "../utils/categoryIcons";

const IconSkeleton = () => (
  <div className="flex flex-col items-center gap-2 shrink-0 w-20">
    <div className="w-14 h-14 rounded-full bg-gray-200 animate-pulse" />
    <div className="h-3 w-12 bg-gray-200 rounded animate-pulse" />
  </div>
);

const CategoryIconRow = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getCategories();
        setCategories(data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {loading
            ? Array.from({ length: 7 }).map((_, i) => <IconSkeleton key={i} />)
            : categories.map((cat) => {
                const Icon = getCategoryIcon(cat.name);
                return (
                  <Link
                    key={cat.id}
                    to={`/products?category=${cat.name}`}
                    className="group flex flex-col items-center gap-2 shrink-0 w-20"
                  >
                    <div className="w-14 h-14 rounded-full bg-slate-50 border border-gray-200 group-hover:bg-orange-500 group-hover:border-orange-500 flex items-center justify-center transition-colors">
                      <Icon
                        size={22}
                        className="text-slate-600 group-hover:text-white transition-colors"
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-600 text-center group-hover:text-orange-600 transition-colors line-clamp-1">
                      {cat.name}
                    </span>
                  </Link>
                );
              })}

          <Link
            to="/products"
            className="group flex flex-col items-center gap-2 shrink-0 w-20"
          >
            <div className="w-14 h-14 rounded-full bg-slate-50 border border-dashed border-gray-300 group-hover:border-orange-400 flex items-center justify-center transition-colors">
              <LayoutGrid size={20} className="text-slate-400 group-hover:text-orange-500 transition-colors" />
            </div>
            <span className="text-xs font-semibold text-slate-500 group-hover:text-orange-600 transition-colors">
              All
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryIconRow;