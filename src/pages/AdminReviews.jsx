import { useEffect, useState } from "react";

import {

  getReviews,
  getReviewStats,
  deleteReview,

} from "../services/adminReviewService";

import AdminReviewCard from "../components/AdminReviewCard";

const AdminReviews = () => {

  const [reviews, setReviews] = useState([]);

  const [stats, setStats] = useState({});

  const [search, setSearch] = useState("");

  const loadData = async () => {

    try {

      const reviewData = await getReviews();

      const statsData = await getReviewStats();

      setReviews(reviewData);

      setStats(statsData);

    }

    catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    loadData();

  }, []);

  const remove = async (id) => {

    if (!window.confirm("Delete review?")) return;

    await deleteReview(id);

    loadData();

  };

  const filtered = reviews.filter((review) =>

    review.product_name
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||

    review.user_name
      ?.toLowerCase()
      .includes(search.toLowerCase())

  );

  return (

    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">

        Review Management

      </h1>

      <div className="grid md:grid-cols-2 gap-6 mb-8">

        <div className="bg-white shadow rounded-xl p-6">

          <h2>Total Reviews</h2>

          <p className="text-4xl font-bold">

            {stats.total_reviews}

          </p>

        </div>

        <div className="bg-white shadow rounded-xl p-6">

          <h2>Average Rating</h2>

          <p className="text-4xl font-bold">

            ⭐ {stats.average_rating}

          </p>

        </div>

      </div>

      <input

        value={search}

        onChange={(e)=>setSearch(e.target.value)}

        placeholder="Search..."

        className="w-full border rounded-lg p-3 mb-8"

      />

      <div className="grid md:grid-cols-2 gap-6">

        {filtered.map((review)=>(

          <AdminReviewCard

            key={review.id}

            review={review}

            onDelete={remove}

          />

        ))}

      </div>

    </div>

  );

};

export default AdminReviews;