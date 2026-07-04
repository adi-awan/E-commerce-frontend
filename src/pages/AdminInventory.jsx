import { useEffect, useMemo, useState } from "react";

import InventoryCard from "../components/InventoryCard";

import {
  getInventory,
  updateStock,
} from "../services/inventoryService";

const AdminInventory = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

  const loadInventory = async () => {

    try {

      setLoading(true);

      const data = await getInventory();

      setProducts(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadInventory();

  }, []);

 const increase = async (id) => {
  try {
    const updated = await updateStock(id, 1);

    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? updated[0]
          : product
      )
    );
  } catch (err) {
    console.log(err);
  }
};

 const decrease = async (id) => {
  try {
    const updated = await updateStock(id, -1);

    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? updated[0]
          : product
      )
    );
  } catch (err) {
    console.log(err);
  }
};

  const filteredProducts = useMemo(() => {

    return products.filter((product) => {

      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      if (!matchesSearch) return false;

      if (filter === "low")
        return product.stock <= 5 && product.stock > 0;

      if (filter === "out")
        return product.stock === 0;

      if (filter === "available")
        return product.stock > 5;

      return true;

    });

  }, [products, search, filter]);

  const total = products.length;

  const available = products.filter(
    p => p.stock > 5
  ).length;

  const low = products.filter(
    p => p.stock <= 5 && p.stock > 0
  ).length;

  const out = products.filter(
    p => p.stock === 0
  ).length;

  if (loading)
    return (
      <div className="text-center mt-20 text-xl">
        Loading Inventory...
      </div>
    );

  return (

    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">

        Inventory Management

      </h1>

      {/* Summary */}

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <div className="bg-white shadow rounded p-6">
          <h2>Total Products</h2>
          <p className="text-3xl font-bold">{total}</p>
        </div>

        <div className="bg-green-50 shadow rounded p-6">
          <h2>Available</h2>
          <p className="text-3xl font-bold text-green-700">
            {available}
          </p>
        </div>

        <div className="bg-yellow-50 shadow rounded p-6">
          <h2>Low Stock</h2>
          <p className="text-3xl font-bold text-yellow-700">
            {low}
          </p>
        </div>

        <div className="bg-red-50 shadow rounded p-6">
          <h2>Out Of Stock</h2>
          <p className="text-3xl font-bold text-red-700">
            {out}
          </p>
        </div>

      </div>

      {/* Search + Filter */}

      <div className="flex flex-col md:flex-row gap-4 mb-8">

        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border rounded-lg p-3 flex-1"
        />

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
          className="border rounded-lg p-3"
        >

          <option value="all">
            All
          </option>

          <option value="available">
            Available
          </option>

          <option value="low">
            Low Stock
          </option>

          <option value="out">
            Out Of Stock
          </option>

        </select>

      </div>

      {/* Products */}

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">

        {filteredProducts.length === 0 ? (

          <div className="col-span-full text-center text-gray-500">

            No Products Found

          </div>

        ) : (

          filteredProducts.map(product => (

            <InventoryCard
              key={product.id}
              product={product}
              onIncrease={increase}
              onDecrease={decrease}
            />

          ))

        )}

      </div>

    </div>

  );

};

export default AdminInventory;