import { useEffect, useState } from "react";

const CouponForm = ({
  onSubmit,
  selectedCoupon,
  loading,
}) => {

  const [form, setForm] = useState({
    code: "",
    discount: "",
    type: "percentage",
    expires_at: "",
    active: true,
  });

  useEffect(() => {

    if (selectedCoupon) {

      setForm({
        code: selectedCoupon.code || "",
        discount: selectedCoupon.discount || "",
        type: selectedCoupon.type || "percentage",
        expires_at: selectedCoupon.expires_at
          ? selectedCoupon.expires_at.substring(0, 10)
          : "",
        active: selectedCoupon.active,
      });

    } else {

      setForm({
        code: "",
        discount: "",
        type: "percentage",
        expires_at: "",
        active: true,
      });

    }

  }, [selectedCoupon]);

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onSubmit(form);

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-6 space-y-4"
    >

      <h2 className="text-2xl font-bold">

        {selectedCoupon
          ? "Edit Coupon"
          : "Create Coupon"}

      </h2>

      <input
        type="text"
        name="code"
        placeholder="Coupon Code"
        value={form.code}
        onChange={handleChange}
        className="w-full border rounded p-3"
        required
      />

      <input
        type="number"
        name="discount"
        placeholder="Discount"
        value={form.discount}
        onChange={handleChange}
        className="w-full border rounded p-3"
        required
      />

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="w-full border rounded p-3"
      >

        <option value="percentage">
          Percentage
        </option>

        <option value="fixed">
          Fixed Amount
        </option>

      </select>

      <input
        type="date"
        name="expires_at"
        value={form.expires_at}
        onChange={handleChange}
        className="w-full border rounded p-3"
      />

      <label className="flex items-center gap-3">

        <input
          type="checkbox"
          name="active"
          checked={form.active}
          onChange={handleChange}
        />

        Active Coupon

      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded"
      >

        {loading
          ? "Saving..."
          : selectedCoupon
          ? "Update Coupon"
          : "Create Coupon"}

      </button>

    </form>

  );

};

export default CouponForm;