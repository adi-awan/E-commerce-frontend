const AdminReviewCard = ({
  review,
  onDelete,
}) => {

  return (

    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between">

        <div>

          <h2 className="font-bold">

            {review.product_name}

          </h2>

          <p className="text-gray-500 text-sm">

            {review.user_name}

          </p>

        </div>

        <button
          onClick={() => onDelete(review.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
        >
          Delete
        </button>

      </div>

      <div className="mt-4">

        {"⭐".repeat(review.rating)}

      </div>

      <p className="mt-4">

        {review.comment}

      </p>

    </div>

  );

};

export default AdminReviewCard;