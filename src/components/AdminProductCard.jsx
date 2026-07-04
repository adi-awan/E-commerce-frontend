const AdminProductCard = ({
  product,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="border rounded-lg p-4 shadow">

      <img
        src={product.image_url}
        className="h-44 w-full object-cover rounded"
      />

      <h2 className="font-bold mt-3">
        {product.name}
      </h2>

      <p>Rs. {product.price}</p>

      <p>Stock : {product.stock}</p>

      <div className="flex gap-3 mt-4">

        <button
          onClick={() => onEdit(product)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(product.id)}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete
        </button>

      </div>

    </div>
  );
};

export default AdminProductCard;