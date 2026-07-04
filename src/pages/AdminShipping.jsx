import { useEffect, useState } from "react";

import {
  getShipments,
  createShipment,
  updateShipment,
  deleteShipment,
} from "../services/shippingService";

import ShippingCard from "../components/ShippingCard";

const initialForm = {
  order_id: "",
  tracking_number: "",
  courier: "",
  status: "Pending",
  estimated_delivery: "",
};

const AdminShipping = () => {
  const [shipments, setShipments] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState(initialForm);

  const [editing, setEditing] = useState(null);

  const loadShipments = async () => {
    try {
      const data = await getShipments();
      setShipments(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadShipments();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveShipment = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        await updateShipment(editing.id, form);
        alert("Shipment Updated");
      } else {
        await createShipment(form);
        alert("Shipment Created");
      }

      setForm(initialForm);
      setEditing(null);
      loadShipments();
    } catch (error) {
      console.log(error);
    }
  };

  const editShipment = (shipment) => {
    setEditing(shipment);

    setForm({
      order_id: shipment.order_id,
      tracking_number: shipment.tracking_number || "",
      courier: shipment.courier || "",
      status: shipment.status,
      estimated_delivery:
        shipment.estimated_delivery || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const removeShipment = async (id) => {
    if (!window.confirm("Delete shipment?")) return;

    try {
      await deleteShipment(id);

      loadShipments();

      alert("Shipment Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const filtered = shipments.filter((item) =>
    item.order_id
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Shipping Management
      </h1>

      <form
        onSubmit={saveShipment}
        className="bg-white shadow rounded-xl p-6 mb-10"
      >

        <div className="grid md:grid-cols-2 gap-4">

          <input
            name="order_id"
            value={form.order_id}
            onChange={handleChange}
            placeholder="Order ID"
            className="border rounded p-3"
            required
          />

          <input
            name="tracking_number"
            value={form.tracking_number}
            onChange={handleChange}
            placeholder="Tracking Number"
            className="border rounded p-3"
          />

          <input
            name="courier"
            value={form.courier}
            onChange={handleChange}
            placeholder="Courier"
            className="border rounded p-3"
          />

          <input
            type="date"
            name="estimated_delivery"
            value={form.estimated_delivery}
            onChange={handleChange}
            className="border rounded p-3"
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border rounded p-3"
          >
            <option>Pending</option>
            <option>Packed</option>
            <option>Shipped</option>
            <option>In Transit</option>
            <option>Out For Delivery</option>
            <option>Delivered</option>
          </select>

        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded mt-6"
        >
          {editing
            ? "Update Shipment"
            : "Create Shipment"}
        </button>

      </form>

      <input
        placeholder="Search Order..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full border rounded-lg p-3 mb-8"
      />

      <div className="grid lg:grid-cols-2 gap-6">

        {filtered.map((shipment) => (

          <ShippingCard
            key={shipment.id}
            shipment={shipment}
            onEdit={editShipment}
            onDelete={removeShipment}
          />

        ))}

      </div>

    </div>
  );
};

export default AdminShipping;