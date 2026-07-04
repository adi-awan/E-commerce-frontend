import { useEffect, useState } from "react";

import CouponForm from "../components/CouponForm";
import AdminCouponCard from "../components/AdminCouponCard";

import {
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  toggleCoupon,
} from "../services/adminCouponService";

const AdminCoupons = () => {

  const [coupons, setCoupons] = useState([]);
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const loadCoupons = async () => {

    try {

      const data = await getCoupons();

      setCoupons(data);
      setFilteredCoupons(data);

    } catch (error) {

      console.log(error);
      alert("Failed to load coupons.");

    }

  };

  useEffect(() => {

    loadCoupons();

  }, []);

  useEffect(() => {

    if (!search.trim()) {

      setFilteredCoupons(coupons);

      return;

    }

    const filtered = coupons.filter((coupon) =>
      coupon.code.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredCoupons(filtered);

  }, [search, coupons]);

  const handleSubmit = async (form) => {

    try {

      setLoading(true);

      if (selectedCoupon) {

        await updateCoupon(
          selectedCoupon.id,
          form
        );

        alert("Coupon Updated Successfully");

      } else {

        await createCoupon(form);

        alert("Coupon Created Successfully");

      }

      setSelectedCoupon(null);

      loadCoupons();

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.detail ||
        "Something went wrong."
      );

    } finally {

      setLoading(false);

    }

  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this coupon?"
    );

    if (!confirmDelete) return;

    try {

      await deleteCoupon(id);

      alert("Coupon Deleted");

      loadCoupons();

    } catch (error) {

      console.log(error);

    }

  };

  const handleToggle = async (id) => {

    try {

      await toggleCoupon(id);

      loadCoupons();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">

        Coupon Management

      </h1>

      <CouponForm
        onSubmit={handleSubmit}
        selectedCoupon={selectedCoupon}
        loading={loading}
      />

      <div className="mt-10 mb-6">

        <input
          type="text"
          placeholder="Search coupon..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full border rounded-lg p-3"
        />

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredCoupons.length > 0 ? (

          filteredCoupons.map((coupon) => (

            <AdminCouponCard
              key={coupon.id}
              coupon={coupon}
              onEdit={setSelectedCoupon}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />

          ))

        ) : (

          <div className="text-gray-500">

            No Coupons Found

          </div>

        )}

      </div>

    </div>

  );

};

export default AdminCoupons;