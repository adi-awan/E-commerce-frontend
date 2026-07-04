import { useEffect, useState } from "react";
import { uploadImage } from "../services/uploadService";

const CategoryForm = ({
  onSubmit,
  selectedCategory,
  loading,
}) => {

  const [form, setForm] = useState({
    name: "",
    image_url: "",
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {

    if (selectedCategory) {

      setForm({
        name: selectedCategory.name || "",
        image_url: selectedCategory.image_url || "",
      });

    } else {

      setForm({
        name: "",
        image_url: "",
      });

    }

  }, [selectedCategory]);

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

      const url = await uploadImage(
        file,
        "categories"
      );

      setForm(prev => ({
        ...prev,
        image_url: url,
      }));

    } catch (error) {

  console.error("UPLOAD ERROR:", error);

  alert(error.message || "Image upload failed");

} finally {

      setUploading(false);

    }

  };

  const submit = (e) => {

    e.preventDefault();

    onSubmit(form);

  };

  return (

    <form
      onSubmit={submit}
      className="bg-white rounded-2xl shadow-lg p-8 mb-10"
    >

      <h2 className="text-3xl font-bold mb-8">

        {selectedCategory
          ? "Edit Category"
          : "Add Category"}

      </h2>

      <input
        type="text"
        name="name"
        placeholder="Category Name"
        value={form.name}
        onChange={handleChange}
        className="border rounded-xl w-full p-4 mb-6"
        required
      />

      <label className="block font-semibold mb-3">

        Category Image

      </label>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-6"
      />

      {uploading && (

        <div className="text-blue-600 mb-5">

          Uploading Image...

        </div>

      )}

      {form.image_url && (

        <img
          src={form.image_url}
          alt="Preview"
          className="
          w-full
          h-56
          object-cover
          rounded-xl
          border
          mb-6
          "
        />

      )}

      <button
        disabled={loading || uploading}
        className="
        bg-blue-600
        hover:bg-blue-700
        text-white
        px-8
        py-3
        rounded-xl
        disabled:opacity-50
        "
      >

        {loading
          ? "Saving..."
          : selectedCategory
          ? "Update Category"
          : "Add Category"}

      </button>

    </form>

  );

};

export default CategoryForm;