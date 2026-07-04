const InventoryCard = ({
  product,
  onIncrease,
  onDecrease,
}) => {

  const stockColor =
    product.stock === 0
      ? "text-red-600"
      : product.stock <= 5
      ? "text-yellow-600"
      : "text-green-600";
    const handleIncrease = (id) => {
  console.log("Increase clicked", id);
};

const handleDecrease = (id) => {
  console.log("Decrease clicked", id);
};

  return (
    <div className="bg-white shadow rounded-lg p-6">

      <h2 className="font-bold text-xl">
        {product.name}
      </h2>

      <p className="text-gray-500 mt-2">
        {product.category}
      </p>

      <p className={`mt-3 font-bold ${stockColor}`}>
        Stock : {product.stock}
      </p>

      <div className="flex gap-3 mt-5">

        <button
          onClick={() => onDecrease(product.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          -
        </button>

        <button
          onClick={() => onIncrease(product.id)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          +
        </button>

      </div>

    </div>
  );
};

export default InventoryCard;