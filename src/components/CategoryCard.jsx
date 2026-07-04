const CategoryCard = ({
  category,
  onEdit,
  onDelete,
}) => {

  return (

    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">

      <img
        src={
          category.image_url ||
          "https://via.placeholder.com/500x300"
        }
        alt={category.name}
        className="w-full h-52 object-cover"
      />

      <div className="p-5">

        <h2 className="text-2xl font-bold">

          {category.name}

        </h2>

        <div className="flex gap-3 mt-6">

          <button
            onClick={() => onEdit(category)}
            className="
            flex-1
            bg-yellow-500
            hover:bg-yellow-600
            text-white
            py-2
            rounded-lg
            "
          >

            Edit

          </button>

          <button
            onClick={() => onDelete(category.id)}
            className="
            flex-1
            bg-red-600
            hover:bg-red-700
            text-white
            py-2
            rounded-lg
            "
          >

            Delete

          </button>

        </div>

      </div>

    </div>

  );

};

export default CategoryCard;