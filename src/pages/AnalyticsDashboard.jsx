import { useEffect, useState } from "react";

import {
  getRevenue,
  getTopProducts,
} from "../services/analyticsService";

import RevenueCard from "../components/RevenueCard";
import TopProductsTable from "../components/TopProductsTable";

const AnalyticsDashboard = () => {

  const [summary, setSummary] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAnalytics = async () => {

    try {

      const revenue = await getRevenue();
      const topProducts = await getTopProducts();

      setSummary(revenue);
      setProducts(topProducts);

    } catch (error) {

      console.log(error);

      alert("Unable to load analytics.");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadAnalytics();

  }, []);

  if (loading) {

    return (
      <div className="text-center mt-20 text-xl font-bold">
        Loading Analytics...
      </div>
    );

  }

  return (

    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Analytics Dashboard
      </h1>

      <RevenueCard summary={summary} />

      <div className="mt-10">

        <TopProductsTable products={products} />

      </div>

    </div>

  );

};

export default AnalyticsDashboard;