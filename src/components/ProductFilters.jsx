const ProductFilters = ({
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
}) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6 sticky top-24">

      <h2 className="text-2xl font-bold mb-6">
        Filters
      </h2>

      <div className="mb-6">

        <label className="font-semibold block mb-2">
          Category
        </label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg p-3 w-full"
        >

          <option value="">
            All Categories
          </option>

          {categories.map((cat) => (

            <option
              key={cat.id}
              value={cat.name}
            >
              {cat.name}
            </option>

          ))}

        </select>

      </div>

      <div className="mb-6">

        <label className="font-semibold block mb-2">
          Min Price
        </label>

        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border rounded-lg p-3 w-full"
        />

      </div>

      <div className="mb-6">

        <label className="font-semibold block mb-2">
          Max Price
        </label>

        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border rounded-lg p-3 w-full"
        />

      </div>

      <div className="mb-8">

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) =>
              setInStock(e.target.checked)
            }
          />

          In Stock Only

        </label>

      </div>

      <button
        onClick={resetFilters}
        className="w-full bg-red-500 text-white py-3 rounded-xl"
      >
        Reset Filters
      </button>

    </div>
  );
};

export default ProductFilters;