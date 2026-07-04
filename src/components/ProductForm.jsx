import { useEffect, useState } from "react";
import { uploadImage } from "../services/adminProductService";
import { getCategories } from "../services/categoryService";

const ProductForm = ({
  onSubmit,
  selectedProduct,
  loading,
}) => {

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image_url: "",
  });

  const [categories, setCategories] = useState([]);

  const [uploading, setUploading] = useState(false);

  useEffect(() => {

    const loadCategories = async () => {

      try {

        const data = await getCategories();

        setCategories(data);

      } catch (error) {

        console.log(error);

      }

    };

    loadCategories();

  }, []);

  useEffect(() => {

    if (selectedProduct) {

      setForm({
        name: selectedProduct.name || "",
        description: selectedProduct.description || "",
        price: selectedProduct.price || "",
        stock: selectedProduct.stock || "",
        category: selectedProduct.category || "",
        image_url: selectedProduct.image_url || "",
      });

    } else {

      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        image_url: "",
      });

    }

  }, [selectedProduct]);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleImageUpload = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    try {

      setUploading(true);

      const result = await uploadImage(file);

      setForm((prev) => ({
        ...prev,
        image_url: result.image_url,
      }));

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.detail ||
        error.message ||
        "Image upload failed"
      );

    } finally {

      setUploading(false);

    }

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onSubmit(form);

    if (!selectedProduct) {

      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        image_url: "",
      });

    }

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl rounded-xl p-8 space-y-5"
    >

      <h2 className="text-3xl font-bold">

        {selectedProduct
          ? "Edit Product"
          : "Add Product"}

      </h2>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={form.name}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        rows="5"
        className="w-full border rounded-lg p-3"
        required
      />

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border rounded-lg p-3"
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="border rounded-lg p-3"
          required
        />

      </div>

      {/* Category Dropdown */}

      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
        required
      >

        <option value="">
          Select Category
        </option>

        {categories.map((category) => (

          <option
            key={category.id}
            value={category.name}
          >
            {category.name}
          </option>

        ))}

      </select>

      {/* Image Upload */}

      <div>

        <label className="block font-semibold mb-2">

          Product Image

        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full border rounded-lg p-2"
        />

      </div>

      {uploading && (

        <div className="text-blue-600 font-semibold">

          Uploading Image...

        </div>

      )}

      {form.image_url && (

        <div>

          <img
            src={form.image_url}
            alt="Preview"
            className="w-44 h-44 object-cover rounded-lg border shadow"
          />

        </div>

      )}

      <button
        type="submit"
        disabled={loading || uploading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition"
      >

        {loading
          ? "Saving..."
          : selectedProduct
          ? "Update Product"
          : "Add Product"}

      </button>

    </form>

  );

};

export default ProductForm;