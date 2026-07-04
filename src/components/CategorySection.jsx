import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Cpu,
  Shirt,
  Footprints,
  Dumbbell,
  Watch,
  BookOpen,
  Smartphone,
  Laptop,
  Sparkles,
  Home,
  Package,
} from "lucide-react";
import { getCategories } from "../services/categoryService";

const ICON_MAP = {
  electronics: Cpu,
  fashion: Shirt,
  clothing: Shirt,
  shoes: Footprints,
  footwear: Footprints,
  sports: Dumbbell,
  accessories: Watch,
  books: BookOpen,
  mobiles: Smartphone,
  mobile: Smartphone,
  phones: Smartphone,
  laptops: Laptop,
  laptop: Laptop,
  beauty: Sparkles,
  home: Home,
};

const getIcon = (name = "") => ICON_MAP[name.toLowerCase()] || Package;

const CardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-200 p-8 animate-pulse">
    <div className="w-14 h-14 rounded-xl bg-gray-200 mb-5" />
    <div className="h-4 w-2/3 bg-gray-200 rounded" />
  </div>
);

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto py-20 px-6">
      <div className="text-center mb-14">
        <span className="text-xs font-bold tracking-widest uppercase text-orange-600">
          Browse
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
          Shop by Category
        </h2>
        <p className="text-slate-500 mt-3">
          Find exactly what you're looking for, faster.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)
          : categories.map((category) => {
              const Icon = getIcon(category.name);
              return (
                <Link
                  key={category.id}
                  to={`/products?category=${category.name}`}
                  className="group bg-white rounded-2xl border border-gray-200 hover:border-orange-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-8 text-center"
                >
                  <div className="w-14 h-14 mx-auto rounded-xl bg-orange-50 group-hover:bg-orange-500 flex items-center justify-center mb-5 transition-colors">
                    <Icon
                      size={26}
                      className="text-orange-600 group-hover:text-white transition-colors"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {category.name}
                  </h3>
                </Link>
              );
            })}
      </div>
    </section>
  );
};

export default CategorySection;